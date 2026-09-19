# Algebraic Structures: Semigroup, Monoid, Group, Ring, Field
<!-- topics: discrete-mathematics-set-theory-algebra/group-theory, discrete-mathematics-set-theory-algebra/binary-operation -->

## 1. Binary Operation

Set S par **binary operation ∗ : S × S → S** (**closure**: result S me hi). 
- **Commutative:** a∗b = b∗a. **Associative:** (a∗b)∗c = a∗(b∗c).
- **Identity e:** a∗e = e∗a = a. **Inverse a⁻¹:** a∗a⁻¹ = e.
- **Idempotent:** a∗a = a.

### Counting binary operations on n-element set
- **Total:** n^(n²).
- **Commutative:** **n^(n(n+1)/2)** (diagonal + upper triangle free).
- **With identity element (fixed e):** n^(n² − 2n + 1) = n^((n−1)²).
- 2-element set: 16 total, 8 commutative.

### Operation ke examples
- **Subtraction** N par: closed nahi; Z par closed, **na commutative na associative**. **Division** Z par closed nahi.
- **String concatenation:** associative, **non-commutative**. **Matrix multiplication:** associative, non-commutative. **Composition of functions:** associative.
- **a ∗ b = a** (left projection): associative, non-commutative. **a ∗ b = |a − b|**: commutative, **non-associative**.
- **a ∗ b = a + b + ab:** associative, commutative, identity 0.
- **Exponent a^b:** non-commutative, non-associative.

## 2. Hierarchy
```
Magma (closure) ⊃ Semigroup (+associative) ⊃ Monoid (+identity) ⊃ Group (+inverse) ⊃ Abelian group (+commutative)
```
| Structure | Closure | Associative | Identity | Inverse | Commutative |
|---|---|---|---|---|---|
| Groupoid/Magma | ✓ | | | | |
| **Semigroup** | ✓ | ✓ | | | |
| **Monoid** | ✓ | ✓ | ✓ | | |
| **Group** | ✓ | ✓ | ✓ | ✓ | |
| **Abelian group** | ✓ | ✓ | ✓ | ✓ | ✓ |

**Examples:** (N, +) semigroup (no 0) / (N ∪ {0}, +) monoid; (Z, +) abelian group; (Z, ·) monoid (not group); (Q\{0}, ·) abelian group; (Σ\*, concatenation) monoid (ε identity); (Mₙ(R), ×) monoid; **(GL(n), ×) non-abelian group.**

## 3. Group

**(G, ∗)** group: **closure, associativity, identity, inverse.** **Order |G|** = elements ki sankhya. **Abelian** = commutative.

### Basic properties
- **Identity unique**, **inverse unique**.
- **(a⁻¹)⁻¹ = a**, **(ab)⁻¹ = b⁻¹a⁻¹.**
- **Cancellation:** ab = ac ⇒ b = c. **Cayley table = Latin square** (har row/column me har element ek baar).
- **Agar har element apna hi inverse (a² = e ∀a) ⇒ G abelian.**
- **Order of element a:** chhota n>0 with aⁿ = e. **Identity ka order 1.**

### Standard groups
| Group | Order | Note |
|---|---|---|
| **(Zₙ, +ₙ)** | n | Cyclic, abelian |
| **(Zₙ\*, ×ₙ)** | φ(n) | Units mod n (gcd(a,n) = 1) |
| **(Z_p\{0}, ×_p)** (p prime) | p − 1 | Cyclic |
| **Sₙ (symmetric)** | **n!** | Non-abelian (n ≥ 3) |
| **Dihedral Dₙ** | 2n | Symmetries of n-gon |
| **Klein 4-group V₄** | 4 | Abelian, **non-cyclic**, har element order 2 |
| **(R, +), (R\{0}, ×)** | ∞ | Abelian |

**Example (Z₅\*):** {1,2,3,4} under ×₅: 2² = 4, 2³ = 3, 2⁴ = 1 ⇒ order 4, **cyclic (generator 2)**; **inverse of 2 = 3.**
**Example ({1,2,3,4,5,6} mod 7):** group of order 6.
**Z₈\*** = {1,3,5,7}: har element order 2 ⇒ **Klein 4-group (non-cyclic).**

## 4. Subgroup

**H ⊆ G** jo khud group under same operation.
**Subgroup test:** H ≠ ∅ aur **a, b ∈ H ⇒ ab⁻¹ ∈ H** (one-step test). Finite H: closure kaafi.
- **Trivial subgroups:** {e} aur G.
- **Intersection of subgroups subgroup hai; union generally nahi** (union subgroup ⟺ ek doosre me contained).
- **Center Z(G)** = {a : ax = xa ∀x} subgroup.
- **Cyclic subgroup ⟨a⟩ = {aⁿ}**, order = order of a.

