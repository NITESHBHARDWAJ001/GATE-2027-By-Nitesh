# Data Link Layer: Framing, Error Detection, Stop-and-Wait, Sliding Window
<!-- topics: computer-networks/bit-stuffing, computer-networks/error-detection, computer-networks/crc-polynomial, computer-networks/hamming-code, computer-networks/stop-and-wait, computer-networks/sliding-window, computer-networks/channel-utilization, computer-networks/wrap-around-time -->

## 1. Data Link Layer ke kaam
**Framing, error detection/correction, flow control, access control (MAC).** Ek hi link (hop-to-hop) par reliable frame delivery.

## 2. Framing

Bit stream ko frames me todna.
- **Character count**, **Flag bytes + byte stuffing**, **Flag bits + bit stuffing**, physical layer coding violations.

### Bit Stuffing (HDLC)
Flag = **01111110**. Data me **5 lagatar 1s ke baad sender 0 stuff** karta; receiver **5 ones ke baad 0 hata deta**.
**Example:** data `0111111111 0` me: 011111 **0** 1111 **0**... ek-ek run ke 5 ones ke baad 0.
`01111110` (data me flag jaisa) → `011111010` (stuffed).
**Overhead** data pattern par depend (worst case sab 1s: har 5 par 1 extra ⇒ 20%).
**Byte stuffing:** flag/escape byte se pehle ESC daalo.

## 3. Error Detection aur Correction

### Parity
**Even/odd parity bit.** **Single-bit error detect** (odd number of errors). Even number of errors miss. 2D parity: single-bit correct.

### Checksum (Internet)
16-bit words ka **one's complement sum**, phir complement. Receiver sab (checksum ke saath) add: **all 1s (0xFFFF) ⇒ sahi**. IP/TCP/UDP me.

### CRC (Cyclic Redundancy Check)
Generator polynomial G(x) degree r. Data ke aage **r zeros** append, **mod-2 (XOR) division by G**, **remainder = CRC** (r bits), data ke saath bhejo. Receiver: total ko G se divide, **remainder 0 ⇒ sahi**.

**Example:** data 1001, G = 1011 (x³ + x + 1, r = 3).
- Append 3 zeros: **1001000**.
- Mod-2 division: 1001000 ÷ 1011 → **remainder 110**. (Check: x⁶ + x³ mod (x³+x+1) = x² + x → 110.)
- **Transmitted: 1001110.** Receiver: 1001110 ÷ 1011 → remainder 0.

**CRC ki detection capability:**
- **Sab single-bit errors** (agar G me ≥ 2 terms/ x⁰ term).
- **Burst errors ≤ r bits** sab detect.
- **Odd number of errors** agar G me **(x+1) factor** ho.
- Burst length r+1: probability 1 − 2^(−(r−1)); zyada: 1 − 2^(−r).
**CRC-16, CRC-32 (Ethernet).**
**Frame length = data + r bits** (CRC bits count).

### Hamming Code (error correction)
**Single-bit error correct.** **m data bits, r check bits: 2ʳ ≥ m + r + 1.**
- m = 4 → r = 3 (**7,4 code**). m = 8 → r = 4 (12 bits). m = 11 → r = 4 (15,11).
- **Check bits positions 1, 2, 4, 8, ... (powers of 2).** Parity bit p_i **un positions ko cover karta jinke binary me i-th bit 1 ho**.
- **Syndrome (failed checks ka binary value) = error ki position.**

**Example (7,4):** positions p1 p2 d3 p4 d5 d6 d7; data d3 d5 d6 d7 = 1 0 1 1. Even parity:
- p1 (1,3,5,7): d3⊕d5⊕d7 = 1⊕0⊕1 = 0 → p1 = **0**
- p2 (2,3,6,7): d3⊕d6⊕d7 = 1⊕1⊕1 = 1 → p2 = **1**
- p4 (4,5,6,7): d5⊕d6⊕d7 = 0⊕1⊕1 = 0 → p4 = **0**
Codeword: **0 1 1 0 0 1 1**. Agar position 5 flip ho jaye, syndrome (p4 p2 p1) = 101 = **5** ⇒ position 5 galat.

### Hamming distance
**Do codewords ke differing bits.** Code ka **min distance d**: **d − 1 errors detect**, **⌊(d − 1)/2⌋ errors correct**. (SEC-DED: d = 4.)
Example: codewords 00000, 01011, 10101, 11110: min distance **3** → 2 detect, **1 correct**.

## 4. Flow Control

Sender ko receiver se tez bhejne se roko.

