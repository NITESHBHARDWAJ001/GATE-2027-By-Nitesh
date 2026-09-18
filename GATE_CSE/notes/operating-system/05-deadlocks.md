# Deadlock: Conditions, RAG, Prevention, Avoidance (Banker's), Detection
<!-- topics: operating-system/resource-allocation, operating-system/deadlock-prevention-avoidance-detection, operating-system/bankers-algorithm, operating-system/resource-allocation-graph -->

## 1. Deadlock kya hai?

Processes ka ek set jisme **har process us resource ka wait kar raha hai jo set ka koi dusra process pakde hai**. Koi aage nahi badh sakta.

**Real example:** Do gaadiyan ek patli pul par aamne-saamne: dono ek doosre ke peeche hatne ka wait kar rahi hain.

## 2. Deadlock ki 4 necessary conditions (Coffman) — **sab ek saath** honi chahiye

1. **Mutual Exclusion**: resource ek time par ek process ke paas (non-shareable).
2. **Hold and Wait**: process ek resource pakde hue doosra maang raha hai.
3. **No Preemption**: resource process se zabardasti nahi chheena ja sakta.
4. **Circular Wait**: P0 -> P1 -> ... -> Pn -> P0 wait chain.

> **GATE:** ye conditions *necessary* hain, *sufficient* nahi. Prevention = inme se **kam se kam ek ko todna**.

## 3. Resource Allocation Graph (RAG)

- Nodes: processes (circle), resources (rectangle, dots = instances).
- **Request edge** P -> R, **Assignment edge** R -> P.
- **Rule:**
  - Graph me **cycle nahi** = deadlock **nahi**.
  - Cycle hai aur **har resource ka sirf 1 instance** = **deadlock pakka**.
  - Cycle hai par kuch resources ke **multiple instances** = deadlock **ho bhi sakta hai, nahi bhi** (cycle necessary hai, sufficient nahi).

**Example:** R1 (2 instances). P1 holds R1, P2 holds R1, P3 requests R1? Cycle ho sakta hai lekin agar koi process bahar wale resource se free ho jaaye to chhoot jaata hai.

## 4. Deadlock Handling ke 4 tarike

1. **Prevention** (conditions ko todo)  2. **Avoidance** (safe state)  3. **Detection + Recovery**  4. **Ignore (Ostrich)**: Windows/Linux practically ye karte hain.

## 5. Deadlock Prevention

| Condition | Kaise todo | Nuksan |
|---|---|---|
| Mutual exclusion | Sharable resources (read-only files) | Printer jaisa non-sharable nahi ho sakta |
| Hold & Wait | Ek saath sab resources request, ya jab maango tab kuch na pakdo | Low utilization, starvation |
| No preemption | Agar request fail, jo pakda hai wo chhod do | State save karna mushkil |
| **Circular wait** | Resources ko **numbering**, hamesha **badhte order me** request | Sabse practical |

**Wait-Die / Wound-Wait** (timestamp based, DBMS me bhi): purana process = chhota timestamp.
- **Wait-Die** (non-preemptive): old -> young ke resource ke liye **wait**; young -> old ke liye **die (rollback)**.
- **Wound-Wait** (preemptive): old -> young ko **wound (rollback)** kar deta hai; young -> old ka **wait**.

## 6. Minimum resources for deadlock-free (GATE ka favourite formula)

`n` processes, har ek ko **maximum `k`** instances chahiye (same resource type), total `R` instances.

Worst case: har process ne `k − 1` le liye aur sab atke. Deadlock nahi hoga agar ek aur instance bacha ho:

> **Deadlock-free iff  R ≥ n(k − 1) + 1**  (Minimum R = n(k−1)+1)

**Example:** 3 processes, har ek ko max 4 chahiye. Min R = 3×3 + 1 = **10**. Agar R = 9 hoga to deadlock possible.
**Max processes** for given R aur k: `n(k−1) + 1 ≤ R` -> `n ≤ (R−1)/(k−1)`.

## 7. Deadlock Avoidance: Safe/Unsafe State

OS ko har process ki **maximum need pehle se pata** honi chahiye.

