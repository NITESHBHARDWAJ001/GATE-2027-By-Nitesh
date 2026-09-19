# Context-Free Grammars, Parse Trees, Ambiguity aur Normal Forms
<!-- topics: theory-of-computation/context-free-language, theory-of-computation/context-free-grammar, theory-of-computation/identify-class-language -->

## 1. Grammar kya hai?

**G = (V, T, P, S):** V = variables (non-terminals), T = terminals, P = productions, S = start symbol.
**Derivation:** S se shuru karke productions apply karke terminal string. **L(G)** = derivable strings.

**Chomsky Hierarchy:**

| Type | Grammar | Machine | Production form |
|---|---|---|---|
| **Type 3** | Regular | DFA/NFA | A → aB, A → a |
| **Type 2** | **Context-free** | **PDA** | **A → α** (LHS ek non-terminal) |
| **Type 1** | Context-sensitive | Linear Bounded Automaton | αAβ → αγβ, \|LHS\| ≤ \|RHS\| |
| **Type 0** | Unrestricted | Turing machine | α → β |

Regular ⊂ CFL ⊂ CSL ⊂ Recursive ⊂ RE.

## 2. CFG examples (language nikaalna / banana)

- **{aⁿbⁿ : n ≥ 0}:** S → aSb | ε.
- **Palindromes over {a,b}:** S → aSa | bSb | a | b | ε.
- **{aⁿbⁿcᵐ}:** S → AC, A → aAb | ε, C → cC | ε.
- **{aⁿbᵐ : n ≠ m}:** S → AS₁ | S₁B, S₁ → aS₁b | ε, A → aA | a, B → bB | b.
- **Equal a's and b's:** S → aSbS | bSaS | ε.
- **Balanced parentheses:** S → (S)S | ε.
- **{aⁿbⁿ} ∪ {aⁿb²ⁿ}:** S → S₁ | S₂ ... union ke liye naya start.
- **{a^i b^j c^k : i = j ya j = k}** CFL (union).

**Rule:** **matching/counting jo do parts ke beech ho (nested)** → CFL; **teen ke beech ek saath** (aⁿbⁿcⁿ) → CFL nahi.

## 3. Derivation aur Parse Tree

- **Leftmost derivation (LMD):** har step me sabse **left** non-terminal expand. **Rightmost (RMD).**
- **Parse (derivation) tree:** root S, internal = non-terminal, leaves = terminals (left to right = string, **yield**).
- Har parse tree ka **ek unique LMD aur ek unique RMD**.

**Example:** E → E + E | E * E | id; string id + id * id.
Do parse trees (do LMD) ⇒ **ambiguous**.

## 4. Ambiguity

**Grammar ambiguous** = kisi string ke **do ya zyada parse trees (⟺ do LMD ⟺ do RMD)**.
- **Inherently ambiguous language:** jiska **koi bhi** CFG ambiguous ho. Example: **{aⁱbʲcᵏ : i = j ya j = k}**.
- **Ambiguity decidable nahi** (CFG ambiguous hai? undecidable).
- **Ambiguity dur karna:** precedence aur associativity ke levels: 
  E → E + T | T; T → T * F | F; F → (E) | id. (Unambiguous; * ki precedence zyada; left associative.)
- **Regular ya LL(1)/LR(1) grammar** ambiguous nahi. Ambiguous grammar LL/LR nahi (parsers me conflict).

**Ambiguous check tips:** (1) do parse trees dhundo, (2) E → E + E jaisi symmetric recursion, (3) `S → SS | a` ambiguous, (4) **dangling else** classic.

## 5. Grammar simplification (order important)

1. **ε-productions hatao** (nullable variables ka closure; naye productions add). Ek exception: agar ε ∈ L to S → ε rakho.
2. **Unit productions hatao** (A → B).
3. **Useless symbols hatao:** (a) **non-generating** (terminal string na de) pehle, (b) phir **non-reachable** (S se nahi pahunch sakte).
   > **Order zaroori:** ε → unit → useless.

**Example (ε removal):** S → AB, A → aA | ε, B → bB | ε. Nullable: A, B, S. New: S → AB | A | B | ε (ε sirf S ke liye), A → aA | a, B → bB | b.

**Nullable/unit closure** se kitne productions bante hain (counting questions).

## 6. Normal Forms

### Chomsky Normal Form (CNF)
Har production **A → BC** (do variables) ya **A → a** (ek terminal) (+ S → ε).
**Conversion:** simplify → terminals ko variables se replace (X_a → a) → lambe RHS ko todo (A → BCD ⇒ A → BX, X → CD).
**Facts (GATE):**
- **CNF me length n string ka derivation exactly 2n − 1 steps** (n−1 binary + n terminal).
- **CNF parse tree binary tree.** CYK algorithm **O(n³|G|)**.
- **Grammar ko CNF me convert** karne par production count badh sakti hai.

### Greibach Normal Form (GNF)
Har production **A → aα** (terminal se shuru, phir variables). **Left recursion nahi.** **Length n string me n derivation steps** (har step ek terminal generate).

### Left recursion elimination
A → Aα | β ⇒ A → βA′, A′ → αA′ | ε.
### Left factoring: A → αβ₁ | αβ₂ ⇒ A → αA′, A′ → β₁ | β₂.

## 7. Grammar aur language identify karna

Do tarike ke sawal: **"ye grammar kaunsi language deta hai"** aur **"ye language kaunsi class ki hai (regular/CFL/CSL/...)"**.

**Checklist (language ki class):**
1. **Finite memory / bounded counting** → Regular.
2. **Ek counter ya stack se match (nested)** → CFL (aⁿbⁿ, ww^R, aⁿbᵐ n≠m).
3. **Do independent counters ek saath ya copy (aⁿbⁿcⁿ, ww, aⁿ²)** → **CSL** (not CFL).
4. **Turing machine se decidable par bhaari** → Recursive; **halting-type / semi-decidable** → RE not recursive.

**Examples:**
- **{ww : w ∈ {a,b}\*}** = **CSL, not CFL.** ({wwᴿ} CFL.)
- **{aⁿbⁿcⁿ}, {aⁿ² }, {a^(2ⁿ)}, {a^p : p prime}:** CSL (not CFL) (unary primes CSL).
- **{aⁿbᵐcⁿ⁺ᵐ}** CFL. **{aⁿbⁿcᵐ}** CFL. **{aᵐbⁿcᵐdⁿ}** not CFL.
- **Complement of {ww}** is **CFL** (interesting).
- **Primes/factorials** unary: not CFL.

## 8. CFG ke decision properties
**Decidable:** membership (CYK), **emptiness**, **finiteness**.
**Undecidable:** **equivalence of two CFGs**, **ambiguity**, **universality (L = Σ\*)**, **intersection empty?**, **is L(G) regular?**, **containment**.

## 9. Quick Revision
- CFG: LHS ek variable; PDA equivalent.
- Ambiguous = 2 parse trees = 2 LMD; undecidable to check.
- Simplify order: ε → unit → useless.
- CNF: 2n−1 steps; GNF: n steps.
- ww, aⁿbⁿcⁿ not CFL; wwᴿ, aⁿbⁿ CFL.
- CFG equivalence/ambiguity/universality undecidable.

### Practice
1. S → aSb | ab: language? *({aⁿbⁿ : n ≥ 1})*
2. CNF me 6-length string ke derivation steps? *(2×6−1 = 11)*
3. {aⁿbⁿcⁿ} CFL hai? *(Nahi)*
4. E → E+E | id ambiguous kyun? *(id+id+id ke do trees)*
