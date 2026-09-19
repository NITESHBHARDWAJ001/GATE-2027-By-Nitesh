# Combinatorics: Counting Principles, Permutations, Combinations, Inclusion–Exclusion
<!-- topics: discrete-mathematics-combinatory/combinatory, discrete-mathematics-combinatory/counting, discrete-mathematics-combinatory/balls-in-bins, discrete-mathematics-combinatory/pigeonhole-principle -->

## 1. Basic principles

- **Rule of Sum:** kaam A ke m tareeke **ya** B ke n tareeke (dono saath nahi) ⇒ **m + n**.
- **Rule of Product:** kaam step 1 (m tareeke) **aur** step 2 (n tareeke) ⇒ **m × n**.
- **Complement counting:** "kam se kam ek" = Total − "ek bhi nahi".
- **Bijection:** do counting problems ka same answer.

**Example:** 3-digit numbers jinme koi digit repeat na ho: 9 × 9 × 8 = **648** (pehla 1–9, doosra 0–9 except pehla: 9, teesra: 8).
**Even 3-digit distinct digits:** last digit 0 (1 way): 9·8 = 72; last digit 2/4/6/8 (4 ways): pehla 8 (0 aur last hatao), beech 8: 4·8·8 = 256 ⇒ **328**.

## 2. Permutations aur Combinations

- **Permutation P(n, r) = n!/(n−r)!** (ordered, no repetition). **All n: n!.**
- **Combination C(n, r) = n!/(r!(n−r)!)** (unordered).
- **Repetition allowed ordered:** nʳ.
- **Identities:** C(n,r) = C(n,n−r); C(n,r) + C(n,r−1) = C(n+1,r) (Pascal); **Σ C(n,k) = 2ⁿ**; **Σ (−1)ᵏC(n,k) = 0**; **Σ k C(n,k) = n2ⁿ⁻¹**; Vandermonde: Σ C(m,i)C(n,k−i) = C(m+n,k); **Σ C(n,k)² = C(2n,n)**.
- **Binomial theorem:** (x + y)ⁿ = Σ C(n,k) xⁿ⁻ᵏ yᵏ. **Coefficient of xᵏ in (1 + x)ⁿ = C(n,k).**
- **Multinomial:** (x₁+…+x_k)ⁿ coefficient = n!/(n₁!…n_k!).

### Arrangements with repetition (identical objects)
**Word ke letters ka arrangement = n!/(n₁! n₂! …)**. "**MISSISSIPPI**": 11!/(4! 4! 2!) = **34,650**. "**LEVEL**": 5!/(2!2!) = 30.
**Constraints:** 
- **Do letters saath saath:** unko ek block maano.
- **Do letters alag alag (koi adjacent nahi):** total − adjacent, ya gaps method: baaki arrange, phir gaps me daalo.
- **Palindromes:** length n me ⌈n/2⌉ free positions.
**Example:** 5 log line me, A aur B saath: 4! × 2! = **48**; A, B saath nahi = 120 − 48 = **72**.

### Circular arrangements
**n distinct log circular table: (n−1)!**. **Reflection same (necklace/beads): (n−1)!/2.** **Do log saath: (n−2)! × 2.**

### Selection with constraints
- **n me se r select, ek particular hamesha include:** C(n−1, r−1); **ek exclude:** C(n−1, r).
- **Committee: m men, w women se team with at least ...** complement/cases.
- **Subsets of size k with no two consecutive from {1..n}: C(n−k+1, k).**

## 3. Distribution: Balls in Bins (stars and bars)

| Balls | Bins | Empty allowed? | Count |
|---|---|---|---|
| **Identical** n | **Distinct** k | Haan | **C(n + k − 1, k − 1)** |
| Identical n | Distinct k | **Nahi (≥ 1 each)** | **C(n − 1, k − 1)** |
| **Distinct** n | Distinct k | Haan | **kⁿ** |
| Distinct n | Distinct k | Nahi (onto) | **k! S(n,k)** = Σ(−1)ʲC(k,j)(k−j)ⁿ |
| Distinct n | **Identical** k | Nahi | **S(n,k)** (Stirling 2nd kind) |
| Identical n | Identical k | Haan | **Partitions of n into ≤ k parts p(n, ≤k)** |

**Integer equation x₁ + x₂ + … + x_k = n** (non-negative solutions) = **C(n + k − 1, k − 1)**. **Positive solutions: C(n − 1, k − 1).** **Lower bounds xᵢ ≥ aᵢ:** n ko (n − Σaᵢ) se replace.
**Example:** x + y + z = 10, non-negative: C(12, 2) = **66**; positive: C(9, 2) = **36**; x ≥ 2: C(10,2) = 45 (n − 2 = 8: C(10,2)).
**Example (GATE):** 5 identical balls, 3 distinct bags: C(7, 2) = **21**.
**Multiset of size r from n types:** C(n + r − 1, r).

