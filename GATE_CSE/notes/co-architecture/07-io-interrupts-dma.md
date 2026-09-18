# I/O Organization: Programmed I/O, Interrupts, DMA
<!-- topics: co-architecture/dma, co-architecture/interrupts, co-architecture/io-handling, operating-system/dma -->

## 1. I/O interface

CPU aur device ke beech **I/O controller/interface** (status, control, data registers). Device slow, CPU fast → coordination chahiye.

**I/O addressing:**
- **Memory-mapped I/O**: device registers memory addresses. Normal LOAD/STORE. Address space kam.
- **Isolated (port-mapped) I/O**: alag IN/OUT instructions.

## 2. Data transfer techniques

### (a) Programmed I/O (polling)
CPU loop me device ka **status bit** check karta rehta hai (**busy waiting**). Simple, **CPU waste**.

### (b) Interrupt-driven I/O
Device ready hone par **interrupt** bhejta hai; CPU beech me doosra kaam karta. Har byte/word par ISR overhead.

### (c) DMA (Direct Memory Access)
**DMA controller** CPU ke bina device ↔ memory transfer karta hai. CPU sirf **setup** (address, count, direction) aur **completion interrupt**. **Bulk transfer ke liye best/highest throughput.**

## 3. Interrupt handling (COA detail)

- **Maskable (INTR)** vs **Non-maskable (NMI)**. **Vectored** (device vector deta, fast) vs **non-vectored**.
- **Interrupt priority:** **Daisy chain** (device position se priority; INTA chain me pass hota), **parallel priority (encoder)**.
- Sequence: current instruction complete → **PC + flags save** → ISR address → ISR → **IRET**. Interrupt **instruction boundary** par serve hota.
- **Interrupt latency** = signal se ISR shuru hone tak.
- **Nested interrupts**: higher priority ISR ko interrupt kar sakta.
- **Software interrupt/trap**, exceptions.

### Interrupt vs Polling numericals

**Interrupt overhead:**
Device data rate `r` bytes/s, har byte par ek interrupt, overhead `t_i` s. **CPU fraction = r × t_i.**
**Example:** 10 KB/s, t_i = 20 µs → 10,000 × 20e-6 = **20%**.

**Polling:**
Device ko poll karne ka **maximum interval** = data lose na ho: interval ≤ 1/(data rate).
**Example:** keyboard 10 keys/s → har **≤ 100 ms** me poll. Ek poll = 100 cycles, CPU 1 GHz (0.1 µs): CPU fraction = 0.1 µs / 100 ms = **10⁻⁶** (bahut kam, isliye keyboard ke liye polling theek).
Fast device (disk) ke liye polling **CPU ko poora busy** rakhega, isliye interrupt/DMA.

## 4. DMA in detail

### Transfer modes
1. **Burst (block) mode**: DMA bus poori block transfer ke liye pakad leta hai; **CPU bus se bahar** (CPU us waqt memory nahi chala sakta).
2. **Cycle stealing**: DMA **ek word** transfer karke bus wapas CPU ko; CPU thoda slow hota (har DMA transfer ek bus cycle **chura leta**).
3. **Transparent (hidden) mode**: DMA tabhi jab CPU bus use nahi kar raha; CPU slow nahi.

### DMA transfer ke steps
1. CPU DMA controller ko program karta hai: **memory start address, word count (data count register), direction, device**.
2. Device ready → DMA **bus request (HOLD/BR)** → CPU **bus grant (HLDA/BG)** deta hai.
3. DMA address/data bus control karke transfer karta; **address register++, count−−**.
4. Count 0 → DMA **interrupt** CPU ko.

**Data count register:** agar **n bits** ka count register hai to ek DMA operation me max **2ⁿ words** transfer. Bade file ke liye **kai baar** DMA program karna padega.

### DMA numerics
**Cycle stealing me CPU ka slowdown:**
Device rate `r` bytes/s, DMA ek transfer me `w` bytes (bus width), har transfer ek memory cycle `t_m`.
- Transfers/s = r / w. **Bus time consumed = (r/w) × t_m.** = memory bandwidth ka fraction.

**Example:** device 1 MB/s, 4-byte words: 250,000 words/s. Memory cycle 100 ns: stolen time = 250,000 × 100 ns = **25 ms/s = 2.5%** CPU/memory time.

**DMA me percentage of CPU time stolen** = (DMA cycles per second)/(CPU/bus cycles per second).
**Example:** 100 MHz bus, DMA 2 cycles per word, 1 M words/s: 2 M cycles / 100 M = **2%**.

**Time for DMA transfer of N bytes (burst):** setup + N/(transfer rate) + interrupt handling.

**DMA vs interrupt for bulk data:** DMA overhead ek baar (setup + completion) vs interrupt me **har word** par ISR. Isliye DMA jeet.

### DMA aur cache coherence
DMA memory badalta hai par cache me purani copy → **coherence problem**; OS cache flush/invalidate karta.

## 5. Bus
- **Synchronous** (common clock) vs **Asynchronous** (handshake: request/acknowledge). **Bus arbitration:** daisy chain, centralized parallel, distributed. **Bus master/slave**.
- **Bus bandwidth** = width × frequency (× transfers/cycle).

## 6. I/O Processors / Channels
Mainframes: **I/O channel** (selector, multiplexer) — apna processor, CPU se aur zyada offload.

## 7. Quick Revision
- Programmed I/O = polling, CPU busy. Interrupt = event driven. DMA = bulk, minimum CPU.
- Interrupt priority: fast device = high; **vectored = fast**.
- Interrupt CPU % = rate × overhead per interrupt.
- DMA modes: burst, cycle stealing, transparent.
- Data count register n bits → 2ⁿ words per DMA.
- DMA ke liye CPU ko bus **grant** karna padta hai (HOLD/HLDA).

### Practice
1. 50 KB/s device, byte-wise interrupt, ISR 5 µs: CPU %? *(50,000 × 5µs = 25%)*
2. File 1 MB, DMA count reg 16 bit (max 65,536 words), word 4 B: DMA operations? *(1 MB = 262,144 words → 262144/65536 = 4)*
3. Highest throughput bulk transfer? *(DMA burst mode)*
