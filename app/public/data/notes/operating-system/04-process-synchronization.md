# Process Synchronization: Critical Section, Semaphores, Classic Problems
<!-- topics: operating-system/process-synchronization, operating-system/semaphore, operating-system/precedence-graph -->

## 1. Problem kya hai?

Jab do ya zyada processes/threads **shared data** ko ek saath badalte hain aur final result **kis order me chale us par depend** kare, use **race condition** kehte hain.

**Example:** `counter = 5`. P1 `counter++`, P2 `counter--`. Assembly me:
```
counter++ : R1 = counter; R1 = R1 + 1; counter = R1
counter-- : R2 = counter; R2 = R2 - 1; counter = R2
```
Interleaving: R1=5, R1=6, R2=5, R2=4, counter=6, counter=4 -> final **4** (sahi 5 tha). Isliye synchronization.

## 2. Critical Section (CS)

Code ka wo hissa jo shared resource use karta hai. Structure:

```
do {
   [entry section]      // permission lo
      CRITICAL SECTION
   [exit section]       // chhodo
      remainder section
} while (true);
```

**CS solution ki 3 shartein (GATE me har saal):**
1. **Mutual Exclusion**: ek time par sirf ek process CS me.
2. **Progress**: agar CS khali hai aur koi process CS me jaana chahta hai, to decision me **sirf wahi processes** shamil honge jo remainder section me nahi hain, aur decision **indefinitely postpone nahi** hoga.
3. **Bounded Waiting**: koi process CS ke liye request karne ke baad **limited baar** hi doosron ko aage jaane dega (starvation nahi).

(Kabhi kabhi 4th: **no assumption about relative speeds / number of CPUs**.)

## 3. Software solutions (2 processes)

### (a) Strict alternation (turn variable)
```
while (turn != i);   // busy wait
CS
turn = j;
```
ME satisfy, **Progress violate** (P0 remainder me atka to P1 CS me nahi ja sakta). Bounded waiting bhi tootata hai.

### (b) Flag variable (interested)
```
flag[i] = true; while (flag[j]);  CS  flag[i] = false;
```
ME satisfy, par dono flag true kar den to **deadlock** (Progress fail).

### (c) Peterson's Solution (ME + Progress + Bounded Waiting: teeno)
```
flag[i] = true;
turn = j;                      // "pehle tu ja"
while (flag[j] && turn == j);  // wait
   CS
flag[i] = false;
```
Idea: dono interested hon to `turn` jise last set hua wo intezar karega. Sirf **2 processes**. Modern hardware me reordering ke wajah se memory barrier chahiye.

### (d) Dekker's, Lamport's Bakery (n processes)
Bakery: token number lo, chhota number pehle, tie me process-id.

## 4. Hardware support

### Test-and-Set (TSL)
```
boolean TestAndSet(boolean *lock) { boolean old = *lock; *lock = true; return old; }   // ATOMIC
while (TestAndSet(&lock));  CS  lock = false;
```
ME + progress, par **bounded waiting nahi** (same process baar baar jeet sakta hai). **Busy waiting (spinlock)**.

### Swap / Compare-and-Swap
Atomically compare aur swap; lock-free algorithms ka base.

**Spinlock ka fayda:** context switch nahi (short CS ke liye achha, multiprocessor). **Nuksan:** CPU waste.

## 5. Semaphores

Semaphore = integer `S` jise sirf 2 **atomic** operations se badalte hain:

```
wait(S)   / P(S):  S = S - 1;  if (S < 0) block(process);
signal(S) / V(S):  S = S + 1;  if (S <= 0) wakeup(one blocked process);
```
(Blocking implementation me S negative ho sakta hai: |S| = blocked processes ki sankhya.)

- **Binary semaphore (mutex)**: 0/1. Mutual exclusion ke liye init 1.
- **Counting semaphore**: init = resource instances ki sankhya.

**Final value formula:** `S_final = S_init − (#wait complete) + (#signal)`. (Jo wait block hue unhe count karte hain; signal unhe wapas nikaalta hai.)

**Example:** S = 10; 6 P aur 4 V complete -> **10 − 6 + 4 = 8**. Agar 12 P aur 5 V (S initially 10): pehle 10 P chal gaye (S=0), 11th block (S=−1), 12th block (S=−2); 5 V: S = −2 + 5 = **3** (dono blocked jaag gaye).

