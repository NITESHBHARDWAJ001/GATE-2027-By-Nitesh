# K-Map aur Minimization: SOP, POS, Don't Care, Prime Implicants, Quine–McCluskey
<!-- topics: digital-logic/k-map, digital-logic/min-sum-of-products-form, digital-logic/min-products-of-sum-form, digital-logic/prime-implicants, digital-logic/static-hazard -->

## 1. K-Map (Karnaugh Map) kya hai?

Truth table ko **grid** me aise likhna ki **adjacent cells me sirf ek variable badle (Gray code order)**. Adjacent 1s ko group karke variables **eliminate** hote hain.

**Cells = 2ⁿ.** 2 var: 2×2, 3 var: 2×4, 4 var: 4×4, 5 var: do 4×4 (32).

### 3-variable map (A row, BC column, Gray order 00 01 11 10)
```
        BC:  00   01   11   10
   A=0  :   m0   m1   m3   m2
   A=1  :   m4   m5   m7   m6
```
### 4-variable map (AB rows, CD columns, Gray order)
```
         CD: 00   01   11   10
   AB=00 :   m0   m1   m3   m2
   AB=01 :   m4   m5   m7   m6
   AB=11 :   m12  m13  m15  m14
   AB=10 :   m8   m9   m11  m10
```
**Adjacency:** row/column ke **edges wrap-around** (top-bottom, left-right, chaaron corners) bhi adjacent.

## 2. Grouping rules (Minimal SOP)

