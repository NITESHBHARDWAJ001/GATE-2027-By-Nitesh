# Dynamic Programming: LCS, Knapsack, Matrix Chain, LIS, Edit Distance
<!-- topics: algorithms/dynamic-programming, algorithms/matrix-chain-ordering -->

## 1. DP kab lagate hain?

1. **Optimal substructure**: bade problem ka optimal answer chhote subproblems ke optimal se bane.
2. **Overlapping subproblems**: wahi subproblem baar-baar (isliye table me store).

**Approach:** (a) **Top-down memoization** (recursion + cache), (b) **Bottom-up tabulation** (table fill).
**Complexity = (#states) × (transition cost).**

**Steps:** state define → recurrence → base case → order of filling → answer kahan.

## 2. Fibonacci (sabse simple)
Naive recursion **O(φⁿ)**; DP **O(n)** time, O(1) space (last two).

## 3. Longest Common Subsequence (LCS)

X (m), Y (n). **L[i][j]** = X[1..i], Y[1..j] ka LCS length.
```
L[i][j] = L[i-1][j-1] + 1            if X[i] == Y[j]
        = max(L[i-1][j], L[i][j-1])   otherwise
L[0][*] = L[*][0] = 0
```
**Time/space O(mn)** (space O(min(m,n)) sirf length ke liye).

**Example:** X = "ABCBDAB", Y = "BDCABA" → **LCS length 4** (e.g., BCBA).
Chhota: X = "ABCD", Y = "ACBD": LCS = "ABD" ya "ACD" → **3**.

**Subsequence (non-contiguous)** vs **substring (contiguous)**: substring me match par diagonal +1 warna **0** (reset).
**Longest palindromic subsequence** = LCS(s, reverse(s)).
**Shortest common supersequence** length = m + n − LCS.

## 4. Longest Increasing Subsequence (LIS)

**O(n²) DP:** dp[i] = 1 + max(dp[j]) jahan j < i, a[j] < a[i]. Answer = max dp.
**O(n log n)**: patience/binary search tails array.
**Example:** [10, 9, 2, 5, 3, 7, 101, 18] → **4** (2, 5, 7, 101 ya 2, 3, 7, 18).

## 5. 0/1 Knapsack

n items (wᵢ, vᵢ), capacity W. **K[i][w]** = pehle i items, capacity w ka max value.
```
K[i][w] = K[i-1][w]                                  if w_i > w
        = max(K[i-1][w], v_i + K[i-1][w - w_i])       otherwise
```
**Time O(nW)** — **pseudo-polynomial** (W ke value par, input size ke bits par nahi). 0/1 knapsack **NP-hard**.
**Example:** W = 5, items (w,v): (2,3), (3,4), (4,5), (5,6).
Best: item1 + item2 (w = 5, v = **7**). Item 4 akela = 6. **Answer 7.**

**Subset sum:** T[i][s] = T[i−1][s] ∨ T[i−1][s − aᵢ]. **O(nS)**. **Partition/equal-sum** problem isi se.
**Unbounded knapsack / coin change (ways):** ways[s] += ways[s − coin]. **Min coins:** dp[s] = min(dp[s − c] + 1).
**Example (min coins {1,3,4}, amount 6):** dp: 0,1,2,1,1,2,**2** (3+3).

## 6. Matrix Chain Multiplication

Matrices A₁..Aₙ, dimensions p₀ × p₁, p₁ × p₂, ... Parenthesization jo **scalar multiplications** minimize kare. (Product ka result same; cost alag.)
```
m[i][j] = min over k in [i, j-1] ( m[i][k] + m[k+1][j] + p_{i-1} * p_k * p_j ),   m[i][i] = 0
```
**Time O(n³), space O(n²).**
**Example:** A (10×30), B (30×5), C (5×60):
- (AB)C = 10·30·5 + 10·5·60 = 1500 + 3000 = **4500**
- A(BC) = 30·5·60 + 10·30·60 = 9000 + 18000 = 27000
→ **Min = 4500.**
p₁ × q aur q × r ka product cost = **p·q·r**.

**Number of ways to parenthesize n matrices = Catalan(n−1)** (4 matrices → 5).

## 7. Edit Distance (Levenshtein)
D[i][j] = min( D[i−1][j] + 1 (delete), D[i][j−1] + 1 (insert), D[i−1][j−1] + (X[i] ≠ Y[j]) (replace) ). **O(mn)**.
**Example:** "kitten" → "sitting" = **3** (k→s, e→i, +g).

## 8. All-pairs shortest path: Floyd–Warshall
d[i][j] = min(d[i][j], d[i][k] + d[k][j]) k = 1..V. **O(V³)**. **DP paradigm** (greedy nahi). Negative edges OK (no negative cycle). **Transitive closure (Warshall)**.

## 9. Other classics
- **Rod cutting:** r[n] = max(p[i] + r[n−i]). **O(n²)**.
- **Optimal BST**, **Longest path in DAG**, **Coin change**, **Egg dropping**, **Bellman-Ford** (DP on edges), **Travelling Salesman (Held-Karp O(n²2ⁿ))**.
- **Number of paths in grid** (only right/down): C(m+n, m) ya DP grid[i][j] = grid[i−1][j] + grid[i][j−1].
- **Longest common substring**, **Max subarray sum (Kadane)**: cur = max(a[i], cur + a[i]).

## 10. DP table reading (GATE)
- **Table L[i][j] ka koi entry batao / 2 sequences ka LCS length / kitne distinct LCS.**
- **Recurrence kya hai** (fill in the blanks).
- **Time complexity** of DP (states × work).
- **Kaunsa paradigm**: Floyd-Warshall = DP; Kruskal = greedy; Dijkstra = greedy.

## 11. Quick Revision
- DP = optimal substructure + overlapping subproblems.
- LCS: match diagonal +1 else max(top,left); O(mn).
- 0/1 knapsack O(nW) pseudo-poly; fractional = greedy.
- Matrix chain O(n³); cost p·q·r.
- LIS O(n²) / O(n log n). Edit distance O(mn).
- Floyd-Warshall O(V³) DP.

### Practice
1. LCS("AGGTAB","GXTXAYB")? *(4: GTAB)*
2. Matrix chain: 10×20, 20×30, 30×40: min mult? *((AB)C: 6000 + 12000 = 18000; A(BC): 24000 + 8000 = 32000 → 18000)*
3. 0/1 knapsack W=4: (1,15),(3,20),(4,30). *(item1 + item2 = 35; item3 = 30 → 35)*
4. Fibonacci naive calls for n=6? *(2·F(7) − 1 = 2·13 − 1 = 25)*
