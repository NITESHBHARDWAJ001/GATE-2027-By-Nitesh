# TOC: Master Tables, Closure Chart, Traps aur GATE Strategy
<!-- topics: theory-of-computation/closure-property, theory-of-computation/decidability, theory-of-computation/regular-language, theory-of-computation/context-free-language, theory-of-computation/identify-class-language -->

## 1. Hierarchy ek nazar me
**Regular ⊂ DCFL ⊂ CFL ⊂ CSL ⊂ Recursive ⊂ RE**

| Class | Machine | Grammar | Memory |
|---|---|---|---|
| Regular | DFA/NFA | Right-linear | Finite |
| DCFL | DPDA | LR(k) | One stack (det.) |
| CFL | NPDA | CFG | One stack |
| CSL | LBA | CSG | Tape ≤ input |
| Recursive | Halting TM | - | Infinite |
| RE | TM | Unrestricted | Infinite (may loop) |

## 2. Closure table (sabse zyada poochha)

| | Regular | DCFL | CFL | CSL | Recursive | RE |
|---|---|---|---|---|---|---|
| Union | ✓ | ✗ | ✓ | ✓ | ✓ | ✓ |
| Intersection | ✓ | ✗ | ✗ | ✓ | ✓ | ✓ |
| Complement | ✓ | ✓ | ✗ | ✓ | ✓ | ✗ |
| Concatenation | ✓ | ✗ | ✓ | ✓ | ✓ | ✓ |
| Kleene star | ✓ | ✗ | ✓ | ✓ | ✓ | ✓ |
| Reversal | ✓ | ✗ | ✓ | ✓ | ✓ | ✓ |
| Intersection with Regular | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |
| Homomorphism | ✓ | ✗ | ✓ | ✗ | ✗ | ✓ |
| Inverse homomorphism | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |

## 3. Decision problems chart

| | Regular | CFL | Recursive/RE (TM) |
|---|---|---|---|
| Membership | D | D | Undecidable (RE) |
| Emptiness | D | D | U |
| Finiteness | D | D | U |
| Equivalence | D | **U** | U |
| Universality | D | **U** | U |
| Ambiguity | - | **U** | - |
| Regularity of language | - | **U** | U |

## 4. Standard languages: kaunsi class?

| Language | Class |
|---|---|
| a\*b\*, ends with 01, mod-k counts | Regular |
| {aⁿbⁿ} | DCFL |
| {wcwᴿ}, balanced parentheses, n_a = n_b | DCFL |
| {wwᴿ}, palindromes, {aⁱbʲcᵏ : i=j or j=k} | CFL (not DCFL) |
| {aⁿbⁿcⁿ}, {ww}, {aⁿ²}, {a^(2ⁿ)}, {a^prime} | CSL (not CFL) |
| A_TM, HALT | RE (not recursive) |
| Complement of A_TM, E_TM | Not RE |

## 5. Counting formulas
- Ends with w (|w|=n): n+1 states. Starts with w: n+2. Contains w: n+1. Exactly n length: n+2. ≥ n: n+1. Mod k: k. Product of counters a,b: ab.
- NFA n states → DFA ≤ 2ⁿ.
- Product DFA: |Q₁||Q₂|.
- Length k, |Σ|=m strings: mᵏ.
- CNF: 2n−1 derivation steps; GNF: n steps.
- Minimal DFA states = Myhill–Nerode classes.

## 6. Pumping Lemma templates
**Regular:** ∃p: |w|≥p ⇒ w=xyz, |xy|≤p, |y|≥1, xyⁱz∈L ∀i≥0.
**CFL:** ∃p: |z|≥p ⇒ z=uvwxy, |vwx|≤p, |vx|≥1, uvⁱwxⁱy∈L ∀i≥0.
Sirf **necessary** conditions. Non-regularity: aᵖbᵖ, non-CFL: aᵖbᵖcᵖ.

## 7. Top 20 Traps
1. ∅ ≠ {ε}.
2. DFA complement = swap final; NFA me galat.
3. Pumping lemma satisfy ⇏ regular.
4. (a+b)\* ≠ a\* + b\*.
5. n_a = n_b non-regular; {ww} not CFL, {wwᴿ} CFL.
6. Regular subset regular nahi.
7. CFL intersection/complement closed nahi; ∩ Regular closed.
8. DCFL complement closed, union nahi.
9. NPDA > DPDA; NFA = DFA; NTM = DTM.
10. Ambiguity: language inherently ambiguous vs grammar.
11. Simplification order: ε → unit → useless.
12. CFG equivalence, ambiguity, universality undecidable.
13. L & Lᶜ RE ⇒ recursive.
14. RE complement me closed nahi; recursive hai.
15. Rice: semantic + non-trivial ⇒ undecidable; syntactic (states count) decidable.
16. A ≤ B: B easy ⇒ A easy; A hard ⇒ B hard (direction!).
17. "Halts in k steps" decidable; "halts" undecidable.
18. Languages uncountable; TMs countable.
19. CSL ⊂ Recursive; LBA membership decidable, emptiness undecidable.
20. Finite language hamesha regular; unary CFL regular.

## 8. GATE strategy (TOC)
1. **Language ki class**: bounded counting → regular; ek matching → CFL; do counters/copy → CSL.
2. **DFA design**: state ka meaning likho; minimum states ke liye counting rules.
3. **Closure/decidability**: table se seedha answer; specific example (aⁿbⁿ ∩ ...) se justify.
4. **Reduction/Rice**: direction aur "semantic vs syntactic" check.
5. **Grammar**: string derive karke language guess; CNF/GNF counts.
6. Time: TOC sawal mostly concept-based, table yaad ho to tez.

## 9. Practice order (web app)
Subjects → Theory of Computation: **Finite Automata → Regular Language/Expression → Minimal DFA → CFL → PDA → Identify Class → Decidability → Closure Property**.
