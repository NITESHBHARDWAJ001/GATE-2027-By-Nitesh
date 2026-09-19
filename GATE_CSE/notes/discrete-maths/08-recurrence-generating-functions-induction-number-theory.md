# Recurrences, Generating Functions, Induction, Summations aur Number Theory
<!-- topics: discrete-mathematics-combinatory/recurrence-relation, discrete-mathematics-combinatory/generating-functions, discrete-mathematics-combinatory/summation, discrete-mathematics-combinatory/modular-arithmetic, discrete-mathematics-set-theory-algebra/mathematical-induction, discrete-mathematics-set-theory-algebra/number-theory, discrete-mathematics-set-theory-algebra/polynomials -->

# Part A: Recurrence Relations

## 1. Recurrence banana (counting se)
**Last step / last symbol par cases** likho.
- **n-bit strings jisme do consecutive 1s nahi:** aₙ = aₙ₋₁ (last 0) + aₙ₋₂ (last 01) ⇒ **Fibonacci**. a₁ = 2, a₂ = 3, a₃ = 5, a₄ = 8.
- **n-bit strings jisme "00" nahi:** same recurrence.
- **Tiling 2 × n board dominoes se:** aₙ = aₙ₋₁ + aₙ₋₂.
- **Steps climbing (1 ya 2 step):** Fibonacci. **(1, 2 ya 3 step):** aₙ = aₙ₋₁ + aₙ₋₂ + aₙ₋₃.
- **Tower of Hanoi:** Tₙ = 2Tₙ₋₁ + 1 ⇒ **2ⁿ − 1.**
- **Regions by n lines:** Rₙ = Rₙ₋₁ + n ⇒ 1 + n(n+1)/2.
- **Handshakes / n(n−1)/2:** hₙ = hₙ₋₁ + (n−1).
- **Number of ternary strings with at least one pair "00"...** complement se.

## 2. Solve karna

### (a) Unrolling / substitution
T(n) = T(n−1) + n ⇒ n(n+1)/2. T(n) = 2T(n−1) + 1, T(0)=0 ⇒ 2ⁿ − 1. T(n) = T(n−1) + 2ⁿ ⇒ 2ⁿ⁺¹ − 2 + T(0).

### (b) Linear homogeneous with constant coefficients (characteristic equation)
**aₙ = c₁aₙ₋₁ + c₂aₙ₋₂** ⇒ **r² = c₁r + c₂**.
- **Distinct roots r₁, r₂:** aₙ = A r₁ⁿ + B r₂ⁿ.
- **Repeated root r:** aₙ = (A + Bn) rⁿ.
- Initial conditions se A, B.
**Fibonacci:** r² = r + 1 ⇒ r = (1 ± √5)/2 ⇒ aₙ = (φⁿ − ψⁿ)/√5, **φ ≈ 1.618 (golden ratio)**. **F(n) ≈ φⁿ/√5.**
**Example:** aₙ = 5aₙ₋₁ − 6aₙ₋₂, a₀ = 1, a₁ = 4: r² − 5r + 6 = 0 ⇒ r = 2, 3 ⇒ aₙ = A2ⁿ + B3ⁿ; A + B = 1, 2A + 3B = 4 ⇒ B = 2, A = −1 ⇒ **aₙ = 2·3ⁿ − 2ⁿ**.
**Example (repeated):** aₙ = 4aₙ₋₁ − 4aₙ₋₂: r = 2 (double) ⇒ (A + Bn)2ⁿ.
**Lucas sequence:** L₀ = 2, L₁ = 1, Lₙ = Lₙ₋₁ + Lₙ₋₂ (2, 1, 3, 4, 7, 11...). **Lₙ = φⁿ + ψⁿ.**

### (c) Non-homogeneous
aₙ = c aₙ₋₁ + f(n): **particular solution + homogeneous.** f = constant ⇒ constant guess; f = n ⇒ linear guess.
**Example:** aₙ = 2aₙ₋₁ + 1, a₀ = 0: particular −1 ⇒ aₙ = A2ⁿ − 1, A = 1 ⇒ 2ⁿ − 1.

