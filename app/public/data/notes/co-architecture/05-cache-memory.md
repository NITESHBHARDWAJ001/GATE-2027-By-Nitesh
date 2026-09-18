# Cache Memory: Mapping, Address Split, AMAT, Write Policies, Misses
<!-- topics: co-architecture/cache-memory, co-architecture/direct-mapping, co-architecture/average-memory-access-time, co-architecture/conflict-misses -->

Cache ka topic GATE COA ka **sabse zyada poochha jaane wala** hai (69 PYQs). Isko poori tarah samajh lo.

## 1. Memory Hierarchy

Registers → **L1 cache → L2 → L3** → Main memory (DRAM) → Disk. Upar: **fast, chhota, mehenga**; neeche: slow, bada, sasta.
**Principle of locality:**
- **Temporal**: abhi use hua to jaldi phir (loops).
- **Spatial**: paas ka data bhi (arrays) → isliye **block** (multiple words) laate hain.

**Terms:** **Hit** (data cache me), **Miss**, **Hit ratio h**, **Miss ratio 1−h**, **Hit time**, **Miss penalty**, **Block/Line** (cache aur memory ke beech transfer ki unit).

## 2. Address ka split (sabse important skill)

Main memory address = **Tag | Index (Set) | Block Offset**.

Given: **memory address bits m**, **cache size C**, **block size B**, **associativity k-way**.

```
Block offset bits  = log2(B)
Number of blocks   = C / B
Number of sets     = (C / B) / k
Index bits         = log2(#sets)
Tag bits           = m - index bits - offset bits
```

| Mapping | k | Sets | Index |
|---|---|---|---|
| **Direct mapped** | 1 | = #blocks | log₂(#blocks) |
| **Set associative (k-way)** | k | #blocks/k | log₂(#sets) |
| **Fully associative** | #blocks | 1 | **0 (index nahi)**, tag = m − offset |

### Worked example
32-bit address, cache 32 KB, block 64 B, **4-way**.
- Offset = log₂64 = **6**. Blocks = 32K/64 = **512**. Sets = 512/4 = **128** → Index = **7**. Tag = 32 − 7 − 6 = **19**.
- **Direct mapped**: index = log₂512 = 9, tag = 17.
- **Fully associative**: tag = 26, no index.

### Tag memory size (extra hardware)
Har cache line ke saath: **Tag + Valid bit (+ Dirty bit for write-back) (+ LRU bits)**.
**Total tag storage = #lines × (tag bits + status bits).**
**Example:** upar 512 lines × (19 + 1 valid + 1 dirty) = 512 × 21 bits = **10,752 bits**.

## 3. Mapping techniques

- **Direct-mapped**: memory block j → cache line **j mod #lines**. Simple, fast, par **conflict misses** (do blocks same line par).
- **Fully associative**: koi bhi block kisi bhi line me. **Sabse kam conflict**, par **sab tags parallel compare** (mehenga).
- **k-way set associative**: block j → set **j mod #sets**, us set ki k lines me kahin bhi. **Trade-off**.

**Comparators (hardware):** direct = 1, k-way = k, fully = #lines.

**Example (mapping):** Direct-mapped 8 lines: block 12 → 12 mod 8 = line 4; block 20 → 20 mod 8 = line 4 → conflict.

**Associativity badhane se:** miss rate ↓ (conflict miss ↓), hit time ↑ (zyada comparators/mux), hardware ↑.

## 4. Replacement policies (associative caches)
**LRU**, **FIFO**, **Random**, LFU, Optimal. **Direct-mapped me choice nahi.**
**LRU trace:** har hit par us line ko "most recent" karo. (Page replacement jaisa; detail OS notes me hai.)

**Example (2-way, 1 set), sequence A B C A:** [A] [A,B] C aaya → LRU = A hata → [B,C]; A phir miss. Misses: A,B,C,A = **4**. (FIFO ke saath bhi 4).

## 5. Types of misses (3 C's)
- **Compulsory (cold)**: pehli baar access (infinite cache me bhi).
- **Capacity**: cache chhota (fully associative me bhi).
- **Conflict**: sets ki wajah se (direct/set-assoc me; **fully associative me nahi**).
**Block size badhane se:** compulsory ↓ (spatial locality), par **miss penalty ↑** aur bahut bada ho to conflict/pollution.

## 6. Performance: AMAT

> **AMAT = Hit time + Miss rate × Miss penalty**

