# Networks Basics: Layers, Switching, Delays aur Bandwidth
<!-- topics: computer-networks/network-layer, computer-networks/osi-model, computer-networks/network-switching, computer-networks/communication, computer-networks/data-communication -->

## 1. Network kya hai?

Devices (hosts, routers, switches) ka group jo **links** se jude aur data share karein. Types: **LAN, MAN, WAN**; topology: bus, star, ring, mesh.

## 2. Layered Architecture

Kaam ko **layers** me baanto: har layer sirf neeche wali layer ki service use karti aur upar wali ko deti hai. **Encapsulation:** har layer apna **header** lagati (data → segment → packet → frame → bits).

### OSI (7 layers) vs TCP/IP (4/5 layers)

| # | OSI Layer | **PDU** | Kaam | Devices/Protocols |
|---|---|---|---|---|
| 7 | **Application** | Message/Data | User services | HTTP, FTP, SMTP, DNS |
| 6 | **Presentation** | Data | Encryption, compression, format | SSL, JPEG |
| 5 | **Session** | Data | Dialog/sync | |
| 4 | **Transport** | **Segment** (TCP)/ **Datagram** (UDP) | End-to-end, reliability, flow/congestion, ports | TCP, UDP |
| 3 | **Network** | **Packet** | Logical addressing, **routing** | IP, ICMP, **Router** |
| 2 | **Data Link** | **Frame** | Framing, MAC, error detect, **hop-to-hop** | Ethernet, **Switch, Bridge** |
| 1 | **Physical** | **Bits** | Signal transmission | Hub, repeater, cables |

**TCP/IP:** Application (5,6,7 merged) → Transport → Internet (IP) → Link (data link + physical).

**Yaad:** "**Please Do Not Throw Sausage Pizza Away**" (Physical…Application).

**Key points:**
- **Application layer ka PDU = message.** **Router = network layer, switch/bridge = data link, hub = physical.**
- **Data link hop-to-hop; network layer host-to-host (logical); transport process-to-process (end-to-end).**
- **Transport protocol ko network protocol ke upar jo extra karna padta:** packet-loss recovery, in-order delivery, flow control (network layer sirf best-effort).
- **Protocols ki layer:** ARP (network/link), ICMP (network), DHCP (application), DNS (application), RIP (application, UDP), OSPF (network, IP), BGP (application, TCP).

## 3. Switching

| | **Circuit Switching** | **Packet Switching** |
|---|---|---|
| Path | Pehle **setup**, dedicated | Har packet alag route ho sakta |
| Bandwidth | Reserved (waste) | **Statistical multiplexing** (better utilization) |
| Delay | Setup delay, phir constant | Queuing delay, variable |
| Failure | Call drop | Reroute |
| Example | Telephone | Internet |

**Packet switching:** **datagram** (connectionless, har packet independent, IP) vs **virtual circuit** (connection-oriented, path fixed, ATM/Frame relay).
**Message switching.**

## 4. Delays (numericals ka base)

Ek packet ka **end-to-end delay** = **transmission + propagation + queuing + processing** (per hop).

- **Transmission delay Tₜ = L / B** (L = packet size bits, B = bandwidth bits/s). Packet ko link par **dhakelne** ka time.
- **Propagation delay Tₚ = d / v** (d = distance, v = signal speed ≈ 2×10⁸ m/s copper/fibre, 3×10⁸ vacuum).
- **Queuing**: router queue me wait. **Processing**: header check.

**Example:** L = 1000 B = 8000 bits, B = 1 Mbps → Tₜ = 8 ms. d = 2000 km, v = 2×10⁸ → Tₚ = 10 ms. Ek link total = 18 ms.

### Store-and-forward
Router **poora packet receive** karke hi forward karta. **N links** (N−1 routers) ke path par **ek packet: N × Tₜ + Σ Tₚ**.
**Example:** 3 links, packet L, rate R, prop negligible: **3L/R**.
**Multiple packets pipelining:** **P packets** (N links): **(N + P − 1) × Tₜ** (+ Σ Tₚ).
**Example:** file 1 MB, packet 1 KB (1000 packets), 2 links (1 router), 1 Mbps: Tₜ per packet = 8 ms; total = (2 + 1000 − 1) × 8 ms ≈ 8.008 s.

**Segmentation ka fayda:** poora message ek packet me bheje to N × (M/R); chhote packets se **pipeline**, delay ↓.

### Bandwidth-Delay Product (BDP)
**BDP = Bandwidth × RTT (ya one-way)** = link me ek waqt par **bits in flight**. Window size ≥ BDP ⇒ full utilization.
**Example:** 100 Mbps, RTT 40 ms: BDP = 10⁸ × 0.04 = 4×10⁶ bits = **500 KB**.

### Throughput vs Bandwidth
**Bandwidth** = capacity (max). **Throughput** = actual rate. **Bottleneck link** = path me minimum rate.
**Efficiency/utilization** = useful / total.

## 5. Transmission media aur physical layer (short)
- **Guided:** twisted pair (UTP/STP), coaxial, **fibre (highest bandwidth, no EMI)**. **Unguided:** radio, microwave, satellite (delay large), infrared.
- **Nyquist (noiseless):** Max bit rate = **2 B log₂ L** (B = bandwidth Hz, L = signal levels).
- **Shannon (noisy):** Capacity = **B log₂(1 + S/N)**. (S/N ratio; dB = 10 log₁₀(S/N).)
- **Modulation:** ASK, FSK, PSK, QAM. **Encoding:** NRZ, **Manchester (self-clocking, ek transition har bit; baud rate = 2×bit rate)**, differential Manchester. **Baud rate** = signal changes/s; **bit rate = baud × bits per symbol**.
- **Multiplexing:** **FDM** (frequency), **TDM** (synchronous/statistical), **WDM** (fibre), CDMA.
- **Hub** = multi-port repeater, sab ports par broadcast (collision domain ek); **repeater** signal regenerate.

**Example (Nyquist):** 3 kHz channel, 4 levels: 2 × 3000 × log₂4 = **12 kbps**.
**Example (Shannon):** 3000 Hz, S/N = 1023 (30 dB): C = 3000 × log₂1024 = **30 kbps**.

## 6. Network devices summary
| Device | Layer | Domain |
|---|---|---|
| Repeater/Hub | 1 | ek collision + ek broadcast domain |
| Bridge/Switch | 2 | **Har port = alag collision domain**, ek broadcast domain |
| Router | 3 | **Broadcast domain todta** |
| Gateway | 4-7 | Protocol conversion |

## 7. Quick Revision
- PDU: bits, frame, packet, segment, message.
- Router L3, switch/bridge L2, hub L1.
- Tₜ = L/B; Tₚ = d/v; store-and-forward N·Tₜ; pipelined (N+P−1)Tₜ.
- BDP = B × RTT.
- Nyquist 2B log₂L; Shannon B log₂(1+S/N).
- Switch: collision domain per port; router: broadcast domain boundary.
- Packet switching = statistical multiplexing.

### Practice
1. 10,000 bits, 2 Mbps, 3 links (store-and-forward, prop 0): delay? *(3 × 5 ms = 15 ms)*
2. 1 Gbps, RTT 10 ms: BDP? *(10⁷ bits = 1.25 MB)*
3. Router kis layer ka? *(Network)*
4. Shannon: 4 kHz, S/N = 15: capacity? *(4000 × log₂16 = 16 kbps)*
