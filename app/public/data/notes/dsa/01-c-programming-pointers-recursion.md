# C Programming for GATE: Pointers, Arrays, Recursion, Output Tracing
<!-- topics: programming-programming-in-c/pointers, programming-programming-in-c/array, programming-programming-in-c/parameter-passing, programming-programming-in-c/recursion, programming-programming-in-c/output, programming-programming-in-c/programming-in-c -->

GATE me C ke **output-tracing** sawal aate hain. Yahan skill = **code ko dry-run karna** aur C ke rules (pointers, precedence, storage) pakke rakhna.

## 1. Data types aur operators

- `char` 1 B, `short` 2 B, `int` 4 B (typical), `long` 4/8 B, `float` 4 B, `double` 8 B, pointer 8 B (64-bit) / 4 B (32-bit).
- **Integer division truncates:** `7/2 = 3`, `-7/2 = -3`. `%` sign dividend ka: `-7 % 3 = -1`.
- `x++` (post): value use, phir badhao. `++x` (pre): pehle badhao, phir use.
- **Precedence (high → low):** `() [] -> .` > unary `! ~ ++ -- * & sizeof` > `* / %` > `+ -` > `<< >>` > `< <= > >=` > `== !=` > `&` > `^` > `|` > `&&` > `||` > `?:` > `=` > `,`.
- **`&&` aur `||` short-circuit:** `a && b`, a=0 to b evaluate nahi. `a || b`, a≠0 to b nahi.
- `=` vs `==`: `if (x = 5)` hamesha true (x=5 assign).
- **Bitwise:** `x & (x-1)` lowest set bit clear; `x << k` = x × 2^k; `x >> k` = x / 2^k (unsigned/positive).
- **Undefined behaviour:** `i = i++ + ++i;`, unspecified order of function argument evaluation (question me usually diya hota hai).

## 2. Storage classes

| Class | Scope | Lifetime | Default value |
|---|---|---|---|
| **auto** (local) | Block | Block | **Garbage** |
| **static** (local) | Block | **Poore program** (value retain) | 0 |
| **static** (global) | File | Program | 0 |
| **extern** | Global | Program | - |
| **register** | Block | Block | Garbage |

**Example (static):**
```c
int f() { static int c = 0; return ++c; }
// f(); f(); f();  ->  1, 2, 3   (c ek hi baar initialize)
```
Global/static variables **0 se initialize**, local nahi.

**Memory layout:** Text (code) | Data (global/static) | **Heap** (malloc, upar badhta) | **Stack** (locals, function frames, neeche badhta).

## 3. Arrays

- `a[i]` ≡ `*(a + i)`. **Array name = pointer to first element** (par `sizeof(a)` poora array).
- 2D array `int a[R][C]` **row-major**: address of `a[i][j]` = base + (i×C + j) × size.
- **Array bounds check nahi** hota (C me): out-of-bound = undefined.
- `sizeof(arr)/sizeof(arr[0])` = elements.

**Example:**
```c
int a[] = {10, 20, 30, 40};
int *p = a + 1;
printf("%d %d", *p, *(p + 2));   // 20 40
printf("%d", p[-1]);              // 10
```

**Strings:** `char s[] = "abc";` = `{'a','b','c','\0'}`, `sizeof(s) = 4`, `strlen(s) = 3`.
```c
char *p = "GATE2011";   // string literal (read-only)
printf("%s", p + 3);     // "E2011"
```
**char arithmetic:** `'a' + 1 = 'b'` (ASCII: 'A'=65, 'a'=97, '0'=48).

## 4. Pointers (sabse zyada GATE C)

- `int *p;` p address rakhta hai. `&x` address, `*p` value at address (dereference).
- **Pointer arithmetic element-size ke units me:** `int *p; p + 1` = address + 4.
- `p2 - p1` = elements ka farak (same array).
- **`*p++`** = `*(p++)` (value lo, phir pointer aage). **`(*p)++`** = value badhao. **`++*p`** = value badhao.
- **Pointer to pointer:** `int **pp = &p;` `**pp` = value.
- **NULL pointer** dereference = crash. **Dangling pointer:** free ke baad use.
- **void pointer** generic; deref ke liye cast.

**Example:**
```c
int x = 10, *p = &x, **q = &p;
**q = 20;              // x = 20
printf("%d", x);       // 20
```

**Function pointer:** `int (*fp)(int) = &func; fp(3);`

**malloc/free:** `int *a = malloc(n*sizeof(int));` heap; `free(a)`; memory leak = free na karna.

## 5. Parameter passing

**C me sirf call by value.** Function ko argument ki **copy** milti hai.

