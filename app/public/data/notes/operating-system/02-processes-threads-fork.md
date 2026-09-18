# Processes, Threads, Context Switch aur fork()
<!-- topics: operating-system/process, operating-system/context-switch, operating-system/threads, operating-system/fork-system-call, operating-system/input-output -->

## 1. Process kya hai?

**Program** = disk par pada hua passive code. **Process** = program ka **chalta hua instance** (active). Ek program ke kai processes ho sakte hain (do baar Chrome khola).

Process ke memory sections:

| Section | Kya rakhta hai |
|---|---|
| **Text (code)** | Instructions (read-only, shareable) |
| **Data** | Global + static variables |
| **Heap** | `malloc/new` se dynamic memory (upar ki taraf badhta) |
| **Stack** | Function calls, local variables, return address (neeche ki taraf) |

### PCB (Process Control Block)
OS har process ke liye ek PCB rakhta hai: **PID, process state, program counter, CPU registers, scheduling info (priority), memory info (page table, base/limit), open files, accounting**. Context switch = ek process ka PCB save, dusre ka load.

## 2. Process States

```
 New --admit--> Ready --dispatch--> Running --exit--> Terminated
                  ^  <--timeout/preempt--  |
                  |                         | I/O or event wait
                  +---- I/O complete ---- Blocked (Waiting)
```

- **New**: ban raha hai. **Ready**: CPU ka wait. **Running**: CPU par. **Blocked/Waiting**: I/O ya event ka wait. **Terminated**.
- **Running -> Ready**: time quantum khatam ya higher-priority aaya (**preemption**).
- **Running -> Blocked**: I/O request.
- **Blocked -> Ready** (Blocked -> Running **seedha nahi**).
- **Suspended states** (medium-term scheduler): Ready-suspend, Blocked-suspend, jab memory kam ho aur process swap out ho.

**3 Schedulers:**
- **Long-term (job) scheduler**: kaunsa job memory me aaye, **degree of multiprogramming** control.
- **Short-term (CPU) scheduler**: Ready queue se CPU kisko. Sabse frequent, fast honi chahiye.
- **Medium-term**: swapping (suspend/resume).

**CPU-bound vs I/O-bound** processes ka achha mix rakhna long-term scheduler ka kaam.

## 3. Context Switch

Jab CPU ek process se dusre par jaata hai:
1. Running process ka **PC, registers, PCB me save** (state update).
2. Naye process ka PCB load, **registers restore**.
3. (Memory management: MMU/page table register change; **TLB flush** agar ASID nahi).

**Context switch pure overhead hai**: us time koi useful kaam nahi. Time hardware support (register sets) pe depend.

**Kya save hota hai:** PC, general registers, stack pointer, PSW/flags, MMU registers. **Kya nahi:** process ka main memory content (wo memory me hi rehta hai).

> **Trap:** Har system call/interrupt = context switch **nahi**. Sirf **mode switch** ho sakta hai. **Process switch** tab jab CPU kisi *aur* process ko diya jaaye. **Thread switch (same process)** sasta hai (address space same, TLB flush nahi).

> **GATE numerical:** Agar user->kernel switch time `a` aur process switch time `b`, to system call ke saath schedule me `a + b` tab jab scheduler naya process chunta hai.

## 4. Threads

**Thread = process ke andar lightweight execution unit.**

| Shared (same process ke threads me) | Private (har thread ka apna) |
|---|---|
| Code, global data, **heap**, open files, address space, signals | **Stack, registers, PC**, thread ID, (errno) |

> GATE ka favourite: "Threads share **heap aur global variables** (both). **Stack** private. **Program counter aur registers** private."

**Benefits:** responsiveness, resource sharing, economy (creation/context switch sasta), multiprocessor par parallelism.

**User-level vs Kernel-level threads:**

| | User-level (ULT) | Kernel-level (KLT) |
|---|---|---|
| Kaun manage | Thread library (user space) | OS kernel |
| Switch cost | Bahut kam (no kernel) | Zyada |
| **Blocking system call** | **Poora process block** | Sirf wo thread |
| Multiprocessor parallelism | **Nahi** (kernel ko ek hi process dikhta) | **Haan** |
| Scheduling | App ke control me | Kernel |

**Multithreading models:** Many-to-One (ULT), One-to-One (Linux/Windows), Many-to-Many.

**Race condition example (threads):** shared `x = 0`; do threads `x = x + 1` chalate hain (load, add, store). Interleaving se final **1 ya 2** ho sakta hai (lost update). Isliye locks chahiye (next chapters).

## 5. fork() system call: sabse zyada poochha jaane wala

`fork()` process ki **copy** banata hai (child). Dono **fork ke turant baad wale statement se** chalte hain.

- Child me `fork()` return karta hai **0**; parent me **child ka PID**; fail par **-1**.
- Child ko parent ki memory ki **copy** milti hai (copy-on-write). Isliye child me variable change hone se parent ka **nahi** badalta.

### Counting rule (memorize)
- `k` **unconditional sequential** fork() calls (no conditions) -> **total processes = 2^k**, naye child processes = **2^k − 1**.
- `for(i=0;i<n;i++) fork();` -> total 2^n, children 2^n − 1.

**Example 1:** `fork(); fork(); fork();` -> 8 processes, **7 children**.

**Example 2 (conditional):**
```c
if (fork() == 0) { fork(); }
printf("Hi");
```
Parent print, child print, grandchild (child ka fork) print = **3 baar "Hi"**.

**Example 3 (loop with condition):** `for(i=0;i<10;i++) if(i%2==0) fork();` -> i = 0,2,4,6,8 => 5 forks => 2^5 = 32 processes, **31 children**.

**Example 4 (`fork` inside `&&`/`||`):**
```c
fork() && fork();   // parent: fork() nonzero -> second fork runs. child: fork() returned 0 -> skipped
```
Total 3 processes.

**Process tree banao** har doubt me: har fork par node do me split.

### wait(), exec(), exit()
- `wait()` parent ko child ke terminate hone tak block karta hai.
- `exec()` current process image ko **naye program se replace** karta hai (PID same).
- **Zombie**: child khatam ho gaya, parent ne `wait` nahi kiya (entry PCB me). **Orphan**: parent mar gaya, child ko `init` adopt karta hai.

## 6. Inter-Process Communication (IPC)
- **Shared memory**: fast, synchronization khud karni padti hai.
- **Message passing** (pipe, message queue, socket): easy, kernel involve, slow.
- **Pipe**: unidirectional; `ls | grep x` shell pipe. **I/O redirection** (`>`, `<`) ek existing file ko stdin/stdout banata hai.

## 7. GATE Quick Revision
- Thread = share heap+globals, private stack+registers+PC.
- Blocking call ULT me **sab threads block**.
- k forks = 2^k processes.
- Zombie/orphan definitions.
- Context switch = pure overhead; process switch > thread switch; TLB flush process switch par.
- Multiprogramming ka degree = memory me processes ki sankhya (long-term scheduler control).

### Practice
1. `fork(); fork(); printf("A");` kitni "A"? *(4)*
2. `int a=5; if(fork()==0){a+=5; printf("%d",a);} else {wait(NULL); printf("%d",a);}` Output? *(10 phir 5)*
3. Kya ULT multiprocessor par parallel chal sakte hain? *(Nahi.)*
