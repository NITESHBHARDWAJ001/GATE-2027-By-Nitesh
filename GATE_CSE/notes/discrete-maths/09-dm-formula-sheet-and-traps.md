# Discrete Mathematics: Formula Sheet, Tables aur GATE Traps
<!-- topics: discrete-mathematics-set-theory-algebra/relations, discrete-mathematics-set-theory-algebra/group-theory, discrete-mathematics-graph-theory/graph-connectivity, discrete-mathematics-combinatory/combinatory, discrete-mathematics-mathematical-logic/propositional-logic -->

## 1. Formula Sheet

### Logic
- p → q ≡ ¬p ∨ q ≡ ¬q → ¬p; ¬(p → q) ≡ p ∧ ¬q; p ↔ q ≡ (p→q)∧(q→p).
- False only when (T→F). n vars: 2ⁿ rows; 2^(2ⁿ) functions.
- ¬∀ = ∃¬; ¬∃ = ∀¬. ∀ with →; ∃ with ∧. ∃∀ ⇒ ∀∃.

### Sets / Relations / Functions
- |P(A)| = 2ⁿ; |A×B| = mn; |A∪B| = |A|+|B|−|A∩B|.
- Relations on n-set: total 2^(n²); reflexive 2^(n²−n); symmetric 2^(n(n+1)/2); antisymmetric 2ⁿ·3^(n(n−1)/2); asymmetric 3^(n(n−1)/2); equivalence = Bell (1,2,5,15,52); total orders n!.
- Equivalence class size k ⇒ k² pairs. Poset: refl+antisym+trans. Lattice: lub & glb; (N,|): LCM/GCD; Boolean algebra 2ⁿ.
- Functions nᵐ; injective P(n,m); bijections n!; onto Σ(−1)ᵏC(n,k)(n−k)ᵐ. g∘f inj ⇒ f inj; g∘f onto ⇒ g onto.

### Groups
- Lagrange |H| | |G|; element order | |G|; prime order ⇒ cyclic.
- Cyclic Zₙ: φ(n) generators; order of a = n/gcd(a,n). |Sₙ| = n!; Zₙ\* order φ(n).
- Commutative operations n^(n(n+1)/2); total n^(n²).
- Zₙ field ⟺ n prime.

### Graph
- Σdeg = 2E; Kₙ n(n−1)/2; tree n−1; Cayley nⁿ⁻²; labeled graphs 2^(n(n−1)/2).
- Euler circuit: all even; path: 2 odd. Hamilton cycles in Kₙ (n−1)!/2; Dirac δ ≥ n/2.
- Planar: V − E + F = 2; E ≤ 3V − 6 (bipartite 2V − 4); K₅, K₃,₃ non-planar.
- χ(Kₙ)=n; bipartite 2; planar ≤ 4; ≤ Δ+1. Perfect matchings K₂ₙ (2n−1)!!. α + β = n.
- Connected guarantee edges > C(n−1,2).

### Combinatorics
- P(n,r), C(n,r), n!/Πnᵢ!, circular (n−1)!.
- Identical→distinct C(n+k−1,k−1); positive C(n−1,k−1). Onto k!S(n,k).
- Derangements 0,1,2,9,44,265; Dₙ=(n−1)(Dₙ₋₁+Dₙ₋₂). Catalan C(2n,n)/(n+1): 1,1,2,5,14,42.
- Pigeonhole ⌈N/k⌉.

### Recurrence / number theory
- Char eq: distinct roots Ar₁ⁿ+Br₂ⁿ; repeated (A+Bn)rⁿ. Fibonacci GF x/(1−x−x²); 1/(1−x)ᵏ coeff C(n+k−1,k−1).
- gcd·lcm = ab; d(n)=Π(eᵢ+1); φ(n)=nΠ(1−1/p); trailing zeros Σ⌊n/5ᵏ⌋.
- Inverse iff gcd=1; Fermat a^(p−1)≡1; Euler a^φ(n)≡1; Wilson (p−1)!≡−1; CRT unique mod product.

## 2. Comparison Tables

| Pair | Fark |
|---|---|
| Converse / Contrapositive | Not equivalent / equivalent |
| Tautology / Satisfiable | Always true / some true |
| Relation types | Reflexive ≠ irreflexive; symmetric & antisymmetric dono possible |
| Equivalence / Partial order | Sym vs antisym |
| Semigroup / Monoid / Group | +identity / +inverse |
| Euler / Hamilton | Edges once / vertices once |
| Path / Trail / Walk | No repeat vertex / no repeat edge / any |
| Permutation / Combination | Ordered / unordered |
| Strong / Weak induction | All previous / only previous |

## 3. Top 25 Traps
1. Implication false sirf T→F.
2. Converse aur inverse equivalent nahi.
3. ∀ ke saath ∧ / ∃ ke saath → galat.
4. ¬∀x P = ∃x ¬P (not "koi nahi").
5. ∀x∃y ≠ ∃y∀x.
6. Symmetric aur antisymmetric dono ho sakte hain.
7. Antisymmetric count 2ⁿ·3^(n(n−1)/2).
8. Equivalence = partition; class k ⇒ k² pairs.
9. Hasse diagram: loops/transitive edges nahi.
10. Greatest ⇒ maximal, ulta nahi.
11. Finite same-size: inj ⟺ surj.
12. g∘f onto ⇒ g onto (f nahi).
13. Lagrange converse galat.
14. Cyclic group generators φ(n).
15. Subgroup union subgroup nahi.
16. Commutative operations ≠ total operations.
17. Handshaking; odd-degree vertices even.
18. Havel–Hakimi negative ⇒ not graphic.
19. Planar E ≤ 3V − 6; bipartite 2V − 4.
20. K₅ (not K₄) non-planar; Kₙ planar iff n ≤ 4.
21. Euler circuit all even degree; Hamilton (n−1)!/2 cycles.
22. Circular (n−1)!; reflection /2.
23. Stars & bars: positive vs non-negative.
24. Derangement recurrence, not n!/e rounding.
25. Modular inverse needs gcd = 1.

## 4. GATE strategy (Discrete)
1. **Logic:** truth table ya counter-model; translation rules yaad.
2. **Relations/functions:** definition se test; counting formulas.
3. **Groups:** properties order me check (closure → assoc → identity → inverse); Lagrange.
4. **Graphs:** definitions + formulas; small example draw.
5. **Counting:** case analysis, complement, I-E; recurrence banao.
6. **Number theory:** Fermat/Euler/cycles.

## 5. Practice order (web app)
Subjects → Discrete Mathematics: **Combinatorics/Counting → Graph Theory → Propositional & First-order Logic → Set Theory/Relations → Groups/Lattices → Functions → Recurrence/GF/Number theory**.
