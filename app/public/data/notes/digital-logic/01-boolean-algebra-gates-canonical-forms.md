# Boolean Algebra, Logic Gates aur Canonical Forms
<!-- topics: digital-logic/boolean-algebra, digital-logic/canonical-normal-form, digital-logic/functional-completeness, digital-logic/dual-function, digital-logic/reduction, digital-logic/conjunctive-normal-form, digital-logic/min-no-gates -->

## 1. Boolean algebra: basics

Variables sirf **0 ya 1**. Operations: **AND (·)**, **OR (+)**, **NOT (′ ya ¯)**.

### Postulates / Laws (yaad rakho, GATE me simplification me kaam aate hain)

| Law | AND form | OR form |
|---|---|---|
| Identity | A·1 = A | A + 0 = A |
| Null (dominance) | A·0 = 0 | A + 1 = 1 |
| Idempotent | A·A = A | A + A = A |
| Complement | A·A′ = 0 | A + A′ = 1 |
| Involution | (A′)′ = A | |
| Commutative | AB = BA | A + B = B + A |
| Associative | (AB)C = A(BC) | (A+B)+C = A+(B+C) |
| Distributive | A(B + C) = AB + AC | **A + BC = (A + B)(A + C)** |
| **Absorption** | **A(A + B) = A** | **A + AB = A** |
| **De Morgan** | **(AB)′ = A′ + B′** | **(A + B)′ = A′B′** |
| **Consensus** | AB + A′C + BC = AB + A′C | (A+B)(A′+C)(B+C) = (A+B)(A′+C) |

**Useful shortcuts:**
- **A + A′B = A + B**, **A(A′ + B) = AB**.
- **AB + AB′ = A** (combining/uniting), **(A+B)(A+B′) = A**.
- **XOR:** A ⊕ B = AB′ + A′B. A ⊕ 0 = A, A ⊕ 1 = A′, A ⊕ A = 0, A ⊕ A′ = 1. Commutative, associative. **A ⊕ B ⊕ C = 1 iff odd number of 1s.**
- **XNOR:** A ⊙ B = AB + A′B′ = (A ⊕ B)′.

### Duality
Kisi Boolean identity me **AND ↔ OR** aur **0 ↔ 1** swap karo to **dual identity** bhi sach hoti hai (variables/complements same).
**Dual of function F** (F^d): AND↔OR, 0↔1 swap (variables nahi badalte).
- **Self-dual function:** **F^d = F** ⟺ **F(x′) = F(x)′**.
- **n variables ke self-dual functions = 2^(2^(n−1))** (2 vars → 4, 3 vars → 16). Truth table ke antipodal (x aur x′) rows ka output ulta hona chahiye, isliye aadhi table free.
- Examples: **F = A** (identity), **A′**, **majority (AB + BC + CA)**, **A ⊕ B ⊕ C** (3 var).

### Number of functions
- **n variables ki truth table me 2ⁿ rows**, isliye **2^(2ⁿ) Boolean functions**. (n=2 → 16, n=3 → 256.)
- **Minterms/maxterms 2ⁿ.**

## 2. Logic Gates

| Gate | Output | Note |
|---|---|---|
| AND | AB | |
| OR | A+B | |
| NOT | A′ | |
| **NAND** | (AB)′ | **Universal** |
| **NOR** | (A+B)′ | **Universal** |
| XOR | A⊕B | Odd parity |
| XNOR | A⊙B | Equality |

**n-input XOR = 1 jab odd number of inputs 1**; **n-input XNOR (= XOR ka complement) = 1 jab even number of 1s.**
**Fan-in, fan-out, propagation delay, noise margin** — gate ke properties. **Open-collector** outputs tied together = **wired-AND**.

### Functional completeness
Set of operators **complete** jab har Boolean function usse ban sake.
- **{NAND}** aur **{NOR}** **alone complete (universal)**.
- **{AND, NOT}**, **{OR, NOT}** complete. **{AND, OR}** **nahi** (NOT nahi ban sakta, monotone). **{XOR}** akela **nahi**. **{XOR, AND}** complete (constant 1 milne par). **{XOR, OR}** with constant.
- **NOT from NAND:** A NAND A = A′. **AND:** (A NAND B) NAND (A NAND B). **OR:** (A NAND A) NAND (B NAND B).
- **MUX (2:1) with constants** complete. **Half adder akela nahi** (sirf XOR, AND). **Implication gate (A → B = A′ + B) with constant 0**: NOT = A → 0; complete.

**Minimum gates NAND-only:** SOP ko double negate: F = AB + CD = ((AB)′(CD)′)′ ⇒ **3 NAND gates**.
**F = AB + A′C** NAND-only: inverters milkar total (A′ ke liye ek NAND + 3 NAND) = **4 NAND** (A′ = A NAND A; AB, A′C, output).

## 3. Canonical forms