```c
void f(int x)   { x = 5; }        // caller ka x nahi badla
void g(int *p)  { *p = 5; }       // pointer ki copy, par *p caller ka x badalta
void h(int *p)  { p = NULL; }     // sirf local pointer copy badla, caller ka nahi
```
**Swap:**
```c
void swap(int *a, int *b) { int t = *a; *a = *b; *b = t; }   // sahi
void bad(int a, int b)    { int t = a; a = b; b = t; }        // bekaar (copy)
```
**Pointer badalna ho to pointer-to-pointer:** `void f(char **s) { *s = ...; }`.

**Call by reference vs call by name (theory):**
- **Reference:** address pass (alias).
- **Call by name:** expression har use par re-evaluate (textual substitution). Side-effect wale expression me result alag (e.g., `swap(i, a[i])` call-by-name me galat behave).
- **Macro** call-by-name jaisa: `#define SQ(x) x*x`, `SQ(a+1)` = `a+1*a+1` (parentheses zaroori).

## 6. Recursion

Function khud ko bulata hai. **Base case + recursive case**. Stack frames.

**Trace ka tarika:** har call ke liye ek "frame" table: arguments, return value.

**Example 1:**
```c
int f(int n) { if (n <= 1) return 1; return n * f(n - 1); }   // f(5) = 120
```
**Example 2 (fibonacci-type):** `fib(n) = fib(n-1) + fib(n-2)` → calls exponential ~ **2ⁿ**; f(5) me 15 calls.
**Example 3 (gcd):**
```c
int gcd(int a, int b) { return b == 0 ? a : gcd(b, a % b); }   // gcd(48, 18) -> 6
```
**Example 4 (print order):**
```c
void p(int n) { if (n == 0) return; p(n-1); printf("%d ", n); }   // p(3): 1 2 3
void q(int n) { if (n == 0) return; printf("%d ", n); q(n-1); }   // q(3): 3 2 1
```
**Time/space:** linear recursion depth n → **stack space O(n)**.

**Recursion vs static variable:** static variable calls ke beech share hota.

**Mutual/indirect recursion**, **tail recursion** (last statement recursive call; optimize ho sakti).

**Infinite recursion** → stack overflow.

**Return values me operator order:** `return f(n-1) + f(n-2);` dono evaluate.

## 7. Loops aur loop invariants

- `for(i=0; i<n; i++)` body n baar. **Loop invariant** = har iteration ke start me sach condition; **initialization, maintenance, termination** se prove.
- **Invariant example (division):** `q=0; r=x; while (r >= y) { r -= y; q++; }` invariant: **x = q·y + r**; exit par r < y → q = quotient, r = remainder.
- **Exponentiation:** `res=1; while(b) { if(b&1) res*=a; a*=a; b>>=1; }` invariant: **X^Y = res × a^b**.

## 8. Structures, unions, enums, scope

- **struct** members alag memory (padding/alignment). `sizeof(struct)` ≥ sum. `struct {char c; int i;}` = 8 (3 bytes padding).
- **union**: sab members **same memory**, size = **largest member**.
- **Scope:** inner block ka same naam outer ko shadow karta. **Dynamic scope** (theory) me call chain se binding; C **static (lexical) scope**.
- **typedef**, **enum** (0 se), **const**.
- `switch`: **break na ho to fall-through**. `default` kahin bhi.

**Example:**
```c
switch (2) { case 1: printf("A"); case 2: printf("B"); case 3: printf("C"); break; default: printf("D"); }
// BC
```

## 9. Common output-tracing traps
1. Integer division/modulo negative.
2. `printf("%d", x++ + ++x)` undefined.
3. Array name vs pointer `sizeof`.
4. Pointer arithmetic units.
5. `static` initialization once.
6. Missing `break` in switch.
7. `char` signedness / ASCII arithmetic.
8. Macro expansion (parentheses).
9. Short-circuit evaluation side effects.
10. Uninitialized local = garbage.

## 10. Quick Revision
- C = call by value; pointer copy vs pointee.
- `a[i] = *(a+i)`; row-major addressing.
- Pointer arithmetic in units of element size.
- static: once init, lifetime program.
- Recursion: base case, stack depth O(n).
- Switch fall-through; short-circuit `&&`/`||`.

### Practice
1. `int a[5]={1,2,3,4,5}; int *p = a + 2; printf("%d %d", *p, p[-1]);` *(3 2)*
2. `printf("%d", 7/2*2);` *(6, kyunki 7/2 = 3 pehle)*
3. `void f(int n){ if(n>0){ f(n-1); printf("%d", n);} }  f(3);` *(123)*
4. `struct {char c; int i;}` ka size (4-byte int, alignment)? *(8)*
5. `int x = 0; if (x = 5) printf("Y"); else printf("N");` *(Y)*
