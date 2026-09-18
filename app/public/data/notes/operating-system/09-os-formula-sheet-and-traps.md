# OS: Formula Sheet, Common Traps aur GATE Strategy
<!-- topics: operating-system/process-scheduling, operating-system/process-synchronization, operating-system/virtual-memory, operating-system/page-replacement, operating-system/disk-scheduling -->

Ye chapter **last revision** ke liye hai. Sab chapters padhne ke baad exam se ek din pehle yahi dekho.

## 1. Formula Sheet

### Scheduling
- TAT = CT − AT; WT = TAT − BT; RT = first CPU − AT.
- Utilization = busy/total. Throughput = jobs/time.
- HRRN ratio = (WT + BT)/BT.
- SJF estimate: τₙ₊₁ = α tₙ + (1−α) τₙ.
- RM schedulable: U ≤ n(2^(1/n) − 1); EDF: U ≤ 1.

### Synchronization
- Semaphore final = init − #P(completed) + #V.
- CS conditions: ME, Progress, Bounded waiting.
- Producer-consumer: mutex=1, empty=n, full=0.

### Deadlock
- Deadlock-free iff R ≥ n(k−1)+1.
- Need = Max − Allocation. Safe ⟺ safe sequence exists.

### Memory
- Offset bits = log₂(page size); VPN bits = VA − offset.
- #pages = 2^(VA−offset); #frames = 2^(PA−offset).
- Page table size = #pages × PTE size.
- Levels: each table ≤ 1 page; entries/page = page size / PTE size.
- EAT (TLB) = h(t+m) + (1−h)(t+2m).
- EAT (demand paging) = (1−p)m + p·s.
- TLB reach = entries × page size.
- Internal frag = last page waste ≈ page/2 avg.

### Disk / file
- Capacity = surfaces × tracks × sectors × bytes.
- Access = seek + ½·(60/RPM) + transfer.
- Inode max = (D + N + N² + N³)B; N = B/P.
- Linked usable = B − P. Bitmap = blocks/8 bytes.

## 2. Comparison Tables

| Concept A | Concept B | Fark |
|---|---|---|
| Process | Thread | Thread shares heap/globals/files; own stack/regs/PC |
| ULT | KLT | ULT: blocking call blocks all; no multiprocessor parallelism |
| Paging | Segmentation | Fixed vs variable; internal vs external frag |
| FIFO | LRU | FIFO Belady; LRU stack algorithm |
| SCAN | LOOK | End tak vs last request tak |
| Deadlock | Starvation | Circular wait vs indefinite postponement |
| Prevention | Avoidance | Condition todo vs safe-state check |
| Mutex | Semaphore | Ownership (mutex ko wahi unlock jisne lock kiya) vs signalling |
| Spinlock | Blocking | Busy wait vs sleep |

## 3. Top 25 Traps (jahan marks kat-te hain)

1. TAT = CT − **AT** (sirf CT nahi).
2. SRTF me har **arrival** par compare.
3. RR me process quantum se pehle khatam ho to turant next.
4. Utilization me **idle time** count karo.
5. fork k baar = 2^k processes (children 2^k − 1).
6. Conditional fork: sirf condition true wale iterations gino.
7. Threads ka **stack private**, heap shared.
8. ULT me ek block = sab block.
9. Semaphore me blocked P ko complete mat maano.
10. Producer-consumer me mutex ko empty/full ke **andar** rakho.
11. Peterson = 2 processes only, teeno properties.
12. TSL: bounded waiting nahi.
13. RAG me multi-instance cycle ≠ deadlock.
14. Unsafe ≠ deadlock.
15. Deadlock-free min = n(k−1)+1.
16. Paging = internal frag; segmentation = external.
17. Page table har level **ek page me fit**.
18. EAT me TLB time `t` (agar diya ho) hit aur miss dono me lagta hai.
19. Belady sirf FIFO type.
20. Thrashing me CPU utilization **giri**, MPL badhane se aur giri.
21. Dirty page = 2 I/O.
22. Page fault instruction **restart** karta hai.
23. Disk: latency = **½** rotation.
24. Inode: triple indirect ka term dominant.
25. Root directory **fixed location** par.

## 4. GATE Problem Solving Strategy (OS)
1. **Table/Gantt/trace banao** (scheduling, page replacement, banker) — dimaag me nahi.
2. Units check: ms/ns/µs, KB/B, bits.
3. "Maximum/minimum" ke liye worst/best case scenario likho.
4. Statements wale sawal: har option ko definition se test karo, extreme words (always/never) par shak.
5. Time bachao: numerical NAT me approximation se pehle exact formula.

## 5. Kahan se practice karo
Web app ke **Subjects → Operating System** me har topic ke PYQs pattern-wise diye hain. Is order me: Process Scheduling → Synchronization → Page Replacement → Virtual Memory → Deadlock → Disk → File system.
