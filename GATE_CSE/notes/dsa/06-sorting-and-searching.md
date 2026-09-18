# Sorting aur Searching
<!-- topics: algorithms/sorting, algorithms/quick-sort, algorithms/merge-sort, algorithms/heap-sort, algorithms/insertion-sort, algorithms/selection-sort, algorithms/bubble-sort, algorithms/searching, algorithms/binary-search, algorithms/inversion, algorithms/merging -->

## 1. Sorting algorithms: master table

| Algorithm | Best | Average | Worst | Space | Stable? | In-place? |
|---|---|---|---|---|---|---|
| **Bubble** | O(n) (early exit) | n² | n² | O(1) | Haan | Haan |
| **Selection** | n² | n² | n² | O(1) | **Nahi** | Haan |
| **Insertion** | **O(n)** | n² | n² | O(1) | Haan | Haan |
| **Merge** | n log n | n log n | n log n | **O(n)** | Haan | Nahi |
| **Quick** | n log n | n log n | **n²** | O(log n) stack | Nahi | Haan |
| **Heap** | n log n | n log n | n log n | O(1) | Nahi | Haan |
| **Counting** | O(n+k) | O(n+k) | O(n+k) | O(k) | Haan | Nahi |
| **Radix** | O(d(n+k)) | | | O(n+k) | Haan | Nahi |
| **Bucket** | O(n+k) | O(n+k) | n² | O(n) | Haan | Nahi |

- **Stable** = equal keys ka relative order same rahe.
- **Comparison-based sorting ka lower bound = Ω(n log n)** (decision tree: n! leaves → height ≥ log₂ n! = Θ(n log n)).
- **Non-comparison** (counting, radix, bucket) linear ho sakte hain.

## 2. Simple sorts

### Bubble sort
Adjacent compare-swap; har pass me bada element end me. **Swaps = inversions**. Worst (reverse) swaps = n(n−1)/2. **k passes ke baad last k elements sorted**.

### Selection sort
Har pass me min dhundo, position i par swap. **Comparisons hamesha n(n−1)/2**, **swaps ≤ n−1 (O(n))**. Unstable (long-distance swap).
**Number of swaps worst case n − 1** (aur tightest bound O(n)).

### Insertion sort
Sorted prefix me har element insert. **Shifts = inversions**. Best sorted input **O(n)**; **nearly sorted (few inversions I): O(n + I)**. **Binary insertion:** comparisons O(n log n), par shifts O(n²).
**Average inversions in random permutation = n(n−1)/4**; max n(n−1)/2.

**Inversion:** pair (i < j) jahan a[i] > a[j]. Count **merge sort se O(n log n)** me.

**Example:** [3, 1, 2]: inversions (3,1),(3,2) = **2**.

## 3. Merge Sort

Divide half, sort dono, **merge**. **T(n) = 2T(n/2) + n → Θ(n log n)** sab cases. **Extra space O(n)**. **Stable**. **Linked list** ke liye best (O(1) extra).
- **Merge of two sorted lists sizes m, n:** **worst comparisons m + n − 1**, best min(m, n).
- **k sorted lists merge (total N):** heap se **O(N log k)**; optimal merge pattern (Huffman jaisa).
- **Number of comparisons (worst) merge sort n = 2ᵏ:** n log₂ n − n + 1.

**Trace:** [5,2,4,7,1,3,2,6] → halves [5,2,4,7] [1,3,2,6] → ... → [1,2,2,3,4,5,6,7].

## 4. Quick Sort

**Pivot** chuno, partition (chhote left, bade right), recursion.
- **Partition O(n).**
- **Best/Average: T(n) = 2T(n/2) + n → n log n.**
- **Worst: T(n) = T(n−1) + n → n²**: jab pivot **hamesha min ya max**: already **sorted/reverse sorted array with first/last pivot**, ya **sab elements equal (naive partition)**.
- **Random pivot / median-of-3** se worst case rare. **Median pivot (O(n) selection)** → worst O(n log n).
- **Space:** O(log n) avg stack, **worst O(n)** (tail recursion elimination se O(log n)).
- **Unstable, in-place.**
- **Split 1:9 (constant ratio) bhi O(n log n)** hota hai (T(n)=T(n/10)+T(9n/10)+n).

