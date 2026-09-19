# Eigenvalues, Eigenvectors, Diagonalization, Orthonormality aur SVD
<!-- topics: engineering-mathematics-linear-algebra/eigen-value, engineering-mathematics-linear-algebra/multiplicity, engineering-mathematics-linear-algebra/orthonormality, engineering-mathematics-linear-algebra/singular-value-decomposition -->

## 1. Definition

**A (n × n)** ke liye **λ eigenvalue** aur **v ≠ 0 eigenvector** agar **Av = λv**. (Matrix v ko sirf **stretch/shrink** karta hai, direction nahi badalta.)
**Characteristic equation:** **det(A − λI) = 0** (degree n polynomial ⇒ n eigenvalues (complex, multiplicity ke saath)).
**Eigenvector nikaalna:** (A − λI)v = 0 solve (null space).

### 2×2 shortcut
**λ² − (trace)λ + det = 0.**
**Example:** A = [4 1; 2 3]: λ² − 7λ + 10 = 0 ⇒ **λ = 5, 2**.
 - λ = 5: (A − 5I) = [−1 1; 2 −2] ⇒ v = (1, 1). λ = 2: [2 1; 2 1] ⇒ v = (1, −2).
**Example:** [2 1; 1 2]: λ = 3, 1; eigenvectors (1,1), (1,−1) (orthogonal, symmetric).

## 2. Key properties (GATE ka core)

- **Σ eigenvalues = trace(A).** **Π eigenvalues = det(A).** **Ek eigenvalue diya ho to baaki trace/det se.**
- **Triangular/diagonal matrix: eigenvalues = diagonal entries.**
- **A singular ⟺ 0 eigenvalue.**
- **Aᵀ ke same eigenvalues.** (Eigenvectors alag ho sakte.)
- **Similar matrices (B = P⁻¹AP) ke same eigenvalues.**
- **Function of A:** **Aᵏ: λᵏ; A + cI: λ + c; cA: cλ; A⁻¹: 1/λ (λ ≠ 0); p(A): p(λ); adj A: det A/λ.** Eigenvectors same.
- **A² = A (idempotent/projection): λ ∈ {0, 1}.** **A² = I: λ ∈ {±1}.** **Aᵏ = 0 (nilpotent): sab λ = 0.**
- **Real symmetric: eigenvalues real; alag eigenvalues ke eigenvectors orthogonal.**
- **Skew-symmetric real: eigenvalues purely imaginary (ya 0).**
- **Orthogonal matrix: |λ| = 1.**
- **Positive definite: sab λ > 0; positive semidefinite: λ ≥ 0.**
- **Distinct eigenvalues ⇒ eigenvectors linearly independent ⇒ diagonalizable.**

**Example:** A 3×3 eigenvalues 1, 2, 3: **det(A² + I) = (1+1)(4+1)(9+1) = 100**; trace(A²) = 1 + 4 + 9 = 14; det(A⁻¹) = 1/6; eigenvalues of A − 2I: −1, 0, 1 (singular).
**Example:** eigenvalues 2, 3 (2×2): trace 5, det 6. **A² eigenvalues 4, 9**; **A⁻¹: 1/2, 1/3.**
**Example (missing entries):** [a 2; 3 b] eigenvalues 5 aur 1: a + b = 6, ab − 6 = 5 ⇒ ab = 11 ⇒ a, b roots of t² − 6t + 11.

### Special matrices ke eigenvalues
- **Rank-1 matrix uvᵀ:** ek non-zero eigenvalue **vᵀu**, baaki 0. **uuᵀ: uᵀu = |u|²**. **All-ones matrix J (n×n): eigenvalues n (once), 0 (n−1 times).**
- **Identity: 1 (n times).** **Zero matrix: 0.**
- **Adjacency matrix of graph:** symmetric ⇒ real eigenvalues; **trace = 0** (no self-loops) ⇒ Σλ = 0; **Σλ² = 2E.**
- **[cos θ −sin θ; sin θ cos θ]:** λ = e^{±iθ} (complex, |λ| = 1).
- **Matrix [a b; b a]: a + b, a − b.** **[a b; 0 a]: a (double).**

## 3. Cayley–Hamilton aur higher powers
p(λ) = det(A − λI) ⇒ p(A) = 0.
**Example:** A = [1 1; 0 2]... λ² − 3λ + 2 = 0 ⇒ A² = 3A − 2I. **Aⁿ nikaalne ke liye** reduce powers.

## 4. Multiplicity

- **Algebraic multiplicity (AM)** = characteristic polynomial me root ki multiplicity.
- **Geometric multiplicity (GM)** = eigenspace ka dimension = **n − rank(A − λI)**.
- **1 ≤ GM ≤ AM.**
- **n×n matrix ka max AM = n** (jaise identity ya scalar matrix). **Kisi eigenvalue ki max multiplicity n.**
- **Sum of AM = n.**
**Example:** [2 1; 0 2]: λ = 2, AM = 2; A − 2I = [0 1; 0 0] rank 1 ⇒ GM = 1 (**defective**, diagonalizable nahi). **2I: AM = GM = 2.**

## 5. Diagonalization

