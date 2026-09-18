# Virtual Memory, Demand Paging aur Page Replacement
<!-- topics: operating-system/virtual-memory, operating-system/page-replacement, operating-system/demand-paging, operating-system/least-recently-used -->

## 1. Virtual Memory ka idea

Poora program ek saath RAM me hona **zaroori nahi**. Sirf **jo hissa abhi chahiye** wo RAM me, baaki disk (swap space) par. Fayde:
- Program RAM se **bada** ho sakta hai.
- Zyada processes ek saath (degree of multiprogramming ↑).
- Sirf zaroori pages load = kam I/O.

**Virtual address space** ka size **CPU ke address bits** se decide hota hai (MAR width), physical RAM se nahi.

## 2. Demand Paging

Page tabhi load jab **access** ho (**lazy swapper / pager**). Page table me **valid/invalid bit**.

**Page fault ka process:**
1. CPU address deta hai -> MMU: page table me **invalid** -> **page fault trap**.
2. OS check: address legal? (illegal -> process terminate).
3. **Free frame** dhundo (na mile to **page replacement**).
4. Disk se page us frame me read (I/O, process blocked, CPU dusre ko).
5. Page table update (valid=1, frame).
6. **Instruction dobara** restart.

### Effective Access Time (EAT)
Page fault rate `p`, memory access `m`, page fault service time `s`:

> **EAT = (1 − p) × m + p × s**

**Example:** m = 200 ns, s = 8 ms = 8,000,000 ns. EAT = 200(1−p) + 8,000,000 p ≈ 200 + 7,999,800 p. Agar slowdown ≤ 10% chahiye: EAT ≤ 220 ⇒ 7,999,800 p ≤ 20 ⇒ **p ≤ ~2.5 × 10⁻⁶** (kam se kam ~1 fault har 4 lakh access me).

`s` me: fault service + page read + (agar victim dirty) page write + restart. **Dirty page ho to 2 disk I/O**, isliye **dirty bit** se unmodified pages ko write-back skip.

**Copy-on-Write (COW):** fork ke baad parent-child same pages share; jab koi likhe tab hi copy.

## 3. Page Replacement Algorithms

Jab free frame nahi, **victim page** chuno.

### FIFO
Sabse purana loaded page hataao. **Belady's anomaly** ho sakti hai.
### Optimal (OPT / MIN)
**Aage sabse der se use hone wala** page hataao. Minimum faults (theoretical, future pata nahi). Benchmark.
### LRU (Least Recently Used)
**Sabse purani baar use hua** page hataao. Achha approximation of OPT. Implementation: counter/stack (hardware support), approximate: **reference bit, clock**.
### LFU / MFU, Random, **Second chance (Clock)**
Clock: circular list + reference bit; ref=1 ho to 0 karke aage, ref=0 to victim. **Enhanced clock** (ref, dirty) pair.

## 4. Worked example (classic)

Reference string: **7 0 1 2 0 3 0 4 2 3 0 3 2 1 2 0 1 7 0 1**, **3 frames**.

- **FIFO → 15 page faults**
- **LRU → 12 page faults**
- **OPT → 9 page faults**

**LRU trace** (frames after each *fault*): 
7 -> [7]; 0 -> [7,0]; 1 -> [7,0,1]; 2 -> replace 7 (LRU) [2,0,1]; 0 hit; 3 -> replace 1 [2,0,3]; 0 hit; 4 -> replace 2 [4,0,3]; 2 -> replace 3 [4,0,2]; 3 -> replace 0 [4,3,2]; 0 -> replace 4 [0,3,2]; 3 hit; 2 hit; 1 -> replace 0 [1,3,2]; 2 hit; 0 -> replace 3 [1,0,2]; 1 hit; 7 -> replace 2 [1,0,7]; 0 hit; 1 hit. Total faults = 12 ✓.

**Table banane ka tarika:** ek row per reference; columns: page, frames, H/F. LRU me hit par bhi us page ko "recent" mark karo (FIFO me nahi).

**Initial faults:** jab tak frames khali hain, har naya page fault (compulsory) hai; question me "initially empty" hota hai.

## 5. Belady's Anomaly

Frames **badhane par** page faults **badh** jaana. **Sirf FIFO** (aur kuch non-stack algorithms). **LRU aur OPT stack algorithms** hain -> anomaly **nahi** hoti.

**Example:** string `1 2 3 4 1 2 5 1 2 3 4 5`
- 3 frames FIFO = **9 faults**, 4 frames FIFO = **10 faults** (badhe!).

**Stack property:** n frames me jo pages hain wo hamesha (n+1) frames wale set ka subset hote hain.

## 6. Frame Allocation

- **Equal**, **proportional** (size ke hisaab se), **priority** based.
- **Global replacement**: victim kisi bhi process ka. **Local**: sirf apne process ka.
- Minimum frames: instruction set decide karti hai (ek instruction ke sab pages).

## 7. Thrashing

Process ko itne kam frames ki wo **zyada time paging me** lagaye, useful kaam kam. **CPU utilization girti hai**, OS aur processes add kar deta hai (galat!) -> aur giri.

- **Cause:** degree of multiprogramming bahut zyada / working set frames se bada.
- **Fix:** **Working Set Model** (Δ = window; WSS = pichle Δ references ke distinct pages; `sum(WSS) ≤ frames` maintain), **Page Fault Frequency (PFF)** control, multiprogramming kam karo, **locality** samajho.

**Locality of reference:** temporal (abhi use hua to jaldi phir) + spatial (paas ke addresses). Virtual memory isi par chalta hai.

## 8. Page size aur TLB (recap)
Chhota page: kam internal fragmentation, bada page table, zyada faults; bada page: kam faults, zyada fragmentation.

## 9. Common GATE question types

1. **Fault count** (FIFO/LRU/OPT) diye string aur frames ke saath.
2. **Belady** kaunse algorithm me.
3. **EAT with page faults / TLB + page faults** combined:
   EAT = TLB hit (h) ... miss + page table + fault. Step by step probabilities.
4. **Array traversal** se reference string banao: row-major me ek row ke elements consecutive -> ek page me kitne elements = page size/element size. Loop order galat (column-major traversal) ho to zyada faults.
5. **Kya sahi hai**: "LRU can have Belady's anomaly"? Galat.
6. **Minimum frames** taaki koi fault na ho = distinct pages ki sankhya.

**Example (array):** 128×128 int array, int 4 B, page 512 B -> ek page me 128 ints = ek row. 1 frame me row-major traversal: 128 faults. Column-major: har element alag row (page) me -> **128×128 = 16384 faults**.

## 10. Quick Revision
- EAT = (1−p)m + p·s.
- FIFO ⇒ Belady; LRU/OPT ⇒ stack, no Belady.
- OPT lowest faults; LRU ≈ OPT.
- Thrashing = high paging, low CPU; fix = working set/PFF/reduce MPL.
- Dirty bit skip write-back.
- Reference string me **consecutive same page** = ek hi fault.

### Practice
1. String `1 2 3 2 1 4 3` FIFO, 3 frames. Faults? *(1,2,3 faults(3); 2 hit; 1 hit; 4 replace 1 fault(4); 3 hit -> 4 faults)*
2. Kya OPT me anomaly aati hai? *(Nahi.)*
3. m = 100 ns, s = 10 ms, p = 10⁻⁵. EAT? *(0.99999×100 + 10⁻⁵×10⁷ = ~100 + 100 = 200 ns)*
