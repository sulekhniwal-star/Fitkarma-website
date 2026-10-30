export type FeatureStatus = "in_beta" | "rolling_out" | "planned";

export interface FeatureItem {
  id: string;
  category: "nutrition" | "intelligence" | "logging" | "connected" | "family" | "wellness";
  status: FeatureStatus;
  statusLabelKey: "status.inBeta" | "status.rollingOut" | "status.planned";
}

export const BETA_FEATURES: FeatureItem[] = [
  {
    id: "indian_nutrition",
    category: "nutrition",
    status: "in_beta",
    statusLabelKey: "status.inBeta",
  },
  {
    id: "dip_intelligence",
    category: "intelligence",
    status: "in_beta",
    statusLabelKey: "status.inBeta",
  },
  {
    id: "flexible_logging",
    category: "logging",
    status: "in_beta",
    statusLabelKey: "status.inBeta",
  },
  {
    id: "offline_first",
    category: "logging",
    status: "rolling_out",
    statusLabelKey: "status.rollingOut",
  },
  {
    id: "connected_health",
    category: "connected",
    status: "rolling_out",
    statusLabelKey: "status.rollingOut",
  },
  {
    id: "family_wellness",
    category: "family",
    status: "rolling_out",
    statusLabelKey: "status.rollingOut",
  },
  {
    id: "fasting_festival",
    category: "wellness",
    status: "rolling_out",
    statusLabelKey: "status.rollingOut",
  },
  {
    id: "advanced_metabolic",
    category: "wellness",
    status: "planned",
    statusLabelKey: "status.planned",
  },
];

