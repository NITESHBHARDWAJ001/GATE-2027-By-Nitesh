# Probability II: Random Variables, Distributions, Expectation aur Variance
<!-- topics: engineering-mathematics-probability/random-variable, engineering-mathematics-probability/expectation, engineering-mathematics-probability/variance, engineering-mathematics-probability/binomial-distribution, engineering-mathematics-probability/poisson-distribution, engineering-mathematics-probability/normal-distribution, engineering-mathematics-probability/uniform-distribution, engineering-mathematics-probability/exponential-distribution, engineering-mathematics-probability/bernoulli-distribution, engineering-mathematics-probability/chi-square-distribution, engineering-mathematics-probability/continuous-distribution, engineering-mathematics-probability/probability-distribution, engineering-mathematics-probability/probability-density-function, engineering-mathematics-probability/statistics -->

## 1. Random Variable (RV)

Outcome ko **number** se map karne wala function X : S → R.
- **Discrete RV:** countable values. **PMF p(x) = P(X = x)**, Σ p(x) = 1, p ≥ 0.
- **Continuous RV:** uncountable. **PDF f(x) ≥ 0, ∫ f(x)dx = 1.** **P(a ≤ X ≤ b) = ∫ₐᵇ f(x)dx.** **P(X = x) = 0** (single point).
- **CDF F(x) = P(X ≤ x):** **non-decreasing, right-continuous, F(−∞) = 0, F(∞) = 1.** **P(a < X ≤ b) = F(b) − F(a).** **f(x) = F′(x)** (continuous).
- **Median m:** F(m) = 0.5. **Mode:** max PMF/PDF.

**Example:** f(x) = cx on [0, 2]: ∫ = 2c = 1 ⇒ **c = 1/2**. P(X < 1) = 1/4. CDF F(x) = x²/4.

## 2. Expectation (mean)

- **Discrete: E[X] = Σ x p(x).** **Continuous: E[X] = ∫ x f(x) dx.**
- **E[g(X)] = Σ g(x)p(x).** (LOTUS)
- **Linearity: E[aX + bY + c] = aE[X] + bE[Y] + c** — **independent hona zaroori nahi.**
- **Independent X, Y: E[XY] = E[X]E[Y].**
- **E[X] value X ke possible outcomes me hona zaroori nahi** (fair die: 3.5).
- **Indicator RV I_A:** E = P(A). **Expected count = Σ P(individual events)** (linearity ka hero).
- **Tower:** E[E[X|Y]] = E[X]. **Conditional expectation E[X|Y].**
- **Non-negative integer RV: E[X] = Σ_{k≥1} P(X ≥ k).**

**Examples:**
- **Fair die:** 3.5. **Expected number of fixed points of random permutation = 1** (n × 1/n).
- **Expected number of heads in n tosses = n/2.**
- **Random graph G(n, p): expected edges C(n,2)p; expected triangles C(n,3)p³; expected cycles of length k (unordered) = C(n,k)(k−1)!/2 · pᵏ.**
- **n distinct items random arrangement: expected inversions = n(n−1)/4.**
- **Coupon collector:** n coupons, expected draws = n·Hₙ.
- **Exam guessing (MCQ 4 options, wrong −1/3):** expected marks per question = ¼·1 + ¾·(−1/3) = 0.
- **Expected value of min of random subset...** indicator method.

## 3. Variance aur Covariance

- **Var(X) = E[X²] − (E[X])² = E[(X − μ)²] ≥ 0.** **SD σ = √Var.**
- **Var(aX + b) = a² Var(X).** (Shift ka asar nahi.)
- **Independent: Var(X + Y) = Var X + Var Y.** General: **Var(X + Y) = Var X + Var Y + 2Cov(X,Y).**
- **Cov(X,Y) = E[XY] − E[X]E[Y].** **Independent ⇒ Cov = 0** (ulta nahi). **Correlation ρ = Cov/(σₓσᵧ) ∈ [−1, 1].**
- **Var(X) = 0 ⟺ X constant.**
- **Sample mean of n iid: Var = σ²/n.**
- **Standardization Z = (X − μ)/σ: mean 0, var 1.**

