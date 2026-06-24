# learn_stat2 - 统计学知识大图 v0.1

## 目标

建立一个面向长期学习的统计学知识图谱，同时把 LLM / RL / Eval 工作中常遇到的统计问题映射到统计学节点上。

这个文档不是一次性学习计划，而是长期维护的知识地图。后续每学一个统计概念，都应该先定位到这里，再决定要补哪些前置知识、学到什么深度、如何和工作问题关联。

## 使用原则

1. **主干 DFS**：概率论 → 统计推断 → 实验设计 → 计算统计 → 统计学习。
2. **工作问题 BFS**：遇到 Pass@k / Bootstrap / Elo / A/B Test / Reward Variance 等问题时，反向定位相关节点和前置依赖。
3. 每个节点都记录：所属模块、前置依赖、工作关联、目标掌握深度、当前状态。
4. 不追求一次性学完，而是持续更新节点状态和工作案例。

## 节点状态

| 状态 | 含义 |
|---|---|
| 0 | Unvisited：没学 |
| 1 | Skimmed：知道是什么 |
| 2 | Understood：能讲清楚直觉 |
| 3 | Derived：能推公式 / 做题 |
| 4 | Applied：能用于真实工作问题 |

## 目标深度

| 星级 | 含义 |
|---|---|
| ★★★★★ | LLM / RL / Eval 工作高频，目标深度 4 |
| ★★★★☆ | 重要扩展，目标深度 3 |
| ★★★☆☆ | 长期补充，目标深度 2-3 |
| ★★☆☆☆ | 理论储备，暂时目标深度 1-2 |

---

# A. 概率论 Probability

## 定位

统计学的根。Reward、Return、Pass@k、Benchmark Score、Judge Score 本质上都要先被看成随机变量。

| 节点 | 前置依赖 | LLM/RL/Eval 工作关联 | 优先级 |
|---|---|---|---|
| 随机试验 / 样本空间 | 集合、函数 | 定义任务空间、采样空间、benchmark 的真实目标分布 | ★★★★☆ |
| 事件与概率公理 | 集合运算 | success rate、pass rate、任务失败概率 | ★★★★★ |
| 条件概率 | 事件概率 | 按任务类型、难度、模型版本分层看效果 | ★★★★★ |
| 独立性 | 条件概率 | repeat 是否提供有效独立样本；benchmark 题目是否相关 | ★★★★★ |
| 贝叶斯公式 | 条件概率 | judge uncertainty、model uncertainty、后验更新 | ★★★★☆ |
| 随机变量 | 概率空间 | reward、score、pass/fail、latency、cost 都是随机变量 | ★★★★★ |
| PMF / PDF / CDF | 随机变量 | 描述 score distribution、reward distribution | ★★★★☆ |
| 期望 | 随机变量 | 平均分、期望回报、benchmark mean | ★★★★★ |
| 方差 / 标准差 | 期望 | reward variance、benchmark 抖动、CI 宽度 | ★★★★★ |
| 协方差 / 相关系数 | 期望、方差 | offline-online correlation、metric correlation | ★★★★★ |
| Bernoulli / Binomial | 随机变量、独立性 | pass/fail、pass rate、pass@k | ★★★★★ |
| Normal / t / Chi-square / Beta / Gamma | 连续分布 | CI、t-test、Beta-Binomial、Bayesian pass rate | ★★★★☆ |
| 大数定律 LLN | 期望、独立同分布 | repeat 越多估计越稳定 | ★★★★★ |
| 中心极限定理 CLT | 方差、极限 | 均值 CI、t-test、误差棒 | ★★★★★ |
| 马尔可夫链 | 条件概率、矩阵 | MCMC、RL trajectory、状态转移 | ★★★★☆ |

---

# B. 统计推断 Statistical Inference

## 定位

统计学核心。Benchmark 不是模型能力本身，而是对模型能力的一个有噪声估计。

