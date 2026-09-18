# Arrays, Linked Lists, Stacks aur Queues
<!-- topics: programming-and-ds-data-structures/array, programming-and-ds-data-structures/linked-list, programming-and-ds-data-structures/stack, programming-and-ds-data-structures/queue, programming-and-ds-data-structures/infix-prefix -->

## 1. Arrays

- **Contiguous memory**, index se **O(1)** access. Insert/delete beech me **O(n)** (shift).
- **Address of A[i]** = base + i × size (lower bound 0). Lower bound `L`: base + (i − L) × size.
- **2D row-major:** `A[i][j]` = base + (i × cols + j) × size. **Column-major:** base + (j × rows + i) × size.
- **Lower triangular matrix compact storage (row-major, 1-indexed):** `A[i][j]` (i ≥ j) → index = **i(i−1)/2 + j**. Total elements n(n+1)/2.
- **Sparse matrix:** triples (row, col, val).

**Example:** `int A[10][20]`, base 1000, int = 4 B, row-major: A[3][5] = 1000 + (3×20 + 5) × 4 = **1260**.

## 2. Linked List

Nodes: `data` + `next` pointer. **Dynamic size**, insert/delete **O(1)** (pointer pata ho to), par **random access O(n)**, extra memory pointer ke liye.

### Types
- **Singly**, **Doubly** (`prev` + `next`), **Circular** (last → first).

### Complexity table
| Operation | Array | Singly LL | Doubly LL |
|---|---|---|---|
| Access i-th | **O(1)** | O(n) | O(n) |
| Insert at head | O(n) | **O(1)** | O(1) |
| Insert at tail | O(1) amortized (dynamic) | O(n) (tail pointer nahi) / O(1) (tail pointer) | O(1) with tail |
| Delete given node pointer | O(n) | O(n) (previous chahiye) | **O(1)** |
| Delete after search | O(n) | O(n) | O(n) |
| Search | O(n) / **O(log n) sorted (binary)** | O(n) | O(n) |

> **GATE trap:** "insertion/deletion O(1)" tabhi jab **node ka pointer** diya ho; search ka cost alag.

### Common operations (code tracing)
```c
struct node { int data; struct node *next; };

// reverse
struct node* rev(struct node* h){
  struct node *prev = NULL, *cur = h, *nxt;
  while (cur) { nxt = cur->next; cur->next = prev; prev = cur; cur = nxt; }
  return prev;
}
```
**Reverse ka dry run:** 1→2→3: prev=NULL,cur=1: 1→NULL; cur=2: 2→1; cur=3: 3→2 → head 3→2→1.

**Middle of list:** slow/fast pointers (fast 2 step). **Cycle detect:** Floyd (slow/fast mil jaayein to cycle). **Nth from end:** two pointers n gap.

**Circular list me sirf ek pointer** rakhna ho to **last node ka pointer** rakho (last->next = first): dono ends O(1) (insert at front/end).

**Doubly linked list**: har node ke liye extra pointer; delete O(1) given node.

**Merge two sorted lists** O(m+n). **Insertion sort on LL** O(n²).

## 3. Stack (LIFO)

**Push, Pop, Peek, isEmpty** sab **O(1)**. Array ya linked list se. **Stack pointer**.

### Applications
1. **Function calls** (activation records, recursion).
2. **Expression evaluation** (postfix) aur **infix → postfix conversion**.
3. **Balanced parentheses**, **undo**, **DFS**, **backtracking**.

### Infix → Postfix (operator stack)
Rules: operand → output. Operator: stack ke upar wale operator ki **precedence ≥ current** (left assoc) to pop karke output; phir push. `(` push; `)` par `(` tak pop.
- **Precedence:** `^` (right assoc) > `* /` > `+ -`.

**Example:** `A + B * C - D` → **A B C * + D -**.
Steps: A→out; + push; B→out; * (higher) push; C→out; `-`: * pop, + pop (≥), push -; D→out; end pop -.
**Example with parentheses:** `(A + B) * C` → **A B + C ***.
**Right assoc:** `A ^ B ^ C` → **A B C ^ ^**.

### Postfix evaluation
Operand push; operator: **pop 2 (pehla pop = right operand)**, apply, push.
**Example:** `5 6 2 + * 12 4 / -` → 6+2=8; 5×8=40; 12/4=3; 40−3 = **37**.
**Prefix evaluation:** right se left scan.

**Stack with min O(1):** extra min stack. **Two stacks in one array:** dono ends se.

**Stack permutations:** input 1,2,...,n ke saath possible pop sequences ki count = **Catalan number C(2n,n)/(n+1)**.
(3 elements → 5 permutations; **312 possible nahi**.)

## 4. Queue (FIFO)

**Enqueue (rear), Dequeue (front)**, O(1).
- **Circular queue** (array): `rear = (rear + 1) % n`. **Full:** `(rear+1)%n == front`; **empty:** `front == rear` (ek slot khali chhodkar). Capacity n me max **n − 1** elements (is convention me).
- **Deque** (double-ended), **Priority queue** (heap).
- **Queue using two stacks:** enqueue = push s1; dequeue = s2 khali ho to s1 → s2 transfer, s2 pop. **Amortized O(1)**.
- **Stack using two queues.**
- **Applications:** BFS, scheduling (round robin), buffers, level order traversal.

**Queue via linked list:** front aur rear pointers; **rear pointer se enqueue O(1)**.

**Priority queue implementations:**
| | Insert | Extract-min |
|---|---|---|
| Unsorted array | O(1) | O(n) |
| Sorted array | O(n) | O(1) |
| **Binary heap** | **O(log n)** | **O(log n)** |
| Fibonacci heap | O(1) amortized | O(log n) amortized |

**Stack via priority queue:** har push par **badhti priority**; **Queue via PQ:** badhti (chhoti) priority.

## 5. Problem patterns
1. **Kitne elements stack me hain given push/pop sequence?**
2. **Postfix/prefix output**.
3. **Circular queue full/empty condition** (front, rear values se).
4. **LL me kitne pointer changes** (insert/delete code).
5. **Time complexity** of operations (given pointers).

## 6. Quick Revision
- Array O(1) access, LL O(1) insert given pointer.
- Delete given node: doubly O(1), singly O(n) (prev chahiye).
- Circular list: last-node pointer se dono ends O(1).
- Stack: LIFO, expression evaluation; Catalan permutations.
- Queue: FIFO, circular `(rear+1)%n`; 2 stacks = amortized O(1).
- Binary heap PQ: O(log n) insert/extract.

### Practice
1. Infix `A*(B+C)/D` → postfix? *(A B C + * D /)*
2. Postfix `2 3 * 4 +` value? *(10)*
3. Circular queue size 5 (one slot empty), front=2, rear=4: elements? *(rear−front = 2)*
4. 4 elements ke stack permutations? *(C(8,4)/5 = 14)*
