# Finite Automata: DFA, NFA, ε-NFA, Conversion aur Minimization
<!-- topics: theory-of-computation/finite-automata, theory-of-computation/minimal-state-automata, theory-of-computation/non-determinism, theory-of-computation/number-of-states, theory-of-computation/finite-state-machines -->

## 1. Basics: alphabet, string, language

- **Alphabet Σ**: finite set of symbols (Σ = {0,1}).
- **String**: symbols ka finite sequence. **|w|** = length. **ε (epsilon)** = empty string (length 0).
- **Σ\*** = Σ ke sab strings (ε samet). **Σ⁺** = Σ\* − {ε}.
- **Language L** = Σ\* ka koi bhi subset. |Σ| = k ho to length n ke strings = **kⁿ**; length ≤ n ke strings = (kⁿ⁺¹ − 1)/(k − 1).
- Operations: **concatenation** (L₁L₂), **union**, **Kleene star L\*** (0 ya zyada baar), **L⁺**, **complement**, **reversal Lᴿ**.
- ∅ (empty language, koi string nahi) ≠ {ε} (sirf empty string). ∅\* = {ε}. L·∅ = ∅. L·{ε} = L.

**Chomsky Hierarchy (preview):** Regular ⊂ CFL ⊂ CSL ⊂ Recursive ⊂ RE. Regular = **finite memory** (DFA).

## 2. DFA (Deterministic Finite Automaton)

**5-tuple M = (Q, Σ, δ, q₀, F):**
- Q = states ka finite set, Σ = alphabet, **δ: Q × Σ → Q** (total function: har state har symbol par **exactly ek** transition), q₀ start, F ⊆ Q accepting states.

**Acceptance:** input padhkar final state ∈ F ho to accept. **L(M)** = accepted strings.

### DFA design ka tarika (GATE ke liye sabse zaroori skill)
Har state = "ab tak jo dekha uska **summary**". State ka meaning likho.

**Example 1 — strings jo "01" par end hoti hain:** states = last-seen suffix ka progress:
- q₀ (kuch nahi/0 se pehle), q₁ (last symbol 0), q₂ (last two = 01, accept).
- q₀: 0→q₁, 1→q₀. q₁: 0→q₁, 1→q₂. q₂: 0→q₁, 1→q₀. **3 states.**

**Example 2 — even number of 0s:** 2 states (even, odd). 0 par toggle, 1 par same.

**Example 3 — binary number 3 se divisible:** states = remainder mod 3 (0,1,2). Transition: r → (2r + bit) mod 3. **3 states**. Generalization: "n se divisible" = **n states**.

**Example 4 — length divisible by k:** k states (ring).

**Example 5 — "contains substring 101":** 4 states (progress 0,1,10,101 with 101 trap accept).

### Minimum states ke counting rules (GATE favourite)
- **Strings ending with a fixed string w (length n):** **n + 1** states.
- **Strings starting with w:** **n + 2** states (dead state chahiye).
- **Contains w as substring:** **n + 1** states.
- **|w| = exactly n:** **n + 2** (dead state). **|w| ≥ n:** n + 1. **|w| ≤ n:** n + 2.
- **|w| mod k = r:** **k** states.
- **No. of 0s mod a AND no. of 1s mod b:** **a × b** states (product).
- **n₀(w) ≥ k ya = k:** k+1 (≥) / k+2 (=).

## 3. NFA (Nondeterministic Finite Automaton)

**δ: Q × Σ → 2^Q** (ek state se ek symbol par **0, 1 ya kai** next states). Ek input ke kai computation paths. **Accept** agar **koi ek** path final state par pahunche.

**ε-NFA:** ε-transitions (bina input ke move). **ε-closure(q)** = q se sirf ε se pahunch sakne wale sab states.

### Power
**DFA ≡ NFA ≡ ε-NFA** (sab **regular languages** hi accept karte hain). NFA design **aasan** (kam states).

**Example (NFA):** "third symbol from the end is 1": NFA me **4 states**, DFA me **2³ = 8 states** (exponential blow-up).

## 4. NFA → DFA (Subset Construction)