| 节点 | 工作关联 | 优先级 |
|---|---|---|
| 总体 / 样本 / 统计量 | 真实任务分布是总体，benchmark 是样本，score 是统计量 | ★★★★★ |
| 抽样分布 Sampling Distribution | 同一个模型换一批题，分数会变；这个波动来自抽样分布 | ★★★★★ |
| 估计量 Estimator | mean score、pass rate、pass@k 都是估计量 | ★★★★★ |
| Bias | 指标是否系统性高估/低估模型能力 | ★★★★★ |
| Variance | 评测稳定性、reward variance | ★★★★★ |
| MSE | 比较不同估计方法的总体误差 | ★★★★☆ |
| Standard Error | 均值 / 比例 / pass@k 的估计误差 | ★★★★★ |
| Confidence Interval | benchmark 分数区间、模型差异区间 | ★★★★★ |
| Hypothesis Testing | 模型 A 是否真的优于模型 B | ★★★★★ |
| p-value | 显著性判断；容易被误解为“模型提升概率” | ★★★★★ |
| t-test | 小样本均值比较 | ★★★★☆ |
| Proportion Test | pass/fail 类指标比较 | ★★★★★ |
| Likelihood | MLE、Bradley-Terry、reward model、Elo 拟合 | ★★★★★ |
| MLE | 参数估计、BT/Elo、logistic regression | ★★★★★ |
| Bootstrap | 复杂 metric 的 CI；benchmark mean/pass@k 的误差估计 | ★★★★★ |
| Power Analysis | 需要多少题、多少 repeat，才能看出某个提升 | ★★★★★ |
| Multiple Testing | 多模型、多 benchmark、多指标比较导致 false positive | ★★★★☆ |
| Asymptotic Theory | 大样本近似什么时候可靠 | ★★★★☆ |

---

# C. 实验设计 Experimental Design

## 定位

很多工程评测问题不是模型问题，而是实验设计问题。

| 节点 | 工作关联 | 优先级 |
|---|---|---|
| Randomization | 线上 A/B、模型版本对比的可信基础 | ★★★★★ |
| Control / Treatment | 新旧模型、实验组/对照组 | ★★★★★ |
| Blocking / Stratification | 按任务类型、难度、用户群分层 | ★★★★☆ |
| Sample Size | 题量、用户量、repeat 数 | ★★★★★ |
| A/B Test | 线上实验核心方法 | ★★★★★ |
| Sequential Testing | 连续看数导致误判 | ★★★★☆ |
| Metric Design | 指标是否真的对齐产品目标 | ★★★★★ |
| Guardrail Metrics | 防止主指标提升但副作用变大 | ★★★★☆ |
| Inter-rater Reliability | 人审 / LLM judge 一致性 | ★★★★☆ |
| Experiment Validity | 内部有效性、外部有效性、污染与偏差 | ★★★★☆ |

---

# D. 统计建模 Statistical Modeling

## 定位

把随机变量之间的关系显式建模。用于预测、解释、排序和误差分解。

| 节点 | 工作关联 | 优先级 |
|---|---|---|
| Linear Regression | offline-online metric prediction | ★★★★★ |
| Regression Diagnostics | 残差、异方差、异常点 | ★★★★☆ |
| Logistic Regression | pass/fail 概率建模 | ★★★★★ |
| GLM | 不同类型指标的统一建模框架 | ★★★★☆ |
| Regularized Regression | 高维特征下稳健预测 | ★★★★☆ |
| Mixed / Hierarchical Models | 题目/模型/评审者多层结构 | ★★★★☆ |
| ANOVA | 方差分解 | ★★★☆☆ |
| Survival Analysis | 任务完成时间、timeout | ★★★☆☆ |
| Time Series | 线上指标趋势、漂移监控 | ★★★☆☆ |
| Robust Statistics | 异常任务、极端分数处理 | ★★★★☆ |
| Measurement Error | judge 噪声、标注噪声 | ★★★★☆ |
| Bradley-Terry / Elo | 偏好评测、模型竞技排序 | ★★★★★ |

---

# E. 计算统计 Computational Statistics

## 定位

特别适合工程师。很多 LLM/RL/Eval 里的采样、rollout、repeat、bootstrap 都属于这里。

| 节点 | 工作关联 | 优先级 |
|---|---|---|
| Monte Carlo | rollout、repeat、采样估计 | ★★★★★ |
| Variance Reduction | 更少样本得到更稳定估计 | ★★★★☆ |
| Importance Sampling | off-policy 估计、稀有事件估计 | ★★★★☆ |
| Bootstrap Algorithms | 复杂指标误差棒 | ★★★★★ |
| Permutation Test | 非参数模型比较 | ★★★★☆ |
| MCMC | 后验采样 | ★★★☆☆ |
| Gibbs / Metropolis-Hastings | 基础采样算法 | ★★★☆☆ |
| EM | 潜变量模型拟合 | ★★★★☆ |
| Variational Inference | 近似贝叶斯推断 | ★★★☆☆ |
| Numerical Optimization | MLE、BT、reward model 拟合 | ★★★★★ |

