# Relational Algebra aur Relational Calculus
<!-- topics: databases/relational-algebra, databases/relational-calculus, databases/tuple-relational-calculus, databases/safe-query, databases/joins, databases/natural-join -->

## 1. Relational Algebra: procedural query language

Har operator relation leta hai aur **relation** deta hai (closure), isliye nest ho sakte hain. Relation = **set**, isliye result me duplicates nahi.

### Basic operators

| Operator | Symbol | Kaam |
|---|---|---|
| **Selection** | σ_cond(R) | Rows filter (horizontal) |
| **Projection** | π_A1,A2(R) | Columns chuno (vertical), **duplicates hata deta hai** |
| **Union** | R ∪ S | Dono ke tuples (union-compatible) |
| **Set difference** | R − S | R me hain, S me nahi |
| **Cartesian product** | R × S | Har tuple × har tuple |
| **Rename** | ρ | Naam badalna (self join ke liye zaroori) |

### Derived operators
- **Intersection**: R ∩ S = R − (R − S).
- **Theta join**: R ⋈_θ S = σ_θ(R × S). **Equi join**: θ me equality. **Natural join** R ⋈ S: **common attributes par equality**, common column **ek hi baar**. Common attribute na ho to = cross product.
- **Outer joins**: left/right/full: unmatched tuples **NULL** ke saath rakhe.
- **Division** R ÷ S: "**for all**" queries.

### Sizes (GATE numericals)
- |R × S| = |R|·|S|; degree = deg R + deg S.
- Selection: ≤ |R|. Projection: ≤ |R| (duplicates hate).
- **Natural join size**: 0 ≤ |R ⋈ S| ≤ |R|·|S|.
- **FK–PK join**: agar R.B foreign key S.B (primary key) ko refer kare (no NULL), to **|R ⋈ S| = |R|**.
- |R ∪ S| ≤ |R|+|S|; |R ∩ S| ≤ min; |R − S| ≤ |R|.

## 2. Worked example

**Student(sid, name)** = {(1,A),(2,B),(3,C)}; **Enroll(sid, cid)** = {(1,c1),(1,c2),(2,c1)}.

- σ_{sid>1}(Student) = {(2,B),(3,C)}.
- π_sid(Enroll) = {1, 2} (duplicate 1 ek baar).
- Student ⋈ Enroll = {(1,A,c1),(1,A,c2),(2,B,c1)}; **3 (C) nahi** (koi enroll nahi).
- Student ⟕ Enroll (left outer) = upar wale + **(3,C,NULL)**.
- π_sid(Student) − π_sid(Enroll) = {3} (**kisi course me nahi**).

## 3. Division (for all)

**R(A,B) ÷ S(B)** = un `A` values ka set jo **S ke har B** ke saath R me hain.

**Example:** Takes(student, course) = {(1,a),(1,b),(2,a),(3,a),(3,b)}, Course = {a,b}.
Takes ÷ Course = {1, 3} (jinhone **dono** courses liye).

Basic operators se: **R ÷ S = π_A(R) − π_A( (π_A(R) × S) − R )**.

**"Sab X ke liye" queries pattern:** sab candidates − jinme koi X missing.

## 4. Query patterns (yaad kar lo)

| Sawal | Algebra |
|---|---|
| Kisi ne course liya | π(Student ⋈ Enroll) |
| **Kisi ne nahi** liya | π(Student) − π(Enroll) |
| **Sabhi** courses liye | Division |
| **Sirf/kam se kam do** | Self-join + rename + condition (c1 ≠ c2) |
| Maximum salary wala | Sab − (jinse bada koi hai) (self-join with `<`) |

**Second highest / more than once** self join ρ se.

## 5. Equivalences (optimization)
- σ_{c1∧c2}(R) = σ_{c1}(σ_{c2}(R)) (cascade); selections **commute**.
- π cascade: π_A(π_B(R)) = π_A(R) agar A ⊆ B.
- **Push selection down**: σ_c(R ⋈ S) = σ_c(R) ⋈ S agar c sirf R ke attributes par.
- Join **commutative, associative**.
- σ aur π swap sirf tab jab selection ke attributes projection me hon.

## 6. Expressive power aur limits
- Basic relational algebra **transitive closure / recursion express nahi kar sakta** (e.g., "kisi bhi length ka path"). Fixed length paths ho sakte hain (constant length expression).
- SQL SELECT relational σ+π ke barabar, **par duplicates rakhta hai** (bag semantics); SQL `SELECT` = projection (π), `WHERE` = selection (σ).

## 7. Relational Calculus: declarative

Batao **kya chahiye**, **kaise** nahi.

### Tuple Relational Calculus (TRC)
`{ t | P(t) }`: wo tuples `t` jinke liye predicate P true.
- Quantifiers: **∃ s (R(s) ∧ ...)**, **∀**.
- **Example:** students jinhone koi course liya: `{ t | Student(t) ∧ ∃e (Enroll(e) ∧ e.sid = t.sid) }`.
- **Sabhi** courses: `∀c (Course(c) → ∃e(Enroll(e) ∧ e.sid=t.sid ∧ e.cid=c.cid))`.

### Domain Relational Calculus (DRC)
Variables **attribute values** par: `{ <n> | ∃s (<s,n> ∈ Student ∧ ...) }`. (QBE is based on DRC.)

### Safe expression
Aisi expression jo **finite** result de. **Unsafe:** `{ t | ¬R(t) }` (infinite tuples). Safe calculus = relational algebra ki expressive power. Safe banane ke liye har free variable ko kisi relation se **range-restrict** karo.

### Algebra ↔ Calculus
- Codd's theorem: **relational algebra ≡ safe relational calculus** (equal power).
- Algebra **procedural**, calculus **non-procedural**. SQL in dono ka mix (mostly calculus-like, TRC based).

## 8. Join algorithms (cost, thoda)
- **Nested loop**: outer R blocks b_R, inner b_S: cost **b_R + b_R·b_S** (tuple-wise: n_R·b_S + b_R).
- **Block nested loop** (M buffers): b_R + ⌈b_R/(M−2)⌉·b_S.
- **Index nested loop, sort-merge, hash join** (O(b_R + b_S) roughly, for equi joins).
- **Chhoti relation ko outer** rakho (block nested loop me).

**Example:** b_R = 100, b_S = 400, M = 12 buffers. Cost = 100 + ⌈100/10⌉·400 = 100 + 4000 = **4100** block accesses.

## 9. GATE Quick Revision
- σ rows, π columns (dedup). Division = "for all".
- Natural join = common attributes par equality, no common attr = cross product.
- FK–PK join size = |referencing table|.
- Algebra recursion express nahi kar sakta.
- Algebra ≡ safe calculus; unsafe = infinite output.
- Left outer join size ≥ inner join size.

### Practice
1. |R| = 10, |S| = 20, R×S tuples? *(200)*
2. R(A,B) ⋈ S(B,C), S.B key, R.B FK, |R|=15 → |join|? *(15)*
3. Kya {t | ¬EMP(t)} safe hai? *(Nahi.)*
