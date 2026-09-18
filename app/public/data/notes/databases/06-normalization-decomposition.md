# Normalization: 1NF se BCNF, Decomposition (Lossless, Dependency Preserving)
<!-- topics: databases/database-normalization, databases/normal-forms, databases/decomposition, databases/multivalued-dependency-4nf -->

## 1. Normalization kyun?

Ek badi table me redundancy se **anomalies**:
- **Insertion anomaly**: kuch daalne ke liye extra data chahiye.
- **Deletion anomaly**: ek fact delete karte hi dusra fact chala gaya.
- **Update anomaly**: ek fact kai jagah, sab jagah update karna padta hai.

**Example:** `Enroll(sid, sname, cid, cname)`: sname har enrollment me repeat -> update anomaly. Fix = tables tod do.

## 2. Normal Forms

### 1NF
Har attribute **atomic** (no multi-valued, no composite, no repeating groups). (Relational model me by default maana jaata.)

### 2NF
1NF + **koi non-prime attribute kisi candidate key ke *proper subset* par depend nahi** (**partial dependency nahi**).
- Sirf tab problem jab candidate key **composite** ho.
- Agar sab candidate keys **single attribute** hain to relation automatically 2NF.

### 3NF
2NF + **transitive dependency nahi** (non-prime -> non-prime). 
**Formal (har non-trivial FD X → A ke liye kam se kam ek sach ho):**
1. **X superkey** hai, ya
2. **A prime attribute** hai.

### BCNF (Boyce-Codd)
**Har non-trivial FD X → Y me X superkey hona chahiye.** (Prime attribute wali chhoot nahi.)

**Hierarchy:** BCNF ⊂ 3NF ⊂ 2NF ⊂ 1NF.

### 4NF
BCNF + **koi non-trivial MVD X ↠ Y jisme X superkey na ho**. **5NF** join dependency.

## 3. Normal form kaise identify karein (GATE steps)

1. **Candidate keys** nikaalo (closure se).
2. Prime aur non-prime attributes likho.
3. Har FD check:
   - **BCNF?** LHS superkey?
   - Nahi to **3NF?** RHS prime hai (ya LHS superkey)?
   - Nahi to **2NF?** koi non-prime **partial** (key ke part par) depend to nahi?
   - Nahi to **1NF**.
4. **Sabse high** normal form jo *sab* FDs ke liye satisfy ho wahi answer.

### Worked example 1
R(A,B,C,D), F = {AB → C, C → D}. Key: **AB** (AB⁺ = ABCD). Prime: A, B. Non-prime: C, D.
- AB → C: LHS superkey ✓.
- C → D: C superkey nahi; D prime nahi ⇒ **3NF violate**. Ye **transitive** (AB → C → D).
- Partial dependency? D depend C par (non-prime), key ke hisse par nahi ⇒ 2NF ✓.
**Answer: 2NF (not 3NF).**

### Worked example 2
R(A,B,C), F = {AB → C, C → B}. Keys: **AB, AC**. Prime: A, B, C (sab).
- AB → C ✓ (superkey). C → B: C superkey nahi, par **B prime** ⇒ 3NF OK, **BCNF fail**.
**Answer: 3NF, not BCNF.**

### Worked example 3
R(A,B,C), F = {A → B}. Key: **AC**. B non-prime, A → B **partial** (A ⊂ AC) ⇒ **1NF only**.

## 4. Kuch pakke facts (statements wale sawal)
- **Har 2-attribute relation BCNF me hai.**
- Agar **sab attributes prime** hain to relation **3NF me hai** (BCNF ho ya na ho).
- Agar har candidate key **single attribute** hai to 2NF.
- **BCNF => 3NF**, ulta nahi.
- 3NF ki **lossless + dependency-preserving** decomposition **hamesha** possible. BCNF ki **lossless hamesha, dependency preserving nahi hamesha**.
- 1NF me redundancy possible; BCNF me **FD-based redundancy nahi** (par MVD-based ho sakti hai -> 4NF).

