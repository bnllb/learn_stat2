# learn_stat2 - 一个月学习计划与长期路线 v0.1

## 目标

用一个月建立统计学主干，并优先掌握 LLM / RL / Eval 工作中最高频的统计节点。一个月之后，沿知识图谱持续 DFS/BFS 扩展。

核心原则：不是速成，而是构建可长期演化的统计学系统。

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

> 建议节奏：5 天学习 + 2 天复盘

---

## Day 1：项目启动
- 阅读统计学知识图谱
- 标记 30 个高频节点
- 初始化 node status

产出：节点状态表

---

## Day 2：随机变量
- Bernoulli / Binomial
- reward / pass/fail 映射

产出：random variable note

---

## Day 3：期望 / 方差
- reward variance
- score expectation

产出：expectation note

---

## Day 4：LLN / CLT
- repeat sampling
- CI 直觉

产出：LLN/CLT note

---

## Day 5：周复盘
- mapping：Pass@k / Monte Carlo / Reward

---

## Day 6：Sampling Distribution
- benchmark score 波动来源

---

## Day 7：Estimator / Bias / SE
- mean vs estimator

---

## Day 8：Confidence Interval
- CI 解释与误区

---

## Day 9：Hypothesis Testing
- A vs B

---

## Day 10：Bootstrap
- empirical CI

---

## Day 11：Pass@k
- Bernoulli → Binomial 推导

---

## Day 12：Power Analysis
- sample size

---

## Day 13：实验设计
- randomization

---

## Day 14：A/B Test
- guardrail metrics

---

## Day 15：Multiple Testing

---

## Day 16：Monte Carlo

---

## Day 17：Permutation Test

---

## Day 18：Correlation / Regression

---

## Day 19：Elo / Bradley-Terry

---

## Day 20：综合项目
设计 Coding Agent Eval 系统

---

# 三、每日学习模板

1. 定位节点
2. 直觉解释
3. 数学定义
4. 小例子
5. 工作映射
6. 更新知识图谱状态

---

# 四、第一月产物

- stat_knowledge_map
- eval_stats_core
- topic_notes
- work_problem_index
- learning_log

---

# 五、第一月能力目标

- 能解释 benchmark 是随机变量
- 能给 CI / Bootstrap / Pass@k 做误差分析
- 能判断 A/B test 是否显著
- 能设计基础 eval system
- 能理解 offline-online correlation

---

# 六、长期路线

## 1-3个月
- statistical modeling
- BT / Elo / judge reliability

## 3-6个月
- Bayesian + causal inference

## 6-12个月
- advanced theory entry

## 1年+
- 深度 DFS

---

# 七、BFS / DFS 策略

DFS：
Probability → Inference → Experiment Design → Computation → Learning

BFS（Pass@k 示例）：
Bernoulli → Binomial → Estimator → Bias → CI → Bootstrap

---

# 八、复盘问题

- 本周掌握哪些 node？
- 哪些能用于工作？
- 哪些只是概念？
- 是否缺前置依赖？
- 是否形成 design doc？

---

# 九、最终项目

设计 Coding Agent Eval 系统：
- sampling
- metric
- CI
- bootstrap
- judge reliability
- offline-online correlation

