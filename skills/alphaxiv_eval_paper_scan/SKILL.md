# alphaXiv Eval Paper Scan Skill

## Purpose

Use alphaXiv MCP to periodically scan recent LLM / Agent evaluation papers, extract the statistical knowledge used in those papers, and decide whether the current `learn_stat2` study plan should be updated.

This skill turns the learning plan into a feedback loop:

```text
recent eval papers
  → statistical methods used in papers
  → map to stat knowledge graph
  → identify missing prerequisites
  → update learning plan / topic notes / eval_stats_core
```

---

## Default Parameters

| Parameter | Default |
|---|---|
| time_window | 1 month |
| max_papers | 20 |
| paper_domain | LLM evaluation / Agent evaluation / benchmark / LLM-as-judge |
| output_dir | `paper_reading/` |
| update_targets | `docs/learning_plan_v0.1.md`, `docs/stat_knowledge_map_v0.1.md`, `docs/eval_stats_core.md` |

---

## alphaXiv MCP Tools Used

The alphaXiv MCP server provides four relevant tools:

1. `discover_papers`
   - Use for paper discovery.
   - Returns ranked candidate papers with title, date, organizations, abstract preview, and arXiv ID.

2. `get_paper_content`
   - Use for reading a paper-level report or full extracted paper text.
   - Prefer default report first; use `fullText=true` only when needed.

3. `answer_pdf_queries`
   - Use for citation-grade page-level evidence.
   - Batch all extraction questions for the same paper in one call.

4. `read_files_from_github_repository`
   - Use only when implementation details matter.
   - Optional for this skill.

---

## Discovery Queries

Run multiple `discover_papers` calls and merge results by arXiv ID.

### Query Group 1: Statistical guarantees in LLM eval

```json
{
  "keywords": ["LLM evaluation", "statistical guarantees", "benchmark"],
  "question": "Recent papers on efficient, reliable, or statistically guaranteed evaluation of large language models, including confidence intervals, sampling strategies, uncertainty quantification, benchmark reliability, and model comparison.",
  "difficulty": 8
}
```

### Query Group 2: Agent evaluation

```json
{
  "keywords": ["agent evaluation", "LLM agents", "benchmark"],
  "question": "Recent papers on evaluating LLM agents, coding agents, tool-use agents, or web agents, especially papers that discuss benchmark design, task sampling, judge reliability, success metrics, uncertainty, or statistical comparison.",
  "difficulty": 8
}
```

### Query Group 3: LLM-as-judge / preference evaluation

```json
{
  "keywords": ["LLM-as-judge", "preference evaluation", "model ranking"],
  "question": "Recent papers on LLM-as-judge, pairwise preference evaluation, model ranking, reward model evaluation, evaluator reliability, bias, calibration, Elo, Bradley-Terry, or human-model agreement.",
  "difficulty": 7
}
```

### Query Group 4: Pass@k / coding eval / benchmark metrics

```json
{
  "keywords": ["pass@k", "coding benchmark", "evaluation metric"],
  "question": "Recent papers on coding benchmark evaluation, pass@k estimation, benchmark contamination, evaluation metrics, repeat sampling, confidence intervals, and statistical reliability of coding agent or code model evaluations.",
  "difficulty": 7
}
```

---

## Paper Selection Rules

After discovery:

1. Deduplicate by arXiv ID.
2. Keep papers whose publication date is inside `time_window`.
3. Rank by relevance to LLM / Agent Eval.
4. Prefer papers with explicit evaluation methodology or statistical claims.
5. Keep at most `max_papers` papers.

If fewer than 20 papers are found in the default 1-month window, either:

- keep the smaller set and report that the window had fewer papers, or
- expand to 2 months only if the user explicitly asks for a fuller scan.

---

## Per-Paper Extraction

For each selected paper, ask these questions using `get_paper_content` or `answer_pdf_queries`.

### Recommended `answer_pdf_queries` payload

```json
{
  "url": "<paper_url>",
  "queries": [
    "What evaluation benchmarks, datasets, tasks, and metrics are used?",
    "What statistical estimators, confidence intervals, uncertainty quantification methods, hypothesis tests, bootstrap methods, or sampling strategies are used?",
    "Does the paper use pass@k, Elo, Bradley-Terry, pairwise comparison, LLM-as-judge reliability, calibration, human agreement, or ranking uncertainty?",
    "Does the paper make any statistical guarantee, theorem, asymptotic claim, finite-sample claim, or coverage claim?",
    "What limitations or failure modes related to evaluation reliability, variance, bias, sampling, benchmark contamination, or distribution shift are discussed?"
  ]
}
```

---

## Statistical Knowledge Extraction Schema

For every paper, produce a record using this schema:

