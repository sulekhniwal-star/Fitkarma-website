'use client';

import React, { useState } from 'react';
import { useTranslations } from 'next-intl';
import {
  MessageSquare,
  Database,
  Camera,
  Flame,
  Users,
  BookOpen,
  Calendar,
  Activity,
  Watch,
  HeartPulse,
  Wind,
  ShieldCheck,
  Heart,
  Sparkles,
  Lock,
  Trash2,
  Filter,
} from 'lucide-react';

export type FeatureCategory = 'all' | 'logging' | 'nutrition' | 'metabolic' | 'family' | 'privacy';

interface BentoFeatureItem {
  id: string;
  category: 'logging' | 'nutrition' | 'metabolic' | 'family' | 'privacy';
  icon: React.ComponentType<{ className?: string }>;
  accentColor: string;
}

const ECOSYSTEM_ITEMS: BentoFeatureItem[] = [
  // 1. Zero-Friction Logging
  {
    id: 'whatsapp_logging',
    category: 'logging',
    icon: MessageSquare,
    accentColor: '#10B981',
  },
  {
    id: 'offline_engine',
    category: 'logging',
    icon: Database,
    accentColor: '#3B82F6',
  },
  {
    id: 'ai_photo_scanner',
    category: 'logging',
    icon: Camera,
    accentColor: '#D6A84B',
  },

  // 2. Deep Indian Nutrition
  {
    id: 'tadka_slider',
    category: 'nutrition',
    icon: Flame,
    accentColor: '#F59E0B',
  },
  {
    id: 'family_recipe_splitter',
    category: 'nutrition',
    icon: Users,
    accentColor: '#10B981',
  },
  {
    id: 'regional_recipes',
    category: 'nutrition',
    icon: BookOpen,
    accentColor: '#D6A84B',
  },
  {
    id: 'festival_fasting',
    category: 'nutrition',
    icon: Calendar,
    accentColor: '#8B5CF6',
  },

  // 3. Metabolic & Health Rails
  {
    id: 'dynamic_tdee',
    category: 'metabolic',
    icon: Activity,
    accentColor: '#3B82F6',
  },
  {
    id: 'health_os_sync',
    category: 'metabolic',
    icon: Watch,
    accentColor: '#10B981',
  },
  {
    id: 'cgm_pipeline',
    category: 'metabolic',
    icon: HeartPulse,
    accentColor: '#EC4899',
  },
  {
    id: 'aqi_fitness',
    category: 'metabolic',
    icon: Wind,
    accentColor: '#06B6D4',
  },

  // 4. Family & Women's Health
  {
    id: 'family_care_dashboard',
    category: 'family',
    icon: Heart,
    accentColor: '#EF4444',
  },
  {
    id: 'womens_health',
    category: 'family',
    icon: Sparkles,
    accentColor: '#F43F5E',
  },
  {
    id: 'ayurveda_layer',
    category: 'family',
    icon: Sparkles,
    accentColor: '#D6A84B',
  },

  // 5. Data Sovereignty & DPDP
  {
    id: 'data_vault',
    category: 'privacy',
    icon: Lock,
    accentColor: '#10B981',
  },
  {
    id: 'right_to_erasure',
    category: 'privacy',
    icon: Trash2,
    accentColor: '#F59E0B',
  },
];

export function CompleteFeaturesBento() {
  const t = useTranslations('features.ecosystem');
  const [activeCategory, setActiveCategory] = useState<FeatureCategory>('all');

  const filteredItems = ECOSYSTEM_ITEMS.filter((item) => {
    if (activeCategory === 'all') return true;
    return item.category === activeCategory;
  });

  const getStatusBadge = (statusKey: string) => {
    if (statusKey === 'p0') {
      return (
        <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
          {t('status_labels.p0')}
        </span>
      );
    }
    if (statusKey === 'p1') {
      return (
        <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-[#D6A84B]/15 text-[#D6A84B] border border-[#D6A84B]/30">
          {t('status_labels.p1')}
        </span>
      );
    }
    return (
      <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-blue-500/15 text-blue-400 border border-blue-500/30">
        {t('status_labels.p2')}
      </span>
    );
  };

  return (
    <section className="w-full pt-16 border-t border-white/5 space-y-10">
      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-semibold uppercase tracking-wider text-[#D6A84B]">
          <Filter className="w-3.5 h-3.5" />
          <span>{t('badge')}</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
          {t('title')}
        </h2>
        <p className="text-sm sm:text-base text-gray-400 leading-relaxed">
          {t('subtitle')}
        </p>

        {/* Filter Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 pt-4">
          {(
            [
              'all',
              'logging',
              'nutrition',
              'metabolic',
              'family',
              'privacy',
            ] as FeatureCategory[]
          ).map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
                activeCategory === cat
                  ? 'bg-white text-black shadow-lg shadow-white/10 font-bold'
                  : 'bg-black/40 border border-white/10 text-gray-400 hover:text-white hover:bg-white/5'
              }`}
            >
              {t(`filters.${cat}`)}
            </button>
          ))}
        </div>
      </div>

      {/* Bento Grid Layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredItems.map((item) => {
          const IconComponent = item.icon;
          const status = t(`items.${item.id}.status`);

          return (
            <div
              key={item.id}
              className="group relative p-6 rounded-3xl bg-gradient-to-b from-[#16191E] to-[#101317] border border-white/10 hover:border-white/25 transition-all duration-300 shadow-xl flex flex-col justify-between space-y-4 hover:-translate-y-1"
            >
              {/* Top Meta Line: Icon & Status Badge */}
              <div>
                <div className="flex items-center justify-between gap-3 mb-4">
                  <div
                    className="w-12 h-12 rounded-2xl flex items-center justify-center border shadow-inner transition-transform group-hover:scale-105"
                    style={{
                      backgroundColor: `${item.accentColor}15`,
                      borderColor: `${item.accentColor}30`,
                      color: item.accentColor,
                    }}
                  >
                    <IconComponent className="w-5 h-5" />
                  </div>
                  {getStatusBadge(status)}
                </div>

                {/* Micro Tag */}
                <span
                  className="text-[11px] font-mono font-bold tracking-wider uppercase block mb-1"
                  style={{ color: item.accentColor }}
                >
                  {t(`items.${item.id}.tag`)}
                </span>

                {/* Feature Title */}
                <h3 className="text-lg sm:text-xl font-bold text-white tracking-tight group-hover:text-white transition-colors">
                  {t(`items.${item.id}.title`)}
                </h3>

                {/* Detailed Description */}
                <p className="text-xs sm:text-sm text-gray-400 mt-2.5 leading-relaxed">
                  {t(`items.${item.id}.description`)}
                </p>
              </div>

              {/* Bottom Subtle Indicator */}
              <div className="pt-3 border-t border-white/5 flex items-center justify-between text-[11px] text-gray-500 font-medium">
                <span className="capitalize">{item.category} Module</span>
                <span className="group-hover:translate-x-1 transition-transform text-white/40 group-hover:text-white">
                  →
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