## 4. Inequalities
- **Markov:** X ≥ 0: P(X ≥ a) ≤ E[X]/a.
- **Chebyshev:** P(|X − μ| ≥ kσ) ≤ 1/k².
- **Jensen:** E[X²] ≥ (E[X])².
- **Law of large numbers, CLT:** iid sum approx **normal** (n bada).

## 5. Discrete distributions

| Distribution | PMF | Mean | Variance | Use |
|---|---|---|---|---|
| **Bernoulli(p)** | P(1) = p, P(0) = 1−p | p | p(1−p) | Ek trial |
| **Binomial(n, p)** | C(n,k)pᵏ(1−p)ⁿ⁻ᵏ | **np** | **np(1−p)** | n trials me successes |
| **Geometric(p)** | (1−p)ᵏ⁻¹p (k ≥ 1) | **1/p** | (1−p)/p² | Pehli success tak trials |
| **Poisson(λ)** | e^(−λ)λᵏ/k! | **λ** | **λ** | Rare events per interval |
| **Uniform discrete (1..n)** | 1/n | (n+1)/2 | (n²−1)/12 | Die |
| **Negative binomial** | | r/p | | r-th success |
| **Hypergeometric** | | | | Without replacement |

**Poisson:** rate λ per unit time ⇒ t time me λt. **Sum of independent Poisson(λ₁), Poisson(λ₂) = Poisson(λ₁+λ₂).** **Binomial → Poisson** (n bada, p chhota, np = λ). **E[X(X−1)] = λ².**
**Binomial:** X ~ B(n,p): sum of n Bernoulli. **Sum of independent B(n₁,p), B(n₂,p) = B(n₁+n₂, p).**
**Geometric memoryless.**

**Examples:**
- **4 fair coins exactly 2 heads:** C(4,2)/16 = 3/8. **n coins at least one head & one tail: 1 − 2/2ⁿ.**
- **Binomial(10, 0.3): mean 3, var 2.1.**
- **Poisson λ = 2: P(0) = e⁻² ≈ 0.135; P(X ≥ 1) = 1 − e⁻².**
- **Geometric: fair coin, expected tosses to first head = 2.**

### Expected waiting time (state method)
E = 1 + Σ p·E(next).
- **Pehli baar H (fair coin): 2.**
- **Do consecutive heads (HH): 6.** Derivation: E = 1 + ½E₁ + ½E (E₁ = ek H mila): E₁ = 1 + ½·0 + ½E ⇒ E = 6.
- **HT tak: 4.** **HHH: 14.** **Two consecutive same outcomes (HH ya TT): 3.** **Fair die: 6 milne tak 6; do consecutive even numbers: 6 (p = 1/2): E = 6.**
- **Fair die, two consecutive even:** p = 1/2 ⇒ same as HH ⇒ **6**.

## 6. Continuous distributions

### Uniform U(a, b)
**f = 1/(b−a) on [a,b].** **Mean (a+b)/2; Var (b−a)²/12.** **P(c<X<d) = (d−c)/(b−a).** CDF linear.
**Geometric probability:** 2 uniform variables ⇒ area/square. **Meeting problem:** dono [0,T] me aayein, ≤ t wait: **1 − (1 − t/T)²**. **Broken stick (uniform point): expected shorter piece = 1/4; expected longer 3/4; P(shorter < 1/4)...** Point on stick U(0,1): shorter = min(U, 1−U): E = 1/4.
**Stick 3 pieces se triangle: 1/4.**
**X,Y ~ U[0,1] independent: P(X + Y ≤ 1) = 1/2; P(X > Y) = 1/2; E[max] = 2/3; E[min] = 1/3.**

