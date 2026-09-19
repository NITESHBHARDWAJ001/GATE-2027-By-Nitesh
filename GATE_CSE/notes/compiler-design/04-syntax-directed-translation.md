# Syntax Directed Translation (SDT): Attributes, SDD, Evaluation
<!-- topics: compiler-design/syntax-directed-translation, compiler-design/abstract-syntax-tree, compiler-design/expression-evaluation -->

## 1. SDT ka idea

Grammar ke productions ke saath **semantic rules/actions** jodkar **meaning** nikalna: type checking, expression value, intermediate code, symbol table entries.

- **SDD (Syntax-Directed Definition):** grammar + **attributes** + **semantic rules** (declarative, order nahi bataata).
- **SDT (Translation Scheme):** grammar ke andar **semantic actions {…}** ki jagah fixed (evaluation order specify).

## 2. Attributes

Grammar symbol (node) ke saath attached value (type, value, code, address).

| | **Synthesized** | **Inherited** |
|---|---|---|
| Value kahan se | **Children se** (bottom-up) | **Parent aur/ya siblings se** (top-down/sideways) |
| Rule form | A.a = f(children attrs) | B.a = f(A ya sibling attrs) |
| Tree traversal | **Post-order / bottom-up** | Pre-order/ left-to-right |
| Example | `E.val = E₁.val + T.val` | `T′.inh = F.val` |

### S-attributed SDD
**Sirf synthesized attributes.** **Bottom-up parser (LR)** ke saath **reduce ke waqt** evaluate. Evaluation order = **post-order**. Sabse simple.

### L-attributed SDD
**Synthesized + inherited**, par inherited attribute **sirf parent ya apne left siblings** se le sakta (right siblings se nahi). **Left-to-right depth-first (top-down)** evaluate. **LL parsing** ke saath fit. **Har S-attributed L-attributed bhi hai.**

**Relation:** **S-attributed ⊂ L-attributed ⊂ general SDD.**

## 3. Dependency graph aur evaluation

**Dependency graph:** node = attribute instances, edge = dependency (a → b: a pehle chahiye b ke liye). **Acyclic ho to evaluate ho sakte** (topological order). **Circular dependency ⇒ evaluation impossible.**

## 4. Example 1: Desk calculator (S-attributed)

```
L → E n         { print(E.val) }
E → E₁ + T      { E.val = E₁.val + T.val }
E → T           { E.val = T.val }
T → T₁ * F      { T.val = T₁.val * F.val }
T → F           { T.val = F.val }
F → ( E )       { F.val = E.val }
F → digit       { F.val = digit.lexval }
```
**Input `3 * 5 + 4 n`:** F.val = 3, T.val = 3; F.val = 5, T.val = 15; E.val = 15; T.val = 4 (F→4), E.val = 19 → **print 19**.

## 5. Example 2: Inherited attribute (type declaration, L-attributed)

```
D → T L        { L.in = T.type }
T → int        { T.type = integer }
T → float      { T.type = float }
L → L₁ , id    { L₁.in = L.in; addtype(id.entry, L.in) }
L → id         { addtype(id.entry, L.in) }
```
`float a, b, c;` me `L.in` (inherited) **type ko neeche ids tak** pahunchata hai. Isliye inherited.

## 6. SDT ko implement karna

### Postfix SDT (S-attributed ke liye)
**Actions har production ke ant me**, reduce ke turant baad chalti. LR parser me **value stack** par attributes.

### Marker non-terminals (inherited ke liye bottom-up)
`A → X {action} Y` ko `A → X M Y`, `M → ε {action}` — bottom-up parser me beech ke actions ke liye.

### SDT with semantic actions inside productions
`E → E₁ + T { print('+') }` = infix → postfix conversion.

**Example (infix → postfix SDT):**
```
E → E + T   { print('+') }
E → T
T → T * F   { print('*') }
T → F
F → id      { print(id.name) }
```
`a + b * c` → prints **a b c * +**.

## 7. SDT ke uses
1. **Expression evaluation.** 2. **Intermediate code (three-address).** 3. **Type checking.** 4. **Syntax tree construction (AST).** 5. **Symbol table filling.** 6. **Infix ↔ postfix.**

### Syntax tree (AST) construction
Attribute `E.node` (pointer): `E.node = new Node('+', E₁.node, T.node)`. **AST = parse tree ka compressed roop** (extra non-terminals hata ke). **DAG** common subexpressions ko share karta.

## 8. GATE numerical: SDD ka output nikaalna
1. Parse tree banao.
2. Attributes ka **dependency order** dekho (synthesized: neeche se upar).
3. Semantic rule apply karke value compute.

**Example (GATE-type):** 
```
S → aS { print 1 }   ya  S → a { print 2 }
```
Postfix actions (production ke end me) **input `aaa`** par: reductions order: S→a (print 2) pehle, phir S→aS (print 1) do baar ⇒ **output 2 1 1**.
(Agar actions production ke **shuru** me hote (pre-order) to output alag.) **Action position matter karta.**

## 9. Quick Revision
- Synthesized: children se; Inherited: parent/left siblings se.
- S-attributed: sirf synthesized, bottom-up/LR; L-attributed: inherited restricted, LL.
- S ⊂ L ⊂ SDD.
- Dependency graph acyclic zaroori.
- Postfix SDT: action end me, reduce par.
- Type declarations = inherited attribute.

### Practice
1. `E → E1 + T {E.val = E1.val + T.val}` attribute kaunsa? *(Synthesized)*
2. L-attributed me inherited attribute kis se le sakta? *(Parent aur left siblings)*
3. Bottom-up parser ke saath kaunsa SDD natural fit? *(S-attributed)*
4. `a * b + c` SDT (infix→postfix) output? *(a b * c +)*
