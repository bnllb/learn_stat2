import { masteryLabel, nodes, plans, studyLogs } from "./data";

const nodeById = new Map(nodes.map((node) => [node.id, node]));
const planById = new Map(plans.map((plan) => [plan.id, plan]));

export function StudyLogView() {
  const logs = [...studyLogs].sort((a, b) => b.date.localeCompare(a.date));
  const totalMinutes = logs.reduce((sum, log) => sum + (log.durationMinutes ?? 0), 0);
  const touchedNodes = new Set(logs.flatMap((log) => log.nodeIds));
  const updates = logs.reduce((sum, log) => sum + log.masteryUpdates.length, 0);

  return (
    <section className="page-grid study-page">
      <div className="glass-card page-card page-overview">
        <div className="eyebrow">Study Timeline</div>
        <h2>学习日志</h2>
        <p>记录每次学习、涉及节点、产出物、遗留问题，以及 mastery 变化。长期用于复盘和定位薄弱节点。</p>
        <div className="mini-stat-row">
          <div><span>{logs.length}</span><label>Logs</label></div>
          <div><span>{touchedNodes.size}</span><label>Touched Nodes</label></div>
          <div><span>{totalMinutes}</span><label>Minutes</label></div>
          <div><span>{updates}</span><label>Updates</label></div>
        </div>
      </div>

      <div className="timeline-list">
        {logs.map((log) => {
          const plan = log.planRef ? planById.get(log.planRef) : undefined;
          return (
            <article className="glass-card timeline-card" key={log.id}>
              <div className="timeline-date">{log.date}</div>
              <h3>{plan ? `${plan.title}` : "自由学习"}</h3>
              <p>{log.summary}</p>

              <div className="section-label">Nodes</div>
              <div className="inline-chip-list">
                {log.nodeIds.map((id) => (
                  <span key={id}>{nodeById.get(id)?.title ?? id}</span>
                ))}
              </div>

              {log.masteryUpdates.length > 0 && (
                <>
                  <div className="section-label">Mastery Updates</div>
                  <div className="update-list">
                    {log.masteryUpdates.map((update) => (
                      <div className="update-row" key={`${log.id}-${update.nodeId}`}>
                        <strong>{nodeById.get(update.nodeId)?.title ?? update.nodeId}</strong>
                        <span>{masteryLabel[update.before]} → {masteryLabel[update.after]}</span>
                      </div>
                    ))}
                  </div>
                </>
              )}

              {log.remainingQuestions.length > 0 && (
                <>
                  <div className="section-label">Remaining Questions</div>
                  <ul className="compact-list">
                    {log.remainingQuestions.map((question) => <li key={question}>{question}</li>)}
                  </ul>
                </>
              )}

              {log.artifacts.length > 0 && (
                <>
                  <div className="section-label">Artifacts</div>
                  <div className="artifact-list">
                    {log.artifacts.map((artifact) => <code key={artifact}>{artifact}</code>)}
                  </div>
                </>
              )}
            </article>
          );
        })}
      </div>
    </section>
  );
}
