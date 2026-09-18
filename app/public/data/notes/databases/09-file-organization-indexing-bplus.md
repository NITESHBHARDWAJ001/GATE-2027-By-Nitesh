# File Organization, Indexing aur B / B+ Trees
<!-- topics: databases/indexing, databases/b-tree -->

## 1. Storage basics
Data **disk blocks** me. Disk se ek block padhna mehenga (ms), memory access ns. Isliye DBMS ka goal: **block accesses kam** karna.

- **Blocking factor bf = ⌊B / R⌋** (B = block size, R = record size). Unspanned organization (record do blocks me nahi todte).
- **Data blocks b = ⌈N / bf⌉** (N = records).
- **Spanned** (record do blocks me tod sakte): bf = B/R fractional, no waste.

**Example:** N = 1,00,000 records, R = 100 B, B = 1024 B → bf = 10, b = **10,000 blocks**.

### File organizations
| Type | Search cost | Note |
|---|---|---|
| **Heap (unordered)** | Linear: b/2 avg (key), b worst | Insert fast (end me) |
| **Sorted (ordered) file** | **Binary search: ⌈log₂ b⌉** | Insert/delete mehenga |
| **Hashed** | ~1 block (equality) | Range query nahi |

## 2. Indexing: idea
Ek chhoti **index file** jisme (search key, pointer). Index blocks data blocks se **kam** (entry chhoti). Book ke **index** ki tarah.

### Types
| Index | File ordered on? | Kis field par | Dense/Sparse |
|---|---|---|---|
| **Primary index** | Haan (**key** field par ordered) | Primary key | **Sparse** (block anchor: har block ka pehla record) |
| **Clustering index** | Haan (**non-key** field par ordered) | Non-key ordering field | Sparse ya dense |
| **Secondary index** | **Nahi** (unordered field) | Candidate key ya non-key | **Dense** zaroori (har record/value ki entry) |

- File **ek hi field par ordered** ho sakti hai ⇒ **ek primary/clustering index**, par **kai secondary indexes**.
- **Dense index**: har search-key value ki entry. **Sparse**: sirf kuch (har block ki).
- **Clustered index** (GATE definition): **data records ki physical order index entries ki order jaisi** ho. Unclustered = alag.
- Sparse index sirf **ordered file** par bana sakte hain.

## 3. Index size / access calculations

Index entry size = **K + P** (key + pointer). **Index bf fᵢ = ⌊B / (K + P)⌋**.

- **Dense index blocks = ⌈N / fᵢ⌉** (N entries).
- **Sparse (primary) index blocks = ⌈b / fᵢ⌉** (b data blocks = entries).
- **Search cost single-level index (ordered index): ⌈log₂(index blocks)⌉ + 1** (data block).
- **Multilevel index**: index ke upar index (sparse) jab tak **top level 1 block**. Levels ≈ ⌈log_{fᵢ}(entries)⌉. **Access = levels + 1**.

**Worked example:** N = 10⁶, R = 100 B, B = 1024, K = 10 B, P = 6 B.
- bf = 10 -> b = 100,000 data blocks.
- fᵢ = ⌊1024/16⌋ = **64**.
- **Dense secondary index**: 10⁶/64 = **15,625 blocks**.
- **Sparse primary index**: 100,000/64 = 1562.5 → **1563 blocks**.
- **Multilevel** on the sparse index: level 1 = 1563 blocks; level 2 = ⌈1563/64⌉ = 25; level 3 = ⌈25/64⌉ = 1. **3 levels ⇒ access = 3 + 1 = 4 blocks**.
- Without index (ordered file): binary search ⌈log₂ 100000⌉ = 17 accesses.

## 4. B-Tree aur B+ Tree (multi-level index ka standard)

**Height-balanced**, sab leaves ek hi level par, **node = ek disk block**, isliye **fan-out bada, height kam**. Binary tree me har node ek key => height bada => zyada disk accesses. Isliye B/B+ tree.

### B+ Tree properties (order p)
- **Internal node**: max **p pointers**, max **p−1 keys**; min **⌈p/2⌉ pointers** (root: min 2). Sirf **routing keys**, koi data pointer nahi.
- **Leaf node**: (key, **record pointer**) pairs; **min ⌈p_leaf/2⌉** entries (kabhi ⌈(p−1)/2⌉ book ke hisaab se: question ki definition follow karo). **Saare data leaves me**. Leaves **linked list** me (**range query fast**).
- Root ko half-full hone ki zaroorat **nahi**.
- **Search cost = height h** (+1 record access).