- **Safe state**: koi aisi sequence <P1, P2, ..., Pn> hai jisme har Pi ki need (available + pehle wale processes ne jo chhoda) se poori ho sake.
- **Unsafe state**: safe sequence nahi. Unsafe = deadlock **possible** (zaroori nahi). **Deadlock => unsafe**, par unsafe ≠ deadlock.
- Avoidance = sirf safe states me raho.

### Banker's Algorithm (multiple instances)

Data structures (n processes, m resource types):
- **Available[m]**, **Max[n][m]**, **Allocation[n][m]**, **Need[n][m] = Max − Allocation**.

**Safety algorithm:**
1. Work = Available, Finish[i] = false.
2. Aisa `i` dhundo jiska Finish false aur **Need[i] ≤ Work**.
3. Work += Allocation[i], Finish[i] = true; repeat.
4. Sab true -> **safe** (jo order mila = safe sequence).

**Resource-request algorithm:** Request[i] ≤ Need[i] aur ≤ Available ho to *pretend* allocate karo, safety chalao; safe to grant, warna roll back.

### Worked example
Resources A,B,C total (10,5,7). Available = (3,3,2).

| P | Alloc | Max | Need = Max−Alloc |
|---|---|---|---|
| P0 | 0 1 0 | 7 5 3 | 7 4 3 |
| P1 | 2 0 0 | 3 2 2 | 1 2 2 |
| P2 | 3 0 2 | 9 0 2 | 6 0 0 |
| P3 | 2 1 1 | 2 2 2 | 0 1 1 |
| P4 | 0 0 2 | 4 3 3 | 4 3 1 |

Work = (3,3,2).
- P1: need (1,2,2) ≤ (3,3,2) ✓ -> Work = (3,3,2)+(2,0,0) = (5,3,2)
- P3: (0,1,1) ✓ -> (5,3,2)+(2,1,1) = (7,4,3)
- P4: (4,3,1) ✓ -> (7,4,3)+(0,0,2) = (7,4,5)
- P0: (7,4,3) ✓ -> (7,4,5)+(0,1,0) = (7,5,5)
- P2: (6,0,0) ✓ -> (10,5,7)

**Safe sequence: <P1, P3, P4, P0, P2>** (aur bhi ho sakte hain).

**Tip:** "Kitne safe sequences?" poochhe to har step par jitne processes eligible, unhe try karo (backtracking).

## 8. Deadlock Detection

- **Single instance**: **wait-for graph** (RAG se resources hata do). **Cycle = deadlock**. Cycle detection O(n²).
- **Multiple instances**: Banker jaisa detection algorithm (Need ki jagah **Request** matrix). Jo process finish **nahi** ho sake wahi deadlocked.

Detection kitni baar chalayein? Har request par (costly) ya periodic / jab CPU utilization gire.

## 9. Recovery
- **Process termination**: sab deadlocked abort, ya ek ek karke (cost/priority/progress dekhkar).
- **Resource preemption**: victim chuno, rollback, **starvation** se bacho (same victim baar baar nahi).

## 10. Livelock aur Starvation (deadlock se alag)
- **Starvation**: process ko resource kabhi nahi milta (par system aage badhta hai).
- **Livelock**: processes chal rahe hain par koi progress nahi (dono ek doosre ko raasta dete rehte hain).

## 11. Quick Revision
- 4 conditions: **ME, Hold&Wait, No preemption, Circular wait**.
- RAG: single instance me cycle = deadlock; multi instance me cycle necessary hai, sufficient nahi.
- **R ≥ n(k−1)+1** => deadlock free.
- Safe ⇒ no deadlock; deadlock ⇒ unsafe; unsafe ⇏ deadlock.
- Prevention practical: **resource ordering**.
- Banker's: Need = Max − Alloc; safety check step by step.

### Practice
1. 4 processes, har ek ko max 3 tape drives chahiye. Min drives for deadlock-free? *(4×2+1 = 9)*
2. Kya deadlock-free hone ke liye RAG me cycle na hona zaroori hai (multi-instance)? *(Nahi; cycle ho sakta hai par deadlock nahi.)*
3. Wait-die me young process purane ke resource ko maange to? *(Die/rollback.)*
