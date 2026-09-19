# Sets, Relations, Equivalence, Partial Orders (Posets) aur Lattices
<!-- topics: discrete-mathematics-set-theory-algebra/set-theory, discrete-mathematics-set-theory-algebra/relations, discrete-mathematics-set-theory-algebra/partial-order, discrete-mathematics-set-theory-algebra/lattice, discrete-mathematics-set-theory-algebra/countable-uncountable-set -->

# Part A: Sets

## 1. Basics
**Set** = distinct objects ka collection. **|A|** = cardinality. **∅** (empty), **U** (universal).
- **Subset A ⊆ B**, proper A ⊂ B. **Power set P(A)**: sab subsets, **|P(A)| = 2^|A|**. **A ⊆ B ⟹ |A| ≤ |B|.**
- **Union, intersection, difference (A − B), complement Aᶜ, symmetric difference A Δ B = (A − B) ∪ (B − A) = (A ∪ B) − (A ∩ B).**
- **Cartesian product A × B = {(a,b)}**, **|A × B| = |A|·|B|**. A × B ≠ B × A.
- **Number of subsets of size k = C(n,k).** **Total subsets 2ⁿ.**

### Laws
De Morgan: (A ∪ B)ᶜ = Aᶜ ∩ Bᶜ; (A ∩ B)ᶜ = Aᶜ ∪ Bᶜ. Distributive, absorption, idempotent.
**A Δ B = B Δ A, associative; A Δ A = ∅; A Δ ∅ = A.**

### Inclusion–Exclusion
- **|A ∪ B| = |A| + |B| − |A ∩ B|**
- **|A ∪ B ∪ C| = Σ|A| − Σ|A∩B| + |A∩B∩C|**
**Example:** 100 students: 60 cricket, 50 football, 20 dono. Kisi ek me: 60 + 50 − 20 = **90**; koi nahi = **10**.

### Multiset, partition
**Partition** of A: non-empty, pairwise disjoint subsets jinka union A. **Number of partitions (Bell numbers): 1, 2, 5, 15, 52, 203** (n = 1..6). **P(A) ke elements ki sankhya 2ⁿ.**

## 2. Countable aur Uncountable sets
- **Finite** ya **countably infinite** (N se bijection) = **countable**.
- **Countable:** N, Z, Q (rationals), N × N, finite strings over finite alphabet Σ\*, **sab TMs/programs**.
- **Uncountable:** R, [0,1], **P(N)**, sab infinite binary sequences, sab functions N → N.
- **Union/product of countable sets countable.** **Subset of countable set countable.**
- **Cantor's diagonal:** R uncountable; |P(A)| > |A|.
- **Cardinalities:** |N| = ℵ₀; |R| = 2^ℵ₀.

# Part B: Relations

## 3. Relation
**Relation R from A to B** = **A × B ka subset**. **R on A** = A × A ka subset. **Number of relations from A (m) to B (n) = 2^(mn)**; on n-set = **2^(n²)**.
**Matrix representation** (0/1), **digraph**.

### Properties (R on set A)

| Property | Definition | Matrix/digraph |
|---|---|---|
| **Reflexive** | ∀a: (a,a) ∈ R | Diagonal sab 1 (har node par self-loop) |
| **Irreflexive** | ∀a: (a,a) ∉ R | Diagonal sab 0 |
| **Symmetric** | (a,b) ∈ R ⇒ (b,a) ∈ R | Matrix symmetric |
| **Antisymmetric** | (a,b), (b,a) ∈ R ⇒ **a = b** | Do alag nodes ke beech dono taraf edge nahi |
| **Asymmetric** | (a,b) ∈ R ⇒ (b,a) ∉ R | Irreflexive + antisymmetric |
| **Transitive** | (a,b),(b,c) ∈ R ⇒ (a,c) ∈ R | |

> **Symmetric aur antisymmetric dono ho sakte hain** (jaise identity relation, ya ∅). **Neither** bhi ho sakta.

