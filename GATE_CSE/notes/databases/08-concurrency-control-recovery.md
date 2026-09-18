# Concurrency Control (Locking, Timestamp) aur Recovery
<!-- topics: databases/two-phase-locking-protocol, databases/timestamp-ordering, databases/transaction-and-concurrency -->

## 1. Lock-based protocols

**Lock modes:** **Shared (S)**: read; kai transactions ek saath. **Exclusive (X)**: read+write; akela.

**Compatibility:**

| | S | X |
|---|---|---|
| **S** | ✓ | ✗ |
| **X** | ✗ | ✗ |

Sirf lock lagana kaafi nahi: schedule non-serializable ho sakta hai (unlock jaldi karne se). Isliye **two-phase locking**.

## 2. Two-Phase Locking (2PL)

Do phases:
1. **Growing**: sirf locks **lete** hain (release nahi).
2. **Shrinking**: sirf locks **chhodte** hain (naya lock nahi).

**Lock point** = growing khatam hone ka moment (last lock). 2PL schedules ka serial order = lock points ka order.

- 2PL **conflict serializability guarantee** karta hai.
- **Deadlock possible** (T1: lock A, wants B; T2: lock B, wants A).
- **Cascading rollback possible** (kyunki unlock jaldi).
- 2PL **sab conflict serializable schedules nahi de sakta** (kuch serializable schedules 2PL se nahi ban sakte).

### Variants
- **Strict 2PL**: **Exclusive locks commit/abort tak hold**. ⇒ **Strict schedules** (recoverable + cascadeless). Sabse popular.
- **Rigorous 2PL**: **saare locks** (S aur X) commit tak. Serial order = **commit order**.
- **Conservative (static) 2PL**: shuru me hi sab locks ek saath; **deadlock-free**, par kam concurrency aur pehle se read/write set pata chahiye.

**Lock upgrade/downgrade:** S -> X (growing me), X -> S (shrinking me).

### Question type: "Kya ye schedule 2PL follow karta hai?"
Har transaction ke lock/unlock sequence me dekho: **koi lock, kisi unlock ke baad** to nahi? Agar hai to 2PL violate.

## 3. Deadlock

Do ya zyada transactions ek doosre ke locks ka wait (circular).

**Detection:** **wait-for graph** (Ti → Tj: Ti Tj ke lock ka wait). **Cycle = deadlock**. Victim chuno, **rollback**.

**Prevention (timestamp based)** — purana transaction = chhota timestamp:
- **Wait-Die** (non-preemptive): old requests young ke lock: **wait**; young requests old ke lock: **die (abort)**. (Die = young mar jaata hai.)
- **Wound-Wait** (preemptive): old requests young ka lock: young ko **wound (abort)**; young requests old ka: **wait**.
Dono me **starvation nahi** (restart hone par **original timestamp** rakhte hain).
- **Timeout** based, **conservative 2PL**.

## 4. Timestamp Ordering Protocol

Har transaction ko **unique timestamp TS(T)** (start par, Lamport clock ya system clock). Har data item Q ke do timestamps:
- **R_TS(Q)**: sabse bada TS jisne Q **read** kiya.
- **W_TS(Q)**: sabse bada TS jisne Q **write** kiya.

**Rules (Ti = TS(Ti)):**
- **Ti read(Q):**
  - Agar **TS(Ti) < W_TS(Q)** → Ti ne "future" ka likha hua padhna hai → **Ti rollback** (restart naye TS ke saath).
  - Warna read allow, **R_TS(Q) = max(R_TS, TS(Ti))**.
- **Ti write(Q):**
  - Agar **TS(Ti) < R_TS(Q)** → jo baad me padh chuka use purani value milni chahiye thi → **rollback**.
  - Agar **TS(Ti) < W_TS(Q)** → **obsolete write**: basic TO me **rollback**; **Thomas write rule** me **ignore** karke aage badhte hain.
  - Warna write, W_TS(Q) = TS(Ti).

