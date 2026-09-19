# First-Order Logic (Predicate Logic): Quantifiers, Translation, Validity
<!-- topics: discrete-mathematics-mathematical-logic/first-order-logic, discrete-mathematics-mathematical-logic/logical-reasoning -->

## 1. Propositional se aage kyun?

"Sab insaan mortal hain; Socrates insaan hai ⇒ Socrates mortal" — propositional logic isko express nahi kar paata. **First-Order Logic (FOL)** me **objects, predicates, quantifiers** hote hain.

## 2. Building blocks

- **Constants:** a, b, Socrates. **Variables:** x, y, z.
- **Predicates:** P(x) (property), R(x, y) (relation) — **arity** (kitne arguments).
- **Functions:** f(x), father(x).
- **Quantifiers:**
  - **∀x** (for all / universal), **∃x** (there exists / existential).
- **Domain (universe of discourse):** x kin values par chalta hai.
- **Free variable** (koi quantifier nahi) vs **bound variable**. **Sentence** = koi free variable nahi (truth value hota).

## 3. Quantifiers ki meaning

- **∀x P(x)** true agar **domain ke har element** ke liye P true.
- **∃x P(x)** true agar **kam se kam ek** element ke liye P true.
- **Finite domain {a₁…aₙ}:** ∀x P(x) ≡ P(a₁) ∧ … ∧ P(aₙ); ∃x P(x) ≡ P(a₁) ∨ … ∨ P(aₙ).
- **Empty domain:** ∀x P(x) vacuously true; ∃x P(x) false. (Standard FOL me domain non-empty.)

### Negation (quantifier ke saath) — GATE ka must
- **¬∀x P(x) ≡ ∃x ¬P(x)**
- **¬∃x P(x) ≡ ∀x ¬P(x)**
- **¬∀x (P → Q) ≡ ∃x (P ∧ ¬Q)**
- **¬∃x (P ∧ Q) ≡ ∀x (P → ¬Q)**

**Example:** "Sab students pass hue" ka negation: **"koi student fail hua"** (∃x ¬Pass(x)), "koi student pass nahi hua" nahi (galat: "koi bhi pass nahi hua" ≠ negation).

## 4. Natural language → FOL (sabse zyada poochha)

### Golden rules
- **"All A are B"** → **∀x (A(x) → B(x))** — **implication use karo, ∧ nahi.**
- **"Some A are B"** → **∃x (A(x) ∧ B(x))** — **∧ use karo, → nahi.**
- **"No A is B"** → ∀x (A(x) → ¬B(x)) ≡ ¬∃x (A(x) ∧ B(x)).
- **"Not all A are B"** → ∃x (A(x) ∧ ¬B(x)).

**Kyun galat combinations:** ∀x (A(x) ∧ B(x)) = "sab cheez A hai aur B" (bahut strong). ∃x (A(x) → B(x)) = true even agar koi A nahi ho (weak, vacuous).

### Examples
- "Har student ko koi ek book pasand hai": ∀x (Student(x) → ∃y (Book(y) ∧ Likes(x, y))).
- "Koi ek book sab students ko pasand hai": ∃y (Book(y) ∧ ∀x (Student(x) → Likes(x, y))).
- "Sab birds udte hain": ∀x (Bird(x) → Flies(x)). "Kuch birds nahi udte": ∃x (Bird(x) ∧ ¬Flies(x)).
- "Sirf ek x": ∃x (P(x) ∧ ∀y (P(y) → y = x)) (**unique existence** ∃!x).
- "Kam se kam do": ∃x∃y (x ≠ y ∧ P(x) ∧ P(y)). "Exactly one" upar wala.
- "Koi sabse bada nahi": ¬∃x ∀y (y ≤ x)...

## 5. Quantifier order (∀∃ vs ∃∀)

> **∀x ∃y R(x, y)** ≠ **∃y ∀x R(x, y)**
> Doosra pehle ko imply karta hai, **ulta nahi**: **∃y ∀x R ⇒ ∀x ∃y R.**

**Example:** R(x, y) = "x ne y ko pyaar kiya".
- ∀x∃y R: har kisi ne kisi na kisi ko pyaar kiya.
- ∃y∀x R: koi ek insaan hai jise **sab ne** pyaar kiya. (Bahut strong.)

**Same type ke quantifiers swap kar sakte hain:** ∀x∀y ≡ ∀y∀x; ∃x∃y ≡ ∃y∃x.
**Domain N, R(x,y) = "x < y":** ∀x∃y (x < y) true (agla number); ∃y∀x (x < y) false (koi sabse bada nahi).

## 6. Distribution / equivalences

