# Intermediate Code, Runtime Environment, Scope aur Parameter Passing
<!-- topics: compiler-design/intermediate-code, compiler-design/runtime-environment, compiler-design/variable-scope, compiler-design/backpatching, compiler-design/static-single-assignment, compiler-design/parameter-passing -->

# Part A: Intermediate Code

## 1. IR kyun?
Source aur machine code ke beech **machine-independent** representation: **portability** (n × m ki jagah n + m compilers), **optimization** aasan.
**Forms:** **Syntax tree / DAG**, **postfix**, **three-address code (TAC)**, **control flow graph**.

## 2. Three-Address Code (TAC)
Har instruction me **max 3 addresses**: `x = y op z`. Temporaries (t1, t2...) compiler banata.
**Example:** `a = b * c + d * e` →
```
t1 = b * c
t2 = d * e
a  = t1 + t2
```
**Instructions ke types:** assignment `x = y op z`, unary `x = op y`, copy `x = y`, **unconditional jump** `goto L`, **conditional** `if x relop y goto L`, **procedure** `param x; call p, n; return y`, **indexed** `x = y[i]`, `x[i] = y`, address/pointer `x = &y`, `x = *y`.

### TAC ki representation
| | Structure | Fayda |
|---|---|---|
| **Quadruples** | (op, arg1, arg2, result) — 4 fields | Reordering/optimization easy (result explicit) |
| **Triples** | (op, arg1, arg2) — result = **instruction position** | Space kam, par **reorder mushkil** |
| **Indirect triples** | Triples + **pointer list (instruction order)** | Reordering easy, space kam |

`a = -b * (c + d)`: quads: t1 = −b; t2 = c + d; t3 = t1 * t2; a = t3 → **4 instructions/quads**.
**Triples me 3 entries** (a = t3 ki alag entry ya assignment fold).

### Array address translation
1D: `A[i]` = base + (i − low) × w.
**2D row-major** A[i][j] (R×C): base + ((i − low₁) × C + (j − low₂)) × w.
**TAC example:** `x = A[i][j]` (int 4B, C = 10):
```
t1 = i * 10
t2 = t1 + j
t3 = t2 * 4
x  = A[t3]
```

### Boolean expression aur control flow
`if (a < b) goto L1 else goto L2`. **Short-circuit evaluation** se jumping code.
**Backpatching:** forward jumps ke targets baad me fill — **truelist/falselist** (jaha target abhi pata nahi unki list), **`backpatch(list, label)`** se patch; **ek pass** me code generate.

### Basic Blocks aur Flow Graph
**Basic block** = instructions ka lagatar sequence: **ek entry (pehli instruction), ek exit (last)**, beech me jump/label nahi.
**Leaders (block ki pehli instruction) ke rules:**
1. Program ki **pehli instruction**.
2. **Kisi jump ka target.**
3. **Jump ke turant baad wali instruction.**
**Blocks count = leaders count.** Flow graph: nodes = blocks, edges = control flow.

### DAG of basic block
**Common subexpressions** share. `a = b + c; d = b + c; e = a + d` → `b + c` ek node.
**Nodes count = distinct operands (leaves) + distinct operations.** Redefinition ke baad operand ka **naya version**.

### Static Single Assignment (SSA)
**Har variable ko sirf ek jagah assign**; naye definition par naya naam (x₁, x₂). Join points par **φ-function** (`x₃ = φ(x₁, x₂)`). **Min temporaries** = distinct definitions ki count. Optimization (constant propagation, dead code) aasan.

# Part B: Runtime Environment

## 3. Storage organization
```
| Code (text) |
| Static data (globals/statics) |
| Heap  (↑ dynamic allocation) |
|   ...free... |
| Stack (↓ activation records) |
```

### Allocation strategies
| | Static | Stack | Heap |
|---|---|---|---|
| Kab | Compile time | Call/return (LIFO) | Explicit (malloc/new), GC |
| Recursion | **Nahi** (ek copy) | **Haan** | - |
| Example | Global, FORTRAN | Locals, params | Linked structures, dynamic arrays |