**Lomuto partition trace:** [7,2,1,6,8,5,3,4], pivot=4 (last): elements ≤4: 2,1,3 → [2,1,3 | 4 | 7,6,8,5] pivot final index 3.

**Quick sort ke recurrence me partition ka number of comparisons** = n−1.

## 5. Heap Sort
Build heap O(n) + n × extract O(log n) = **O(n log n)**; in-place, unstable. (Detail heap chapter me.)

## 6. Linear-time sorts

### Counting sort
Keys **0..k** range. Count array C, prefix sum, output (piche se traverse → **stable**). **O(n + k)**. k = O(n) ho to linear.
### Radix sort
Digit-by-digit (LSD), har digit par **stable** sort (counting). d digits, base b: **O(d(n + b))**. 
### Bucket sort
Uniform distribution [0,1): n buckets, har bucket sort (insertion). **Expected O(n)**.

## 7. Searching

### Linear search
O(n). **Successful average (n+1)/2 comparisons**, unsuccessful n.

### Binary search (sorted array)
`mid = low + (high − low)/2` (overflow safe). **O(log n)**; **worst-case comparisons = ⌊log₂ n⌋ + 1**.
- **Recursive binary search space** O(log n) (stack), iterative O(1).
- **Binary search tree height n hone par** O(n).

**Trace:** A = [2,5,8,12,16,23,38,56], search 23: low=0,high=7: mid=3 (12) < 23 → low=4; mid=5 (23) ✓ found (2 comparisons).

**Common bug:** `low = mid` / `high = mid` (mid ±1 nahi) → **infinite loop** (2 elements). `(low + high)/2` overflow.

### Variants
- **First occurrence / lower bound**, **bitonic search** (peak dhundo O(log n) phir dono taraf), **0s followed by 1s** (first 1 binary search se), **rotated sorted array**.
- **Interpolation search:** uniform data pe O(log log n), worst O(n).
- **Exponential search.**

### Selection (k-th smallest)
- **Quick-select:** average O(n), worst O(n²).
- **Median of medians:** worst-case O(n).
- **Min & max saath me:** **⌈3n/2⌉ − 2** comparisons (pairs method).
- **Second smallest:** n + ⌈log₂ n⌉ − 2 comparisons (tournament).

## 8. Problem patterns
1. **Sorting ke steps/pass ke baad array** (bubble/insertion/selection trace).
2. **Kitne swaps/comparisons/inversions.**
3. **Stable/in-place/worst case** identify.
4. **Recurrence quick sort** (skewed partition).
5. **Binary search bug/complexity.**
6. **Lower bound:** comparison sort me minimum comparisons ⌈log₂ n!⌉ (n=4 → ⌈log₂24⌉ = 5).

## 9. Quick Revision
- n log n: merge/heap/quick(avg). n²: bubble/selection/insertion/quick(worst).
- Stable: bubble, insertion, merge, counting, radix. Unstable: selection, quick, heap.
- Comparison lower bound Ω(n log n).
- Insertion sort = O(n + inversions); swaps in bubble = inversions.
- Selection sort swaps ≤ n − 1.
- Binary search ⌊log₂ n⌋ + 1; merge m+n−1.
- Quick worst: sorted/all-equal with naive pivot.
- Min-max together ⌈3n/2⌉ − 2.

### Practice
1. Insertion sort on [4,3,2,1]: shifts? *(6 inversions)*
2. Binary search 1000 sorted: worst comparisons? *(⌊log₂1000⌋+1 = 10)*
3. Merge two sorted lists of 7 and 9: worst comparisons? *(15)*
4. Decision tree lower bound n=5? *(⌈log₂120⌉ = 7)*
