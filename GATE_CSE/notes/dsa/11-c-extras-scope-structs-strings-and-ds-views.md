# C Extras: Structures, Unions, Strings, Scope, Switch, goto aur Leftover DS/Algo Views
<!-- topics: programming-programming-in-c/structure, programming-programming-in-c/union, programming-programming-in-c/strings, programming-programming-in-c/functions, programming-programming-in-c/switch-case, programming-programming-in-c/goto, programming-programming-in-c/aliasing, programming-programming-in-c/variable-binding, programming-programming-in-c/type-checking, programming-programming-in-c/programming-paradigms, programming-programming-in-c/programming-constructs, programming-programming-in-c/runtime-environment, programming-and-ds-programming/output, algorithms/recursion, algorithms/binary-heap, algorithms/binary-search-tree, algorithms/binary-tree, algorithms/tree-traversal, algorithms/directed-acyclic-graph, algorithms/number-of-swap, algorithms/uniform-hashing, programming-and-ds-data-structures/uniform-hashing, programming-and-ds-data-structures/abstract-data-type, programming-and-ds-data-structures/data-structures, programming-and-ds-data-structures/time-complexity, co-architecture/runtime-environment -->

Pichhle chapters me pointers, arrays, recursion aa chuke. Yahan **kam poochhe jaane wale par phir bhi aane wale** C aur DS topics hain (P3/P4).

## 1. Structures (struct)

- **struct** alag-alag type ke members ek block me. Members **alag alag memory** lete hain.
- **Access:** `s.x` (variable), `p->x` (pointer), `p->x` ≡ `(*p).x`.
- **Padding/alignment:** compiler har member ko uske size ke multiple par align karta hai; struct ka total size **sabse bade member ke multiple** me round up.
- **sizeof(struct)** = members + padding. Order badalne se size badal sakta hai.

```c
struct A { char c; int i; char d; };   // c(1)+pad(3)+i(4)+d(1)+pad(3) = 12
struct B { int i; char c; char d; };   // i(4)+c(1)+d(1)+pad(2)      = 8
```
- **Assignment `s2 = s1`** poora struct copy karta hai (arrays ke andar bhi). **== se compare nahi hota.**
- **Struct pass by value** hota hai (copy); pointer pass karo to original badalta hai.
- **Self-referential:** `struct node { int d; struct node *next; };` (struct ka pointer allowed, struct khud nahi).
- **Bit-fields:** `unsigned a:3;` 3 bits. Layout implementation-defined.
- **Array of struct:** `arr[i].x`; size = n × sizeof(struct).

**Example:** `struct {int a; char b;} x; sizeof(x)` (4-byte int) = **8**.
**Example:** `struct S {int a; struct S *n;}; sizeof` (32-bit machine) = 8, (64-bit) = 16 (pad 4 + 8).

## 2. Union

- **Saare members ek hi memory share** karte hain. **sizeof(union) = sabse bada member** (alignment ke saath round).
- **Ek waqt me ek hi member valid**; dusre member se padho to bytes reinterpret (implementation-defined).
```c
union U { int i; char c[4]; float f; };  // sizeof = 4
union U u; u.i = 0x01020304;
printf("%d", u.c[0]);   // little-endian: 4
```
- **struct vs union:** struct = sab members alag; union = overlay. **Tagged union** = union + tag field (kaunsa member active).
- Use: memory bachana, type punning, endianness test.

**Example:** `union {float y; long z;}` (4 B each) ⇒ 4. `union {char a[5]; int b;}` ⇒ 8 (5 → align 4 ⇒ 8).

## 3. Strings in C

- **String = char array + `'\0'`.** `char s[] = "abc"` ⇒ 4 bytes (a b c \0), **modifiable**. `char *p = "abc"` ⇒ string literal (read-only), modify = undefined.
- **`sizeof(s)` = 4 (poora array), `strlen(s)` = 3** (\0 tak, \0 exclude).
- **`sizeof(p)`** = pointer size (4/8).
- **Functions:** `strlen`, `strcpy(dst,src)`, `strcmp(a,b)` (0 = equal, <0 / >0), `strcat`, `strchr`. **strcpy destination bada hona chahiye** (buffer overflow).
- **`==` pointers compare karta hai, content nahi**; content ke liye `strcmp`.
- **Pointer walk:** `while(*p) p++;` ⇒ `p - start` = length.
- **`\0` missing** ⇒ printf/strlen memory ke aage tak padhta hai (undefined).
- `char s[3] = "abc";` ⇒ no room for `\0` (not a proper string).
- **`printf("%s", s)`** \0 tak print; **`puts`** newline add karta hai.
```c
char s[] = "GATE";
printf("%zu %zu", sizeof(s), strlen(s));   // 5 4
```
**Reverse-in-place:** two pointers (i=0, j=len-1) swap.
**Example:** `char a[]="ab\0cd"; strlen(a)` = **2**, `sizeof(a)` = 6.

## 4. Functions: evaluation order, scope, parameter passing

