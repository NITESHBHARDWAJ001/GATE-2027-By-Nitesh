# File System, Disk Structure aur Disk Scheduling
<!-- topics: operating-system/file-system, operating-system/disk, operating-system/disk-scheduling, operating-system/linked-allocation -->

## 1. File aur Directory

**File** = named collection of related data. Attributes: name, type, location, size, protection, time stamps.
**Operations:** create, open, read, write, seek (reposition), delete, truncate. **Open-file table**: system-wide + per-process (file pointer, mode).

**Access methods:** sequential, direct (random), indexed.

**Directory structures:** single-level (naming problem), two-level (per-user), **tree** (path names, absolute/relative), **acyclic graph** (links/sharing: hard link, soft/symbolic link), general graph (cycles, garbage collection).

**Hard link**: same inode ka doosra naam (link count badhta). **Soft link**: ek alag file jisme path likha hota (dangling ho sakta hai).

## 2. Disk Structure (yaad rakho, numericals bahut hain)

Disk = platters -> **surfaces** -> **tracks** (concentric) -> **sectors**. Same track number sabhi surfaces par = **cylinder**.

```
Capacity = surfaces x tracks per surface x sectors per track x bytes per sector
```

**Disk access time = Seek time + Rotational latency + Transfer time**
- **Seek**: head ko track par le jaana (largest cost).
- **Rotational latency**: sector ke head ke neeche aane ka wait. **Average = ½ rotation** = ½ × (60 / RPM) s.
- **Transfer time** = (data size / transfer rate) ya = rotation time × (sectors to read / sectors per track).

**Example:** 7200 RPM, avg seek 4 ms, 200 sectors/track, sector 512 B. Rotation = 60/7200 = 8.33 ms; avg latency = 4.17 ms; 1 sector transfer = 8.33/200 = 0.042 ms. **Access ≈ 4 + 4.17 + 0.04 = 8.21 ms.**

**Sequential vs random:** ek track ke saare sectors padhne me seek ek baar, latency ek baar (par poora ghoomna).

## 3. Disk Scheduling (seek time minimize)

Head position aur request queue di hoti hai. Total **head movement (in cylinders)** nikalte hain.

**Example:** cylinders 0–199, head = **53**, queue: **98, 183, 37, 122, 14, 124, 65, 67**.

| Algorithm | Order | Total movement |
|---|---|---|
| **FCFS** | 53→98→183→37→122→14→124→65→67 | 45+85+146+85+108+110+59+2 = **640** |
| **SSTF** (nearest) | 53→65→67→37→14→98→122→124→183 | 12+2+30+23+84+24+2+59 = **236** |
| **SCAN** (elevator), direction: 0 ki taraf | 53→37→14→**0**→65→67→98→122→124→183 | 53 + 183 = **236** |
| **C-SCAN** (0 ki taraf ja ke jump) | 53→37→14→0 → jump 199 → 183→124→122→98→67→65 | 53 + 199 + (199−65) = **386** |
| **LOOK** (last request tak) | 53→37→14→65→...→183 | (53−14) + (183−14) = **208** |
| **C-LOOK** | 53→37→14 → jump 183 → 124→122→98→67→65 | 39 + 169 (jump) + 118 = **326** (jump ignore ho to 157) |

Rules:
- **SCAN/C-SCAN** disk ke **end (0 / max)** tak jaate hain, **LOOK/C-LOOK** sirf **last request** tak.
- **SSTF** starvation kar sakta hai (door wale ko).
- **SCAN** bulk load me achha, starvation nahi; **C-SCAN** uniform wait time.
- Jump (C-SCAN/C-LOOK ka wapas) count hota hai ya nahi: **question dekho** (GATE usually count karta hai jab "total head movement" poochha ho, par kabhi ignore; conventions padho).

Modern SSD me seek nahi, isliye ye HDD ke liye.

## 4. Disk Space Allocation Methods

### Contiguous
File ke blocks lagatar. **Fast** (sequential + direct), **external fragmentation**, file size badhana mushkil.

