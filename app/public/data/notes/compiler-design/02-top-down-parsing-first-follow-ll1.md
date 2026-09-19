# Top-Down Parsing: FIRST, FOLLOW aur LL(1)
<!-- topics: compiler-design/parsing, compiler-design/first-and-follow, compiler-design/ll-parser, compiler-design/grammar, compiler-design/ambiguous-grammar -->

## 1. Parsing kya hai?

**Parser** tokens ke sequence ko **grammar (CFG)** ke against check karta hai aur **parse tree** banata hai.

| | **Top-Down** | **Bottom-Up** |
|---|---|---|
| Direction | Root (S) → leaves | Leaves → root |
| Derivation | **Leftmost** derivation | **Rightmost derivation ka reverse** |
| Kaunse parsers | Recursive descent, **LL(1)**, predictive | **Shift-reduce, LR(0), SLR, LALR, CLR** |
| Grammar | Left recursion/factoring hatani padti | Zyada powerful |

**Parser generators:** YACC/Bison = LALR(1) (bottom-up).

## 2. Grammar problems (top-down ke liye)

### Left recursion
**A → Aα | β** — top-down parser infinite loop. **Elimination:**
```
A → β A′
A′ → α A′ | ε
```
**Example:** E → E + T | T ⟹ E → T E′, E′ → + T E′ | ε.

### Left factoring
**A → αβ₁ | αβ₂** (common prefix) ⇒ **A → α A′, A′ → β₁ | β₂.**
**Example:** S → iEtS | iEtSeS | a ⟹ S → iEtS S′ | a, S′ → eS | ε.

**LL(1) banane ke liye left recursion hatana + left factoring dono zaroori** (sirf ek kaafi nahi; phir bhi guarantee nahi).

## 3. FIRST aur FOLLOW

### FIRST(X)
**Un terminals ka set jo X se derive hone wali strings ke pehle symbol ho sakte hain.** ε ∈ FIRST(X) agar X ⇒* ε.
Rules:
1. Terminal a: FIRST(a) = {a}.
2. X → ε: ε ∈ FIRST(X).
3. **X → Y₁Y₂…Yₖ:** FIRST(Y₁) − ε; agar Y₁ nullable to FIRST(Y₂) − ε ...; **sab nullable ho to ε bhi**.

### FOLLOW(A)
**Un terminals ka set jo kisi sentential form me A ke turant baad aa sakte hain.** (ε kabhi nahi; end marker **$**.)
Rules:
1. **FOLLOW(S) me $.**
2. **B → αAβ:** FIRST(β) − ε ⊆ FOLLOW(A).
3. **B → αA ya B → αAβ jahan β ⇒* ε:** **FOLLOW(B) ⊆ FOLLOW(A).**

**Iterate karo jab tak koi set badhe nahi.**

### Worked example (classic expression grammar, left recursion hata ke)
```
E  → T E′
E′ → + T E′ | ε
T  → F T′
T′ → * F T′ | ε
F  → ( E ) | id
```
**FIRST:**
- FIRST(F) = { (, id }, FIRST(T) = FIRST(F) = { (, id }, FIRST(E) = { (, id }.
- FIRST(E′) = { +, ε }, FIRST(T′) = { *, ε }.

**FOLLOW:**
- FOLLOW(E) = { ), $ } (start + `F → ( E )`).
- FOLLOW(E′) = FOLLOW(E) = { ), $ }.
- FOLLOW(T) = FIRST(E′) − ε ∪ FOLLOW(E) (E′ nullable) = { +, ), $ }.
- FOLLOW(T′) = FOLLOW(T) = { +, ), $ }.
- FOLLOW(F) = FIRST(T′) − ε ∪ FOLLOW(T) = { *, +, ), $ }.

## 4. LL(1) Parsing Table

**LL(1)** = **L**eft-to-right scan, **L**eftmost derivation, **1** lookahead symbol. **Predictive parser (non-backtracking)**, **stack + table**.

### Table construction
Har production **A → α** ke liye:
1. **a ∈ FIRST(α)** (a terminal) ⇒ **M[A, a] = A → α**.
2. **ε ∈ FIRST(α)** ⇒ **b ∈ FOLLOW(A)** ke liye **M[A, b] = A → α** (aur $ bhi agar $ ∈ FOLLOW).

**Upar wale grammar ki table:**