- **Argument evaluation order unspecified** in C: `f(i++, i++)`, `a[i] = i++` **undefined/unspecified** — GATE aksar "unspecified behaviour" option deta hai.
- **Sequence points:** `&&`, `||`, `?:`, `,` aur `;` ke baad. `&&`/`||` **short-circuit** (left se, right skip ho sakta).
- **Storage classes:** `auto` (default local), `static` (value retain, file/function private), `extern` (dusri file ka), `register` (hint).
- **Static local:** ek baar initialize, calls ke beech value bachi rehti. **Global** sabhi functions ko dikhta.
- **Recursion me static/global** shared — ek hi copy.
- **Default return type / prototype:** prototype ke bina call — purane C me implicit `int`.
- **Call by value** (C me sab). Address pass karke "call by reference" emulate.
- **Function pointer:** `int (*fp)(int)`; `fp = f; fp(3)`.
- **Variadic:** `printf(char*, ...)`.

## 5. Switch–case

```c
switch (x) {
  case 1: a();          // fall-through!
  case 2: b(); break;
  default: c();
}
```
- **`break` na ho to niche wale cases bhi chalte hain (fall-through).** x = 1 ⇒ a, b dono.
- **`default` kahin bhi ho sakta**; koi case match na ho tab chalta. Agar default beech me ho aur break na ho to uske baad wale cases chalte hain.
- Case labels **integer constant expressions**, **unique** (duplicate = compile error). Float/string case nahi.
- **Nested switch**, `continue` switch ke andar loop ko affect.
**Example:** `x=2` case 1: p; case 2: q; case 3: r; break; ⇒ q, r.

## 6. goto aur structured programming

- **goto** label tak jump: control flow samajhna mushkil ("spaghetti code"), **verification/reasoning mushkil**.
- **Structured programming:** sirf sequence, selection (if/switch), iteration (for/while) — **ek entry, ek exit** blocks. Bohm–Jacopini: har program in teen se bana sakte.
- **Legit goto use:** nested loops se bahar niklna, error cleanup.
- **`break`/`continue`** bhi limited jump hain.
- **Programming constructs:** assignment, conditional, loop, procedure call. **Loop invariant** = har iteration ke pehle sach rehne wali condition; correctness proof.

## 7. Aliasing, binding, scope, typing

- **Aliasing:** ek hi memory location ke **kai naam/pointers**. `int x; int *p=&x, *q=&x;` ⇒ `*p`, `*q`, `x` alias. Compiler optimisation rok deta ("restrict" keyword promise).
- **Binding:** name ↔ memory/value/type ka rishta; **compile-time (static)** ya **run-time (dynamic)**.
- **Static (lexical) scope:** variable **jahan likha hai** wahin se resolve (C, Pascal, Java). **Dynamic scope:** **call chain** se resolve (purani Lisp, Bash).

```c
int x = 10;
void g() { printf("%d", x); }
void f() { int x = 20; g(); }
main() { f(); }
```
Static scope ⇒ **10**; dynamic scope ⇒ **20**.
- **Static typing:** type check **compile time** (C, Java); **dynamic typing:** run time (Python). **Strong vs weak typing** (implicit conversions kitne).
- **Type equivalence:** name vs structural.
- **Implicit conversion:** int → float in mixed arithmetic; `unsigned` ke saath signed compare me signed → unsigned (−1 > 1u sach!).
- **Parameter passing:** by value, by reference, by name (macro-like, `swap(i, a[i])` me alag natija), by value-result.
```c
// call by name vs reference: swap(i, a[i])  -> tmp=i; i=a[i]; a[i]=tmp;
// name: 'a[i]' re-evaluated after i changed -> wrong element modified.
```

## 7b. Programming paradigms
- **Imperative** (C: state + commands), **object-oriented** (encapsulation, inheritance, polymorphism), **functional** (no side effects, recursion), **logic** (Prolog), **declarative** (SQL).
- **Compiled vs interpreted.**

## 8. Runtime environment (stack, heap, static)

| Area | Kya rakhta hai | Life |
|---|---|---|
| **Code/text** | Instructions | Program |
| **Static/Data** | Globals, `static` vars | Program |
| **Stack** | Local vars, params, return address (activation record) | Function call |
| **Heap** | `malloc/new` memory | Manual free |

- **Activation record:** return address, parameters, locals, saved registers, control/access link.
- **Recursion depth n ⇒ n stack frames ⇒ O(n) space.** Deep recursion ⇒ **stack overflow.**
- **Dangling pointer:** free ke baad/local ka address return. **Memory leak:** free na karna.
- **Register windows (SPARC):** har call par naya register window ⇒ memory saves kam. **Stack pointer** activation record ka top track karta.

## 9. Recursion (algorithm view) — quick patterns

