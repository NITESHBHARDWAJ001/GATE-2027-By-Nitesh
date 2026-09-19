# MAC Layer: ALOHA, CSMA/CD, Ethernet, Bridges/Switches, Wireless
<!-- topics: computer-networks/csma-cd, computer-networks/ethernet, computer-networks/pure-aloha, computer-networks/slotted-aloha, computer-networks/mac-protocol, computer-networks/lan-technologies, computer-networks/bridges -->

## 1. Multiple Access (shared medium)

Ek hi channel kai nodes share karein to **collision** ho sakti. **MAC protocols** decide karte kaun kab bheje.

| Category | Protocols |
|---|---|
| **Random access** | ALOHA, Slotted ALOHA, CSMA, CSMA/CD, CSMA/CA |
| **Controlled access** | Polling, Token passing, Reservation |
| **Channelization** | TDMA, FDMA, CDMA |

## 2. ALOHA

### Pure ALOHA
Jab frame ready bhej do. Collision ho to random wait phir retry.
- **Vulnerable time = 2 Tₜ** (frame time ka double).
- **Throughput S = G e^(−2G)**; **max S = 1/(2e) ≈ 0.184 (18.4%) at G = 0.5.**

### Slotted ALOHA
Time slots (frame time ke barabar); **slot ke shuru par hi bhejo.**
- **Vulnerable time = Tₜ.**
- **S = G e^(−G)**; **max = 1/e ≈ 0.368 (36.8%) at G = 1.**
(G = frames generated per frame time, S = successful.)

**N stations slotted, har ek probability p se transmit:** **P(kisi ek ki success) = N p (1 − p)^(N−1)**; **max at p = 1/N**: ≈ 1/e for large N.
**Ek specific station ki success = p(1 − p)^(N−1).**

## 3. CSMA (Carrier Sense Multiple Access)
Bhejne se pehle **channel sun'ne** (sense). Idle ho to bhejo. Collision ab bhi ho sakti (propagation delay).
- **1-persistent, non-persistent, p-persistent.**

## 4. CSMA/CD (Ethernet wired)

**Collision Detection:** bhejte waqt bhi channel sun'ne; collision mile to **jam signal** bhejkar ruk jao, **binary exponential backoff.**

### Minimum frame size (sabse zyada poochha)
Sender ko **collision detect karne ke liye frame ka transmission poora hone tak** wait karna padta. Worst case: signal door tak jaake collision wapas aaye = **round trip 2Tₚ**.
> **Tₜ ≥ 2Tₚ ⟹ Min frame size L ≥ 2 × Tₚ × B = 2 × (d / v) × B**

**Example:** 10 Mbps, d = 2.5 km? Tₚ = 2500 / (2×10⁸) = 12.5 µs; 2Tₚ = 25 µs; L = 25 µs × 10⁷ = **250 bits** (real Ethernet: 51.2 µs slot time = 512 bits = 64 B, jam aur repeaters shamil).
**Example:** 1 Gbps, 1 km-type LAN me min frame lambi hoti jaati: Tₚ = 5 µs, L = 2 × 5µs × 10⁹ = 10,000 bits.
**Bandwidth badhane par min frame size badhta (ya cable length ghatti).**
**Max cable length** = (Tₜ × v) / 2 = (L/B) × v / 2.

### Binary Exponential Backoff
n-th collision ke baad wait = **K × slot time**, K ∈ {0, …, 2ⁿ − 1} random (max 1023 after 10). 16 attempts baad fail.
**Do stations A, B collide; A jeeta:** next round me A ke jeetne ki probability zyada ("capture effect").

### CSMA/CD efficiency
**Efficiency ≈ 1 / (1 + 6.44a)**, a = Tₚ/Tₜ. **Sabse achha jab a chhota** (chhoti distance, badi frames).
Ethernet me **CSMA/CD sirf half-duplex/hub**; **switched full-duplex me collision nahi**.

## 5. Ethernet (IEEE 802.3)

**Frame format:**
| Preamble 7B | SFD 1B | Dest MAC 6B | Src MAC 6B | Type/Length 2B | Data 46–1500 B | FCS (CRC-32) 4B |

