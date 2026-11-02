import { describe, it, expect } from 'vitest';
import { getScannerPreset, SCANNER_PRESETS, type ScannerDishId } from '@/lib/simulators/scanner-engine';

describe('AI Food Scanner Simulation Engine', () => {
  it('returns valid presets for all 3 sample dishes', () => {
    const dishIds: ScannerDishId[] = ['thali', 'dosa', 'biryani'];

    for (const id of dishIds) {
      const preset = getScannerPreset(id);
      expect(preset.id).toBe(id);
      expect(preset.items.length).toBeGreaterThanOrEqual(2);
      expect(preset.totalMacros.calories).toBeGreaterThan(400);
      expect(preset.totalMacros.protein).toBeGreaterThan(10);
      expect(preset.totalMacros.carbs).toBeGreaterThan(50);
      expect(preset.totalMacros.fats).toBeGreaterThan(10);
    }
  });

  it('ensures all bounding boxes are within 0% to 100% viewport boundaries', () => {
    for (const preset of Object.values(SCANNER_PRESETS)) {
      for (const item of preset.items) {
        expect(item.confidence).toBeGreaterThanOrEqual(90);
        expect(item.confidence).toBeLessThanOrEqual(100);

        expect(item.box.topPercent).toBeGreaterThanOrEqual(0);
        expect(item.box.leftPercent).toBeGreaterThanOrEqual(0);
        expect(item.box.topPercent + item.box.heightPercent).toBeLessThanOrEqual(100);
        expect(item.box.leftPercent + item.box.widthPercent).toBeLessThanOrEqual(100);
      }
    }
  });

  it('aggregates macros accurately matching individual item totals', () => {
    const thali = getScannerPreset('thali');
    const summedCalories = thali.items.reduce((sum, item) => sum + item.calories, 0);
    const summedProtein = thali.items.reduce((sum, item) => sum + item.protein, 0);

    expect(Math.abs(thali.totalMacros.calories - summedCalories)).toBeLessThanOrEqual(1);
    expect(Math.abs(thali.totalMacros.protein - summedProtein)).toBeLessThanOrEqual(0.1);
  });
});

