# CPU: Datapath, Control Unit (Hardwired/Microprogrammed) aur Performance
<!-- topics: co-architecture/data-path, co-architecture/control-unit, co-architecture/instruction-execution, co-architecture/speedup, co-architecture/microprogramming -->

## 1. CPU ke parts
- **ALU** (arithmetic/logic), **Registers** (PC, IR, MAR, MDR, ACC, general purpose, flags, SP), **Control Unit**, **Buses** (address, data, control).

## 2. Datapath aur micro-operations

Ek instruction **micro-operations** (register transfers) ke sequence se chalti hai. **Single-bus datapath me ek clock me ek hi transfer** (bus ek).

**Fetch (single-bus):**
1. `MAR ← PC`
2. `MDR ← M[MAR]; PC ← PC + 1` (parallel agar alag hardware)
3. `IR ← MDR`

**ADD R1, R2 (R1 = R1 + R2) single bus:**
1. `Y ← R1` (ALU ka ek input temporary register)
2. `Z ← Y + R2` (R2 bus se)
3. `R1 ← Z`

**Steps count = clock cycles** (ek cycle me ek bus transfer). Multi-bus datapath me kam steps.

## 3. Control Unit

Control signals generate karta hai jo datapath ko batate hain kya karna hai.

### Hardwired control
Logic gates/PLA/state machine se. **Fast**, par **badalna mushkil**, design complex. **RISC** me.

### Microprogrammed control
Har instruction ke liye **microprogram** (microinstructions ka sequence) **control memory (ROM)** me. **Flexible**, easy modify/emulate, par **slower** (control memory access). **CISC** me.

**Speed ranking:** Hardwired > Horizontal microprogrammed > Vertical microprogrammed.

### Horizontal vs Vertical microinstruction
| | Horizontal | Vertical |
|---|---|---|
| Encoding | **Har control signal ka apna bit** | Encoded fields (decoder chahiye) |
| Width | **Bahut wide** | Narrow |
| Parallelism | Zyada | Kam |
| Speed | Fast | Slower |
| Control memory | Bada width | Chhota |

**Vertical field ka bit count:** ek field me `n` mutually exclusive micro-operations **ya koi nahi** → **⌈log₂(n + 1)⌉ bits** ("koi nahi" option bhi).

**Example:** 3 micro-ops of one type (ya none) → ⌈log₂ 4⌉ = **2 bits**.

**Microinstruction width (typical):** control signals bits + **next-address field** (agar jump/branch). **Control memory size** = #microinstructions × width.

**Micro-programmed sequencing:** control address register (CAR) → next microinstruction (increment, branch, map from opcode).
**Nanoprogramming**: microinstructions ko bhi ek chhoti memory se.

## 4. Performance Metrics

- **Clock cycle time T = 1/f**.
- **CPI (cycles per instruction)**: mixed instruction me **weighted average**: CPI = Σ (fᵢ × CPIᵢ).
- **CPU time = (Instruction count × CPI) / Clock rate** = IC × CPI × T.
- **MIPS = f / (CPI × 10⁶)**. (Misleading, alag ISA me compare nahi.)
- **Throughput** = work/time. **Latency** = ek task ka time.

**Example:** IC = 10⁶; mix: 50% ALU (CPI 1), 30% load/store (CPI 2), 20% branch (CPI 3). CPI = 0.5 + 0.6 + 0.6 = **1.7**. f = 1 GHz: CPU time = 10⁶ × 1.7 / 10⁹ = **1.7 ms**. MIPS = 1000/1.7 ≈ **588**.

### Amdahl's Law (speedup)
Program ka fraction **f** (time ka) ko **s** guna tez kiya:
> **Speedup = 1 / ((1 − f) + f/s)**
> **Max speedup (s → ∞) = 1/(1 − f)**

**Example:** 40% time ke hisse ko 4× tez: 1/(0.6 + 0.1) = **1.43**. Agar 90% parallelizable, max = **10**.

**Trap:** **f = time ka fraction** (execution time), instruction count nahi. **Overall speedup ≤ 1/(1−f)**.

**Multiple enhancements:** 1/((1 − f₁ − f₂) + f₁/s₁ + f₂/s₂).

### Other laws
- **Gustafson's law**, **Little's law** (concept). **Iron law:** CPU time = IC × CPI × T.
- **Improving performance:** IC ↓ (better compiler/ISA), CPI ↓ (pipelining), T ↓ (technology).

## 5. Memory and bus basics (short)
- **MAR** width = address bits ⇒ **max memory = 2^(MAR bits)**. **MDR** width = word size.
- **Bus width** (data): ek transfer me bytes. **Bus bandwidth** = width × freq.
- **Word-addressable** me address bits = log₂(words); **byte-addressable** me log₂(bytes).

## 6. Quick Revision
- CPU time = IC × CPI × T; CPI weighted average.
- Hardwired fast/rigid (RISC); microprogrammed flexible/slow (CISC).
- Vertical field bits = ⌈log₂(n+1)⌉.
- Amdahl: 1/((1−f)+f/s).
- Single-bus: ek clock ek transfer.
- MAR bits decide address space.

### Practice
1. 20% instructions CPI 4, rest CPI 1: CPI? *(0.8×1 + 0.2×4 = 1.6)*
2. Amdahl f=0.8, s=5: speedup? *(1/(0.2+0.16) = 2.78)*
3. 5 mutually exclusive micro-ops (or none): field bits? *(⌈log₂ 6⌉ = 3)*
