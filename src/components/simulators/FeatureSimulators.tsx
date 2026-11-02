'use client';

import React, { useState } from 'react';
import { useTranslations } from 'next-intl';
import { type FeatureKey } from '@/lib/features/feature-definitions';
import { IndianMealSandbox } from './IndianMealSandbox';
import { DailyIntelligencePackage } from './DailyIntelligencePackage';
import { FoodScannerSimulator } from './FoodScannerSimulator';
import {
  Play,
  CheckCircle2,
  AlertTriangle,
  Lock,
  Trash2,
  Flame,
  Users,
  Activity,
  Calendar,
  Heart,
  Watch,
  Sparkles,
  PhoneCall,
  ShieldCheck,
} from 'lucide-react';

interface FeatureSimulatorsProps {
  featureKey: FeatureKey;
}

export function FeatureSimulators({ featureKey }: FeatureSimulatorsProps) {
  switch (featureKey) {
    case 'meal_sandbox':
      return <IndianMealSandbox />;
    case 'dip':
      return <DailyIntelligencePackage />;
    case 'ai_photo_scanner':
      return <FoodScannerSimulator />;
    case 'whatsapp_logging':
      return <WhatsAppSimulator />;
    case 'tadka_slider':
      return <TadkaSimulator />;
    case 'family_recipe_splitter':
      return <FamilyRecipeSplitterSimulator />;
    case 'dynamic_tdee':
      return <DynamicTdeeSimulator />;
    case 'festival_fasting':
      return <FestivalFastingSimulator />;
    case 'family_care':
      return <FamilyCareSimulator />;
    case 'data_vault':
      return <DataVaultSimulator />;
    case 'health_os_sync':
      return <HealthOsSyncSimulator />;
    case 'womens_health':
      return <WomensHealthSimulator />;
    default:
      return <IndianMealSandbox />;
  }
}

