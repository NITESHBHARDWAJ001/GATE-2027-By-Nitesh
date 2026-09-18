# Divide and Conquer aur Greedy Algorithms
<!-- topics: algorithms/algorithm-design-techniques, algorithms/algorithm-design, algorithms/greedy-algorithms, algorithms/huffman-code, algorithms/prims-algorithm, algorithms/minimum-spanning-tree, algorithms/maximum-minimum -->

## 1. Design paradigms ek nazar me

| Paradigm | Idea | Examples |
|---|---|---|
| **Divide & Conquer** | Problem ko **independent** subproblems me todo, solve, combine | Merge sort, quick sort, binary search, Strassen, closest pair |
| **Greedy** | Har step par **locally best** choice; kabhi peeche nahi | Kruskal, Prim, Dijkstra, Huffman, activity selection, fractional knapsack |
| **Dynamic Programming** | **Overlapping** subproblems ke answers store | LCS, knapsack 0/1, matrix chain, Floyd-Warshall |
| **Backtracking** | Try, fail to undo | N-queens, subset sum, sudoku |
| **Branch & Bound** | Backtracking + bounds | TSP, 0/1 knapsack |

## 2. Divide and Conquer

Steps: **Divide → Conquer (recursion) → Combine.** Complexity **Master theorem** se.

### Maximum subarray sum (D&C)
Answer = max(left half, right half, **crossing mid**). Crossing: mid se left me best suffix + right me best prefix. **T(n) = 2T(n/2) + n → O(n log n)**. (Kadane O(n).)
**Example:** [−2, 1, −3, 4, −1, 2, 1, −5, 4] → **6** (4, −1, 2, 1).

### Strassen matrix multiplication
2×2 blocks ke liye **7 multiplications** (8 nahi): T(n) = 7T(n/2) + n² → **Θ(n^log₂7) ≈ n^2.81**.

### Closest pair of points: O(n log n). Karatsuba: O(n^1.585).

### Binary search, merge sort, quick sort (pichhle chapter).

### Finding max and min together
**⌈3n/2⌉ − 2** comparisons (D&C: T(n) = 2T(n/2) + 2 → 3n/2 − 2 for n power of 2).

### Tower of Hanoi
T(n) = 2T(n−1) + 1 → **2ⁿ − 1** moves.

### Power (exponentiation)
xⁿ = (x^(n/2))² → **O(log n)** multiplications.

### Array tricks (GATE "efficient algorithm" type)
- **Leaders in array** (element > sab right ke): **right se left scan, max track: O(n)**.
- **Cyclic left rotate by k:** **reverse(0,k−1), reverse(k,n−1), reverse(0,n−1)**: O(n), O(1) space.
- **Largest span (equal sum) of two 0/1 arrays:** prefix sum difference + hashing/array: O(n).

## 3. Greedy Algorithms

**Greedy choice property** + **optimal substructure** ho to greedy sahi. Correctness proof: **exchange argument**.

### 3.1 Activity Selection
Max number of **non-overlapping** activities. **Earliest finish time** pehle (sort by finish), compatible ko lo. O(n log n).
**Example:** (start,finish): (1,4),(3,5),(0,6),(5,7),(3,9),(5,9),(6,10),(8,11),(8,12),(2,14),(12,16). Finish sorted: (1,4) lo; next start ≥ 4: (5,7) lo; next ≥ 7: (8,11) lo; next ≥ 11: (12,16) lo → **4 activities**.

### 3.2 Fractional Knapsack (greedy optimal)
Items (value vᵢ, weight wᵢ), capacity W. **Ratio vᵢ/wᵢ descending**; poora lo, aakhir me fraction. **O(n log n)**. **0/1 knapsack me greedy fail** (DP chahiye).
**Example:** W = 50; items (60,10),(100,20),(120,30): ratios 6,5,4 → 10 + 20 = 30 wt (160), phir 20 wt of item 3: 120×(20/30) = 80 → **240**.

### 3.3 Job Sequencing with Deadlines
Har job 1 unit time, deadline dᵢ, profit pᵢ. **Profit descending**; job ko uske deadline ke **latest free slot** me daalo (ya skip). O(n²) (ya union-find O(n log n)).
**Example:** jobs (deadline, profit): J1(2,100), J2(1,19), J3(2,27), J4(1,25), J5(3,15). Sort profit: J1(100), J3(27), J4(25), J2(19), J5(15). J1→slot 2; J3 (d=2) → slot 1; J4 (d=1) slot 1 filled → skip; J2 skip; J5 (d=3) → slot 3. **Jobs: J3, J1, J5, profit 142.**