## 5. Decomposition

R ko R1, R2, ... me todna. Do properties:

### (a) Lossless-join
R1 ⋈ R2 = R (koi extra/spurious tuple nahi).
**Test (do relations):** R1 ∩ R2 → R1 **ya** R1 ∩ R2 → R2 (F⁺ me). Yaani **common attributes kisi ek relation ki key** hon.

**Example:** R(A,B,C), F = {A→B}. R1(A,B), R2(A,C): R1∩R2 = A; A → AB ✓ ⇒ lossless.
R1(A,B), R2(B,C): B → A? nahi; B → C? nahi ⇒ **lossy**.

**Chase / Tableau test:** 2 se zyada relations ke liye: matrix banao (rows = relations), FDs se symbols equate; koi row **poori 'a'** ho jaye to lossless.

Binary decomposition **hamesha lossy nahi** hoti par R1 ⋈ R2 ⊇ R hamesha (lossy = extra tuples).

### (b) Dependency preserving
F ke **sab FDs** decomposed relations me **alag alag** check ho sakein (join ke bina): (F₁ ∪ F₂ ∪ …)⁺ = F⁺.

**Test:** har FD X → Y ke liye closure ko sirf relation ke andar (restricted) chalao; agar Y mil jaye to preserved.

**Example (BCNF me loss):** R(A,B,C), F={AB→C, C→B}. BCNF ke liye C → B ke basis par R1(C,B), R2(A,C). **AB → C** ab kisi ek relation me nahi -> **dependency lost**. Yahi wajah hai ki **3NF rakhna kabhi behtar** hota hai.

> Agar decomposition **dependency preserving nahi** hai to FD check karne ke liye **join** karna padega (costly).

### Lossless + dependency preserving example
R(A,B,C,D), F = {A→B, B→C, C→D}. R1(A,B), R2(B,C), R3(C,D): lossless (chain), sab FDs (A→B, B→C, C→D) directly ek relation me ⇒ **dependency preserving**.

## 6. BCNF Decomposition algorithm
1. Koi FD X → Y jo BCNF violate kare (X superkey nahi).
2. R ko **R1 = X⁺ (ya XY)** aur **R2 = R − (X⁺ − X)** me todo.
3. Recursively repeat jab tak sab BCNF.
**Lossless guaranteed.**

## 7. 3NF Synthesis algorithm (lossless + dependency preserving)
1. F ka **minimal cover** nikalo.
2. Har FD X → A ke liye relation (X, A) (same LHS wale merge).
3. Agar koi relation **candidate key** nahi rakhta to ek relation **candidate key** ka jodo.
4. Redundant (subset) relations hatao.

## 8. 4NF (MVD)
**Example:** Course(cname, teacher, book): teachers aur books **independent** => cname ↠ teacher | book. Alag: (cname, teacher), (cname, book). MVD trivial agar Y ⊆ X ya X ∪ Y = R.

## 9. Quick Revision
- BCNF: har FD ka LHS superkey. 3NF: LHS superkey **ya** RHS prime.
- Partial dependency = non-prime key ke *hisse* par. Transitive = non-prime → non-prime.
- Lossless: common attrs = key of R1 or R2.
- BCNF: lossless haan, dependency preserving nahi guarantee. 3NF: dono guarantee.
- 2-attribute relation = BCNF. Sab prime = 3NF.

### Practice
1. R(A,B,C), F = {A→B, B→C}. Highest NF? *(Key A. B→C: B superkey nahi, C non-prime ⇒ transitive ⇒ **2NF**)*
2. R(A,B,C,D), F={A→B, C→D}. Keys? NF? *(Key AC; A→B partial ⇒ 1NF)*
3. R(A,B,C), F={A→BC}. NF? *(Key A, BCNF)*
