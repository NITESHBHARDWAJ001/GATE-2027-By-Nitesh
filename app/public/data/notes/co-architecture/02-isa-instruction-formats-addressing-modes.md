# ISA, Instruction Formats aur Addressing Modes
<!-- topics: co-architecture/addressing-modes, co-architecture/instruction-format, co-architecture/machine-instruction, co-architecture/instruction-set-architecture, co-architecture/cisc-risc-architecture, co-architecture/runtime-environment -->

## 1. ISA (Instruction Set Architecture)

ISA = hardware aur software ke beech ka **contract**: programmer ko kya dikhta hai.
**ISA me:** instruction set, registers, addressing modes, data types, word size, memory model.
**ISA me nahi (organization/microarchitecture):** cache size, pipeline depth, bus width, control unit ka type.

### RISC vs CISC

| | **RISC** | **CISC** |
|---|---|---|
| Instructions | Kam, simple | Zyada, complex |
| Length | **Fixed** | **Variable** |
| Memory operands | **Sirf Load/Store** | Arithmetic me bhi memory operand |
| Registers | **Zyada** | Kam |
| Addressing modes | Kam | Zyada |
| Control unit | **Hardwired** | **Microprogrammed** |
| CPI | ~1 (pipeline friendly) | Zyada, variable |
| Example | ARM, MIPS, RISC-V | x86, VAX |

## 2. Instruction Cycle
**Fetch → Decode → Execute (→ Memory → Write-back)**. **PC** next instruction ko point karta hai. **IR** current instruction.
Fetch: MAR ← PC; MDR ← M[MAR]; IR ← MDR; PC ← PC + len.

## 3. Instruction Formats

Instruction = **Opcode** + **operands (addresses/registers/immediate)**.

**Address instructions:**
- **3-address**: `ADD R1, R2, R3` (R1 = R2 + R3).
- **2-address**: `ADD R1, R2` (R1 = R1 + R2, destination = source1).
- **1-address**: accumulator: `ADD X` (ACC = ACC + M[X]).
- **0-address**: **stack** machine: `ADD` (top 2 pop, result push). Expression postfix me.

**Example:** `X = (A + B) * (C + D)`:
- 3-address: `ADD T1,A,B; ADD T2,C,D; MUL X,T1,T2` (3 instr).
- 1-address (accumulator): `LOAD A; ADD B; STORE T; LOAD C; ADD D; MUL T; STORE X` (7 instr).
- 0-address: `PUSH A; PUSH B; ADD; PUSH C; PUSH D; ADD; MUL; POP X` (8 instr).

### Instruction length ka calculation
Instruction bits = **opcode + sum of operand fields**.
- Register field bits = **log₂(#registers)**.
- Memory address field = **log₂(memory size in addressable units)**.
- Immediate field = jo bacha.

**Example:** 32-bit instruction, 64 registers, do register operands, ek immediate, opcode 8 bit: bits = 8 + 6 + 6 + imm → **imm = 12 bits**.

### Expanding Opcode
Fixed instruction length me opcode ko **variable** rakhna: kam operand wali instructions ko zyada opcode bits.

**Example:** 16-bit instruction, address field 4 bit. Level 1: 4-bit opcode + 3 addresses (12) = **3-address instructions**: max 16 opcodes; agar **x** use karein to **16 − x** unused patterns. Un unused 4-bit patterns ko 4 bit aur expansion (opcode 8 bit, 2 address = 8): **(16−x) × 16** two-address instructions; agla level (opcode 12 bit, 1 address): **(16−x)·16 − y) × 16** etc.

**Rule:** har level par `available = (unused × 2^(extra bits)) − used`.

## 4. Addressing Modes

Operand **kahan hai** aur **effective address (EA)** kaise banta hai.

