# Code Optimization, Data-Flow Analysis aur Code Generation
<!-- topics: compiler-design/code-optimization, compiler-design/live-variable-analysis, compiler-design/basic-blocks, compiler-design/directed-acyclic-graph, compiler-design/register-allocation -->

## 1. Optimization ka goal
Program ka **meaning same** rakhte hue **speed ↑ / size ↓ / power ↓**. **Intermediate code par** kiya jaata (**machine independent**, portability) + kuch **machine dependent** (peephole, register allocation).

## 2. Machine-independent optimizations

### Local (basic block ke andar)
| Technique | Before → After |
|---|---|
| **Constant folding** | `x = 2 * 3` → `x = 6` |
| **Constant propagation** | `a = 5; b = a + 1` → `b = 6` |
| **Copy propagation** | `t = x; y = t + 1` → `y = x + 1` |
| **Common subexpression elimination (CSE)** | `a = b + c; d = b + c` → `d = a` |
| **Dead code elimination** | Jo value kabhi use nahi hoti wo statement hatao |
| **Strength reduction** | `x * 2` → `x << 1`, `x * 8` → shift; `i * 4` → addition |
| **Algebraic simplification** | `x + 0`, `x * 1` → `x`; `x * 0` → 0 |

### Loop optimizations (**loops me time sabse zyada**: 90-10 rule)
- **Loop-invariant code motion (code hoisting):** loop ke andar wo computation jo iterations me **badalti nahi** → loop ke bahar.
  ```
  for (i=0;i<n;i++) x[i] = y * z + i;   →   t = y*z; for(...) x[i] = t + i;
  ```
- **Induction variable elimination & strength reduction:** `j = 4*i` ko `j = j + 4` se replace.
- **Loop unrolling:** iterations ko replicate (branch overhead ↓).
- **Loop fusion/interchange.**
- **Inline expansion:** function call ko body se replace (call overhead ↓, code size ↑).

### Peephole optimization
Chhoti window (2-3 instructions) me pattern replace: redundant load/store, jump-to-jump, `add r,0`. **Machine dependent.**

## 3. Data-Flow Analysis

**Control flow graph (CFG)** par har point par kuch **facts** compute (sets), **iteratively fixed point** tak.

### Reaching Definitions (forward, ∪)
Definition d point p tak **pahunchti** hai (beech me kill nahi). **OUT[B] = gen[B] ∪ (IN[B] − kill[B])**, **IN[B] = ∪ OUT[pred]**.
**Use:** constant propagation, def-use chains.

### Available Expressions (forward, ∩)
Expression `x op y` **har path par pehle compute** ho chuki aur operands badle nahi. **IN[B] = ∩ OUT[pred]**. **Use:** **global CSE**.

### Live Variable Analysis (**backward**, ∪)
Variable **x live** point p par agar **p se aage kahin x ka use** ho (beech me redefine kiye bina). 
> **IN[B] = use[B] ∪ (OUT[B] − def[B])**
> **OUT[B] = ∪ IN[S]  (S = successors)**
> **use[B]** = B me x ka pehla use (definition se pehle). **def[B]** = B me x ka definition.

**Use:** **register allocation** (live range), **dead code elimination**.

**Worked example (liveness):**
```
B1: a = 1; b = 2;         (use: -,   def: a, b)
B2: c = a + b;            (use: a,b, def: c)
B3: d = c * 2; e = d;     (use: c,   def: d, e)   ← exit, e used later? assume nothing after
B1 → B2 → B3
```
- **OUT[B3] = ∅** (aage kuch nahi). **IN[B3] = {c}** (c use hua pehle, d, e define).
- **OUT[B2] = IN[B3] = {c}**. IN[B2] = {a,b} ∪ ({c} − {c}) = **{a, b}**.
- **OUT[B1] = {a,b}**; IN[B1] = ∅ ∪ ({a,b} − {a,b}) = **∅**.
Dead: `e = d` (e kabhi use nahi) — dead code.

**Very busy (anticipable) expressions (backward, ∩)**: code hoisting.

**Framework summary:**
| Analysis | Direction | Meet | Use |
|---|---|---|---|
| Reaching definitions | Forward | ∪ | Const prop |
| Available expressions | Forward | **∩** | Global CSE |
| **Live variables** | **Backward** | ∪ | Reg alloc, dead code |
| Very busy expressions | Backward | ∩ | Hoisting |