## 4. Inclusion–Exclusion Principle

**|A₁ ∪ … ∪ Aₙ| = Σ|Aᵢ| − Σ|Aᵢ∩Aⱼ| + Σ|Aᵢ∩Aⱼ∩Aₖ| − …**
**Onto functions** aur **derangements** isi se.
**Example:** 1–100 me 2, 3 ya 5 se divisible: 50 + 33 + 20 − 16 − 10 − 6 + 3 = **74**. (Ek bhi nahi: 26.)
**Numbers ≤ n coprime to n:** φ(n) = n Π(1 − 1/p).

### Derangements Dₙ
Har element apni original jagah par **nahi**.
> **Dₙ = n! Σ (−1)ᵏ/k! = (n−1)(Dₙ₋₁ + Dₙ₋₂)**, D₁ = 0, D₂ = 1.
**D₃ = 2, D₄ = 9, D₅ = 44, D₆ = 265.** Dₙ ≈ n!/e.
**Exactly k fixed points:** C(n,k) · D_{n−k}.
**Repeated letters wala derangement (LILAC, L identical):** Inclusion–exclusion, ya count: 12 (2020 GATE).

## 5. Pigeonhole Principle

- **n + 1 objects, n boxes ⇒ ≥ 2 kisi ek me.**
- **Generalized: N objects, k boxes ⇒ ≥ ⌈N/k⌉ kisi box me.**
- **Minimum guarantee:** worst case + 1.
**Example:** 52 cards me se **kam se kam kitne** nikalen ki **2 same suit** pakka: 4 suits ⇒ 5. **3 same suit:** 9. **Ek hi rank ke 2:** 13 ranks ⇒ 14.
**Example:** {1..2n} me se n+1 numbers chuno ⇒ do numbers consecutive; ya ek doosre ka multiple.
**Parity trick:** jodi (a, b) ki parity ke 4 classes (E,E),(E,O),(O,E),(O,O). **5 ordered pairs** lene par do pairs ki parity same ⇒ unka **sum aur difference dono even** (minimum 5).

## 6. Catalan aur special sequences

- **Catalan Cₙ = C(2n,n)/(n+1)**: 1, 1, 2, 5, 14, 42, 132.
  Counts: **balanced parentheses (n pairs), binary trees (n nodes), BSTs, triangulations of (n+2)-gon, ways to multiply n+1 matrices, Dyck paths, stack permutations.**
- **Lattice paths (0,0)→(m,n) right/up: C(m+n, m).** **Paths not crossing diagonal (Catalan)** Cₙ.
  **With robot moves + hitting constraints:** **through point (a,b): product.**
- **Binary strings length n: 2ⁿ.** **No two consecutive 1s: F(n+2)** (n=3 → 5). **Equal 0s and 1s (length 2n): C(2n, n).** **Prefix condition (Dyck): Catalan.**
- **Strings with exactly k ones: C(n,k).**
- **Substrings of a string length n: n(n+1)/2** (distinct positions), +1 empty.
- **Subsets with sum...**, **number of divisors** (number theory chapter).
- **Stirling number S(n,2) = 2ⁿ⁻¹ − 1.** **S(n,n−1) = C(n,2).**
- **Partitions p(n):** 1, 2, 3, 5, 7, 11 (n = 1..6).

## 7. Counting in graphs/sets (quick links)
- Subsets 2ⁿ; relations 2^(n²); functions nᵐ; labeled graphs 2^(n(n−1)/2); labeled trees nⁿ⁻² (Discrete notes ke baaki chapters).

## 8. Problem patterns
1. **Arrangements of letters** (repeats, adjacency).
2. **Distributions / integer solutions** (stars & bars).
3. **Inclusion–exclusion** (divisibility, onto, derangement).
4. **Pigeonhole minimum.**
5. **Catalan-type** (paths, parentheses, trees).
6. **Binary string counts with restrictions** (recurrence).

## 9. Quick Revision
- Sum/product; complement.
- P(n,r), C(n,r); MISSISSIPPI-type n!/Πnᵢ!; circular (n−1)!.
- Identical→distinct: C(n+k−1,k−1); positive C(n−1,k−1).
- I-E; Dₙ = (n−1)(Dₙ₋₁+Dₙ₋₂): 0,1,2,9,44,265.
- Pigeonhole ⌈N/k⌉; Catalan C(2n,n)/(n+1).
- No two adjacent 1s: Fibonacci.

### Practice
1. "GATE" letters arrangements? *(24)*
2. 6 identical toffees, 3 kids: ways? *(C(8,2) = 28)*
3. D₄? *(9)*
4. Kam se kam kitne cards se 3 same suit pakka? *(9)*
