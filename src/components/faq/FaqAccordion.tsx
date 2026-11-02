'use client';

import React, { useState, useMemo } from 'react';
import { useTranslations } from 'next-intl';
import { Search, ChevronDown, Sparkles, HelpCircle, X } from 'lucide-react';

export interface FaqItem {
  id: string;
  category: 'cohort' | 'nutrition' | 'interfaces' | 'privacy';
  questionKey: string;
  answerKey: string;
}

export const FaqAccordion: React.FC = () => {
  const t = useTranslations('faq');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [expandedIds, setExpandedIds] = useState<Set<string>>(new Set(['cohort_allocation']));

  const faqItems: FaqItem[] = [
    {
      id: 'cohort_allocation',
      category: 'cohort',
      questionKey: 'items.cohort_allocation.q',
      answerKey: 'items.cohort_allocation.a',
    },
    {
      id: 'waitlist_transition',
      category: 'cohort',
      questionKey: 'items.waitlist_transition.q',
      answerKey: 'items.waitlist_transition.a',
    },
    {
      id: 'katori_roti_science',
      category: 'nutrition',
      questionKey: 'items.katori_roti_science.q',
      answerKey: 'items.katori_roti_science.a',
    },
    {
      id: 'regional_thalis',
      category: 'nutrition',
      questionKey: 'items.regional_thalis.q',
      answerKey: 'items.regional_thalis.a',
    },
    {
      id: 'whatsapp_logging',
      category: 'interfaces',
      questionKey: 'items.whatsapp_logging.q',
      answerKey: 'items.whatsapp_logging.a',
    },
    {
      id: 'offline_sync',
      category: 'interfaces',
      questionKey: 'items.offline_sync.q',
      answerKey: 'items.offline_sync.a',
    },
    {
      id: 'dpdp_protection',
      category: 'privacy',
      questionKey: 'items.dpdp_protection.q',
      answerKey: 'items.dpdp_protection.a',
    },
    {
      id: 'erase_existence',
      category: 'privacy',
      questionKey: 'items.erase_existence.q',
      answerKey: 'items.erase_existence.a',
    },
  ];

  const categories = [
    { id: 'all', label: t('categories.all') },
    { id: 'cohort', label: t('categories.cohort') },
    { id: 'nutrition', label: t('categories.nutrition') },
    { id: 'interfaces', label: t('categories.interfaces') },
    { id: 'privacy', label: t('categories.privacy') },
  ];

  const toggleExpand = (id: string) => {
    setExpandedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  const filteredItems = useMemo(() => {
    return faqItems.filter((item) => {
      const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
      if (!matchesCategory) return false;

      if (!searchQuery.trim()) return true;

      const q = t(item.questionKey).toLowerCase();
      const a = t(item.answerKey).toLowerCase();
      const term = searchQuery.toLowerCase();

      return q.includes(term) || a.includes(term);
    });
  }, [faqItems, selectedCategory, searchQuery, t]);

  return (
    <div className="w-full max-w-3xl mx-auto space-y-6">
      {/* Search Input Bar */}
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400">
          <Search className="w-4 h-4" />
        </div>
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder={t('searchPlaceholder')}
          className="w-full pl-11 pr-10 py-3.5 rounded-2xl bg-[#14181E] border border-white/10 text-white placeholder-slate-400 text-sm focus:outline-none focus:border-[#36C96A] focus:ring-1 focus:ring-[#36C96A] transition-all"
        />
        {searchQuery && (
          <button
            onClick={() => setSearchQuery('')}
            className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 hover:text-white cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Category Pills Filter */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 no-scrollbar">
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setSelectedCategory(cat.id)}
            className={`px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
              selectedCategory === cat.id
                ? 'bg-[#36C96A] text-slate-950 font-bold shadow-md shadow-[#36C96A]/20'
                : 'bg-white/[0.04] text-slate-400 hover:text-white border border-white/5'
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Accordion Questions List */}
      <div className="space-y-3">
        {filteredItems.length === 0 ? (
          <div className="p-8 rounded-2xl bg-white/[0.02] border border-white/5 text-center space-y-2">
            <HelpCircle className="w-8 h-8 text-slate-500 mx-auto" />
            <h4 className="text-sm font-bold text-slate-300">
              {t('empty.title')}
            </h4>
            <p className="text-xs text-slate-400">
              {t('empty.subtitle')}
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('all');
              }}
              className="mt-2 text-xs font-semibold text-[#36C96A] hover:underline cursor-pointer"
            >
              {t('empty.reset')}
            </button>
          </div>
        ) : (
          filteredItems.map((item) => {
            const isExpanded = expandedIds.has(item.id);
            return (
              <div
                key={item.id}
                className="rounded-2xl border border-white/10 bg-[#12161C] overflow-hidden transition-colors"
              >
                <button
                  type="button"
                  onClick={() => toggleExpand(item.id)}
                  aria-expanded={isExpanded}
                  className="w-full p-5 text-left flex items-center justify-between gap-4 cursor-pointer hover:bg-white/[0.02] transition-colors"
                >
                  <span className="text-sm sm:text-base font-bold text-white tracking-tight leading-snug">
                    {t(item.questionKey)}
                  </span>
                  <div
                    className={`w-6 h-6 rounded-full bg-white/[0.05] border border-white/10 flex items-center justify-center shrink-0 transition-transform duration-200 ${
                      isExpanded ? 'rotate-180 bg-[#36C96A]/20 text-[#36C96A]' : 'text-slate-400'
                    }`}
                  >
                    <ChevronDown className="w-3.5 h-3.5" />
                  </div>
                </button>

                {isExpanded && (
                  <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-slate-300 leading-relaxed border-t border-white/5 bg-white/[0.01]">
                    <p>{t(item.answerKey)}</p>
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default FaqAccordion;