// ----------------------------------------------------
// 1. WhatsApp Voice & Text Logging Simulator
// ----------------------------------------------------
function WhatsAppSimulator() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLogged, setIsLogged] = useState(false);

  return (
    <div className="w-full rounded-3xl bg-[#0B141A] border border-emerald-900/40 p-4 sm:p-6 shadow-2xl text-white font-sans overflow-hidden">
      {/* WhatsApp Header */}
      <div className="flex items-center justify-between pb-4 border-b border-white/10">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-emerald-600 flex items-center justify-center font-bold text-white shadow-md">
            FK
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="text-sm font-bold text-white">FitKarma Health OS</span>
              <span className="w-3.5 h-3.5 rounded-full bg-emerald-500 flex items-center justify-center text-[9px] text-black font-extrabold">✓</span>
            </div>
            <span className="text-[11px] text-emerald-400">Online • AI Logging Rail</span>
          </div>
        </div>
        <span className="text-xs text-gray-400 font-mono">WhatsApp Beta</span>
      </div>

      {/* Chat Stream */}
      <div className="py-6 space-y-4 max-h-[460px] overflow-y-auto">
        {/* User Voice Note */}
        <div className="flex justify-end">
          <div className="max-w-[85%] sm:max-w-[75%] rounded-2xl rounded-tr-xs bg-[#005C4B] p-3.5 shadow-md space-y-2">
            <div className="flex items-center gap-3">
              <button
                onClick={() => setIsPlaying(!isPlaying)}
                className="w-8 h-8 rounded-full bg-emerald-400 text-black flex items-center justify-center shrink-0 hover:scale-105 transition-transform"
              >
                {isPlaying ? <span className="font-mono text-xs">❚❚</span> : <Play className="w-3.5 h-3.5 fill-black ml-0.5" />}
              </button>
              {/* Voice Waveform Graphic */}
              <div className="flex-1 flex items-center gap-0.5 h-6">
                {[12, 24, 8, 16, 20, 24, 18, 10, 22, 14, 20, 8, 18, 22, 12].map((h, i) => (
                  <span
                    key={i}
                    className={`w-1 rounded-full transition-all ${
                      isPlaying ? 'bg-emerald-300 animate-pulse' : 'bg-white/40'
                    }`}
                    style={{ height: `${h}px` }}
                  />
                ))}
              </div>
              <span className="text-[10px] text-emerald-200 font-mono">0:12</span>
            </div>
            <p className="text-[11px] text-emerald-100 italic pt-1 border-t border-emerald-400/20">
              Voice Note (Hinglish): &quot;Aaj lunch me 2 roti desi ghee me, 1 bowl dal tadka aur bhindi khayi&quot;
            </p>
          </div>
        </div>

        {/* FitKarma AI Response */}
        <div className="flex justify-start">
          <div className="max-w-[90%] sm:max-w-[80%] rounded-2xl rounded-tl-xs bg-[#202C33] p-4 shadow-md space-y-3 border border-white/5">
            <div className="flex items-center justify-between text-xs text-emerald-400 font-bold border-b border-white/10 pb-2">
              <span>✦ Multi-Model AI Parsed Indian Meal</span>
              <span className="text-[10px] text-gray-400 font-normal">98% Confidence</span>
            </div>

            <div className="space-y-1.5 text-xs text-gray-200">
              <div className="flex justify-between">
                <span>• 2x Phulka with Desi Ghee</span>
                <span className="font-mono text-gray-400">240 kcal</span>
              </div>
              <div className="flex justify-between">
                <span>• 1 Katori Yellow Dal Tadka</span>
                <span className="font-mono text-gray-400">140 kcal</span>
              </div>
              <div className="flex justify-between">
                <span>• 1 Katori Bhindi Masala</span>
                <span className="font-mono text-gray-400">110 kcal</span>
              </div>
            </div>

            {/* Total Macros Strip */}
            <div className="p-2.5 rounded-xl bg-black/40 grid grid-cols-4 gap-1 text-center text-[10px]">
              <div>
                <span className="text-gray-400 block">Total</span>
                <span className="font-mono font-bold text-white">490 kcal</span>
              </div>
              <div>
                <span className="text-gray-400 block">Protein</span>
                <span className="font-mono font-bold text-emerald-400">16.5g</span>
              </div>
              <div>
                <span className="text-gray-400 block">Carbs</span>
                <span className="font-mono font-bold text-blue-400">54g</span>
              </div>
              <div>
                <span className="text-gray-400 block">Fats</span>
                <span className="font-mono font-bold text-amber-400">18.5g</span>
              </div>
            </div>

            {/* Confirm & Log Action */}
            <button
              onClick={() => setIsLogged(true)}
              className={`w-full py-2.5 rounded-xl text-xs font-semibold transition-all flex items-center justify-center gap-1.5 ${
                isLogged
                  ? 'bg-emerald-500 text-black shadow-lg shadow-emerald-500/30'
                  : 'bg-emerald-600 hover:bg-emerald-500 text-white shadow'
              }`}
            >
              {isLogged ? (
                <>
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Meal Logged into FitKarma Health OS!</span>
                </>
              ) : (
                <span>Confirm & Log to Today&apos;s Nutrition</span>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ----------------------------------------------------
// 2. Tadka / Tempering Fat Slider Simulator
// ----------------------------------------------------
function TadkaSimulator() {
  const [tadkaLevel, setTadkaLevel] = useState<'low' | 'med' | 'high'>('med');

  const configs = {
    low: { title: 'Minimal Diet Tempering', oil: '1/2 tsp (2.5 ml)', calories: 25, fats: 2.8, desc: 'Steamed or dry-roasted spices with trace mustard oil.' },
    med: { title: 'Authentic Home-Style', oil: '1 tsp (5 ml) Desi Ghee', calories: 50, fats: 5.5, desc: 'Traditional jeera, hing, and garlic sizzling in warm pure ghee.' },
    high: { title: 'Festive / Dhaba Tempering', oil: '2 tbsp (30 ml) Ghee/Butter', calories: 130, fats: 14.5, desc: 'Rich double-tempered butter tadka standard in restaurant dishes.' },
  };

  const current = configs[tadkaLevel];

  return (
    <div className="w-full rounded-3xl bg-[#12151B] border border-amber-500/20 p-6 shadow-2xl space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Flame className="w-5 h-5 text-amber-400 animate-pulse" />
          <h3 className="text-lg font-bold text-white">Tadka & Tempering Fat Multiplier</h3>
        </div>
        <span className="px-2.5 py-0.5 rounded-full text-xs font-mono font-bold bg-amber-500/10 text-amber-400 border border-amber-500/30">
          Lipid Variable Engine
        </span>
      </div>

      <p className="text-xs text-gray-400 leading-relaxed">
        Standard calorie counters treat all dal as identical. In reality, the tempering oil alone alters lipid calories by over 300%.
      </p>

      {/* 3-State Interactive Buttons */}
      <div className="grid grid-cols-3 gap-2">
        {(['low', 'med', 'high'] as const).map((lvl) => (
          <button
            key={lvl}
            onClick={() => setTadkaLevel(lvl)}
            className={`py-3 px-2 rounded-2xl text-xs font-semibold transition-all ${
              tadkaLevel === lvl
                ? 'bg-amber-500 text-black font-bold shadow-lg shadow-amber-500/20'
                : 'bg-white/5 text-gray-400 hover:text-white hover:bg-white/10'
            }`}
          >
            {lvl === 'low' && 'Minimal (1/2 tsp)'}
            {lvl === 'med' && 'Home (1 tsp Ghee)'}
            {lvl === 'high' && 'Dhaba (2 tbsp)'}
          </button>
        ))}
      </div>

      {/* Sizzling Pan Simulation Visual */}
      <div className="p-5 rounded-2xl bg-black/40 border border-white/5 space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-sm font-bold text-white">{current.title}</span>
          <span className="text-xs font-mono text-amber-400 font-semibold">{current.oil}</span>
        </div>
        <p className="text-xs text-gray-300 leading-relaxed">{current.desc}</p>

        {/* Nutritional Impact Grid */}
        <div className="grid grid-cols-2 gap-3 pt-3 border-t border-white/5">
          <div className="p-3 rounded-xl bg-white/[0.03]">
            <span className="text-[10px] text-gray-400 uppercase font-semibold">Added Calories</span>
            <span className="text-xl font-mono font-bold text-white block mt-0.5">+{current.calories} kcal</span>
          </div>
          <div className="p-3 rounded-xl bg-white/[0.03]">
            <span className="text-[10px] text-gray-400 uppercase font-semibold">Added Lipids</span>
            <span className="text-xl font-mono font-bold text-amber-400 block mt-0.5">+{current.fats}g Fats</span>
          </div>
        </div>
      </div>
    </div>
  );
}

// ----------------------------------------------------
// 3. Family Recipe Splitter Simulator
// ----------------------------------------------------
function FamilyRecipeSplitterSimulator() {
  const [percentage, setPercentage] = useState<number>(25);

  const totalPot = {
    dish: 'Paneer Makhani (Whole Household Pot)',
    rawIngredients: '500g Fresh Paneer, 400g Tomato Puree, 3 tbsp Desi Ghee, Spices',
    totalCalories: 1480,
    totalProtein: 78,
  };

  const userPortion = {
    calories: Math.round((totalPot.totalCalories * percentage) / 100),
    protein: Math.round(((totalPot.totalProtein * percentage) / 100) * 10) / 10,
  };

  return (
    <div className="w-full rounded-3xl bg-[#12151B] border border-emerald-500/20 p-6 shadow-2xl space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Users className="w-5 h-5 text-emerald-400" />
          <h3 className="text-lg font-bold text-white">Family Recipe Splitter</h3>
        </div>
        <span className="px-2.5 py-0.5 rounded-full text-xs font-mono font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
          Household Pot Logic
        </span>
      </div>

      <p className="text-xs text-gray-400 leading-relaxed">
        Indian food is cooked in shared pots. Log raw ingredients for the whole family, then slide to allocate your individual plate percentage.
      </p>

      {/* Whole Pot Summary */}
      <div className="p-4 rounded-2xl bg-black/40 border border-white/5 space-y-2">
        <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400">Household Pot Recipe</span>
        <div className="flex justify-between items-baseline">
          <span className="text-sm font-bold text-white">{totalPot.dish}</span>
          <span className="text-xs font-mono text-emerald-400 font-semibold">{totalPot.totalCalories} kcal Total</span>
        </div>
        <p className="text-[11px] text-gray-400">{totalPot.rawIngredients}</p>
      </div>

      {/* Percentage Slider */}
      <div className="space-y-3">
        <div className="flex justify-between items-center text-sm font-medium">
          <span className="text-gray-300">Portion of Pot Consumed:</span>
          <span className="font-mono font-extrabold text-emerald-400 text-lg">{percentage}%</span>
        </div>
        <input
          type="range"
          min={5}
          max={100}
          step={5}
          value={percentage}
          onChange={(e) => setPercentage(parseInt(e.target.value, 10))}
          className="w-full h-2 rounded-lg bg-white/10 accent-emerald-500 cursor-pointer"
        />
      </div>

      {/* Allocated Result */}
      <div className="p-4 rounded-2xl bg-emerald-950/20 border border-emerald-500/30 flex items-center justify-between">
        <div>
          <span className="text-xs text-emerald-300 font-bold block">Your Calculated Portion:</span>
          <span className="text-2xl font-mono font-black text-white">{userPortion.calories} kcal</span>
        </div>
        <div className="text-right">
          <span className="text-xs text-gray-400 block">Personal Protein:</span>
          <span className="text-base font-mono font-bold text-emerald-400">{userPortion.protein}g</span>
        </div>
      </div>
    </div>
  );
}

// ----------------------------------------------------
// 4. Dynamic Adaptive TDEE Simulator
// ----------------------------------------------------
function DynamicTdeeSimulator() {
  const [steps, setSteps] = useState<number>(8500);
  const [weightTrend, setWeightTrend] = useState<number>(-0.2); // kg/week

  const baseBmr = 1580;
  const activityBurn = Math.round(steps * 0.04);
  const adaptiveAdjustment = Math.round(weightTrend * 250);
  const totalTdee = baseBmr + activityBurn + adaptiveAdjustment;

  return (
    <div className="w-full rounded-3xl bg-[#12151B] border border-blue-500/20 p-6 shadow-2xl space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Activity className="w-5 h-5 text-blue-400" />
          <h3 className="text-lg font-bold text-white">Dynamic & Adaptive TDEE</h3>
        </div>
        <span className="px-2.5 py-0.5 rounded-full text-xs font-mono font-bold bg-blue-500/10 text-blue-400 border border-blue-500/30">
          Metabolic Math
        </span>
      </div>

      <p className="text-xs text-gray-400 leading-relaxed">
        Static online formulas fail as your body adapts. FitKarma continuously recalculates true expenditure based on actual steps and weekly weight velocity.
      </p>

      {/* Step Slider */}
      <div className="space-y-2">
        <div className="flex justify-between text-xs font-medium">
          <span className="text-gray-300">Daily Step Biometrics (Health Connect):</span>
          <span className="font-mono text-blue-400 font-bold">{steps.toLocaleString()} steps</span>
        </div>
        <input
          type="range"
          min={3000}
          max={18000}
          step={500}
          value={steps}
          onChange={(e) => setSteps(parseInt(e.target.value, 10))}
          className="w-full h-2 rounded-lg bg-white/10 accent-blue-500 cursor-pointer"
        />
      </div>

      {/* Weight Velocity Slider */}
      <div className="space-y-2">
        <div className="flex justify-between text-xs font-medium">
          <span className="text-gray-300">7-Day Smoothed Weight Velocity:</span>
          <span className="font-mono text-white font-bold">{weightTrend > 0 ? `+${weightTrend}` : weightTrend} kg / week</span>
        </div>
        <input
          type="range"
          min={-1.0}
          max={1.0}
          step={0.1}
          value={weightTrend}
          onChange={(e) => setWeightTrend(parseFloat(e.target.value))}
          className="w-full h-2 rounded-lg bg-white/10 accent-blue-500 cursor-pointer"
        />
      </div>

      {/* TDEE Output Box */}
      <div className="p-5 rounded-2xl bg-black/40 border border-white/5 flex items-center justify-between">
        <div>
          <span className="text-xs text-gray-400 block">Personalized Adaptive TDEE:</span>
          <span className="text-3xl font-mono font-black text-white">{totalTdee}</span>
          <span className="text-xs text-blue-400 font-bold ml-1">kcal/day</span>
        </div>
        <div className="text-right text-xs text-gray-400 space-y-1">
          <div>Base BMR: <span className="font-mono text-white">{baseBmr}</span></div>
          <div>Step Burn: <span className="font-mono text-emerald-400">+{activityBurn}</span></div>
          <div>Metabolic Shift: <span className="font-mono text-blue-400">{adaptiveAdjustment > 0 ? `+${adaptiveAdjustment}` : adaptiveAdjustment}</span></div>
        </div>
      </div>
    </div>
  );
}

// ----------------------------------------------------
// 5. Festival & Fasting Mode Simulator
// ----------------------------------------------------
function FestivalFastingSimulator() {
  const [selectedFast, setSelectedFast] = useState<'navratri' | 'ramzan' | 'ekadashi'>('navratri');

  const fasts = {
    navratri: {
      name: 'Navratri Fasting (Satvik)',
      window: 'Sunset to Sunrise',
      allowed: 'Kuttu/Singhara Atta, Sabudana, Sendha Namak, Makhana, Dahi',
      hydrationTarget: '3.2L (Electrolyte emphasis)',
    },
    ramzan: {
      name: 'Ramzan Fasting (Roza)',
      window: 'Sehri (04:45 AM) to Iftar (06:55 PM)',
      allowed: 'Pre-dawn complex carbs & slow proteins; Iftar date + hydration pulse',
      hydrationTarget: '2.8L during eating hours',
    },
    ekadashi: {
      name: 'Ekadashi Fast (Vrat)',
      window: '24-Hour Grain-Free Window',
      allowed: 'Seasonal fruits, nuts, milk, ginger lemon water',
      hydrationTarget: '3.0L with herbal infusions',
    },
  };

  const current = fasts[selectedFast];

  return (
    <div className="w-full rounded-3xl bg-[#12151B] border border-purple-500/20 p-6 shadow-2xl space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Calendar className="w-5 h-5 text-purple-400" />
          <h3 className="text-lg font-bold text-white">Festival & Fasting Mode</h3>
        </div>
        <span className="px-2.5 py-0.5 rounded-full text-xs font-mono font-bold bg-purple-500/10 text-purple-400 border border-purple-500/30">
          Cultural Fasting Rails
        </span>
      </div>

      <div className="grid grid-cols-3 gap-2">
        {(['navratri', 'ramzan', 'ekadashi'] as const).map((key) => (
          <button
            key={key}
            onClick={() => setSelectedFast(key)}
            className={`py-2 px-1 rounded-xl text-xs font-semibold capitalize transition-all ${
              selectedFast === key
                ? 'bg-purple-600 text-white font-bold shadow-lg shadow-purple-600/30'
                : 'bg-white/5 text-gray-400 hover:text-white'
            }`}
          >
            {key}
          </button>
        ))}
      </div>

      <div className="p-4 rounded-2xl bg-black/40 border border-white/5 space-y-3">
        <div className="flex justify-between items-center">
          <span className="text-sm font-bold text-white">{current.name}</span>
          <span className="text-[11px] font-mono text-purple-300 font-semibold">{current.window}</span>
        </div>
        <p className="text-xs text-gray-300 leading-relaxed"><strong className="text-white">Satvik Ingredients:</strong> {current.allowed}</p>
        <div className="p-3 rounded-xl bg-purple-950/20 border border-purple-500/30 flex justify-between items-center text-xs">
          <span className="text-gray-300">Recommended Fasting Hydration:</span>
          <span className="font-mono font-bold text-purple-300">{current.hydrationTarget}</span>
        </div>
      </div>
    </div>
  );
}

// ----------------------------------------------------
// 6. Family Care Dashboard Simulator
// ----------------------------------------------------
function FamilyCareSimulator() {
  const [alertSent, setAlertSent] = useState(false);

  return (
    <div className="w-full rounded-3xl bg-[#12151B] border border-red-500/20 p-6 shadow-2xl space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Heart className="w-5 h-5 text-red-400" />
          <h3 className="text-lg font-bold text-white">Family Care Dashboard</h3>
        </div>
        <span className="px-2.5 py-0.5 rounded-full text-xs font-mono font-bold bg-red-500/10 text-red-400 border border-red-500/30">
          Consent-Based Telemetry
        </span>
      </div>

      {/* Parent Telemetry Card */}
      <div className="p-4 rounded-2xl bg-black/40 border border-white/5 space-y-3">
        <div className="flex items-center justify-between">
          <div>
            <span className="text-sm font-bold text-white">Dad&apos;s Biometrics (Age 64)</span>
            <span className="text-[10px] text-emerald-400 block">Affirmative Consent Verified ✓</span>
          </div>
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
        </div>

        <div className="grid grid-cols-3 gap-2 text-center text-xs">
          <div className="p-2 rounded-xl bg-white/[0.03]">
            <span className="text-[10px] text-gray-400 block">Steps</span>
            <span className="font-mono font-bold text-white">6,420 / 7k</span>
          </div>
          <div className="p-2 rounded-xl bg-white/[0.03]">
            <span className="text-[10px] text-gray-400 block">BP</span>
            <span className="font-mono font-bold text-emerald-400">128/82</span>
          </div>
          <div className="p-2 rounded-xl bg-white/[0.03]">
            <span className="text-[10px] text-gray-400 block">Meds</span>
            <span className="font-mono font-bold text-blue-400">Taken ✓</span>
          </div>
        </div>
      </div>

      {/* Simulated Alert Trigger */}
      <button
        onClick={() => setAlertSent(true)}
        className="w-full py-2.5 rounded-xl bg-red-500/20 border border-red-500/40 text-red-300 text-xs font-semibold hover:bg-red-500/30 transition-all flex items-center justify-center gap-2"
      >
        <AlertTriangle className="w-4 h-4" />
        <span>Simulate Parental Glucose Spike Alert</span>
      </button>

      {alertSent && (
        <div className="p-3 rounded-xl bg-red-950/40 border border-red-500/50 text-xs text-red-200 flex items-center gap-2 animate-slide-up">
          <PhoneCall className="w-4 h-4 text-red-400 shrink-0" />
          <span>Automated WhatsApp alert triggered to family caregiver circle!</span>
        </div>
      )}
    </div>
  );
}

// ----------------------------------------------------
// 7. Encrypted Data Vault & 1-Click Erasure Simulator
// ----------------------------------------------------
function DataVaultSimulator() {
  const [isErased, setIsErased] = useState(false);

  return (
    <div className="w-full rounded-3xl bg-[#12151B] border border-emerald-500/20 p-6 shadow-2xl space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Lock className="w-5 h-5 text-emerald-400" />
          <h3 className="text-lg font-bold text-white">Encrypted Data Vault (DPDP Act)</h3>
        </div>
        <span className="px-2.5 py-0.5 rounded-full text-xs font-mono font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
          Zero Data Selling
        </span>
      </div>

      <div className="p-4 rounded-2xl bg-black/40 border border-white/5 space-y-3">
        <div className="flex justify-between items-center text-xs">
          <span className="text-gray-300">Local Device Storage (SQLCipher 256-bit):</span>
          <span className="font-mono text-emerald-400 font-bold">100% Encrypted</span>
        </div>
        <div className="flex justify-between items-center text-xs">
          <span className="text-gray-300">Cloud Sync (PostgreSQL Row-Level Security):</span>
          <span className="font-mono text-blue-400 font-bold">User Isolated Only</span>
        </div>
        <div className="flex justify-between items-center text-xs">
          <span className="text-gray-300">Third-Party Data Brokers / Ad Networks:</span>
          <span className="font-mono text-red-400 font-bold">Zero (Prohibited)</span>
        </div>
      </div>

      <button
        onClick={() => setIsErased(true)}
        className="w-full py-3 rounded-xl bg-red-950/40 border border-red-600/40 text-red-300 hover:bg-red-900/50 text-xs font-semibold transition-all flex items-center justify-center gap-2"
      >
        <Trash2 className="w-4 h-4 text-red-400" />
        <span>Simulate &apos;Erase My Existence&apos; Cascading Purge</span>
      </button>

      {isErased && (
        <div className="p-4 rounded-2xl bg-black border border-emerald-500/50 text-xs font-mono text-emerald-300 space-y-1 animate-slide-up">
          <div className="flex items-center gap-2 font-bold text-white">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>Cryptographic Erasure Receipt Generated</span>
          </div>
          <div className="text-[10px] text-gray-400 truncate">SHA256: 7f83b1657ff1fc53b92dc18148a1d65dfc2d4b1fa3d677284addd200126d9069</div>
          <p className="text-[10px] text-emerald-400">All local SQLite tables & Supabase user records atomically purged.</p>
        </div>
      )}
    </div>
  );
}

// ----------------------------------------------------
// 8. Health OS Sync Simulator
// ----------------------------------------------------
function HealthOsSyncSimulator() {
  return (
    <div className="w-full rounded-3xl bg-[#12151B] border border-blue-500/20 p-6 shadow-2xl space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Watch className="w-5 h-5 text-blue-400" />
          <h3 className="text-lg font-bold text-white">Google Health Connect & Apple Health</h3>
        </div>
        <span className="px-2.5 py-0.5 rounded-full text-xs font-mono font-bold bg-blue-500/10 text-blue-400 border border-blue-500/30">
          OS Telemetry
        </span>
      </div>

      <div className="p-4 rounded-2xl bg-black/40 border border-white/5 space-y-3">
        <div className="flex justify-between items-center text-xs">
          <span className="text-white font-semibold">Active Biometrics Stream:</span>
          <span className="text-emerald-400 font-mono text-[10px] animate-pulse">● LIVE SYNC</span>
        </div>
        <div className="grid grid-cols-3 gap-2 text-center text-xs">
          <div className="p-2 rounded-xl bg-white/[0.03]">
            <span className="text-[10px] text-gray-400 block">Resting HR</span>
            <span className="font-mono font-bold text-white">58 bpm</span>
          </div>
          <div className="p-2 rounded-xl bg-white/[0.03]">
            <span className="text-[10px] text-gray-400 block">Deep Sleep</span>
            <span className="font-mono font-bold text-purple-400">1h 48m</span>
          </div>
          <div className="p-2 rounded-xl bg-white/[0.03]">
            <span className="text-[10px] text-gray-400 block">Active Cal</span>
            <span className="font-mono font-bold text-emerald-400">420 kcal</span>
          </div>
        </div>
      </div>
    </div>
  );
}

// ----------------------------------------------------
// 9. Women's Health & PCOS Simulator
// ----------------------------------------------------
function WomensHealthSimulator() {
  const [phase, setPhase] = useState<'follicular' | 'ovulatory' | 'luteal' | 'menstrual'>('follicular');

  const phaseData = {
    follicular: { title: 'Follicular Phase (Days 6–13)', advice: 'High insulin sensitivity & estrogen peak. Optimal window for progressive overload strength training & complex carbohydrates.' },
    ovulatory: { title: 'Ovulatory Phase (Days 14–16)', advice: 'Peak metabolic energy and strength potential. Target personal records in lifting with electrolyte hydration.' },
    luteal: { title: 'Luteal Phase (Days 17–28)', advice: 'Progesterone rise; metabolic resting burn increases by ~100 kcal. Prioritize healthy fats, magnesium, and active recovery.' },
    menstrual: { title: 'Menstrual Phase (Days 1–5)', advice: 'Hormonal baseline reset. Focus on iron-dense Indian nutrition (spinach, jaggery, beetroot) and gentle walks.' },
  };

  return (
    <div className="w-full rounded-3xl bg-[#12151B] border border-pink-500/20 p-6 shadow-2xl space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-pink-400" />
          <h3 className="text-lg font-bold text-white">Women&apos;s Health & PCOS Support</h3>
        </div>
        <span className="px-2.5 py-0.5 rounded-full text-xs font-mono font-bold bg-pink-500/10 text-pink-400 border border-pink-500/30">
          Cycle-Aware Health
        </span>
      </div>

      <div className="grid grid-cols-4 gap-1.5 text-center">
        {(['menstrual', 'follicular', 'ovulatory', 'luteal'] as const).map((p) => (
          <button
            key={p}
            onClick={() => setPhase(p)}
            className={`py-2 px-1 rounded-xl text-[11px] font-semibold capitalize transition-all ${
              phase === p
                ? 'bg-pink-500 text-white font-bold shadow-lg shadow-pink-500/30'
                : 'bg-white/5 text-gray-400 hover:text-white'
            }`}
          >
            {p}
          </button>
        ))}
      </div>

      <div className="p-4 rounded-2xl bg-black/40 border border-white/5 space-y-2">
        <span className="text-sm font-bold text-white">{phaseData[phase].title}</span>
        <p className="text-xs text-gray-300 leading-relaxed">{phaseData[phase].advice}</p>
      </div>
    </div>
  );
}
