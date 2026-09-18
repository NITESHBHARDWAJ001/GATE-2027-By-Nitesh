# SQL in Depth: Queries, Aggregates, Nested Queries, Joins, Constraints
<!-- topics: databases/sql, databases/query -->

## 1. SQL ka logical evaluation order (GATE ka golden rule)

Query jis order me likhi jaati hai us order me **chalti nahi**. Logical order:

```
1. FROM (+ JOIN)     -> tables jodo
2. WHERE             -> rows filter (aggregates allowed NAHI)
3. GROUP BY          -> groups
4. HAVING            -> groups filter (aggregates allowed)
5. SELECT            -> columns/expressions/aggregates
6. DISTINCT          -> duplicates hatao
7. ORDER BY          -> sort
8. LIMIT/TOP
```

> **Output-count questions ke liye:** pehle join/filter ka intermediate table banao, phir group, phir count.

**Bag semantics:** SQL **duplicates hatata nahi** jab tak `DISTINCT` na ho (relational algebra ke ulta).

## 2. Basic syntax

```sql
SELECT [DISTINCT] col1, expr, AGG(col)
FROM t1 [JOIN t2 ON cond]
WHERE row_condition
GROUP BY cols
HAVING group_condition
ORDER BY col [ASC|DESC];
```
- `LIKE 'a%'` (`%` any string, `_` one char), `BETWEEN a AND b` (inclusive), `IN (...)`, `IS NULL`.
- `UNION` (duplicates hata), `UNION ALL` (rakhe), `INTERSECT`, `EXCEPT/MINUS`.

## 3. Aggregate functions aur NULL

`COUNT(*)`, `COUNT(col)`, `SUM`, `AVG`, `MIN`, `MAX`.

| | NULL rows |
|---|---|
| `COUNT(*)` | **Ginta hai** (poori row) |
| `COUNT(col)` | NULL **ignore** |
| `SUM/AVG/MIN/MAX` | NULL ignore; sab NULL to result NULL |

**Example:** T(x) = {1, 2, NULL}. `COUNT(*)=3`, `COUNT(x)=2`, `AVG(x)=1.5` (3/2, 3 se nahi).

### GROUP BY rules
- SELECT me sirf **group-by columns ya aggregates** (standard SQL).
- **WHERE** group banne se pehle, **HAVING** baad me. Aggregate condition = HAVING.
- Bina GROUP BY ke HAVING: **poori table ek group**.

**Example:** `SELECT dept, AVG(sal) FROM emp WHERE age>30 GROUP BY dept HAVING COUNT(*)>2;`
Pehle age>30 filter, phir dept-wise group, phir jis group me **>2 rows (filter ke baad)** wo bache.

## 4. NULL aur three-valued logic

Comparison with NULL = **UNKNOWN**. WHERE sirf **TRUE** rows rakhta hai.

| AND | T | U | F |  |  | OR | T | U | F |
|---|---|---|---|---|---|---|---|---|---|
| T | T | U | F |  |  | T | T | T | T |
| U | U | U | F |  |  | U | T | U | U |
| F | F | F | F |  |  | F | T | U | F |

`NOT UNKNOWN = UNKNOWN`.

**Big trap:** `x NOT IN (subquery)` me agar subquery me **ek bhi NULL** hai to result kabhi TRUE nahi -> **koi row nahi**. Kaaran: `x <> NULL` unknown. Isliye `NOT EXISTS` safer.

## 5. Joins

```sql
SELECT * FROM A INNER JOIN B ON A.x = B.x;     -- matching only
A LEFT OUTER JOIN B   -- A ke saare + match (na mile to NULL)
A RIGHT OUTER JOIN B / A FULL OUTER JOIN B
A NATURAL JOIN B      -- common columns par equality
A CROSS JOIN B        -- |A|*|B|
```
- `FROM A, B WHERE ...` = implicit inner join; **WHERE bhoolne par cross product**.
- Join se **duplicates** aa sakte hain (one-to-many); aggregates un par lagte hain (SUM double count).
- **Self join**: table ko alias se khud se jodo.

**Example:** Emp(id, name, mgr) — employee aur manager ka naam: `SELECT e.name, m.name FROM Emp e JOIN Emp m ON e.mgr = m.id;`

## 6. Nested (sub) queries

| Type | Note |
|---|---|
| **Scalar** subquery | Ek value (comparison ke saath) |
| **IN / NOT IN** | Set membership |
| **ANY / SOME / ALL** | `> ALL (sub)` = sabse bade se bhi bada; **sub khali ho to ALL = TRUE, ANY = FALSE** |
| **EXISTS / NOT EXISTS** | Subquery me koi row hai? |
| **Correlated** subquery | Inner query outer row par depend, **har outer row par dobara evaluate** |