---

# F. 贝叶斯统计 Bayesian Statistics

## 定位

显式处理不确定性。适合小样本、judge uncertainty、reward uncertainty、分层建模。

| 节点 | 工作关联 | 优先级 |
|---|---|---|
| Prior | 先验知识、小样本平滑 | ★★★★☆ |
| Posterior | 观测数据后更新信念 | ★★★★☆ |
| Conjugate Prior | Beta-Binomial 等 | ★★★★☆ |
| Posterior Predictive | 预测下一批 benchmark 表现 | ★★★★☆ |
| Credible Interval | 和频率派 CI 区分 | ★★★★☆ |
| Bayesian Decision Theory | 基于 posterior 和 loss 做决策 | ★★★☆☆ |
| Hierarchical Bayesian Model | 题目/模型/评审者层级不确定性 | ★★★★☆ |
| Bayesian A/B Test | 线上实验的贝叶斯表达 | ★★★☆☆ |
| Bayesian Optimization | 实验预算分配、超参搜索 | ★★★☆☆ |

---

# G. 统计学习 Statistical Learning

## 定位

连接统计学和机器学习。核心问题是泛化、过拟合、校准和分布偏移。

| 节点 | 工作关联 | 优先级 |
|---|---|---|
| Bias-Variance Tradeoff | 泛化和过拟合核心 | ★★★★★ |
| Train / Validation / Test | 评测泄漏与选择偏差 | ★★★★★ |
| Cross Validation | 小数据模型选择 | ★★★★☆ |
| Regularization | 泛化控制 | ★★★★★ |
| Generalization Error | 线下到真实分布 | ★★★★★ |
| Calibration | judge/reward 概率是否可信 | ★★★★★ |
| ROC / PR / AUC | binary judge/reward model 评估 | ★★★★☆ |
| Distribution Shift | benchmark 和真实任务不一致 | ★★★★★ |
| Covariate / Label Shift | 数据漂移诊断 | ★★★★☆ |
| Ensemble | 多 judge、多模型集成 | ★★★☆☆ |
| PAC / VC 直觉 | 泛化理论入口 | ★★★☆☆ |
| Proper Scoring Rules | 概率预测的合理打分 | ★★★★☆ |

---

# H. 因果推断 Causal Inference

## 定位

回答“这个变化是不是由模型/策略导致的”，而不只是相关性。

| 节点 | 工作关联 | 优先级 |
|---|---|---|
| Potential Outcomes | 处理效应定义 | ★★★☆☆ |
| ATE / ATT | 平均处理效应 | ★★★☆☆ |
| DAG | 混杂结构表达 | ★★★☆☆ |
| Confounding | 相关不等于因果 | ★★★★☆ |
| RCT | 线上实验黄金标准 | ★★★★☆ |
| Matching | 非随机数据对齐 | ★★★☆☆ |
| IV | 工具变量 | ★★☆☆☆ |
| Difference-in-Differences | 策略变更前后比较 | ★★★☆☆ |
| Causal Validity | 因果结论边界 | ★★★☆☆ |

---

# I. 高级统计理论 Advanced Theory

## 定位

Stat PhD / ML Theory 世界。当前只需要知道位置，后续按兴趣深入。

| 节点 | 工作关联 | 优先级 |
|---|---|---|
| Measure-theoretic Probability | 严格概率论基础 | ★★☆☆☆ |
| Real Analysis | 理论统计基础 | ★★☆☆☆ |
| Modes of Convergence | 渐近理论前置 | ★★★☆☆ |
| Empirical Process | 高级泛化 / 非参数理论 | ★★☆☆☆ |
| Information Theory | 熵、KL、互信息、压缩率 | ★★★★☆ |
| High-dimensional Statistics | 高维特征、稀疏估计 | ★★★☆☆ |
| Nonparametric Statistics | 少假设建模 | ★★★☆☆ |
| Decision Theory | loss、risk、optimal rule | ★★★☆☆ |
| Asymptotic Efficiency | 估计器极限性能 | ★★☆☆☆ |
| Concentration Inequalities | 高概率误差界、泛化界 | ★★★★☆ |
| Information Geometry | 高级理论扩展 | ★☆☆☆☆ |

---

# J. LLM / RL / Eval 专用映射层

