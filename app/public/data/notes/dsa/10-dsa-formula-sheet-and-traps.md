# DSA: Formula Sheet, Comparison Tables aur GATE Traps
<!-- topics: algorithms/sorting, algorithms/recurrence-relation, algorithms/time-complexity, programming-and-ds-data-structures/binary-tree, programming-and-ds-data-structures/binary-search-tree -->

## 1. Data structure operations (worst case)

| Structure | Access | Search | Insert | Delete | Note |
|---|---|---|---|---|---|
| Array | O(1) | O(n) (sorted: log n) | O(n) | O(n) | contiguous |
| Linked list | O(n) | O(n) | O(1) at head/given ptr | O(1) given ptr (DLL) | |
| Stack/Queue | - | O(n) | O(1) | O(1) | |
| BST | - | O(h) → O(n) | O(h) | O(h) | skewed n |
| AVL | - | O(log n) | O(log n) | O(log n) | ≤ 1 rotation insert |
| Binary heap | max O(1) | O(n) | O(log n) | O(log n) root | build O(n) |
| Hash (chaining) | - | avg O(1), worst O(n) | O(1) | avg O(1) | α = n/m |

## 2. Sorting summary
n log n: merge (stable, O(n) space), heap (in-place), quick (avg; worst n²).
n²: bubble, selection, insertion (best O(n)).
Linear: counting O(n+k), radix O(d(n+k)), bucket.
Comparison sort lower bound Ω(n log n) = ⌈log₂ n!⌉.
Stable: bubble, insertion, merge, counting, radix. Unstable: selection, quick, heap.

## 3. Formula sheet

**Trees:** edges n−1; full binary L = I + 1; full k-ary L = (k−1)I + 1; min height ⌊log₂ n⌋; binary trees/BSTs = Catalan C(2n,n)/(n+1); AVL min nodes N(h) = N(h−1)+N(h−2)+1 (1, 2, 4, 7, 12, 20, 33).
**Heap:** parent ⌊i/2⌋, children 2i, 2i+1; leaves ⌊n/2⌋+1..n; height ⌊log₂ n⌋.
**Hashing:** α = n/m; chaining avg 1 + α; open addressing unsuccessful 1/(1−α); expected colliding pairs C(n,2)/m.
**Recurrences:** Master (compare f(n) vs n^(log_b a)); T(n)=T(n−1)+n → n²; 2T(n−1)+1 → 2ⁿ; T(√n)+1 → log log n; Fibonacci naive φⁿ.
**Searching:** binary ⌊log₂n⌋+1; linear (n+1)/2; min-max ⌈3n/2⌉−2; merge m+n−1.
**DP:** LCS O(mn); knapsack O(nW); matrix chain O(n³) cost pqr; Floyd O(V³); LIS O(n²)/O(n log n).
**Graphs:** BFS/DFS O(V+E); Dijkstra O((V+E) log V); Bellman-Ford O(VE); Kruskal O(E log E); Prim O(E log V); adjacency matrix V² space.
**Greedy:** activity selection earliest finish; Huffman cost = Σ internal nodes; fractional knapsack ratio.
**C:** pointer + n = n × size; a[i] = *(a+i); struct padding; static once init.

## 4. Top 25 Traps
1. Height definition (edges vs nodes).
2. Full vs complete vs perfect tree.
3. Pre+Post ≠ unique tree.
4. BST inorder sorted, preorder nahi.
5. Delete 2-children BST = inorder successor.
6. AVL insert ≤ 1 rotation; delete O(log n) rotations.
7. Build-heap O(n) (n log n nahi).
8. Heap search O(n); min of max-heap in leaves.
9. Circular queue full: (rear+1)%n == front.
10. Delete given node singly LL O(n) (prev); doubly O(1).
11. Postfix evaluation: pehla pop = right operand.
12. Right-assoc ^ stack me equal precedence pe push.
13. Stack permutation count Catalan.
14. Selection sort swaps ≤ n−1.
15. Insertion sort O(n) best; shifts = inversions.
16. Quick sort worst: sorted array with naive pivot.
17. Merge sort O(n) extra space.
18. Master theorem regularity for case 3; f = n/log n not applicable.
19. 2^(2n) ≠ O(2ⁿ); log(n!) = Θ(n log n).
20. Dijkstra negative edge fails.
21. Constant add to weights changes shortest path, not MST.
22. Directed cycle ⟺ back edge.
23. Topological sort only DAG.
24. Greedy fails: 0/1 knapsack, arbitrary coin change.
25. Knapsack O(nW) pseudo-polynomial.

## 5. How to solve
- **Trace with a table**: sorting passes, heap ops, hash insertion, BST/AVL build.
- **Complexity**: loop nesting → sum; recursion → Master/tree.
- **Pointers**: memory diagram (box and arrow).
- **DP**: small table by hand for LCS/knapsack/matrix chain.
- **Graphs**: adjacency list likho, queue/stack simulate.

## 6. Practice order (web app)
Subjects → Data Structures & Algorithms: **Asymptotic/Recurrence → Sorting → Trees/BST/Heap → Graph (BFS/DFS/MST/Shortest) → DP → C output/pointers → Hashing → Greedy**. Har topic ke PYQs pattern-wise diye hain.