### Linked
Har block me **agle block ka pointer**. **No external fragmentation**, size badhna easy. **Random access slow** (n-th block ke liye n hops), pointer overhead, ek pointer kharab = file gayi.
- Usable data per block = **block size − pointer size**.
- **FAT (File Allocation Table)**: pointers ko ek table me alag rakho (chain) -> random access behtar. FAT size = (#blocks) × (entry size). FAT ko memory me cache.

### Indexed
Ek **index block** me saare data blocks ke pointers. Direct access easy, external fragmentation nahi. Chhoti files ke liye index block waste.
- Bade files: **linked index blocks**, **multilevel index**, **combined (Unix inode)**.

## 5. Unix inode (must-know numericals)

**Inode** me: mode, owner, size, timestamps, link count, aur pointers:
- **12 (ya 10) direct** pointers, **1 single indirect**, **1 double indirect**, **1 triple indirect**.

Block size `B`, pointer size `P` -> pointers per block `N = B/P`.

> **Max file size = (D + N + N² + N³) × B**  (D = direct pointers)

**Example:** B = 4 KB, P = 4 B -> N = 1024. D = 12. Max = (12 + 1024 + 1024² + 1024³) × 4 KB ≈ **4 TB** (dominant N³ term: 2³⁰×4KB = 4 TB).

**Example (disk address 32 bit, block 1 KB):** N = 256; agar sirf single+double: (D + 256 + 65536) blocks.

**Kisi file ko padhne ke liye kitne disk accesses:** byte offset se block number, phir uske level (direct/single/double) ke hisaab se **extra index block reads** + data block.
- Direct block: 1 access (data). Single indirect: 2. Double: 3. Triple: 4.

## 6. Free Space Management
- **Bit vector (bitmap)**: 1 bit per block. Size = blocks/8 bytes. First free block dhundna easy, par bitmap bada.
- **Linked list** of free blocks, **Grouping**, **Counting** (start + count), **Space maps**.

**Example:** 1 TB disk, block 4 KB -> 2²⁸ blocks -> bitmap = 2²⁸ bits = **32 MB**.

## 7. RAID (Redundant Array of Independent Disks)

| Level | Idea | Fault tolerance | Note |
|---|---|---|---|
| RAID 0 | Striping | Nahi | Fast, no redundancy |
| RAID 1 | Mirroring | 1 disk | 50% capacity |
| RAID 2/3/4 | Bit/byte/block striping + dedicated parity | 1 disk | Parity disk bottleneck (RAID 4) |
| **RAID 5** | Block striping + **distributed parity** | 1 disk | Popular; capacity (n−1)/n |
| RAID 6 | Double distributed parity | 2 disks | - |

RAID = fault tolerance **aur/ya** performance.

## 8. Directory implementation, Journaling, Buffer cache
- Directory: **linear list** (search O(n)), **hash table** (fast, collision).
- **Journaling** (log-structured): metadata changes pehle log me, crash recovery fast.
- **Buffer cache / page cache**: disk blocks ko RAM me cache; **write-through vs write-back**.
- Root directory disk par **fixed known location** par hoti hai.

## 9. Mounting, Swap space
- **Mount**: ek file system ko directory tree me jodna. **Swap space**: virtual memory ke liye disk area (process data ke pages), **raw partition** (fast, no file system overhead).

## 10. GATE Quick Revision
- Access time = seek + **½ rotation** + transfer.
- Inode max size = (D + N + N² + N³)·B, N = B/P.
- Linked allocation: usable = B − P; random access slow.
- SCAN/C-SCAN end tak, LOOK/C-LOOK last request tak.
- SSTF starvation; FCFS fair.
- Contiguous = external fragmentation; linked/indexed nahi.
- Bitmap size = #blocks/8 bytes.

### Practice
1. Head 50, queue 90, 20, 60, 10. FCFS movement? *(40+70+40+50 = 200)*
2. B = 2 KB, P = 4 B, D = 10: max file size upto single indirect? *((10 + 512) × 2 KB = 1044 KB)*
3. 6000 RPM: avg rotational latency? *(10 ms per rotation → 5 ms)*
