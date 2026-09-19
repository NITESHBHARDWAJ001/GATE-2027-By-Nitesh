# Decidability, Undecidability, Reductions aur Rice's Theorem
<!-- topics: theory-of-computation/decidability, theory-of-computation/reduction, theory-of-computation/recursive-and-recursively-enumerable-languages -->

## 1. Decidable vs Undecidable

**Decision problem** = yes/no sawal. **Decidable** = koi algorithm (TM jo hamesha halt kare) jo sahi yes/no de. **Undecidable** = aisa algorithm nahi.

**Languages of TM encodings:** ⟨M⟩ = TM M ka string encoding; ⟨M, w⟩.

### Core undecidable problems
| Problem | Language | Status |
|---|---|---|
| **A_TM** (Acceptance) | {⟨M, w⟩ : M accepts w} | **Undecidable, RE** |
| **HALT_TM** | {⟨M, w⟩ : M halts on w} | **Undecidable, RE** |
| **E_TM** (Emptiness) | {⟨M⟩ : L(M) = ∅} | **Undecidable, co-RE (not RE)** |
| **EQ_TM** | {⟨M₁, M₂⟩ : L(M₁) = L(M₂)} | **Undecidable, neither RE nor co-RE** |
| **REGULAR_TM** | {⟨M⟩ : L(M) regular} | Undecidable |
| **ALL_TM** | L(M) = Σ\* | Undecidable, not RE, not co-RE |
| **Post Correspondence Problem (PCP)** | | **Undecidable** |
| **Blank-tape halting, state-entry** | | Undecidable |

**Proof of A_TM undecidable (diagonalization):** maan lo decider H hai. D(⟨M⟩) = H(⟨M,⟨M⟩⟩) ka ulta. D(⟨D⟩) → contradiction.

**Complement of A_TM = not RE** (kyunki A_TM RE hai par recursive nahi).

## 2. Decidable problems (regular / CFL / DFA)

| Problem | Regular (DFA/RE) | CFL (CFG/PDA) | TM |
|---|---|---|---|
| **Membership** | Decidable | **Decidable** (CYK) | Undecidable |
| **Emptiness** | Decidable | **Decidable** | Undecidable |
| **Finiteness** | Decidable | **Decidable** | Undecidable |
| **Equivalence** | Decidable | **Undecidable** | Undecidable |
| **Universality** (L = Σ\*) | Decidable | **Undecidable** | Undecidable |
| **Ambiguity** | - | **Undecidable** | - |
| **Intersection empty?** | Decidable | **Undecidable** | - |
| **Is L regular?** | - | **Undecidable** | Undecidable |

**Yaad karne ka shortcut:** *CFG par sirf membership, emptiness, finiteness decidable.* Baaki sab undecidable.

## 3. Reductions

**Mapping (many-one) reduction A ≤ₘ B:** computable f s.t. w ∈ A ⟺ f(w) ∈ B.

**Kaam ka use:**
- **A ≤ B aur B decidable ⟹ A decidable.**
- **A ≤ B aur B RE ⟹ A RE.**
- **A ≤ B aur A undecidable ⟹ B undecidable.** (Undecidability prove karne ka main tareeka: **known undecidable A ko naye problem B me reduce karo.**)
- **A ≤ B aur A not RE ⟹ B not RE.**

**Direction yaad rakho:** "**A ≤ B**" ka matlab **B kam se kam A jitna mushkil** hai.

**Example:** A_TM ≤ HALT_TM (ek machine M′ banao jo M ko w par chalaye aur reject ko loop me badle) ⟹ HALT undecidable.

**Galat directions se bacho (GATE trap):**
- "A ≤ B aur B undecidable ⟹ A undecidable" **galat** (kuch nahi nikalta).
- "A ≤ B, A decidable ⟹ B decidable" **galat**.

**Turing reduction** (oracle) vs many-one: many-one **strict** hai.

## 4. Rice's Theorem

**Statement:** TM ke language ki **koi bhi non-trivial semantic property** **undecidable** hai.
- **Semantic property** = property jo **L(M)** ki ho (machine ka syntax/structure nahi).
- **Non-trivial** = kuch TMs me true, kuch me false (na sab, na koi nahi).

