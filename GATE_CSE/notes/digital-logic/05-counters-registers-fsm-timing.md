# Counters, Shift Registers, FSM Design (Moore/Mealy) aur Timing
<!-- topics: digital-logic/digital-counter, digital-logic/shift-registers, digital-logic/ripple-counter-operation, digital-logic/finite-state-machines, digital-logic/synchronous-asynchronous-circuits, digital-logic/circuit-output -->

## 1. Registers aur Shift Registers

**Register** = n flip-flops (n-bit data store). **Common clock, parallel load.**

### Shift Register
Data har clock par ek position shift. n D flip-flops chain.

| Type | Input | Output |
|---|---|---|
| **SISO** | Serial | Serial (n clock delay) |
| **SIPO** | Serial | Parallel (n clocks ke baad) |
| **PISO** | Parallel | Serial (load + n shifts) |
| **PIPO** | Parallel | Parallel |
| **Universal** | Mode select (left/right/load/hold) | |

- **n-bit serial data ko shift register me load karne ke liye n clock pulses.**
- **Delay:** SISO me output input se **n clock cycles** late.
- **Right shift ≈ ÷ 2** (unsigned), **left shift ≈ × 2** (arithmetic).
- **Serial-to-parallel** aur **parallel-to-serial** converter.

**Trace example:** 4-bit right shift, initial 0000, serial in = 1, 0, 1, 1 (clock by clock): 1000 → 0100 → 1010 → 1101.

## 2. Counters

Counter = **state sequence** ko clock se badhata (binary count). **n FFs ⇒ max 2ⁿ states (mod 2ⁿ)**. **Mod-N counter ko ⌈log₂ N⌉ FFs.**
**Frequency division:** mod-N counter ke **last FF ka output frequency = f_clk / N.**

### 2.1 Asynchronous (Ripple) Counter
Pehle FF ko clock; **har agla FF pichle FF ke output se clocked**. Simple par **delay accumulate**.
- **3-bit up counter (T = 1 / JK J=K=1 falling-edge):** Q₀ clock; Q₁ clock = Q₀; Q₂ clock = Q₁.
  Har FF frequency **half** karta: **Q₀ = f/2, Q₁ = f/4, Q₂ = f/8**.
- **Down counter:** next FF ko Q′ se clock (ya rising edge use).
- **Maximum clock frequency (ripple):** total delay = **n × t_pd** ⇒ **f_max ≈ 1/(n·t_pd + t_su)**. **Synchronous counter se slow.**
- **Glitches**: intermediate states (decoding me galat outputs).
**Example:** 4-bit ripple, t_pd = 20 ns: pura count settle 80 ns ⇒ clock period > 80 ns ⇒ **f_max ≈ 12.5 MHz**.

### Mod-N ripple counter (N ≠ 2ⁿ) via asynchronous reset
**N pe reset:** counter jaise hi count N (binary) ho, **NAND gate se detect** karke sab FFs ko **asynchronous clear**.
**Example: mod-6 counter (0–5):** 3 FFs; **count 6 = 110 aayega ⇒ Q₂Q₁ ko NAND** karke CLR. (Count 6 momentarily dikhta — glitch.)
**Mod-10 (decade):** 4 FFs, reset at 1010 ⇒ **Q₃Q₁ NAND**.
**Kitne FFs:** N = 10 ⇒ ⌈log₂ 10⌉ = 4.

### 2.2 Synchronous Counter
**Sab FFs ko ek hi clock**; next-state combinational logic se. **Fast** (delay ek FF + gates), no ripple glitches, **design complex**.

**3-bit synchronous up counter (T FFs):**
- **T₀ = 1, T₁ = Q₀, T₂ = Q₁Q₀.**
- General: **Tᵢ = Q₀ Q₁ … Qᵢ₋₁.**
**(JK version: Jᵢ = Kᵢ = Tᵢ.)**
**Max frequency = 1/(t_cq + t_AND(n-input) + t_su)** ~ constant.

### 2.3 Design of a synchronous counter (arbitrary sequence)
Steps: (1) **state diagram/sequence**, (2) **state table** (present → next), (3) **FF excitation table** se inputs, (4) **K-map** se minimize, (5) circuit; **unused states ko don't care**, check self-starting.

**Example:** sequence **00 → 01 → 11 → 10 → 00** (Gray, 2-bit) D FFs se:
- Present (Q₁Q₀) → next: 00→01, 01→11, 11→10, 10→00.
- **Q₁⁺ = Q₀**, **Q₀⁺ = Q₁′** (verify each row) ⇒ **D₁ = Q₀, D₀ = Q₁′.** (Yeh actually 2-bit **Johnson counter** hai.)

**Example (JK design):** mod-4 up counter: J₀ = K₀ = 1; J₁ = K₁ = Q₀.

### 2.4 Ring aur Johnson counters (shift register based)
| | **Ring counter** | **Johnson (twisted ring)** |
|---|---|---|
| Feedback | Q_last → D_first | **Q′_last → D_first** |
| Initial | Ek FF 1, baaki 0 (one-hot) | All 0 |
| **States (n FFs)** | **n** | **2n** |
| Decode | Direct (koi gate nahi) | 2-input AND |
- **n-bit ring counter mod-n; n-bit Johnson mod-2n.**
**Ring (4-bit): 1000 → 0100 → 0010 → 0001 → 1000.**
**Johnson (3-bit): 000 → 100 → 110 → 111 → 011 → 001 → 000 (6 states).**
**Self-starting** nahi hote by default (invalid states) — correction logic.
**Frequency:** ring/Johnson output = f/n ya f/2n.