**Two-level:** **AMAT = H₁ + m₁ × (H₂ + m₂ × M)** (m₁ = L1 miss rate, m₂ = L2 **local** miss rate, M = memory access time).

**Example:** L1 hit = 1 ns, L1 miss = 10%; L2 hit = 10 ns, L2 local miss = 20%; memory = 100 ns. AMAT = 1 + 0.1 × (10 + 0.2×100) = 1 + 0.1 × 30 = **4 ns**.

**Simultaneous vs hierarchical access:**
- **Hierarchical (sequential)**: pehle cache, miss to memory: T = h·t_c + (1−h)(t_c + t_m).
- **Simultaneous**: cache aur memory parallel: T = h·t_c + (1−h)·t_m.

**Example:** t_c = 10 ns, t_m = 100 ns, h = 0.9. Hierarchical = 9 + 0.1×110 = **20 ns**. Simultaneous = 9 + 10 = **19 ns**.

**Global vs local miss rate:** global = (misses at L2)/(total CPU references) = m₁·m₂(local).

**Effective CPI with cache:** CPI = base CPI + (memory refs per instr) × miss rate × miss penalty (cycles).
**Example:** base CPI 1, 30% loads/stores + 1 fetch = 1.3 refs/instr, miss rate 5%, penalty 20 cycles → CPI = 1 + 1.3×0.05×20 = **2.3**.

## 7. Write policies

| | **Write-through** | **Write-back** |
|---|---|---|
| Write | Cache **aur** memory dono | Sirf cache; **dirty bit**; replace par memory me |
| Memory traffic | Zyada | Kam |
| Consistency | Simple | Complex |
| Write buffer | Chahiye | - |

**Write miss:** **Write-allocate** (block cache me laao phir likho; usually write-back ke saath) vs **No-write-allocate** (seedha memory; write-through ke saath).

## 8. Cache Coherence (multiprocessor concept)
Har CPU ka apna cache → same data alag copies. **Snooping protocols (MESI)**, **directory**. MESI: Modified, Exclusive, Shared, Invalid. **Inclusion property**: L2 inclusive to L1 ⇒ L1 ka sab L2 me.

## 9. Loop/array cache analysis (GATE favourite)

Array `int a[N][N]` **row-major**. Cache block me `B/4` ints.
- **Row-wise traversal** (`a[i][j]`, j inner): **spatial locality** → har block ke liye **1 miss, phir B/4 − 1 hits**. Miss rate = 1/(B/4).
- **Column-wise traversal** (i inner): har access naye block par → **miss rate ≈ 100%** (agar array cache se bada).

**Example:** block = 16 B (4 ints): row traversal miss rate = **25%**; column = ~100%.

**Compare two code segments:** dono ka miss count nikalo (blocks ki count, reuse).

## 10. Solving strategy (cache numericals)
1. **Units**: cache size, block size bytes me; address bits.
2. **Offset → Index → Tag** order me bits nikalo.
3. **Trace** (miss count): block address = address / block size; set = block mod #sets.
4. **AMAT**: levels ke local/global miss rates dhyaan se.
5. **Tag memory / total cache bits**: data + tag + valid + dirty.

**Trace example:** Direct-mapped 4 lines, block 1 word. Word addresses: 0, 4, 8, 12, 0. Block j mod 4: 0,0,0,0,0 → har ek line 0 par → **sab miss (5 misses)** (conflict thrash).
Isi ko 2-way (2 sets): sets = j mod 2 = 0 sab → 2 lines me 0,4,8,12 → 0 evict ho jaata → phir miss → 5 misses. **4-way** (1 set): 4 blocks fit → 0 hit → **4 misses**.

## 11. Quick Revision
- offset = log₂B; index = log₂(sets); tag = m − index − offset.
- Fully associative: no index. Direct: 1 comparator.
- AMAT = H + m × P; 2-level nested.
- Write-back + dirty bit + write-allocate.
- Conflict misses fully associative me nahi.
- Row-major row traversal = spatial locality.

### Practice
1. 16-bit address, cache 1 KB, block 16 B, direct: tag/index/offset? *(offset 4; blocks 64 → index 6; tag 6)*
2. Hit 95%, hit time 2 ns, miss penalty 60 ns: AMAT? *(2 + 0.05×60 = 5 ns)*
3. 8 KB, 4-way, block 32 B: sets? *(256 blocks → 64 sets)*