**Properties:** conflict serializable (serial order = timestamp order), **deadlock-free** (koi wait nahi), par **cascading rollback aur starvation** ho sakte hain; basic TO **recoverability guarantee nahi** karta. **Thomas write rule** view-serializable (par conflict nahi) schedules allow karta hai.

**Worked example:** TS(T1)=5, TS(T2)=10. R_TS(A)=0, W_TS(A)=0.
- T2 write(A): 10 ≥ R_TS(0), 10 ≥ W_TS(0) ✓ → W_TS(A)=10.
- T1 read(A): TS(T1)=5 < W_TS(A)=10 → **T1 rollback**.

**Multiversion (MVCC):** kai versions; readers block nahi; snapshot isolation (Postgres, Oracle).

## 4b. Optimistic (validation) concurrency control
Read phase (local copy) -> Validation -> Write phase. Kam conflict wale systems me achha.

## 5. Lock granularity
- **Multiple granularity locking**: database > table > page > row. **Intention locks:** IS, IX, SIX.
- **Row level locking = sabse zyada concurrency**, overhead zyada; table level kam concurrency, kam overhead.
- **Phantom** problem: range/predicate locks ya index locking.

## 6. Recovery (Database Crash Recovery)

**Failure types:** transaction failure (logic/abort), **system crash** (memory loss; disk safe), **disk failure** (media).

### Log-based recovery
**Log** (stable storage) records: `<T, start>`, `<T, X, old, new>`, `<T, commit>`, `<T, abort>`.
- **WAL (Write-Ahead Logging)**: data page disk par jaane se **pehle** uska log record disk par jaana chahiye. **Commit** = commit record log me flush hone par.
- **Undo** (old value se rollback) aur **Redo** (new value se dobara apply).

### Deferred vs Immediate modification
- **Deferred**: DB update commit ke baad → sirf **redo** chahiye.
- **Immediate**: commit se pehle bhi DB update → **undo aur redo** dono.

### Checkpoint
Periodically: sab log records aur dirty buffers disk par flush, `<checkpoint>` record. Recovery **last checkpoint** se shuru (purana log ignore).

**Recovery procedure (simple):**
1. Last **checkpoint** ke baad ke transactions dekho.
2. Jinka **commit record** hai → **REDO** list.
3. Jo shuru hue par **commit nahi** (crash time active) → **UNDO** list.
4. Redo forward, Undo backward.

**Example:** log: `(start T1) (start T4) (write T4) (commit T4) (write T1) (checkpoint) (start T2) (write T2) (start T3) (write T3) (commit T3) (write T2)` aur phir **crash**.
- T4 checkpoint se **pehle** commit hua -> ignore (already disk par).
- T1 checkpoint ke waqt active tha aur commit nahi hua -> **UNDO**.
- T2 shuru hua, commit nahi -> **UNDO**.
- T3 commit ho gaya -> **REDO**.
**Redo = {T3}, Undo = {T1, T2}.**

### ARIES (short)
**WAL + Repeating history during redo + Logging changes during undo (CLR)**. 3 phases: **Analysis** (dirty page table, active txns), **Redo** (sab actions repeat), **Undo** (loser transactions).

- **Steal / No-steal**, **Force / No-force**: 
  - **Steal**: uncommitted transaction ke dirty page disk par ja sakte -> **Undo** chahiye.
  - **No-force**: commit par pages disk par force nahi -> **Redo** chahiye.
  - ARIES = **steal + no-force** (best performance, most logging).

## 7. Quick Revision
- 2PL: serializable, **deadlock possible**, cascading possible. Strict 2PL: cascadeless.
- Wait-Die: old waits, young dies. Wound-Wait: old wounds young.
- TO: `TS < W_TS` (read) rollback; `TS < R_TS` (write) rollback.
- TO deadlock-free; 2PL nahi.
- WAL: log pehle. Deferred = redo only; Immediate = undo+redo.
- Checkpoint se recovery chhoti.

### Practice
1. TS(T1)=3 write(Q), R_TS(Q)=7. Result? *(3<7 → rollback)*
2. Kya conservative 2PL deadlock-free hai? *(Haan)*
3. Steal/no-force policy me kya chahiye? *(Undo aur Redo dono)*