**Iterative algorithm** monotone framework me **converge** karta.

## 4. DAG aur CSE
Basic block ke DAG me **common subexpression ek node**. **Node count** = distinct values. Statement `a = b + c; c = a + d; d = b + c; e = d − b; a = e + b`: `b + c` dobara nahi (kyunki c badla ⇒ naya version) — dhyaan se versions dekho.
**Min nodes/edges GATE numerical:** har distinct operand/operation ek node; interior node ke 2 edges.

## 5. Register Allocation aur Assignment

Limited registers, zyada variables ⇒ kuch **spill** (memory).
- **Live range** overlap ⇒ same register nahi.
- **Interference graph:** node = variables, edge = ek saath live. **Graph colouring: k colours = k registers.** **Chromatic number ≤ k** ⇒ spill nahi. NP-complete, heuristics.
- **Live variable analysis** se live ranges.

**Example:** live ranges a[1–4], b[2–5], c[5–6]: a–b overlap, b–c overlap (at 5), a–c nahi ⇒ **2 registers** kaafi (a,c same).

### Sethi–Ullman (expression tree ke liye min registers)
Label(leaf) = 1 (agar left child) ya 0 (right leaf as memory operand). Internal: **agar l, r labels alag: max(l, r); barabar to l + 1**.
**Example:** `(a + b) * (c + d)`: a+b: leaves 1,1 → 2; c+d: 2; root: barabar (2,2) → **3 registers**.
(Load-store machine me leaf 1 hi.)

## 6. Code Generation (target code)

**Kaam:** instruction selection, register allocation/assignment, instruction ordering.
- **getReg()** function: LHS ke liye register chuno.
- **Register descriptor** (kaun register kis variable ko hold), **address descriptor** (variable kahan hai).
- **Basic block level code generation**: next-use information se register free.
- **Target machine:** load/store (`LD R, x`, `ST x, R`, `ADD R1, R2, R3`).

**Example:** `t = a - b; u = a - c; v = t + u; d = v + u`:
```
LD R1, a ; LD R2, b ; SUB R2, R1, R2 (t) ;
LD R3, c ; SUB R1, R1, R3 (u) ; ADD R3, R2, R1 (v) ; ADD R2, R3, R1 (d) ; ST d, R2
```
(3 registers kaafi.)

## 7. Horner's rule (polynomial evaluation)
`p(x) = a₀ + a₁x + ... + aₙxⁿ` ko `a₀ + x(a₁ + x(a₂ + ...))` se: **n multiplications + n additions = 2n** operations, sirf **ek temporary**. Naive ~ n(n+1)/2 mults. **Minimum arithmetic ops = 2n.**

## 8. Optimization ke GATE sawal
1. **Kaunsi optimization** (CSE, invariant motion, strength reduction) snippet me.
2. **Live variables / live-out set** given CFG.
3. **Kitne registers** (interference graph colouring).
4. **Kaunsi analysis kis direction** aur meet.
5. **Redundant expression** (available expressions).
6. **Statements dead code**.

**Example (loop-invariant):**
```
for (i = 0; i < 200; i += 2) { if (z > i) { p = p + x + 3; q = q + y->f1; } ... }
```
`x + 3`, `y->f1` loop me change nahi (agar loop me x, y modify nahi) ⇒ **hoist**.

## 9. Quick Revision
- Constant folding, CSE, strength reduction, dead code, loop-invariant motion, unrolling, inlining.
- Live variable: **backward**, IN = use ∪ (OUT − def), meet ∪. Available exprs: forward, ∩.
- Register allocation = graph colouring; live-range overlap ⇒ interference.
- Sethi-Ullman: equal labels ⇒ +1.
- Horner: 2n ops, one temp.
- Optimization pehle IR par (machine independent), peephole/regalloc machine dependent.

### Practice
1. `IN[B] = use ∪ (OUT − def)` kaunsi analysis? *(Live variables)*
2. `(a+b)*(c+d)` min registers? *(3)*
3. `x = y * 8` optimize? *(Strength reduction: x = y << 3)*
4. Degree 4 polynomial Horner ops? *(4 mult + 4 add = 8)*
