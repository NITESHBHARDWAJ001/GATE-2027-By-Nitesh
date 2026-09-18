# Functional Dependencies, Closure, Candidate Keys aur Minimal Cover
<!-- topics: databases/functional-dependency, databases/armstrong-axioms, databases/candidate-key, databases/super-key -->

## 1. Functional Dependency (FD)

**X → Y** ("X Y ko determine karta hai") ka matlab: agar do tuples ki X values same hain to unki Y values bhi **same** hongi.

**Example:** `roll → name` (roll same to name same). `name → roll` nahi (do students ka same naam ho sakta hai).

- **Trivial FD:** Y ⊆ X (e.g., AB → A). **Non-trivial:** Y ⊄ X. **Completely non-trivial:** X ∩ Y = ∅.
- FD **schema-level constraint** hai (sab instances par lagu), sirf ek instance dekh kar FD *prove* nahi hoti, par **violate** dikh sakti hai (do tuples X same, Y alag).

**Instance se FD check:** X ke har distinct value ke liye Y ek hi hona chahiye.

## 2. Armstrong's Axioms (sound + complete)

1. **Reflexivity:** Y ⊆ X ⇒ X → Y.
2. **Augmentation:** X → Y ⇒ XZ → YZ.
3. **Transitivity:** X → Y, Y → Z ⇒ X → Z.

**Derived rules:**
- **Union:** X → Y, X → Z ⇒ X → YZ.
- **Decomposition:** X → YZ ⇒ X → Y, X → Z. (**LHS ko decompose nahi kar sakte**: AB → C se A → C nahi nikalta.)
- **Pseudo-transitivity:** X → Y, WY → Z ⇒ WX → Z.

## 3. Attribute Closure X⁺ (sabse important tool)

X⁺ = un sab attributes ka set jo F se X se **determine** hote hain.

**Algorithm:** result = X; jab tak badhe: koi FD `A → B` jisme A ⊆ result, to result ∪= B.

**Example:** R(A,B,C,D,E), F = {A→B, BC→D, D→E}.
- A⁺ = {A,B}.
- AC⁺: A→B: {A,C,B}; BC→D: +D; D→E: +E → **{A,B,C,D,E}** = sab. Isliye **AC ek superkey**.

**Uses:**
1. **Key finding** (closure = sab attributes).
2. **FD implication check:** X → Y ∈ F⁺ ⟺ Y ⊆ X⁺.
3. **Equivalence of FD sets:** F ≡ G agar F ka har FD G se implied ho aur ulta.

## 4. Candidate Key finding (step-by-step)

1. **Left-only attributes:** jo kisi FD ke **RHS me nahi** aate (sirf LHS me) — wo har key me **zaroor**.
2. Un attributes ka closure lo. Agar sab mil gaye = **wahi ek candidate key** (aur unique).
3. Nahi mile to baaki attributes me se ek ek (ya combinations) add karke closure check; **minimal** rakho.
4. **Attribute jo kisi FD me hi nahi** aata wo bhi key me zaroor.

### Worked example (multiple keys)
R(A,B,C,D,E), F = {AB→C, C→D, D→E, E→A}.
- B kisi RHS me nahi -> **B key me zaroor**.
- AB⁺: C, D, E, A -> sab ✓ -> **AB key**.
- BC⁺: C→D→E→A ✓; **BC key**. BD⁺ ✓ **BD key**. BE⁺ ✓ **BE key**.
- **Candidate keys: AB, BC, BD, BE.** Prime attributes: A, B, C, D, E (sab).

**Number of superkeys:** har key ka superset gino (inclusion–exclusion). Bahut FDs me easy shortcut: complement approach.

**Special cases:**
- Cycle `A→B, B→C, C→A`: **A, B, C har ek key**.
- Sab attributes RHS me aa rahe ho aur koi left-only nahi: closure se try karo.

## 5. Canonical/Minimal Cover

F ka **minimal (canonical) cover** F_c: equivalent set jisme
1. Har FD ka **RHS single attribute**.
2. **Koi extraneous attribute** LHS me nahi.
3. **Koi redundant FD** nahi.

**Steps:**
1. RHS split (A → BC ⇒ A→B, A→C).
2. **LHS me extraneous** hataao: AB → C me A extraneous agar **B⁺ me C** (F ke andar).
3. **Redundant FD** hataao: FD hata ke uska closure check.

**Example:** F = {A→BC, B→C, A→B, AB→C}.
1. Split: A→B, A→C, B→C, A→B(dup), AB→C.
2. AB→C: B→C hai to A extraneous → B→C (duplicate).
3. A→C redundant (A→B→C).
**Minimal cover = {A→B, B→C}.**

(Minimal cover unique nahi hota; par har minimal cover me FDs ki sankhya alag ho sakti hai ya same.)

## 6. FD closure of a set F⁺ (kitne FDs?)
Non-trivial FDs count karna GATE me kabhi aata: R(A,B,C) me sab possible FDs jab A key: X → Y jaha X ⊇ A... Har subset X (superkey) ke liye X → (any subset of attributes). Simple approach: har superkey X ke liye 2^n possible RHS.

## 7. Dependency preservation ka pehla look (detail normalization me)
Decomposition R → R1, R2: **F ki projection** F₁ = {X→Y ∈ F⁺: XY ⊆ R1}. Preserved agar (F₁ ∪ F₂)⁺ = F⁺.

## 8. Multivalued Dependency (MVD) — short
**X ↠ Y**: X ki ek value ke saath Y values ka set **independent** (baaki attributes se). Har FD ek MVD hai (ulta nahi). **4NF** MVD se related. Rules: complementation (X ↠ Y ⇒ X ↠ R−X−Y), augmentation, transitivity.

## 9. Quick Revision
- X → Y valid iff Y ⊆ X⁺.
- Left-only attributes key me zaroori.
- Trivial: Y ⊆ X. LHS ka decomposition allowed nahi.
- Minimal cover: RHS single, extraneous LHS hatao, redundant FD hatao.
- Closure = sab attributes ⇒ superkey; minimal ⇒ candidate key.
- FD instance se prove nahi hoti; sirf violate dikha sakti hai.

### Practice
1. R(A,B,C,D), F={A→B, B→C, C→D}. Candidate key? *(A)*
2. R(A,B,C), F={A→B, B→A}, aur C kisi RHS me nahi. Keys? *(AC, BC)*
3. F={AB→C}. Kya A→C follow karta hai? *(Nahi.)*
