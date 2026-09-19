# Linear Algebra II: Rank, System of Equations, Vector Spaces, LU, Gaussian Elimination
<!-- topics: engineering-mathematics-linear-algebra/rank-of-matrix, engineering-mathematics-linear-algebra/system-of-equations, engineering-mathematics-linear-algebra/vector-space, engineering-mathematics-linear-algebra/subspace, engineering-mathematics-linear-algebra/lu-decomposition, engineering-mathematics-linear-algebra/gaussian-elimination -->

## 1. Rank

**Rank(A)** = **linearly independent rows (ya columns) ki maximum sankhya** = **row echelon form me non-zero rows** = **largest non-zero minor (square submatrix) ka size**.

### Properties
- **rank(A) ≤ min(m, n).** **Row rank = column rank.**
- **rank(A) = rank(Aᵀ).**
- **rank(AB) ≤ min(rank A, rank B).**
- **rank(A + B) ≤ rank A + rank B.**
- **n×n: rank n ⟺ det ≠ 0 (invertible/full rank).**
- **Elementary row/column operations rank preserve karte hain.**
- **rank(A) = rank(AᵀA).**
- **Outer product (column × row): rank 1** (agar dono non-zero).
- **rank + nullity = n (columns)** (**Rank–Nullity theorem**). **Nullity = dim(null space) = free variables.**

**Rank nikalna:** row reduce karke non-zero rows gino.
**Example:** A = [1 2 3; 2 4 6; 1 0 1]: R₂ = 2R₁ ⇒ dependent; R₁, R₃ independent ⇒ **rank 2** (3×3 singular, det = 0).
**Parameter wale:** [1 1 1; 1 2 3; 1 3 k]: det |1 1 1; 1 2 3; 1 3 k| = (2k − 9) − (k − 3) + (3 − 2) = k − 5 ⇒ **k = 5 par rank 2**, warna 3.

## 2. System of Linear Equations: Ax = b

m equations, n unknowns. **Augmented matrix [A | b].**

### Consistency (Rouché–Capelli)
| Condition | Solution |
|---|---|
| **rank(A) < rank([A\|b])** | **Koi solution nahi (inconsistent)** |
| **rank(A) = rank([A\|b]) = n** | **Unique solution** |
| **rank(A) = rank([A\|b]) < n** | **Infinite solutions** (n − rank free variables) |