**GATE trace:** 3 D-FFs Johnson, initial 000: **kitne clocks me wapas 000?** 6.

## 3. Finite State Machine (FSM)

FSM = **states + inputs + transitions + outputs**. **State register (FFs)** + next-state logic + output logic. n FFs ⇒ ≤ 2ⁿ states.

### Moore vs Mealy
| | **Moore** | **Mealy** |
|---|---|---|
| Output depends on | **Sirf present state** | **Present state + input** |
| Output timing | State change ke baad (synchronous with clock) | Input change par turant (async glitches possible) |
| States | **Zyada** (usually) | Kam |
| Output kahan | State ke andar | Transition arrow par (input/output) |
| n inputs → outputs | n+1 (initial) | n |

**Moore aur Mealy equivalent** hain; Mealy → Moore: states badh sakte.

### Sequence detector design (favourite)
**Detect "101" (overlapping allowed), Mealy:**
- **S0** (kuch nahi), **S1** (mila "1"), **S2** (mila "10").
- S0: input 0 → S0 /0; input 1 → S1 /0.
- S1: 0 → S2 /0; 1 → S1 /0.
- S2: 0 → S0 /0; **1 → S1 /1** (101 mila; overlap: last 1 nayi sequence ka start).
**3 states ⇒ 2 flip-flops (Mealy).**
**Moore version: 4 states** (S0, S1, S10, S101 — S101 par output 1) ⇒ **2 FFs**.
**Non-overlapping** me aakhir me S0 par jaana.

**State count rule (Moore, detect w of length n):** n + 1 states (overlap allowed); **Mealy: n states.**

### State minimization
**Equivalent states** (same outputs aur equivalent next states) **merge** ⇒ minimal machine. **Implication table / partition method.**
**Example:** states A, B dono me input 0 → C /0, input 1 → D /1 aur baaki same ⇒ A ≡ B merge.

### State assignment
Binary, Gray, **one-hot (n FFs for n states; decoding aasan, kam logic, zyada FFs)**.

### Analysis of FSM given circuit (GATE)
1. FF equations likho. 2. **Next state table**. 3. **State sequence trace initial state se**. 4. Output/period.

## 4. Timing Analysis (Synchronous circuits)

FF parameters: **t_cq (clock-to-Q), t_su (setup), t_h (hold)**. Combinational logic delay t_comb.

**Setup constraint (max frequency):**
> **T_clk ≥ t_cq + t_comb,max + t_su** (+ clock skew)  ⇒  **f_max = 1/T_clk**

**Hold constraint:**
> **t_cq + t_comb,min ≥ t_h** (+ skew)

**Example:** t_cq = 1 ns, t_su = 0.5 ns, longest combinational path 4 ns ⇒ T ≥ 5.5 ns ⇒ **f_max ≈ 181.8 MHz.**
**Pipelining registers** critical path ko todke clock fast (par latency +).
**Clock skew:** alag FFs tak clock ki late/early arrival. **Metastability:** setup/hold violate hone par output unpredictable ⇒ **synchronizer (2 FF)**.
**Critical path** = sabse lamba t_cq + t_comb + t_su.

**Asynchronous input synchronize:** do flip-flops series me.

## 5. Common GATE patterns
1. **State sequence trace** (ring/Johnson/counter with feedback).
2. **Kitne states / distinct states** in circuit (kabhi initial ke hisaab se reachable).
3. **Sequence detector** states count (Moore/Mealy).
4. **Counter design**: mod-N, FFs count, inputs of JK/T.
5. **Output frequency** (divide by).
6. **Max clock frequency** (timing).
7. **Shift register data after k clocks.**

**Example (distinct states):** 2 D-FFs, D₁ = Q₀, D₀ = Q₁′: 00 → 01 → 11 → 10 → 00 ⇒ **4 distinct states**. Agar D₁ = Q₁, D₀ = Q₀ (hold) ho to har starting state par sirf **1 state** (koi change nahi). Isliye **initial state aur reachable states** dekho.
**Example (frequency):** 3-bit ripple counter, clock 8 kHz: Q₂ = **1 kHz**.

## 6. Quick Revision
- SISO delay n clocks; serial n-bit load n clocks.
- Ripple: f/2ⁱ per FF; f_max ≈ 1/(n·t_pd); slower than synchronous.
- Mod-N needs ⌈log₂ N⌉ FFs; reset at N via NAND.
- Synchronous T counter: Tᵢ = Q₀…Qᵢ₋₁.
- Ring n states; Johnson 2n states.
- Moore: output f(state); Mealy: f(state, input). Detector "101": Mealy 3, Moore 4 states.
- T_clk ≥ t_cq + t_comb + t_su; hold: t_cq + t_comb,min ≥ t_h.

### Practice
1. 5-bit Johnson counter: states? *(10)*
2. Mod-12 counter: FFs? *(4)*
3. 4-bit ripple counter, clock 1600 Hz: MSB freq? *(100 Hz)*
4. t_cq = 2, t_su = 1, comb = 7 ns: f_max? *(T ≥ 10 ns ⇒ 100 MHz)*
