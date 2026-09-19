# IP Addressing, Subnetting, VLSM, CIDR aur Forwarding
<!-- topics: computer-networks/subnetting, computer-networks/ip-addressing, computer-networks/network-layer -->

## 1. IPv4 Address

**32-bit** logical address, **dotted decimal** (4 octets, har ek 0–255). **Network part + Host part.**

### Classful addressing
| Class | First octet | Leading bits | Default mask | Networks | Hosts/network |
|---|---|---|---|---|---|
| **A** | 0 – 127 | 0 | /8 (255.0.0.0) | 2⁷ (126 usable) | 2²⁴ − 2 |
| **B** | 128 – 191 | 10 | /16 (255.255.0.0) | 2¹⁴ | 2¹⁶ − 2 = 65,534 |
| **C** | 192 – 223 | 110 | /24 (255.255.255.0) | 2²¹ | 2⁸ − 2 = 254 |
| **D** | 224 – 239 | 1110 | - | Multicast | |
| **E** | 240 – 255 | 1111 | - | Reserved | |

**Hosts = 2^h − 2** (**all-0s host = network address**, **all-1s host = broadcast address**).
**Special:** `0.0.0.0` (this host), **`127.x.x.x` loopback**, `255.255.255.255` limited broadcast. **Private ranges:** `10.0.0.0/8`, `172.16.0.0/12` (172.16–172.31), `192.168.0.0/16`. **APIPA 169.254.0.0/16**.

**Class A me networks: 2⁷ − 2 = 126** (0 aur 127 reserved) — question me "usable" ya "total" dekho.

## 2. Subnet Mask aur Network Address

**Mask:** 1s = network (+subnet) bits, 0s = host bits. **/n notation** (n ones).
- **Network address = IP AND mask.**
- **Broadcast address = network OR (NOT mask)** (host bits sab 1).
- **First host = network + 1, last host = broadcast − 1.**
- **Hosts = 2^(32−n) − 2.**

### "Interesting octet" trick
Jis octet me mask 255 aur 0 ke beech ka value ho. **Block size = 256 − mask octet.**

| Mask octet | 128 | 192 | 224 | 240 | 248 | 252 | 254 |
|---|---|---|---|---|---|---|---|
| Block size | 128 | 64 | 32 | 16 | 8 | 4 | 2 |
| Prefix (last octet) | /25 | /26 | /27 | /28 | /29 | /30 | /31 |

**Worked example:** IP **172.16.35.130/20**:
- /20 = 255.255.**240**.0 → interesting octet = 3rd; block = 16.
- 35 ke liye block start: 32 (32–47). **Network = 172.16.32.0**, **broadcast = 172.16.47.255**, hosts = 2¹² − 2 = **4094**, range 172.16.32.1 – 172.16.47.254.

**Example 2:** 192.168.10.75/26 (mask .192, block 64): 75 → 64 block ⇒ **network 192.168.10.64, broadcast 192.168.10.127**, hosts 62.

### Same network check
Do hosts same subnet me tabhi jab **(IP₁ AND mask) = (IP₂ AND mask)**. Alag subnet me to **router/default gateway** chahiye.
**Example:** mask 255.255.255.240; 192.168.1.17 aur 192.168.1.30: block 16 (16–31) ⇒ **same subnet**. 192.168.1.17 aur .33 ⇒ alag.

**Kaunsa address subnet ka host nahi ban sakta:** network address ya broadcast address.

## 3. Subnetting

Ek network ko chhote subnets me todna: **host bits me se kuch bits network me borrow**.
- **Borrowed bits s ⇒ subnets = 2ˢ**; **hosts/subnet = 2^(h−s) − 2**.
- (Purane classful me subnets 2ˢ − 2; modern (CIDR) me **2ˢ** — GATE me question dekho.)

**Example:** 192.168.10.0/24 ko 4 subnets: s = 2 → **/26**, mask 255.255.255.192.
Subnets: 192.168.10.**0**, **64**, **128**, **192** (each /26); hosts = 2⁶ − 2 = **62**.
Subnet 2: network .64, broadcast .127, hosts .65–.126.

**Class B ko subnet (16 subnets):** /16 + 4 bits = **/20**, hosts = 2¹² − 2 = 4094.

**Max subnets/hosts (given mask):** Class C, mask 255.255.255.224: /27 ⇒ **8 subnets, 30 hosts** (classful me 6 subnets).