### Exponential Exp(λ)
**f = λe^(−λx), x ≥ 0.** **CDF 1 − e^(−λx).** **P(X > x) = e^(−λx).** **Mean 1/λ; Var 1/λ².** **Median ln2/λ.**
- **Memoryless:** P(X > s + t | X > s) = P(X > t).
- **Min of independent Exp(λ₁), Exp(λ₂) ~ Exp(λ₁ + λ₂).** P(X₁ < X₂) = λ₁/(λ₁+λ₂).
- **Poisson process ke inter-arrival times.** **Lifetime/waiting-time model.**
**Example:** mean 5 ⇒ λ = 0.2; P(X > 5) = e⁻¹ ≈ 0.368. **Mean lifetime 1000 h: P(> 500) = e^(−0.5).**
**Example (conditional):** X ~ Exp, mean 2: P(X > 3 | X > 1) = P(X > 2) = e⁻¹.

### Normal N(μ, σ²)
**Bell curve, symmetric about μ. Mean = median = mode = μ.** **Z = (X − μ)/σ ~ N(0,1).**
- **68–95–99.7 rule:** P(|X−μ| < σ) ≈ 0.68; 2σ: 0.95; 3σ: 0.997.
- **P(Z < 0) = 0.5; Φ(−z) = 1 − Φ(z).**
- **aX + b ~ N(aμ + b, a²σ²).** **Sum of independent normals normal (means, variances add).**
- **Y = max(X, 0), X ~ N(0, σ²): E[Y] = σ/√(2π).** **E[|X|] = σ√(2/π).**
- **Standard normal: E[Z] = 0, E[Z²] = 1, E[Z⁴] = 3.**
- **CLT:** iid sums/means ≈ normal.

### Chi-square χ²(k)
**Sum of squares of k independent N(0,1): mean k, variance 2k.** Sum of independent χ² add dof. (Hypothesis tests.)

### Gamma, Beta (short): Gamma sum of exponentials; Beta on [0,1].

## 7. Joint distributions (short)
- **Joint PMF/PDF p(x,y);** **marginal p(x) = Σᵧ p(x,y).** **Independent ⟺ p(x,y) = p(x)p(y).**
- **Conditional p(y|x) = p(x,y)/p(x).**
- **Two modules series probability, etc.**

## 8. Statistics (basic)
- **Mean, median, mode, range, variance (sample: n−1).**
- **Central limit theorem, standard error = σ/√n.**
- **MLE (Maximum Likelihood):** Bernoulli p̂ = (#heads)/n; Poisson λ̂ = sample mean; Normal μ̂ = mean, σ̂² = (1/n)Σ(x−x̄)².
- **Normalization/z-score;** data me constant add karne se mean shift, variance same; scale se mean, SD scale.
**Example:** data ka mean 10, SD 2: y = 3x + 1 ⇒ mean 31, SD 6.

## 9. GATE patterns
1. **Expected value / variance** (indicator, linearity).
2. **Distribution identify** (binomial/Poisson/geometric/uniform/exponential/normal) aur probability.
3. **PDF constant, CDF, median.**
4. **Exponential memoryless / min.**
5. **Uniform geometric probability.**
6. **Waiting-time expectation.**
7. **Joint/independence, covariance.**

## 10. Quick Revision
- E linear (independent nahi chahiye); Var(aX+b) = a²Var; independent ⇒ variances add.
- Binomial np, np(1−p); Poisson λ, λ; Geometric 1/p; Uniform (a+b)/2, (b−a)²/12; Exp 1/λ, 1/λ²; Normal μ, σ².
- CDF non-decreasing; PDF integrates to 1; P(X=x)=0 continuous.
- Exp memoryless, min ~ Exp(sum).
- Waiting: HH = 6, HT = 4, first H = 2.
- Markov, Chebyshev; CLT.

### Practice
1. Fair die E[X²]? *(91/6 ≈ 15.17)*
2. Binomial(20, 0.5) variance? *(5)*
3. X ~ U[0,4] mean, variance? *(2, 16/12 = 4/3)*
4. Exp mean 4: P(X > 8)? *(e⁻²)*
