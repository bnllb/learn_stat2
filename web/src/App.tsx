import { useEffect, useMemo, useState, type CSSProperties } from "react";
import ReactFlow, {
  Background,
  Controls,
  MiniMap,
  MarkerType,
  Node,
  Edge,
  NodeProps,
  Position,
  Handle,
  useEdgesState,
  useNodesState,
} from "@xyflow/react";
import { edges as graphEdges, masteryLabel, moduleMeta, nodes as graphNodes, plans, statusLabel } from "./data";
import { PaperMapView } from "./PaperMapView";
import { StudyLogView } from "./StudyLogView";
import type { StatModule, StatNode } from "./types";

const moduleOrder: StatModule[] = [
  "probability",
  "inference",
  "experiment_design",
  "computational_stats",
  "modeling",
  "statistical_learning",
  "llm_eval",
  "bayesian",
  "causal",
  "advanced_theory",
];

const edgeStyleByType = {
  prerequisite: { stroke: "rgba(148, 163, 184, 0.62)", strokeWidth: 1.8 },
  related: { stroke: "rgba(96, 165, 250, 0.42)", strokeWidth: 1.4, strokeDasharray: "5 5" },
  extends: { stroke: "rgba(251, 113, 133, 0.52)", strokeWidth: 1.7 },
  used_by: { stroke: "rgba(45, 212, 191, 0.50)", strokeWidth: 1.8 },
};

type KnowledgeNodeData = StatNode & { selected?: boolean };
type AppTab = "graph" | "study" | "papers";

type NodeCssVars = CSSProperties & {
  "--node-color": string;
  "--node-accent": string;
};

function cx(...classes: Array<string | false | undefined>) {
  return classes.filter(Boolean).join(" ");
}

function KnowledgeNode({ data }: NodeProps<Node<KnowledgeNodeData>>) {
  const meta = moduleMeta[data.module];
  const masteryPct = (data.mastery / 4) * 100;

  return (
    <div className={cx("k-node", data.selected && "k-node-selected")} style={{ "--node-color": meta.color, "--node-accent": meta.accent } as NodeCssVars}>
      <Handle type="target" position={Position.Top} className="node-handle" />
      <div className="k-node-topline">
        <span className="module-pill">{meta.shortLabel}</span>
        <span className="stars">{"★".repeat(data.importance)}</span>
      </div>
      <div className="k-node-title">{data.title}</div>
      <div className="k-node-summary">{data.summary}</div>
      <div className="k-node-footer">
        <span>{masteryLabel[data.mastery]}</span>
        <span>{data.evalRelevance}/5 Eval</span>
      </div>
      <div className="mastery-track">
        <div className="mastery-fill" style={{ width: `${masteryPct}%` }} />
      </div>
      <Handle type="source" position={Position.Bottom} className="node-handle" />
    </div>
  );
}

const nodeTypes = { knowledge: KnowledgeNode };

function layoutNodes(selectedId?: string): Node<KnowledgeNodeData>[] {
  const grouped = moduleOrder.map((module) => graphNodes.filter((node) => node.module === module));
  const columnWidth = 310;
  const rowHeight = 190;
  const xOffset = 40;
  const yOffset = 40;

  return grouped.flatMap((group, col) =>
    group.map((node, row) => ({
      id: node.id,
      type: "knowledge",
      position: {
        x: xOffset + col * columnWidth,
        y: yOffset + row * rowHeight + (col % 2) * 56,
      },
      data: { ...node, selected: node.id === selectedId },
    })),
  );
}

function buildEdges(filteredNodeIds: Set<string>): Edge[] {
  return graphEdges
    .filter((edge) => filteredNodeIds.has(edge.source) && filteredNodeIds.has(edge.target))
    .map((edge) => ({
      id: `${edge.source}-${edge.target}-${edge.type}`,
      source: edge.source,
      target: edge.target,
      label: edge.type === "prerequisite" ? "pre" : edge.type.replace("_", " "),
      type: "smoothstep",
      animated: edge.type === "used_by" || edge.type === "extends",
      markerEnd: { type: MarkerType.ArrowClosed, color: edgeStyleByType[edge.type].stroke },
      style: edgeStyleByType[edge.type],
      labelStyle: { fill: "rgba(226, 232, 240, 0.72)", fontSize: 10, fontWeight: 700 },
      labelBgStyle: { fill: "rgba(15, 23, 42, 0.72)", fillOpacity: 0.85 },
    }));
}