### Subnet mask kaise nikaalein (requirement se)
- **n subnets chahiye:** s = ⌈log₂ n⌉ bits borrow.
- **k hosts/subnet chahiye:** host bits h = ⌈log₂(k + 2)⌉; prefix = 32 − h.
**Example:** 500 hosts: h = ⌈log₂ 502⌉ = 9 ⇒ **/23**.

## 4. VLSM (Variable Length Subnet Masks)

**Alag subnets ke alag sizes.** Bade requirement wale ko **pehle** allocate karo (alignment).

**Example:** 200.10.0.0/24: subnets ke liye 100, 50, 20 hosts.
- 100 → 7 host bits ⇒ **/25** (128): 200.10.0.0/25 (0–127).
- 50 → /26 (64): 200.10.0.**128**/26 (128–191).
- 20 → /27 (32): 200.10.0.**192**/27 (192–223).
Bacha 224–255 free.

## 5. CIDR (Classless Inter-Domain Routing)

Class boundaries khatam: **a.b.c.d/n**. **Route aggregation (supernetting):** kai prefixes ko ek chhote prefix me.

**Aggregation rule:** prefixes **contiguous aur aligned** ho (block size ke multiple par start).
**Example:** 192.168.0.0/24 + 192.168.1.0/24 ⇒ **192.168.0.0/23**. Par 192.168.1.0/24 + 192.168.2.0/24 ⇒ aggregate nahi (1 aur 2 align nahi) → 192.168.0.0/22 me bhi extra covers.

**Range → prefix:** 192.168.0.0 to 192.168.3.255 = 1024 addresses = **192.168.0.0/22**.
**ISP allocation:** ISP ke paas 245.248.128.0/20 (4096 addresses): half organization A ⇒ /21 (245.248.128.0/21), quarter B ⇒ /22 (245.248.136.0/22)...

**Ek block ka size power of 2, aur start address size ka multiple.**

## 6. Forwarding (Longest Prefix Match)

Router ki forwarding table: **(prefix/mask, next hop, interface)**. Destination ke liye **sabhi matching entries me se sabse lambi prefix (longest match)**. Koi match nahi to **default route 0.0.0.0/0**.

**Example table:**
| Prefix | Interface |
|---|---|
| 128.96.170.0/24 | 0 |
| 128.96.168.0/21 | 1 |
| 128.96.0.0/16 | 2 |
| 0.0.0.0/0 | 3 |

Dest **128.96.170.5**: /24 match ✓ (128.96.170.x), /21 (168–175) ✓, /16 ✓ ⇒ **longest = /24 ⇒ interface 0**.
Dest **128.96.172.9**: /24 ✗ (172 ≠ 170), /21 ✓ (168–175), /16 ✓ ⇒ **interface 1**.
Dest **10.1.1.1** ⇒ default ⇒ **interface 3**.

**Steps:** har entry ke mask se dest AND karo → network id se compare → jitne match, unme longest prefix.

## 7. IPv6 (short)
**128-bit**, hex me 8 groups of 16 bits (`2001:db8::1`, `::` zero compression). **Header fixed 40 B, no fragmentation by routers, no checksum**, **NAT ki zaroorat nahi**. **Address types:** unicast, multicast, **anycast** (broadcast nahi). **Tunneling/dual stack** transition.

## 8. Quick Revision
- Class A/B/C ranges 0–127/128–191/192–223; hosts 2ʰ − 2.
- Network = IP AND mask; broadcast = network OR ~mask.
- Block size = 256 − mask octet.
- Subnets 2ˢ; hosts 2^(h−s) − 2. VLSM: bade pehle.
- CIDR aggregation: aligned + contiguous.
- Forwarding = longest prefix match; default 0.0.0.0/0.
- Private ranges: 10/8, 172.16/12, 192.168/16.

### Practice
1. /27 me usable hosts? *(30)*
2. 10.0.0.0/8 ko 1000 hosts wale subnets me todna: prefix? *(h = 10 ⇒ /22)*
3. 130.50.15.6/17 ka network aur broadcast? *(mask 255.255.128.0; 3rd octet 15 < 128 ⇒ network 130.50.0.0, broadcast 130.50.127.255)*
4. 192.168.4.0/24 aur 192.168.5.0/24 ka aggregate? *(192.168.4.0/23)*
