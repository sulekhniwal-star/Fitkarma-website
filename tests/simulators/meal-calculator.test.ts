import { describe, it, expect } from 'vitest';
import {
  calculateMealMacros,
  REGIONAL_THALI_PRESETS,
  type ThaliConfig,
} from '@/lib/simulators/meal-calculator';

describe('Indian Meal Sandbox Calculator Engine', () => {
  it('calculates baseline macros for all regional thalis', () => {
    for (const [thaliId, preset] of Object.entries(REGIONAL_THALI_PRESETS)) {
      const macros = calculateMealMacros(preset.id, preset.defaultConfig);
      expect(macros.calories).toBeGreaterThan(400);
      expect(macros.calories).toBeLessThan(900);
      expect(macros.protein).toBeGreaterThan(10);
      expect(macros.carbs).toBeGreaterThan(30);
      expect(macros.fats).toBeGreaterThan(5);
    }
  });

  it('correctly calculates roti scaling and ghee addon (+45 kcal per roti)', () => {
    const configWithoutGhee: ThaliConfig = {
      rotiCount: 2,
      hasGhee: false,
      riceKatoris: 0,
      dalKatoris: 1,
      tadkaIntensity: 'standard',
      hasCurd: false,
      hasSubzi: false,
    };

    const configWithGhee: ThaliConfig = {
      ...configWithoutGhee,
      hasGhee: true,
    };

    const macrosWithoutGhee = calculateMealMacros('north', configWithoutGhee);
    const macrosWithGhee = calculateMealMacros('north', configWithGhee);

    // 2 rotis with ghee should add exactly 90 kcal and 10g fats, without changing carbs or protein
    expect(macrosWithGhee.calories - macrosWithoutGhee.calories).toBe(90);
    expect(macrosWithGhee.fats - macrosWithoutGhee.fats).toBe(10);
    expect(macrosWithGhee.carbs).toBe(macrosWithoutGhee.carbs);
    expect(macrosWithGhee.protein).toBe(macrosWithoutGhee.protein);
  });

  it('correctly calculates tadka intensity lipid variations', () => {
    const baseConfig: ThaliConfig = {
      rotiCount: 0,
      hasGhee: false,
      riceKatoris: 0,
      dalKatoris: 1,
      tadkaIntensity: 'minimal',
      hasCurd: false,
      hasSubzi: false,
    };

    const minimal = calculateMealMacros('north', { ...baseConfig, tadkaIntensity: 'minimal' });
    const standard = calculateMealMacros('north', { ...baseConfig, tadkaIntensity: 'standard' });
    const rich = calculateMealMacros('north', { ...baseConfig, tadkaIntensity: 'rich' });

    expect(standard.calories).toBeGreaterThan(minimal.calories);
    expect(rich.calories).toBeGreaterThan(standard.calories);
    expect(rich.fats).toBeGreaterThan(standard.fats);
  });

  it('clamps extreme and negative bounds safely without throwing NaN', () => {
    const extremeConfig: ThaliConfig = {
      rotiCount: -5,
      hasGhee: false,
      riceKatoris: -2,
      dalKatoris: 999,
      tadkaIntensity: 'standard',
      hasCurd: false,
      hasSubzi: false,
    };

    const result = calculateMealMacros('north', extremeConfig);
    expect(result.calories).toBeGreaterThan(0);
    expect(Number.isNaN(result.calories)).toBe(false);
    expect(Number.isNaN(result.protein)).toBe(false);
    expect(Number.isNaN(result.carbs)).toBe(false);
    expect(Number.isNaN(result.fats)).toBe(false);
  });
});

