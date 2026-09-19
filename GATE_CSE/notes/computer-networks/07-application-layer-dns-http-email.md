# Application Layer: DNS, HTTP, Email (SMTP/POP/IMAP), FTP aur Security Basics
<!-- topics: computer-networks/application-layer-protocols, computer-networks/network-protocols -->

## 1. Application Layer ka idea
Network apps (web, mail, file transfer) ke **protocols**. **Client-server** ya **peer-to-peer (P2P)**. Apps **transport services** (TCP/UDP) use karte. **PDU = message.**

## 2. DNS (Domain Name System)

**Hostname → IP address** (phonebook). **Distributed, hierarchical database.** Port **53**, mostly **UDP** (queries), **TCP** (zone transfer, bade responses).

### Hierarchy
```
            . (root)
     ┌──────┼──────┐
    com    org    in   (TLD)
     │
  google  (authoritative)
     │
   www
```
- **Root servers (13 logical)**, **TLD servers** (.com, .in), **Authoritative servers** (org ke apne), **Local DNS resolver (ISP)**.

### Query types
- **Recursive:** resolver poora answer laake deta (client → local resolver recursive).
- **Iterative:** har server **referral (next server)** deta; resolver khud aage puchhta.

### Resolution example (iterative, cache empty)
`www.example.com` ka IP, client → **local resolver**:
1. Resolver → **Root**: "com ke TLD ka?" → referral to **.com TLD**.
2. Resolver → **.com TLD**: "example.com?" → referral to **authoritative NS**.
3. Resolver → **Authoritative**: "www.example.com?" → **IP**.
Total resolver ke queries = **3** (root, TLD, authoritative) + client ka **1** query resolver ko. Client ke paas cache empty aur resolver ke paas cache empty ⇒ **4 messages (queries)**.
**Caching** aur **TTL** se baad ke queries fast. **Hosts file.**

### Resource Records (RR)
| Type | Kaam |
|---|---|
| **A** | Hostname → IPv4 |
| **AAAA** | Hostname → IPv6 |
| **NS** | Domain ka authoritative name server |
| **CNAME** | Alias → canonical name |
| **MX** | Mail server |
| **PTR** | IP → name (reverse) |
| **SOA** | Zone info |

**Zone transfer** primary → secondary (TCP).

## 3. HTTP (HyperText Transfer Protocol)

**Web ka protocol, TCP par (port 80; HTTPS 443).** **Request-response**, **stateless** (server pichhli request yaad nahi rakhta; **cookies** se state).
- **Request:** method (GET, POST, HEAD, PUT, DELETE), URL, version, headers, body. **Response:** status line (200 OK, 301 Moved, **304 Not Modified**, 404 Not Found, 500 Server Error), headers, body.
- **HTTP/1.0 non-persistent:** har object ke liye **naya TCP connection**. **HTTP/1.1 persistent (default) + pipelining.** HTTP/2 multiplexing.

### Response time (RTT counting) — GATE favourite
1 RTT = TCP handshake (SYN, SYN-ACK) + 1 RTT = HTTP request-response.
- **Non-persistent, object ki page me 1 base HTML + n embedded objects:** har object **2 RTT** ⇒ **(n + 1) × 2 RTT** (serial). Parallel connections se kam.
- **Persistent without pipelining:** 1 base: 2 RTT; baaki har object **1 RTT** ⇒ 2 + n RTT.
- **Persistent with pipelining:** 2 + 1 = **3 RTT** (base 2 RTT + saare objects ek RTT).
(Transmission time ignore.)

**Example:** page + 5 objects: non-persistent = 6 × 2 = **12 RTT**; persistent no pipeline = 2 + 5 = **7 RTT**; pipelined = **3 RTT**.

**Conditional GET** (If-Modified-Since → 304), **proxy/web cache**, **cookies**.

## 4. Email

