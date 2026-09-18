# COA: Formula Sheet, Traps aur GATE Strategy
<!-- topics: co-architecture/cache-memory, co-architecture/pipelining, co-architecture/addressing-modes, co-architecture/instruction-format -->

## 1. Formula Sheet

### Number system
- n-bit unsigned: 0 … 2ⁿ−1. 2's complement: −2ⁿ⁻¹ … 2ⁿ⁻¹−1.
- Overflow (2's): carry into MSB ⊕ carry out of MSB.
- IEEE single: 1/8/23, bias 127, value = (−1)^S × 1.F × 2^(E−127). Double: 1/11/52, bias 1023.
- Booth: 01 add, 10 subtract, 00/11 shift.
- Gray g = b ⊕ (b>>1). Hamming: detect d−1, correct ⌊(d−1)/2⌋.

### Instruction / control
- Register bits = log₂ #regs. Instruction = opcode + operands.
- Vertical microinstruction field bits = ⌈log₂(n+1)⌉.
- CPU time = IC × CPI × T; CPI = Σ fᵢ CPIᵢ; MIPS = f/(CPI×10⁶).
- Amdahl = 1/((1−f) + f/s).
- PC-relative target = (PC after fetch) + offset.

### Pipeline
- Time = (k + n − 1)t; speedup = nk/(k+n−1) → k.
- Cycle = max stage + latch.
- CPI = 1 + stalls/instr; branch CPI = 1 + freq × mispred × penalty.
- Load-use = 1 stall even with forwarding.

### Cache
- offset = log₂B; #sets = C/(B·k); index = log₂ sets; tag = m − index − offset.
- Fully assoc: no index; direct: 1 comparator.
- AMAT = H + m·P; two-level H₁ + m₁(H₂ + m₂M).
- Hierarchical: h t_c + (1−h)(t_c + t_m); simultaneous: h t_c + (1−h) t_m.
- Tag storage = lines × (tag + valid + dirty).
- CPI(cache) = base + refs × miss rate × penalty.

### Memory / VM / I/O
- Address bits = log₂(locations); chips = (W/w)(b/c).
- VPN = v − offset; PT size = 2^VPN × PTE.
- EAT = h(t+m) + (1−h)(t+2m).
- Avg rotational latency = ½·60/RPM. Disk access = seek + latency + transfer.
- Interrupt CPU % = data rate × ISR time; DMA count reg n bits → 2ⁿ words.
- Interleaved block fetch = t_a + (k−1)t.

## 2. Comparison Tables

| Pair | Fark |
|---|---|
| RISC / CISC | Fixed, load-store, hardwired / variable, microcode |
| Hardwired / Microprogrammed | Fast, rigid / flexible, slow |
| Horizontal / Vertical | Wide, parallel, fast / narrow, encoded |
| Write-through / Write-back | Both writes / dirty bit, less traffic |
| Direct / Set-assoc / Fully | 1 comparator, conflicts / k comparators / no conflict, costly |
| SRAM / DRAM | Cache, fast / main memory, refresh |
| Programmed I/O / Interrupt / DMA | CPU busy / event driven / bulk transfer |
| Burst / Cycle stealing / Transparent DMA | CPU blocked / word-wise / no slowdown |
| Low / High order interleaving | Sequential parallel / contiguous same bank |
| Indexed / Base / Relative | Arrays / relocation / position-independent |

## 3. Top 20 Traps
1. Byte-addressable vs word-addressable address bits.
2. Cache size bytes vs number of lines.
3. Fully associative me index nahi.
4. Tag me valid/dirty bits ginna (tag memory).
5. AMAT me local vs global miss rate.
6. Pipeline time (k + n − 1), n·k nahi.
7. Pipeline cycle = max stage + latch, sum nahi.
8. Load-use hazard forwarding se bhi 1 stall.
9. Amdahl me f = **time** fraction.
10. PC-relative me next PC use.
11. Overflow different signs add me nahi.
12. IEEE me hidden 1 aur bias.
13. Fraction bits = precision, exponent = range.
14. Booth ka worst case alternating bits.
15. Indirect = 2 memory references.
16. Vertical field: none option = n+1.
17. Register windows memory access kam karte.
18. DMA burst me CPU bus se bahar; cycle stealing me nahi.
19. Interrupt overhead = rate × time; polling interval ≤ 1/rate.
20. VIPT alias-free: cache size / ways ≤ page size.

## 4. Solving Strategy (COA)
1. **Bits ka accounting** (address/tag/opcode): diagram banao, total match.
2. Pipeline/hazard: **cycle table** banao.
3. Cache trace: block number → set → hit/miss table.
4. Units: ns/µs/ms, KB/MB, bits/bytes.
5. Statements: RISC/CISC, hardwired/micro jaise concept par definition se elimination.

## 5. Practice order (web app)
Subjects → COA: **Cache Memory → Pipelining → Number Representation (Digital Logic) → Machine Instruction/Addressing Modes → Memory/Virtual memory → I/O/DMA → Control unit**.