### B-Tree (B+ se difference)
| | B-tree | B+ tree |
|---|---|---|
| Data pointers | **Har node me** (internal me bhi) | **Sirf leaves** |
| Keys repeat | Nahi | Haan (leaf me, internal me routing copy) |
| Leaf linked | Nahi | **Haan** |
| Range query | Slow | **Fast** |
| Fan-out | Kam (data pointer bhi) | **Zyada** |
| Use | Kam | **DBMS indexes me standard** |

### Order calculation (GATE ka favourite)
Block size **B**, key **K**, block/tree pointer **Pb**, record pointer **Pr**:

- **B+ tree internal order p**: `p·Pb + (p−1)·K ≤ B`.
- **B+ tree leaf order p_leaf**: `p_leaf·(K + Pr) + Pb ≤ B` (ek next-leaf pointer).
- **B-tree order p**: `p·Pb + (p−1)·(K + Pr) ≤ B`.

**Example:** B = 1024, K = 10, Pb = 6, Pr = 8.
- Internal: 6p + 10(p−1) ≤ 1024 → 16p ≤ 1034 → **p = 64** (p=64: 384 + 630 = 1014 ≤ 1024 ✓).
- Leaf: p(18) + 6 ≤ 1024 → 18p ≤ 1018 → **p_leaf = 56**.
- B-tree: 6p + 18(p−1) ≤ 1024 → 24p ≤ 1042 → **p = 43**.

**Max keys in node** = p − 1. **Min children** (non-root) = ⌈p/2⌉.

### Height / capacity
Order p, height h (root level 0 ... leaf level h), levels ke saath:
- **Max keys/records** ≈ p^h ... (har level me p guna).
- **Min** (root 2 children, baaki ⌈p/2⌉): kam bound.

**Example:** p = 64 (internal), leaf 56: 3 levels of internal ⇒ 64³ ≈ 2.6 lakh leaf blocks × 56 = **~1.47 crore** records index kar sakte hain, sirf ~4 block accesses.

## 5. Insertion (B+ tree)

1. Sahi **leaf** dhundo (search).
2. Leaf me insert (sorted).
3. Agar **overflow** (keys > max) → **split**:
   - **Leaf split:** beech ki key **parent me COPY** hoti hai (leaf me bhi rehti hai).
   - **Internal split:** beech ki key **parent me MOVE** hoti hai (nahi rehti).
4. Split upar **propagate** ho sakta hai; root split → **height +1**.

**Example:** B+ tree order 4 (max 3 keys per node). Insert 1,2,3: leaf [1,2,3]. Insert 4: overflow → split [1,2] [3,4]; parent key **3** (copy). Insert 5: [3,4,5]. Insert 6: [3,4,5,6] overflow → [3,4] [5,6], parent key 5: parent [3,5]. ...

**Max splits in ek insert = height** (leaf se root tak), **max new nodes = height + 1** (naya root bhi). Ek naya root tab jab poora path full ho.

## 6. Deletion
1. Leaf se key hataao.
2. **Underflow** (min se kam): pehle **sibling se borrow (redistribute)**; na ho to **merge**, parent se key hatao (recursively).
3. Root ke sirf ek child bacha to **root badal, height −1**.

## 7. Hashing (short)
- **Static hashing**: buckets fixed; overflow chains.
- **Extendible / Linear hashing**: dynamic growth. **Equality search O(1)**, **range nahi**.
- Hash index dense hota hai.

## 8. Multi-key, bitmap, other index (brief)
- **Composite index** (a, b): (a) ya (a, b) queries ke liye, sirf (b) ke liye nahi (leftmost prefix).
- **Bitmap index**: low-cardinality columns (gender), data warehouse.
- **Covering index**: query sirf index se hi answer.

## 9. Query cost basics (short)
- Full scan: b blocks. Index lookup: h + 1. Selectivity jitna kam, index utna achha; agar **zyada records** match (say >10%) to full scan bhi sasta ho sakta.

## 10. Quick Revision
- bf = ⌊B/R⌋, b = ⌈N/bf⌉, fᵢ = ⌊B/(K+P)⌋.
- Primary index sparse; secondary dense; ek file par ek primary/clustering.
- B+ internal: `p·Pb + (p−1)K ≤ B`; leaf: `p(K+Pr)+Pb ≤ B`.
- B+ leaf split: key **copy**; internal split: key **move**.
- Max splits = height; max new nodes = height+1.
- B+ = range query fast (linked leaves), data sirf leaves.
- Sparse index ke liye file ordered honi chahiye.

### Practice
1. N = 5,000, R = 200 B, B = 1000 B: bf, b? *(bf=5, b=1000)*
2. B = 512, K = 8, Pb = 4: B+ internal order? *(4p + 8(p−1) ≤ 512 → 12p ≤ 520 → p = 43)*
3. Height 3 B+ tree ek insert me max kitne naye nodes? *(4)*