**Components:** User Agent (mail client), **Mail Server**, **SMTP**.
| Protocol | Kaam | Port |
|---|---|---|
| **SMTP** | **Push**: mail bhejna (client → server, server → server) | **25** (587 submission) |
| **POP3** | Mail **download** (server se delete/download); stateless | 110 |
| **IMAP** | Mail **server par rakhe**, folders sync, stateful | 143 |
| **HTTP** | Webmail (Gmail) | |

**Flow:** Alice UA → **SMTP** → Alice ka mail server → **SMTP** → Bob ka mail server → **POP3/IMAP/HTTP** → Bob UA.
**SMTP:** TCP par, **7-bit ASCII** (MIME se binary attachments), **commands:** HELO/EHLO, MAIL FROM, RCPT TO, DATA, QUIT. **SMTP push, POP/IMAP pull.**
**Email bhejne aur receive karne ke liye protocol pair: SMTP, POP3/IMAP.** **DNS MX record** mail server batata.

## 5. FTP, Telnet, SSH
- **FTP:** **TCP**, **do connections:** **control (port 21)** persistent, **data (port 20)** har file transfer ke liye. **Out-of-band** control. **Stateful** (user state). Active vs passive mode.
- **TFTP:** UDP (69). **Telnet** (23): plaintext remote login; **SSH** (22): encrypted.
- **Stateful application protocols:** FTP, Telnet (session). **Stateless:** HTTP, DNS (query).
- **Multiple connections ek client-server pair ke beech:** FTP (control + data), HTTP non-persistent.

## 6. Other protocols
- **DHCP** (UDP 67/68), **SNMP** (161), **NTP** (123), **BitTorrent (P2P)**.
- **Broadcast karne wale:** **DHCP Discover, ARP** (broadcast).
- **P2P:** file distribution time = max(F/u_s, F/d_min, NF/(u_s + Σu_i)) (client-server me NF/u_s).

## 7. Network Security (basic, GATE me kabhi)
- **Confidentiality, integrity, authentication, non-repudiation.**
- **Symmetric key** (DES, AES; ek key) vs **Asymmetric** (RSA; public/private).
- **RSA:** n = p·q, φ = (p−1)(q−1), **e·d ≡ 1 mod φ**, **encrypt C = M^e mod n, decrypt M = C^d mod n**. Digital signature: private key se sign, public se verify.
- **Hash** (MD5, SHA) integrity; **MAC**; **digital certificates (CA)**; **SSL/TLS** (HTTPS); **IPsec**; **firewall** (packet filter, stateful, application gateway); **DoS/DDoS, SYN flood, spoofing, sniffing, man-in-the-middle**.
**RSA example:** p = 3, q = 11, n = 33, φ = 20, e = 3 ⇒ d = 7 (3×7 = 21 ≡ 1 mod 20). M = 4: C = 4³ mod 33 = 64 mod 33 = **31**; decrypt 31⁷ mod 33 = 4.

## 8. Web architecture quick facts
URL = protocol://host:port/path. **Cookie** server-set, client store. **Proxy cache** latency ↓. **CDN**.

## 9. Quick Revision
- DNS: hierarchical, UDP 53, iterative vs recursive; A, NS, CNAME, MX.
- HTTP: TCP 80, stateless; RTT counting: non-persistent 2 RTT/object, persistent 1 RTT, pipelined all together.
- SMTP push (25), POP3 pull (110), IMAP (143). FTP: control 21 + data 20.
- Real DNS (iterative) resolver queries = root, TLD, authoritative.
- RSA: C = Mᵉ mod n; e·d ≡ 1 mod φ.

### Practice
1. Page + 3 objects, non-persistent no parallel: RTTs? *(4 × 2 = 8)*
2. Kaunsa protocol mail server se download karta hai? *(POP3/IMAP)*
3. FTP ke kitne connections? *(2: control + data)*
4. RSA p=5, q=7, e=5: n, φ, d? *(n = 35, φ = 24, d = 5 (5×5=25≡1))*