```md
# <paper title>

- arXiv ID:
- Date:
- URL:
- Relevance:
- Main evaluation problem:
- Metrics used:
- Benchmarks / datasets:
- Statistical methods used:
- Statistical guarantees:
- Assumptions:
- Failure modes / limitations:
- Mapped knowledge graph nodes:
- Missing knowledge nodes:
- Priority impact:
- Should update learning plan?: yes/no
- Suggested action:
```

---

## Statistical Method Taxonomy

Use this taxonomy when mapping papers back to the knowledge graph.

### A. Already Core in Plan

- Random Variable
- Bernoulli / Binomial
- Expectation / Variance
- Sampling Distribution
- Estimator
- Bias / Variance / SE
- Confidence Interval
- Hypothesis Testing
- Bootstrap
- Power Analysis
- A/B Test
- Multiple Testing
- Monte Carlo
- Pass@k
- Pearson / Spearman
- Regression
- Elo / Bradley-Terry

### B. Add or Promote if Frequent

- Finite Population Inference
- Survey Sampling
- Inverse Probability Weighting
- AIPW / Doubly Robust Estimation
- Adaptive Sampling
- Active Learning for Evaluation
- Effective Sample Size
- Paired Tests
- Nonparametric Tests
- Calibration
- Measurement Error
- Inter-rater Reliability
- Ranking Uncertainty
- Hierarchical Models
- Bayesian Evaluation
- Distribution Shift
- Benchmark Contamination

### C. Advanced / Proof-Level

- Filtration
- Martingale Difference Sequence
- Martingale CLT
- Triangular Array
- Lindeberg Condition
- Concentration Inequalities
- Empirical Process
- Asymptotic Efficiency
- Semiparametric Efficiency

---

## Plan Update Rules

Update or suggest updating the learning plan if any condition is met:

1. A statistical node appears in at least 3 of the 20 papers.
2. A node appears in the core method of a high-relevance paper.
3. A node appears in theorem statements, statistical guarantees, or proof assumptions.
4. A node is directly needed for LLM / Agent Eval work, even if only one paper uses it.
5. Multiple papers share the same missing prerequisite.

Do not update the plan if:

1. The idea is a one-off benchmark detail.
2. The method is domain-specific and not transferable to Eval statistics.
3. The method is too advanced and has no near-term work relevance.
4. The paper only reports standard benchmark numbers without statistical methodology.

---

## Monthly Output Format

Create a report under:

```text
paper_reading/eval_paper_scan_YYYY_MM.md
```

Suggested structure:

```md
# Eval Paper Scan - YYYY-MM

## Scan Settings

- Time window:
- Max papers:
- Query groups:

## Selected Papers

| # | Paper | arXiv ID | Date | Main eval topic | Key statistical methods |
|---|---|---|---|---|---|

## High-Frequency Statistical Nodes

| Node | Count | Papers | Current status | Suggested action |
|---|---:|---|---|---|

## Missing / Undercovered Nodes

| Node | Why it matters | Suggested priority | Add to where |
|---|---|---|---|

## Learning Plan Update Decision

- Update needed: yes/no
- Summary:

## Suggested Updates

### Add nodes

### Promote priority

### Create topic notes

### Create mini design docs

## Per-Paper Notes

<one section per paper>
```

---

## Suggested Follow-up Files

When this skill finds a recurring or high-value statistical method, create or update:

```text
topic_notes/<node_name>.md
docs/eval_stats_core.md
docs/work_problem_index.md
mini_design_docs/<paper_or_method_name>.md
```

Examples:

```text
topic_notes/finite_population_inference.md
topic_notes/inverse_probability_weighting.md
topic_notes/aipw.md
topic_notes/judge_reliability.md
topic_notes/model_ranking_uncertainty.md
```

---

## Review Checklist

Before finalizing a paper scan, verify:

- [ ] The selected papers are actually about LLM / Agent Eval.
- [ ] Paper dates are inside the requested window, unless explicitly expanded.
- [ ] arXiv IDs are deduplicated.
- [ ] Statistical methods are separated from engineering tricks.
- [ ] Every suggested new node has a reason.
- [ ] Every plan update maps to an actual paper signal.
- [ ] Advanced proof-only nodes are not over-prioritized unless they block reading important papers.

---

## Default Assistant Behavior

When asked to run this skill:

1. Use the default 1-month / 20-paper setting unless the user specifies otherwise.
2. Use alphaXiv MCP for discovery and content extraction.
3. Produce a monthly scan report.
4. Summarize what statistical knowledge is recurring in recent papers.
5. Explicitly say whether the current learning plan should be updated.
6. If updating GitHub, commit the report and any plan changes to the repo.

---

## Important Interpretation Rule

The goal is not to chase every new paper topic.

The goal is to identify statistical concepts that repeatedly appear in modern LLM / Agent Eval research and use them to steer `learn_stat2` toward practical, research-aligned statistical competence.
