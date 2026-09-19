# Bottom-Up Parsing: Shift-Reduce, LR(0), SLR(1), LALR(1), CLR(1)
<!-- topics: compiler-design/lr-parser, compiler-design/parsing, compiler-design/viable-prefix, compiler-design/operator-precedence -->

## 1. Shift-Reduce Parsing

Input ke leaves se root tak: **stack + input buffer**. **Rightmost derivation ka reverse.**

**Actions:**
- **Shift:** next input symbol stack par push.
- **Reduce:** stack ke top par **handle** (production ka RHS) ko uske LHS se replace.
- **Accept:** stack = S aur input = $.
- **Error.**

**Handle** = right-sentential form ka wo substring jo **kisi production ke RHS se match** kare aur jiske reduce karne se **rightmost derivation ka ek step ulta** ho.
**Viable prefix** = right-sentential form ka wo prefix jo **handle ke right end se aage nahi jaata** — **shift-reduce parser ka stack content hamesha viable prefix** hota hai.

**Conflicts:**
- **Shift-Reduce (S/R):** shift karein ya reduce?
- **Reduce-Reduce (R/R):** kaun sa production reduce?

## 2. LR Parsers: family

**LR(k)** = **L**eft-to-right, **R**ightmost derivation (reverse), **k** lookahead. **DFA of items + stack** se driven.

**Power (languages accepted / grammars):**
> **LR(0) < SLR(1) < LALR(1) < CLR(1) = LR(1)**  (grammars ki class)
> **LR(1) ≡ DCFL** (language power; **har DCFL ka LR(1) grammar hai**).

| Parser | Item type | Lookahead | States | Note |
|---|---|---|---|---|
| **LR(0)** | LR(0) items | Koi nahi | Kam | Kam grammars |
| **SLR(1)** | LR(0) items | **FOLLOW(A)** | = LR(0) | Simple |
| **LALR(1)** | LR(1) items, **same core merge** | Lookahead set | = LR(0) states | **Yacc/Bison**, practical |
| **CLR(1)/LR(1)** | LR(1) items | Exact lookahead | **Sabse zyada** | Most powerful, table bada |

**Number of states:** **LR(0) = SLR = LALR** states barabar; **CLR ≥ LALR**.
**LALR merging:** same core (same LR(0) items) wale LR(1) states ko merge. **Isse shift-reduce conflict nahi aata, par reduce-reduce conflict aa sakta hai.**

## 3. LR(0) Items aur Automaton

**LR(0) item** = production + dot: **A → α • β** (α stack me, β abhi dekhna).
**Augmented grammar:** naya start **S′ → S** (accept detect ke liye).

**Closure(I):** item A → α • Bβ ho to B ke sab productions **B → • γ** add (repeat).
**Goto(I, X):** I ke sab items jinme dot X se pehle ho, dot ko X ke aage karke closure.

### Worked example
Grammar: **1. S → CC, 2. C → cC, 3. C → d.** Augmented: S′ → S.

**States (canonical LR(0) collection):**
- **I₀:** S′→•S, S→•CC, C→•cC, C→•d
- **I₁** = goto(I₀, S): S′→S•
- **I₂** = goto(I₀, C): S→C•C, C→•cC, C→•d
- **I₃** = goto(I₀, c): C→c•C, C→•cC, C→•d
- **I₄** = goto(I₀, d): C→d•
- **I₅** = goto(I₂, C): S→CC•
- **I₆** = goto(I₃, C): C→cC•
(goto(I₂, c) = I₃, goto(I₂, d) = I₄, goto(I₃, c) = I₃, goto(I₃, d) = I₄.)
**Total 7 states (LR(0)/SLR/LALR).**

### SLR(1) Parsing Table
**FOLLOW(S) = {$}, FOLLOW(C) = {c, d, $}.**

| State | c | d | $ | S | C |
|---|---|---|---|---|---|
| 0 | s3 | s4 | | 1 | 2 |
| 1 | | | **acc** | | |
| 2 | s3 | s4 | | | 5 |
| 3 | s3 | s4 | | | 6 |
| 4 | r3 | r3 | r3 | | |
| 5 | | | r1 | | |
| 6 | r2 | r2 | r2 | | |

(r3 = reduce C→d, r1 = S→CC, r2 = C→cC.)

**Table construction rules (SLR):**
1. **A → α•aβ** (a terminal): **ACTION[i, a] = shift j** (j = goto(i, a)).
2. **A → α•** (A ≠ S′): **ACTION[i, b] = reduce A→α ∀ b ∈ FOLLOW(A)**.
3. **S′ → S•**: ACTION[i, $] = accept.
4. **goto(i, A) = j** ⇒ GOTO[i, A] = j (non-terminals).

