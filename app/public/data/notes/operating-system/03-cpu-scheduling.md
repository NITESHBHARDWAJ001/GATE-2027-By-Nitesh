# CPU Scheduling: Har Algorithm Solved Examples ke Saath
<!-- topics: operating-system/process-scheduling, operating-system/round-robin-scheduling, operating-system/srtf -->

## 1. Basic terms (yaad rakho)

| Term | Meaning | Formula |
|---|---|---|
| **AT** (Arrival Time) | Process ready queue me kab aaya | given |
| **BT** (Burst Time) | Total CPU time chahiye | given |
| **CT** (Completion Time) | Kab khatam hua | Gantt chart se |
| **TAT** (Turnaround) | Aane se khatam hone tak | **CT − AT** |
| **WT** (Waiting) | Ready queue me kitna ruka | **TAT − BT** |
| **RT** (Response) | Pehli baar CPU kab mila | **First CPU time − AT** |

- **CPU utilization** = CPU busy time / total time. **Throughput** = processes per unit time.
- **Preemptive**: OS chalte process se CPU chheen sakta hai. **Non-preemptive**: process khud release kare (burst end ya I/O).
- **Dispatcher**: context switch + user mode + jump. **Dispatch latency** = dispatcher ka time.
- **Convoy effect**: chhote processes ek lambe process ke peeche ruk jaate hain (FCFS ki problem).

**Golden rule for solving:** Gantt chart banao, har time par ready queue likho. Tie-break: GATE me jab tak bataya na ho, **lower process index / earlier arrival** pehle.

## 2. Running example (sab algorithms isi par)

| Process | AT | BT |
|---|---|---|
| P1 | 0 | 8 |
| P2 | 1 | 4 |
| P3 | 2 | 9 |
| P4 | 3 | 5 |

Total burst = 26.

## 3. FCFS (First Come First Serve): non-preemptive

Jo pehle aaya wo pehle. Simple, **convoy effect**, avg WT zyada.

Gantt: `P1(0–8) | P2(8–12) | P3(12–21) | P4(21–26)`

| P | CT | TAT | WT |
|---|---|---|---|
| P1 | 8 | 8 | 0 |
| P2 | 12 | 11 | 7 |
| P3 | 21 | 19 | 10 |
| P4 | 26 | 23 | 18 |

**Avg WT = (0+7+10+18)/4 = 8.75**

## 4. SJF (Shortest Job First): non-preemptive

Ready processes me **sabse chhota BT** pehle. **Minimum average WT** deta hai (non-preemptive me optimal), par **starvation** lambe jobs ki.

t=0: sirf P1 -> 0–8. t=8: ready {P2(4), P3(9), P4(5)} -> P2 (8–12) -> P4 (12–17) -> P3 (17–26).

WT: P1 0, P2 7, P4 9, P3 15. **Avg WT = 31/4 = 7.75**

## 5. SRTF (Shortest Remaining Time First): SJF ka preemptive version

Har arrival par **remaining time** compare, jiska kam wo chale.

- t=0: P1 (rem 8). t=1: P2 aaya BT 4 < P1 rem 7 -> **preempt**. P2 chalta hai.
- t=2: P3(9) nahi. t=3: P4(5) vs P2 rem 2 -> P2 chalta rahe. t=5: P2 done.
- Ready {P1 rem 7, P3 9, P4 5} -> P4 (5–10) -> P1 (10–17) -> P3 (17–26).

Gantt: `P1(0–1) | P2(1–5) | P4(5–10) | P1(10–17) | P3(17–26)`

CT: P1 17, P2 5, P3 26, P4 10. TAT: 17, 4, 24, 7. WT: 9, 0, 15, 2. **Avg WT = 26/4 = 6.5** (isko **minimum** avg WT deta hai, sab algorithms me).

## 6. Round Robin (RR): time-sharing ke liye

Har process ko **time quantum q**; q khatam pe ready queue ke **end** me. Preemptive. **Starvation nahi**.

**q = 4 par running example:**

- 0–4 P1 (rem 4). Ready queue (aane ke order me): P2, P3, P4, phir P1.
- 4–8 P2 done. 8–12 P3 (rem 5). 12–16 P4 (rem 1). 16–20 P1 done. 20–24 P3 (rem 1). 24–25 P4 done. 25–26 P3 done.

Gantt: `P1 0–4 | P2 4–8 | P3 8–12 | P4 12–16 | P1 16–20 | P3 20–24 | P4 24–25 | P3 25–26`

