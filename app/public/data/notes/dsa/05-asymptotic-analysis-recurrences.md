# Algorithm Analysis: Asymptotic Notation, Time Complexity aur Recurrences
<!-- topics: algorithms/asymptotic-notations, algorithms/time-complexity, algorithms/recurrence-relation, algorithms/space-complexity, algorithms/computer-science -->

## 1. Asymptotic Notations

Input size n → ∞ par growth rate ki baat; constants aur lower-order terms ignore.

| Notation | Meaning | Formal |
|---|---|---|
| **O(g)** (Big-O) | **Upper bound** (≤) | ∃c, n₀: f(n) ≤ c·g(n) ∀ n ≥ n₀ |
| **Ω(g)** | **Lower bound** (≥) | f(n) ≥ c·g(n) |
| **Θ(g)** | **Tight** (=) | O(g) aur Ω(g) dono |
| **o(g)** | Strict upper (<) | f/g → 0 |
| **ω(g)** | Strict lower (>) | f/g → ∞ |

**Growth order (chhota → bada):**
`1 < log log n < log n < (log n)^k < √n < n < n log n < n² < n³ < 2ⁿ < n! < nⁿ`

**Comparison tricks:**
- **Limit test:** lim f/g = 0 → f = o(g); finite nonzero → Θ; ∞ → ω.
- **log ke different bases** constant se farak: log₂n = Θ(log₁₀n).
- **2ⁿ vs 2^(2n)**: 2^(2n) = 4ⁿ = **ω(2ⁿ)** (2^(n+1) = Θ(2ⁿ) but 2^(2n) ≠ O(2ⁿ)).
- **n^(log n)** > polynomial, < exponential.
- **log(n!) = Θ(n log n)** (Stirling).
- **Polynomial ka exponent matter:** n^1.5 > n log n. **n² vs n log² n**: n² bada.
- **Rules:** f = O(g) aur g = O(h) → f = O(h) (transitive). Symmetry: f = Θ(g) ⟺ g = Θ(f). Transpose: f = O(g) ⟺ g = Ω(f).
- Sum: O(f) + O(g) = O(max(f,g)). Product: O(f)·O(g) = O(f·g).

**Example:** f = 3n² + 5n + 2 = Θ(n²). f = n·log n + n = Θ(n log n).

### Best/worst/average case
- **Worst case:** max time over all inputs of size n (usually O). **Best:** min. **Average:** input distribution par expected.
- Notation (O/Θ/Ω) aur case (best/worst) **alag concepts** hain: "insertion sort ka best case Θ(n), worst case Θ(n²)". Insertion sort **Ω(n) overall, O(n²) overall**, par "Θ(n²)" overall nahi.

## 2. Time complexity of code (loops)

- **Single loop** `for(i=1;i<=n;i++)` → **Θ(n)**.
- **Nested independent** `for i:1..n for j:1..n` → Θ(n²).
- **Dependent** `for i:1..n for j:1..i` → n(n+1)/2 = Θ(n²).
- **Multiplicative loop** `for(i=1;i<n;i*=2)` → **Θ(log n)**.
- **Loop i = n; i > 1; i /= 2** → log n.
- **Square root** `for(i=1; i*i<=n; i++)` → **Θ(√n)**.
- **Nested: outer n, inner doubling** `for i:1..n { for(j=1;j<n;j*=2) }` → **Θ(n log n)**.
- **`for(i=1;i<=n;i++) for(j=i;j<=n;j+=i)`** → n/1 + n/2 + ... = **n·H(n) = Θ(n log n)** (harmonic).
- **Sum of geometric:** `for(i=1;i<n;i*=2) for(j=0;j<i;j++)` → 1+2+4+...+n = **Θ(n)**.
- **Recursion:** call tree ke total work se.
- **while(n>1) n = n/2** → log n. **while(n>1) n = √n** → **log log n**.

**Space complexity:** extra memory. Recursion depth ki stack space. **Recursive function ki space = max depth × frame size**. Example: `foo(n)` jo `foo(n-1)` bulata: **O(n) space**; binary recursion (n/2 depth) O(log n).

## 3. Recurrence Relations

### (A) Substitution / expansion (unrolling)
**T(n) = T(n−1) + n:** T(n) = n + (n−1) + ... + 1 = **Θ(n²)**.
**T(n) = T(n−1) + 1** → Θ(n). **T(n) = 2T(n−1) + 1** → **Θ(2ⁿ)** (Tower of Hanoi: 2ⁿ − 1).
**T(n) = T(n−1) + log n** → Θ(n log n). **T(n) = T(n−1) + 1/n** → Θ(log n).
**T(n) = T(√n) + 1** → **Θ(log log n)**.

### (B) Master Theorem: T(n) = a·T(n/b) + f(n), a ≥ 1, b > 1
Compare **f(n)** with **n^(log_b a)**:

