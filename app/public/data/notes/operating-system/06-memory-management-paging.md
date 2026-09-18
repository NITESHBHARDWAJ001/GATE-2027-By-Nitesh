# Memory Management: Contiguous, Paging, Segmentation, TLB
<!-- topics: operating-system/memory-management, operating-system/best-fit, operating-system/multilevel-paging, operating-system/translation-lookaside-buffer -->

## 1. Basics: Logical vs Physical address

- **Logical (virtual) address**: CPU jo generate karta hai. **Physical address**: RAM me asli location.
- **MMU** (Memory Management Unit) logical -> physical translate karta hai.
- **Address binding**: compile time (absolute, fixed), load time (relocatable), **execution time** (dynamic; MMU chahiye, paging/segmentation ke liye).

**Swapping**: process ko memory se disk (backing store) par bhejna aur wapas lana. **Dynamic loading/linking**: routine tabhi load jab call ho.

**Protection (contiguous):** **Base register** (start) + **Limit register** (size). Address `< limit` ho to `base + address`, warna trap.

## 2. Contiguous Allocation

### Fixed (static) partitioning
Memory pehle se fixed size partitions. **Internal fragmentation** (partition ke andar bekar space).

### Variable (dynamic) partitioning
Process ke size ka hole. **External fragmentation** (total free enough hai par tukdon me). **Compaction** se fix (mahanga).

**Placement algorithms (holes list se):**

| Algorithm | Rule | Note |
|---|---|---|
| **First fit** | Pehla hole jo fit ho | Fast, achha |
| **Next fit** | Pichle allocation ke baad se | - |
| **Best fit** | **Sabse chhota** hole jo fit ho | Chhote bekar tukde bahut |
| **Worst fit** | **Sabse bada** hole | Bade holes khatam |

**Example:** Holes: 100K, 500K, 200K, 300K, 600K (order me). Requests: 212K, 417K, 112K, 426K.
- **First fit**: 212->500 (rem 288); 417->600 (rem 183); 112->288 hole; 426-> koi nahi (500 ke rem 288, 600 ke 183 ...) **wait**.
- **Best fit**: 212->300 (rem 88); 417->500 (rem 83); 112->200 (rem 88); 426->600 (rem 174) **sab place**.
- **Worst fit**: 212->600 (rem 388); 417->500 (rem 83); 112->388 hole (rem 276); 426 -> koi nahi.

(GATE me first/best/worst fit trace bahut aata hai; har allocation ke baad holes list update karo.)

**50% rule:** first fit me `N` allocated blocks par ~`0.5N` blocks fragmentation me khoye.

## 3. Paging

Physical memory ko **frames** (fixed size), logical memory ko **pages** (same size) me todo. Page kisi bhi free frame me. **External fragmentation nahi**, **internal fragmentation** sirf last page me (average = page size / 2).

**Logical address = (page number p, offset d).** Page size `2^k` bytes ⇒ offset k bits.

```
Logical address bits m,  page size 2^k
  page number bits = m - k        offset bits = k
Physical address bits n
  frame number bits = n - k
Number of pages = 2^(m-k)         Number of frames = 2^(n-k)
Page table entries = number of pages
Page table size = #pages x PTE size
```

**Translation:** page table[p] = frame f; physical = f × page_size + d.

**Example:** logical 32-bit, physical 28-bit, page 4 KB (2^12). Page number 20 bits (2^20 pages). Frame number 16 bits. PTE ~ 16 bits + flags (valid, dirty, ref, protection). Page table = 2^20 × 4 B (assume 4 B PTE) = **4 MB per process** — isliye multilevel.

**PTE me kya hota hai:** frame number, valid/invalid bit, protection (r/w/x), dirty (modified), reference bit, caching bit.

**Internal fragmentation:** process size S, page P → pages = ceil(S/P), wasted = pages×P − S.