- **Recurrence likho:** T(n) = (calls) T(smaller) + work.
- `f(n) = f(n-1) + f(n-1)` ⇒ **T = 2ⁿ**; `f(n) = f(n/2) + 1` ⇒ **log n**; `f(n)=f(n-1)+f(n-2)` (naive) ⇒ **≈ φⁿ**, memo ⇒ O(n).
- **Tail recursion** ⇒ loop me badal sakte (space O(1) with optimisation).
- **Number of calls** (including first): `f(n)=f(n-1)+f(n-1)`, f(1)=1: **2ⁿ − 1**.
- **Mutual recursion**; **indirect** recursion; stack depth bhi count karo.
- **Termination:** base case + har call chhoti problem.
**Example:** `g(n)`: if n≤1 return 1; return g(n/2)+g(n/2) ⇒ T(n)=2T(n/2)+1 ⇒ Θ(n).

## 10. Tree/heap/BST leftover views

- **Tree traversals:** Preorder (root L R), Inorder (L root R), Postorder (L R root), Level-order (BFS). **BST inorder = sorted.**
- **Tree reconstruct:** **inorder + (preorder ya postorder)** unique tree deta; **preorder+postorder alone** nahi (full binary tree me unique).
- **Number of binary trees / BSTs with n keys:** Catalan Cₙ = C(2n,n)/(n+1): C₃ = 5, C₄ = 14.
- **Binary tree with n₀ leaves, n₂ degree-2 nodes:** **n₀ = n₂ + 1**.
- **Full/complete/perfect** definitions; **height h max nodes 2^(h+1) − 1**; **min height ⌊log₂ n⌋**.
- **BST ops:** search/insert/delete O(h); worst O(n), balanced O(log n). **Delete:** leaf, one child, two children (inorder successor).
- **Preorder of BST se postorder:** first = root; split by <root / >root; recurse.
- **Heap (array):** parent ⌊i/2⌋, children 2i, 2i+1 (1-indexed). **Build-heap O(n).** **Max-heap me minimum leaf me.** Leaves = ⌈n/2⌉. **Second-largest = a child of root.**
- **Heap sort O(n log n)**; **meld/merge two binary heaps O(n)** (rebuild).
- **Number of swaps (sorting):** selection sort **≤ n−1**; bubble = **inversions**; insertion moves = inversions; **minimum swaps to sort permutation = n − (#cycles)**.
**Example:** permutation (2,3,1): cycle length 3 ⇒ swaps = 3 − 1 = 2.

## 11. DAG algorithms
- **DAG ⇒ topological order exists** (DFS finishing time reverse / Kahn in-degree).
- **Number of topological orders:** independent nodes ke arrangements (A→C, B→C ⇒ 2).
- **Longest/shortest path in DAG in O(V+E)** (topological order me relax) — negative edges bhi theek.
- **DAG me cycle nahi ⇒ DFS me back edge nahi.**
- **Source** in-degree 0, **sink** out-degree 0; **DP on DAG** (paths count).

## 12. Hashing extras (uniform hashing)
- **Simple uniform hashing:** har key m slots me se kisi bhi ko equally likely. **Chaining expected search:** successful ≈ 1 + α/2, unsuccessful ≈ 1 + α (α = n/m).
- **Open addressing uniform hashing assumption:** unsuccessful probes ≤ **1/(1−α)**; successful ≤ **(1/α) ln(1/(1−α))**.
- **Expected colliding pairs** n keys, m slots: C(n,2)/m. **Birthday paradox.**
- **Load factor α**: chaining me > 1 possible; open addressing me ≤ 1.

## 13. Abstract Data Type (ADT) aur time complexity

- **ADT:** **data + operations (interface)**, implementation chhupi (stack, queue, list, dictionary, priority queue).
- **Data structure = ADT ki implementation.** Stack = array ya linked list.
- **Complexity table (yaad):** array access O(1), insert middle O(n); linked list insert at head O(1), search O(n); BST avg O(log n); hash avg O(1); heap insert/extract O(log n), find-min O(1); **heap meld O(n)** (binomial/Fibonacci heaps me O(log n)/O(1)).
- **Graph representations:** adjacency **matrix** (O(V²) space, edge check O(1), dense), **list** (O(V+E), sparse, neighbour iteration). **Matching:** bipartite graph maximum matching via augmenting paths.

## 14. Quick Revision
- struct: padding, size ≥ sum; union: size = max; `==` struct pe nahi.
- `char s[]` modifiable, `char *p="…"` read-only; sizeof(s)=len+1.
- switch fall-through; duplicate case error.
- Static scope: lexical; dynamic: caller chain.
- Argument evaluation order unspecified.
- Stack = locals + frames; heap = malloc; static = globals.
- Tree reconstruct needs inorder; n₀ = n₂ + 1; Catalan for counts.
- DAG ⇒ topological sort; DAG shortest path O(V+E).
- Uniform hashing: unsuccessful 1/(1−α).

### Practice
1. `struct {char a; short b; int c;}` size (2-byte short, 4-byte int)? *(a1 + pad1 + b2 + c4 = 8)*
2. `char s[]="hello"; sizeof(s)`, `strlen(s)`? *(6, 5)*
3. x=1: `case 1: p; case 2: q; break;` kya chalega? *(p, q)*
4. Binary tree 31 leaves, all internal nodes degree 2: total nodes? *(61)*
