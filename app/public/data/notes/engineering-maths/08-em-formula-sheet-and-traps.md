# Engineering Mathematics: Formula Sheet, Tables aur GATE Traps
<!-- topics: engineering-mathematics-linear-algebra/eigen-value, engineering-mathematics-linear-algebra/system-of-equations, engineering-mathematics-probability/probability, engineering-mathematics-probability/expectation, engineering-mathematics-calculus/limits -->

## 1. Formula Sheet

### Linear Algebra
- det(AB) = detA detB; det(kA) = kⁿdetA; det Aᵀ = detA; det A⁻¹ = 1/detA; det(adjA) = (detA)ⁿ⁻¹; triangular = product diag.
- A⁻¹ = adjA/detA; (AB)⁻¹ = B⁻¹A⁻¹. Cayley–Hamilton 2×2: A² − tr(A)A + det(A)I = 0.
- rank ≤ min(m,n); rank + nullity = n. Ax=b: rank A < rank[A|b] ⇒ none; = n ⇒ unique; < n ⇒ infinite. Ax=0 non-trivial ⟺ rank < n.
- Gaussian ≈ n³/3; LU det = Πuᵢᵢ.
- Σλ = trace; Πλ = det; f(A) ⇒ f(λ); triangular ⇒ diagonal; symmetric ⇒ real λ, orthogonal vectors; idempotent λ ∈ {0,1}.
- 1 ≤ GM ≤ AM; diagonalizable ⟺ GM = AM ∀λ. Rank-1 uvᵀ: vᵀu; all-ones J: n,0,…,0.
- SVD σ = √λ(AᵀA); Σσ² = ‖A‖_F²; rank = #σ>0.
- dim(U+W) = dimU + dimW − dim(U∩W). Symmetric n×n independent entries n(n+1)/2.

### Probability
- P(A∪B) = P(A)+P(B)−P(A∩B). P(A|B) = P(A∩B)/P(B). Bayes P(Aᵢ|B) = P(B|Aᵢ)P(Aᵢ)/ΣP(B|Aⱼ)P(Aⱼ).
- Independent: P(A∩B) = P(A)P(B); exclusive ≠ independent.
- E linear; E[XY] = E[X]E[Y] (independent); Var(aX+b) = a²Var; Var(X) = E[X²] − E[X]².
- Binomial np, npq; Poisson λ, λ; Geometric 1/p; Uniform (a+b)/2, (b−a)²/12; Exp 1/λ, 1/λ²; Normal μ, σ²; χ²(k): k, 2k.
- Exp memoryless; min of exps ~ Exp(Σλ). Waiting: HH 6, HT 4, first H 2. Coupon nHₙ.
- Markov P(X≥a) ≤ E/a; Chebyshev P(|X−μ| ≥ kσ) ≤ 1/k².

### Calculus
- Limits: sinx/x→1; (1−cosx)/x²→½; (1+1/x)ˣ→e; (eˣ−1)/x→1; L'Hôpital 0/0, ∞/∞; 1^∞: e^{lim g(f−1)}.
- Continuity: LHL = RHL = f(a); IVT roots; EVT closed interval.
- Differentiable ⇒ continuous; piecewise: match value & slope. Rolle f(a)=f(b) ⇒ f′(c)=0; MVT f′(c) = (f(b)−f(a))/(b−a).
- Extrema: f′ = 0; f″>0 min, f″<0 max; closed interval check endpoints.
- ∫₋ₐᵃ even 2∫₀ᵃ, odd 0; ∫ₐᵇ f(x) = ∫ₐᵇ f(a+b−x); d/dx∫ₐˣ f = f(x); ∫₀^∞ xⁿe⁻ˣ = n!; ∫₁^∞ 1/xᵖ converges p>1.

## 2. Comparison Tables

| Pair | Fark |
|---|---|
| Rank / Nullity | Independent rows / free variables (sum = n) |
| Symmetric / Skew | Aᵀ = A / Aᵀ = −A |
| AM / GM | Root multiplicity / eigenspace dim |
| Independent / Exclusive | P(A∩B) = P(A)P(B) / P(A∩B) = 0 |
| PMF / PDF / CDF | P(X=x) / density / P(X ≤ x) |
| Binomial / Poisson / Geometric | Successes in n / rare events / trials to first |
| Continuous / Differentiable | Differentiable ⇒ continuous |
| Local / Global extrema | Neighbourhood / whole domain (endpoints) |

## 3. Top 25 Traps
1. det(kA) = kⁿ det A (not k).
2. det(A+B) ≠ detA + detB.
3. AB = 0 ⇏ A = 0 or B = 0; AB ≠ BA.
4. Rank test needs [A|b] rank too.
5. det = 0 ⇏ no solution (infinite possible).
6. Subspace must contain 0.
7. Eigenvalues of Aᵀ same, eigenvectors not.
8. A⁻¹: 1/λ only if λ ≠ 0.
9. Repeated eigenvalue ⇒ check GM for diagonalizability.
10. Symmetric ⇒ real eigenvalues, orthogonal eigenvectors.
11. Trace/det shortcut for missing eigenvalues.
12. P(A|B) ≠ P(B|A); given-that shrinks the sample space.
13. Exclusive events dependent (if non-zero).
14. Pairwise ≠ mutual independence.
15. E[XY] needs independence; linearity doesn't.
16. Var(aX+b) = a²Var (no b).
17. Var(X+Y) needs covariance.
18. Bayes with rare disease ⇒ low posterior.
19. Geometric vs binomial confusion.
20. Exponential: rate λ vs mean 1/λ.
21. Continuous P(X = x) = 0.
22. L'Hôpital only for 0/0, ∞/∞.
23. Limit exists needs LHL = RHL.
24. Differentiable ⇒ continuous, not reverse; |x| at 0.
25. f′ = 0 ⇏ extremum; check second derivative/sign change; endpoints for global.

## 4. GATE strategy (EM)
1. **LA:** small examples (2×2, 3×3); trace/det/eigen shortcuts; rank/consistency table.
2. **Probability:** sample space likho; complement; tree diagram; indicator RV for expectations.
3. **Distributions:** identify and use standard mean/variance; CDF/PDF integrals.
4. **Calculus:** substitute, then form identify; piecewise ⇒ junction equations.
5. NAT: units aur decimal places (rounding) dhyaan se.

## 5. Practice order (web app)
Subjects → Engineering Mathematics: **Linear Algebra (Eigen value, Matrix, System of equations) → Probability (Probability, Expectation, Conditional) → Calculus (Limits, Maxima-minima, Continuity)**.
