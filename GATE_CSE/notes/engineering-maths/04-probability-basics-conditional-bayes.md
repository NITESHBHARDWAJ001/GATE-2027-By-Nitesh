# Probability I: Basics, Conditional Probability, Independence aur Bayes
<!-- topics: engineering-mathematics-probability/probability, engineering-mathematics-probability/conditional-probability, engineering-mathematics-probability/independent-events, engineering-mathematics-probability/bayes-theorem, engineering-mathematics-probability/bayesian-network, general-aptitude-quantitative-aptitude/probability -->

## 1. Basic definitions

- **Experiment**, **Sample space S** (sab possible outcomes), **Event E ⊆ S.**
- **Equally likely outcomes:** **P(E) = favourable / total.**
- **Axioms:** 0 ≤ P(E) ≤ 1; P(S) = 1; disjoint events ka P(∪) = ΣP.
- **Complement:** P(Eᶜ) = 1 − P(E).
- **Addition rule:** **P(A ∪ B) = P(A) + P(B) − P(A ∩ B).** 3 events: Σ − Σ + P(A∩B∩C).
- **Mutually exclusive (disjoint):** P(A ∩ B) = 0 ⇒ P(A ∪ B) = P(A) + P(B).
- **Bounds:** max(0, P(A)+P(B)−1) ≤ P(A∩B) ≤ min(P(A), P(B)).

## 2. Counting-based probability (classic experiments)

| Experiment | Sample space size |
|---|---|
| n coins | 2ⁿ |
| n dice | 6ⁿ |
| Deck 52 cards | 52; 4 suits × 13 ranks; 12 face cards; 26 red |
| Bag with r red, b blue, k draws | C(r+b, k) (without replacement) |
| Birthdays | 365ⁿ |

**Examples:**
- **2 dice, sum 7:** 6/36 = 1/6. **Sum 8: 5/36. At least one 6: 11/36 = 1 − 25/36.**
- **4 coins, exactly 2 heads:** C(4,2)/16 = 6/16 = 3/8. **At least one head & one tail (4 coins): 1 − 2/16 = 7/8.**
- **Top & bottom cards of shuffled deck dono ace:** (4/52)(3/51) = 1/221.
- **5 cards me 4 aces...**, **flush** etc. combinations se.
- **3 dice, all different: 6·5·4/216 = 5/9.**
- **6 dice, all distinct: 6!/6⁶ = 720/46656 = 5/324 ≈ 0.0154.**
- **Number 1–100 me 2, 3 ya 5 se divisible nahi:** 26/100 (I-E se).
- **Ek digit "0" na aaye 3-digit number me:** 9·9·9/900 (digits 1–9) ... = 729/900.
- **Random 4-digit number ke digits sab alag:** 9·9·8·7/9000.
- **Socks (r red, g green, b blue) 2 nikaale, same colour:** (C(r,2)+C(g,2)+C(b,2))/C(n,2).
- **Birthday problem:** 23 logon me kam se kam ek pair same birthday > 50%.
- **Random permutation me element i, j se pehle:** 1/2 (symmetry).
- **Random subset (2ⁿ −1 non-empty) ka product even:** complement: sab odd elements.

**Tip:** "**at least one**" ⇒ complement; "**order matter ya nahi**" consistent rakho (dono numerator/denominator me same).

## 3. Conditional Probability

**P(A | B) = P(A ∩ B) / P(B)**, P(B) > 0. (Sample space B tak sikud gaya.)
- **Multiplication rule:** **P(A ∩ B) = P(A|B)P(B) = P(B|A)P(A).** Chain: P(A∩B∩C) = P(A)P(B|A)P(C|A∩B).
- **P(A|B) + P(Aᶜ|B) = 1.**
- **P(A|B) ≠ P(B|A)** (dono alag).

**Examples:**
- **2 coins, at least one head hai; dono head?** {HH, HT, TH}: **1/3** (1/2 nahi!).
- **Ek child boy hai; dono boys?** 1/3. **Older boy hai; dono boys:** 1/2.
- **Bag 3 red 2 blue, do draws without replacement, pehla red; doosra red:** 2/4 = **1/2**.
- **Die ek baar, 5 ya 6 aaye to phir se; total sum...** tree diagram.
- **Card: red diya hua; king?** (2/26 = 1/13).

### Tree diagram
Multi-stage experiments: har branch pe probability, **path multiply**, alag paths **add**.

## 4. Total Probability & Bayes

**Partition {A₁, …, Aₙ}** (disjoint, union = S):
- **Total probability:** **P(B) = Σ P(B | Aᵢ) P(Aᵢ).**
- **Bayes:** **P(Aᵢ | B) = P(B | Aᵢ) P(Aᵢ) / Σⱼ P(B | Aⱼ) P(Aⱼ).**
(Prior P(Aᵢ) → Posterior P(Aᵢ|B).)

