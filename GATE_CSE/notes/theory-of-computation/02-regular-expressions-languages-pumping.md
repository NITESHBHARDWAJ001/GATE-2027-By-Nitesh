# Regular Expressions, Regular Languages, Closure aur Pumping Lemma
<!-- topics: theory-of-computation/regular-language, theory-of-computation/regular-expression, theory-of-computation/regular-grammar, theory-of-computation/pumping-lemma, theory-of-computation/closure-property -->

## 1. Regular Expressions (RE)

RE = language describe karne ka **algebraic** tareeka.

**Base:** ∅, ε, a (a ∈ Σ). **Operators (precedence: \* > concatenation > +)**:
- **Union**: `a + b` (ya a|b). **Concatenation**: `ab`. **Star**: `a*` = {ε, a, aa, ...}.

**Examples (Σ = {a,b}):**
- All strings: **(a+b)\***. Ends with "ab": **(a+b)\*ab**. Contains "aa": (a+b)\*aa(a+b)\*.
- Even length: **((a+b)(a+b))\***. Exactly two a's: b\*ab\*ab\*.
- Starts and ends with same symbol: a(a+b)\*a + b(a+b)\*b + a + b.
- No two consecutive a's: **(b + ab)\*(a + ε)**.

### RE identities (GATE me equivalence poochha jaata)
- `(a*)* = a*`, `a*a* = a*`, `(a+b)* = (a*b*)* = (a*+b*)*`.
- `a(ba)* = (ab)*a`. **`(a+b)* ≠ a* + b*`** (a*+b* me "ab" nahi).
- R + ∅ = R; R·∅ = ∅; R·ε = R; ∅* = ε; **R\* = ε + R R\***.
- `(a*b)*a* = (a+b)*` (koi bhi string ko "b tak ke blocks" + aakhir ke a's me tod sakte).

**Tip:** do REs equivalent hain ya nahi, chhote strings (ε, a, b, aa, ab...) se test karo.

## 2. RE ⇄ Finite Automata

- **RE → ε-NFA (Thompson's construction):** union: naye start se ε dono; concat: ε jodna; star: loop + ε.
- **DFA → RE (state elimination / Arden's theorem):** Arden: **R = Q + RP ⇒ R = QP\*** (P me ε nahi).
  Example: q₁ = ε + q₁·a + q₂·b ... equations solve.
- **Equivalence:** RE, DFA, NFA, ε-NFA, **regular (right/left-linear) grammar** sab **regular languages** hi.

**Regular grammar:** productions **A → aB | a | ε** (right linear) ya **A → Ba | a** (left linear). **Mixed (kabhi left kabhi right) linear regular nahi hoti.**

**Example (grammar → language):** S → aS | bA, A → aA | ε: L = a\* b a\*.

## 3. Regular Languages: closure properties

**Regular languages in operations ke under closed:** union, intersection, complement, difference, concatenation, Kleene star, **reversal, homomorphism, inverse homomorphism, quotient, prefix/suffix/substring closure, sab finite languages**.

Proofs idea: union/concat/star (RE ya NFA), complement (DFA final flip), intersection (**product construction**: n×m states), difference L₁ − L₂ = L₁ ∩ L₂ᶜ.

**Product construction:** intersection/union ke DFA me states = **|Q₁| × |Q₂|**.

## 4. Non-regular languages: Pumping Lemma

**Pumping Lemma (regular):** L regular ⇒ ∃ **p (pumping length)** s.t. har w ∈ L, |w| ≥ p ko **w = xyz** likh sakte hain:
1. **|xy| ≤ p**, 2. **|y| ≥ 1**, 3. **∀ i ≥ 0: xyⁱz ∈ L**.

> **Ye sirf *necessary* condition hai** (pumping lemma satisfy hone se regular *prove nahi* hota). Iska use **non-regular prove karne** me: contradiction.

### Proof method (Adversary game)
1. Maan lo L regular; p pumping length.
2. **Aisa w ∈ L chuno jiski |w| ≥ p** (smart choice).
3. **Koi bhi split** xyz (|xy| ≤ p, |y| ≥ 1) ke liye **koi i** dikhao ki xyⁱz ∉ L.

**Example: L = {aⁿbⁿ}:** w = aᵖbᵖ; |xy| ≤ p ⇒ y sirf a's. i = 2: a's zyada → ∉ L. **Non-regular.**
**Example: L = {w : n_a(w) = n_b(w)}** non-regular. **{aⁿ² }**, **{a^(2ⁿ)}**, **{ww}**, **{wwᴿ}** (palindromes), **{aⁿbᵐ : n > m}**, **primes length** — sab non-regular.

**Regular hain (dhoka):** `{aᵐbⁿ : m,n ≥ 0}` (a\*b\*), `{w : n_a(w) mod 2 = 0}`, `{aⁿbᵐ | n + m even}`, **finite languages**, `{a^(n) : n mod k = r}`.
**Important:** "equal number of 0s and 1s" non-regular, **par "equal number of substrings 01 aur 10"** regular (surprise!).

**Tricks:** kisi language ko regular languages ke saath closure operations se relate karke prove: e.g., L ∩ a\*b\* = {aⁿbⁿ} non-regular ⇒ L non-regular (regular closed under ∩).

## 5. Myhill–Nerode theorem

Relation ≡_L: x ≡ y ⟺ ∀ z (xz ∈ L ⟺ yz ∈ L). **L regular ⟺ ≡_L ke classes finite.** **Minimal DFA ke states = classes ki count.**
**Example:** {aⁿbⁿ}: a, aa, aaa, ... sab alag classes (infinite) ⇒ non-regular.
**Count states:** kitne alag "futures" (suffix behaviours) hain, wahi minimal DFA ke states.

## 6. Decision problems (regular languages)
Sab **decidable**: **membership, emptiness, finiteness, equivalence, universality (L = Σ\*), containment**.
- Emptiness: final state reachable?
- Infinite: reachable cycle me se final tak path.
- Equivalence: symmetric difference empty ya minimal DFA compare.

## 7. Regular languages ke kuch important results
- **Regular ∩ CFL = CFL** (closure of CFL under regular intersection).
- **Regular language ka subset regular nahi zaroori** (a\*b\* ka subset {aⁿbⁿ}).
- **L regular ⇒ Lᵏ, Lᴿ, prefix(L), suffix(L)** regular.
- **Infinite union** of regular languages regular nahi (e.g., ∪{aⁿbⁿ}).

## 8. Kaise decide karein regular hai ya nahi (checklist)
1. **Kya finite memory kaafi hai?** Unbounded counting/matching (aⁿbⁿ, ww, palindrome) ⇒ non-regular.
2. **Counting modulo ya bounded** ⇒ regular.
3. **Closure trick** (∩ a\*b\*).
4. **Pumping/Myhill-Nerode** se prove.
5. Language ko RE/DFA me likh sako ⇒ regular.

## 9. Quick Revision
- RE precedence: star > concat > union. (a+b)\* ≠ a\*+b\*.
- Arden: R = Q + RP ⇒ R = QP\*.
- Regular closed under ∪, ∩, complement, concat, star, reversal, homomorphism.
- Pumping lemma: |xy| ≤ p, |y| ≥ 1, xyⁱz ∈ L; **sirf non-regular prove karta hai**.
- aⁿbⁿ, ww, wwᴿ, primes, squares non-regular.
- Sab decision problems regular par decidable.
- Product construction: |Q₁|×|Q₂|.

### Practice
1. RE for "even number of b's" over {a,b}? *(a\*(ba\*ba\*)\*)*
2. {aⁿbᵐcⁿ...} regular? *(Nahi, n ka match chahiye)*
3. L = {a^m b^n : m,n ≥ 0} regular? *(Haan, a\*b\*)*
4. DFA₁ (3 states) ∩ DFA₂ (4 states): product states? *(12)*
