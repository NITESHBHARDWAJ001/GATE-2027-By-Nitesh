# Transport Layer: UDP, TCP, Flow aur Congestion Control, Sockets
<!-- topics: computer-networks/tcp, computer-networks/udp, computer-networks/congestion-control, computer-networks/token-bucket, computer-networks/sockets, computer-networks/network-flow -->

## 1. Transport layer ka kaam
**Process-to-process (end-to-end)** delivery: **port numbers** (16-bit, 0–65535) se process pehchan. **Socket = (IP, port)**; connection = (src IP, src port, dst IP, dst port). **Multiplexing/demultiplexing.**
Well-known ports (0–1023): HTTP 80, HTTPS 443, FTP 21 (control)/20, SSH 22, Telnet 23, SMTP 25, DNS 53, DHCP 67/68, POP3 110, IMAP 143.

## 2. UDP (User Datagram Protocol)

**Connectionless, unreliable, no flow/congestion control, message boundaries preserved.** Header **8 B**: src port, dst port, length, checksum (optional in IPv4).
- **Use:** DNS, DHCP, streaming/VoIP, gaming, SNMP, TFTP, RIP.
- **Fayda:** low overhead, fast, no handshake. Packets **alag paths** se ja sakte (order no guarantee).
- **Connected UDP socket** (`connect()` par default peer set; **koi handshake nahi**).

## 3. TCP (Transmission Control Protocol)

**Connection-oriented, reliable, in-order, byte-stream, full-duplex, flow + congestion control.** Header **20–60 B**.
- **Sequence number: 32-bit, har BYTE ko number** (segment ko nahi). **ACK number = next expected byte** (cumulative).
- Header fields: ports, **seq, ack, data offset (header length), flags (SYN, ACK, FIN, RST, PSH, URG), window (16-bit rwnd), checksum, urgent ptr**.
- **MSS** = max data per segment (usually MTU − 40 = 1460).
- **TCP guaranteed minimum rate nahi deta**; **message boundaries preserve nahi** (stream).

### Connection establishment: 3-way handshake
```
Client                      Server
 SYN (seq = x)      ─────►
                    ◄───── SYN+ACK (seq = y, ack = x + 1)
 ACK (seq = x+1, ack = y + 1) ─►
```
- **SYN aur FIN ek sequence number consume** karte (data nahi ho to bhi).
- **Initial sequence number (ISN)** random/clock-based (purane duplicates avoid).
- **Handshake loss:** SYN lost ⇒ timeout retransmit; final ACK lost ⇒ server ka SYN+ACK retransmit ya data se resolve.
- **SYN flood attack** (half-open connections).

### Connection termination (4-way)
FIN (client) → ACK; FIN (server) → ACK. **Half-close possible.** Active closer **TIME_WAIT (2 × MSL)** me rukta (duplicate/last ACK). **RST** = abrupt reset.
**Server crash & reboot ke baad client ka data** ⇒ server **RST** bhejta.

### TCP states (short)
LISTEN, SYN_SENT, SYN_RCVD, ESTABLISHED, FIN_WAIT_1/2, CLOSE_WAIT, LAST_ACK, TIME_WAIT, CLOSED.

### Segment numbering example
Client 1000 bytes ka data, ISN = 500: SYN seq 500; data pehla byte **501**; segment 1 (seq 501, 100 B) ⇒ ACK **601**. Sequence agla = 601.

## 4. Reliability: timers aur RTT

**RTO (retransmission timeout)** adaptive:
- **EstimatedRTT = (1 − α)·EstRTT + α·SampleRTT**, α = 1/8.
- **DevRTT = (1 − β)·DevRTT + β·|Sample − Est|**, β = 1/4.
- **RTO = EstRTT + 4·DevRTT.**
**Karn's algorithm:** retransmitted segments ka RTT sample ignore. **Fast retransmit:** **3 duplicate ACKs** par timeout ke bina retransmit. **Selective ACK (SACK)** option supported.
**Timeout fixed nahi hota** (connection ke RTT se adapt).

## 5. Flow Control (TCP)
Receiver **advertised window (rwnd)** batata (buffer free space). **Sender: unacked bytes ≤ min(rwnd, cwnd)**.
- **Window = 0 ⇒ zero window probe** (persist timer). **Silly window syndrome** (Nagle's algorithm, Clark's).
- **Window scale option:** 16-bit window (max 64 KB) ko scale (2¹⁴ tak) ⇒ **BDP > 64 KB** ho to zaroori.
- **Utilization = window / (BDP)** (bytes).

**Example:** bandwidth 100 Mbps, RTT 40 ms: BDP = 500 KB ⇒ 64 KB window se utilization 12.8%.

## 6. Congestion Control (TCP)

**cwnd** (congestion window), **ssthresh**. Effective window = **min(cwnd, rwnd)**.

