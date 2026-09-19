# Linear Algebra I: Matrices aur Determinants
<!-- topics: engineering-mathematics-linear-algebra/matrix, engineering-mathematics-linear-algebra/determinant, engineering-mathematics-linear-algebra/cartesian-coordinates -->

## 1. Matrix basics

**Matrix A (m × n)** = m rows, n columns. **Square** agar m = n. Entries aᵢⱼ.

### Special matrices
| Type | Meaning |
|---|---|
| **Identity I** | Diagonal 1, baaki 0 |
| **Diagonal** | Off-diagonal 0 |
| **Triangular** (upper/lower) | Diagonal ke neeche/upar 0 |
| **Symmetric** | Aᵀ = A |
| **Skew-symmetric** | Aᵀ = −A (diagonal 0) |
| **Orthogonal** | AᵀA = I (A⁻¹ = Aᵀ), det = ±1 |
| **Idempotent** | A² = A |
| **Nilpotent** | Aᵏ = 0 |
| **Involutory** | A² = I |
| **Singular** | det A = 0 (non-invertible) |
| **Hermitian** | A* = A (complex) |

### Operations
- **Add:** same size, entry-wise. **Scalar multiply.**
- **Multiplication:** (m×n)(n×p) = (m×p). **(AB)ᵢⱼ = Σ aᵢₖbₖⱼ.** **Non-commutative** (AB ≠ BA generally). **Associative, distributive.**
- **Transpose:** (Aᵀ)ᵀ = A; **(AB)ᵀ = BᵀAᵀ**; (A + B)ᵀ = Aᵀ + Bᵀ.
- **Trace = diagonal ka sum.** **tr(AB) = tr(BA)**, tr(A + B) = tr A + tr B.
- **Any square A = symmetric + skew-symmetric:** A = (A + Aᵀ)/2 + (A − Aᵀ)/2.
- **Kitne independent entries:** n×n symmetric: n(n+1)/2; skew-symmetric: n(n−1)/2.
- **Matrix power:** A² etc. **(A + B)² = A² + AB + BA + B²** (AB = BA na ho to 2AB nahi).
- **(AB) = 0 ⇏ A = 0 ya B = 0** (zero divisors). **AB = AC ⇏ B = C.**
- Matrices **commute** (AB = BA) special cases: diagonal, polynomial in A, A aur A⁻¹.

## 2. Determinant

**Square matrix ka number.** 
- **2×2:** |a b; c d| = ad − bc.
- **3×3:** expansion (Sarrus/cofactor): a(ei − fh) − b(di − fg) + c(dh − eg).
- **Cofactor expansion** kisi bhi row/column se: det = Σ aᵢⱼ Cᵢⱼ, Cᵢⱼ = (−1)^(i+j) Mᵢⱼ.

### Properties (bahut poochhe jaate)
1. **det(Aᵀ) = det A.**
2. **det(AB) = det A · det B.** (det(A + B) ≠ det A + det B.)
3. **det(kA) = kⁿ det A** (n × n).
4. **Do rows/columns swap ⇒ sign badal.**
5. **Row me scalar k se multiply ⇒ det × k.**
6. **Row ka multiple dusre me add ⇒ det same.**
7. **Do rows same/proportional ya ek row zero ⇒ det = 0.**
8. **Triangular/diagonal: det = diagonal ka product.**
9. **det(A⁻¹) = 1/det A.** **det(Aᵏ) = (det A)ᵏ.**
10. **Orthogonal matrix: det = ±1.**
11. **det(adj A) = (det A)ⁿ⁻¹.** adj(adj A) = (det A)ⁿ⁻² A.
12. **Nilpotent matrix: det = 0.** **Idempotent: det 0 ya 1.**
13. **Skew-symmetric odd order: det = 0.**
14. **Elementary row operations se triangular banake** det nikaalo (best method).

