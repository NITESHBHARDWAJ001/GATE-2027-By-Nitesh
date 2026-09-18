# Main Memory, Interleaving, DRAM/ROM, Virtual Memory (COA view) aur Disk
<!-- topics: co-architecture/memory-interfacing, co-architecture/dram, co-architecture/virtual-memory, co-architecture/disk, co-architecture/bit-vector, digital-logic/rom, digital-logic/memory-interfacing, digital-logic/decoder -->

## 1. Memory Types

| Type | Volatile? | Note |
|---|---|---|
| **SRAM** | Haan | Flip-flop cell, **fast, mehenga, refresh nahi**; **cache** |
| **DRAM** | Haan | Capacitor cell, **dense, sasta, refresh zaroori**; **main memory** |
| **ROM** | Nahi | Read-only; **PROM, EPROM (UV), EEPROM, Flash** |

**DRAM organization:** cells **rows × columns** array; address **multiplexed** (pehle row (RAS), phir column (CAS)) → pins kam. **Address pins = row bits + column bits**... multiplexed me `max(row, col)` pins. Square array: 1 M × 1: 1024 × 1024 → 10 bits row + 10 bits column.

**Refresh:** har row ko periodically (e.g., 64 ms me) refresh; refresh time DRAM availability kam karta.

## 2. Memory capacity aur address bits

- **Capacity = #locations × word size.**
- **Address bits = log₂(#locations)**.
- **Byte-addressable** 1 GB = 2³⁰ locations → 30 bits. **Word-addressable** (word 4 B) 1 GB = 2²⁸ words → 28 bits.

**Example:** 64K × 8 ROM: address 16 bits, data 8 bits. **ROM size for n×n multiplier** (truth table): inputs 2n → 2^(2n) locations × 2n bits. 4×4: 2⁸ × 8 = **2048 bits**.

## 3. Memory chips se memory banana (interfacing)

**Given:** required memory (W words × b bits), chip (w × c).
- **Chips = (W/w) × (b/c)**. (Depth expand × width expand.)
- **Decoder** address ke upar ke bits se **chip select**.

**Example:** 4K × 16 memory banani hai, chip 1K × 8. Chips = (4K/1K) × (16/8) = 4 × 2 = **8**. Address 12 bits: **2 bits decoder (2→4)** chip select, **10 bits** chip ke andar. 
**Decoder tree:** 2→4 decoder with enable: 4-to-16 = **5** decoders (4 + 1).

**Address range/allocation:** chip 1 → 0000–03FF, chip 2 → 0400–07FF, ... Hex me likho.

## 4. Interleaved Memory (parallel banks)

Memory ko **banks** me todo taaki kai accesses overlap.
- **Low-order interleaving**: consecutive addresses **consecutive banks** me. Bank = address mod #banks. **Sequential access fast**, block transfer ke liye best.
- **High-order interleaving**: consecutive addresses **same bank** me (contiguous memory chunks) — parallelism kam.

**Time for k words (m banks, access time t_a, cycle transfer t):** low-order: pehla word t_a, phir har cycle ek word (pipelined). **Block fetch time** ≈ t_a + (k − 1) × t (agar k ≤ m banks).

**Example:** 4 banks, access time 40 ns, bus cycle 10 ns, 4-word block: 40 + 3×10 = **70 ns** (vs 160 ns non-interleaved).

## 5. Virtual Memory (address translation, COA numericals)

Physical detail OS notes me hai (Virtual Memory chapter). COA me common:

- **Virtual address bits v**, page size 2^p ⇒ **VPN = v − p bits**, **offset = p bits**.
- **Physical address bits n** ⇒ frame bits = n − p.
- **Page table size = 2^(v−p) × PTE size.**
- **TLB access parallel with cache** (physically indexed vs virtually indexed).

### Cache + TLB + VM combined (GATE style)
Sequence: virtual address → **TLB** (hit: physical address) → cache → memory. **Cache index/offset bits agar ≤ page offset bits** ho to **cache index page offset se hi milta** hai → **TLB translation ke saath parallel cache lookup** (VIPT, no aliasing).

**Condition (VIPT me alias na ho):** cache size / associativity ≤ page size.

**Example:** page 4 KB, cache 32 KB, 8-way → 32/8 = 4 KB ≤ 4 KB ✓ alias-free.

**Effective access time (TLB + memory):** EAT = h(t + m) + (1−h)(t + 2m) (single level).

## 6. Secondary Storage (HDD)

- **Capacity = surfaces × tracks × sectors × bytes.**
- **Access time = seek + rotational latency + transfer.**
- **Avg rotational latency = ½ × 60/RPM.**
- **Transfer rate** = bytes per track × (RPM/60). One rotation = ek track ka data.

**Example:** 7200 RPM, 1000 sectors/track, 512 B: one rotation = 8.33 ms; **transfer rate** = 512 KB / 8.33 ms ≈ **61.4 MB/s**; avg latency 4.17 ms.

**Free-space bitmap:** 1 bit/block → blocks/8 bytes.

## 7. Stack aur memory-mapped concepts
- **Memory-mapped I/O**: I/O devices ko memory address space me address; normal LOAD/STORE. **Isolated I/O**: alag IN/OUT instructions aur alag address space.
- **Stack pointer** na ho to recursion/nested call mushkil; register windows memory access kam karte.

## 8. Quick Revision
- Address bits = log₂(locations) (byte vs word addressable!).
- Chips = (W/w)×(b/c); decoder select bits = log₂(depth chips).
- DRAM: multiplexed, refresh; SRAM: cache.
- Low-order interleaving = sequential fast.
- VM: VPN = v − offset; PT size = 2^VPN × PTE.
- VIPT alias-free: cache size/ways ≤ page size.
- Avg rot. latency = ½ rotation.

### Practice
1. 8K × 8 memory, chip 2K × 4: chips? *(4 × 2 = 8)*
2. 512 MB byte-addressable: address bits? *(29)*
3. 8-way, 64 KB cache, page 4 KB: VIPT safe? *(64/8 = 8 KB > 4 KB → aliasing possible)*
