interface RateLimitRecord {
  count: number;
  resetAt: number;
}

interface CooldownRecord {
  lastSentAt: number;
}

// In-memory sliding-window stores
const ipRateLimitStore = new Map<string, RateLimitRecord>();
const resendCooldownStore = new Map<string, CooldownRecord>();

// Periodic garbage collection every 5 minutes
const CLEANUP_INTERVAL = 5 * 60 * 1000;
let lastCleanup = Date.now();

function cleanupExpiredRecords(): void {
  const now = Date.now();
  if (now - lastCleanup < CLEANUP_INTERVAL) return;
  lastCleanup = now;

  for (const [ip, record] of ipRateLimitStore.entries()) {
    if (now >= record.resetAt) {
      ipRateLimitStore.delete(ip);
    }
  }

  for (const [email, record] of resendCooldownStore.entries()) {
    if (now - record.lastSentAt > 10 * 60 * 1000) {
      resendCooldownStore.delete(email);
    }
  }
}

export interface RateLimitResult {
  allowed: boolean;
  remaining: number;
  resetAt: number;
}

export function checkIpRateLimit(
  ip: string,
  limit = 5,
  windowMs = 10 * 60 * 1000
): RateLimitResult {
  cleanupExpiredRecords();
  const now = Date.now();
  const existing = ipRateLimitStore.get(ip);

  if (!existing || now >= existing.resetAt) {
    const record: RateLimitRecord = {
      count: 1,
      resetAt: now + windowMs,
    };
    ipRateLimitStore.set(ip, record);
    return {
      allowed: true,
      remaining: limit - 1,
      resetAt: record.resetAt,
    };
  }

  if (existing.count >= limit) {
    return {
      allowed: false,
      remaining: 0,
      resetAt: existing.resetAt,
    };
  }

  existing.count += 1;
  return {
    allowed: true,
    remaining: limit - existing.count,
    resetAt: existing.resetAt,
  };
}

export interface CooldownResult {
  allowed: boolean;
  waitSeconds: number;
}

export function checkResendCooldown(
  email: string,
  cooldownMs = 60 * 1000
): CooldownResult {
  cleanupExpiredRecords();
  const now = Date.now();
  const normalizedEmail = email.trim().toLowerCase();
  const existing = resendCooldownStore.get(normalizedEmail);

  if (!existing) {
    resendCooldownStore.set(normalizedEmail, { lastSentAt: now });
    return { allowed: true, waitSeconds: 0 };
  }

  const elapsed = now - existing.lastSentAt;
  if (elapsed < cooldownMs) {
    const remainingMs = cooldownMs - elapsed;
    return {
      allowed: false,
      waitSeconds: Math.ceil(remainingMs / 1000),
    };
  }

  resendCooldownStore.set(normalizedEmail, { lastSentAt: now });
  return { allowed: true, waitSeconds: 0 };
}

export function resetRateLimitsForTesting(): void {
  ipRateLimitStore.clear();
  resendCooldownStore.clear();
}

export function getClientIp(request: Request): string {
  const forwardedFor = request.headers.get('x-forwarded-for');
  if (forwardedFor) {
    const firstIp = forwardedFor.split(',')[0].trim();
    if (firstIp) return firstIp;
  }

  const realIp = request.headers.get('x-real-ip');
  if (realIp) return realIp.trim();

  return '127.0.0.1';
}