**Example (disease test):** P(D) = 0.01, sensitivity P(+|D) = 0.99, false positive P(+|¬D) = 0.05.
P(+) = 0.99×0.01 + 0.05×0.99 = 0.0099 + 0.0495 = 0.0594.
**P(D|+) = 0.0099/0.0594 = 1/6 ≈ 0.167** (rare disease me positive test bhi zyada tar false).
**Example (2 machines):** M₁ 60% items, defect 2%; M₂ 40%, defect 5%. P(defect) = 0.012 + 0.02 = 0.032. **P(M₁ | defect) = 0.012/0.032 = 0.375.**
**Example (boxes):** Box1: 3 white 2 black; Box2: 1 white 4 black; box random (1/2 each), ball white nikli; P(Box1) = (0.5·0.6)/(0.5·0.6 + 0.5·0.2) = **0.75**.
**Coin puzzle:** 1 fake (dono side head) + 99 fair; random coin uthake 5 baar toss sab head; P(fake) = 1·(1/100) / [(1/100) + (99/100)(1/32)] ≈ 0.244.

## 5. Independence

**A, B independent ⟺ P(A ∩ B) = P(A)P(B)** ⟺ **P(A|B) = P(A).**
- **Mutually exclusive (P(A∩B)=0, dono >0) ⇒ dependent!** (Exclusive ≠ independent.)
- **A independent B ⇒ A independent Bᶜ, Aᶜ independent Bᶜ.**
- **Pairwise independent ≠ mutually independent** (teen events ke liye P(A∩B∩C) = P(A)P(B)P(C) bhi chahiye).
- **P(at least one of independent A, B) = 1 − (1 − P(A))(1 − P(B)).**
- **Independent coin tosses/dice ke events.**
**Example:** 3 coins: A = pehla H, B = doosra H, C = dono same. Pairwise independent hain par teeno milkar nahi (classic).
**Example (GATE-type):** P(A) = 0.4, P(B) = 0.5 independent; **P(A ∪ B) = 0.7; P(A ∩ B) = 0.2.**
**Example:** P(A) = 0.3, P(B) = 0.4, P(A ∪ B) = 0.58 ⇒ P(A∩B) = 0.12 = 0.3×0.4 ⇒ **independent**.

## 6. Bayesian Network (short)
**DAG jisme nodes random variables**; **Joint = Π P(Xᵢ | parents(Xᵢ))**. **Conditional independence** structure se (d-separation). Chain A → B → C: A ⊥ C | B.
**Example:** A→B, A→C (common cause): joint = P(A)P(B|A)P(C|A). B, C alag par A diya to independent.
**Collider (A → C ← B):** A, B independent; **C diya ho to dependent** (explaining away).
**Parameters count:** har node ke liye 2^(#parents) probabilities (binary).

## 7. Geometric/Sequential probability
- **Kisi event ke pehli baar aane tak trials (geometric):** P(first success on trial k) = (1−p)^(k−1)p.
- **Tie par repeat ("first to win/lower number")**: P = p/(1 − q) jaisa geometric series.
**Example:** Do dice A, B roll, jiska number chhota wo jeete; tie par dobara: P(A jeete) = P(A<B)/(1 − P(tie)) = (15/36)/(30/36) = 1/2.
**Two consecutive tosses same aane tak:** tosses ki count expectation 3 (next chapter).

## 8. GATE patterns
1. **Counting probability** (dice/coins/cards/digits/subsets).
2. **Conditional (given that).**
3. **Total probability + Bayes** (boxes, machines, test).
4. **Independence/exclusive statements.**
5. **Union/intersection bounds.**
6. **Sequential with tie/geometric.**

## 9. Quick Revision
- P(A∪B) = P(A)+P(B)−P(A∩B); complement 1−P.
- P(A|B) = P(A∩B)/P(B); chain rule.
- Total probability; Bayes posterior.
- Independent: P(A∩B) = P(A)P(B); exclusive ≠ independent.
- At least one = 1 − none; without replacement ⇒ combinations.
- P(D|+) can be low for rare D.

### Practice
1. Two dice, P(sum = 9)? *(4/36 = 1/9)*
2. P(A) = 0.5, P(B) = 0.3, exclusive: P(A ∪ B)? *(0.8)*
3. 3 red 2 blue, two draws without replacement both red? *(3/5·2/4 = 3/10)*
4. P(A|B) = 0.4, P(B) = 0.5: P(A ∩ B)? *(0.2)*
