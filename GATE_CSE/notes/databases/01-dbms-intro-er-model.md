# DBMS Intro aur ER Model
<!-- topics: databases/er-diagram, databases/database-design, databases/database-schema -->

## 1. DBMS kyun?

File system me data alag alag files me, duplicate, inconsistent, aur har program ko file format pata hona chahiye. **DBMS** in problems ko solve karta hai:

- **Data redundancy aur inconsistency** kam, **data independence**, **concurrent access**, **security**, **integrity constraints**, **crash recovery**.

### Three-schema architecture (ANSI/SPARC)

| Level | Kya dikhata hai |
|---|---|
| **External (view)** | Har user ka alag view |
| **Conceptual (logical)** | Poore DB ka structure: tables, relations, constraints |
| **Internal (physical)** | Storage: files, indexes, blocks |

- **Physical data independence**: internal schema badalne se conceptual schema **na badle** (index add karna). Ye **easy** hai.
- **Logical data independence**: conceptual schema badle to external views/applications **na tootein**. Ye **mushkil** hai. (GATE: *Logical independence physical se achieve karna zyada mushkil.*)

**Schema** = structure (kam badalta), **Instance** = us waqt ka actual data (badalta rehta hai). Table ka **degree** = columns ki sankhya, **cardinality** = rows ki sankhya.

**Languages:** DDL (create, alter, drop), DML (select, insert, update, delete), DCL (grant, revoke), TCL (commit, rollback).

## 2. ER (Entity-Relationship) Model

Database design ka pehla step: real world ko **entities** aur **relationships** me likhna.

### Building blocks
- **Entity**: real world ka object (Student). **Entity set**: same type ke sab entities.
- **Attribute** types:
  - **Simple/atomic** vs **Composite** (Name = First + Last).
  - **Single-valued** vs **Multi-valued** (Phone numbers) (double oval).
  - **Derived** (Age from DOB) (dashed oval).
  - **Key attribute** (underlined).
- **Relationship**: entities ke beech association (diamond). **Degree**: kitne entity sets (binary, ternary).

### Cardinality (mapping constraints)
- **1:1, 1:N, N:1, M:N**.
- **Participation**: **Total** (double line: har entity relationship me hoga) vs **Partial** (single line).

### Weak entity
Jiski **apni key nahi**. Wo **owner (strong) entity** par depend karta hai. **Identifying relationship** (double diamond) + **partial key (discriminator)** (dashed underline). Weak entity ki primary key = **owner ki key + partial key**. Weak entity ka participation identifying relationship me **total** hota hai.

**Example:** `Employee` (strong) — `Dependent` (weak): Dependent ka naam sirf employee ke andar unique.

### Extended ER (EER): Specialization / Generalization / Aggregation
- **Specialization** (top-down): Person -> Student, Teacher. **Generalization** (bottom-up).
- **Constraints:** **Disjoint (d)** vs **Overlapping (o)**, **Total** vs **Partial**.
- **Aggregation**: relationship ko ek entity ki tarah treat karke usse doosre relationship me jodna.

## 3. ER se Relational Schema (tables) banana (GATE: "minimum tables")

| ER construct | Table rule |
|---|---|
| **Strong entity** | Ek table; key = primary key |
| **Weak entity** | Table = weak attributes + owner ki key (FK); PK = owner key + partial key |
| **Multi-valued attribute** | **Alag table** (entity key + value) |
| **Composite attribute** | Component columns |
| **Derived attribute** | Store nahi karte |
| **1:1** | Kisi ek side me FK (**total participation wali side me**), ya dono tables merge (dono total) |
| **1:N** | **N side** ki table me FK ("many" side) |
| **M:N** | **Alag relationship table**: dono keys (composite PK) + relationship attributes |
| **N-ary** | Alag table, sabhi participating keys |
| **Specialization** | Ya alag table per subclass, ya ek table (type flag), ya sirf subclasses |

### Minimum number of tables: rules of thumb
- Har **entity** = 1 table (jab tak merge na ho).
- **M:N** = extra table.
- **1:N** = **extra table nahi**, FK N-side me.
- **1:1 with total participation on one side**: relationship us side me merge; **dono total** = **ek hi table** me merge.

**Example 1:** E1 (a1, a2) —R (1:N)— E2 (b1, b2), R ka koi attribute nahi. Tables: E1(a1,a2), E2(b1,b2,**a1**) = **2 tables**.
**Example 2:** E1 —R (M:N)— E2 = **3 tables**.
**Example 3:** E1 —R (1:1, dono total)— E2 = **1 table** (merge).
**Example 4:** E1 —R (M:N)— E2 aur E2 —S (1:N)— E3: tables: E1, E2, R, E3(with FK) = **4**.

### Attribute set of a table (GATE MCQ)
1:N relationship R jisme **N side E2** ho aur R ka attribute `x`: E2 table = (E2 attributes, **E1 ki key**, `x`).

## 4. Design ke concepts
- **Superkey, candidate key, primary key** (next chapters).
- **Redundancy** kam karne ke liye ER se tables, phir **normalization**.
- **Ternary vs binary**: agar teeno milkar hi constraint bante hon to ternary; warna 3 binary se replace nahi ho sakta (information loss).

## 5. Quick Revision
- Weak entity: PK = owner key + discriminator; identifying relationship total.
- M:N = alag table; 1:N = FK N-side.
- Multivalued attribute = alag table.
- Logical independence > physical independence in difficulty.
- Total participation = double line; weak entity = double rectangle.

### Practice
1. Student —Enroll (M:N, attribute grade)— Course. Tables? *(3: Student, Course, Enroll(sid, cid, grade))*
2. Employee ke multi-valued attribute `phone` ke liye tables? *(Employee + EmpPhone(eid, phone))*
3. Weak entity ki PK kya? *(Owner PK + partial key)*
