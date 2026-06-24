# learn_stat2 - 一个月学习计划与长期路线 v0.1

## 目标

用一个月建立统计学主干，并优先掌握 LLM / RL / Eval 工作中最高频的统计节点。一个月之后，沿知识图谱持续 DFS/BFS 扩展。

核心原则：不是速成，而是构建可长期演化的统计学系统。

这个计划现在包含两条线：

1. **静态主干线**：按照概率论、统计推断、实验设计、计算统计、统计学习逐步补齐基础。
2. **动态论文反馈线**：定期扫描最新 LLM / Agent Eval 论文，分析其中使用的统计知识，反向更新学习计划和知识图谱。

---

# 一、一个月路线总览

## Week 1：概率论主干

核心节点：
- 随机变量
- 分布（Bernoulli / Binomial / Normal）
- 期望 / 方差 / 协方差
- LLN / CLT

目标：
能用概率语言描述 reward、score、pass/fail、repeat sampling。

---

## Week 2：统计推断核心

核心节点：
- Sampling Distribution
- Estimator
- Bias / Variance
- Standard Error
- Confidence Interval
- Hypothesis Testing
- p-value
- Bootstrap

目标：
能判断 benchmark 分数提升是否可信。

---

## Week 3：Eval 高频统计节点

核心节点：
- Pass@k
- Power Analysis
- A/B Test
- Metric Design
- Multiple Testing
- Sequential Testing

目标：
能设计和审查一个模型评测实验。

---

## Week 4：计算统计 + 工作整合

核心节点：
- Monte Carlo
- Permutation Test
- Correlation
- Regression
- Elo / Bradley-Terry
- Judge Reliability
- Offline-online Correlation

目标：
完成一个 Coding Agent / LLM Eval 统计设计文档。

---

# 二、20 天执行计划

> 建议节奏：5 天学习 + 2 天复盘。

---

## Day 1：项目启动
- 阅读统计学知识图谱
- 标记 30 个高频节点
- 初始化 node status

产出：节点状态表。

---

## Day 2：随机变量
- Bernoulli / Binomial
- reward / pass/fail 映射

产出：random variable note。

---

## Day 3：期望 / 方差
- reward variance
- score expectation

产出：expectation note。

---

## Day 4：LLN / CLT
- repeat sampling
- CI 直觉

产出：LLN/CLT note。

---

## Day 5：周复盘
- mapping：Pass@k / Monte Carlo / Reward

产出：概率论到 LLM/RL/Eval 的一页映射。

---

## Day 6：Sampling Distribution
- benchmark score 波动来源

产出：sampling distribution note。

---

## Day 7：Estimator / Bias / SE
- mean vs estimator
- estimator vs model ability

产出：estimator / standard error note。

---

## Day 8：Confidence Interval
- CI 解释与误区
- mean CI / proportion CI / bootstrap CI

产出：confidence interval note。

---

## Day 9：Hypothesis Testing
- A vs B
- p-value 误区

产出：hypothesis testing note。

---

## Day 10：Bootstrap
- empirical CI
- benchmark mean / pass rate 误差估计

产出：bootstrap note or notebook。

---

## Day 11：Pass@k
- Bernoulli → Binomial → combinatorics
- unbiased estimator

产出：pass@k note。

---

## Day 12：Power Analysis
- sample size
- effect size
- CI width

产出：power analysis note。

---

## Day 13：实验设计
- randomization
- control / treatment
- blocking / stratification

产出：experiment design checklist。

---

## Day 14：A/B Test
- guardrail metrics
- sequential peeking

产出：A/B test checklist。

---

## Day 15：Multiple Testing
- 多模型、多 benchmark、多指标比较
- FWER / FDR 直觉

产出：multiple testing note。

---

## Day 16：Monte Carlo
- rollout / repeat / sampling 估计
- variance reduction 入口

产出：monte carlo note。

---

## Day 17：Permutation Test
- 非参数比较
- 与 bootstrap / t-test 对比

产出：resampling methods note。

---

## Day 18：Correlation / Regression
- Pearson / Spearman
- offline-online correlation
- measurement error 入口

产出：correlation / regression note。

---

## Day 19：Elo / Bradley-Terry
- pairwise preference
- likelihood / MLE
- ranking uncertainty

产出：Elo / Bradley-Terry note。

---

## Day 20：综合项目
设计 Coding Agent Eval 系统。

产出：mini design doc。

---

# 三、每日学习模板

1. 定位节点。
2. 直觉解释。
3. 数学定义。
4. 小例子。
5. 工作映射。
6. 更新知识图谱状态。

---

# 四、第一月产物

- `docs/stat_knowledge_map_v0.1.md`
- `docs/eval_stats_core.md`
- `topic_notes/`
- `docs/work_problem_index.md`
- `learning_log/`
- `mini_design_docs/`
- `paper_reading/`

---

# 五、第一月能力目标

- 能解释 benchmark 是随机变量 / 统计量，而不是模型能力本身。
- 能给 CI / Bootstrap / Pass@k 做误差分析。
- 能判断 A/B test 是否显著。
- 能设计基础 eval system。
- 能理解 offline-online correlation。
- 能把一篇 LLM / Agent Eval 论文里的统计方法映射回知识图谱。

---

# 六、长期路线

## 0-1 个月
- Probability
- Inference
- Experiment Design
- Bootstrap
- Pass@k
- A/B Test
- Power Analysis

目标：打通统计主干，并能处理 LLM/RL/Eval 高频评测问题。

