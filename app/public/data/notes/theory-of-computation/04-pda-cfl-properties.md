# Pushdown Automata, DCFL, CFL Closure aur Pumping Lemma
<!-- topics: theory-of-computation/pushdown-automata, theory-of-computation/dpda, theory-of-computation/context-free-language, theory-of-computation/closure-property, theory-of-computation/medium -->

## 1. PDA (Pushdown Automaton)

**FA + Stack.** Stack unbounded memory deta hai (LIFO). Isliye aⁿbⁿ jaisi languages accept kar sakta hai (count stack me).

**7-tuple:** M = (Q, Σ, Γ, δ, q₀, Z₀, F).
- Γ = stack alphabet, Z₀ = stack ka initial symbol.
- **δ: Q × (Σ ∪ {ε}) × Γ → subsets of Q × Γ\*** (state, input (ya ε), stack top ke hisaab se: naya state aur stack top ko string se replace).

**Acceptance ke do tareeke (equivalent power):**
1. **Final state par** accept.
2. **Empty stack** par accept.
Dono ek doosre me convert ho sakte hain (NPDA ke liye).

**PDA banane ka idea (aⁿbⁿ):** a padhte hi stack me push A; b padhte hi pop A; end me stack khali (Z₀) → accept.

### Example PDAs
- **aⁿbⁿ:** push on a, pop on b (deterministic).
- **wwᴿ (even palindromes):** pehle half push, phir **non-deterministically guess middle**, baaki half se pop match. **Non-deterministic zaroori.**
- **aⁿbᵐcⁿ⁺ᵐ:** a par push, b par push, c par pop.
- **Equal a's and b's:** stack me majority symbol count (ya A aur B).
- **{aⁱbʲcᵏ : i = j ya j = k}:** NPDA (choose which to match); DPDA nahi.

## 2. DPDA vs NPDA (bahut important)

- **DPDA** = deterministic (har (state, input, stack top) ke liye ≤ 1 move; ε move aur input move me conflict nahi).
- **NPDA (CFL) DPDA se zyada powerful:** **DCFL ⊊ CFL.**
- **Deterministic CFLs (DCFL)** = wo languages jinhe DPDA (final state se) accept kare. **LR(k) grammar ⟺ DCFL** (LR(1) sab DCFL).

**DCFL me:** aⁿbⁿ, aⁿbⁿcᵐ, {wcwᴿ} (c marker middle), balanced parentheses.
**CFL par DCFL nahi:** **wwᴿ** (middle guess), {aⁿbⁿ} ∪ {aⁿb²ⁿ}, {aⁱbʲcᵏ : i=j ya j=k}, palindromes.

### Acceptance by empty stack aur DPDA
DPDA me **empty stack** acceptance = **prefix-free** languages hi. Isliye DPDA ko normally **final state** se define karte hain.

### DPDA ke closure
- **DCFL complement me closed hai** (DPDA ke final/non-final flip + care for infinite ε loops).
- **DCFL union me closed nahi**, **intersection me closed nahi**, concatenation/star me nahi.
- **DCFL ∩ Regular = DCFL.**

## 3. CFL ≡ PDA (NPDA)

CFG → PDA: stack me grammar simulate: start pe S push; top variable ho to production se replace (non-deterministically), terminal ho to input se match karke pop.
PDA → CFG: **triple construction [p X q]**, **grammar size polynomial**.

## 4. CFL: closure properties (yaad karne layak table)

| Operation | Regular | **CFL** | **DCFL** | Recursive | RE |
|---|---|---|---|---|---|
| Union | ✓ | ✓ | ✗ | ✓ | ✓ |
| Concatenation | ✓ | ✓ | ✗ | ✓ | ✓ |
| Kleene star | ✓ | ✓ | ✗ | ✓ | ✓ |
| Intersection | ✓ | **✗** | ✗ | ✓ | ✓ |
| **Complement** | ✓ | **✗** | **✓** | ✓ | **✗** |
| Reversal | ✓ | ✓ | ✗ | ✓ | ✓ |
| ∩ with Regular | ✓ | **✓** | ✓ | ✓ | ✓ |
| Difference (L − R, R regular) | ✓ | ✓ | ✓ | ✓ | ✓ |
| Homomorphism | ✓ | ✓ | ✗ | ✗ | ✓ |
| Inverse homomorphism | ✓ | ✓ | ✓ | ✓ | ✓ |
| Substitution | ✓ | ✓ | | | |

