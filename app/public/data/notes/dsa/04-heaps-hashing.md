# Heaps aur Hashing
<!-- topics: programming-and-ds-data-structures/binary-heap, programming-and-ds-data-structures/priority-queue, programming-and-ds-data-structures/hashing, algorithms/hashing, algorithms/linear-probing, algorithms/double-hashing, algorithms/heap-sort -->

# Part A: Heap

## 1. Binary Heap

**Complete binary tree** + **heap property**:
- **Max-heap:** har node ≥ apne children. Root = maximum.
- **Min-heap:** har node ≤ children. Root = minimum.

**Array representation (1-indexed):** node i ke liye
- **parent = ⌊i/2⌋, left = 2i, right = 2i + 1.**
- (0-indexed: parent (i−1)/2, left 2i+1, right 2i+2.)
- **Leaves:** indices **⌊n/2⌋ + 1 … n**. **Internal nodes: 1 … ⌊n/2⌋.**

**Height of heap with n nodes: ⌊log₂ n⌋.**

## 2. Operations

- **Insert:** end me daalo, **bubble up (sift-up)**. **O(log n)**.
- **Extract-max/min (delete root):** last element root pe, **sift-down (heapify)**. **O(log n)**.
- **Find-max:** O(1). **Delete arbitrary node / decrease-key:** O(log n).
- **Search arbitrary element:** **O(n)** (heap searching ke liye nahi).
- **Min element in max-heap:** kisi **leaf** me — check karne me **O(n)** (leaves ⌈n/2⌉).

### Build-Heap (array se heap)
Last internal node (⌊n/2⌋) se 1 tak **heapify (sift-down)**. **Time O(n)** (n log n nahi! kyunki neeche ke nodes ki height chhoti).

**Example:** array [4, 10, 3, 5, 1] max-heap banao:
- n=5, internal nodes 2,1. i=2 (10): children 5,1 → theek. i=1 (4): children 10, 3 → 10 bada, swap: [10,4,3,5,1]; 4 (index 2) ke children 5,1 → 5 > 4 swap: **[10,5,3,4,1]**.

### Insert example
Max-heap [10,5,3,4,1], insert 8: end me: [10,5,3,4,1,8]; parent of index 6 = 3 (value 3) → 8 > 3 swap: [10,5,8,4,1,3]; parent index 3?? (8 at index 3): parent index 1 (10) ≥ 8 stop. **[10,5,8,4,1,3]**.

### Heap Sort
1. Build max-heap O(n). 2. n−1 baar: root ko last se swap, heap size−−, sift-down. **Total O(n log n) worst/best/average.** **In-place**, **stable nahi**.

### Priority Queue
Heap se: insert O(log n), extract O(log n). **Kth largest:** min-heap of size k: O(n log k). **Merge k sorted lists:** heap O(N log k).

### d-ary heap
parent = ⌊(i−1)/d⌋ (0-idx), children d·i+1…d·i+d. Height log_d n. Insert O(log_d n), extract O(d log_d n).

**Meld operation:** binary heap **O(n)**; **binomial/leftist/Fibonacci heap O(log n) ya O(1)**.

### Heap validity check (GATE)
Array me har i ke liye parent ≥ child (max-heap) check. **Sorted descending array max-heap hai**; sorted ascending min-heap.

# Part B: Hashing

## 3. Hash Table

Key ko **hash function h(k)** se **slot index** me map karo. Average **O(1)** search/insert/delete.
**Load factor α = n/m** (n keys, m slots).

**Collision**: do keys same slot. Do tarike:

### (a) Chaining (open hashing)
Har slot par **linked list**. α > 1 possible.
- **Insert O(1)** (head par). **Search worst O(n)** (sab keys ek chain me), **average 1 + α** (simple uniform hashing).
- Deletion easy.

### (b) Open Addressing (closed hashing)
Sab keys table ke andar. **α ≤ 1**. Probe sequence h(k, i).
- **Linear probing:** h(k,i) = (h′(k) + i) mod m. **Primary clustering** (lambe runs).
- **Quadratic probing:** (h′ + c₁i + c₂i²) mod m. **Secondary clustering**.
- **Double hashing:** (h₁(k) + i·h₂(k)) mod m. **Clustering kam**; h₂(k) ≠ 0 aur **m ke saath coprime** (m prime achha).
- **Deletion**: **tombstone/deleted marker** zaroori (search chain na tute).

**Expected probes (uniform hashing):** unsuccessful ≈ **1/(1 − α)**; successful ≈ **(1/α) ln(1/(1 − α))**.

### Worked examples
**Linear probing:** m = 7, h(k) = k mod 7. Insert 15, 22, 8, 1 (order):
- 15 mod 7 = 1 → slot 1. 22 mod 7 = 1 → busy → slot 2. 8 mod 7 = 1 → 1,2 busy → slot 3. 1 mod 7 = 1 → 1,2,3 busy → slot 4.
Table: [ , 15, 22, 8, 1, , ].
**Chaining (same keys):** slot 1: 15 → 22 → 8 → 1 (chain length 4).

**Wrap-around:** m = 5, h = k mod 5, insert 9, 14: 9 → slot 4; 14 → 4 busy → (4+1) mod 5 = **0**.

### Hash function properties
- **Uniform distribution**, fast. Achha: `k mod m` with **m prime** (na ki power of 2, warna low bits hi chhoo).
- **Division method** `k mod m`, **multiplication method** ⌊m·(kA mod 1)⌋.
- **Universal hashing**: adversary se bachne ke liye random h.

### Chaining vs Open addressing
| | Chaining | Open addressing |
|---|---|---|
| α | > 1 ho sakta | ≤ 1 |
| Deletion | Easy | Tombstone |
| Cache | Kharab (pointers) | Achha |
| Worst search | O(n) | O(n) |
| Extra memory | Pointers | Nahi |

### Probability questions
- **m slots, n keys uniform:** ek specific slot khali rehne ki probability = (1 − 1/m)ⁿ.
- **Kam se kam ek collision** (birthday): pehli collision ~ √m keys ke baad.
- **Do keys same slot:** 1/m.
- **Expected colliding pairs = C(n,2)/m.**

**Example:** 100 keys, 1000 slots: expected colliding pairs = 4950/1000 = **4.95**.

## 4. Quick Revision
- Heap: parent ⌊i/2⌋, leaves ⌊n/2⌋+1..n, build **O(n)**, heap sort O(n log n), insert/delete O(log n).
- Max-heap ka min = leaf me (O(n) search).
- Hash: α = n/m; chaining search avg 1+α; open addressing α ≤ 1.
- Linear probing = primary clustering; double hashing = h₂ ≠ 0, coprime.
- Open addressing me deletion = tombstone.
- Unsuccessful probes 1/(1−α).

### Practice
1. n = 10 heap: leaves? *(6..10 = 5)*
2. m = 10, h = k mod 10, linear probing, insert 25, 35, 45: slots? *(5, 6, 7)*
3. α = 0.75, expected probes (unsuccessful, uniform)? *(1/0.25 = 4)*
4. Min-heap me insertion order 5, 3, 8, 1: final array? *(insert 5: [5]; 3: [3,5]; 8: [3,5,8]; 1: end → swap with 5 → swap with 3 → [1,3,8,5])*
