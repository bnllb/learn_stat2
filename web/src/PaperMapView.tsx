import { moduleMeta, nodes, paperMappings } from "./data";

const nodeById = new Map(nodes.map((node) => [node.id, node]));

function impactClass(impact: string) {
  if (impact === "high") return "impact-high";
  if (impact === "medium") return "impact-medium";
  return "impact-low";
}

export function PaperMapView() {
  const mappedCount = paperMappings.reduce((sum, paper) => sum + paper.mappedNodeIds.length, 0);
  const missingCount = paperMappings.reduce((sum, paper) => sum + paper.missingNodeSuggestions.length, 0);
  const updateCount = paperMappings.filter((paper) => paper.shouldUpdatePlan).length;
  const uniqueNodes = new Set(paperMappings.flatMap((paper) => paper.mappedNodeIds));

  return (
    <section className="page-grid paper-page">
      <div className="glass-card page-card page-overview">
        <div className="eyebrow">Paper Map</div>
        <h2>论文 → 统计知识映射</h2>
        <p>把 Eval 论文中的方法、指标、统计保证和限制映射回知识图谱，用于发现学习计划缺口。</p>
        <div className="mini-stat-row">
          <div><span>{paperMappings.length}</span><label>Papers</label></div>
          <div><span>{uniqueNodes.size}</span><label>Mapped Nodes</label></div>
          <div><span>{mappedCount}</span><label>Links</label></div>
          <div><span>{missingCount}</span><label>Missing</label></div>
          <div><span>{updateCount}</span><label>Plan Updates</label></div>
        </div>
      </div>

      <div className="paper-list">
        {paperMappings.map((paper) => (
          <article className="glass-card paper-card" key={paper.id}>
            <div className="paper-card-head">
              <div>
                <div className="timeline-date">{paper.date} · {paper.id}</div>
                <h3>{paper.title}</h3>
              </div>
              <span className={`impact-badge ${impactClass(paper.priorityImpact)}`}>{paper.priorityImpact}</span>
            </div>

            <p>{paper.mainEvalProblem}</p>

            <div className="section-label">Statistical Methods</div>
            <div className="inline-chip-list">
              {paper.statisticalMethods.map((method) => <span key={method}>{method}</span>)}
            </div>

            <div className="section-label">Mapped Nodes</div>
            <div className="mapped-node-grid">
              {paper.mappedNodeIds.map((id) => {
                const node = nodeById.get(id);
                if (!node) return <span className="missing-chip" key={id}>{id}</span>;
                return (
                  <div className="mapped-node" key={id} style={{ "--node-color": moduleMeta[node.module].color } as React.CSSProperties}>
                    <strong>{node.title}</strong>
                    <span>{moduleMeta[node.module].shortLabel} · Eval {node.evalRelevance}/5</span>
                  </div>
                );
              })}
            </div>

            {paper.missingNodeSuggestions.length > 0 && (
              <>
                <div className="section-label">Missing / Suggested Nodes</div>
                <div className="inline-chip-list warning-chip-list">
                  {paper.missingNodeSuggestions.map((node) => <span key={node}>{node}</span>)}
                </div>
              </>
            )}

            <div className="action-box">
              <strong>{paper.shouldUpdatePlan ? "建议更新学习计划" : "暂不需要更新学习计划"}</strong>
              <span>{paper.suggestedAction}</span>
            </div>

            {paper.url && <a className="note-link" href={paper.url} target="_blank" rel="noreferrer">Open paper →</a>}
          </article>
        ))}
      </div>
    </section>
  );
}