### (d) Divide & conquer: Master theorem (Algorithms notes).

## 3. Useful sequences
- **Fibonacci:** 1, 1, 2, 3, 5, 8, 13, 21, 34, 55.
- **Divisibility:** **F(3k) even** (har teesra even). **F(m) | F(n) jab m | n.**
- **Catalan:** 1, 1, 2, 5, 14, 42.
- **Harmonic Hₙ = Σ 1/k ≈ ln n + γ.** Recurrence Hₙ = Hₙ₋₁ + 1/n. **n·Hₙ...** identities: Σ_{k=1}^{n} Hₖ = (n+1)Hₙ − n.
- **Induction se proofs:** "har teesra Fibonacci even".

# Part B: Generating Functions

## 4. Ordinary Generating Function (OGF)
Sequence a₀, a₁, a₂ … ⇒ **A(x) = Σ aₙxⁿ**.

### Standard series (yaad karo)
| Sequence | GF |
|---|---|
| 1, 1, 1, … | **1/(1 − x)** |
| 1, a, a², … | **1/(1 − ax)** |
| 1, 2, 3, 4, … (n+1) | **1/(1 − x)²** |
| C(n+k−1, k−1) coefficient | **1/(1 − x)ᵏ** |
| C(n, k) (finite) | **(1 + x)ⁿ** |
| 0, 1, 2, 3 … (n) | **x/(1 − x)²** |
| Fibonacci F₀=0,F₁=1… | **x/(1 − x − x²)** |
| 1, 0, 1, 0, … | 1/(1 − x²) |
| 1/n! (exponential GF) | eˣ |

### Operations
- **Shift (right):** xᵏA(x) ⇒ sequence k position aage. **Scaling:** A(cx). **Sum:** A + B. **Product = convolution:** cₙ = Σ aₖbₙ₋ₖ. **Partial sums:** A(x)/(1 − x). **Derivative:** A′(x) ⇒ (n+1)aₙ₊₁.
**Coefficient of xᵏ in (1 + x)ⁿ = C(n,k); in 1/(1−x)ᵏ = C(n+k−1, k).**

### Applications
- **Counting solutions** x₁ + x₂ + x₃ = n with bounds: har variable ka polynomial (1 + x + … + x^bound), product ka coefficient.
  **Example:** x₁ + x₂ + x₃ = 10, 0 ≤ xᵢ ≤ 5: coefficient of x¹⁰ in (1 + … + x⁵)³.
- **Recurrence solve:** GF banao, partial fractions.
- **Closed form nikalo:** sequence 1, 2, 4, 8 ⇒ 1/(1 − 2x).

**Example (GATE-type):** Coefficient of **x¹⁰ in (1 + x + x² + …)(1 + x²)** ...: expand.
**Example:** OGF of aₙ = 2ⁿ + 3ⁿ ⇒ 1/(1 − 2x) + 1/(1 − 3x).
**Example:** GF of sequence (1, 1, 1, ...) with **a_n = n + 1** ⇒ 1/(1 − x)²; coefficient of x⁴ = 5.

# Part C: Mathematical Induction

## 5. Principle
**P(n) ∀ n ≥ n₀** prove karne ke liye:
1. **Base case:** P(n₀) true.
2. **Inductive step:** P(k) true (**hypothesis**) ⇒ P(k+1) true.
**Strong induction:** P(n₀) … P(k) sab true ⇒ P(k+1). (Fibonacci, prime factorization, recurrence proofs.)

