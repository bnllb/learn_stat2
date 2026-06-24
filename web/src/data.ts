import rawNodes from "../../data/nodes.json";
import rawEdges from "../../data/edges.json";
import rawPlans from "../../data/plans.json";
import rawStudyLogs from "../../data/study_logs.json";
import rawPaperMappings from "../../data/paper_mappings.json";
import type { LearningPlanItem, PaperMapping, StatEdge, StatModule, StatNode, StudyLog } from "./types";

export const nodes = rawNodes as StatNode[];
export const edges = rawEdges as StatEdge[];
export const plans = rawPlans as LearningPlanItem[];
export const studyLogs = rawStudyLogs as StudyLog[];
export const paperMappings = rawPaperMappings as PaperMapping[];

export const moduleMeta: Record<StatModule, { label: string; shortLabel: string; color: string; accent: string }> = {
  probability: { label: "Probability", shortLabel: "Prob", color: "#38bdf8", accent: "rgba(56, 189, 248, 0.18)" },
  inference: { label: "Inference", shortLabel: "Infer", color: "#a78bfa", accent: "rgba(167, 139, 250, 0.18)" },
  experiment_design: { label: "Experiment Design", shortLabel: "Exp", color: "#f97316", accent: "rgba(249, 115, 22, 0.18)" },
  modeling: { label: "Modeling", shortLabel: "Model", color: "#22c55e", accent: "rgba(34, 197, 94, 0.16)" },
  computational_stats: { label: "Computational Stats", shortLabel: "Comp", color: "#eab308", accent: "rgba(234, 179, 8, 0.16)" },
  bayesian: { label: "Bayesian", shortLabel: "Bayes", color: "#fb7185", accent: "rgba(251, 113, 133, 0.16)" },
  statistical_learning: { label: "Statistical Learning", shortLabel: "Learn", color: "#2dd4bf", accent: "rgba(45, 212, 191, 0.16)" },
  causal: { label: "Causal", shortLabel: "Causal", color: "#facc15", accent: "rgba(250, 204, 21, 0.16)" },
  advanced_theory: { label: "Advanced Theory", shortLabel: "Theory", color: "#94a3b8", accent: "rgba(148, 163, 184, 0.16)" },
  llm_eval: { label: "LLM / Agent Eval", shortLabel: "Eval", color: "#60a5fa", accent: "rgba(96, 165, 250, 0.18)" },
};

export const statusLabel: Record<StatNode["status"], string> = {
  unvisited: "Unvisited",
  skimmed: "Skimmed",
  understood: "Understood",
  derived: "Derived",
  applied: "Applied",
};

export const masteryLabel: Record<StatNode["mastery"], string> = {
  0: "未学",
  1: "扫过",
  2: "懂直觉",
  3: "能推导",
  4: "能应用",
};