**Kyun CFL intersection me closed nahi:** L₁ = {aⁿbⁿcᵐ}, L₂ = {aᵐbⁿcⁿ} dono CFL; L₁ ∩ L₂ = {aⁿbⁿcⁿ} CFL nahi.
**Kyun complement me nahi:** agar hota to L₁ ∩ L₂ = (L₁ᶜ ∪ L₂ᶜ)ᶜ CFL hota (union closed) — contradiction.
**Important:** {aⁿbⁿcⁿ} ka **complement CFL hai** (par intersection closure nahi hone ka example).

**Recursive complement me closed, RE nahi.** RE union/intersection/concat/star me closed.

## 5. Pumping Lemma for CFL

L CFL ⇒ ∃ p s.t. har z ∈ L, |z| ≥ p ko **z = uvwxy**:
1. **|vwx| ≤ p**, 2. **|vx| ≥ 1**, 3. **∀ i ≥ 0: uvⁱwxⁱy ∈ L**.

(Regular ke mukable **do jagah pump**: v aur x.) Sirf **necessary**. Non-CFL prove karne me.

**Example: {aⁿbⁿcⁿ}:** z = aᵖbᵖcᵖ; |vwx| ≤ p ⇒ vwx teeno symbols nahi cover kar sakta (ya to a,b ya b,c). Pump karne par ek symbol ki count badhegi/ghategi, dusre nahi ⇒ ∉ L. **CFL nahi.**
**Non-CFL:** {aⁿbⁿcⁿ}, {ww}, {aⁿ²}, {a^(2ⁿ)}, {aⁿbᵐcⁿdᵐ}, {aᵖ : p prime}, {a^i b^j c^k : i < j < k}.

**Ogden's lemma** (stronger, marked positions).
**Unary CFL regular hai** (ek symbol wale CFL hamesha regular).

## 6. CFL ke decision problems

| Problem | CFL |
|---|---|
| Membership | **Decidable** (CYK O(n³)) |
| Emptiness | **Decidable** |
| Finiteness | **Decidable** |
| Equivalence of 2 CFGs | **Undecidable** |
| Universality (L(G) = Σ\*) | **Undecidable** |
| Ambiguity | **Undecidable** |
| Is L(G₁) ∩ L(G₂) = ∅? | **Undecidable** |
| Is L(G) regular? | **Undecidable** |
| Is L(G) a DCFL? | Undecidable (general) |

**DPDA ke liye equivalence decidable** (Sénizergues, advanced; GATE me kabhi nahi).

## 7. PDA ki capabilities (quick decision)
- **Ek stack** = ek counter jaisa nested matching.
- **Do stacks = Turing machine.** Isliye aⁿbⁿcⁿ jaisi languages ke liye 2 stacks.
- **PDA me epsilon transitions** aur **non-determinism** dono zaroori (NPDA).
- **Regular ⊂ DCFL ⊂ CFL.**

## 8. Language ki class quick chart

| Language | Class |
|---|---|
| aⁿbⁿ | DCFL |
| wcwᴿ | DCFL |
| wwᴿ | CFL (not DCFL) |
| {aⁿbⁿ} ∪ {aⁿb²ⁿ} | CFL, not DCFL |
| aⁿbⁿcⁿ | CSL (not CFL) |
| ww | CSL |
| {aⁿ : n prime} | CSL |
| Balanced parentheses | DCFL |
| {w : n_a = n_b} | DCFL |
| Palindromes over {a,b} | CFL not DCFL |

## Extra: Counting symbols in strings
- **{w : n_a(w) = n_b(w)}** regular **nahi** (unbounded counting) par **CFL** hai (stack me count). **n_a(w) mod k = r** type conditions **regular** (k states).
- **n_a = n_b = n_c** CFL nahi (CSL). **n_a(w) ≥ n_b(w) prefixwise** ⇒ Dyck-like CFL.
- **Example:** {w ∈ {a,b}* : n_a(w) mod 3 = 1} ⇒ 3-state DFA.

## 9. Quick Revision
- PDA = FA + stack; DPDA ≠ NPDA; DCFL ⊊ CFL.
- CFL: union/concat/star/reversal/∩Regular ✓; intersection/complement ✗.
- DCFL: complement ✓; union ✗.
- Pumping CFL: |vwx| ≤ p, |vx| ≥ 1.
- wwᴿ CFL not DCFL; wcwᴿ DCFL; ww, aⁿbⁿcⁿ not CFL.
- CFG: membership/emptiness/finiteness decidable; equivalence/ambiguity/universality undecidable.

### Practice
1. L = {aⁿbⁿ} ∪ {aⁿb²ⁿ}: DCFL? *(Nahi, CFL)*
2. L₁ CFL, L₂ regular: L₁ ∩ L₂? *(CFL)*
3. DCFL complement? *(Closed)*
4. {aⁿbⁿcⁿ} ka complement? *(CFL)*