### Classic proofs (GATE me descriptive/MCQ)
- **Σ i = n(n+1)/2**, **Σ i² = n(n+1)(2n+1)/6**, **Σ i³ = [n(n+1)/2]²**, **Σ 2ⁱ (i = 0..n) = 2ⁿ⁺¹ − 1**, **Σ 1/(i(i+1)) = n/(n+1)**.
- **Polygon (n sides) me diagonals = n(n−3)/2** (n ≥ 3): induction step: naya vertex n − 2 (naye diagonals) + 1 (purani side ab diagonal) = n − 1 ⇒ (n+1)(n−2)/2 ✓.
- **n! > 2ⁿ (n ≥ 4).** **2ⁿ > n².** **n³ − n divisible by 3.**
- **Tree: E = V − 1** (induction on vertices).
- **Handshake, Fibonacci: har teesra even.**
**Format:** Base, Assume P(k), Show P(k+1) using P(k).
**Galat proof ki pehchan:** base case skip, "all horses same colour" (k=1 → 2 step fail).

# Part D: Summation

## 6. Standard sums
- **Σ_{i=1}^{n} i = n(n+1)/2**, **Σ i² = n(n+1)(2n+1)/6**, **Σ i³ = (n(n+1)/2)²**.
- **Geometric: Σ_{i=0}^{n} rⁱ = (rⁿ⁺¹ − 1)/(r − 1)**; infinite (|r| < 1) = 1/(1 − r).
- **Arithmetic series:** n/2 (first + last).
- **Σ i·2ⁱ = (n − 1)2ⁿ⁺¹ + 2.** **Σ i·rⁱ** (infinite) = r/(1−r)².
- **Telescoping:** Σ 1/(i(i+1)) = 1 − 1/(n+1).
- **Σ C(n,k) = 2ⁿ.** **Harmonic ≈ ln n.**
- **Σ_{k=0}^{n} k·C(n,k) = n·2ⁿ⁻¹.**

# Part E: Number Theory

## 7. Divisibility, GCD, LCM
- **a | b:** b = ka. **gcd(a,b)·lcm(a,b) = a·b.**
- **Euclid's algorithm:** gcd(a, b) = gcd(b, a mod b). **gcd(48, 18) = gcd(18, 12) = gcd(12, 6) = 6.** Steps O(log).
- **Bezout:** gcd(a,b) = ax + by (**extended Euclid**). **ax + by = c solvable ⟺ gcd(a,b) | c.**
- **Coprime:** gcd = 1.
- **Divisor count:** n = Πpᵢ^eᵢ ⇒ **d(n) = Π(eᵢ + 1)**. **360 = 2³3²5 ⇒ 4·3·2 = 24.** **σ(n) = Π (p^{e+1} − 1)/(p − 1).**
- **Perfect square ⟺ d(n) odd.**
- **Number of divisors that are multiples of m**, **odd divisors** (2 ka power hata do), **divisors of n²**.
- **Primes:** infinite; **sieve**; n composite ⇒ prime factor ≤ √n. **Prime factorization unique (Fundamental theorem).** **Twin primes.** **π(n) ≈ n/ln n.**
- **Factorial trailing zeros:** ⌊n/5⌋ + ⌊n/25⌋ + … (100! ⇒ 24).
- **Number of divisors of n!**, exponent of p in n! = Σ⌊n/pᵏ⌋ (**Legendre**).

## 8. Modular Arithmetic
**a ≡ b (mod m)** ⟺ m | (a − b). **Congruence is equivalence relation**; **Zₘ classes**.
- **(a + b) mod m, (ab) mod m** reduce kar sakte. **Division nahi seedha**: inverse chahiye.
- **Modular inverse a⁻¹ mod m exists ⟺ gcd(a, m) = 1**. Extended Euclid.
  **Example:** 7⁻¹ mod 26: 7·15 = 105 = 4·26 + 1 ⇒ **15**.