**Example:** |1 2 3; 4 5 6; 7 8 9| = 0 (rows arithmetic progression: R₃ − R₂ = R₂ − R₁ ⇒ dependent).
**Example:** A 3×3, det A = 4: det(2A) = 8·4 = **32**; det(A²) = 16; det(A⁻¹) = 1/4; det(adj A) = 4² = 16.
**Example:** A 3×3, A³ = 0? det = 0.
**Vandermonde det:** Π (xⱼ − xᵢ). **|1 a a²; 1 b b²; 1 c c²| = (b−a)(c−a)(c−b).**
**Special:** n×n matrix "sab diagonal a, off-diagonal b": det = (a − b)ⁿ⁻¹(a + (n−1)b).
**Block triangular:** det = det A · det D.
**Row/column operation se det unchanged:** R₁ → R₁ + 3R₂.

### Geometric meaning
- **|det A| = volume scaling factor.** 2D: area of parallelogram formed by rows. **Triangle area with vertices (x₁,y₁),(x₂,y₂),(x₃,y₃) = ½ |det [x₁ y₁ 1; x₂ y₂ 1; x₃ y₃ 1]|.** **Collinear ⟺ det = 0.**

## 3. Inverse

**A⁻¹ exists ⟺ det A ≠ 0.** A A⁻¹ = I.
- **A⁻¹ = adj(A)/det A** (adj = cofactor matrix ka transpose).
- **2×2:** [a b; c d]⁻¹ = (1/(ad − bc)) [d −b; −c a].
- **(AB)⁻¹ = B⁻¹A⁻¹**, **(Aᵀ)⁻¹ = (A⁻¹)ᵀ**, **(A⁻¹)⁻¹ = A**, (kA)⁻¹ = A⁻¹/k.
- **Gauss–Jordan:** [A | I] → [I | A⁻¹].
- **Agar A² = I ⇒ A⁻¹ = A.** **Idempotent (≠ I) singular.** **A² − 3A + I = 0 ⇒ A⁻¹ = 3I − A.**
- **A B = I (square) ⇒ B = A⁻¹ aur BA = I.**
- **Orthogonal: A⁻¹ = Aᵀ.**

**Example:** A = [1 2; 3 4]: det = −2 ⇒ A⁻¹ = (−1/2)[4 −2; −3 1] = [−2 1; 3/2 −1/2].

## 4. Adjoint aur Cayley–Hamilton
- **A·adj A = det(A)·I.**
- **Cayley–Hamilton:** matrix apni characteristic equation satisfy karta hai. 2×2: **A² − (tr A)A + (det A)I = 0** ⇒ A² = (tr A)A − (det A)I; invertible ho to A⁻¹ = ((tr A)I − A)/det A.
**Example:** A = [1 2; 3 4]: A² − 5A − 2I = 0.

## 5. Matrix ke special facts
- **Trace = Σ eigenvalues; det = Π eigenvalues.**
- **Symmetric matrices: real eigenvalues; orthogonal eigenvectors.**
- **Orthogonal columns/rows: orthonormal.**
- **Nilpotent: sab eigenvalues 0.**
- **Projection matrix P² = P, symmetric.**
- **Rotation matrix [cos θ −sin θ; sin θ cos θ]: orthogonal, det = 1.**

## 6. GATE patterns
1. **Determinant nikaalo** (structure se, row operations).
2. **det(kA), det(AB), det(adj)** properties.
3. **Statements true/false** (AB, transposes, singular).
4. **Inverse/adjoint.**
5. **Cayley–Hamilton se A⁻¹/higher power.**
6. **Matrix counting** (symmetric independent entries).
7. **Collinearity/area (coordinate geometry).**

## 7. Quick Revision
- det(AB) = detA detB; det(kA) = kⁿ det A; det Aᵀ = det A; triangular = product diag.
- Row swap flips sign; adding multiple of a row keeps det; dependent rows ⇒ 0.
- det(adj A) = (det A)ⁿ⁻¹; det A⁻¹ = 1/det A.
- A⁻¹ = adj A/det A; (AB)⁻¹ = B⁻¹A⁻¹.
- Cayley–Hamilton: A² − tr(A)A + det(A)I = 0 (2×2).
- Symmetric n×n independent entries n(n+1)/2.

### Practice
1. 4×4, det A = 3: det(2A)? det(A⁻¹)? *(16·3 = 48; 1/3)*
2. det [1 2; 2 4]? *(0)*
3. A² = A, A invertible ⇒ A = ? *(I)*
4. Triangle (0,0),(4,0),(0,3) area via determinant? *(½·|4·3| = 6)*