### 4.1 Stop-and-Wait
Ek frame bhejo, ACK ka wait. **Utilization/Efficiency η = Tₜ / (Tₜ + 2Tₚ) = 1/(1 + 2a)**, jahan **a = Tₚ/Tₜ**.
- **Throughput = η × B.**
- Ack ka transmission time ignore ya include (question dekho): total cycle = Tₜ + 2Tₚ + T_ack.
- **Sequence numbers: 1 bit (0/1)** kaafi.
**Timeout** = ≥ RTT. **Loss/error:** timeout par retransmit.
**Error probability p** (frame): expected transmissions = **1/(1 − p)**; **η = (1 − p)/(1 + 2a)**.

**Example:** 1 Mbps, frame 1000 bits (Tₜ = 1 ms), distance 1500 km, v = 2×10⁸ (Tₚ = 7.5 ms) ⇒ a = 7.5. **η = 1/(1 + 15) = 6.25%**, throughput 62.5 kbps.

### 4.2 Sliding Window (pipelining)
Sender **W frames** bina ACK ke bhej sakta.
> **η = W / (1 + 2a)** (agar W < 1 + 2a, warna η = 1).
> **Full utilization ke liye W ≥ 1 + 2a** (yehi minimum window).
Upar ke example me: W = 16 frames.

**Sequence numbers (n bits):**
- **Go-Back-N (GBN):** sender window **W_s ≤ 2ⁿ − 1**; receiver window **1**. Min seq numbers = **W_s + 1**.
- **Selective Repeat (SR):** **W_s = W_r ≤ 2ⁿ⁻¹**; min seq numbers = **W_s + W_r = 2W**.
- **Stop-and-wait** = window 1.

**Bits needed:** GBN: ⌈log₂(W + 1)⌉; SR: ⌈log₂(2W)⌉.
Example: W = 16 ⇒ GBN: 17 numbers → **5 bits**; SR: 32 → **5 bits**. Agar **n = 4 bits**: GBN max window 15, SR max 8.

### Go-Back-N
Receiver **sirf in-order** frame accept (out-of-order discard). **Cumulative ACK.** Ek frame lost/error ⇒ sender **us frame se saare outstanding dobara** bhejta. **Timeout par window restart.**
**Retransmission count (ek frame lost, window W, successful baad):** us frame + uske baad bheje gaye sab (max W).
**Simple, receiver buffer 1; bandwidth waste error me.**

### Selective Repeat
Receiver **out-of-order buffer** karta; **sirf lost frame** dobara. **Individual ACK/NAK.** Efficient par complex, receiver buffer W.

### Comparison
| | Stop-Wait | GBN | SR |
|---|---|---|---|
| Sender window | 1 | ≤ 2ⁿ−1 | ≤ 2ⁿ⁻¹ |
| Receiver window | 1 | 1 | ≤ 2ⁿ⁻¹ |
| Retransmit | 1 | Window | Sirf lost |
| Receiver buffering | No | No | Haan |
| Min seq numbers | 2 | W+1 | 2W |

### Piggybacking
Data frame me hi ACK (reverse traffic).

## 5. Formulas ka use (numerical steps)
1. **Tₜ = L/B, Tₚ = d/v, a = Tₚ/Tₜ.**
2. Window: 1 + 2a; agar diya ho to η = W/(1+2a).
3. Bits: GBN W+1, SR 2W.
4. **Throughput = η × B.**
5. Round trip cycle (no ack transmission) = Tₜ + 2Tₚ.

**Satellite example:** 1 Mbps, 1000-bit frames, one-way delay 270 ms: Tₜ = 1 ms; 1 + 2a = 1 + 540 = **541** frames window for full utilization. Stop-and-wait η = 1/541 ≈ 0.18%.

**Wrap-around time:** k-bit sequence space (bytes numbered) ka wraparound = 2ᵏ / rate. TCP me 32-bit seq, 1 Gbps ⇒ 2³² bytes / 125 MB/s ≈ **34 s** (MSL se kam ho to problem: **window scaling/PAWS/timestamp**).

## 6. Quick Revision
- Bit stuffing: 5 ones ke baad 0. Hamming: 2ʳ ≥ m+r+1; syndrome = error position.
- CRC: append r zeros, remainder XOR; burst ≤ r sab detect.
- Distance d: detect d−1, correct ⌊(d−1)/2⌋.
- Stop-wait η = 1/(1+2a); sliding η = W/(1+2a); full window 1+2a.
- GBN seq numbers W+1 (window ≤ 2ⁿ−1); SR 2W (window ≤ 2ⁿ⁻¹).
- GBN receiver window 1; SR buffering.

### Practice
1. Tₜ = 2 ms, Tₚ = 9 ms: Stop-wait η? *(2/(2+18) = 10%)*
2. Same link, window for 100%? *(1 + 2 × 4.5 = 10)*
3. SR with 3-bit seq: max window? *(4)*
4. m = 11 data bits: check bits? *(4)*
