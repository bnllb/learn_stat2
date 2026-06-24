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

export type MasteryUpdate = {
  nodeId: string;
  before: 0 | 1 | 2 | 3 | 4;
  after: 0 | 1 | 2 | 3 | 4;
};

export type StudyLog = {
  id: string;
  date: string;
  nodeIds: string[];
  planRef?: string;
  durationMinutes?: number;
  summary: string;
  remainingQuestions: string[];
  artifacts: string[];
  masteryUpdates: MasteryUpdate[];
};

export type PaperMapping = {
  id: string;
  title: string;
  url: string;
  date: string;
  relevance: 1 | 2 | 3 | 4 | 5;
  mainEvalProblem: string;
  metrics: string[];
  statisticalMethods: string[];
  mappedNodeIds: string[];
  missingNodeSuggestions: string[];
  priorityImpact: "low" | "medium" | "high";
  shouldUpdatePlan: boolean;
  suggestedAction: string;
};