| Formula | Equivalent? |
|---|---|
| ∀x (P(x) ∧ Q(x)) | ≡ ∀x P(x) ∧ ∀x Q(x) ✅ |
| ∃x (P(x) ∨ Q(x)) | ≡ ∃x P(x) ∨ ∃x Q(x) ✅ |
| ∀x (P(x) ∨ Q(x)) | ≢ ∀x P(x) ∨ ∀x Q(x) ❌ (sirf ⇐) |
| ∃x (P(x) ∧ Q(x)) | ≢ ∃x P(x) ∧ ∃x Q(x) ❌ (sirf ⇒) |
| ∀x P(x) → ∃x P(x) | valid (non-empty domain) |
| (∀x P(x)) ∨ (∀x Q(x)) → ∀x (P ∨ Q) | valid |
| ∃x (P ∧ Q) → ∃x P ∧ ∃x Q | valid |

**Quantifier movement (x, B me free nahi):**
- ∀x (P(x) ∧ B) ≡ ∀x P(x) ∧ B; ∃x (P(x) ∨ B) ≡ ∃x P(x) ∨ B.
- **∀x (P(x) → B) ≡ ∃x P(x) → B** (quantifier flip ho jaata!). **∃x (P(x) → B) ≡ ∀x P(x) → B.**
- **B → ∀x P ≡ ∀x (B → P).**

## 7. Prenex Normal Form
Saare quantifiers **formula ke shuru me**, baad me quantifier-free matrix. Steps: (1) →/↔ hatao, (2) ¬ andar, (3) variables rename (clash), (4) quantifiers bahar.
**Skolemization:** ∃ ko function/constant se replace (theorem proving/resolution).

## 8. Interpretation, Satisfiability, Validity
**Interpretation** = domain + predicates/functions ka meaning. 
- **Valid** (har interpretation me true), **satisfiable** (koi interpretation me true), **unsatisfiable**.
- **FOL validity undecidable** (Church) par **semi-decidable** (RE).
- **Propositional logic decidable; FOL undecidable** (Monadic FOL decidable).

### Kaise check karein "kya ye formula valid hai"
Counter-model banao: **chhota domain (1–2 elements)** aur predicates ko assign karo jisse formula false ho jaye. Agar mil gaya ⇒ valid nahi.
**Example:** (∀x P(x) ∨ ∀x Q(x)) ↔ ∀x (P(x) ∨ Q(x)): domain {a,b}, P(a) = T, P(b) = F, Q(a) = F, Q(b) = T ⇒ RHS true, LHS false ⇒ **valid nahi**.

## 9. Inference rules (FOL)
- **Universal Instantiation (UI):** ∀x P(x) ∴ P(c).
- **Universal Generalization (UG):** arbitrary c ke liye P(c) ∴ ∀x P(x).
- **Existential Instantiation (EI):** ∃x P(x) ∴ P(c) (naya constant c).
- **Existential Generalization (EG):** P(c) ∴ ∃x P(x).
**Classic syllogism:** ∀x (Man(x) → Mortal(x)), Man(Socrates) ∴ Mortal(Socrates) (UI + MP).

## 10. GATE style questions
1. **Statement ka FOL formula** (∀ ke saath →, ∃ ke saath ∧).
2. **Formula ka negation / equivalent form.**
3. **Kaunsa formula valid/true** given interpretation.
4. **Quantifier order** (∀∃ vs ∃∀) true/false.
5. **Kitne interpretations/kitne true** finite domain me.

**Finite-domain counting:** domain size n, ek unary predicate P: **2ⁿ** interpretations; ∀x P(x) sirf 1 me true; ∃x P(x) 2ⁿ − 1 me true.
**Binary relation R domain n me: 2^(n²) interpretations.**

**Example (GATE-type):** "Har koi jo kisi ko pyaar karta hai, kisi se pyaar bhi paata hai": FOL me nested. Translation practice karo: har quantifier ke andar sahi connective (→ / ∧).

## 11. Quick Revision
- ∀ → implication; ∃ → conjunction.
- ¬∀ = ∃¬; ¬∃ = ∀¬.
- ∀x∃y ≠ ∃y∀x; ∃∀ ⇒ ∀∃.
- ∀ ∧ distributes, ∃ ∨ distributes; ∀∨ aur ∃∧ nahi.
- ∀x (P → B) ≡ (∃x P) → B.
- FOL validity undecidable.

### Practice
1. "Koi student fail nahi hua" ka FOL? *(∀x (Student(x) → Pass(x)) ya ¬∃x (Student(x) ∧ Fail(x)))*
2. ¬∃x (P(x) ∧ Q(x)) ka equivalent? *(∀x (P(x) → ¬Q(x)))*
3. ∃y∀x R(x,y) ⇒ ∀x∃y R(x,y)? *(Haan)*
4. Domain size 3, ek unary predicate P: kitni interpretations? *(8)*