**A diagonalizable ⟺ n linearly independent eigenvectors ⟺ har eigenvalue ke liye GM = AM.**
**A = PDP⁻¹:** D = diagonal(eigenvalues), P = columns eigenvectors. **Aᵏ = P Dᵏ P⁻¹** (powers fast).
- **Distinct eigenvalues ⇒ diagonalizable** (sufficient).
- **Real symmetric matrix hamesha diagonalizable (orthogonally): A = QDQᵀ** (Spectral theorem).
- **Repeated eigenvalue ⇒ check GM.**
- **Defective matrix: diagonalizable nahi** (Jordan form).

**Example:** A = [4 1; 2 3]: P = [1 1; 1 −2], D = diag(5, 2). A¹⁰ = P D¹⁰ P⁻¹.

## 6. Orthogonality aur Orthonormal vectors
- **Orthogonal set:** uᵢ·uⱼ = 0 (i ≠ j). **Orthonormal:** + |uᵢ| = 1.
- **Orthonormal vectors linearly independent.**
- **Q ke columns orthonormal ⟺ QᵀQ = I.** **Square Q orthogonal: QQᵀ = I, det ±1, norm/angle preserve (|Qx| = |x|).**
- **Orthonormal basis unique nahi** (rotate). **Rⁿ me n mutually orthogonal non-zero vectors basis banate.**
- **Projection matrix onto column space of Q (orthonormal cols): P = QQᵀ; P² = P; eigenvalues 0, 1.**
- **Gram–Schmidt** independent vectors ko orthonormal me.
- **Symmetric matrix ke eigenvectors (distinct λ) orthogonal.**

**Example:** (1,1)/√2, (1,−1)/√2 orthonormal; Q = (1/√2)[1 1; 1 −1] orthogonal.

## 7. Singular Value Decomposition (SVD)

**Har m × n matrix A = U Σ Vᵀ**, U (m×m), V (n×n) orthogonal, **Σ diagonal (singular values σ₁ ≥ σ₂ ≥ … ≥ 0)**.
- **σᵢ = √(eigenvalues of AᵀA)** (AᵀA ya AAᵀ ke non-zero eigenvalues same).
- **V ke columns = AᵀA ke eigenvectors; U ke columns = AAᵀ ke eigenvectors.**
- **Rank(A) = number of non-zero singular values.**
- **Σσᵢ² = trace(AᵀA) = ‖A‖_F² (Frobenius norm² = sum of squares of entries).**
- **‖A‖₂ (spectral norm) = σ₁ (largest singular value).**
- **Symmetric positive semidefinite: singular values = eigenvalues.**
- **Best rank-k approximation** (Eckart–Young): top k singular values. Applications: PCA, compression, pseudo-inverse.
**Example:** A = [3 0; 0 −2]: singular values 3, 2 (eigenvalues 3, −2).
**Example:** A = [1 1; 1 1]: AᵀA = [2 2; 2 2] ⇒ λ = 4, 0 ⇒ σ = 2, 0 ⇒ rank 1.

## 8. Positive definite (short)
Symmetric A: **xᵀAx > 0 ∀ x ≠ 0 ⟺ sab λ > 0 ⟺ sab leading principal minors > 0 ⟺ A = BᵀB (B invertible)**. Hessian positive definite ⇒ local minimum.

## 9. GATE patterns
1. **Eigenvalues nikalo** (2×2 quick, triangular, special structure).
2. **Trace/det se missing element/eigenvalue.**
3. **f(A) ke eigenvalues / det (A² + I ...).**
4. **Eigenvector check karo** (Av = λv).
5. **Symmetric/orthogonal/rank-1/projection ke properties.**
6. **Multiplicity/diagonalizable.**
7. **SVD: σ, rank, Frobenius.**
8. **Adjacency matrix eigenvalue sums.**

**Example (GATE-type):** A = uuᵀ, u = (1,2,2)ᵀ: **largest eigenvalue = uᵀu = 9.**
**Example:** A 3×3 real symmetric, rank 1 ⇒ eigenvalues (λ, 0, 0), λ = trace.
**Example:** all eigenvalues of A are 1 aur A diagonalizable ⇒ A = I.

## 10. Quick Revision
- Σλ = trace, Πλ = det; triangular ⇒ diagonal entries.
- f(A) ⇒ f(λ); A⁻¹ ⇒ 1/λ; A + cI ⇒ λ + c.
- Symmetric: real λ, orthogonal eigenvectors, diagonalizable; projection λ ∈ {0,1}.
- 1 ≤ GM ≤ AM; diagonalizable ⟺ GM = AM ∀ λ.
- Rank-1 uvᵀ: vᵀu; J: n, 0,…,0.
- SVD σ = √λ(AᵀA); Σσ² = ‖A‖_F²; rank = # non-zero σ.

### Practice
1. [3 1; 0 2] eigenvalues? *(3, 2)*
2. eig(A) = 1, 4 (2×2): eig(A² − 2A + I)? *(0, 9)*
3. Symmetric 3×3, trace 6, det 0, rank 1 ⇒ eigenvalues? *(6, 0, 0)*
4. A = [1 2; 2 4]: eigenvalues? *(5, 0)*
