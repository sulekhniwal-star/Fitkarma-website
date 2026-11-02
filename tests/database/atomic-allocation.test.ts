import { describe, it, expect } from 'vitest';

interface PhaseRecord {
  id: string;
  phase_key: string;
  capacity: number;
  allocated_count: number;
  status: 'open' | 'full' | 'closed';
}

interface ApplicationRecord {
  id: string;
  email: string;
  normalized_email: string;
  status: 'pending_verification' | 'phase1_accepted' | 'phase2_waitlist' | 'withdrawn';
  phase_id: string | null;
  seat_number: number | null;
  allocation_order_at: number | null;
  decision_at: number | null;
}

interface OutboxRecord {
  id: string;
  application_id: string;
  message_type: string;
  idempotency_key: string;
}

/**
 * High-fidelity in-memory simulator of PostgreSQL transaction semantics
 * with row-level locking (SELECT ... FOR UPDATE) and FIFO waitlist promotion.
 */
class AllocationEngineSimulator {
  private phase: PhaseRecord;
  private applications = new Map<string, ApplicationRecord>();
  private outbox: OutboxRecord[] = [];
  private lockPromise: Promise<void> = Promise.resolve();

  constructor(capacity = 5) {
    this.phase = {
      id: 'phase1-uuid',
      phase_key: 'phase1',
      capacity,
      allocated_count: 0,
      status: 'open',
    };
  }

  public registerApplication(id: string, email: string): void {
    this.applications.set(id, {
      id,
      email,
      normalized_email: email.trim().toLowerCase(),
      status: 'pending_verification',
      phase_id: null,
      seat_number: null,
      allocation_order_at: null,
      decision_at: null,
    });
  }

  /**
   * Simulates `confirm_and_allocate_application` with serializing row-lock (`FOR UPDATE`)
   */
  public async confirmAndAllocate(applicationId: string, verifiedEmail: string) {
    // Acquire mutex simulating database row lock: SELECT ... FOR UPDATE
    let releaseLock!: () => void;
    const currentLock = this.lockPromise;
    this.lockPromise = new Promise((resolve) => {
      releaseLock = resolve;
    });

    await currentLock;

    try {
      const app = this.applications.get(applicationId);
      if (!app) {
        throw new Error(`Application not found: ${applicationId}`);
      }
      if (app.normalized_email !== verifiedEmail.trim().toLowerCase()) {
        throw new Error('Email mismatch');
      }

      // Idempotency check
      if (app.status === 'phase1_accepted' || app.status === 'phase2_waitlist') {
        return {
          status: app.status,
          seat_number: app.seat_number,
          phase_key: 'phase1',
          already_allocated: true,
        };
      }

      const now = Date.now();

      // Check capacity
      if (this.phase.status === 'open' && this.phase.allocated_count < this.phase.capacity) {
        this.phase.allocated_count += 1;
        const newSeat = this.phase.allocated_count;
        if (this.phase.allocated_count >= this.phase.capacity) {
          this.phase.status = 'full';
        }

        app.status = 'phase1_accepted';
        app.phase_id = this.phase.id;
        app.seat_number = newSeat;
        app.allocation_order_at = now;
        app.decision_at = now;

        this.outbox.push({
          id: `outbox-${now}-${Math.random()}`,
          application_id: app.id,
          message_type: 'phase1_accepted',
          idempotency_key: `v1:${app.id}:phase1_accepted`,
        });

        return {
          status: 'phase1_accepted',
          seat_number: newSeat,
          phase_key: 'phase1',
          already_allocated: false,
        };
      } else {
        // Fallback to waitlist
        app.status = 'phase2_waitlist';
        app.phase_id = this.phase.id;
        app.seat_number = null;
        app.allocation_order_at = now;
        app.decision_at = now;

        this.outbox.push({
          id: `outbox-${now}-${Math.random()}`,
          application_id: app.id,
          message_type: 'phase2_waitlist',
          idempotency_key: `v1:${app.id}:phase2_waitlist`,
        });

        return {
          status: 'phase2_waitlist',
          seat_number: null,
          phase_key: 'phase1',
          already_allocated: false,
        };
      }
    } finally {
      releaseLock();
    }
  }

  /**
   * Simulates `promote_waitlist_applicant` with FIFO promotion
   */
  public async promoteWaitlistApplicant(withdrawnApplicationId: string) {
    let releaseLock!: () => void;
    const currentLock = this.lockPromise;
    this.lockPromise = new Promise((resolve) => {
      releaseLock = resolve;
    });

    await currentLock;

    try {
      const withdrawn = this.applications.get(withdrawnApplicationId);
      if (!withdrawn) {
        throw new Error(`Application not found: ${withdrawnApplicationId}`);
      }

      if (withdrawn.status !== 'phase1_accepted') {
        withdrawn.status = 'withdrawn';
        return { promoted: false, reason: 'not_phase1_seat' };
      }

      const freedSeat = withdrawn.seat_number!;
      withdrawn.status = 'withdrawn';
      withdrawn.seat_number = null;

      // Select earliest waitlist applicant (FIFO)
      const waitlisted = Array.from(this.applications.values())
        .filter((a) => a.status === 'phase2_waitlist')
        .sort((a, b) => (a.allocation_order_at ?? 0) - (b.allocation_order_at ?? 0));

      if (waitlisted.length === 0) {
        this.phase.allocated_count = Math.max(0, this.phase.allocated_count - 1);
        this.phase.status = 'open';
        return { promoted: false, reason: 'no_waitlist_candidates' };
      }

      const candidate = waitlisted[0];
      candidate.status = 'phase1_accepted';
      candidate.seat_number = freedSeat;
      candidate.decision_at = Date.now();

      this.outbox.push({
        id: `outbox-${Date.now()}-${Math.random()}`,
        application_id: candidate.id,
        message_type: 'phase1_promotion',
        idempotency_key: `v1:${candidate.id}:phase1_promotion`,
      });

      return {
        promoted: true,
        promoted_application_id: candidate.id,
        seat_number: freedSeat,
      };
    } finally {
      releaseLock();
    }
  }