1. Sirf **1s** (ya don't care X) group.
2. **Group size = power of 2** (1, 2, 4, 8, 16).
3. **Jitna bada group, utna kam literals.** Ek group me **k variables eliminate agar size 2ᵏ**.
4. **Sab 1s cover** hone chahiye, **overlap allowed**.
5. **Wrap-around** (edges, corners) allowed.
6. Group ka product term: **jo variables group me constant (same) rahe** wo rakho; jo badle wo hato.

**Example (3 var):** F = Σm(0, 1, 2, 3, 6, 7)?
- m0,m1,m2,m3 (A=0 row) ⇒ **A′**. m2, m3, m6, m7 (B=1 columns) ⇒ **B**. F = **A′ + B**.

**Example (4 var):** F = Σm(0, 2, 8, 10) ⇒ chaaron corners ⇒ **B′D′**.
F = Σm(0, 1, 2, 3, 8, 9, 10, 11) ⇒ **B′** (8 cells).
F = Σm(5, 7, 13, 15) ⇒ **BD**.

### Prime implicants (PI) aur Essential PI (EPI)
- **Implicant:** F ko cover karne wala product term (jo sirf 1s cover kare).
- **Prime implicant:** **maximal** group (kisi bade group ka hissa nahi).
- **Essential PI:** wo PI jo **koi aisa minterm cover karta jo sirf usi se cover hota**.
- **Minimal SOP = sab EPI + baaki 1s ke liye kam se kam PIs.**
**Steps:** (1) sab PIs dhundo, (2) **EPI** pehle, (3) bacha hua cover kam PIs se.
**Ek function ke minimal SOP unique nahi ho sakte** (cyclic covers).

## 3. Don't Care (X / d)
Aisi input combinations jo **kabhi aati nahi ya jinka output matter nahi** (BCD me 10–15). **X ko 1 maan sakte ho agar group bada bane, warna 0.** Sirf grouping ke liye; **X akele cover karna zaroori nahi.**
**Example:** F = Σm(1, 3, 7) + d(0, 5): m1, m3 (A′B′... ) ke saath d0, d5, m7 le lo: group {1,3,5,7} ⇒ **C**; ya {0,1} etc. Minimal: **F = C** (dono 1,3,7 aur d5 cover).

## 4. Minimal POS
**0s ko group** karo (aur don't cares), group ka term **sum** (variables ka complement lo: 0 → variable as is, 1 → complement) ⇒ **F′ ka SOP nikalke complement**.
**Method:** F′ ka minimal SOP nikaalo (0s se), phir **De Morgan** se F = ΠM.
**Example:** F = ΠM(0, 1, 4, 5) (3 var: 0-cells at m0,m1,m4,m5): B=0,C any ⇒ group ⇒ F′ = B′ ⇒ **F = B** (POS: B).
**Minimal SOP aur minimal POS ke literals alag ho sakte.**

## 5. Literal count
**Literal count** = expression me kul literals. Question: "minimal SOP ka literal count?" ⇒ minimal SOP likhkar gino.
**Example:** F = A′B + AB′ + AB = A + B ⇒ literal count 2.

## 6. 5-variable K-map (concept)
Do 4×4 maps (A=0, A=1); **map ke beech "overlap" (mirror) cells adjacent**. Groups across dono maps ho sakte.

## 7. Quine–McCluskey (tabular method)
K-map bade variables ke liye mushkil ⇒ **systematic tabular**:
1. Minterms ko **binary** likho, **1s ke count se group**.
2. **Adjacent groups (ek bit ka fark) combine**, us bit ko **dash (−)** se. Repeat jab tak combine na ho.
3. **Uncombined terms = Prime implicants.**
4. **PI chart** (rows PI, columns minterms). **Essential PIs** (column me akela ✓) chuno. Bacha hua cover.
**Example (3 var):** minterms 1, 3, 5, 7: 001, 011, 101, 111 → (0−1, −01, −11, 1−1) → −−1 = **C**.

## 8. Hazards (static, dynamic)
**Hazard** = circuit me **propagation delay** ki wajah se **transient glitch** jab **ek input change** ho.
- **Static-1 hazard:** output 1 hona chahiye par **momentarily 0** (SOP circuit me do PIs ke beech adjacent groups me).
- **Static-0 hazard:** 0 → 1 → 0 glitch (POS circuit).
- **Dynamic hazard:** output ek change ke dauran kai baar toggle.
**Detect (K-map):** do **adjacent 1s jo alag groups me** hain (koi ek group dono ko cover nahi karta) ⇒ **static-1 hazard**.
**Remove:** **redundant (consensus) term** add karo jo dono adjacent cells ko cover kare.
**Example:** F = A′C′ ... F = AB + A′C: B = C = 1 par A change: static-1 hazard. **Fix:** **BC** add: F = AB + A′C + BC (hazard-free, non-minimal).
**Hazard-free ≠ minimal.** Hazards **combinational circuit** ki timing problem; synchronous sequential me clock se avoid.

## 9. Problem patterns (GATE)
1. **Kmap se minimal SOP/POS** (2–4 var, don't care).
2. **Prime implicants / essential PIs ki count.**
3. **Diye expression ka K-map / equivalent expression.**
4. **Literal count, gate count (NAND-only).**
5. **Static hazard**: kaunsi jagah.
6. **Function ko MUX/decoder se implement** karne se pehle minimize.

**PI counting example:** F = Σm(0,1,2,5,6,7) (3 var): adjacent pairs: (0,1), (0,2), (1,5), (2,6), (5,7), (6,7) — sab size-2 groups, koi 4-group nahi ⇒ **6 prime implicants**, koi essential nahi (cyclic).

## 10. Quick Revision
- Gray code order; edges/corners wrap.
- Group 2ᵏ cells ⇒ k variables eliminate. Larger group = fewer literals.
- PI: maximal; EPI: koi minterm sirf uska. Minimal = EPI + smallest cover.
- Don't care sirf grouping ke liye.
- POS: 0s group, complement/De Morgan.
- Static-1 hazard: adjacent 1s alag groups me ⇒ consensus term.
- Q-M: 1-bit differ combine, dash.

### Practice
1. F = Σm(1, 3, 5, 7, 9, 11, 13, 15) (4 var, D LSB): F? *(D)*
2. F = Σm(0, 4, 8, 12) ⇒? *(C′D′)*
3. F(A,B,C) = Σm(3, 5, 6, 7): minimal SOP? *(AB + AC + BC)*
4. Chaaron corners wale 1s ka term? *(B′D′)*