### Lagrange's Theorem (most important)
> **H ≤ G, G finite ⇒ |H| divides |G|.**  **Index [G:H] = |G|/|H|.**
- **Element ka order group ke order ko divide karta hai.**
- **Prime order group ⇒ cyclic** (aur sirf trivial subgroups).
- **Converse galat:** order 12 group A₄ me order 6 ka subgroup nahi.
- **Order 6 group me subgroups ke possible orders: 1, 2, 3, 6.**
**Example:** |G| = 30, |H| = 7? **Nahi** (7 ∤ 30). |G| = 12: subgroup orders possible {1, 2, 3, 4, 6, 12}.
**Kitne groups of order n (up to isomorphism):** order 4: **2** (Z₄, V₄); order 6: 2 (Z₆, S₃); order p: 1; **p²: 2 (both abelian)**; order 8: 5.

## 5. Cyclic Group
**G = ⟨g⟩ = {gⁿ}**, ek **generator** se. **Har cyclic group abelian**; **subgroup of cyclic is cyclic.**
- **Cyclic group of order n:** **φ(n) generators**; **har divisor d of n ke liye ek unique subgroup of order d.**
- **Zₙ generators:** elements k jahan **gcd(k, n) = 1**. Z₁₀: {1,3,7,9} ⇒ φ(10) = 4.
- **Element a ka order in Zₙ = n / gcd(a, n).**
- **Cyclic group ke isomorphic Zₙ.**
**Example:** Z₁₂: element 8 ka order = 12/gcd(8,12) = 12/4 = **3**. Subgroups: orders 1,2,3,4,6,12 (6 subgroups). **Generators φ(12) = 4** (1,5,7,11).

## 6. Homomorphism, Isomorphism, Normal subgroup
- **Homomorphism φ : G → H:** φ(ab) = φ(a)φ(b). **φ(e) = e, φ(a⁻¹) = φ(a)⁻¹.** **Kernel** = {a : φ(a) = e} (normal subgroup). **Isomorphism** = bijective homomorphism.
- **Normal subgroup N ⊴ G:** gN = Ng ∀g (ya gNg⁻¹ = N). **Index 2 subgroup normal.** Quotient group G/N. **First isomorphism theorem: G/ker φ ≅ image φ.**
- **Cosets:** gH = {gh}; **saare cosets same size |H|**, disjoint, G ko partition karte ⇒ Lagrange.
- **Cayley's theorem:** har group kisi symmetric group ka subgroup.

## 7. Permutation groups (Sₙ)
Cycle notation (1 2 3)(4 5). **Order of a permutation = lcm(cycle lengths).** **Transposition** = 2-cycle; **even/odd**; **Aₙ (alternating)** = even permutations, order n!/2.
**Example:** S₅ me (1 2 3)(4 5) ka order = lcm(3,2) = **6.**

## 8. Ring aur Field (short)
- **Ring (R, +, ·):** (R, +) abelian group; (R, ·) **semigroup (associative)**; **distributive** (a(b+c) = ab + ac). **Commutative ring, ring with unity.**
- **Integral domain:** commutative, unity, **no zero divisors**. **Field:** commutative ring with unity jisme **har non-zero element ka multiplicative inverse** (F\{0}, ·) abelian group.
- **Zₙ field ⟺ n prime.** **Zₙ integral domain ⟺ n prime.** Z (integers) integral domain, not field. Q, R, C fields. **Finite integral domain field hota hai.**
- **Characteristic** of field prime.
- **Polynomials over field** (GATE: polynomial roots, degree).

## 9. Problem patterns
1. **Kya (S, ∗) group / semigroup/ monoid** — properties check (closure pehle).
2. **Order of element / group; generators / subgroups count** (cyclic).
3. **Lagrange se possible subgroup orders.**
4. **Identity/inverse nikaalo** given operation (a∗b = a+b−ab, etc.).
5. **Operation counting** (commutative operations).
6. **Ring/field statements** (Zₙ).

**Example (identity & inverse):** a ∗ b = a + b + 1 on Z: identity: a ∗ e = a ⇒ e = −1; inverse of a: a + a′ + 1 = −1 ⇒ a′ = −a − 2. Group? closed, associative ✓, identity −1, inverse ✓ ⇒ **abelian group.**
**Example:** (Z, a∗b = a − b): identity? a − e = a ⇒ e = 0 but e − a = a fails ⇒ no identity ⇒ not group.

## 10. Quick Revision
- Group: closure, assoc, identity, inverse; abelian + commutative.
- Commutative operations on n-set n^(n(n+1)/2); total n^(n²).
- Lagrange: |H| divides |G|; element order | |G|; prime order ⇒ cyclic.
- Cyclic Zₙ: φ(n) generators; subgroup for each divisor; order of a = n/gcd(a,n).
- Sₙ order n!; permutation order = lcm cycle lengths.
- Zₙ field ⟺ n prime; Zₙ\* order φ(n).
- Every element self-inverse ⇒ abelian.

### Practice
1. Z₁₈ generators kitne? *(φ(18) = 6)*
2. |G| = 15, subgroup order 4 possible? *(Nahi)*
3. Z₉\* ka order aur cyclic? *(φ(9) = 6, cyclic)*
4. 3 elements par commutative binary operations? *(3⁶ = 729)*