### Semaphore usage patterns
1. **Mutual exclusion**: `mutex=1;  wait(mutex); CS; signal(mutex);`
2. **Ordering / signalling**: statement A (P1) pehle, B (P2) baad me: `sem=0; P1: A; signal(sem);  P2: wait(sem); B;`
3. **Resource counting**: `S = N`.

### Deadlock with semaphores
```
P1: wait(A); wait(B); ...        P2: wait(B); wait(A); ...
```
Dono ek ek le lein -> **circular wait**. Fix: dono **same order** me lein.

### Semaphore galtiyaan
- `signal` pehle, `wait` baad me -> mutual exclusion toot.
- Dono `wait` (mutex par) -> deadlock.
- Kisi ek `wait` ya `signal` ka bhool jaana.

## 6. Classic Problems

### 6.1 Producer-Consumer (Bounded Buffer)
`n` slots ka buffer. Semaphores: `mutex = 1`, `empty = n`, `full = 0`.
```
Producer:                 Consumer:
 produce item              wait(full)
 wait(empty)               wait(mutex)
 wait(mutex)               remove item
 add item                  signal(mutex)
 signal(mutex)             signal(empty)
 signal(full)              consume item
```
> **Trap:** `wait(mutex)` ko `wait(empty)` se **pehle** rakhne se **deadlock** (producer mutex leke empty par atka, consumer mutex nahi le sakta).

### 6.2 Readers-Writers
Kai readers ek saath, writer akela. 
- **First R-W problem (readers preference)**: reader kabhi wait nahi karega jab tak writer CS me na ho -> **writer starve** ho sakta hai.
- **Second (writers preference)**: writer wait kar raha ho to naye reader ruke -> reader starve.
```
Reader:                          Writer:
 wait(mutex); rc++;               wait(wrt);
 if (rc==1) wait(wrt);            write
 signal(mutex);                   signal(wrt);
 read
 wait(mutex); rc--;
 if (rc==0) signal(wrt);
 signal(mutex);
```
Semaphores: `mutex=1, wrt=1, rc=0`.

### 6.3 Dining Philosophers (5 philosophers, 5 chopsticks)
Har philosopher ko dono chopsticks chahiye. Naive: `wait(left); wait(right)` -> sabne left utha liya -> **deadlock**. Solutions:
- Max **4** philosophers ko table par baithne do.
- Ek philosopher ka order ulta (**asymmetric**: odd left-pehle, even right-pehle).
- Dono chopsticks **ek saath** ya bilkul nahi (critical section ke andar check).
- Monitor.

### 6.4 Sleeping Barber, Cigarette smokers (concept)

## 7. Monitors
High-level construct: ek time par monitor ke andar **sirf ek process active**. **Condition variables** `x.wait()` (block, monitor chhodta hai) aur `x.signal()` (ek waiter ko jagao; agar koi waiter nahi to **lost**, semaphore ke `signal` se alag jo yaad rakhta hai).

## 8. Precedence graph aur parbegin/parend
Concurrent statements me dependency graph (u -> v: u pehle). **Parbegin/parend** sirf **series-parallel** graphs express kar sakta hai; general DAG ke liye semaphores.
```
S1; parbegin S2; S3; parend; S4;
```
= S1 -> {S2, S3 parallel} -> S4.

## 9. GATE approach: semaphore code ka output nikaalna
1. Sab semaphores ki initial values likho.
2. Har process ka `wait/signal` sequence likho.
3. Kaunsa process pehle chal sakta hai (wait ka result ≥ 0?) dekho.
4. Possible output orders / deadlock enumerate karo.

**Example:** `S=1, T=0`. P1: `wait(S); print A; signal(T);`  P2: `wait(T); print B; signal(S);` Dono loop me. Output: **A B A B ...** (strict alternation).

## 10. Quick Revision
- CS ki 3 conditions: **ME, Progress, Bounded Waiting**.
- Peterson: teeno satisfy (2 process). TSL: bounded waiting nahi.
- Semaphore final value = init − waits + signals.
- Producer-consumer me `mutex` ko **andar** rakho.
- Dining philosophers naive = deadlock.
- Spinlock = busy waiting; semaphore (blocking) = sleep.

### Practice
1. `S=1`; P1: `wait(S)`; P2: `wait(S)`; koi signal nahi. P2 ka kya hoga? *(Block.)*
2. Counting semaphore 3, 5 `wait` aur 2 `signal`. Final value? *(3 − 5 + 2 = 0)*.
3. Peterson me `turn` set karne se pehle `flag` set kyun karte hain? *(Interest declare pehle; warna dono CS me ghus sakte hain.)*