### 3.4 Huffman Coding (optimal prefix code)
Characters ki **frequencies**. **Do sabse kam frequency wale nodes merge** (min-heap), naya node = sum; repeat. Left = 0, right = 1. **Kam frequency = lambe code**. Variable-length, **prefix-free**.
- **Total bits = Σ freqᵢ × code lengthᵢ** = sum of all internal node values.
- **Time O(n log n).**
- **Fixed-length** code n symbols: ⌈log₂ n⌉ bits/char.

**Example:** freq a:5, b:9, c:12, d:13, e:16, f:45.
- Merge 5+9 = 14; {12,13,14,16,45}: 12+13 = 25; {14,16,25,45}: 14+16 = 30; {25,30,45}: 25+30 = 55; {45,55}: 100.
- Internal sum = 14 + 25 + 30 + 55 + 100 = **224 bits** (frequencies in hundreds → cost 224 for 100 chars).
- Codes: f = 0 (1 bit), c = 100, d = 101, a = 1100, b = 1101, e = 111.
Fibonacci frequencies → **skewed tree** (max code length n−1).

### 3.5 Optimal Merge Pattern
Files ke sizes; kam cost merge: **hamesha do sabse chhoti files merge** (Huffman jaisa). Cost = Σ internal node sums.
**Example:** sizes 2, 3, 5, 7: 2+3=5 (cost 5); {5,5,7}: 5+5 = 10 (cost 10); {7,10}: 17 (cost 17) → **32**.

### 3.6 Minimum Spanning Tree (MST)

**Spanning tree**: connected graph ke sab vertices ko jodne wala acyclic subgraph, **V − 1 edges**. **MST** = minimum total weight.

**Cut property:** kisi cut ki **lightest crossing edge** kisi MST me hoti hai (distinct weights → sabhi MST me). **Cycle property:** kisi cycle ki **heaviest edge** MST me nahi (distinct).
**Distinct edge weights ⇒ MST unique.**

**Kruskal:** edges ko weight se sort; har edge lo agar **cycle na bane** (Union-Find). **O(E log E) = O(E log V).**
**Prim:** ek vertex se shuru, har baar tree ko bahar se jodne wali **min edge**. **Binary heap: O(E log V); adjacency matrix: O(V²); Fibonacci heap O(E + V log V).**

**Example graph:** edges: AB 4, AC 2, BC 1, BD 5, CD 8, CE 10, DE 2. 
- **Kruskal:** sorted: BC 1, AC 2, DE 2, AB 4 (A–B: A,B already connected via C → cycle skip), BD 5 (B–D: connect {A,B,C} with {D,E}) ✓. Edges: BC(1), AC(2), DE(2), BD(5) → **MST weight = 10**.
- **Prim from A:** AC(2), CB(1), then min crossing: AB skip; BD 5, CD 8, CE 10 → BD(5); then DE(2) → same tree, weight **10**.

**Number of spanning trees** of K_n = nⁿ⁻² (Cayley). Kirchhoff (matrix-tree theorem).
**Max spanning tree:** weights negate ya descending sort.
**Second best MST**, **MST me ek edge ka weight badhne/ghatne** ke effects (concept).

## 4. Greedy fail hone ke examples
- **0/1 knapsack**, **coin change** (arbitrary denominations, e.g., {1,3,4} for 6: greedy 4+1+1 = 3 coins, optimal 3+3 = 2), **shortest path with negative edges**, **TSP**.

## 5. Quick Revision
- D&C independent subproblems; DP overlapping.
- Activity selection: earliest finish. Fractional knapsack: ratio. Job sequencing: profit desc + latest slot.
- Huffman: merge two smallest; cost = sum of internal nodes.
- MST: cut property; Kruskal O(E log E), Prim O(E log V) heap.
- Distinct weights → unique MST. Spanning tree V−1 edges.
- Max & min together: ⌈3n/2⌉ − 2.

### Practice
1. Huffman: 1, 1, 2, 3, 5, 8 total cost? *(2+4+7+12+20 = 45)*
2. Spanning trees of K₄? *(4² = 16)*
3. Fractional knapsack W=10: (v,w) = (10,5),(6,4),(3,3)? *(ratios 2, 1.5, 1: 5→10; 4→6; rem 1 of item3: 1 → **17**)*
4. Coin change {1,5,6}, amount 10: greedy vs optimal? *(greedy 6+1+1+1+1 = 5 coins; optimal 5+5 = 2)*
