# Relational Model, Keys aur Integrity Constraints
<!-- topics: databases/relational-model, databases/candidate-key, databases/super-key, databases/referential-integrity -->

## 1. Relational Model

Data **tables (relations)** me. **Relation** = **set of tuples** (rows); **attribute** = column; **domain** = allowed values. Relation ek **set** hai: **duplicate tuples nahi, order matter nahi** (SQL table me duplicates ho sakte hain, ye alag baat).

**Relation schema** `R(A1, A2, ..., An)`; **instance** = actual tuples. **Degree** = n, **cardinality** = #tuples.

## 2. Keys (GATE ka sabse zyada poochha jaane wala area)

| Key | Definition |
|---|---|
| **Super key** | Attributes ka set jo tuple ko **uniquely identify** kare (koi bhi superset of key) |
| **Candidate key** | **Minimal** super key (koi proper subset key nahi) |
| **Primary key** | Chuni hui candidate key; **NOT NULL + unique** |
| **Alternate key** | Baaki candidate keys |
| **Foreign key** | Ek relation ka attribute jo dusre relation ki (primary/candidate) key ko refer kare |
| **Prime attribute** | Kisi bhi candidate key ka hissa |
| **Non-prime attribute** | Kisi candidate key me nahi |

### Superkeys ki counting
- Relation R me `n` attributes, ek hi candidate key jisme `k` attributes: **superkeys = 2^(n−k)**.
- Kai candidate keys: **inclusion-exclusion** (union of supersets).

**Example:** R(A,B,C,D), key = A. Superkeys = 2³ = **8** (A, AB, AC, AD, ABC, ABD, ACD, ABCD).
**Example (do keys):** R(A,B,C), candidate keys **A** aur **B**. Superkeys containing A: 2² = 4; containing B: 4; containing both A,B: 2. Total = 4 + 4 − 2 = **6**.

### Candidate key kaise nikaale (FDs se)
1. Woh attributes jo kisi FD ke **RHS me kabhi nahi aate** = key me **zaroor** hote hain (essential).
2. Un attributes ka **closure** nikalo. Agar sab attributes mil gaye = wahi (ek) candidate key.
3. Warna dusre attributes jodkar try karo; **minimality** check karo.
(Poora method FD chapter me.)

> **Trap:** kisi *instance* me ek attribute ki values distinct hain to use key **nahi** bol sakte: key **schema ki property** hai (sab possible instances ke liye).

## 3. Integrity Constraints

1. **Domain constraint**: value domain ke andar (type, CHECK).
2. **Entity integrity**: **primary key NULL nahi** ho sakti.
3. **Key constraint**: candidate key ki values unique.
4. **Referential integrity**: foreign key value ya to **NULL** ho ya referenced table ki key me **maujood**.
5. **Semantic constraints**: triggers, assertions, CHECK.

### Referential integrity: kaunsi operations violate karti hain?

Relation **R (referencing / child)**, **S (referenced / parent)**.

| Operation | Violation? |
|---|---|
| **Insert into R** (FK value S me nahi) | **Haan** |
| **Delete from S** (koi R tuple refer kar raha) | **Haan** (ya action) |
| **Update FK in R** (nayi value S me nahi) | **Haan** |
| **Update key in S** | **Haan** |
| **Insert into S** | **Nahi** |
| **Delete from R** | **Nahi** |

**Referential actions (delete/update on parent):**
- **RESTRICT / NO ACTION**: reject.
- **CASCADE**: child rows bhi delete/update.
- **SET NULL**: child FK = NULL.
- **SET DEFAULT**.

**Cascade chain example:** A(x PK), B(y PK, x FK->A ON DELETE CASCADE), C(z PK, y FK->B ON DELETE CASCADE). A ki row delete -> jo B rows use refer kar rahe delete -> unke C rows delete. **Transitive closure** follow karo.

> **Note:** Ek relation me **multiple foreign keys** ho sakte hain; FK **candidate key** ko bhi refer kar sakta hai (sirf primary nahi).

## 4. NULL values
- NULL = unknown/not applicable. **NULL ke saath comparison result UNKNOWN** (true/false nahi).
- Primary key me NULL nahi; unique/foreign key me allowed.
- `NULL = NULL` -> unknown (use `IS NULL`).
- Aggregates: `COUNT(*)` NULL rows ginta, `COUNT(col)`, `SUM`, `AVG` NULL ignore karte hain.

## 5. Views aur Schema concepts (short)
- **View** = stored query (virtual table). Updatable view tab jab single base table, no aggregates/group by/distinct, keys include.
- **Materialized view**: result physically store.
- **Data dictionary/catalog**: metadata.

## 6. Relational Model ke degree/cardinality questions
- **Degree of R × S** = deg(R) + deg(S); cardinality = |R|·|S|.
- **Union-compatible**: same degree aur compatible domains (union/intersection/difference ke liye).

## 7. Quick Revision
- Candidate key = minimal superkey; PK = NOT NULL unique.
- Superkeys (single key size k): 2^(n−k).
- Insert child / delete parent = RI violation; insert parent/delete child = safe.
- NULL comparisons unknown; `IS NULL` use.
- Key = schema property, instance se prove nahi hoti.

### Practice
1. R(A,B,C,D,E), keys AB aur C. Superkeys? *(AB me: 2³=8; C me: 2⁴=16; dono (ABC): 2²=4 → 8+16−4=20)*
2. FK NULL ho sakti hai? *(Haan.)*
3. Kya candidate key ka superset hamesha superkey hai? *(Haan.)*