### Minterm aur Maxterm
- **Minterm mᵢ:** sab variables ka **AND** (complemented ya uncomplemented) jo **sirf ek row par 1** deta. Row index i ke binary me **1 → variable, 0 → complement.**
  Example (A,B,C): m₅ = 101 → **AB′C**.
- **Maxterm Mᵢ:** sab variables ka **OR**, **sirf ek row par 0**. Binary me **0 → variable, 1 → complement.** M₅ = 101 → **A′ + B + C′**.
- **Relation:** **mᵢ′ = Mᵢ**, **Mᵢ′ = mᵢ**.

### Canonical SOP (Sum of Minterms) — Σm
F = **jin rows par F = 1** unke minterms ka OR.
### Canonical POS (Product of Maxterms) — ΠM
F = **jin rows par F = 0** unke maxterms ka AND.

**Example:** F(A,B,C) = Σm(1, 3, 5, 7) ⇒ ΠM(0, 2, 4, 6). F = **C** (kyunki C = 1 ⟺ odd index).
**Complement:** F′ = Σm(jo F me nahi) = ΠM(jo F me Σm me the).
**n-variable function ka Σm aur ΠM index sets ek doosre ke complement.**

### Kisi expression ko canonical banana
Missing variable ke liye multiply by (X + X′): F = A + B′C (3 vars): A = A(B+B′)(C+C′) = ABC + ABC′ + AB′C + AB′C′; B′C = B′C(A + A′) ⇒ AB′C + A′B′C. Total minterms: {7, 6, 5, 4, 1} ⇒ **Σm(1,4,5,6,7)**.

### Operations on minterm sets (circuit output nikaalna)
Do functions F₁, F₂ ke minterm sets se:
- **F₁·F₂ = intersection**, **F₁ + F₂ = union**, **F₁ ⊕ F₂ = symmetric difference**, **F′ = complement set**.
**Example:** F₁ = Σm(1,2,3), F₂ = Σm(2,3,4): AND = Σm(2,3); OR = Σm(1,2,3,4); XOR = Σm(1,4).

### Dual aur minterm set
**F^d(x) = F′(x′)**: minterm **i ∈ F^d ⟺ (2ⁿ − 1 − i) ∉ F**. Example (3 var): F = Σm(1,2,4)? F^d me i tabhi jab (7 − i) ∉ F: i=0→7∉F ✓, 1→6∉F ✓, 2→5 ∉F ✓, 3→4 ∈F ✗, 4→3 ∉F ✓, 5→2 ∈F ✗, 6→1 ∈F ✗, 7→0∉F ✓ ⇒ F^d = Σm(0,1,2,4,7).

## 4. Conjunctive/Disjunctive Normal Form (logic view)
- **DNF = SOP**, **CNF = POS** (literals ke OR ka AND).
- **Har Boolean formula ka CNF/DNF hota hai** (unique nahi; canonical unique). Conversion me exponential blow-up possible.
- **SAT** CNF pe NP-complete; **Horn clauses** polynomial.

## 5. Boolean expression simplification (algebraic)
**Example 1:** F = AB + A′C + BC ⇒ consensus se **AB + A′C** (BC redundant).
**Example 2:** F = A + A′B + A′B′C ⇒ A + B + C? Step: A + A′B = A + B; (A + B) + A′B′C = A + B + B′C·(A′ ke saath) ⇒ **A + B + C**.
**Example 3:** (A + B)(A + C) = A + BC.
**Example 4:** F = (A + B)′ + (A′ + B)′... = A′B′ + AB′ = B′.
**Example 5:** XY + X′Z + YZ = XY + X′Z (consensus).

## 6. Literal count, gate count
**Literal count** = expression me literals ka total (har baar count). Minimal SOP me kam literals ⇒ kam hardware. **NAND-NAND / NOR-NOR** two-level implementation.
**Two-level SOP:** AND-OR = NAND-NAND. **POS:** OR-AND = NOR-NOR.

## 7. Quick Revision
- Laws: absorption, De Morgan, consensus; A + A′B = A + B.
- Functions: 2^(2ⁿ); self-dual 2^(2^(n−1)).
- Universal: NAND, NOR. {AND, OR} incomplete; {XOR} incomplete.
- Minterm: 1 → variable; maxterm: 0 → variable. Σm ↔ ΠM complement sets.
- Operations on minterm sets: ∩ (AND), ∪ (OR), Δ (XOR).
- n-input XOR = odd parity.

### Practice
1. 3-variable Boolean functions kitne? *(2⁸ = 256)*
2. F = Σm(0,1,2,3) (A,B,C, A MSB): simplify? *(A′)*
3. m₆ (A,B,C) ka expression? *(110 → ABC′)*
4. F₁ = Σm(1,3,5), F₂ = Σm(3,5,6). F₁ ⊕ F₂? *(Σm(1,6))*
