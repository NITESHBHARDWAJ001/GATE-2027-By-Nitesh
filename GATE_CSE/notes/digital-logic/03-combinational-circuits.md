# Combinational Circuits: Adders, Subtractors, MUX, Decoder, Encoder, ROM/PLA
<!-- topics: digital-logic/adder, digital-logic/multiplexer, digital-logic/decoder, digital-logic/rom, digital-logic/combinational-circuit, digital-logic/digital-circuits, digital-logic/circuit-output, digital-logic/array-multiplier, digital-logic/carry-generator, digital-logic/memory-interfacing -->

**Combinational circuit** = output **sirf current inputs** par depend (koi memory nahi). Design steps: specification → truth table → K-map/simplify → gates.

## 1. Adders

### Half Adder (HA)
Do 1-bit add: **Sum = A ⊕ B**, **Carry = A·B**. (1 XOR + 1 AND.)

### Full Adder (FA)
Teen 1-bit (A, B, Cin):
- **Sum = A ⊕ B ⊕ Cin**
- **Cout = AB + Cin(A ⊕ B) = AB + BCin + ACin** (majority)
- **FA = 2 HA + 1 OR.** Gate delay: sum 2 XOR delays.

| A B Cin | Sum | Cout |
|---|---|---|
| 0 0 0 | 0 | 0 |
| 0 0 1 | 1 | 0 |
| 0 1 0 | 1 | 0 |
| 0 1 1 | 0 | 1 |
| 1 0 0 | 1 | 0 |
| 1 0 1 | 0 | 1 |
| 1 1 0 | 0 | 1 |
| 1 1 1 | 1 | 1 |

### n-bit Ripple Carry Adder (RCA)
n FAs cascade; **carry ripple**. **Delay ∝ n** (n × carry delay). **Components:** pehla stage HA (Cin = 0) ya FA; **n-bit add = n FAs (ya 1 HA + (n−1) FA)**.
**Example:** 8-bit adder: 8 FA. **Do n-bit numbers add karne ke liye:** 1 HA + (n−1) FA.

### Carry Look-Ahead Adder (CLA)
Carry parallel me generate:
- **Generate Gᵢ = AᵢBᵢ**, **Propagate Pᵢ = Aᵢ ⊕ Bᵢ** (ya Aᵢ + Bᵢ).
- **C_{i+1} = Gᵢ + PᵢCᵢ.**
- **C₁ = G₀ + P₀C₀**
- **C₂ = G₁ + P₁G₀ + P₁P₀C₀**
- **C₃ = G₂ + P₂G₁ + P₂P₁G₀ + P₂P₁P₀C₀**
- **Sum_i = Pᵢ ⊕ Cᵢ.**
**Fast (constant depth carry)** par **gates/fan-in zyada**. **Delay:** n bits ke liye 4-bit CLA blocks ko cascade/tree.
**Carry lookahead generator (4-bit):** C₁..C₄ ke liye 2-level AND-OR.

