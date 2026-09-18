# OS Basics: System Calls, Modes aur Interrupts
<!-- topics: operating-system/system-calls, operating-system/os-protection, operating-system/interrupts, operating-system/io-handling -->

## 1. Operating System kya karta hai?

OS ek **software layer** hai jo hardware aur user programs ke beech baithti hai. Iske 3 bade kaam:

1. **Resource manager**: CPU, memory, disk, I/O devices ko programs me fair baantna.
2. **Abstraction**: "file", "process", "socket" jaise easy concepts dena (asli disk sectors ka jhanjhat chhupana).
3. **Protection**: ek program dusre ya OS ko bigaad na sake.

**Types of OS (GATE me definitions poochhi jaati hain):**

| Type | Idea | Example |
|---|---|---|
| Batch | Jobs ek ke baad ek, koi interaction nahi | Purane mainframe |
| Multiprogramming | Memory me kai jobs; jab ek I/O kare to CPU dusre ko | CPU idle kam |
| Time sharing (multitasking) | Chhote time quantum me CPU switch, interactive feel | Linux, Windows |
| Real-time | Deadline strict (hard: miss = failure, soft: quality kam) | Pacemaker, flight control |
| Multiprocessor | Ek se zyada CPU | Servers |
| Distributed | Kai machines ek system jaisi | Cluster |

> **GATE point:** Multiprogramming ka goal = **CPU utilization badhana**. Time sharing ka goal = **response time kam karna**.

## 2. User mode aur Kernel mode

CPU me ek **mode bit** hoti hai:

- **User mode (bit = 1)**: normal programs. Privileged instructions **allowed nahi**.
- **Kernel/Supervisor mode (bit = 0)**: OS. Sab instructions allowed.

**Privileged instructions** (sirf kernel mode me): I/O instructions, interrupts enable/disable, mode bit change, memory-management registers set karna (base/limit), timer set/clear, halt.

**User se kernel mode me kaise jaate hain?** Sirf 3 raste: **system call (trap / software interrupt)**, **hardware interrupt**, **exception (fault)**. User program khud mode bit change **nahi** kar sakta, warna protection khatam.

Kernel se user me wapas: ek special instruction (jaise `iret`) se, jo OS ke control me hoti hai.

## 3. System Call

System call = user program ka OS se service maangne ka **controlled entry point**.

**Flow (read example):**
1. Program `read(fd, buf, n)` library function bulata hai.
2. Library syscall number register me rakhkar **trap instruction** chalata hai (software interrupt).
3. CPU kernel mode me jaata hai, **interrupt vector / syscall table** se kernel routine chalti hai.
4. Kernel kaam karta hai (disk se data), result return.
5. Mode wapas user, program aage.

**Categories:** process control (`fork`, `exec`, `exit`, `wait`), file (`open`, `read`, `write`, `close`), device, information (`getpid`, `time`), communication (`pipe`, `socket`, `shmget`).

> **Trap:** Har library function system call **nahi** karta. `malloc()` kabhi kabhi hi `brk/mmap` chalata hai; `printf` buffer bharta hai, buffer flush pe `write` call hoti hai. `strlen`, `abs` kabhi nahi. GATE "will *always* invoke a system call" me aise functions dhoondhta hai: **`write`, `open`, `read`, `fork`, `getpid`** = always; `printf/malloc/fopen` = *not always*.

**System call vs function call:** function call me mode change nahi, stack same; system call me trap, mode change, kernel stack, isliye **mahanga**.

## 4. Interrupts

**Interrupt** = CPU ko kisi event ka signal, jisse wo current kaam rokkar ISR (Interrupt Service Routine) chalata hai.

**Types:**
- **Hardware interrupt** (asynchronous): timer, keyboard, disk complete. Maskable (INTR) ya non-maskable (NMI: power failure).
- **Software interrupt / trap** (synchronous): system call, breakpoint.
- **Exception**: divide by zero, page fault, illegal instruction. Instruction ke andar hi hota hai.

