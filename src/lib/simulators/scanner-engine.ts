/**
 * AI Food Scanner Simulation Engine
 * FitKarma - India's AI-powered Fitness and Wellness Ecosystem
 */

export type ScannerDishId = 'thali' | 'dosa' | 'biryani';

export interface BoundingBox {
  topPercent: number;
  leftPercent: number;
  widthPercent: number;
  heightPercent: number;
}

export interface DetectedItem {
  id: string;
  nameKey: string;
  confidence: number;
  portionKey: string;
  calories: number;
  protein: number;
  carbs: number;
  fats: number;
  box: BoundingBox;
  color: string;
}

export interface ScannerPreset {
  id: ScannerDishId;
  titleKey: string;
  subtitleKey: string;
  items: DetectedItem[];
  totalMacros: {
    calories: number;
    protein: number;
    carbs: number;
    fats: number;
  };
}

export const SCANNER_PRESETS: Record<ScannerDishId, ScannerPreset> = {
  thali: {
    id: 'thali',
    titleKey: 'simulators.food_scanner.dishes.thali',
    subtitleKey: 'simulators.meal_sandbox.regions.north.desc',
    items: [
      {
        id: 'roti',
        nameKey: 'simulators.food_scanner.items.roti',
        confidence: 99,
        portionKey: '2x Whole Wheat (with Ghee)',
        calories: 240,
        protein: 5.0,
        carbs: 30.0,
        fats: 11.0,
        box: { topPercent: 18, leftPercent: 12, widthPercent: 36, heightPercent: 32 },
        color: '#D6A84B',
      },
      {
        id: 'dal',
        nameKey: 'simulators.food_scanner.items.dal',
        confidence: 97,
        portionKey: '1.5 Katori (Tadka Ghee)',
        calories: 195,
        protein: 10.5,
        carbs: 26.0,
        fats: 6.5,
        box: { topPercent: 16, leftPercent: 54, widthPercent: 34, heightPercent: 30 },
        color: '#EAB308',
      },
      {
        id: 'bhindi',
        nameKey: 'simulators.food_scanner.items.bhindi',
        confidence: 95,
        portionKey: '1 Katori (Spiced)',
        calories: 115,
        protein: 3.5,
        carbs: 11.0,
        fats: 7.0,
        box: { topPercent: 54, leftPercent: 32, widthPercent: 38, heightPercent: 28 },
        color: '#10B981',
      },
    ],
    totalMacros: {
      calories: 550,
      protein: 19.0,
      carbs: 67.0,
      fats: 24.5,
    },
  },
  dosa: {
    id: 'dosa',
    titleKey: 'simulators.food_scanner.dishes.dosa',
    subtitleKey: 'simulators.meal_sandbox.regions.south.desc',
    items: [
      {
        id: 'dosa_crepe',
        nameKey: 'simulators.food_scanner.items.dosa',
        confidence: 98,
        portionKey: '1 Crisp Crepe with Aloo Masala',
        calories: 280,
        protein: 6.0,
        carbs: 45.0,
        fats: 9.0,
        box: { topPercent: 22, leftPercent: 14, widthPercent: 72, heightPercent: 36 },
        color: '#D6A84B',
      },
      {
        id: 'sambar',
        nameKey: 'simulators.food_scanner.items.sambar',
        confidence: 96,
        portionKey: '1 Katori Drumstick Sambar',
        calories: 95,
        protein: 4.5,
        carbs: 15.0,
        fats: 2.0,
        box: { topPercent: 62, leftPercent: 15, widthPercent: 30, heightPercent: 26 },
        color: '#F59E0B',
      },
      {
        id: 'chutney',
        nameKey: 'simulators.food_scanner.items.chutney',
        confidence: 94,
        portionKey: 'Coconut & Tomato Chutneys',
        calories: 85,
        protein: 1.5,
        carbs: 5.0,
        fats: 7.0,
        box: { topPercent: 62, leftPercent: 52, widthPercent: 34, heightPercent: 26 },
        color: '#10B981',
      },
    ],
    totalMacros: {
      calories: 460,
      protein: 12.0,
      carbs: 65.0,
      fats: 18.0,
    },
  },
  biryani: {
    id: 'biryani',
    titleKey: 'simulators.food_scanner.dishes.biryani',
    subtitleKey: 'simulators.food_scanner.dishes.biryani',
    items: [
      {
        id: 'biryani_rice',
        nameKey: 'simulators.food_scanner.items.biryani',
        confidence: 98,
        portionKey: 'Spiced Fragrant Basmati Plate',
        calories: 480,
        protein: 16.0,
        carbs: 72.0,
        fats: 14.0,
        box: { topPercent: 18, leftPercent: 14, widthPercent: 72, heightPercent: 44 },
        color: '#D6A84B',
      },
      {
        id: 'raita',
        nameKey: 'simulators.food_scanner.items.raita',
        confidence: 96,
        portionKey: '1 Katori Mint Cucumber Dahi',
        calories: 90,
        protein: 4.5,
        carbs: 6.0,
        fats: 5.5,
        box: { topPercent: 66, leftPercent: 34, widthPercent: 34, heightPercent: 26 },
        color: '#3B82F6',
      },
    ],
    totalMacros: {
      calories: 570,
      protein: 20.5,
      carbs: 78.0,
      fats: 19.5,
    },
  },
};

/**
 * Returns scanner preset by dish ID
 */
export function getScannerPreset(id: ScannerDishId): ScannerPreset {
  return SCANNER_PRESETS[id] || SCANNER_PRESETS.thali;
}