  public getPhase(): PhaseRecord {
    return { ...this.phase };
  }

  public getApplication(id: string): ApplicationRecord | undefined {
    return this.applications.get(id);
  }

  public getOutbox(): OutboxRecord[] {
    return [...this.outbox];
  }
}

describe('Atomic Allocation & Concurrency Verification Engine', () => {
  it('allocates sequential seats starting from 1 up to capacity limit', async () => {
    const engine = new AllocationEngineSimulator(3);
    engine.registerApplication('app-1', 'user1@fitkarma.in');
    engine.registerApplication('app-2', 'user2@fitkarma.in');

    const res1 = await engine.confirmAndAllocate('app-1', 'user1@fitkarma.in');
    expect(res1.status).toBe('phase1_accepted');
    expect(res1.seat_number).toBe(1);
    expect(res1.already_allocated).toBe(false);

    const res2 = await engine.confirmAndAllocate('app-2', 'user2@fitkarma.in');
    expect(res2.status).toBe('phase1_accepted');
    expect(res2.seat_number).toBe(2);
  });

  it('is completely idempotent when called multiple times for the same application', async () => {
    const engine = new AllocationEngineSimulator(3);
    engine.registerApplication('app-1', 'user1@fitkarma.in');

    const firstCall = await engine.confirmAndAllocate('app-1', 'user1@fitkarma.in');
    expect(firstCall.seat_number).toBe(1);

    const secondCall = await engine.confirmAndAllocate('app-1', 'user1@fitkarma.in');
    expect(secondCall.status).toBe('phase1_accepted');
    expect(secondCall.seat_number).toBe(1);
    expect(secondCall.already_allocated).toBe(true);

    // Ensure phase allocated count did not increase
    expect(engine.getPhase().allocated_count).toBe(1);
  });

  it('guarantees zero over-allocation under concurrent race condition', async () => {
    const capacity = 5;
    const totalApplicants = 20;
    const engine = new AllocationEngineSimulator(capacity);

    for (let i = 1; i <= totalApplicants; i++) {
      engine.registerApplication(`app-${i}`, `user${i}@fitkarma.in`);
    }

    // Fire all 20 verification calls simultaneously in parallel
    const promises = Array.from({ length: totalApplicants }, (_, idx) => {
      const i = idx + 1;
      return engine.confirmAndAllocate(`app-${i}`, `user${i}@fitkarma.in`);
    });

    const results = await Promise.all(promises);

    const accepted = results.filter((r) => r.status === 'phase1_accepted');
    const waitlisted = results.filter((r) => r.status === 'phase2_waitlist');

    // Strict zero-oversubscription assertions
    expect(accepted.length).toBe(capacity);
    expect(waitlisted.length).toBe(totalApplicants - capacity);

    // Verify all allocated seats are unique and in range 1..capacity
    const seats = accepted.map((r) => r.seat_number).sort((a, b) => (a ?? 0) - (b ?? 0));
    expect(seats).toEqual([1, 2, 3, 4, 5]);

    // Check phase state
    expect(engine.getPhase().allocated_count).toBe(capacity);
    expect(engine.getPhase().status).toBe('full');
  });

  it('promotes the earliest FIFO waitlist applicant when an accepted seat withdraws', async () => {
    const engine = new AllocationEngineSimulator(2);
    engine.registerApplication('app-1', 'user1@fitkarma.in');
    engine.registerApplication('app-2', 'user2@fitkarma.in');
    engine.registerApplication('app-3', 'waitlist1@fitkarma.in');
    engine.registerApplication('app-4', 'waitlist2@fitkarma.in');

    // Fill capacity (seats 1 and 2)
    await engine.confirmAndAllocate('app-1', 'user1@fitkarma.in');
    await engine.confirmAndAllocate('app-2', 'user2@fitkarma.in');

    // Delay slightly to ensure distinct allocation_order_at timestamps
    await new Promise((r) => setTimeout(r, 10));
    const wait1 = await engine.confirmAndAllocate('app-3', 'waitlist1@fitkarma.in');
    expect(wait1.status).toBe('phase2_waitlist');

    await new Promise((r) => setTimeout(r, 10));
    const wait2 = await engine.confirmAndAllocate('app-4', 'waitlist2@fitkarma.in');
    expect(wait2.status).toBe('phase2_waitlist');

    // User 1 withdraws (freed seat #1)
    const promoResult = await engine.promoteWaitlistApplicant('app-1');
    expect(promoResult.promoted).toBe(true);
    expect(promoResult.seat_number).toBe(1);
    expect(promoResult.promoted_application_id).toBe('app-3'); // FIFO: earliest waitlist applicant

    // Verify app-3 is now phase1_accepted with seat 1
    const app3 = engine.getApplication('app-3');
    expect(app3?.status).toBe('phase1_accepted');
    expect(app3?.seat_number).toBe(1);

    // Verify app-4 is still on waitlist
    const app4 = engine.getApplication('app-4');
    expect(app4?.status).toBe('phase2_waitlist');

    // Outbox should contain promotion email for app-3
    const promotionEmail = engine.getOutbox().find((e) => e.application_id === 'app-3' && e.message_type === 'phase1_promotion');
    expect(promotionEmail).toBeDefined();
    expect(promotionEmail?.idempotency_key).toBe('v1:app-3:phase1_promotion');
  });
});

