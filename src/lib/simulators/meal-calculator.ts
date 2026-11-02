/**
 * Indian Meal Sandbox Nutritional Calculation Engine
 * FitKarma - India's AI-powered Fitness and Wellness Ecosystem
 */

export type RegionalThaliId = 'north' | 'south' | 'bengali' | 'western';
export type TadkaIntensity = 'minimal' | 'standard' | 'rich';

export interface MacroBreakdown {
  calories: number;
  protein: number;
  carbs: number;
  fats: number;
  fiber: number;
}

export interface ThaliConfig {
  rotiCount: number;
  hasGhee: boolean;
  riceKatoris: number;
  dalKatoris: number;
  tadkaIntensity: TadkaIntensity;
  hasCurd: boolean;
  hasSubzi: boolean;
}

export interface RegionalThaliPreset {
  id: RegionalThaliId;
  nameKey: string;
  descriptionKey: string;
  defaultConfig: ThaliConfig;
  dalNameKey: string;
  subziNameKey: string;
}

export const REGIONAL_THALI_PRESETS: Record<RegionalThaliId, RegionalThaliPreset> = {
  north: {
    id: 'north',
    nameKey: 'simulators.meal_sandbox.regions.north.title',
    descriptionKey: 'simulators.meal_sandbox.regions.north.desc',
    dalNameKey: 'simulators.meal_sandbox.regions.north.dal_name',
    subziNameKey: 'simulators.meal_sandbox.regions.north.subzi_name',
    defaultConfig: {
      rotiCount: 2,
      hasGhee: true,
      riceKatoris: 0.5,
      dalKatoris: 1.0,
      tadkaIntensity: 'standard',
      hasCurd: true,
      hasSubzi: true,
    },
  },
  south: {
    id: 'south',
    nameKey: 'simulators.meal_sandbox.regions.south.title',
    descriptionKey: 'simulators.meal_sandbox.regions.south.desc',
    dalNameKey: 'simulators.meal_sandbox.regions.south.dal_name',
    subziNameKey: 'simulators.meal_sandbox.regions.south.subzi_name',
    defaultConfig: {
      rotiCount: 0,
      hasGhee: false,
      riceKatoris: 1.5,
      dalKatoris: 1.5,
      tadkaIntensity: 'standard',
      hasCurd: true,
      hasSubzi: true,
    },
  },
  bengali: {
    id: 'bengali',
    nameKey: 'simulators.meal_sandbox.regions.bengali.title',
    descriptionKey: 'simulators.meal_sandbox.regions.bengali.desc',
    dalNameKey: 'simulators.meal_sandbox.regions.bengali.dal_name',
    subziNameKey: 'simulators.meal_sandbox.regions.bengali.subzi_name',
    defaultConfig: {
      rotiCount: 0,
      hasGhee: false,
      riceKatoris: 1.5,
      dalKatoris: 1.0,
      tadkaIntensity: 'standard',
      hasCurd: false,
      hasSubzi: true,
    },
  },
  western: {
    id: 'western',
    nameKey: 'simulators.meal_sandbox.regions.western.title',
    descriptionKey: 'simulators.meal_sandbox.regions.western.desc',
    dalNameKey: 'simulators.meal_sandbox.regions.western.dal_name',
    subziNameKey: 'simulators.meal_sandbox.regions.western.subzi_name',
    defaultConfig: {
      rotiCount: 3,
      hasGhee: true,
      riceKatoris: 0.5,
      dalKatoris: 1.0,
      tadkaIntensity: 'standard',
      hasCurd: true,
      hasSubzi: true,
    },
  },
};

// Nutritional constants per single unit/katori (150ml)
const ROTI_NUTRITION = {
  base: { calories: 75, protein: 2.5, carbs: 15.0, fats: 0.5, fiber: 2.2 },
  gheeAddon: { calories: 45, protein: 0.0, carbs: 0.0, fats: 5.0, fiber: 0.0 },
};

const RICE_PER_KATORI = {
  calories: 155,
  protein: 3.0,
  carbs: 35.0,
  fats: 0.4,
  fiber: 0.8,
};

const DAL_BY_REGION: Record<RegionalThaliId, MacroBreakdown> = {
  north: { calories: 140, protein: 8.0, carbs: 20.0, fats: 3.0, fiber: 5.0 },
  south: { calories: 100, protein: 4.5, carbs: 16.0, fats: 2.0, fiber: 4.0 },
  bengali: { calories: 130, protein: 7.0, carbs: 21.0, fats: 2.5, fiber: 4.5 },
  western: { calories: 120, protein: 5.0, carbs: 22.0, fats: 2.0, fiber: 3.5 },
};

const TADKA_ADDON: Record<TadkaIntensity, MacroBreakdown> = {
  minimal: { calories: 25, protein: 0.0, carbs: 0.0, fats: 2.8, fiber: 0.0 },
  standard: { calories: 50, protein: 0.0, carbs: 0.0, fats: 5.5, fiber: 0.0 },
  rich: { calories: 130, protein: 0.0, carbs: 0.0, fats: 14.5, fiber: 0.0 },
};

