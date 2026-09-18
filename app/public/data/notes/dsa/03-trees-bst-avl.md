# Trees: Binary Tree, Traversals, BST aur AVL
<!-- topics: programming-and-ds-data-structures/binary-tree, programming-and-ds-data-structures/binary-search-tree, programming-and-ds-data-structures/tree, programming-and-ds-data-structures/avl-tree, programming-and-ds-data-structures/tree-traversal -->

## 1. Tree terminology

- **Root, parent, child, leaf (no child), internal node, siblings.**
- **Depth** node ka = root se path length (edges). **Height** node ka = node se sabse door leaf tak edges. **Tree ki height = root ki height.** (Question me *edges* ya *nodes* me definition dekho: height of single node = 0 (edges) ya 1 (nodes)).
- **Level**: root level 0. **Degree** = children ki sankhya.
- **n nodes tree me edges = n − 1.** Sum of degrees = 2(n−1).

## 2. Binary tree (har node ke ≤ 2 children)

### Counts (height h, edges me: single node h = 0)
- **Max nodes at level i:** 2ⁱ. **Max nodes in height h:** 2^(h+1) − 1.
- **Min height with n nodes:** ⌊log₂ n⌋. **Max height:** n − 1 (skewed).
- **Leaves = (nodes with 2 children) + 1**: `n₀ = n₂ + 1`.
- **Full binary tree** (har node 0 ya 2 children): **L = I + 1**, total n = 2I + 1.
- **Complete binary tree**: last level ko chhodkar sab full; last level left se filled. **Heap ka shape.**
- **Perfect**: sab leaves same level, n = 2^(h+1) − 1.
- **k-ary full tree:** **L = (k − 1)I + 1**, total n = kI + 1.

**Example:** full ternary tree, 4 internal nodes: L = 2×4 + 1 = **9**; n = 13.

### Number of binary trees
- **Unlabeled binary trees with n nodes = Catalan C(2n,n)/(n+1):** n=3 → **5**.
- **Labeled** binary trees (distinct keys, structure + labels) = Catalan × n!.
- **BSTs with n distinct keys** = Catalan(n) (n=3 → 5, n=4 → 14).

## 3. Traversals

```
Inorder   : Left, Root, Right  (LNR)
Preorder  : Root, Left, Right  (NLR)
Postorder : Left, Right, Root  (LRN)
Level order: BFS (queue)
```
**Example tree:** root 1; left 2 (children 4,5); right 3.
- Inorder: **4 2 5 1 3**. Preorder: **1 2 4 5 3**. Postorder: **4 5 2 3 1**. Level: **1 2 3 4 5**.

### Reconstruction
- **Inorder + Preorder** ya **Inorder + Postorder** se **unique** tree.
- **Preorder + Postorder** se generally **unique nahi** (full tree ho to unique).
- **BST ka preorder (ya postorder) akela** unique BST deta hai (inorder sorted pata).

**Method (In + Pre):** preorder ka pehla = root; inorder me root ke left = left subtree; recursion.
**Example:** Pre: A B D E C; In: D B E A C → root A; left {D,B,E}, right {C}; left root B; ... → A(B(D,E),C).

**Post + In:** postorder ka **last** = root.

**Recursive traversal complexity:** O(n) time, O(h) stack.

**Threaded tree**: null pointers ko inorder predecessor/successor se jodo; stack-free traversal.
**Morris traversal**: O(1) extra space.

## 4. Binary Search Tree (BST)

**Property:** left subtree keys < node < right subtree keys. **Inorder = sorted ascending.**

### Operations
- **Search / Insert:** root se compare karke chalo. **Time O(h)**: balanced **O(log n)**, skewed **O(n)**.
- **Delete:** 3 cases:
  1. Leaf: seedha hataao.
  2. Ek child: child se replace.
  3. Do children: **inorder successor** (right subtree ka min) ya predecessor se replace, phir usko delete.
- **Min:** leftmost. **Max:** rightmost. **Successor/predecessor** O(h).

**Insertion order se shape:** sorted insertion (1,2,3,4) → **skewed (right chain), height n−1**. Random insertion → expected height O(log n).

**Example:** insert 50, 30, 70, 20, 40, 60, 80:
```
        50
      /    \
    30      70
   /  \    /  \
  20  40  60  80     inorder: 20 30 40 50 60 70 80
```
Height 2 (edges). 