function getConnected(selectedId: string | undefined) {
  if (!selectedId) return { upstream: [] as string[], downstream: [] as string[] };
  return graphEdges.reduce(
    (acc, edge) => {
      if (edge.target === selectedId) acc.upstream.push(edge.source);
      if (edge.source === selectedId) acc.downstream.push(edge.target);
      return acc;
    },
    { upstream: [] as string[], downstream: [] as string[] },
  );
}

function GraphView() {
  const [selectedId, setSelectedId] = useState<string>("confidence_interval");
  const [query, setQuery] = useState("");
  const [moduleFilter, setModuleFilter] = useState<StatModule | "all">("all");
  const [onlyEvalCore, setOnlyEvalCore] = useState(true);

  const selectedNode = useMemo(() => graphNodes.find((node) => node.id === selectedId) ?? graphNodes[0], [selectedId]);

  const filteredNodes = useMemo(() => {
    const q = query.trim().toLowerCase();
    return graphNodes.filter((node) => {
      const matchesQuery =
        !q ||
        node.title.toLowerCase().includes(q) ||
        node.summary.toLowerCase().includes(q) ||
        node.tags.some((tag) => tag.toLowerCase().includes(q));
      const matchesModule = moduleFilter === "all" || node.module === moduleFilter;
      const matchesEval = !onlyEvalCore || node.evalRelevance >= 5 || node.module === "llm_eval";
      return matchesQuery && matchesModule && matchesEval;
    });
  }, [query, moduleFilter, onlyEvalCore]);

  const filteredNodeIds = useMemo(() => new Set(filteredNodes.map((node) => node.id)), [filteredNodes]);
  const [flowNodes, setFlowNodes, onNodesChange] = useNodesState(layoutNodes(selectedId));
  const [flowEdges, setFlowEdges, onEdgesChange] = useEdgesState(buildEdges(filteredNodeIds));

  useEffect(() => {
    setFlowNodes(layoutNodes(selectedId).filter((node) => filteredNodeIds.has(node.id)));
    setFlowEdges(buildEdges(filteredNodeIds));
  }, [filteredNodeIds, selectedId, setFlowEdges, setFlowNodes]);

  const connected = useMemo(() => getConnected(selectedNode?.id), [selectedNode?.id]);
  const byId = useMemo(() => new Map(graphNodes.map((node) => [node.id, node])), []);
  const relatedPlans = plans.filter((plan) => plan.nodeIds.includes(selectedNode.id));

  return (
    <section className="workspace">
      <aside className="control-panel glass-card">
        <div className="panel-title">Filters</div>
        <input className="search-input" placeholder="Search node / tag / summary..." value={query} onChange={(event) => setQuery(event.target.value)} />
        <select className="select-input" value={moduleFilter} onChange={(event) => setModuleFilter(event.target.value as StatModule | "all")}>
          <option value="all">All modules</option>
          {moduleOrder.map((module) => <option key={module} value={module}>{moduleMeta[module].label}</option>)}
        </select>
        <label className="toggle-row">
          <input type="checkbox" checked={onlyEvalCore} onChange={(event) => setOnlyEvalCore(event.target.checked)} />
          <span>Only Eval-core nodes</span>
        </label>
        <div className="legend-list">
          {moduleOrder.map((module) => (
            <button key={module} className={cx("legend-item", moduleFilter === module && "legend-active")} onClick={() => setModuleFilter(moduleFilter === module ? "all" : module)}>
              <span style={{ background: moduleMeta[module].color }} />
              {moduleMeta[module].shortLabel}
            </button>
          ))}
        </div>
      </aside>

      <section className="graph-panel glass-card">
        <ReactFlow
          nodes={flowNodes}
          edges={flowEdges}
          nodeTypes={nodeTypes}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onNodeClick={(_, node) => setSelectedId(node.id)}
          minZoom={0.25}
          maxZoom={1.4}
          fitView
          fitViewOptions={{ padding: 0.18 }}
          proOptions={{ hideAttribution: true }}
        >
          <Background color="rgba(148,163,184,0.12)" gap={22} />
          <MiniMap pannable zoomable nodeColor={(node) => moduleMeta[(node.data as KnowledgeNodeData).module].color} maskColor="rgba(2, 6, 23, 0.66)" />
          <Controls />
        </ReactFlow>
      </section>

      <aside className="detail-panel glass-card">
        <div className="node-kicker" style={{ color: moduleMeta[selectedNode.module].color }}>{moduleMeta[selectedNode.module].label}</div>
        <h2>{selectedNode.title}</h2>
        <p className="detail-summary">{selectedNode.summary}</p>
        <div className="detail-metrics">
          <div><span>{selectedNode.importance}/5</span><label>Importance</label></div>
          <div><span>{selectedNode.mastery}/4</span><label>Mastery</label></div>
          <div><span>{selectedNode.evalRelevance}/5</span><label>Eval Relation</label></div>
        </div>
        <div className="progress-block">
          <div className="progress-label"><span>{statusLabel[selectedNode.status]}</span><span>{masteryLabel[selectedNode.mastery]}</span></div>
          <div className="detail-progress"><i style={{ width: `${(selectedNode.mastery / 4) * 100}%` }} /></div>
        </div>
        <div className="tag-cloud">{selectedNode.tags.map((tag) => <span key={tag}>#{tag}</span>)}</div>

        <div className="relation-block">
          <h3>Prerequisites</h3>
          {connected.upstream.length ? connected.upstream.map((id) => <button key={id} onClick={() => setSelectedId(id)}>{byId.get(id)?.title ?? id}</button>) : <p>No upstream nodes yet.</p>}
        </div>

        <div className="relation-block">
          <h3>Downstream / Used by</h3>
          {connected.downstream.length ? connected.downstream.map((id) => <button key={id} onClick={() => setSelectedId(id)}>{byId.get(id)?.title ?? id}</button>) : <p>No downstream nodes yet.</p>}
        </div>

        <div className="relation-block">
          <h3>Learning Plan</h3>
          {relatedPlans.length ? relatedPlans.map((plan) => (
            <div className="plan-chip" key={plan.id}>
              <strong>W{plan.week} · D{plan.day}</strong>
              <span>{plan.title}</span>
            </div>
          )) : <p>Not pinned to plan yet.</p>}
        </div>

        {selectedNode.notePath && <a className="note-link" href={`../${selectedNode.notePath}`} target="_blank" rel="noreferrer">Open note path →</a>}
      </aside>
    </section>
  );
}

export function App() {
  const [activeTab, setActiveTab] = useState<AppTab>("graph");
  const stats = useMemo(() => {
    const total = graphNodes.length;
    const applied = graphNodes.filter((node) => node.mastery === 4).length;
    const highPriority = graphNodes.filter((node) => node.importance >= 5).length;
    const avgMastery = graphNodes.reduce((sum, node) => sum + node.mastery, 0) / total;
    return { total, applied, highPriority, avgMastery };
  }, []);

  return (
    <main className="app-shell">
      <section className="hero-panel">
        <div>
          <div className="eyebrow">learn_stat2 · Statistics Knowledge OS</div>
          <h1>LLM / Agent Eval 统计学习图谱</h1>
          <p>用结构化节点、依赖关系和学习进度，把统计学从零散笔记变成可持续演化的工作知识系统。</p>
          <div className="top-tabs">
            <button className={cx(activeTab === "graph" && "tab-active")} onClick={() => setActiveTab("graph")}>Knowledge Graph</button>
            <button className={cx(activeTab === "study" && "tab-active")} onClick={() => setActiveTab("study")}>Study Log</button>
            <button className={cx(activeTab === "papers" && "tab-active")} onClick={() => setActiveTab("papers")}>Paper Map</button>
          </div>
        </div>
        <div className="stat-grid">
          <div className="stat-card"><span>{stats.total}</span><label>Nodes</label></div>
          <div className="stat-card"><span>{stats.highPriority}</span><label>High Priority</label></div>
          <div className="stat-card"><span>{stats.avgMastery.toFixed(1)}</span><label>Avg Mastery</label></div>
          <div className="stat-card"><span>{stats.applied}</span><label>Applied</label></div>
        </div>
      </section>

      {activeTab === "graph" && <GraphView />}
      {activeTab === "study" && <StudyLogView />}
      {activeTab === "papers" && <PaperMapView />}
    </main>
  );
}