**Page size trade-off:** chhota page -> kam internal fragmentation par bada page table; bada page -> chhota page table par zyada fragmentation aur zyada I/O time. **Optimal page size = √(2 s e)** (s = avg process size, e = PTE size) jisse (page table + fragmentation) overhead minimum.

**Shared pages:** code (re-entrant) frames share; **copy-on-write** (fork).

## 4. TLB (Translation Lookaside Buffer)

Paging me har memory access = **page table access + actual access = 2 memory accesses** (slow). Solution: **TLB**, ek chhota fast **associative (parallel search)** cache jo recent (page -> frame) mappings rakhta hai.

- **TLB hit**: 1 memory access. **TLB miss**: page table walk, phir TLB update.
- Context switch par TLB **flush** (ya **ASID** tag se avoid).

### EAT (Effective Access Time)
TLB access time = `t`, memory access = `m`, hit ratio = `h`:

> **EAT = h × (t + m) + (1 − h) × (t + m + m)**  (single-level page table)
> = t + m(2 − h)  (t + hit: ek m; miss: do m)

**Example:** t = 20 ns, m = 100 ns, h = 0.8: EAT = 0.8×120 + 0.2×220 = 96 + 44 = **140 ns**.

Agar TLB search time ignore (0): EAT = h·m + (1−h)·2m.
**Multilevel (2-level) miss** me 3 memory accesses (2 page table levels + 1 data).

**TLB reach** = (#TLB entries) × page size. Zyada reach = kam miss (huge pages).

## 5. Multilevel (Hierarchical) Paging

Bada page table ko khud pages me tod do. Outer page table -> inner page tables.

**Design rule:** **Har level ka page table ek page me fit ho.**

**Worked example:** 32-bit VA, page 4 KB (offset 12), PTE 4 B. Entries per page = 4096/4 = **1024 = 2^10**. Bache 20 bits = 10 + 10 -> **2-level**: p1 (10 bits), p2 (10 bits), offset (12).

**64-bit VA, page 4 KB, PTE 8 B:** entries/page = 512 = 2^9. VPN bits = 52 -> ceil(52/9) = **6 levels** (ya 5 + adjust).

**Inverted page table**: ek entry **har physical frame** ki (frame -> (pid, page)). Table chhota (frames ke barabar) par lookup search/hash, sharing mushkil.

**Hashed page table**: bade address spaces (64-bit) me hash of VPN.

## 6. Segmentation

Program ko **logical units** (main, functions, stack, data) me todo, alag size. Address = **(segment number s, offset d)**. **Segment table**: (base, limit). Check `d < limit` warna trap. Physical = base[s] + d.

- User ke view ke saath match, **sharing/protection** easy.
- **External fragmentation** hoti hai (variable size), internal nahi.

**Segmented paging** (Intel): segment ke andar paging -> dono fayde: external fragmentation nahi.

**Comparison:**

| | Paging | Segmentation |
|---|---|---|
| Unit size | Fixed | Variable |
| User visible | Nahi (OS) | Haan |
| Fragmentation | Internal | External |
| Table | Page table | Segment table (base+limit) |

## 7. Practice-style calculations

1. Page size 8 KB, process 25,000 B. Pages = ceil(25000/8192) = 4; internal frag = 4×8192 − 25000 = **7,768 B**.
2. Logical 34-bit, page 16 KB (14 bits), PTE 4 B. Page table size = 2^20 × 4 B = **4 MB**.
3. Physical memory 256 MB, page 4 KB => frames = 2^28/2^12 = 2^16; **inverted PT** = 64K entries.
4. TLB reach: 64 entries × 4 KB = **256 KB**.

## 8. GATE Quick Revision
- Paging = **no external** fragmentation; segmentation = **no internal**.
- Offset bits = log2(page size); VPN bits = VA bits − offset.
- Each page-table level should fit in **one page**.
- **EAT = h(t+m) + (1−h)(t+2m)** (single level).
- Best fit = smallest sufficient hole; worst fit = largest.
- TLB flush on context switch unless ASID.
- Segment table has **base and limit**; page table has frame numbers only.