### Famous queries
1. **Second highest salary:**
```sql
SELECT MAX(sal) FROM emp WHERE sal < (SELECT MAX(sal) FROM emp);
```
2. **Highest in each dept (correlated):**
```sql
SELECT * FROM emp e WHERE sal = (SELECT MAX(sal) FROM emp WHERE dept = e.dept);
```
3. **Rank by count of higher values (correlated):**
```sql
SELECT c1.name, (SELECT COUNT(*) FROM acct c2 WHERE c2.bal > c1.bal) + 1 AS rank FROM acct c1;
```
4. **Division ("sab courses liye") with NOT EXISTS:**
```sql
SELECT s.sid FROM Student s WHERE NOT EXISTS (
  SELECT c.cid FROM Course c WHERE NOT EXISTS (
     SELECT * FROM Enroll e WHERE e.sid = s.sid AND e.cid = c.cid));
```
5. **Duplicate rows dhundo:** `SELECT x FROM t GROUP BY x HAVING COUNT(*) > 1;`
6. **Students jinhone koi course nahi liya:** `... WHERE sid NOT IN (SELECT sid FROM Enroll)` (NULL careful).

## 7. Worked output-count example (GATE style)

Emp(id, dept, sal): (1,D1,10), (2,D1,20), (3,D2,30), (4,D2,NULL), (5,D3,40).

`SELECT dept, COUNT(*), COUNT(sal), AVG(sal) FROM Emp GROUP BY dept HAVING COUNT(*) >= 2;`
- D1: 2 rows, COUNT(sal)=2, AVG=15
- D2: 2 rows, COUNT(sal)=1, AVG=30
- D3: 1 row -> HAVING se hat gaya.
**Output: 2 tuples.**

## 8. DDL, Constraints, Views, Triggers

```sql
CREATE TABLE Emp (
  id INT PRIMARY KEY,
  name VARCHAR(30) NOT NULL,
  dept INT REFERENCES Dept(did) ON DELETE CASCADE ON UPDATE SET NULL,
  sal INT CHECK (sal > 0),
  UNIQUE (name)
);
ALTER TABLE Emp ADD COLUMN age INT;   DROP TABLE Emp;   -- DDL (auto commit)
```
- `DELETE` (rows, condition, rollback ho sakta), `TRUNCATE` (sab rows, fast, DDL-like), `DROP` (table hi gayi).
- **View:** `CREATE VIEW v AS SELECT ...;` virtual table.
- **Trigger:** event (INSERT/UPDATE/DELETE) par automatic action (BEFORE/AFTER, row/statement level).
- **Assertion**: CHECK jo multiple tables par (limited support).
- **Foreign key ko hamesha CHECK assertion se replace nahi kar sakte** (DELETE/UPDATE cascade semantic alag).
- **Index:** `CREATE INDEX idx ON t(col);` SQL query ke **kaam karne ke liye index zaroori nahi**, speed ke liye.

### Transactions in SQL
`BEGIN; ... COMMIT; / ROLLBACK;` **Isolation levels:** Read Uncommitted (dirty read), Read Committed, Repeatable Read, Serializable (phantom bhi roke).

## 9. Embedded SQL / Cursors (concept)
Cursor: result set row-by-row process. **Stored procedures/functions**. Dynamic SQL.

## 10. Common Traps
1. `COUNT(*)` vs `COUNT(col)` (NULL).
2. `NOT IN` + NULL.
3. Join se multiplicity: SUM/COUNT double.
4. WHERE me aggregate allowed nahi -> HAVING.
5. `SELECT` list me non-grouped column (invalid).
6. DISTINCT ke bina duplicates.
7. `> ALL` khali subquery = TRUE.
8. Natural join me common column same naam.
9. `LIKE` case/`_`/`%`.
10. Outer join me WHERE condition outer ko inner bana sakti hai (right-table column ki condition).

## 11. Quick Revision
- Order: FROM → WHERE → GROUP BY → HAVING → SELECT → DISTINCT → ORDER BY.
- Bag semantics; `UNION ALL` duplicates rakhta.
- NULL ka comparison unknown; `NOT IN` + NULL = kuch nahi.
- Division: double NOT EXISTS.
- `HAVING` bina `GROUP BY` allowed.

### Practice
1. T(x)={5,NULL,5}: `SELECT COUNT(DISTINCT x)` ? *(1)*
2. A me 3 rows, B me 4; `SELECT * FROM A, B` rows? *(12)*
3. `SELECT x FROM T WHERE x NOT IN (SELECT y FROM U)` U={1,NULL}. Result? *(Khali)*