DFA ka har state = NFA states ka **subset**. Start = ε-closure({q₀}). Transition: T(S, a) = ε-closure(∪ δ(q,a) for q ∈ S). **Accepting** = koi bhi NFA final state wala subset.

**Worst case:** n-state NFA → **2ⁿ** state DFA (sab reachable ho to). Practically reachable subsets hi banaao.

**Example:** NFA for "ends with 01": q₀ –0,1→ q₀; q₀ –0→ q₁; q₁ –1→ q₂ (final).
- {q₀} –0→ {q₀,q₁}; {q₀} –1→ {q₀}
- {q₀,q₁} –0→ {q₀,q₁}; {q₀,q₁} –1→ {q₀,q₂} (**final**)
- {q₀,q₂} –0→ {q₀,q₁}; {q₀,q₂} –1→ {q₀}
Sirf **3 reachable subsets** → 3-state DFA (2³ = 8 tak nahi gaya).

**NFA → DFA ke baad states ki max/min count** = question me poochhi jaati hai: upper bound 2ⁿ; kabhi NFA states = DFA states.

## 5. ε-NFA → NFA
ε-closure use karke: δ′(q,a) = ε-closure(δ(ε-closure(q), a)). Final states = jinka ε-closure me final ho.

## 6. DFA Minimization (Table-filling / Partition)

Equivalent states merge karke **minimum states** wala **unique** DFA.

**Steps:**
1. **Unreachable states hataao.**
2. **Partition:** P₀ = {F, Q − F}. Refine: do states ko alag karo agar kisi symbol par unke next states alag blocks me jayein. Repeat jab tak stable.
3. Har block = ek state in minimal DFA.

**Table-filling:** pair (p,q) mark distinguishable agar ek final ek non-final; phir agar koi symbol par (δ(p,a), δ(q,a)) marked ho.

**Minimal DFA unique** (up to renaming). **Myhill–Nerode:** minimal DFA ke states = **Myhill–Nerode equivalence classes** ki count.

**Example:** DFA me states A,B,C,D,E, final = {E}. P₀ = {A,B,C,D | E}. Agar A aur B dono ka `0` par next state {A,B,C,D} block me aur `1` par E, jabki C, D ka `1` par bhi E hi ho to kisi symbol par alag block nahi dikha → equivalent, merge. Jab tak koi block toote nahi, tab tak refine.

**Complement of DFA:** final aur non-final swap (**DFA complete honi chahiye**). NFA me swap galat.

## 7. Moore aur Mealy machines
- **Moore**: output **state** par. **Mealy**: output **transition** par. Mealy me output pehle milta (n input → n output); Moore me n+1 output (initial ke saath).
- **Equivalent** hain (conversion possible). Moore → Mealy: n states same; Mealy → Moore: states badh sakte hain (max |Q|·|Δ|).
- Applications: sequence detectors, binary adders, counters.

**Example (Mealy, 1's complement / serial adder):** carry state 0/1 → 2 states.

## 8. Standard results (yaad)
- Regular languages ki **finite automata** se pehchaan, **memory finite**.
- **Finite language hamesha regular.**
- Kisi DFA se accepted language **infinite** ⟺ start se accepting tak pahunch wale path me **cycle** hai.
- L(DFA) = ∅ ⟺ koi final state reachable nahi.
- **Equivalence** of two DFAs decidable; **emptiness, finiteness, membership** decidable.
- DFA ka number of states (n) par: agar accepted string length ≥ n hai to pumping (cycle).

## 9. Quick Revision
- DFA: total δ, ek path; NFA: subset; DFA ≡ NFA power.
- Ends with w (|w|=n): n+1; starts with w: n+2; mod k: k; product of two counters: a×b.
- NFA→DFA worst 2ⁿ.
- DFA complement = swap final/non-final.
- Min DFA unique; states = MN classes.
- Finite languages regular.

### Practice
1. Strings over {a,b} ending in "ab": min DFA states? *(3)*
2. Strings with length divisible by 3 AND even number of a's: states? *(3 × 2 = 6)*
3. n-state NFA ka DFA max kitne state? *(2ⁿ)*
4. L = {w : |w| ≥ 4} min DFA states? *(5)*