CT: P1 20, P2 8, P3 26, P4 25. WT = TAT − BT: P1 12, P2 3, P3 15, P4 17. **Avg WT = 47/4 = 11.75** (isliye RR ka avg WT zyada, par **response time achha**).

**Key points:**
- q **bahut bada** -> FCFS jaisa. q **bahut chhota** -> context switch overhead zyada.
- Agar `n` processes aur quantum `q`, koi process **(n − 1)·q** se zyada wait ke baad CPU pata hai (response bound).
- **Tie rule:** naya arrival aur preempted process same time par ready queue me aaye to GATE usually **naya arrival pehle**, phir preempted (question me convention ho to wahi).

## 7. Priority Scheduling

Har process ki priority; **jiski priority zyada (number chhota/bada: question dekho)** wo pehle. Preemptive/non-preemptive dono.

- **Starvation** (kam priority wale ko CPU kabhi nahi) -> solution: **Aging** (wait ke saath priority badhao).
- SJF ek priority scheduling hai jisme priority = 1/next burst.

## 8. HRRN (Highest Response Ratio Next): non-preemptive

**Response Ratio = (WT + BT) / BT**. Sabse zyada ratio wala chalta hai. Lambe wait wale ka ratio badhta hai isliye **starvation nahi**, aur SJF jaisa achha performance.

## 9. Multilevel Queue / Feedback Queue

- **Multilevel Queue**: ready queue kai queues me (foreground RR, background FCFS), har queue ki apni algorithm; queues ke beech fixed priority. Process queue badalta nahi.
- **Multilevel Feedback Queue (MLFQ)**: process queues ke beech **move** kar sakta hai. CPU-heavy neeche, I/O-bound upar. **Aging** built-in. Sabse flexible (real OS).

## 10. I/O ke saath problems (GATE ka pyara twist)

Jab process CPU burst + I/O burst ke saath diya ho:

1. Har process ke CPU/IO bursts alag likho.
2. Jab process I/O me jaaye to CPU **dusre ready process** ko do.
3. I/O complete = process phir se ready queue me.
4. Agar koi ready nahi aur sab I/O me, to **CPU idle**.

**CPU utilization = (total CPU burst time) / (total completion time).**

## 11. Comparison table

| Algorithm | Preemptive? | Starvation | Avg WT | Note |
|---|---|---|---|---|
| FCFS | No | No | Zyada | Convoy effect |
| SJF | No | **Haan** | Min (non-preemptive) | BT pehle se maloom nahi hota; estimate (exponential averaging) |
| SRTF | **Haan** | **Haan** | **Sabse kam** | Chhote aate rahe to long starve |
| RR | Haan | No | Zyada | Best response, q ka choice |
| Priority | Both | **Haan** | - | Aging se fix |
| HRRN | No | No | Achha | - |
| MLFQ | Haan | Controlled | - | Real systems |

**SJF ka BT estimate:** τ(n+1) = α·t(n) + (1−α)·τ(n) (exponential averaging), 0 ≤ α ≤ 1.

## 12. Real-time scheduling (short)

- **Rate Monotonic (RM)**: static priority, **chhota period = high priority**. Schedulable if CPU utilization ≤ n(2^(1/n) − 1) (n → ∞: ~69.3%).
- **EDF (Earliest Deadline First)**: dynamic priority, jiska deadline nazdeek. Utilization ≤ **100%** tak optimal.

## 13. Common GATE Traps
- WT = TAT − BT, **TAT = CT − AT** (AT ko mat bhoolo).
- SRTF me arrival par hi compare, sirf process-end par nahi.
- RR me quantum se pehle process khatam ho to **turant** agla shuru (quantum poora wait nahi).
- Utilization me **idle gaps** count hote hain.
- Context switch time diya ho to Gantt me har switch ke baad us time ko add karo.

### Practice
1. Do processes AT=0 BT=10 aur AT=0 BT=2, FCFS avg WT? *(order P1,P2: (0+10)/2=5)* SJF? *((0+2)/2 = 1)*.
2. RR quantum 2, P1(AT 0, BT 5), P2(AT 1, BT 3). Completion times? *(P1 rem after 0–2 =3; P2 2–4 rem 1; P1 4–6 rem 1; P2 6–7 done (CT 7); P1 7–8 (CT 8))*.
3. Kaunsa algorithm minimum average WT deta hai? *(SRTF)*.