- **Linear congruence ax ≡ b (mod m):** gcd(a,m) = g; **solution iff g | b**, **g solutions mod m**.
- **Euler's totient φ(n)** = numbers ≤ n coprime to n; **φ(p) = p − 1; φ(pᵏ) = pᵏ − pᵏ⁻¹; φ(mn) = φ(m)φ(n)** (coprime); **φ(n) = n Π(1 − 1/p).** φ(12) = 4, φ(10) = 4.
- **Fermat's little theorem:** p prime, p ∤ a ⇒ **a^(p−1) ≡ 1 (mod p)** ⇒ aᵖ ≡ a.
- **Euler's theorem:** gcd(a, n) = 1 ⇒ **a^φ(n) ≡ 1 (mod n)**.
- **Wilson's theorem:** (p − 1)! ≡ −1 (mod p).
- **Chinese Remainder Theorem (CRT):** m₁, m₂ coprime: x ≡ a₁ (m₁), x ≡ a₂ (m₂) ka **unique solution mod m₁m₂**.
  **Example:** x ≡ 2 (mod 3), x ≡ 3 (mod 5): x = 8 (8 mod 3 = 2, 8 mod 5 = 3) ⇒ mod 15: **8**.
- **Fast exponentiation:** aᵇ mod m in O(log b).

### Remainder problems (GATE aptitude-type)
**Example:** 2¹⁰⁰ mod 7: 2³ = 8 ≡ 1 ⇒ 2¹⁰⁰ = 2^(99+1) = (2³)³³·2 ≡ **2**.
**Example:** 7¹⁰⁰ mod 10 → last digit cycle 7,9,3,1 (period 4) ⇒ 100 mod 4 = 0 ⇒ **1**.
**Example:** 3¹⁰⁰ mod 13: 3³ = 27 ≡ 1 ⇒ 3¹⁰⁰ = 3^(99)·3 ≡ **3**.
**Example (Fermat):** 5⁹⁶ mod 97 = 1 (a^(p−1)).
**Example:** 10! mod 11 = −1 ≡ 10 (Wilson).

## 9. Polynomials (short)
- **Degree n ⇒ ≤ n roots.** **Fundamental theorem of algebra:** exactly n complex roots (multiplicity ke saath).
- **Factor theorem:** p(a) = 0 ⟺ (x − a) factor. **Remainder theorem:** p(x) ÷ (x − a) ka remainder p(a).
- **Vieta:** sum of roots = −b/a; product = c/a (quadratic).
- **Complex roots conjugate pairs mein** (real coefficients). **Odd degree real polynomial ka kam se kam ek real root.**
- **Polynomial through n+1 points unique degree ≤ n (Lagrange).**
- **Cube roots of unity:** 1, ω, ω², 1 + ω + ω² = 0, ω³ = 1.
- **Number system me quadratic in base b** (roots same base me).

## 10. Countable/uncountable quick link
Sets notes me.

## 11. Problem patterns
1. **Recurrence banana/solve** (characteristic equation).
2. **GF ka closed form / coefficient.**
3. **Induction: base ya step.**
4. **Summation value.**
5. **GCD/LCM/divisor count/factorial zeros.**
6. **Remainder (mod) problems: Fermat, Euler, cycles.**
7. **Inverse/CRT/linear congruence.**

## 12. Quick Revision
- Characteristic eq: distinct roots A r₁ⁿ + B r₂ⁿ; repeated (A + Bn)rⁿ.
- Fibonacci GF x/(1−x−x²); 1/(1−x)ᵏ coefficient C(n+k−1,k−1).
- Induction: base + step; strong induction for recurrences.
- Σi, Σi², Σi³; geometric (rⁿ⁺¹−1)/(r−1).
- gcd·lcm = ab; d(n) = Π(eᵢ+1); zeros ⌊n/5⌋+⌊n/25⌋+….
- Inverse iff gcd = 1; Fermat a^(p−1) ≡ 1; Euler a^φ(n) ≡ 1; CRT unique mod product.

### Practice
1. aₙ = aₙ₋₁ + 6aₙ₋₂ characteristic roots? *(r² − r − 6 = 0 ⇒ 3, −2)*
2. 100! me trailing zeros? *(20 + 4 = 24)*
3. 3¹⁰⁰ mod 7? *(3⁶ ≡ 1; 100 mod 6 = 4; 3⁴ = 81 ≡ 4)*
4. φ(30)? *(30·(1/2)(2/3)(4/5) = 8)*