const CURD_PER_KATORI = {
  calories: 95,
  protein: 5.0,
  carbs: 6.0,
  fats: 6.0,
  fiber: 0.0,
};

const SUBZI_BY_REGION: Record<RegionalThaliId, MacroBreakdown> = {
  north: { calories: 170, protein: 8.5, carbs: 6.0, fats: 13.0, fiber: 2.0 },
  south: { calories: 110, protein: 3.0, carbs: 12.0, fats: 6.0, fiber: 4.0 },
  bengali: { calories: 160, protein: 4.0, carbs: 18.0, fats: 8.5, fiber: 3.5 },
  western: { calories: 140, protein: 3.5, carbs: 16.0, fats: 7.5, fiber: 2.5 },
};

const SALAD_BASE = {
  calories: 25,
  protein: 1.0,
  carbs: 5.0,
  fats: 0.2,
  fiber: 2.0,
};

/**
 * Clamps input numbers to prevent negative values or DOM tampering bounds
 */
function clamp(val: number, min: number, max: number): number {
  if (Number.isNaN(val)) return min;
  return Math.min(Math.max(val, min), max);
}

/**
 * Calculates live macros for an Indian Meal configuration
 */
export function calculateMealMacros(
  thaliId: RegionalThaliId,
  config: ThaliConfig
): MacroBreakdown {
  const safeRotiCount = clamp(Math.round(config.rotiCount || 0), 0, 8);
  const safeRiceKatoris = clamp(config.riceKatoris || 0, 0, 4);
  const safeDalKatoris = clamp(config.dalKatoris || 0, 0, 4);
  const tadka = TADKA_ADDON[config.tadkaIntensity] || TADKA_ADDON.standard;
  const regionalDal = DAL_BY_REGION[thaliId] || DAL_BY_REGION.north;
  const regionalSubzi = SUBZI_BY_REGION[thaliId] || SUBZI_BY_REGION.north;

  let totalCalories = SALAD_BASE.calories;
  let totalProtein = SALAD_BASE.protein;
  let totalCarbs = SALAD_BASE.carbs;
  let totalFats = SALAD_BASE.fats;
  let totalFiber = SALAD_BASE.fiber;

  // 1. Rotis
  if (safeRotiCount > 0) {
    const singleRotiCal = ROTI_NUTRITION.base.calories + (config.hasGhee ? ROTI_NUTRITION.gheeAddon.calories : 0);
    const singleRotiFats = ROTI_NUTRITION.base.fats + (config.hasGhee ? ROTI_NUTRITION.gheeAddon.fats : 0);
    totalCalories += safeRotiCount * singleRotiCal;
    totalProtein += safeRotiCount * ROTI_NUTRITION.base.protein;
    totalCarbs += safeRotiCount * ROTI_NUTRITION.base.carbs;
    totalFats += safeRotiCount * singleRotiFats;
    totalFiber += safeRotiCount * ROTI_NUTRITION.base.fiber;
  }

  // 2. Rice
  if (safeRiceKatoris > 0) {
    totalCalories += safeRiceKatoris * RICE_PER_KATORI.calories;
    totalProtein += safeRiceKatoris * RICE_PER_KATORI.protein;
    totalCarbs += safeRiceKatoris * RICE_PER_KATORI.carbs;
    totalFats += safeRiceKatoris * RICE_PER_KATORI.fats;
    totalFiber += safeRiceKatoris * RICE_PER_KATORI.fiber;
  }

  // 3. Dal + Tadka
  if (safeDalKatoris > 0) {
    totalCalories += safeDalKatoris * regionalDal.calories + tadka.calories;
    totalProtein += safeDalKatoris * regionalDal.protein;
    totalCarbs += safeDalKatoris * regionalDal.carbs;
    totalFats += safeDalKatoris * regionalDal.fats + tadka.fats;
    totalFiber += safeDalKatoris * regionalDal.fiber;
  }

  // 4. Curd
  if (config.hasCurd) {
    totalCalories += CURD_PER_KATORI.calories;
    totalProtein += CURD_PER_KATORI.protein;
    totalCarbs += CURD_PER_KATORI.carbs;
    totalFats += CURD_PER_KATORI.fats;
  }

  // 5. Subzi
  if (config.hasSubzi) {
    totalCalories += regionalSubzi.calories;
    totalProtein += regionalSubzi.protein;
    totalCarbs += regionalSubzi.carbs;
    totalFats += regionalSubzi.fats;
    totalFiber += regionalSubzi.fiber;
  }

  return {
    calories: Math.round(totalCalories),
    protein: Math.round(totalProtein * 10) / 10,
    carbs: Math.round(totalCarbs * 10) / 10,
    fats: Math.round(totalFats * 10) / 10,
    fiber: Math.round(totalFiber * 10) / 10,
  };
}