这些不是传统统计学一级分类，而是工作中的高频问题入口。

| 工作入口 | 所属模块 | 前置依赖 | 目标深度 |
|---|---|---|---|
| Pass@k | 概率论 + 统计推断 + 计算统计 | Bernoulli、Binomial、组合、Estimator、Bias、Variance、CI | 4 |
| Benchmark CI | 统计推断 | Sampling Distribution、SE、CLT、Bootstrap | 4 |
| Offline-online correlation | 概率论 + 统计建模 + 统计学习 | Covariance、Pearson、Spearman、Regression、Measurement Error、Distribution Shift | 4 |
| Judge Reliability | 实验设计 + 统计建模 | Inter-rater Reliability、Measurement Error、Calibration、Variance Decomposition | 4 |
| Reward Variance | 概率论 + 计算统计 + RL | Variance、Monte Carlo、Sample Size、Variance Reduction | 4 |
| Elo / Bradley-Terry | 统计建模 + MLE | Likelihood、Logistic Regression、Optimization | 4 |
| A/B Experiment for Agent | 实验设计 + 因果推断 | Randomization、Power、Guardrail Metrics、Sequential Testing | 4 |
| Task Sampling | 概率论 + 实验设计 | Sampling、Stratification、Distribution Shift | 4 |
| Data Leakage | 统计学习 + 实验有效性 | Train/Test Split、Generalization、Validity | 4 |
| Repeat Sampling | 计算统计 | Monte Carlo、LLN、SE | 4 |

---

# 工作问题索引

| 工作问题 | 相关统计节点 |
|---|---|
| Benchmark 分数波动大，如何判断是否真的提升？ | Sampling Distribution、SE、CI、Hypothesis Testing、Bootstrap、Power Analysis |
| Pass@k 如何估计，repeat 多少才够？ | Bernoulli、Binomial、Combinatorics、Unbiased Estimator、Monte Carlo、CI |
| Offline eval 和 online metric 是否相关？ | Pearson、Spearman、Regression、Measurement Error、Statistical Significance、Distribution Shift |
| LLM-as-judge 是否可信？ | Inter-rater Reliability、Calibration、Measurement Error、Variance Decomposition |
| 多模型多 benchmark 同时比较，如何避免误判？ | Multiple Testing、FDR、Family-wise Error、Experiment Design |
| 模型竞技排名怎么做？ | Elo、Bradley-Terry、MLE、Logistic Regression、Uncertainty |
| RL rollout reward 波动大怎么办？ | Variance、Monte Carlo、Variance Reduction、Sample Size、Importance Sampling |
| 线上 A/B 看起来提升，能不能上线？ | RCT、A/B Test、Power、Guardrail Metrics、Sequential Testing |
| Benchmark 是否被污染？ | Data Leakage、Train/Test Split、Experiment Validity、Distribution Shift |
| 如何设计一个更可靠的 Agent Eval？ | Metric Design、Task Sampling、Blocking、CI、Judge Reliability、Offline-online Correlation |

---

# 当前第一批重点节点

## 必须优先学到深度 4

- Random Variable
- Expectation
- Variance
- Covariance / Correlation
- Bernoulli / Binomial
- LLN / CLT
- Estimator
- Bias / Variance / SE
- Confidence Interval
- Hypothesis Testing / p-value
- Bootstrap
- Power Analysis
- A/B Test
- Metric Design
- Pearson / Spearman
- Monte Carlo
- Pass@k
- Benchmark CI
- Elo / Bradley-Terry
- Judge Reliability
- Offline-online Correlation

## 暂时只需要知道位置

- Measure Theory
- Empirical Process
- Advanced MCMC
- Full Causal Theory
- Information Geometry

---

# 节点笔记模板

```md
# Node

## Module

## Status

## Prerequisites

## One-sentence intuition

## Formal definition

## Core formula

## LLM/RL/Eval example

## Common pitfalls

## Mini exercise

## Next review date
```

---

# v0.1 后续更新规则

1. 每学一个节点，更新状态 0/1/2/3/4。
2. 每遇到一个工作问题，先写入“工作问题索引”，再反向补齐相关节点。
3. 每篇 topic note 必须包含：直觉、公式、适用条件、工作案例、常见误区。
4. 每周复盘一次：哪些节点已经 Applied，哪些只是 Skimmed。
5. 每月把零散笔记压缩到 `eval_stats_core`。