- **Square (n×n): det A ≠ 0 ⟺ unique solution har b ke liye** (Cramer's rule: xᵢ = detAᵢ/det A).
- **det A = 0:** ya infinite ya none — **augmented rank check zaroori.**
- **m < n (kam equations) & consistent ⇒ infinite.**
- **m > n:** overdetermined; consistent ho sakta.

### Homogeneous Ax = 0
- **Hamesha consistent (x = 0 trivial).**
- **Non-trivial solution ⟺ rank(A) < n ⟺ (square) det A = 0.**
- **Solution set = null space**, dimension = **n − rank(A)**.
- **Linearly independent solutions = n − rank.**

### Ax = b ka solution structure
**x = x_particular + x_homogeneous.** Do solutions x₁, x₂ ka **difference Ax = 0 ka solution**.

**Example 1:** x + y + z = 6, x + 2y + 3z = 10, x + 2y + λz = μ:
- rank(A) = 3 (λ ≠ 3) ⇒ unique. λ = 3: R₃ − R₂ = (0,0,0 | μ − 10) ⇒ **μ ≠ 10: no solution**; **μ = 10: infinite**.
**Example 2:** x + y = 2, x + ky = 3: k = 1 ⇒ (1,1|2) aur (1,1|3) ⇒ **no solution**; k ≠ 1 ⇒ unique.
**Example (kitne k par infinite/none):** parameter ki special values det = 0 se nikaalo, phir har case me rank check.
**Example (homogeneous non-trivial):** [1 2 3; 2 4 6; 3 6 k]x = 0: rank ≤ 2 (dependent rows) ⇒ hamesha non-trivial solution.

### Kitne solutions type questions
- **n + 1 equations, n unknowns** consistent nahi ho sakte (generally).
- **Ax = b, A m×n rank m ⇒ har b ke liye consistent.**
- **Har b ke liye solution ⟺ rank = m (rows independent, "onto").**
- **Unique solution jab exist ⟺ columns independent (rank = n).**

## 3. Gaussian Elimination

**Forward elimination** (row echelon), **back substitution.** **Gauss–Jordan** (reduced echelon, inverse ke liye).
- **Pivot** = non-zero leading entry; zero ho to **row swap (partial pivoting)** numerical stability ke liye.
- **Operations count (n × n):** **≈ n³/3 multiplications** (forward) + n²/2 (back). **Time Θ(n³).** Precisely: multiplications (n³ − n)/3 + n², additions ~ n³/3.
- **Inverse/determinant** Gauss se.

**Example:** 2x + y = 5, 4x + 3y = 11: R₂ − 2R₁ ⇒ y = 1 ⇒ x = 2.

## 4. LU Decomposition

**A = LU:** **L lower triangular (unit diagonal, Doolittle)**, **U upper triangular** (elimination ka result). L ke entries = **elimination multipliers**.
- **Solve Ax = b:** Ly = b (forward), Ux = y (backward).
- **det A = Π uᵢᵢ** (unit L).
- **Row swaps ho to PA = LU.**
- **Multiple b ke liye efficient** (ek baar factorize O(n³), har solve O(n²)).
- **Doolittle (L unit), Crout (U unit), Cholesky (A = LLᵀ, symmetric positive definite).**

**Example:** A = [2 1; 4 3]: multiplier l₂₁ = 4/2 = 2 ⇒ U = [2 1; 0 1], **L = [1 0; 2 1]**. det = 2·1 = 2 ✓.
**Example (GATE-type):** diag of L both 1 ⇒ unit lower; if A = [1 2; 3 5], **l₂₁ = 3, u₂₂ = 5 − 6 = −1**.

## 5. Vector Spaces

**Vector space V over field F:** addition aur scalar multiplication ke saath closed + 8 axioms (zero vector, additive inverse, distributivity...).
Examples: **Rⁿ, matrices m×n, polynomials degree ≤ n, functions.**

### Subspace
**W ⊆ V** khud vector space ⟺ **(1) 0 ∈ W, (2) u, v ∈ W ⇒ u + v ∈ W, (3) c·u ∈ W.**
- **Rⁿ ke subspaces:** {0}, lines/planes **through origin**, Rⁿ.
- **Solution set of Ax = 0** subspace (null space). **Ax = b (b ≠ 0)** subspace nahi (0 ∉).
- **Union of subspaces generally subspace nahi**; **intersection subspace hai.**
- **Subspace examples in R³:** {(x,y,z): x + y + z = 0} ✓ (plane through origin); {x + y + z = 1} ✗; {x = y} ✓; {x ≥ 0} ✗ (scalar −1 fail); {x² = y²} ✗ (union of two planes).

### Linear independence, span, basis
- **Vectors v₁…vₖ independent:** c₁v₁ + … + cₖvₖ = 0 ⇒ sab cᵢ = 0. Matrix [v₁ … vₖ] ka **rank = k**.
- **Span:** sab linear combinations. **Basis** = independent + spanning. **Dimension = basis ka size** (unique).
- **Rⁿ me n+1 vectors hamesha dependent.** **n independent vectors Rⁿ ka basis.**
- **Standard basis e₁…eₙ.**
- **dim(Rⁿ) = n; dim(Mₘ×ₙ) = mn; dim(polynomials ≤ d) = d + 1; dim(symmetric n×n) = n(n+1)/2.**
- **Column space dimension = rank; null space dimension = n − rank.**
- **dim(U + W) = dim U + dim W − dim(U ∩ W).** **Do 3-dim subspaces of R⁴: intersection ≥ 3 + 3 − 4 = 2 dim.**
- **Coordinate/change of basis.**

### Four fundamental subspaces (A m×n, rank r)
| Subspace | Dimension |
|---|---|
| Column space C(A) | r |
| Row space C(Aᵀ) | r |
| Null space N(A) | n − r |
| Left null space N(Aᵀ) | m − r |

## 6. Inner product aur geometry (short)
- **Dot product u·v = Σuᵢvᵢ = |u||v|cos θ.** **Orthogonal ⟺ u·v = 0.**
- **Norm |u| = √(u·u).** **Cauchy–Schwarz |u·v| ≤ |u||v|.** **Triangle inequality.**
- **Unit vector perpendicular to a, b (R³): (a × b)/|a × b|.**
- **Projection of u on v: (u·v/v·v) v.**
- **Angle bisector of u, v (same norm): u + v.**
- **Gram–Schmidt** orthonormal basis.

## 7. GATE patterns
1. **Rank nikalo** (parameter ke saath).
2. **Kitne solutions / k ki values** (rank test).
3. **Homogeneous non-trivial condition.**
4. **Subspace hai ya nahi.**
5. **Dimension** (intersection, sum, null space).
6. **LU entries / Gaussian elimination operation count.**
7. **Basis/independence check.**

## 8. Quick Revision
- rank ≤ min(m,n); rank + nullity = n; row rank = column rank.
- Ax = b: rank(A) < rank[A|b] none; = n unique; < n infinite.
- Ax = 0 non-trivial ⟺ rank < n (det = 0 square).
- Gaussian ≈ n³/3; LU: L multipliers, det = Π uᵢᵢ.
- Subspace: contains 0, closed under + and scalar.
- dim(U+W) = dimU + dimW − dim(U∩W).

### Practice
1. 3×5 matrix ka max rank? *(3)*
2. Ax = 0, A 4×6, rank 3: solution space dim? *(6 − 3 = 3)*
3. {(x,y): y = x + 1} subspace? *(Nahi, 0 ∉)*
4. det = 0 square system Ax = b, rank A = 2, rank[A|b] = 3? *(Koi solution nahi)*