### Counting relations on n-element set (bahut poochha)
| Type | Count |
|---|---|
| **All** | 2^(n²) |
| **Reflexive** | **2^(n² − n)** |
| **Irreflexive** | 2^(n² − n) |
| **Symmetric** | **2^(n(n+1)/2)** |
| **Antisymmetric** | **2ⁿ · 3^(n(n−1)/2)** |
| **Asymmetric** | **3^(n(n−1)/2)** |
| **Reflexive + Symmetric** | 2^(n(n−1)/2) |
| **Equivalence** | **Bell(n)** (1, 2, 5, 15, 52) |
| **Partial orders (labeled)** | 1, 3, 19, 219 (n = 1..4) |
| **Total orders** | n! |
| **Transitive** | n=2: 13; n=3: 171 |

**Derivation (symmetric):** n diagonal entries free (n) + n(n−1)/2 pairs = n(n+1)/2 choices ⇒ 2^(that).
**Antisymmetric:** har diagonal free (2ⁿ), har off-diagonal pair {a,b} ke 3 options (none, a→b, b→a) ⇒ 3^(n(n−1)/2).

### Operations
- **Inverse R⁻¹**, **complement**, **union/intersection**.
- **Composition R∘S** = {(a,c) : ∃b (a,b) ∈ S, (b,c) ∈ R} (matrix product boolean).
- **Closure:** reflexive closure R ∪ Δ; symmetric closure R ∪ R⁻¹; **transitive closure R⁺ = R ∪ R² ∪ … ∪ Rⁿ** (**Warshall's algorithm O(n³)**). **Smallest** relation with the property containing R.
**Example:** R = {(1,2), (2,3)} on {1,2,3}: transitive closure adds (1,3). Reflexive closure adds (1,1),(2,2),(3,3).

## 4. Equivalence Relation
**Reflexive + Symmetric + Transitive.** A ko **equivalence classes (disjoint partition)** me todta. **Equivalence relations on A ⟷ partitions of A** (one-to-one).
- **Class [a] = {x : (a,x) ∈ R}.** Kisi do classes ya to same ya disjoint.
- **Number of classes** = partition ka size.
**Examples:** congruence mod n on Z (n classes), "same length strings", "same birthday".
**Not equivalence:** "≤" (not symmetric), "divides" (not symmetric), "≠" (not reflexive), "|a − b| ≤ 1" (not transitive).

**Example:** A = {1,2,3,4}, partition {{1,2},{3},{4}} ⇒ R = {(1,1),(1,2),(2,1),(2,2),(3,3),(4,4)} ⇒ **6 pairs** = 2² + 1 + 1. (Class size k ⇒ k² pairs.)

## 5. Partial Order (Poset)
**Reflexive + Antisymmetric + Transitive.** (A, ≤) = **poset**. Examples: (Z, ≤), (N, |) divisibility, (P(A), ⊆).
- **Comparable:** a ≤ b ya b ≤ a. **Total order (chain):** har pair comparable. **Antichain:** koi do comparable nahi.
- **Strict order (<):** irreflexive + transitive (asymmetric).

### Hasse Diagram
Poset ka **simplified graph**: **self-loops aur transitive edges hata do**, direction **upar ki taraf** (arrows nahi). Sirf **covering relation** (a < b aur beech me koi c nahi).
**Example:** Divisors of 12 under |: 1 → 2 → 4 → 12; 1 → 3 → 6 → 12; 2 → 6. **Edges = 7** (1-2, 1-3, 2-4, 2-6, 3-6, 4-12, 6-12).
**Divisors of n = p^a·q^b : (a+1)(b+1) elements; grid lattice.**

### Terms
- **Maximal/Minimal element:** koi bada/chhota nahi. **Greatest (maximum)/Least:** sab se bada/chhota (unique). Greatest ⇒ maximal, ulta nahi.
- **Upper bound, lower bound**, **lub (supremum), glb (infimum)** of subset.
- **Chain length, height.** **Dilworth:** min chains cover = max antichain size.
- **Topological sort / linear extension:** poset ko total order me (partial order ke saath compatible). **Kisi poset ke total orders ki count** = linear extensions.
**Example:** S = {a,b,c}, order: a < b, a < c only. Total orders: a pehle, phir (b,c) ya (c,b) = **2**.
- **Well-order:** har non-empty subset ka least element (N ≤ well-ordered; Z, R nahi).
- **Dense/complement etc.**

### Dual poset, product order
(A, ≤) ka dual (A, ≥). **Product:** (a,b) ≤ (c,d) iff a ≤ c aur b ≤ d.

# Part C: Lattices

## 6. Lattice
**Poset jisme har pair {a,b} ka lub (join a ∨ b) aur glb (meet a ∧ b) exist ho.**
- **Examples:** (N, |): join = **LCM**, meet = **GCD**. (P(A), ⊆): join = ∪, meet = ∩. (R, ≤): max/min. **Any chain lattice.**
- **Not lattice:** koi pair jiska lub/glb na ho (do maximal elements bina common upper bound) — Hasse diagram me **do elements jinke upar ek unique lowest common upper bound na ho**.
- **Bounded lattice:** greatest (1, top) aur least (0, bottom) hain. **Finite lattice hamesha bounded.**
- **Complement:** a ∨ a′ = 1, a ∧ a′ = 0. **Complemented lattice:** har element ka complement.
- **Distributive lattice:** a ∧ (b ∨ c) = (a ∧ b) ∨ (a ∧ c). **Complements distributive me unique** (agar exist). Non-distributive: **M₃ (diamond)** aur **N₅ (pentagon)** — koi lattice distributive ⟺ na M₃ na N₅ sublattice.
- **Boolean algebra = complemented distributive lattice** (finite ⟹ **2ⁿ elements**, P(A) jaisa). **Number of elements of a finite Boolean algebra = 2ⁿ.**
- **Sublattice, lattice homomorphism, isomorphic.**
- **Divisors of n under | lattice**; **complemented iff n square-free**; **Boolean algebra iff n square-free** (30 = 2·3·5 ⇒ 8 divisors, Boolean).

### Lattice identities
Idempotent (a ∨ a = a), commutative, associative, **absorption** (a ∨ (a ∧ b) = a).
**Consistency:** a ≤ b ⟺ a ∨ b = b ⟺ a ∧ b = a.

**Example:** Hasse: 0 < a, b < 1 (diamond): lattice, complemented (a′ = b), distributive ✓ (4 elements Boolean algebra 2²). Diamond with 3 middle elements (M₃) non-distributive.

## 7. Problem patterns
1. **Kya relation reflexive/symmetric/…** — set diya ho, check.
2. **Counting relations** (formulas).
3. **Equivalence classes ki count / relation ke pairs.**
4. **Hasse diagram** edges/max chain/antichain.
5. **Lattice hai ya nahi**, distributive/complemented, complements.
6. **Transitive closure.**
7. **Countability** statements.

## 8. Quick Revision
- |P(A)| = 2ⁿ; |A×B| = mn; |A∪B| = |A|+|B|−|A∩B|.
- Reflexive relations 2^(n²−n); symmetric 2^(n(n+1)/2); antisymmetric 2ⁿ3^(n(n−1)/2); equivalence = Bell.
- Equivalence = partition; class size k ⇒ k² pairs.
- Poset: refl + antisym + trans; Hasse hides loops/transitive edges.
- Lattice: lub & glb exist; (N,|): LCM/GCD; Boolean algebra 2ⁿ elements.
- Countable: N, Z, Q, Σ\*; Uncountable: R, P(N).

### Practice
1. n = 3: reflexive relations? *(2⁶ = 64)*
2. Symmetric relations on 3-element set? *(2⁶ = 64)*
3. Equivalence relations on {1,2,3}? *(5)*
4. Divisors of 30 under divisibility ek Boolean algebra? *(Haan, 8 elements)*
