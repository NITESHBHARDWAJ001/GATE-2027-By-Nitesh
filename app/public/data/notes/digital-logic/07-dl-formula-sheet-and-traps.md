# Digital Logic: Formula Sheet, Tables aur GATE Traps
<!-- topics: digital-logic/boolean-algebra, digital-logic/k-map, digital-logic/flip-flop, digital-logic/digital-counter, digital-logic/multiplexer -->

## 1. Formula Sheet

### Boolean / canonical
- Functions of n vars: **2^(2ⁿ)**; self-dual: **2^(2^(n−1))**; minterms: 2ⁿ.
- De Morgan: (AB)′ = A′ + B′; (A+B)′ = A′B′. A + A′B = A + B. Consensus: AB + A′C + BC = AB + A′C.
- Σm ↔ ΠM complement sets. Minterm: 1 → variable; maxterm: 0 → variable.
- Operations on minterm sets: AND = ∩, OR = ∪, XOR = Δ.
- Universal: NAND, NOR. {AND, OR}, {XOR} incomplete.

### K-map
- Group 2ᵏ cells ⇒ k variables eliminated; wrap-around; X only if helps.
- Static-1 hazard: adjacent 1s in different groups ⇒ add consensus term.

### Combinational
- HA: S = A⊕B, C = AB. FA: S = A⊕B⊕Cin, Cout = AB + Cin(A⊕B) (2 HA + OR).
- CLA: G = AB, P = A⊕B, C_{i+1} = G_i + P_iC_i.
- Adder/subtractor: B⊕M, Cin = M. Overflow = C_in,MSB ⊕ C_out.
- Half sub: D = A⊕B, Bor = A′B. Full sub: Bout = A′B + A′Bin + B·Bin.
- Decoder n→2ⁿ; 4→16 = 5 of 2→4; FA = 3→8 decoder + 2 OR.
- MUX 2ⁿ:1 = (2ⁿ−1) of 2:1; n-var function via 2ⁿ⁻¹:1 MUX (var/complement/0/1).
- ROM 2ⁿ × m; n×n multiplier ROM = 2^(2n) × 2n; array multiplier n² AND, (n−1) adders.
- Gray G = B ⊕ (B>>1); BCD +6 correction.

### Sequential
- SR: Q⁺ = S + R′Q (SR = 0). D: Q⁺ = D. JK: Q⁺ = JQ′ + K′Q. T: Q⁺ = T⊕Q.
- Conversions: JK→T J=K=T; SR→D S=D,R=D′; D→T D=T⊕Q.
- Mod-N counter: ⌈log₂N⌉ FFs; f_out = f/N. Ring n states; Johnson 2n states.
- Synchronous counter Tᵢ = Q₀…Qᵢ₋₁. Ripple f_max ≈ 1/(n·t_pd).
- Moore vs Mealy: detector "101" Moore 4, Mealy 3.
- **T_clk ≥ t_cq + t_comb,max + t_su; hold: t_cq + t_comb,min ≥ t_h.**

### Number systems
- 2's complement range −2ⁿ⁻¹…2ⁿ⁻¹−1. Binary→octal 3 bits, →hex 4 bits.
- Fixed point resolution 2⁻ᶠ. IEEE single 1/8/23, bias 127.

## 2. Comparison Tables

| Pair | Fark |
|---|---|
| Latch / Flip-flop | Level / edge |
| Synchronous / Asynchronous | Common clock / ripple |
| Moore / Mealy | f(state) / f(state, input) |
| Ring / Johnson | n / 2n states |
| Decoder / Encoder | n→2ⁿ / 2ⁿ→n |
| MUX / DEMUX | Select data / route data |
| ROM / PLA / PAL | Fixed AND + prog OR / both prog / prog AND + fixed OR |
| Sync / Ripple counter | Fast, complex / slow, simple |
| BCD / Excess-3 / Gray | 8421 / BCD+3 / 1-bit change |

## 3. Top 25 Traps
1. n vars ⇒ 2^(2ⁿ) functions (not 2ⁿ).
2. Minterm/maxterm index notation ulta na karo.
3. {AND, OR} complete nahi; NAND/NOR complete.
4. K-map: Gray order aur wrap-around corners.
5. Don't-care ko zabardasti cover mat karo.
6. Minimal SOP unique nahi ho sakta.
7. Hazard-free ≠ minimal.
8. FA = 2 HA + 1 OR; n-bit adder = 1 HA + (n−1) FA (ya n FA).
9. Overflow = carry into MSB ⊕ carry out.
10. 2ⁿ:1 MUX = 2ⁿ−1 (2:1) MUXes.
11. n-var function ko 2ⁿ⁻¹:1 MUX se (last variable data me).
12. ROM size = 2^(inputs) × outputs.
13. SR NAND latch me active-low; S′=R′=0 invalid.
14. JK 11 = toggle; race-around level-triggered me.
15. Excitation table ke X (don't care) K-map me use.
16. JK→T: J = K = T.
17. Mod-N counter: ⌈log₂ N⌉ FFs; reset N par (not N−1).
18. Ripple counter slow; synchronous fast.
19. Johnson 2n states, ring n.
20. Moore output only state; Mealy input-dependent; states count difference.
21. Setup constraint uses t_comb,max; hold uses t_comb,min.
22. Unsigned vs signed interpretation of bit pattern.
23. Gray: G = B ⊕ (B>>1).
24. BCD invalid 1010–1111; +6 correction.
25. Little-endian LSB at lowest address.

## 4. GATE strategy (DL)
1. **Circuit se expression** → truth table/K-map → answer.
2. **Sequential trace**: initial state se clock-by-clock table.
3. **Counting formulas** (states, FFs, gates) yaad rakho.
4. **MUX/decoder implement**: truth table → data inputs.
5. **Timing**: critical path add karo, units ns/MHz.

## 5. Practice order (web app)
Subjects → Digital Logic: **Boolean Algebra → K-map/Min SOP → Circuit Output → Multiplexer/Decoder → Flip-flop → Counters → Number Representation → IEEE**.