### Phases
1. **Slow start:** cwnd = 1 MSS; **har ACK par +1 MSS** ⇒ **har RTT me double** (exponential) jab tak **cwnd ≥ ssthresh**.
2. **Congestion avoidance (AIMD):** **har RTT me +1 MSS** (additive increase, linear).
3. **Loss detect:**
   - **Timeout:** **ssthresh = cwnd/2**, **cwnd = 1 MSS**, slow start (TCP Tahoe/Reno dono).
   - **3 duplicate ACKs (Reno fast recovery):** **ssthresh = cwnd/2, cwnd = ssthresh (+3)**, congestion avoidance (Tahoe me cwnd = 1).

**Worked trace:** initial cwnd = 1, ssthresh = 8 (MSS units), timeout at cwnd = 12.
- RTT 1: 1 → 2 → 4 → 8 (slow start, ssthresh tak).
- 8 se: 9, 10, 11, 12 (linear, avoidance).
- Timeout at 12: **ssthresh = 6, cwnd = 1**. Phir 1, 2, 4, 6 (ssthresh), 7, 8...

**Sawtooth pattern** (AIMD). **Congestion window vs receiver window** — jo chhota wahi limit.

**Transmission rounds count:** naye slow-start ke baad cwnd X tak pahunchne ke liye rounds = log₂ (slow start) + (linear steps).

### Congestion control ke general concepts
- **Congestion vs flow control:** flow = receiver ko overwhelm na karo (end-to-end); congestion = network ko (global).
- **Network-assisted:** ECN, RED (Random Early Detection, router).
- **TCP fairness**, **AIMD converges to fair**.

## 7. Token Bucket (traffic shaping, congestion)
Bucket capacity **C tokens (bytes)**, tokens **r rate** se bharte. Packet bhejne ke liye tokens; **burst** allow. **Max burst duration S = C / (M − r)** (M = max output rate, M > r). **Leaky bucket** (constant rate output, burst smoothing).
**Example:** bucket C = 0.5 Mb (500 Kb), r = 2 Mbps, M = 10 Mbps: S = 0.5 / (10 − 2) = **62.5 ms**.

## 8. Socket Programming (API)
**Server:** `socket() → bind() → listen() → accept()` (blocking; naya connected socket) → `read/write`.
**Client:** `socket() → connect()` (**SYN bhejta**) → `read/write`.
- **`listen()`** active socket ko **passive** banata (backlog queue). **`accept()`** established connection deta.
- **UDP:** `socket() → bind()`, `sendto()/recvfrom()` (no connect/accept).

## 9. Wrap-around aur sequence space
32-bit seq (bytes): 2³² = 4 GB. **1 Gbps** (125 MB/s) par wrap ≈ 34 s. **MSL** (max segment lifetime, 2 min typically) se kam ho to **duplicate seq confusion** ⇒ **PAWS (timestamps)**.
**Required seq bits n:** 2ⁿ / rate > MSL ⇒ bytes/s × MSL ≤ 2ⁿ.
**Example:** 10 Gbps? (1.25 GB/s), MSL = 60 s ⇒ 75 GB ⇒ 2ⁿ ≥ 7.5×10¹⁰ ⇒ n = 37 bits.

## 10. TCP vs UDP
| | TCP | UDP |
|---|---|---|
| Connection | Haan (handshake) | Nahi |
| Reliability/order | Haan | Nahi |
| Flow/congestion | Haan | Nahi |
| Header | 20+ B | 8 B |
| Use | HTTP, FTP, SMTP, SSH | DNS, video, VoIP |

**Real-time multimedia = UDP; file transfer, email = TCP.**

## 11. Quick Revision
- Ports 16-bit; well-known < 1024. UDP header 8 B, TCP ≥ 20 B.
- TCP: byte numbering, ack = next byte, SYN/FIN consume 1 seq.
- 3-way: SYN(x) → SYN+ACK(y, x+1) → ACK(y+1).
- Slow start doubling until ssthresh; then +1/RTT; timeout: ssthresh = cwnd/2, cwnd = 1; 3 dup ACK: cwnd = ssthresh.
- Window = min(cwnd, rwnd). Window scale for BDP > 64 KB.
- RTO = Est + 4 Dev. Token bucket S = C/(M−r).
- server: socket, bind, listen, accept; client connect sends SYN.

### Practice
1. SYN seq = 1000: SYN+ACK ack number? *(1001)*
2. cwnd = 20 MSS timeout: ssthresh, cwnd? *(10, 1)*
3. Token bucket C = 8 Mb, r = 1 Mbps, M = 5 Mbps: burst time? *(8/(5−1) = 2 s)*
4. rwnd = 64 KB, BDP = 256 KB: max utilization? *(25%)*
