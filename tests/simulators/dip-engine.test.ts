import { describe, it, expect } from 'vitest';
import { getDipPulse, DIP_PULSES, type DipTimeOfDay } from '@/lib/simulators/dip-engine';

describe('Daily Intelligence Package (DIP) Engine', () => {
  it('returns valid pulse structures for morning, midday, and evening', () => {
    const periods: DipTimeOfDay[] = ['morning', 'midday', 'evening'];

    for (const period of periods) {
      const pulse = getDipPulse(period);
      expect(pulse.period).toBe(period);
      expect(pulse.timeString).toBeDefined();
      expect(pulse.recoveryScore).toBeGreaterThan(0);
      expect(pulse.recoveryScore).toBeLessThanOrEqual(100);
      expect(pulse.metrics.length).toBeGreaterThanOrEqual(3);
      expect(pulse.titleKey).toContain('simulators.dip.periods');
      expect(pulse.insightKey).toContain('simulators.dip.periods');
      expect(pulse.actionKey).toContain('simulators.dip.periods');
    }
  });

  it('provides distinctive theme gradients and glow colors for each period', () => {
    const morning = getDipPulse('morning');
    const midday = getDipPulse('midday');
    const evening = getDipPulse('evening');

    expect(morning.glowColor).not.toBe(midday.glowColor);
    expect(midday.glowColor).not.toBe(evening.glowColor);
  });

  it('falls back to morning pulse if invalid period is requested', () => {
    // @ts-expect-error Testing invalid runtime value
    const fallback = getDipPulse('midnight');
    expect(fallback.period).toBe('morning');
  });
});
