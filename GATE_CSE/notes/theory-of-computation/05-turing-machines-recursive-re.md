# Turing Machines, Recursive aur Recursively Enumerable Languages
<!-- topics: theory-of-computation/recursive-and-recursively-enumerable-languages, theory-of-computation/turing-machine, theory-of-computation/countable-uncountable-set, theory-of-computation/identify-class-language -->

## 1. Turing Machine (TM)

**Sabse powerful standard model:** **infinite tape** (dono taraf), **read/write head** (left/right move), finite control.

**7-tuple:** M = (Q, Σ, Γ, δ, q₀, B, F)
- Γ = tape alphabet (Σ ⊂ Γ), **B = blank** (Γ me, Σ me nahi).
- **δ: Q × Γ → Q × Γ × {L, R}** (state, symbol → naya state, likho, move).
- Accept: **final state** me pahunche (halt). **Reject**: koi transition nahi (halt) ya reject state. **Loop**: kabhi halt nahi.

**TM ke teen outcomes:** accept, reject, **loop forever**.

### Example: aⁿbⁿcⁿ ka TM idea
Ek 'a' ko X se mark → aage jaakar 'b' ko Y → phir 'c' ko Z → wapas start. Repeat. Sab mark ho gaye to accept.
**Time complexity O(n²)**.

### TM ka use
**Acceptor (language recognizer)** ya **function computer** (input → output on tape, e.g., addition, copy).

## 2. TM variants (sab **equivalent power**)

| Variant | Note |
|---|---|
| **Multi-tape TM** | Single-tape se simulate ho jaata; **quadratic slowdown** |
| **Non-deterministic TM (NTM)** | **Power same** (DTM simulate karta, exponential slowdown); **NTM ≡ DTM** |
| **Multi-track, two-way infinite tape** | Same power |
| **Universal TM (UTM)** | Kisi bhi TM ko simulate kare (**stored-program computer**) |
| **Linear Bounded Automaton (LBA)** | Tape input length tak limited → **CSL** |
| **Two-stack PDA / Queue automaton** | TM ke barabar |
| **Read-only tape + counters (2 counters)** | TM ke barabar |

**Church–Turing Thesis:** "jo bhi effectively computable hai wo TM se computable hai" (thesis, theorem nahi).

## 3. Recursive (Decidable) aur RE (Semi-decidable) languages

| Class | Definition | TM behaviour |
|---|---|---|
| **Recursive (Decidable)** | ∃ TM jo **har input par halt** kare (accept ya reject) | **Decider** |
| **Recursively Enumerable (RE) / Semi-decidable / Turing-recognizable** | ∃ TM jo **w ∈ L par accept**, w ∉ L par **reject ya loop** | Recognizer |
| **Co-RE** | Complement RE | |
| **Not RE** | Koi TM nahi | |

**Hierarchy:** Regular ⊂ DCFL ⊂ CFL ⊂ CSL ⊂ **Recursive** ⊂ **RE** ⊂ (all languages).

### Key theorems
1. **L aur Lᶜ dono RE ⟹ L recursive.** (Dono TMs ko parallel chalao; ek accept karega.)
2. **L recursive ⟹ Lᶜ recursive.** (Accept/reject flip.)
3. **L RE, not recursive ⟹ Lᶜ RE nahi.**
4. Kisi L ke liye **teen mein se sirf ye possibilities** L aur Lᶜ ke liye:
   - dono recursive,
   - dono non-RE,
   - **ek RE (not recursive), doosra not RE**.
   - **Dono RE par L recursive nahi — impossible** (theorem 1).
5. **Recursive languages Turing decidable, complement closed.** **RE complement me closed nahi.**

**Example:** **Halting problem (HALT / A_TM)** RE hai, recursive nahi; iska complement **RE nahi**.

## 4. Enumeration aur Countability

- **Countable** = N ke saath bijection ya finite. **Σ\*** countable. **Sab TMs countable** (encode as strings).
- **All languages over Σ (power set of Σ\*)** **uncountable** (Cantor diagonalization).
- Isliye **RE languages countable** par **languages uncountable** ⇒ **kai languages RE bhi nahi hain**.
- **Language enumerable in lexicographic order ⟺ recursive** (agar shortlex order me generate kar sako to decide bhi kar sakte). **Bina order (arbitrary enumeration) ⟺ RE.**
- Countable: Q (rationals), Z, N×N, Σ\*, sab finite subsets of N. Uncountable: R, 2^N, infinite binary sequences.
- **Set of all TMs / all algorithms / all C programs countable**; **set of all functions N→N uncountable**.

**Example (GATE):** "Set of all recursively enumerable languages over {0,1}" — **countable**; "Set of all languages" — **uncountable**; "Set of all non-RE languages" — **uncountable**.

## 5. Chomsky Hierarchy (complete)

| Type | Language class | Automaton | Grammar |
|---|---|---|---|
| 3 | Regular | FA | Right/left linear |
| 2 | CFL | PDA (NPDA) | CFG |
| 1 | Context-sensitive | LBA | CSG (\|α\| ≤ \|β\|) |
| 0 | RE | TM | Unrestricted |

- **CSL ⊂ Recursive**: CSL **decidable** (LBA membership decidable) par **Recursive ⊋ CSL**.
- **CSL closed under complement** (Immerman–Szelepcsényi), union, intersection.
- **LBA emptiness undecidable**, **LBA membership decidable**.

## 6. TM par decision problems (preview)
- **Membership (A_TM) undecidable.** **Halting undecidable.** **Emptiness, equivalence, regularity of TM language undecidable.** (Detail agle chapter.)

## 7. Time complexity classes (TM based, brief)
**DTIME, P** (polynomial deterministic), **NP** (polynomial non-deterministic), **PSPACE**, **EXP**. **P ⊆ NP ⊆ PSPACE ⊆ EXP**. Detailed: Algorithms notes (P/NP).

## 8. Quick Revision
- TM: infinite tape, δ(q,a) = (q′, b, L/R); outcomes accept/reject/loop.
- Multi-tape, NTM ≡ DTM in power.
- Recursive = decider (always halts); RE = recognizer (may loop).
- L & Lᶜ RE ⟹ L recursive.
- RE not closed under complement; recursive is.
- Languages uncountable; TMs countable ⇒ non-RE languages exist.
- CSL ⊂ Recursive; LBA ↔ CSL; CSL closed under complement.

### Practice
1. L RE aur Lᶜ RE. L kya hai? *(Recursive)*
2. Set of all RE languages countable ya nahi? *(Countable)*
3. NTM DTM se zyada powerful? *(Nahi, same power)*
4. Halting problem ka complement RE hai? *(Nahi)*
