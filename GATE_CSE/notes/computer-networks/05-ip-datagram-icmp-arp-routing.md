# IP Datagram, Fragmentation, ICMP, ARP/DHCP/NAT aur Routing Algorithms
<!-- topics: computer-networks/ip-packet, computer-networks/fragmentation, computer-networks/routing, computer-networks/distance-vector-routing, computer-networks/arp, computer-networks/routing-protocols, computer-networks/network-protocols, computer-networks/icmp -->

## 1. IPv4 Datagram Header

| Field | Size | Kaam |
|---|---|---|
| Version | 4 b | 4 |
| **IHL** | 4 b | Header length (**32-bit words me**; min 5 = 20 B, max 15 = 60 B) |
| ToS/DSCP | 8 b | Quality |
| **Total length** | 16 b | Header + data, **max 65,535 B** |
| **Identification** | 16 b | Fragments same datagram ke |
| **Flags** | 3 b | **DF** (don't fragment), **MF** (more fragments) |
| **Fragment offset** | 13 b | **8-byte units me** |
| **TTL** | 8 b | Har hop par −1; 0 par discard (loops rokta) |
| **Protocol** | 8 b | 6 = TCP, 17 = UDP, 1 = ICMP |
| **Header checksum** | 16 b | Sirf header ka; **har hop par recompute** |
| Source / Dest IP | 32 b each | |
| Options | ≤ 40 B | Record route (max **9** addresses), timestamp |

**Router ke dwara modify hone wale fields:** **TTL, header checksum** (aur fragmentation par length/flags/offset). **Source/Destination address nahi badalta** (NAT ke alawa).

**IP: best-effort, connectionless, unreliable.**

## 2. Fragmentation

**MTU** = link ka max frame payload (Ethernet 1500 B). Bada datagram **fragments** me tootta; **reassembly sirf destination par.**
- **Fragment ka data 8 ke multiple** (last chhodkar). Har fragment me **naya IP header** (copy).
- **Offset = start byte / 8.** **MF = 1** sab par except last. Identification same.

**Worked example:** datagram total **4000 B** (header 20, data 3980), MTU **1500**:
- Max data per fragment = 1500 − 20 = 1480 (8 ka multiple ✓).
- Fragments: **1480 (offset 0, MF 1)**, **1480 (offset 185, MF 1)**, **1020 (offset 370, MF 0)**.
- Total lengths: 1500, 1500, 1040. Total bytes transmitted = 4000 + 2×20 = 4040.

**Agar next link MTU chhota:** fragment ka aur fragmentation (refragmentation). **Fragments ki count = ⌈data / (⌊(MTU − hdr)/8⌋ × 8)⌉.**
**DF = 1** aur MTU se bada ⇒ router drop + **ICMP "fragmentation needed"** (path MTU discovery).
**TCP MSS** = MTU − 40 (IP + TCP headers) taaki fragmentation na ho.
**Fragmentation sirf source par nahi**, **koi bhi router** kar sakta (IPv4); reassembly sirf destination.

## 3. ICMP (Internet Control Message Protocol)
IP ke saath error/diagnostic messages. **Network layer**, IP ke andar encapsulate (protocol 1).
- **Echo request/reply (ping), Destination unreachable, Time exceeded (TTL 0), Redirect, Source quench, Parameter problem.**
- **Traceroute:** TTL = 1, 2, 3, ... ke packets; har router **"Time exceeded"** bhejta ⇒ path pata; last par **"port unreachable"/echo reply**.
- ICMP me port nahi hota.

## 4. ARP, RARP, DHCP, NAT

### ARP (Address Resolution Protocol)
**IP → MAC** (same LAN). **ARP request = broadcast** (FF:FF:...), **ARP reply = unicast**. **ARP cache.** Doosre subnet ke liye **default gateway ka MAC** resolve.
**Proxy ARP.** RARP: MAC → IP (purana; DHCP replace).

### DHCP
Host ko **IP, mask, gateway, DNS** dynamically. **Application layer, UDP (server 67, client 68)**. **DORA:** Discover (broadcast) → Offer → Request → Ack. **Lease time.**

### NAT (Network Address Translation)
Private → ek public IP. **NAT table (private IP:port ↔ public IP:port).** Outgoing me **source IP (aur port) + checksum** badalte. **PAT.** Fayda: address saving, security; nuksan: end-to-end principle todta, peer-to-peer mushkil.

## 5. Routing: overview

**Forwarding** (data plane: packet ko output link) vs **Routing** (control plane: table banana).
- **Static** vs **dynamic**. **Intra-AS (IGP): RIP, OSPF**; **Inter-AS (EGP): BGP**.
- **Routing algorithm classification:** **Distance Vector** (Bellman-Ford), **Link State** (Dijkstra).

## 6. Distance Vector Routing (DVR)

Har router **sirf neighbours** ko **apna poora distance vector** batata (periodically). **Bellman-Ford:**
> **dₓ(y) = min over neighbours v { c(x, v) + d_v(y) }**

**Example:** A–B cost 2, B–C cost 3, A–C cost 10.
- Shuru: A ka DV: B = 2, C = 10. B: A = 2, C = 3.
- B se sunkar A: via B to C = 2 + 3 = **5** < 10 ⇒ **A: C = 5 (next hop B).**
- Converge: A: {B 2, C 5}, B: {A 2, C 3}, C: {A 5, B 3}.

**Convergence & problems:**
- **Count-to-infinity:** link fail par galat purani info circulate; **bad news slow**, good news fast. Ex: A–B–C line, C down: B sunta A ka route via B... cost badhti jaati.
- **Solutions:** **Split horizon** (jis neighbour se route seekha use wapas mat batao), **poison reverse** (wahi par infinity advertise), **hold-down timers**, **max hop count (RIP me 16 = infinity)**, triggered updates.
- **RIP:** DV, **hop count metric, max 15**, updates **har 30 s**, **UDP port 520**. **RIP version 1 classful, v2 classless.**
- **Messages/overhead:** DV me kam memory/computation, **slow convergence**.

## 7. Link State Routing (LSR)

Har router **poori topology ka map** rakhta: har router **apne links ka LSA** **flood** karta (sab ko). Phir **Dijkstra** se shortest path tree.
- **OSPF:** link state, **IP ke upar (protocol 89)**, **areas** (hierarchical, backbone area 0), **cost metric (bandwidth)**, **hello packets**, **DR/BDR**, authentication. **Fast convergence, zyada memory/CPU, no count-to-infinity.**
- **IS-IS** similar.

### DV vs LS
| | Distance Vector | Link State |
|---|---|---|
| Knowledge | Neighbours se sunna | Poora topology |
| Info bheja | Poora DV, neighbours ko | Link costs, **sab ko flood** |
| Algorithm | Bellman-Ford | Dijkstra |
| Convergence | Slow, count-to-infinity | Fast |
| Overhead | Kam CPU/memory | Zyada |
| Protocol | RIP | OSPF |
| Messages | O(N × deg) per... | O(N × E) flood |

## 8. BGP (Border Gateway Protocol)
**Inter-AS**, **path vector** (poora AS path advertise ⇒ loop avoid), **policy-based** routing, **TCP (port 179)** par. eBGP (AS ke beech) vs iBGP. Application layer protocol, **reliable transport par**.

## 9. Hierarchical routing / autonomous systems
Internet **AS** me bata; AS ke andar IGP, beech me BGP ⇒ **scalability**, administrative autonomy.
**Bridges (LAN) spanning tree** alag (L2) — loops avoid.

## 10. Quick Revision
- IHL 32-bit words; total length ≤ 65,535; offset 8-byte units; TTL & checksum har hop change.
- Fragments: data multiple of 8; offset = start/8; reassembly at destination only.
- ICMP: ping/traceroute/unreachable. ARP: broadcast request, unicast reply. DHCP: DORA over UDP.
- DV: Bellman-Ford, RIP (hop, max 15), count-to-infinity (split horizon fix). LS: Dijkstra, OSPF, flooding.
- BGP: path vector, TCP, inter-AS.
- NAT modifies source IP/port.

### Practice
1. 3020 B datagram (20 hdr), MTU 1020: fragments, offsets? *(payload 3000; per frag 1000: 3 frags; offsets 0, 125, 250)*
2. IHL = 6 ⇒ header size? *(24 B)*
3. RIP me infinity? *(16)*
4. Router kaun se fields change karta bina fragmentation ke? *(TTL, header checksum)*
