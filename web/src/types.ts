export type StatModule =
  | "probability"
  | "inference"
  | "experiment_design"
  | "modeling"
  | "computational_stats"
  | "bayesian"
  | "statistical_learning"
  | "causal"
  | "advanced_theory"
  | "llm_eval";

export type NodeStatus = "unvisited" | "skimmed" | "understood" | "derived" | "applied";

export type StatNode = {
  id: string;
  title: string;
  module: StatModule;
  importance: 1 | 2 | 3 | 4 | 5;
  mastery: 0 | 1 | 2 | 3 | 4;
  evalRelevance: 1 | 2 | 3 | 4 | 5;
  status: NodeStatus;
  tags: string[];
  relatedWorkProblems: string[];
  notePath?: string;
  summary: string;
  createdAt: string;
  updatedAt: string;
};

export type StatEdge = {
  source: string;
  target: string;
  type: "prerequisite" | "related" | "extends" | "used_by";
  reason?: string;
};

export type LearningPlanItem = {
  id: string;
  week: number;
  day: number;
  title: string;
  nodeIds: string[];
  goal: string;
  status: "todo" | "doing" | "done";
};