**Parse trace: "dd"** (stack me state numbers):
| Stack | Input | Action |
|---|---|---|
| 0 | dd$ | s4 |
| 0 d 4 | d$ | r3 (C→d) → goto(0,C)=2 |
| 0 C 2 | d$ | s4 |
| 0 C 2 d 4 | $ | r3 → goto(2,C)=5 |
| 0 C 2 C 5 | $ | r1 (S→CC) → goto(0,S)=1 |
| 0 S 1 | $ | accept |

## 4. Conflicts pehchano

- **LR(0):** state me **shift aur reduce dono** (ya do reduces) **bina lookahead** ⇒ conflict. **State jisme complete item (A → α•) ho aur koi aur item bhi ho → S/R ya R/R.**
- **SLR:** reduce sirf FOLLOW(A) par; agar FOLLOW(A) me wo terminal ho jis par shift bhi hai ⇒ **S/R conflict**.
- **Non-SLR par LR(1)/LALR example:** S → L = R | R; L → *R | id; R → L. (`=` ∈ FOLLOW(R) SLR me conflict, LR(1) me nahi.)
- **Ambiguous grammar ⇒ kisi bhi LR parser me conflict** (par precedence rules dekar resolve kar sakte, e.g., YACC `%left`).

**CLR vs LALR ka number-of-states question:** LALR = LR(0) states count; CLR usse zyada (is example me CLR = **10**, LALR = **7**).

## 5. LR(1) Items (CLR)

**[A → α • β, a]** = item + **lookahead terminal a** (reduce tabhi jab agla symbol a). **Closure me lookahead FIRST(βa)** se propagate. Reduce sirf **exact lookahead** par ⇒ SLR se kam conflicts.
**Kyun states zyada:** same LR(0) core ke items alag lookaheads ke saath alag states.
**LALR:** same-core states merge (lookaheads union) ⇒ table chhota.

## 6. Operator Precedence Parsing

**Grammar ke terminals ke beech precedence relations** (⋖ , ≐ , ⋗). Bottom-up (shift-reduce type), **chhoti grammar** (operator grammar: koi ε-production nahi, do adjacent non-terminals nahi).
- **Table small**, par sirf **operator grammar**; **error detection weak**.
- Ye **bottom-up** parser hai (top-down nahi). **Not LR** family ka standard part.

## 7. Parsers ka relationship
- **Har LL(1) grammar LR(1)** (ulta nahi). **LL(k) ⊂ LR(k)**.
- **LR(0) ⊂ SLR(1) ⊂ LALR(1) ⊂ LR(1).**
- **LR(1) parsers ⟺ DCFL.**
- **Top-down parsers left recursive grammar handle nahi**; bottom-up (LR) left recursion **achha** handle (aur **right-recursive stack me deep** hota).
- **Backtracking** ke bina: predictive/LR.

**Kaunsa top-down: recursive descent; LL. Kaunsa bottom-up: shift-reduce, operator precedence, LR, LALR, SLR.** (**Predictive parser aur LL top-down hain.**)

## 8. Error recovery (short)
Panic mode, phrase-level, error productions, global correction. **LR parsers error jaldi detect** karte (viable prefix property).

## 9. Common GATE questions
1. **Number of states / items** in LR(0) collection.
2. **Conflict identify:** shift-reduce ya reduce-reduce, kaunse parser me.
3. **Parsing table entries** fill karo.
4. **Handle / viable prefix** definition.
5. **Reduce steps ki count** given string parse me (har reduce ek production).
6. **LALR vs CLR states** / **kaunse grammar SLR nahi**.
7. **Power ordering** of parsers.

**Reduction count example:** grammar S → CC, C → cC | d; string **"ccdd"** = (ccd)(d): reductions: `d→C` (first C ke andar) 1, `cC→C` 2 baar (do c), dusra `d→C` 1, aur `CC→S` 1 = **5 reduces** (har reduce ek production application; rightmost derivation me productions ki count).

## 10. Quick Revision
- Shift-reduce: handle reduce; stack = viable prefix.
- LR(0) < SLR < LALR < CLR; LR(1) ≡ DCFL.
- SLR reduce on FOLLOW; LALR merges same-core states (R/R conflict possible, S/R nahi).
- CLR most states; LR(0) = SLR = LALR state count.
- Ambiguous ⇒ conflicts. Every LL(1) is LR(1).
- Operator precedence bottom-up.

### Practice
1. Item A → α•β kya batata hai? *(α stack me, β dekhna hai)*
2. LALR me naya conflict kaunsa? *(Reduce-Reduce)*
3. Predictive parser top-down ya bottom-up? *(Top-down)*
4. Upar ke grammar me "cdd" ke reduces? *(d→C, cC→C, d→C, CC→S = 4)*