- **MAC address 48-bit (6 bytes)**, hex me (first 3 bytes OUI). **Broadcast: FF:FF:FF:FF:FF:FF.**
- **Min frame = 64 B** (header 14 + data 46 + CRC 4), **max = 1518 B**; **MTU = 1500 B** (payload). Padding agar data < 46.
- **Ethernet frame me CRC (checksum) hota hai; IP header me alag header checksum.** (Dono me checksum field: "Both Ethernet frame and IP packet include checksum" ✓.)
- **Fast Ethernet 100 Mbps, Gigabit 1000 Mbps** (min frame same 64 B par carrier extension/ shorter cable).
- **Ethernet unreliable (no ACK/retransmit at DL)**, connectionless.

## 6. Hubs, Bridges, Switches

| | Hub | Bridge/Switch | Router |
|---|---|---|---|
| Layer | 1 | 2 | 3 |
| Collision domain | 1 (sab) | **Har port alag** | Har port |
| Broadcast domain | 1 | **1 (sab ports)** | **Har port alag** |
| Address | - | **MAC** | IP |

### Learning Bridge/Switch (transparent bridge)
- **Source MAC address** dekhkar **forwarding table (MAC → port)** seekhta.
- **Destination known** ⇒ sirf us port par forward. **Unknown/broadcast** ⇒ **flood** (source port chhodkar).
- **Filtering** same-port traffic.
- **Store-and-forward** vs **cut-through**.
- **Spanning Tree Protocol (STP)**: redundant bridges ke **loops** hataata (broadcast storm rokta): root bridge election (lowest ID), root ports, designated ports, baaki ports block.
- **VLAN**: ek physical switch ko logical broadcast domains me todna.

**Bridge vs router:** dono forward karte par bridge **MAC aur transparent**, router **IP aur explicit gateway**; bridge broadcast **forward** karta.

**Switch table example:** Host A → port 1 par frame aaya (src A) ⇒ table: A → 1. B → port 2 par frame aaya ⇒ B → 2. Ab A→B frame: port 2 par jaayega.

## 7. Wireless: CSMA/CA (802.11)
Collision detect wireless me mushkil (hidden terminal) ⇒ **Collision Avoidance:** DIFS wait, random backoff, **ACK**, optionally **RTS/CTS** (hidden terminal). **Hidden terminal** (A, C ko ek doosre ka pata nahi, B beech me), **exposed terminal**.

## 8. Controlled access
- **Polling:** master baari-baari poll. Efficiency = data / (data + poll overhead).
- **Token ring (IEEE 802.5):** token rotate; **efficiency = 1/(1 + a/N)** (release after transmission), N stations.
- **TDMA:** fixed slots. **Token bus.**

## 9. Numerical patterns
1. **Min frame size / max cable length** (CSMA/CD): Tₜ = 2Tₚ.
2. **Slotted ALOHA: success probability**, throughput max.
3. **Channel utilization** with polling/token.
4. **Bridge learning table** outputs.
5. **Collision/broadcast domain count** (hubs, switches, routers).

**Domain count example:** 1 router, 2 switches, 5 hubs...: **broadcast domains = router ke ports ki sankhya**; **collision domains = switch/router ports + hub-groups**.

## 10. Quick Revision
- Pure ALOHA max 18.4% (vulnerable 2Tₜ); slotted 36.8% (Tₜ).
- CSMA/CD: Tₜ ≥ 2Tₚ; min frame = 2Tₚ B; Ethernet 64 B min, 1500 MTU.
- Switch: har port collision domain; router: broadcast domain.
- Bridge learns from source MAC; unknown ⇒ flood; STP kills loops.
- CSMA/CA wireless (RTS/CTS, ACK).
- Frame CRC-32; MAC 48-bit.

### Practice
1. 10 Mbps, Tₚ = 25.6 µs (one-way): min frame? *(2×25.6µs×10⁷ = 512 bits)*
2. Slotted ALOHA, N = 4, p = 0.25: P(success in slot)? *(4×0.25×0.75³ = 0.42)*
3. 8-port switch + hubs: collision domains ≥? *(8 ports ⇒ 8 domains)*
4. Ethernet data field 30 B: padded to? *(46 B)*