| Mode | EA / operand | Example | Fayda |
|---|---|---|---|
| **Immediate** | Operand instruction me | `MOV R1, #5` | Constants; memory access nahi |
| **Register direct** | Operand register me | `ADD R1, R2` | Fast |
| **Register indirect** | EA = (R) | `MOV R1, (R2)` | Pointers |
| **Direct/Absolute** | EA = address field | `LOAD 500` | Simple; ek memory access |
| **Indirect (memory)** | EA = M[address field] | `LOAD @500` | Pointers; **2 memory access** |
| **Indexed** | EA = base(address) + **index register** | `A[i]` | **Arrays** |
| **Base-register** | EA = **base register** + displacement | | **Relocation**, structs |
| **Relative (PC-relative)** | EA = **PC + offset** | `JMP +20` | **Position-independent code**, branches |
| **Auto-increment / decrement** | EA = (R), phir R++ (ya pehle R−−) | `(R)+` | Array traversal, **stack** |
| **Stack** | Top of stack | | Postfix |

**Important GATE points:**
- **Relative addressing** = position independent code (program kahin bhi load ho, offset same).
- **Base register** = program **relocation** (run time me). **Indexed** = **arrays**.
- **Immediate**: sabse kam memory references (0 extra). **Indirect**: sabse zyada.
- Memory references per mode (operand fetch ke liye): immediate 0, register 0, direct 1, indirect 2 (+ instruction fetch 1).
- **Code relocation ke bina change:** relative/base-register.
- **Loop/array:** indexed ya auto-increment.
- PC-relative branch: **target = (PC after fetch) + offset**; PC jab instruction fetch hone ke baad **next instruction ko** point karta hai (yaad rakho).

**Example (relative):** instruction at 1000, length 4, branch offset +20: PC = 1004; target = 1004 + 20 = **1024**.

**Example (indexed):** `LOAD 1000(X)`, X = 5, word = 4 B (scaling nahi): EA = 1005.

**Struct field access `student.grade`** ke liye: **base register** (struct ka start) + displacement. **Array element** `a[i]`: indexed.

## 5. Instruction Types
- **Data transfer** (LOAD, STORE, MOV, PUSH, POP), **arithmetic/logic**, **control transfer** (JMP, CALL, RET, conditional branch), **I/O**, **string**.
- **Flags:** Z, C, S, O (overflow), P. **Conditional branch** flags check karti hai (flags conditional jump se **change nahi** hote).
- **Stack**: **SP** register; PUSH: SP−−, M[SP] ← x (stack neeche badhta, typical). **CALL** return address stack par push, **RET** pop.
- **Register windows** (SPARC): overlapping windows → procedure call me memory accesses kam.

## Extra: Stack Pointer aur Register Windows
- **Stack pointer (SP)** stack ka current top address rakhta; call par return address/locals push, return par pop. Stack **downward grow** (high → low address) commonly.
- **Register windows (SPARC/RISC):** har procedure call par **naya register window** (overlapping in/out registers) ⇒ parameters registers me pass, **memory accesses kam**, call/return fast. Deep recursion par windows khatam ⇒ **overflow trap** (memory me spill).
- **Fayda:** procedure call overhead kam; **nuksan:** bade register file, context switch costly.


## 6. Quick Revision
- Register bits = log₂ #regs. Instruction bits = opcode + operands.
- Relative = position independent; Base = relocation; Indexed = arrays.
- Indirect = 2 memory access; Immediate = 0.
- PC-relative target = next PC + offset.
- RISC: fixed length, load-store, hardwired; CISC: variable, microcode.
- 0-address = stack machine (postfix).

### Practice
1. 8-bit opcode, 32-bit instruction, 16 registers, 2 register operands, ek immediate. Immediate bits? *(32 − 8 − 4 − 4 = 16)*
2. Indirect addressing me kitne memory references (instruction fetch alag)? *(2)*
3. `A = B + C` ke liye 1-address (accumulator) instructions? *(LOAD B; ADD C; STORE A = 3)*