**Rice lagta hai:**
- L(M) = ∅? L(M) finite? L(M) regular/CFL? L(M) infinite? L(M) contains "011"? |L(M)| ≥ 1? L(M) = Σ\*? L(M) recursive? — **sab undecidable**.

**Rice nahi lagta (syntactic/behavioural properties):**
- **M ke states ki sankhya ≤ 5?** (decidable, machine structure)
- **M w par 100 steps me halt karta hai?** (decidable: simulate 100 steps)
- **M ke pass koi transition hai jo ...** (structural)
- **Trivial property** ("L(M) RE hai?" hamesha true, decidable).
- "**M ne kabhi head left move kiya?**" (behaviour, undecidable par Rice nahi, alag proof).

**Check karne ka tarika:** kya property **sirf L(M)** par depend karti hai (do TMs jinka language same ho unme same value)? aur non-trivial? To **undecidable**.

## 5. RE, co-RE aur non-RE classification

| Language | RE? | co-RE? | Recursive? |
|---|---|---|---|
| A_TM, HALT | ✓ | ✗ | ✗ |
| Complement of A_TM | ✗ | ✓ | ✗ |
| E_TM | ✗ | ✓ | ✗ |
| Complement of E_TM (**NE_TM**: L(M) ≠ ∅) | **✓** | ✗ | ✗ |
| EQ_TM, ALL_TM | ✗ | ✗ | ✗ |
| **Regular/CFL languages** | ✓ | ✓ | ✓ |

**"L(M) non-empty" RE hai** (dovetailing: sab strings par parallel simulate; koi accept ho jaaye).
**"L(M) has at least one string of length ≥ k"** RE.
**"L(M) = Σ\*"** not RE aur not co-RE.

## 6. Kuch aur undecidable/decidable (GATE style)

**Undecidable:** halting, **program equivalence**, **totality (does the program halt on all inputs)**, **dead code detection** (general), **virus detection (generic)**, **CFG equivalence**, **CFG ambiguity**, **PCP**, **Hilbert's 10th (Diophantine solvability)**, **tiling problem**, **whether a TM ever prints a blank symbol** (Rice type nahi par undecidable).

**Decidable:** DFA/NFA/RE everything, **CFL membership/emptiness/finiteness**, **whether TM M halts on w within k steps**, **type checking (decidable languages)**, **linear bounded automaton membership**, **Presburger arithmetic** (decidable).

**LBA:** membership **decidable**, emptiness **undecidable**.
**Unrestricted grammar:** membership undecidable.

## 7. GATE Question types
1. **"Kaunsa decidable/undecidable?"** — problem ka model dekho (DFA/CFG/TM).
2. **Reduction direction**: "A ≤ B aur B decidable ⟹ ?".
3. **Rice's theorem applicability**.
4. **RE/co-RE classification**: Recursive + RE + complement combos.
5. **Language enumeration** (lexicographic order ⟹ recursive).
6. **Relation of L, Lᶜ**: dono RE ⟹ recursive.

**Example (GATE-style):** "L₁ recursive, L₂ RE not recursive. L₁ ∩ L₂?" — **RE** (RE intersection closed; L₁ ∩ L₂ recursive nahi zaroori). "L₁ ∪ L₂?" RE. "L₂ᶜ?" **not RE** (kyunki L₂ recursive nahi).

## 8. Quick Revision
- A_TM/HALT: RE not recursive. E_TM: co-RE. EQ_TM, ALL_TM: neither.
- Rice: non-trivial semantic (about L(M)) ⇒ undecidable.
- A ≤ B: B decidable ⇒ A decidable; A undecidable ⇒ B undecidable.
- L & Lᶜ RE ⇒ recursive.
- CFG: membership/emptiness/finiteness only decidable.
- "Halts within k steps" decidable; "halts at all" undecidable.
- LBA membership decidable, emptiness not.

### Practice
1. "L(M) contains exactly 5 strings" decidable? *(Nahi, Rice)*
2. "M ke ≥ 10 states hain" decidable? *(Haan)*
3. A ≤ₘ B, B RE ⇒ A? *(RE)*
4. L recursive, complement kya hai? *(Recursive)*
