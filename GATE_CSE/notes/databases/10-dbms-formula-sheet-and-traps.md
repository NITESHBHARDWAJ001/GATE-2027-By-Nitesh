# DBMS: Formula Sheet, Traps aur GATE Strategy
<!-- topics: databases/sql, databases/database-normalization, databases/transaction-and-concurrency, databases/indexing, databases/b-tree -->

## 1. Formula Sheet

### ER / Relational
- Superkeys (ek key, size k, n attrs) = 2^(n−k).
- FK–PK natural join size = |referencing relation|.
- |R × S| = |R|·|S|; degree = sum.
- Min tables: 1:N → FK, M:N → extra table, multi-valued attr → extra table, weak entity PK = owner key + partial key.

### FD / Normalization
- X → Y valid iff Y ⊆ X⁺.
- Lossless (binary): R1∩R2 → R1 or R2.
- BCNF: LHS superkey. 3NF: LHS superkey **or** RHS prime.
- Minimal cover: RHS single, no extraneous LHS, no redundant FD.

### Transactions
- Serial schedules n!; interleavings C(m+n, m).
- Conflict: different Tx + same item + ≥ 1 write. Precedence graph acyclic ⟺ CS.
- Strict ⊂ ACA ⊂ Recoverable; CS ⊂ VS.

### Indexing / B+ tree
- bf = ⌊B/R⌋; b = ⌈N/bf⌉; fᵢ = ⌊B/(K+P)⌋.
- Dense idx blocks = ⌈N/fᵢ⌉; sparse = ⌈b/fᵢ⌉; access = levels + 1.
- B+ internal `p·Pb + (p−1)K ≤ B`; leaf `p(K+Pr) + Pb ≤ B`; B-tree `p·Pb + (p−1)(K+Pr) ≤ B`.
- Max splits per insert = height; new nodes = height + 1.
- Block nested loop join = b_R + ⌈b_R/(M−2)⌉·b_S.

## 2. Comparison Tables

| Concept | A | B |
|---|---|---|
| Algebra vs calculus | Procedural | Declarative (safe calculus ≡ algebra) |
| DELETE / TRUNCATE / DROP | Rows (rollback) / all rows fast / table gone | - |
| WHERE / HAVING | Rows before group | Groups after |
| Primary / clustering / secondary idx | Sparse ordered key / ordered non-key / dense unordered | - |
| B / B+ | Data har node / sirf leaves + linked | - |
| 2PL / TO | Deadlock possible / deadlock-free | - |
| Wait-Die / Wound-Wait | Non-preemptive / preemptive | - |
| Deferred / Immediate | Redo only / Undo + Redo | - |

## 3. Top 20 Traps
1. `COUNT(*)` vs `COUNT(col)` with NULL.
2. `NOT IN` with NULL in subquery → no rows.
3. `> ALL(empty)` is TRUE; `> ANY(empty)` is FALSE.
4. Join se duplicates → SUM/COUNT double.
5. Aggregate in WHERE (invalid) → HAVING.
6. Relational algebra dedup vs SQL bag.
7. Division = "for all"; minus = "never".
8. Key ka claim instance se nahi hota.
9. LHS of an FD decompose nahi hoti.
10. Left-only attributes key me hote hain.
11. 3NF vs BCNF: prime RHS pardon karta hai 3NF me.
12. Sab attributes prime ⇒ 3NF.
13. BCNF lossless par dependency preserving nahi guarantee.
14. R–R conflict nahi.
15. Serializable ≠ recoverable.
16. 2PL deadlock free nahi; TO free hai.
17. Cascadeless = koi dirty read nahi.
18. Sparse index ke liye ordered file zaroori.
19. Leaf split: copy up; internal split: move up.
20. B+ order me record pointer internal node me nahi.

## 4. Solving Strategy (DBMS)
- **SQL output**: table draw karo; FROM → WHERE → GROUP → HAVING.
- **Normalization**: keys → prime/non-prime → har FD ka check (BCNF → 3NF → 2NF).
- **Schedules**: item-wise conflict list → precedence graph → cycle?
- **Indexing**: units aur floor/ceil ka dhyan (bf floor, blocks ceil).
- **ER min tables**: har relationship ka cardinality + participation.

## 5. Practice order (web app)
Subjects → Databases: **SQL → Normalization → Transactions/Concurrency → Relational Algebra → Indexing/B-tree → ER → Referential integrity**. Har topic ke PYQs pattern-wise diye hain.
