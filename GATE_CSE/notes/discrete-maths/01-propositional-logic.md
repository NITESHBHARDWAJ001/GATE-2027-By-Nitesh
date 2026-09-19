# Propositional Logic: Connectives, Equivalences, Normal Forms, Inference
<!-- topics: discrete-mathematics-mathematical-logic/propositional-logic, discrete-mathematics-mathematical-logic/logical-reasoning -->

## 1. Proposition kya hai?

**Proposition** = aisa declarative statement jo **ya to true ya false** ho (dono nahi).
- "2 + 2 = 4" (T), "Delhi India ki capital hai" (T), "5 < 3" (F) — propositions.
- "x + 1 = 5" (x pata nahi), "Kya tum aaoge?" (sawal), "Bahar jao!" (command) — **propositions nahi**.

Variables: p, q, r ... (true/false). **Truth value T/F (1/0)**.

## 2. Logical Connectives

| Symbol | Naam | Read | True kab? |
|---|---|---|---|
| ¬p | Negation | not p | p false ho |
| p ∧ q | Conjunction | p and q | **dono true** |
| p ∨ q | Disjunction | p or q | **kam se kam ek true** |
| p ⊕ q | XOR | exactly one | alag values |
| **p → q** | **Implication** | if p then q | **sirf p = T, q = F par false** |
| **p ↔ q** | Biconditional | p iff q | **dono same value** |
| p ↑ q | NAND | | ¬(p ∧ q) |
| p ↓ q | NOR | | ¬(p ∨ q) |

### Truth table
| p | q | p∧q | p∨q | p→q | p↔q | p⊕q |
|---|---|---|---|---|---|---|
| T | T | T | T | **T** | T | F |
| T | F | F | T | **F** | F | T |
| F | T | F | T | **T** | F | T |
| F | F | F | F | **T** | T | F |

> **Yaad rakho:** **p → q sirf tab false jab p true aur q false.** p false ho to implication **vacuously true** (jaise "agar main uda to paisa doon" — main udta nahi, isliye promise nahi tuta).

**n variables ka truth table = 2ⁿ rows.**
**Precedence:** ¬ > ∧ > ∨ > → > ↔.

## 3. Implication ke variants (bahut poochha)

| | Form | Original ke equivalent? |
|---|---|---|
| **Original** | p → q | - |
| **Converse** | q → p | ❌ Nahi |
| **Inverse** | ¬p → ¬q | ❌ Nahi (converse ka contrapositive) |
| **Contrapositive** | **¬q → ¬p** | ✅ **Haan** |

- **p → q ≡ ¬p ∨ q ≡ ¬q → ¬p.**
- **¬(p → q) ≡ p ∧ ¬q.**
- **p ↔ q ≡ (p → q) ∧ (q → p) ≡ (p ∧ q) ∨ (¬p ∧ ¬q).**
- "**p only if q**" = p → q. "**p if q**" = q → p. "**p iff q**" = p ↔ q.
- "p is **sufficient** for q" = p → q. "p is **necessary** for q" = q → p.
- "**Unless**": "p unless q" = ¬q → p.

## 4. Tautology, Contradiction, Contingency

- **Tautology:** har assignment par **true** (p ∨ ¬p).
- **Contradiction (unsatisfiable):** hamesha **false** (p ∧ ¬p).
- **Contingency:** kabhi true kabhi false.
- **Satisfiable:** kam se kam ek assignment par true.
- **Valid formula = tautology.** **Formula valid ⟺ uska negation unsatisfiable.**

**Checking:** truth table (2ⁿ), ya **false karne ki koshish** (agar false assignment na mile to tautology), ya algebra.

## 5. Logical Equivalences (yaad rakho)

| Law | |
|---|---|
| **De Morgan** | ¬(p ∧ q) ≡ ¬p ∨ ¬q; ¬(p ∨ q) ≡ ¬p ∧ ¬q |
| Double negation | ¬¬p ≡ p |
| Commutative, associative | ∧, ∨ |
| Distributive | p ∧ (q ∨ r) ≡ (p ∧ q) ∨ (p ∧ r); p ∨ (q ∧ r) ≡ (p ∨ q) ∧ (p ∨ r) |
| Absorption | p ∨ (p ∧ q) ≡ p; p ∧ (p ∨ q) ≡ p |
| Idempotent | p ∧ p ≡ p; p ∨ p ≡ p |
| Identity/Domination | p ∨ F ≡ p; p ∧ T ≡ p; p ∨ T ≡ T; p ∧ F ≡ F |
| Negation | p ∨ ¬p ≡ T; p ∧ ¬p ≡ F |
| Implication | p → q ≡ ¬p ∨ q |
| Exportation | (p ∧ q) → r ≡ p → (q → r) |
| Distribution of → | p → (q ∧ r) ≡ (p→q) ∧ (p→r); (p ∨ q) → r ≡ (p→r) ∧ (q→r) |
| | (p ∧ q) → r ≡ (p→r) ∨ (q→r) |
| Biconditional | p ↔ q ≡ (p→q) ∧ (q→p) ≡ ¬p ↔ ¬q |