**Preorder → BST:** 50 30 20 40 70 60 80 → same tree.

**Important:** kisi bhi BST ka inorder sorted; **preorder/postorder sorted nahi**.

**Number of comparisons for successful search** = depth + 1.

**Check "kya ye BST hai?" ke liye:** har node ka valid range (min,max) pass karo (sirf parent se compare kaafi nahi). Ya inorder sorted check.

**Height ke saath keys/complexities:** n nodes ka **max height n−1**; BST ka **average search O(log n)**.

## 5. AVL Tree (self-balancing BST)

**Balance factor BF = height(left) − height(right) ∈ {−1, 0, +1}** har node par. Height **O(log n)** guarantee → search/insert/delete **O(log n) worst**.

### Rotations
Insert/delete ke baad BF ±2 ho to rotate:
| Case | Kaunsa imbalance | Fix |
|---|---|---|
| **LL** | Left child ke left me insert | **Right rotation** |
| **RR** | Right child ke right me | **Left rotation** |
| **LR** | Left child ke right me | Left rotate (child), phir Right rotate |
| **RL** | Right child ke left me | Right rotate (child), phir Left rotate |

**Example (RR):** insert 10, 20, 30 → 10 ka BF = −2 (right heavy, RR) → left rotation → root 20, children 10, 30.
**Example (LR):** insert 30, 10, 20 → LR → double rotation → root 20.

**Insertion me maximum ek (single/double) rotation** sufficient. **Deletion me O(log n) rotations** tak ho sakti hain.

### AVL ke counts (GATE favourite)
**Minimum nodes N(h) in AVL of height h:**
> **N(h) = N(h−1) + N(h−2) + 1**, N(0) = 1 (single node), N(1) = 2.

N: 1, 2, 4, 7, 12, 20, 33, ... (h = 0,1,2,...). (Fibonacci-like.)
**Maximum height of AVL with n nodes:** ≈ **1.44 log₂(n+2)** (O(log n)). Kisi n ke liye max h = wo sabse bada h jiska N(h) ≤ n.

**Example:** n = 12 nodes ka max height? N(4) = 12 ≤ 12 → **h = 4** (edges, single node = 0).

**Red-Black tree** (concept): balance loose (height ≤ 2 log(n+1)), **insert/delete fewer rotations**; libraries me. **B-tree** disk ke liye.

## 6. Heap (short; detail agle chapter me)
Complete binary tree + heap property. Array representation.

## 7. Common problem patterns
1. **Traversal se tree reconstruct / doosri traversal nikalo.**
2. **Kitne nodes/leaves/height** given formula se.
3. **BST me insertion/deletion trace** aur inorder/preorder.
4. **AVL me rotations ki count / final tree / min nodes.**
5. **Kya sequence valid BST search path hai?** (visited keys ka order: har step pichli range ko narrow karta.) Search sequence me koi key jo range se bahar aa jaaye to invalid.

**Search path validity example:** koi key dhundhne ke liye visited keys: **60, 40, 50, 30**?
- 60 ke baad chhota ja rahe hain → interval (−∞, 60). 40 → hum 40 se bada dhundh rahe hain to right gaye: interval (40, 60). 50 → target < 50: interval (40, 50). Ab **30** aaya jo (40, 50) ke bahar hai ⇒ **ye sequence impossible**.
Rule: har agla visited key **current open interval ke andar** hona chahiye.

## 8. Quick Revision
- n nodes → n−1 edges; L = I + 1 (full binary); L = (k−1)I + 1 (full k-ary).
- Binary trees with n nodes = Catalan; min height ⌊log₂ n⌋.
- In+Pre or In+Post unique; Pre+Post nahi.
- BST inorder sorted; delete 2 children = inorder successor.
- AVL: |BF| ≤ 1; N(h) = N(h−1)+N(h−2)+1; insert me ≤ 1 rotation.
- Skewed BST: O(n).

### Practice
1. Full binary tree me 100 leaves: internal? *(99)*
2. Binary trees with 4 nodes? *(14)*
3. AVL of height 3 (edges): min nodes? *(N(3) = 7)*
4. Inorder: 4 2 5 1 3; Preorder: 1 2 4 5 3. Postorder? *(4 5 2 3 1)*
