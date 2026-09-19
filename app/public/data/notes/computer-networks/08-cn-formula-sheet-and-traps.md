# Computer Networks: Formula Sheet, Comparison Tables aur GATE Traps
<!-- topics: computer-networks/sliding-window, computer-networks/subnetting, computer-networks/tcp, computer-networks/csma-cd, computer-networks/routing -->

## 1. Formula Sheet

### Delays / basics
- **Tₜ = L/B**, **Tₚ = d/v**, **a = Tₚ/Tₜ**.
- Store-and-forward N links: **N·Tₜ + ΣTₚ**; P packets pipelined: **(N + P − 1)Tₜ**.
- **BDP = B × RTT.**
- Nyquist **2B log₂L**; Shannon **B log₂(1 + S/N)**.

### Data link
- Hamming: **2ʳ ≥ m + r + 1**. Distance d: detect **d−1**, correct **⌊(d−1)/2⌋**.
- CRC: append r zeros, XOR remainder.
- Stop-and-wait **η = 1/(1+2a)**; sliding **η = W/(1+2a)**; full window **1 + 2a**.
- Seq numbers: GBN **W+1** (window ≤ 2ⁿ−1); SR **2W** (window ≤ 2ⁿ⁻¹).

### MAC / Ethernet
- Pure ALOHA S = Ge^(−2G), max 18.4%; slotted S = Ge^(−G), max 36.8%.
- Slotted N stations: **Np(1−p)^(N−1)**.
- CSMA/CD: **Tₜ ≥ 2Tₚ**, min frame = 2·Tₚ·B; Ethernet min 64 B, MTU 1500.
- CSMA/CD efficiency ≈ 1/(1 + 6.44a).

### IP
- Hosts = 2ʰ − 2; block size = 256 − mask octet; network = IP AND mask; broadcast = network OR ~mask.
- Subnets 2ˢ; VLSM largest first; CIDR aggregation = aligned + contiguous.
- Fragment data multiple of 8; offset = start/8; IHL × 4 = header bytes.
- Forwarding = longest prefix match.

### TCP
- Seq per byte; ack = next byte; SYN/FIN = 1 seq.
- Slow start doubling → ssthresh; then +1/RTT; timeout: ssthresh = cwnd/2, cwnd = 1.
- Window = min(cwnd, rwnd). RTO = Est + 4Dev. Token bucket S = C/(M−r).
- Wrap time = 2ⁿ/rate.

### Application
- HTTP RTT: non-persistent 2/object; persistent 1/object; pipelined all together.
- DNS iterative: root → TLD → authoritative.
- RSA: C = Mᵉ mod n, e·d ≡ 1 mod φ.

## 2. Layer / device / protocol map

| Layer | PDU | Device | Protocols |
|---|---|---|---|
| Application | Message | Gateway | HTTP, FTP, SMTP, DNS, DHCP, SNMP, RIP(UDP), BGP(TCP) |
| Transport | Segment / Datagram | | TCP, UDP |
| Network | Packet | **Router** | IP, ICMP, OSPF, ARP(L2.5) |
| Data link | Frame | **Switch/Bridge** | Ethernet, PPP, HDLC |
| Physical | Bits | **Hub/Repeater** | |

## 3. Comparison Tables

| Pair | Fark |
|---|---|
| Circuit / Packet switching | Reserved path / statistical multiplexing |
| GBN / SR | Receiver window 1, resend window / buffer, resend lost |
| Pure / Slotted ALOHA | 2Tₜ vs Tₜ vulnerable; 18.4% vs 36.8% |
| Hub / Switch / Router | 1 collision / per-port collision / per-port broadcast |
| DV / LS | Bellman-Ford, RIP / Dijkstra, OSPF |
| TCP / UDP | Reliable stream / fast datagram |
| Flow / Congestion control | Receiver / network |
| POP3 / IMAP / SMTP | Download / server-side / push |
| Iterative / Recursive DNS | Referral / full answer |
| HTTP persistent / non-persistent | 1 TCP connection / per object |

## 4. Top 25 Traps
1. Router L3, switch L2, hub L1.
2. PDU names by layer.
3. Tₜ vs Tₚ; units (bits/bytes, ms/µs).
4. Store-and-forward N links, N·Tₜ.
5. a = Tₚ/Tₜ; window 1 + 2a (not 1 + a).
6. GBN window ≤ 2ⁿ − 1; SR ≤ 2ⁿ⁻¹.
7. Hamming distance detect d−1, correct ⌊(d−1)/2⌋.
8. Bit stuffing after 5 ones.
9. Min frame = 2 Tₚ B (round trip).
10. Ethernet 64 B min; padding to 46 B data.
11. Slotted ALOHA max 1/e.
12. Hosts −2 (network + broadcast).
13. Longest prefix match, not first match.
14. Aggregation needs alignment.
15. Fragment data multiple of 8; offset units 8 B.
16. Reassembly only at destination.
17. TTL & checksum change every hop.
18. ARP request broadcast, reply unicast.
19. RIP max 15 (16 = ∞); count-to-infinity DV.
20. TCP seq counts bytes; ack = next expected.
21. SYN/FIN consume seq.
22. Timeout ⇒ cwnd = 1; 3 dup ACK ⇒ cwnd = ssthresh (Reno).
23. Window = min(cwnd, rwnd).
24. DNS uses UDP 53; HTTP stateless; FTP two connections.
25. UDP ⇒ real-time; TCP ⇒ email/file.

## 5. Solving strategy (CN)
1. **Draw timeline** (frames, delays) for data-link/TCP problems.
2. **Units**: bytes vs bits, KB = 1024 vs 1000 (question ka convention).
3. **IP problems**: binary/interesting octet, block sizes table.
4. **Routing**: DV table iteration ya LPM.
5. **Concept statements**: layer/protocol map se elimination.

## 6. Practice order (web app)
Subjects → Computer Networks: **Subnetting → Sliding Window/Stop-and-Wait → TCP/Congestion → CSMA-CD/Ethernet → Routing/DV → IP packet/Fragmentation → Application layer → Error detection/CRC**.
