/**
 * Daily Intelligence Package (DIP) Engine
 * FitKarma - India's AI-powered Fitness and Wellness Ecosystem
 */

export type DipTimeOfDay = 'morning' | 'midday' | 'evening';

export interface DipMetric {
  id: string;
  labelKey: string;
  value: string;
  unit?: string;
  accentColor: string;
}

export interface DipPulse {
  period: DipTimeOfDay;
  timeString: string;
  titleKey: string;
  statusKey: string;
  recoveryScore: number;
  insightKey: string;
  actionKey: string;
  themeGradient: string;
  glowColor: string;
  metrics: DipMetric[];
}

export const DIP_PULSES: Record<DipTimeOfDay, DipPulse> = {
  morning: {
    period: 'morning',
    timeString: '07:00 AM',
    titleKey: 'simulators.dip.periods.morning.title',
    statusKey: 'simulators.dip.periods.morning.status',
    recoveryScore: 86,
    insightKey: 'simulators.dip.periods.morning.insight',
    actionKey: 'simulators.dip.periods.morning.action',
    themeGradient: 'from-amber-500/15 via-[#16191E] to-[#0D0F12]',
    glowColor: 'rgba(214, 168, 75, 0.25)',
    metrics: [
      {
        id: 'sleep',
        labelKey: 'simulators.dip.metrics.sleep_score',
        value: '86%',
        accentColor: '#10B981',
      },
      {
        id: 'resting_hr',
        labelKey: 'simulators.dip.metrics.resting_hr',
        value: '58',
        unit: 'bpm',
        accentColor: '#3B82F6',
      },
      {
        id: 'readiness',
        labelKey: 'simulators.dip.metrics.karma_score',
        value: '91',
        unit: '/100',
        accentColor: '#D6A84B',
      },
    ],
  },
  midday: {
    period: 'midday',
    timeString: '01:30 PM',
    titleKey: 'simulators.dip.periods.midday.title',
    statusKey: 'simulators.dip.periods.midday.status',
    recoveryScore: 78,
    insightKey: 'simulators.dip.periods.midday.insight',
    actionKey: 'simulators.dip.periods.midday.action',
    themeGradient: 'from-blue-500/15 via-[#16191E] to-[#0D0F12]',
    glowColor: 'rgba(59, 130, 246, 0.25)',
    metrics: [
      {
        id: 'hydration',
        labelKey: 'simulators.dip.metrics.hydration',
        value: '1.8L',
        unit: '/ 3.0L',
        accentColor: '#3B82F6',
      },
      {
        id: 'active_cal',
        labelKey: 'simulators.dip.metrics.macro_balance',
        value: '68%',
        accentColor: '#10B981',
      },
      {
        id: 'alertness',
        labelKey: 'simulators.dip.metrics.karma_score',
        value: '84',
        unit: '/100',
        accentColor: '#D6A84B',
      },
    ],
  },
  evening: {
    period: 'evening',
    timeString: '09:00 PM',
    titleKey: 'simulators.dip.periods.evening.title',
    statusKey: 'simulators.dip.periods.evening.status',
    recoveryScore: 92,
    insightKey: 'simulators.dip.periods.evening.insight',
    actionKey: 'simulators.dip.periods.evening.action',
    themeGradient: 'from-purple-600/15 via-[#16191E] to-[#0D0F12]',
    glowColor: 'rgba(139, 92, 246, 0.25)',
    metrics: [
      {
        id: 'karma',
        labelKey: 'simulators.dip.metrics.karma_score',
        value: '92',
        unit: '/100',
        accentColor: '#D6A84B',
      },
      {
        id: 'macro',
        labelKey: 'simulators.dip.metrics.macro_balance',
        value: '94%',
        accentColor: '#10B981',
      },
      {
        id: 'wind_down',
        labelKey: 'simulators.dip.metrics.sleep_score',
        value: '45m',
        unit: 'to bed',
        accentColor: '#8B5CF6',
      },
    ],
  },
};

/**
 * Returns the DIP intelligence pulse data for a specific time period
 */
export function getDipPulse(period: DipTimeOfDay): DipPulse {
  return DIP_PULSES[period] || DIP_PULSES.morning;
}