| Case | Condition | Result |
|---|---|---|
| **1** | f(n) = O(n^(log_b a − ε)) (f chhota) | **Θ(n^(log_b a))** |
| **2** | f(n) = Θ(n^(log_b a) · logᵏ n), k ≥ 0 | **Θ(n^(log_b a) · log^(k+1) n)** |
| **3** | f(n) = Ω(n^(log_b a + ε)) (f bada) + **regularity** a·f(n/b) ≤ c·f(n), c<1 | **Θ(f(n))** |

**Examples:**
- T(n) = 2T(n/2) + n → n^(log₂2) = n = f → case 2 → **Θ(n log n)** (merge sort).
- T(n) = T(n/2) + 1 → n⁰ = 1 = f → **Θ(log n)** (binary search).
- T(n) = 4T(n/2) + n → n² > n → case 1 → **Θ(n²)**.
- T(n) = 8T(n/2) + n² → n³ > n² → **Θ(n³)** (naive matrix mult).
- T(n) = 7T(n/2) + n² → n^(log₂7) = n^2.81 → **Θ(n^2.81)** (Strassen).
- T(n) = 2T(n/2) + n² → f bada, case 3 → **Θ(n²)**.
- T(n) = 3T(n/2) + n → n^1.58 > n → **Θ(n^1.58)**.
- T(n) = 2T(n/2) + n log n → case 2 (k=1) → **Θ(n log² n)**.
- T(n) = T(n/2) + n → case 3 → **Θ(n)**.
- T(n) = 2T(n/2) + n/log n → Master theorem **lagu nahi** (gap) → recursion tree: Θ(n log log n).

**Master theorem lagu nahi hota jab:** a constant nahi, f polynomial se fasla (n/log n), subproblem sizes unequal.

### (C) Recursion tree
**T(n) = T(n/3) + T(2n/3) + n:** har level par ≈ n work; depth log_{3/2} n → **Θ(n log n)**.
**T(n) = T(n/2) + T(n/4) + T(n/8) + n** → geometric decreasing (7/8) → **Θ(n)**.
**Quick sort worst** T(n) = T(n−1) + n → Θ(n²); **best/avg** T(n) = 2T(n/2) + n → n log n.

### (D) Characteristic equation (linear recurrences)
**T(n) = T(n−1) + T(n−2)** → roots (1±√5)/2 → **Θ(φⁿ) ≈ 1.618ⁿ** (naive Fibonacci).
Solve: T(n) = c₁T(n−1) + c₂T(n−2): x² = c₁x + c₂.

## 4. Amortized analysis (idea)
Ek operation kabhi mehenga, par **average over sequence** sasta. **Dynamic array doubling**: n inserts total O(n) → **O(1) amortized** per insert. **Stack with multipop**, **binary counter increment** = O(1) amortized.

## 5. Complexity of common operations (yaad rakho)
| Algorithm | Complexity |
|---|---|
| Binary search | O(log n) |
| Merge sort | O(n log n) time, O(n) space |
| Quick sort avg/worst | n log n / n² |
| Heap build | O(n); heap sort n log n |
| BFS/DFS | O(V+E) |
| Dijkstra (heap) | O((V+E) log V) |
| Bellman-Ford | O(VE) |
| Floyd-Warshall | O(V³) |
| Matrix chain / LCS | O(n³) / O(mn) |

## 6. P, NP (brief, GATE me kabhi)
- **P**: polynomial time solvable. **NP**: solution polynomial time me *verify*. **NP-complete**: NP me + sabse hard (SAT, 3-SAT, clique, vertex cover, Hamiltonian cycle, subset sum, TSP decision). **NP-hard**: kam se kam NP-complete jitna hard.
- **P ⊆ NP**; P = NP? open. Agar koi NPC problem P me aayi to P = NP.
- **Reduction:** A ≤ₚ B → B easy ⇒ A easy; A hard ⇒ B hard.
- 2-SAT ∈ P; 3-SAT NPC. Halting problem undecidable (TOC).

## 7. Quick Revision
- O ≤, Ω ≥, Θ tight. log(n!) = Θ(n log n). 2^(2n) ≠ O(2ⁿ).
- Loops: i*=2 → log n; harmonic → n log n; i*i ≤ n → √n.
- Master: compare f(n) with n^(log_b a): case 1/2/3; regularity for case 3.
- T(n)=T(n−1)+n → n²; 2T(n−1)+1 → 2ⁿ; T(√n)+1 → log log n.
- Recursion space = depth.

### Practice
1. T(n) = 9T(n/3) + n. *(n² > n → Θ(n²))*
2. T(n) = 2T(n/2) + √n. *(n > √n → Θ(n))*
3. `for(i=1;i<=n;i*=2) for(j=1;j<=i;j++)` complexity? *(1+2+...+n = Θ(n))*
4. Kya 2^(n+1) = O(2ⁿ)? *(Haan, constant)* 2^(2n) = O(2ⁿ)? *(Nahi)*
