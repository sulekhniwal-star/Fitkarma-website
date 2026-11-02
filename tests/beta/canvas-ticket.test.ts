import { describe, it, expect } from 'vitest';
import {
  formatBadgeNumber,
  drawTicketNotches,
} from '@/lib/canvas/ticket-renderer';

describe('Canvas Ticket Geometry & Formatting Engine', () => {
  it('formats VIP seat badges with 3-digit padding', () => {
    expect(formatBadgeNumber(1, true)).toBe('#001');
    expect(formatBadgeNumber(42, true)).toBe('#042');
    expect(formatBadgeNumber(999, true)).toBe('#999');
    expect(formatBadgeNumber(1000, true)).toBe('#1000');
  });

  it('formats Phase 2 waitlist positions without artificial zero padding', () => {
    expect(formatBadgeNumber(1, false)).toBe('#1');
    expect(formatBadgeNumber(127, false)).toBe('#127');
    expect(formatBadgeNumber(5000, false)).toBe('#5000');
  });

  it('executes ticket notch drawing math without throwing', () => {
    // Mock canvas 2D context
    const arcCalls: Array<{ x: number; y: number; radius: number }> = [];
    const mockCtx = {
      save: () => {},
      restore: () => {},
      beginPath: () => {},
      fill: () => {},
      arc: (x: number, y: number, radius: number) => {
        arcCalls.push({ x, y, radius });
      },
      fillStyle: '',
    } as unknown as CanvasRenderingContext2D;

    drawTicketNotches(mockCtx, 1200, 1500, 1050, 45);

    expect(arcCalls.length).toBe(2);
    // Left notch at x=0
    expect(arcCalls[0]).toEqual({ x: 0, y: 1050, radius: 45 });
    // Right notch at x=1200
    expect(arcCalls[1]).toEqual({ x: 1200, y: 1050, radius: 45 });
  });
});