| | id | + | * | ( | ) | $ |
|---|---|---|---|---|---|---|
| **E** | E→TE′ | | | E→TE′ | | |
| **E′** | | E′→+TE′ | | | E′→ε | E′→ε |
| **T** | T→FT′ | | | T→FT′ | | |
| **T′** | | T′→ε | T′→*FT′ | | T′→ε | T′→ε |
| **F** | F→id | | | F→(E) | | |

**Ek cell me ek se zyada production ⇒ grammar LL(1) nahi.**

### LL(1) condition (grammar check)
Har A → α | β ke liye:
1. **FIRST(α) ∩ FIRST(β) = ∅.**
2. **Kam se kam ek se ε derive na ho** (dono nahi).
3. Agar **β ⇒* ε** to **FIRST(α) ∩ FOLLOW(A) = ∅.**

**LL(1) grammar ke gun:** **ambiguous nahi**, **left-recursive nahi**, unique parse.
**Har LL(1) grammar LR(1) hai; ulta nahi.** LL(1) languages ⊂ DCFL.

### Parsing table se string parse (trace)
Input `id + id $`:
| Stack | Input | Action |
|---|---|---|
| $E | id+id$ | E→TE′ |
| $E′T | id+id$ | T→FT′ |
| $E′T′F | id+id$ | F→id |
| $E′T′id | id+id$ | match id |
| $E′T′ | +id$ | T′→ε |
| $E′ | +id$ | E′→+TE′ |
| $E′T+ | +id$ | match + |
| ... | | ... |
Aakhir me **$ aur $** = accept. (RHS stack me ulta push.)

**Error recovery:** panic mode (synchronizing tokens = FOLLOW set).

## 5. Recursive Descent Parser
Har non-terminal ka ek procedure. **Left-recursive grammar par infinite recursion.** **Backtracking** (agar predictive nahi). Top-down. **Predictive recursive descent = LL(1) jaisa.**

## 6. Ambiguity aur parsing
- **Ambiguous grammar ⇒ LL(1) nahi, LR bhi nahi** (conflicts). Fix: precedence/associativity levels (E → E+T | T, T → T*F | F, F → (E) | id).
- **Precedence rule:** jo operator grammar me **start symbol se door (deeper)** hota hai uski **precedence zyada**. **Left recursion → left associative; right recursion → right associative.**
- **Dangling else:** S → if E then S | if E then S else S | other (ambiguous) — **else nearest if se jodo** (rule se resolve).

## 7. Handy shortcuts (GATE)
- **FOLLOW me ε nahi**, FIRST me ε ho sakta.
- **FOLLOW(A) ⊇ FOLLOW(B)** agar B → αA (A last).
- **Start symbol ke FOLLOW me $ zaroor.**
- **Nullable variables** pehle nikaalo (ε-production closure).
- **LL(1) table me cell count**: har production ke lookahead set ke sizes ka sum.
- **Kitne grammars LL(1)?** conditions se test.

**Example (FIRST/FOLLOW):** S → AB, A → aA | ε, B → bB | c.
FIRST(A) = {a, ε}; FIRST(B) = {b, c}; FIRST(S) = FIRST(A) − ε ∪ FIRST(B) = {a, b, c}.
FOLLOW(S) = {$}; FOLLOW(A) = FIRST(B) = {b, c}; FOLLOW(B) = FOLLOW(S) = {$}.

## 8. Quick Revision
- Top-down = LMD, root→leaves; bottom-up = reverse RMD.
- Left recursion A → Aα|β ⇒ A → βA′, A′ → αA′|ε; left factoring for common prefix.
- FIRST: pehla terminal (ε possible); FOLLOW: turant baad wala (no ε, $ for start).
- LL(1) table: FIRST(α) → cell; ε ∈ FIRST(α) → FOLLOW(A) cells.
- LL(1) condition: FIRST disjoint, ε ⇒ FIRST ∩ FOLLOW disjoint.
- LL(1) ⇒ unambiguous, no left recursion.

### Practice
1. S → aS | b: FIRST(S)? FOLLOW(S)? *({a,b}; {$})*
2. A → aB | aC: LL(1)? *(Nahi, common prefix a)*
3. FOLLOW(E′) upar grammar me? *({ ), $ })*
4. Left recursion hatao: A → Aa | b. *(A → bA′, A′ → aA′ | ε)*