## 1-3 个月
- Statistical Modeling
- BT / Elo
- Judge Reliability
- Calibration
- Measurement Error
- Offline-online correlation
- Finite Population Inference
- Survey Sampling
- IPW / AIPW
- Adaptive Sampling

目标：能读懂和复现大多数 LLM Eval 论文的方法主线和实验设计。

## 3-6 个月
- Bayesian Statistics
- Hierarchical Models
- Bayesian A/B Test
- Causal Inference
- Distribution Shift
- Robust Statistics
- Active Learning / Optimal Sampling

目标：能分析复杂不确定性、线上实验解释、评测偏差和 judge/model uncertainty。

## 6-12 个月
- Concentration Inequalities
- Information Theory
- High-dimensional Statistics
- Martingale / Filtration
- Martingale CLT
- Triangular Array
- Lindeberg Condition

目标：能阅读统计保证类论文的 theorem statement，并逐步进入 proof / appendix。

## 1 年+
- Empirical Process
- Nonparametric Statistics
- Decision Theory
- Advanced Causal Inference
- Advanced Bayesian Computation

目标：根据工作和研究方向深度 DFS。

---

# 七、BFS / DFS 策略

DFS：

```text
Probability → Inference → Experiment Design → Computation → Learning
```

BFS（Pass@k 示例）：

```text
Pass@k
  → Bernoulli
  → Binomial
  → Combinatorics
  → Estimator
  → Bias / Variance
  → Confidence Interval
  → Bootstrap
```

BFS（统计保证类 Eval 论文示例）：

```text
Efficient LLM Evaluation with Statistical Guarantees
  → Finite Population Inference
  → Survey Sampling
  → Importance Sampling
  → IPW / AIPW
  → Adaptive Sampling
  → Confidence Interval
  → Martingale CLT
```

BFS（LLM-as-Judge 论文示例）：

```text
LLM-as-Judge
  → Measurement Error
  → Inter-rater Reliability
  → Calibration
  → Bias / Variance
  → Bootstrap
  → Paired Comparison
  → Bradley-Terry
```

---

# 八、动态论文反馈线

## 目标

定期扫描最新 LLM / Agent Eval 论文，抽取其中使用的统计知识，并判断是否需要更新当前学习计划。

## 默认频率

- 默认窗口：最近 1 个月。
- 默认数量：20 篇评测相关论文。
- 默认主题：LLM evaluation、agent evaluation、benchmarking、LLM-as-judge、statistical guarantees、reward evaluation、pass@k、offline-online correlation、model ranking。

## 扫描流程

1. 用 alphaXiv MCP 的 `discover_papers` 拉取候选论文。
2. 按 arXiv ID 去重，过滤最近 1 个月内的论文。
3. 保留最相关的 20 篇。
4. 对每篇论文用 `get_paper_content` 或 `answer_pdf_queries` 抽取：
   - evaluation setup
   - metrics
   - uncertainty quantification
   - confidence intervals
   - hypothesis tests
   - sampling strategy
   - ranking / comparison method
   - judge reliability
   - statistical guarantees
   - limitations
5. 把统计知识映射回 `stat_knowledge_map`。
6. 产出：
   - 本月论文列表
   - 每篇论文用到的统计节点
   - 高频统计节点排名
   - 当前计划缺口
   - 是否新增节点 / 调整优先级

## 触发学习计划更新的规则

满足任一条件就更新学习计划：

1. 某个统计节点在最近 20 篇论文中出现 ≥ 3 次。
2. 某个统计节点虽然只出现 1 次，但位于论文核心方法或 theorem 中。
3. 某个节点直接影响工作能力，例如 benchmark CI、judge reliability、offline-online correlation、model ranking。
4. 某个节点是理解多篇论文的共同前置依赖。

## 不更新学习计划的情况

1. 只是某篇论文的工程 trick，不具备统计泛化价值。
2. 是某个 benchmark 的细节，而不是可迁移统计方法。
3. 是很高级但短期和 LLM/RL/Eval 工作无关的理论细节。

---

# 九、复盘问题

每周复盘：

- 本周掌握哪些 node？
- 哪些能用于工作？
- 哪些只是概念？
- 是否缺前置依赖？
- 是否形成 design doc？

每月论文反馈复盘：

- 最近 20 篇 eval 论文中最高频的统计方法是什么？
- 哪些方法已经在知识图谱中？
- 哪些方法还没有覆盖？
- 哪些节点需要提升优先级？
- 当前学习路线是否需要调整？
- 是否需要新增一个专题，例如 `finite_population_inference.md` 或 `judge_reliability.md`？

---

# 十、最终项目

设计 Coding Agent Eval 系统：

- task sampling
- metric design
- CI
- bootstrap
- pass@k
- paired model comparison
- judge reliability
- offline-online correlation
- multiple testing
- sequential evaluation

验收标准：

1. 能画出完整评测闭环。
2. 每个指标都有统计含义和误差表达。
3. 每个结论都能说明不确定性来源。
4. 能解释为什么这个线下评测可能或不可能预测线上效果。
5. 能把该设计映射回统计学知识图谱。

---

# 十一、和 skills 的关系

动态论文扫描流程沉淀为独立 skill：

```text
skills/alphaxiv_eval_paper_scan/SKILL.md
```

该 skill 负责：

1. 拉取最近一段时间的 eval 论文。
2. 提取论文里的统计知识。
3. 判断知识图谱和学习计划缺口。
4. 生成月度 paper scan 报告。
5. 给出是否更新 `learning_plan` / `stat_knowledge_map` / `eval_stats_core` 的建议。
