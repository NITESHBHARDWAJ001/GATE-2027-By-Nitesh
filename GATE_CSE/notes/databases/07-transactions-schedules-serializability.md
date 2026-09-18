# Transactions, ACID, Schedules, Serializability aur Recoverability
<!-- topics: databases/transaction-and-concurrency, databases/conflict-serializable -->

## 1. Transaction kya hai?

**Transaction** = database operations ka ek **logical unit** jo ya to **poora** hota hai ya **bilkul nahi**.

**Example (bank transfer):** A se B ko ₹50:
```
T: read(A); A = A - 50; write(A);
   read(B); B = B + 50; write(B);
```
Beech me crash hua to A se paise kat gaye par B ko nahi mile -> inconsistent. Isliye ACID.

## 2. ACID Properties

| Property | Meaning | Kaun ensure karta |
|---|---|---|
| **Atomicity** | All or nothing | **Recovery manager** (undo/rollback, log) |
| **Consistency** | Transaction DB ko ek consistent state se dusri consistent state me le jaaye (**sum A+B constant** jaisa) | **Programmer + integrity constraints** |
| **Isolation** | Concurrent transactions ek doosre se alag lagein | **Concurrency control manager** |
| **Durability** | Commit ke baad effect **crash me bhi** rahe | **Recovery manager** (redo/log on disk) |

> GATE: "sum constant rehna" = **Consistency**. "Commit ke baad system crash" = **Durability**. Deadlock-freedom ACID ka hissa **nahi**.

## 3. Transaction states
Active -> Partially committed -> **Committed**; Active/Partially committed -> Failed -> **Aborted** (rollback; restart ya kill).

## 4. Concurrency ki problems (anomalies)

| Problem | Meaning | Example |
|---|---|---|
| **Lost update (W–W)** | Do transactions ke updates me se ek overwrite | T1 aur T2 dono `A=A+1` |
| **Dirty read (W–R)** | Uncommitted data padhna | T1 write, T2 read, T1 rollback |
| **Non-repeatable read (R–W)** | Ek hi query do baar alag value | T1 read A, T2 update/commit, T1 phir read |
| **Phantom read** | Naye rows dikhne lage (range query) | T1 `WHERE v>1000` 5 rows, T2 insert row (1500), T1 phir query 6 rows |

**Isolation levels (SQL):** Read Uncommitted (dirty ok), Read Committed (dirty nahi), Repeatable Read (non-repeatable nahi), **Serializable** (phantom bhi nahi).

## 5. Schedule

**Schedule** = kai transactions ke operations ka **interleaved order** (har transaction ke andar ka order same).
- **Serial schedule**: ek transaction poora, phir doosra. `n` transactions ke **n! serial schedules**.
- **Number of interleavings** (T1 ke m ops, T2 ke n ops): **C(m+n, m)**.

## 6. Serializability

Concurrent schedule **serializable** = kisi serial schedule ke **equivalent** (same result).

### Conflict Serializability (sabse important)
**Conflicting operations:** alag transactions, **same data item**, kam se kam **ek write**.
`R–W`, `W–R`, `W–W` conflict; **`R–R` conflict nahi**.

**Test — Precedence (Serialization) graph:**
- Node = transactions.
- Edge `Ti → Tj` jab Ti ka koi op Tj ke conflicting op se **pehle** ho.
- **Graph acyclic** ⟺ **conflict serializable**. Topological order = equivalent serial order.

**Worked example 1**
```
T1: R(A)          W(A)
T2:      R(A) W(A)
```
Schedule: R1(A) R2(A) W2(A) W1(A).
- R1(A)→W2(A): T1→T2. R2(A)→W1(A): T2→T1. **Cycle ⇒ NOT conflict serializable.**

**Worked example 2**
S: R1(X) W1(X) R2(X) W2(X) R1(Y) W1(Y) 
- X par: T1 ke ops pehle: T1→T2. Y par sirf T1. Graph: T1→T2 acyclic ⇒ **serializable**, equivalent serial = T1, T2.

**Tip:** har data item ke liye alag alag operations ki list banao, phir edges.

### View Serializability
Schedule S view-equivalent to serial S' agar: (1) same **initial reads**, (2) same **read-from (WR) relations**, (3) same **final writes**. **Conflict serializable ⊂ View serializable** (view zyada bada; **blind writes** ke saath schedules view serializable ho sakte hain par conflict nahi). View serializability test **NP-complete**.

**Hierarchy:** Serial ⊂ Conflict serializable ⊂ View serializable ⊂ All schedules.

## 7. Recoverability

Serializable hone se **safe from crash** hona guarantee nahi. Recoverability alag concept.

| Type | Condition |
|---|---|
| **Recoverable** | Agar Tj ne Ti ka likha (dirty) data padha, to **Tj Ti ke commit ke baad commit** kare |
| **Cascadeless (ACA)** | Sirf **committed** data padho (no dirty read) ⇒ cascading rollback nahi |
| **Strict** | Committed hone tak na **read** na **write** (uncommitted data par) |

**Strict ⊂ Cascadeless ⊂ Recoverable.** Recoverable ho to **cascading rollback** possible; cascadeless me nahi.

**Example (non-recoverable):** W1(A) R2(A) **C2** C1. T2 ne dirty read kiya aur T1 se pehle commit -> T1 abort hua to T2 undo nahi ho sakta ⇒ **irrecoverable**.

**Cascading rollback:** T1 abort -> T2 (jisne T1 ka dirty data padha) bhi rollback -> T3... 

> **Trap:** "serializable" aur "recoverable" independent hain: ek schedule serializable ho par recoverable na ho (aur ulta).

## 8. Kya kaunsa protocol de?

| Protocol | Conflict serializable | Deadlock-free | Cascadeless/Recoverable |
|---|---|---|---|
| **2PL** | Haan | **Nahi** | Cascading rollback ho sakti |
| **Strict 2PL** | Haan | Nahi | **Strict** (recoverable + ACA) |
| **Rigorous 2PL** | Haan | Nahi | Strict; serial order = commit order |
| **Timestamp ordering** | Haan | **Haan** | Recoverable guarantee nahi (basic) |

## 9. Kuch numericals
1. T1 ke 4 ops, T2 ke 3 ops: total interleavings? **C(7,3) = 35**.
2. 3 transactions: serial schedules? **3! = 6**.
3. Conflict pairs: T1: R(A) W(B); T2: W(A) R(B). Edges? R1(A)→W2(A): T1→T2; W1(B)→R2(B): T1→T2. **Acyclic**, T1 → T2.

## 10. Quick Revision
- ACID: A=recovery, C=programmer, I=concurrency control, D=recovery.
- Conflict = different Tx, same item, ≥1 write. **R–R conflict nahi**.
- Precedence graph acyclic ⟺ conflict serializable.
- Strict ⊂ ACA ⊂ Recoverable.
- Conflict serializable ⊂ view serializable.
- Serializability aur recoverability alag.

### Practice
1. S: W1(A) R2(A) W2(B) C2 C1: recoverable? *(Nahi, T2 ne dirty read karke pehle commit kiya)*
2. R1(A) W2(A) R1(A): conflict serializable? *(R1→W2 (T1→T2), W2→R1 (T2→T1): cycle, nahi)*
3. Deadlock-free + conflict serializable protocol? *(Timestamp ordering)*
