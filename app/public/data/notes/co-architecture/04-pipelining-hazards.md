# Pipelining: Speedup, Hazards, Forwarding aur Branch Handling
<!-- topics: co-architecture/pipelining, co-architecture/data-dependency, co-architecture/data-hazards, co-architecture/hazards, co-architecture/stall -->

## 1. Pipelining ka idea

Kapde dhone ki assembly line: wash → dry → iron. Ek load wash ho chuka to agla load wash me daalo, dry ka wait mat karo. Instruction ko **stages** me todo aur **ek saath alag alag instructions alag stages me**.

**Classic 5-stage RISC pipeline:**
1. **IF** (Instruction Fetch)  2. **ID** (Decode + register read)  3. **EX** (ALU)  4. **MEM** (memory access)  5. **WB** (write back)

Har stage ke beech **pipeline registers**. **Clock cycle = sabse slow stage ka delay + register overhead.**

## 2. Timing aur Speedup (GATE ka core)

`k` stages, `n` instructions, cycle time `t` (sabhi stage barabar):

- **Non-pipelined time** = n × k × t
- **Pipelined time** = **(k + n − 1) × t**  (pehli instruction k cycle, baaki har ek 1 cycle)
- **Speedup = n·k / (k + n − 1)** → **k** (jab n → ∞)

**Example:** k = 5, n = 100, t = 2 ns. Pipelined = (5 + 99) × 2 = **208 ns**. Non-pipelined = 100 × 5 × 2 = 1000 ns. **Speedup = 4.81**.

**Unequal stages:** pipeline cycle time = **max stage delay** (+ latch delay). Non-pipelined cycle = **sum of stage delays**.

**Example:** stage delays 5, 8, 6, 10, 7 ns; latch 1 ns. Pipeline t = 10 + 1 = 11 ns. Non-pipelined: 5+8+6+10+7 = 36 ns. Speedup (large n) = 36/11 ≈ 3.27.

**Ideal CPI = 1**. **Throughput** = 1 instruction per cycle (steady state). **Latency** ek instruction ka kam nahi hota (balki thoda badhta hai latch overhead se).

**Pipeline CPI with stalls:** **CPI = 1 + (stall cycles per instruction)**. **Speedup = pipeline depth / (1 + stalls per instruction)**.

## 3. Hazards (pipeline ki problems)

### (a) Structural hazard
Do instructions **ek hi resource** ek saath maangein (single memory port me IF aur MEM). Fix: alag instruction/data memory (Harvard), resource duplicate, stall.

### (b) Data hazard
Instruction ko wo data chahiye jo pichhli instruction abhi produce nahi kar paayi.

| Type | Matlab | In-order pipeline me? |
|---|---|---|
| **RAW** (Read After Write) | Baad wali instruction pehle wali ka **result padhe** (true dependency) | **Haan, main hazard** |
| **WAR** (Write After Read) | Baad wali pehle wali ke read ke pehle likh de (anti) | Nahi (out-of-order me) |
| **WAW** (Write After Write) | Do likhne wali order gadbad (output) | Nahi (out-of-order/multiple cycle ALU) |

**RAW example:**
```
I1: ADD R1, R2, R3
I2: SUB R4, R1, R5   ; R1 chahiye, I1 abhi WB nahi hua
```
### (c) Control hazard
**Branch/jump** ka result pata hone se pehle agli instructions fetch ho chuki.

## 4. Data hazard ke solutions

1. **Stall (bubble / NOP insert)**: pipeline ko wait karao.
2. **Operand forwarding (bypassing)**: result ko **EX/MEM ya MEM/WB register se seedha ALU input** me bhej do, WB ka wait nahi.
3. **Compiler scheduling**: independent instruction beech me daalo (**instruction reordering**).

**Stalls bina forwarding (5-stage, register file write first half & read second half same cycle):**
- Producer ke result ko consumer **producer ke 2 instructions baad** hi padh sakta hai (adjacent = **2 stalls**, ek beech me = **1 stall**). (Agar write-then-read same cycle allow na ho to 3.)

**Forwarding ke saath:**
- **ALU → ALU dependency: 0 stall.**
- **Load-use hazard: 1 stall zaroor** (load ka data MEM stage ke baad milta hai, next instruction ko EX me chahiye).
  ```
  LW  R1, 0(R2)
  ADD R3, R1, R4   ; 1 stall even with forwarding
  ```
> "Bypassing sab RAW hazards handle kar leta hai" = **galat** (load-use).

## 5. Control hazard ke solutions

Branch decision **EX/MEM** me pata (kabhi ID me).
- **Stall/flush**: branch penalty = **branch resolve hone tak fetch ki gayi instructions ki count** (e.g., 2 ya 3 cycles).
- **Branch prediction:** **static** (always not taken / always taken, backward taken), **dynamic** (1-bit, **2-bit saturating counter**, BHT, BTB).
- **Delayed branch (delay slot)**: branch ke turant baad wali instruction hamesha execute; compiler useful instruction rakhta.
- **Early resolve** (ID stage me compare) se penalty kam.

**Branch penalty ke saath CPI:**
CPI = 1 + (branch frequency × misprediction rate × penalty).

**Example:** 20% branches, 40% mispredicted, penalty 3 cycles: CPI = 1 + 0.2 × 0.4 × 3 = **1.24**.

## 6. Speedup with hazards (worked)

5-stage pipeline: 25% load instructions, aur **50% loads ke baad use** dependent instruction (1 stall). CPI = 1 + 0.25 × 0.5 × 1 = **1.125**. Speedup vs non-pipelined (5 CPI) ≈ 5/1.125 = **4.44**.

## 7. Superscalar aur advanced (concept)
- **Superscalar**: ek cycle me **kai instructions issue** (multiple pipelines). CPI < 1.
- **VLIW**: compiler parallelism decide karta.
- **Out-of-order execution**, **register renaming** (WAR/WAW hataata), **Tomasulo**, **reorder buffer**.
- **Instruction-level parallelism (ILP)**, **loop unrolling**.
- **Pipeline depth badhane** se clock fast, par hazards/penalty zyada.

## 8. Hazard identification ka tarika (GATE code snippets)
1. Har instruction ka **source** aur **destination** register likho.
2. Pehle wali ka dest, baad wali ke source se match? → **RAW**; kitne instructions ka gap? gap ke hisaab se stalls.
3. Forwarding hai? load-use dhundo.
4. Table banao: cycles vs stages (IF ID EX MEM WB), bubbles dikhaao.

**Cycle table example (no forwarding, adjacent RAW):**

| Cycle | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 |
|---|---|---|---|---|---|---|---|---|
| I1 | IF | ID | EX | MEM | WB | | | |
| I2 | | IF | ID | *stall* | *stall* | EX | MEM | WB |

Total = 8 cycles (2 stalls).

## 9. Quick Revision
- Pipelined time = (k + n − 1)t; speedup → k.
- Cycle = max stage delay (+latch).
- RAW main hazard; forwarding se ALU-ALU 0 stall; **load-use = 1 stall**.
- Branch penalty = fetched wrong instructions; 2-bit predictor.
- CPI = 1 + stalls per instruction.
- Structural = resource conflict; WAR/WAW out-of-order.

### Practice
1. k=4, n=10, t=1 ns: pipelined time & speedup? *((4+9)=13 ns; speedup = 40/13 = 3.08)*
2. Stages 10, 12, 8 ns (latch 0): cycle & speedup(large n)? *(12 ns; 30/12 = 2.5)*
3. 15% branches, 100% taken (predict not-taken), penalty 2: CPI? *(1 + 0.15×2 = 1.3)*