### Subtractors
- **Half subtractor:** **Diff = A ⊕ B**, **Borrow = A′B**.
- **Full subtractor:** **Diff = A ⊕ B ⊕ Bin**, **Bout = A′B + A′Bin + B·Bin** (= A′(B ⊕ Bin) + B·Bin).
- **Adder/Subtractor (2's complement) ek hi hardware:** **B ko M se XOR** (M = 0 add, M = 1 subtract) aur **Cin = M**: **S = A + (B ⊕ M) + M.**
**Overflow (2's complement) = Cₙ₋₁ ⊕ Cₙ** (carry into MSB XOR carry out).

### BCD adder
BCD digits add (4-bit adder) ⇒ agar **sum > 9 ya carry = 1** to **+6 (0110) correction**. **Correction logic: K = C_out + S₃S₂ + S₃S₁.**

### Multipliers
- **Array multiplier (n × n unsigned):** **n² AND gates**, **(n − 1) n-bit adders** (≈ n(n−2) FA + n HA). **Delay ∝ n** (~ (2n − 1) adder delays).
- **Booth multiplier** (signed).

### Comparator
n-bit A vs B: **A > B, A = B, A < B**. **1-bit:** G = AB′, E = A ⊙ B, L = A′B. **Equality = sab bits XNOR ka AND.**

## 2. Decoder

**n input → 2ⁿ output; ek time par ek output active (minterm generator).** Enable input wale.
- **2→4 decoder:** Yᵢ = mᵢ. **3→8** me 8 AND (3-input).
- **Kisi bhi Boolean function ko decoder + OR gate** se implement (Σm ke outputs ka OR). **Sum aur Cout of FA = 3→8 decoder + 2 OR gates** (S = Σm(1,2,4,7), Cout = Σm(3,5,6,7)).
- **Bade decoder chhote se:** **4→16 = 5 decoders of 2→4** (1 + 4); **6→64 = 9 decoders of 3→8** (1 + 8). Rule: **first-level decoder (upper bits) + enable second-level**.
- **Memory address decoding:** 2^k byte-addressable memory ke liye **k input lines**.

## 3. Encoder

**2ⁿ input → n output** (jo input active uska binary code). **Ek time ek input hi 1** (ya priority).
- **4→2 encoder:** Y₁ = D₂ + D₃, Y₀ = D₁ + D₃.
- **Priority encoder:** kai inputs 1 to **highest priority** ka code; **valid bit**. Example: 4:2 priority (D₃ highest): Y₁ = D₃ + D₂, Y₀ = D₃ + D₂′D₁.
- **Interrupt controller** me use.

## 4. Multiplexer (MUX) — data selector

**2ⁿ data inputs, n select lines, 1 output.** **Y = Σ (mᵢ · Dᵢ)**.
- **2:1 MUX: Y = S′I₀ + S·I₁.**
- **4:1 MUX: Y = S₁′S₀′D₀ + S₁′S₀D₁ + S₁S₀′D₂ + S₁S₀D₃.**
- **Select lines = log₂(inputs).**

### MUX se function implement (GATE ka favourite)
1. **n-variable function ko 2ⁿ:1 MUX se:** n variables select lines pe, data inputs = truth table ke output (0/1).
2. **n-variable function ko 2ⁿ⁻¹:1 MUX + (kabhi inverter) se:** (n−1) variable select, **last variable ya uska complement / 0 / 1** data inputs pe. **Ek n-variable function ke liye minimum MUX: 2ⁿ⁻¹ : 1 + 1 inverter.**
   **Example:** F(A,B,C) = Σm(1, 2, 6, 7) using 4:1 MUX (S₁ = A, S₀ = B; data = f(C)):
   - A B = 00: minterms 0(C=0), 1(C=1): F = C ⇒ D₀ = C
   - 01: m2, m3: F(m2) = 1, F(m3) = 0 ⇒ C′ ⇒ D₁ = C′
   - 10: m4, m5: both 0 ⇒ D₂ = 0
   - 11: m6, m7: both 1 ⇒ D₃ = 1
3. **Bade MUX chhote se:** **4:1 = 3 × (2:1)**, **8:1 = 7 × (2:1)** ya 2 × 4:1 + 1 × 2:1, **16:1 = 5 × 4:1** (4 + 1). Rule: **2ⁿ:1 → (2ⁿ − 1) 2:1 MUXes**.
4. **MUX universal:** constants ke saath **NOT, AND, OR** ban jaate: AND(A,B) = MUX(S=A, I₀=0, I₁=B); OR(A,B) = MUX(S=A, I₀=B, I₁=1); NOT(A) = MUX(S=A, I₀=1, I₁=0).
5. **Feedback MUX:** output ko ek input se jodne par latch/flop jaisa behaviour.

### MUX ke uses
Data routing, **parallel-to-serial converter**, function generator, **register file read port**, ALU input select.

## 5. Demultiplexer (DEMUX)
**1 input → 2ⁿ outputs (select se ek output me).** **Decoder = DEMUX with input = 1 (enable).**

## 6. Code converters
- **Binary ↔ Gray:** G₃ = B₃; **Gᵢ = Bᵢ ⊕ Bᵢ₊₁.** Gray → binary: B₃ = G₃; **Bᵢ = Bᵢ₊₁ ⊕ Gᵢ.** (Cascaded XOR.)
- **BCD to Excess-3:** +3 add. **BCD to 7-segment decoder.**
- **Parity generator/checker:** XOR tree (n-input XOR for n bits; **n − 1 XOR gates**).
**Odd parity bit = even parity bit ka complement.**

## 7. ROM, PLA, PAL (programmable logic)

### ROM (Read Only Memory)
**2ⁿ × m ROM: n address lines, m outputs**; internally **n→2ⁿ decoder (fixed AND array) + programmable OR array**. **Truth table store** ⇒ **koi bhi combinational function**.
- **ROM size = 2^(inputs) × outputs (bits).**
**Example:** **n × n multiplier ROM** = **2^(2n) locations × 2n bits**. 4×4 ⇒ 256 × 8 = **2048 bits**. **Full adder** ROM = 8 × 2.
**Types:** mask ROM, PROM (once), EPROM (UV erase), EEPROM (electrical), Flash.

### PLA (Programmable Logic Array)
**Programmable AND array + programmable OR array.** **Product terms share** karta ⇒ ROM se **kam area** jab kam product terms. Size = (inputs, product terms, outputs).
### PAL: programmable AND, **fixed OR**.

## 8. Timing aur hazards (recap)
**Propagation delay** = input change se output stable. **Critical path** = sabse lamba delay path. **Hazards** (static-1, static-0): consensus term se fix (K-map chapter).
**Circuit delay example:** 4-bit RCA, har FA carry delay 2 ns: total carry ≈ 8 ns.

## 9. Circuit analysis tarika (GATE "output of circuit")
1. **Har gate ke output ko label** (g1, g2...) aur expression likho.
2. **Truth table ya simplify.**
3. **MUX/decoder circuits:** select ke hisaab se output substitute.
4. **Stuck-at fault:** line ko 0/1 par fix karke output compare; **fault detect karne wala input** wahi jo fault-free aur faulty me alag output de.
5. **XOR chain** = parity.

**Example (MUX):** 2:1 MUX, S = A, I₀ = B, I₁ = B′: **Y = A′B + AB′ = A ⊕ B.**
**Example (majority):** F = AB + BC + CA (3-input majority) — **FA ka carry**; K-map se.

## 10. Quick Revision
- HA: S = A⊕B, C = AB. FA: S = A⊕B⊕Cin, Cout = AB + Cin(A⊕B). FA = 2HA + OR.
- CLA: G = AB, P = A⊕B, C_{i+1} = G + PC.
- Adder/subtractor: B ⊕ M, Cin = M. Overflow = C_in,MSB ⊕ C_out.
- Decoder n→2ⁿ; FA = 3→8 decoder + 2 OR; 4→16 = 5 (2→4).
- MUX 2ⁿ:1; n-var function via 2ⁿ⁻¹:1 MUX (last var / complement / 0 / 1).
- 2ⁿ:1 MUX = 2ⁿ−1 (2:1).
- ROM 2ⁿ × m; n×n multiplier ROM = 2^(2n) × 2n.
- Array multiplier: n² AND, (n−1) adders.
- Gray: Gᵢ = Bᵢ ⊕ Bᵢ₊₁.

### Practice
1. 8:1 MUX ko 2:1 MUXes se? *(7)*
2. 3→8 decoder + OR gates se FA ka sum aur carry: OR gates? *(2 (4-input each))*
3. 6-bit binary 101101 → Gray? *(B ⊕ (B>>1) = 101101 ⊕ 010110 = 111011)*
4. 4×4 array multiplier AND gates? *(16)*