**Interrupt handling steps:**
1. Current instruction complete hoti hai (instruction boundary par check).
2. **PC aur PSW (flags) stack par save**.
3. Interrupt vector se ISR ka address.
4. ISR chalta hai (**interrupts disable** ho sakte hain jab tak critical part).
5. `iret`: registers/PC restore, program wapas.

**Vectored vs Non-vectored:**
- *Vectored*: device khud ISR ka address/vector number deta hai, isliye **fast**.
- *Non-vectored*: CPU ko pehle poll karke pata lagana padta hai kaun sa device, isliye slow.

**Priority:** Daisy chain (hardware me position se), ya priority interrupt controller. **Fast device ko higher priority** (hard disk > printer > keyboard), kyunki data lose hone ka risk.

**Interrupt overhead ka GATE numerical:**

> Ek device 10 KB/s pe data bhejta hai, byte-wise. Har interrupt ka overhead 50 µs. CPU ka kitna % interrupt handle karne me jaata hai?
> Byte time = 1/10,000 s = 100 µs. Overhead 50 µs har byte pe. **Fraction = 50/100 = 50%**.

## 5. I/O Handling aur Spooling

Tin tarike CPU aur device ke beech transfer ke:

| Method | Kaise | CPU involvement |
|---|---|---|
| **Programmed I/O (polling)** | CPU loop me status bit check karta rehta hai | Bahut zyada (busy waiting) |
| **Interrupt driven** | Device kaam khatam karke interrupt bheje | Har byte/word pe ISR |
| **DMA** | DMA controller memory se seedha data move karta hai, sirf shuru aur ant me CPU | Sabse kam |

**DMA modes:** *Burst* (poora block, CPU bus se bahar), *Cycle stealing* (ek word, phir CPU ko bus wapas; CPU thoda slow), *Transparent* (jab CPU bus use nahi kar raha).

**Spooling** (Simultaneous Peripheral Operations On-Line): slow **non-shareable** device (printer) ke output ko pehle **disk pe queue** karo, phir dheere-dheere print. Kai processes ek saath "print" kar sakte hain. **Printer = spooled device**; terminal (interactive) spooled nahi.

**Buffering / caching / spooling** ka fark: buffering = data ka temporary copy transfer speed match karne; cache = fast copy of frequently used; spooling = device sharing ke liye queue.

## 6. Kernel ki structure

- **Monolithic**: sab OS services ek kernel me (Linux). Fast, par ek bug poora system gira sakta hai.
- **Microkernel**: sirf minimal (IPC, scheduling, memory basics) kernel me; baaki user space servers (Mach, QNX). Safe, par message passing ke wajah se slow.
- **Layered, Hybrid (Windows NT, macOS)**.

## 7. Boot process (short)

Power on -> BIOS/UEFI (POST) -> **bootloader** (disk ka boot sector/MBR) -> kernel load -> init process (PID 1) -> services.

## 8. Quick GATE Revision

- Mode change user->kernel: **trap/interrupt/exception**; user program mode bit khud set nahi kar sakta.
- System call **software interrupt** se invoke hoti hai.
- Interrupt state (PC, PSW) **hardware/OS save** karta hai; ISR ke andar bhi saved register wapas karna zaroori.
- Fast device = high priority interrupt.
- DMA = highest throughput bulk transfer; cycle stealing me CPU % = (DMA cycles)/(total cycles).
- Printer spooling se hota hai.
- Timer interrupt se hi **preemption** milti hai (bina timer OS CPU wapas nahi le sakta).

### Practice sawal (khud try karo)
1. Kya `malloc()` hamesha system call karta hai? *(Nahi.)*
2. 1 MB/s device, 100 bytes per interrupt, overhead 10 µs. CPU %? *(Ek interrupt har 100 µs; 10/100 = 10%.)*
3. Kaunsi instruction user mode me chalane pe trap aati hai: `add`, `in/out`, `mov`? *(`in/out` I/O privileged hai.)*