- **Recursion ke liye static allocation kaafi nahi** → stack chahiye.
- **Heap chahiye** jab **objects ka lifetime call se zyada** (returned pointers, dynamic data structures, **compile time me size unknown arrays**). Sirf recursion/dynamic scoping ke liye heap zaroori nahi.
- **Garbage collection:** reference counting, mark-and-sweep, copying. **Dangling pointer, memory leak.**

## 4. Activation Record (Stack Frame)
Har procedure call ke liye stack par ek record:
```
| Actual parameters      |
| Return value           |
| Control link (caller's AR pointer / dynamic link) |
| Access link (static link: non-local variables tak) |
| Saved machine state (return address, registers) |
| Local variables        |
| Temporaries            |
```
- **Control (dynamic) link:** caller ke AR ko. **Access (static) link:** lexically enclosing procedure ke AR ko (nested procedures me non-local access ke liye).
- **Display:** non-local variables ke liye **array of pointers** (nesting level → AR); access **faster** (access link chain se).
- **Call sequence:** caller parameters push, return address; callee AR banata. **Return sequence:** return value, restore, pop.
- **Activation tree:** calls ka tree; **call sequence = preorder traversal**; **stack = root se current node tak path**.

## 5. Scope aur Binding

**Static (lexical) scope:** identifier ka binding **program text** (nesting) se, **compile time**. Sab modern languages (C, Java, Pascal).
**Dynamic scope:** binding **call chain (runtime)** se; sabse recent active binding.

**Example (fark dikhata):**
```
int x = 10;
void f() { print(x); }
void g() { int x = 20; f(); }
main() { g(); }
```
- **Static scope:** f ka `x` = global → prints **10**.
- **Dynamic scope:** f ka caller g → g ka `x` = 20 → prints **20**.

**Nested procedures + static scope:** access link chain se enclosing scope.
**Block-structured languages me name resolution:** innermost enclosing declaration.

## 6. Parameter Passing

| Method | Kaise | Effect |
|---|---|---|
| **Call by value** | Actual ki **copy** | Callee ka change caller ko nahi |
| **Call by reference** | **Address** (alias) | Change caller me dikhta; `swap(x,x)` alias |
| **Copy-restore (value-result)** | Copy in, **return par copy back** | Aliasing me alag result |
| **Call by name** | **Expression textual substitution**, har use par re-evaluate | Side effects aur alag result (Jensen's device) |

**Example (call by name vs reference):** `swap(i, a[i])` with call by name: `t = i; i = a[i]; a[i] = t` — `a[i]` ab **naya i** use karta ⇒ galat swap. Reference/value me sahi.
**Example (copy-restore vs reference):** `f(x, x)` jahan f me pehla param badalta: reference me dono alias; copy-restore me exit par ek value overwrite.

## 7. Compilers ki puri tasveer: kaun kis phase me
- **Dynamic memory allocation:** **runtime** (compile time nahi).
- **Type checking, symbol table management, inline expansion, constant folding:** compile time.
- **Loader/linker relocation:** link/load time.

## 8. Quick Revision
- TAC: max 3 addresses; quads (explicit result), triples (position), indirect triples.
- Leaders: first instr, jump target, instr after jump; blocks = leaders.
- DAG: common subexpression share. SSA: one assignment per variable, φ at joins.
- Recursion ⇒ stack allocation; unknown-size/dynamic lifetime ⇒ heap.
- AR: params, return value, control link, access link, saved state, locals.
- Static scope compile-time lexical; dynamic scope runtime call chain.
- Call by name = textual substitution; by value = copy.

### Practice
1. `x = a + b * c - d` TAC instructions? *(t1 = b*c; t2 = a + t1; x = t2 - d → 3)*
2. Leaders: 10 instructions, jump targets at 4, 7, instruction 5 conditional jump: leaders? *(1, 4, 6 (after jump at 5), 7 → 4)*
3. Static vs dynamic scope example ka static output? *(global x)*
4. Activation tree ki call sequence kaunsi traversal? *(Preorder)*
