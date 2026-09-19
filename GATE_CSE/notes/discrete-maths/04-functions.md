# Functions: One-One, Onto, Bijection, Composition, Counting
<!-- topics: discrete-mathematics-set-theory-algebra/functions, discrete-mathematics-set-theory-algebra/onto, discrete-mathematics-set-theory-algebra/identify-function -->

## 1. Function kya hai?

**f : A → B** = A ke **har element ko B me ek aur sirf ek** image. **A = domain**, **B = codomain**, **range/image = {f(a)}** ⊆ B.
Relation jo function tab hai jab **A ka har element exactly ek pair me left me aaye** (no element unmapped, koi do image nahi).

**Number of functions A → B (|A| = m, |B| = n) = nᵐ.**

## 2. Types

| Type | Definition | Test |
|---|---|---|
| **Injective (one-one)** | a₁ ≠ a₂ ⇒ f(a₁) ≠ f(a₂) | Koi do inputs same output nahi (**horizontal line test**) |
| **Surjective (onto)** | ∀b ∃a: f(a) = b | **Range = codomain** |
| **Bijective** | One-one + onto | **Invertible** |
| **Constant** | Sab ko ek value | |
| **Identity** | f(x) = x | |

**Finite sets (|A| = m, |B| = n):**
- **Injective possible ⟺ m ≤ n**; **surjective ⟺ m ≥ n**; **bijective ⟺ m = n**.
- **Injective functions = n!/(n − m)! = P(n, m)** (m ≤ n).
- **Bijections (m = n) = n!.**
- **Onto functions count (m ≥ n)** = **Σₖ (−1)^k C(n,k)(n − k)^m** (inclusion-exclusion) = **n! · S(m, n)** (S = Stirling second kind).
   - **Onto A→B with |A| = 4, |B| = 2: 2⁴ − 2 = 14.** |A| = 3, |B| = 2: 8 − 2 = **6.** |A| = 4, |B| = 3: 3⁴ − 3·2⁴ + 3·1 = 81 − 48 + 3 = **36**.
- **Non-decreasing/monotone functions** {1..m} → {1..n}: C(m + n − 1, m).
- **Finite set S → S:** **injective ⟺ surjective ⟺ bijective** (equal finite size). (Infinite sets me galat: n → n+1 injective not onto.)

**Example:** |A| = 3, |B| = 5: total 5³ = 125; injective 5·4·3 = 60; onto 0 (3 < 5).

## 3. Examples (Z ya R par)
- f(x) = x² on **R**: not injective (±), not onto (negatives). On **R⁺ ∪ {0} → R⁺ ∪ {0}**: bijective.
- f(x) = 2x on Z: injective, **not onto** (odd nahi). On R: bijective.
- f(x) = x³ on R: bijective. f(x) = eˣ : R → R: injective, not onto (positive only); R → R⁺ bijective.
- f(x) = ⌊x⌋: onto Z, not injective. f(n) = n mod k: onto {0..k−1}, not injective.
- f(x) = x + 1 on N: injective, not onto (0 miss). On Z: bijective.
- f(x) = |x|: neither on Z.
**Rule:** domain/codomain badalne se type badal jaata.

## 4. Composition
**(g ∘ f)(x) = g(f(x))**, f : A → B, g : B → C. **Order matter:** g∘f ≠ f∘g generally. Associative: h∘(g∘f) = (h∘g)∘f.

**Important theorems (GATE me har saal):**
- **f, g injective ⇒ g∘f injective.** **f, g surjective ⇒ g∘f surjective.** Bijective ⇒ bijective.
- **g∘f injective ⇒ f injective** (g nahi zaroori).
- **g∘f surjective ⇒ g surjective** (f nahi zaroori).
- **g∘f bijective ⇒ f injective aur g surjective.**
**Example:** f : {1,2} → {1,2,3}, f(x) = x (injective, not onto); g : {1,2,3} → {1,2}, g(1)=1,g(2)=2,g(3)=2 (onto, not injective). g∘f = identity {1,2} (bijective) — f injective ✓, g onto ✓, par f onto nahi, g injective nahi.

## 5. Inverse
**f⁻¹ exist ⟺ f bijective.** (f⁻¹ ∘ f = id_A). **Left inverse ⟺ injective; right inverse ⟺ surjective.**
**(g∘f)⁻¹ = f⁻¹ ∘ g⁻¹.**
**Example:** f(x) = 3x + 2: f⁻¹(y) = (y − 2)/3.

## 6. Special functions
- **Floor ⌊x⌋, ceiling ⌈x⌉**; **⌈x⌉ = −⌊−x⌋**; ⌊x + n⌋ = ⌊x⌋ + n (n integer).
- **Characteristic function**, **hash function**, **permutation** (bijection S → S; n! permutations).
- **Fixed point:** f(x) = x. **Involution:** f∘f = id. **Idempotent:** f∘f = f.
- **Number of involutions on n elements:** 1, 2, 4, 10, 26 (a(n) = a(n−1) + (n−1)a(n−2)).
- **Order of permutation** = lcm of cycle lengths.

## 7. Pigeonhole Principle (functions ka application)
**n + 1 objects, n boxes ⇒ kisi box me ≥ 2.** **f : A → B, |A| > |B| ⇒ f injective nahi.**
**Generalized:** **N objects, k boxes ⇒ kisi box me ≥ ⌈N/k⌉.**
**Example:** 13 log ⇒ kam se kam 2 ka janm-mahina same (12 mahine). 25 students, 4 grades ⇒ ≥ ⌈25/4⌉ = 7 ka same grade.

## 8. Cardinality comparison
**|A| = |B|** agar bijection. **A → B injective ⇒ |A| ≤ |B|.** **Cantor–Schröder–Bernstein:** injections A→B aur B→A dono ⇒ bijection exist.
**P(A) ka |A| se bada hona** (Cantor). **N → N functions uncountable.**

## 9. Problem patterns
1. **Diya function injective/surjective?** (domain/codomain dekho)
2. **Kitne functions/injective/onto** (formulas).
3. **Composition properties** (theorems).
4. **Statement "g∘f onto ⇒ ?"**
5. **Inverse existence/formula.**
6. **Pigeonhole minimum.**

## 10. Quick Revision
- Functions nᵐ; injective P(n,m); bijections n!; onto via inclusion-exclusion.
- Finite same-size: inj ⟺ surj ⟺ bij.
- g∘f inj ⇒ f inj; g∘f onto ⇒ g onto.
- Inverse iff bijective; (g∘f)⁻¹ = f⁻¹g⁻¹.
- Pigeonhole ⌈N/k⌉.

### Practice
1. |A| = 4, |B| = 6: injective functions? *(6·5·4·3 = 360)*
2. A→B onto, |A| = 4, |B| = 2? *(14)*
3. f(x) = x² : Z → Z: injective? onto? *(Nahi, Nahi)*
4. 30 log, 7 din (week): ek din me kam se kam? *(⌈30/7⌉ = 5)*