**Common galat equivalences (trap):**
- p → q ≢ q → p. **p → (q → r) ≢ (p → q) → r** (→ associative nahi).
- ¬(p → q) ≢ ¬p → ¬q.

## 6. Normal Forms

- **Literal:** p ya ¬p.
- **DNF (Disjunctive Normal Form):** **terms (AND of literals) ka OR** (SOP jaisa).
- **CNF (Conjunctive Normal Form):** **clauses (OR of literals) ka AND** (POS jaisa).
- **Har formula ka DNF aur CNF hai.** **Canonical (full) DNF** = true rows ke minterms; **canonical CNF** = false rows ke maxterms.
- **Conversion steps:** (1) → aur ↔ hatao, (2) ¬ ko andar (De Morgan), (3) distribute.
- **Prenex Normal Form** (FOL me quantifiers aage).

**Example:** p → (q ∧ r) ≡ ¬p ∨ (q ∧ r) ≡ (¬p ∨ q) ∧ (¬p ∨ r) — CNF.
**Number of distinct Boolean functions (formulas up to equivalence) on n variables: 2^(2ⁿ).** (n=2 → 16.)

## 7. Functional completeness
**{¬, ∧}, {¬, ∨}, {→, ¬}, {↑ (NAND)}, {↓ (NOR)}** complete. **{∧, ∨}** nahi. **{→}** akela nahi, par **{→, F}** complete.

## 8. Arguments aur Inference Rules

**Argument valid** = premises sab true ⇒ conclusion true (kabhi premises T aur conclusion F nahi). Formula: **(P₁ ∧ P₂ ∧ … ∧ Pₙ) → C tautology**.

| Rule | Form |
|---|---|
| **Modus Ponens** | p, p → q ∴ q |
| **Modus Tollens** | ¬q, p → q ∴ ¬p |
| **Hypothetical Syllogism** | p → q, q → r ∴ p → r |
| **Disjunctive Syllogism** | p ∨ q, ¬p ∴ q |
| **Addition** | p ∴ p ∨ q |
| **Simplification** | p ∧ q ∴ p |
| **Conjunction** | p, q ∴ p ∧ q |
| **Resolution** | p ∨ q, ¬p ∨ r ∴ q ∨ r |
| **Constructive dilemma** | (p→q) ∧ (r→s), p ∨ r ∴ q ∨ s |

### Fallacies (galat reasoning)
- **Affirming the consequent:** p → q, **q** ∴ p ❌ (converse error).
- **Denying the antecedent:** p → q, **¬p** ∴ ¬q ❌.

**Example (GATE-type):**
"Agar candidate corrupt hai to election nahi jeetega. Candidate election jeet gaya. Isliye candidate corrupt nahi." Symbols: c → ¬w, w ∴ ¬c: **modus tollens (contrapositive w → ¬c)** ⇒ **valid**.
"Agar barish hui to match nahi hoga. Match nahi hua. Isliye barish hui." (r → ¬m, ¬m ∴ r): **affirming consequent ⇒ invalid**.

## 9. Knights & Knaves (truth-teller / liar puzzles)
Knight always true, knave always false. **Statement S "A: I am a knave"**: contradiction ⇒ aisa koi nahi keh sakta. **Approach:** har person ko T/F assume karke **statements ka consistency** check; ek hi consistent assignment.
**Example:** A: "Hum dono knaves hain." Agar A knight ⇒ statement true ⇒ A knave (contradiction) ⇒ **A knave**; statement false ⇒ B knight (kam se kam ek knight).

## 10. SAT aur resolution
- **SAT:** CNF satisfiable? **NP-complete (3-SAT).** **2-SAT polynomial.** **Horn-SAT polynomial** (har clause me ≤ 1 positive literal).
- **Resolution refutation:** ¬conclusion ko premises me jodkar **empty clause** derive ho jaaye ⇒ valid.

## 11. GATE counting
- **Kitne assignments par formula true** (models): truth table/logic se.
- **p, q, r par kitne functions satisfiable**...
- **Number of tautologies among given formulas.**

**Example:** (p → q) ∧ (q → r) → (p → r): tautology (hypothetical syllogism).
**Example:** Formula (p ∨ q) → (p ∧ q): p ≠ q par false; **p = q par true** ⇒ p ↔ q ke barabar.

## 12. Quick Revision
- p → q false sirf (T, F). ≡ ¬p ∨ q ≡ ¬q → ¬p.
- Converse aur inverse equivalent nahi.
- Tautology = valid; satisfiable ≠ tautology.
- De Morgan; ¬(p→q) ≡ p ∧ ¬q.
- DNF: OR of ANDs; CNF: AND of ORs.
- Modus ponens/tollens valid; affirming consequent invalid.
- n vars: 2ⁿ rows, 2^(2ⁿ) functions.

### Practice
1. p → q ka contrapositive? *(¬q → ¬p)*
2. (p → q) ∧ p → q tautology? *(Haan, modus ponens)*
3. 3 variable formula ki truth table rows? *(8)*
4. "p only if q" = ? *(p → q)*
