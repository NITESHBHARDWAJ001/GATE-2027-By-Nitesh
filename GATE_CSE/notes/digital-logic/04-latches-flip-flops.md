# Sequential Circuits: Latches aur Flip-Flops (SR, D, JK, T)
<!-- topics: digital-logic/flip-flop, digital-logic/synchronous-asynchronous-circuits -->

## 1. Combinational vs Sequential

**Sequential circuit** = output **current input + past (state)** par depend. **Memory element** chahiye: **latch/flip-flop**. **Feedback** hota hai.
- **Synchronous:** sab flip-flops **common clock** se change. Design easy, race-free (mostly), speed = clock.
- **Asynchronous:** koi common clock nahi (ripple counters, latches). Fast par **races/hazards** ka risk.

## 2. Latch vs Flip-Flop

| | **Latch** | **Flip-Flop** |
|---|---|---|
| Trigger | **Level-sensitive** (enable = 1 tak transparent) | **Edge-triggered** (clock edge par) |
| Clock | Enable/level | Rising (↑) / falling (↓) edge |
| Race-around | Ho sakta | Nahi (edge/master-slave) |

## 3. SR Latch

### NOR-based SR latch (active-high)
| S | R | Q(next) | Note |
|---|---|---|---|
| 0 | 0 | Q | **Hold** |
| 0 | 1 | 0 | Reset |
| 1 | 0 | 1 | Set |
| 1 | 1 | **0/0 (invalid/forbidden)** | Q = Q′ = 0; release par undefined |

### NAND-based SR′ latch (active-low inputs)
| S′ | R′ | Q(next) |
|---|---|---|
| 1 | 1 | Hold |
| 0 | 1 | Set (Q = 1) |
| 1 | 0 | Reset (Q = 0) |
| **0** | **0** | **Invalid (Q = Q′ = 1)** |

**Cross-coupled 2 NAND (ya NOR) = 1 bit memory.** Forbidden state se bahar aate waqt **oscillation** ho sakta (S, R dono ek saath release).
**Gated SR latch:** enable (clock) ke saath. **Characteristic equation SR: Q⁺ = S + R′Q, constraint S·R = 0.**

## 4. D Latch / D Flip-Flop

Data ek input D. **Q⁺ = D.** SR ka invalid hataane ke liye (S = D, R = D′).
- **D latch:** enable = 1 tak Q = D (transparent).
- **D flip-flop:** **clock edge par** D sample. **Delay flip-flop** (data ko ek clock delay).
**Uses:** registers, shift registers, data storage, synchronizer.

## 5. JK Flip-Flop

| J | K | Q⁺ | Action |
|---|---|---|---|
| 0 | 0 | Q | Hold |
| 0 | 1 | 0 | Reset |
| 1 | 0 | 1 | Set |
| 1 | 1 | **Q′** | **Toggle** |

**Characteristic equation: Q⁺ = J Q′ + K′ Q.** SR ka invalid (11) yahan toggle ban gaya.
**Race-around condition:** **level-triggered JK** me J = K = 1 aur **clock pulse width > propagation delay** ⇒ output baar-baar toggle. **Fix:** **edge-triggered** ya **master-slave JK**.
**Master–Slave:** do latches (master clock high, slave clock low); output **clock ke falling edge** par change; race-around nahi. **Master-slave = negative edge (ya pulse) triggered, do latches.**

## 6. T Flip-Flop (Toggle)

| T | Q⁺ |
|---|---|
| 0 | Q (hold) |
| 1 | Q′ (toggle) |

**Characteristic equation: Q⁺ = T ⊕ Q.** **JK me J = K = T.** T = 1 constant ⇒ **frequency divide by 2** (output frequency = f/2).
**Uses:** counters, frequency dividers.

## 7. Characteristic aur Excitation tables

### Characteristic tables (Q, inputs → Q⁺)
Upar ke tables. **Characteristic equations:**
| FF | Q⁺ |
|---|---|
| SR | S + R′Q (SR = 0) |
| **D** | **D** |
| **JK** | **JQ′ + K′Q** |
| **T** | **T ⊕ Q = TQ′ + T′Q** |

### Excitation tables (Q → Q⁺ ke liye inputs kya chahiye) — **sequential circuit design ke liye**

| Q → Q⁺ | SR | JK | D | T |
|---|---|---|---|---|
| 0 → 0 | S=0, R=X | J=0, K=X | 0 | 0 |
| 0 → 1 | S=1, R=0 | J=1, K=X | 1 | 1 |
| 1 → 0 | S=0, R=1 | J=X, K=1 | 0 | 1 |
| 1 → 1 | S=X, R=0 | J=X, K=0 | 1 | 0 |

## 8. Flip-Flop conversions

Ek FF se doosra banana: **desired FF ke characteristic + given FF ke excitation** se input logic.

| Conversion | Logic |
|---|---|
| **SR → D** | S = D, R = D′ |
| **JK → D** | J = D, K = D′ |
| **JK → T** | J = K = T |
| **D → T** | D = T ⊕ Q |
| **D → JK** | D = JQ′ + K′Q |
| **T → D** | T = D ⊕ Q |
| **SR → JK** | S = JQ′, R = KQ |
| **SR → T** | S = TQ′, R = TQ |

**Example (JK → T):** T = 1 ⇒ toggle (J = K = 1); T = 0 ⇒ hold (J = K = 0) ⇒ **J = K = T**.

## 9. Triggering aur timing parameters

- **Rising/positive edge (↑), falling/negative edge (↓), level (high/low).**
- **Setup time (t_su):** clock edge se **pehle** data stable rehna chahiye.
- **Hold time (t_h):** clock edge ke **baad** data stable rehna.
- **Clock-to-Q delay (t_cq):** edge se output valid hone tak.
- **Violation ⇒ metastability.**
**Max clock frequency:** **T_clk ≥ t_cq + t_comb(max) + t_su** (+ clock skew). **f_max = 1/T_clk.**
**Hold check:** **t_cq + t_comb(min) ≥ t_h.**
(Detail agle chapter me.)

## 10. Sequential circuit analysis (state table trace)
1. **Flip-flop input equations** likho (D₁ = ..., J₂ = ...).
2. **Next-state table** (present state, input → next state) **characteristic equation** se.
3. **State diagram.** 4. **Trace** clock ke saath.

**Example:** D flip-flop Q, D = Q′ (D ko apne complement se jodo): Q toggle har clock ⇒ **frequency /2**.

## 11. Quick Revision
- SR: S=R=1 invalid; Q⁺ = S + R′Q. D: Q⁺ = D. JK: Q⁺ = JQ′ + K′Q, 11 = toggle. T: Q⁺ = T⊕Q.
- Latch = level; FF = edge. Race-around in level JK; fix master-slave/edge.
- Excitation table for design; conversions (JK→T: J=K=T; SR→D: S=D, R=D′).
- T=1 ⇒ f/2.
- Setup before, hold after clock edge; T_clk ≥ t_cq + t_comb + t_su.

### Practice
1. JK FF J=1, K=1, Q=0: next state? *(1)*
2. D FF se T FF: D = ? *(T ⊕ Q)*
3. NAND SR latch S′ = R′ = 0: result? *(Invalid: Q = Q′ = 1)*
4. T FF T = 1 with 10 MHz clock: Q frequency? *(5 MHz)*
