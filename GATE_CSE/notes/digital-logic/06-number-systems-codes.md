# Number Systems, Complements, Codes aur Representation (Digital Logic view)
<!-- topics: digital-logic/number-representation, digital-logic/number-system, digital-logic/binary-codes, digital-logic/fixed-point-representation, digital-logic/floating-point-representation, digital-logic/ieee-representation, digital-logic/little-endian-big-endian -->

> **Note:** IEEE 754, Booth's multiplication aur overflow ka detail **COA notes → "Number Representation & Arithmetic"** me hai. Yahan digital logic ke hisaab se base conversion, complements, codes aur counting formulas.

## 1. Positional number systems

Value = Σ (digit × baseⁱ). **Base r:** digits 0 … r−1.
| System | Base | Digits |
|---|---|---|
| Binary | 2 | 0,1 |
| Octal | 8 | 0–7 |
| Decimal | 10 | 0–9 |
| Hex | 16 | 0–9, A–F |

### Conversions
- **Decimal → base r (integer):** r se baar-baar divide, remainders **ulta padho**. **Fraction:** r se multiply, integer parts **seedha**.
- **Binary ↔ Octal:** 3 bits/digit; **Binary ↔ Hex:** 4 bits/digit (right/left se grouping).
- **Base r → decimal:** weighted sum.

**Example:** 156₁₀ → binary: 156 = 10011100₂. Hex = 9C, Octal = 234.
**Fraction:** 0.6875 = 0.1011₂ (0.6875×2=1.375→1; 0.375×2=0.75→0; 0.75×2=1.5→1; 0.5×2=1.0→1).
**Unknown base:** (23)ᵣ + (14)ᵣ = (41)ᵣ ⇒ (2r+3) + (r+4) = 4r + 1 ⇒ 3r + 7 = 4r + 1 ⇒ **r = 6**. (Har digit < r check karo.)
**Digits ki count:** N ko base r me likhne ke liye ⌊log_r N⌋ + 1 digits. **n bits ⇒ max 2ⁿ − 1.**

### Counting formulas
- **n-bit unsigned range 0…2ⁿ − 1**; **n-digit base-r max = rⁿ − 1**.
- **Bits for N values = ⌈log₂ N⌉**.
- **Hex digit = 4 bits; byte = 2 hex digits.**

## 2. Binary arithmetic
**Add:** 0+0=0, 0+1=1, 1+1=10 (carry). **Subtract:** borrow. **Multiply:** shift-add. **Divide.**
**Shift:** left n = ×2ⁿ; right n = ÷2ⁿ.

## 3. Complements (subtraction ke liye)

| | **(r−1)'s complement** | **r's complement** |
|---|---|---|
| Binary | **1's complement** (bits invert) | **2's complement** (invert + 1) |
| Decimal | 9's complement | 10's complement |
| Formula | (rⁿ − 1) − N | rⁿ − N |

**Subtraction A − B (2's complement):** A + (2's comp of B); **carry out = 1 ⇒ result positive (carry discard)**; carry = 0 ⇒ result negative, 2's complement form me.
**1's complement subtraction:** end-around carry.
**Example (4-bit):** 7 − 5: 0111 + (1011 = −5) = 1 0010 ⇒ carry 1 discard ⇒ **0010 = 2**.

### Signed representations (n bits) — recap
| | Range | Zero |
|---|---|---|
| Sign-magnitude | −(2ⁿ⁻¹−1) … +(2ⁿ⁻¹−1) | 2 |
| 1's complement | same | 2 |
| **2's complement** | **−2ⁿ⁻¹ … 2ⁿ⁻¹ − 1** | **1** |
Same n-bit **number of distinct values = 2ⁿ** (sign-mag/1's me −0 waste).
**Sign extension** MSB copy. **Overflow:** same-sign add ⇒ result sign alag.
**2's complement negative ka value:** MSB weight −2ⁿ⁻¹ (1010 = −8 + 2 = −6).
**Sabse chhota negative (−2ⁿ⁻¹) ka negation khud** (overflow).

## 4. Fixed point aur floating point (short)
- **Fixed point:** binary point fixed. **n bits, f fraction bits ⇒ resolution 2⁻ᶠ, unsigned max (2ⁿ − 1)/2ᶠ.** Example: 8-bit, 3 fraction: max 255/8 = 31.875.
- **Floating point (IEEE 754):** S | E | F. **Single: 1/8/23, bias 127; double 1/11/52, bias 1023.** Value = (−1)^S × 1.F × 2^(E−bias). (Detail COA notes me.)
- **Excess-K exponent:** stored = actual + K; comparison easy.
- **Fraction bits ↑ precision; exponent bits ↑ range.**
**Example:** excess-64 exponent: stored 70 ⇒ actual 6.

## 5. Codes

### BCD (8421)
Har decimal digit **4-bit binary (0000–1001)**. **Invalid: 1010–1111.** **BCD addition:** sum > 9 ya carry ⇒ **+6** correction. **Packed BCD:** 2 digits/byte.
**Example:** 47 = 0100 0111 (BCD). 47 + 38: 0100 0111 + 0011 1000 = 0111 1111 ⇒ low digit 1111 > 9 ⇒ +0110 ⇒ (carry) ⇒ **1000 0101 = 85** ✓.
**BCD me 10 se zyada representation waste**: n digits ke liye 4n bits (binary me kam).

### Excess-3
**BCD + 3.** **Self-complementing** (9's complement = bits invert). No all-0 code.
### 2421, 5211: weighted/self-complementing codes.

### Gray code (reflected binary)
**Consecutive numbers me sirf 1 bit change.**
- **Binary → Gray:** G = B ⊕ (B >> 1) (**G_MSB = B_MSB**, baaki **G_i = B_i ⊕ B_{i+1}**).
- **Gray → Binary:** B_MSB = G_MSB; **B_i = B_{i+1} ⊕ G_i.**
- **3-bit Gray:** 000, 001, 011, 010, 110, 111, 101, 100.
- Use: K-map, rotary encoders (glitch-free), counters.
**Example:** Binary 1011 → Gray 1110 (1, 1⊕0 = 1, 0⊕1 = 1, 1⊕1 = 0 ⇒ 1110).
**Gray 1110 → binary:** 1, 1⊕1 = 0, 0⊕1 = 1, 1⊕0 = 1 ⇒ 1011 ✓.

### Error detecting/correcting codes
- **Parity bit** (even/odd): single-bit error detect. **Hamming distance d: detect d−1, correct ⌊(d−1)/2⌋.** Hamming code: 2ʳ ≥ m + r + 1. (Detail CN notes me.)
- **ASCII (7-bit, 128 chars), Extended (8-bit), Unicode.** ASCII: '0' = 48, 'A' = 65, 'a' = 97.
- **Alphanumeric, EBCDIC.**

## 6. Endianness (byte order)
Multi-byte number memory me: **Little-endian:** **LSB lowest address** par (x86). **Big-endian:** **MSB lowest address** (network byte order).
**0x12345678** at address 100: little: 100→78, 101→56, 102→34, 103→12; big: 100→12, 101→34, 102→56, 103→78.
**Question type:** "same bytes little-endian machine par value X to big-endian me value Y" ⇒ **byte-reverse** karke value nikaalo.

## 7. Logic ke saath number problems
- **Kitne bits chahiye** N values / range ke liye.
- **Complement se subtraction** ka result.
- **Number of 1s (population count)** parity.
- **Base conversion with fraction.**
- **BCD/Gray conversions.**
- **Unsigned vs signed interpretation** of same bit pattern: 11111111 = 255 (unsigned) = −1 (2's).

## 8. Quick Revision
- Binary→octal 3 bits; →hex 4 bits.
- 2's complement: invert + 1; range −2ⁿ⁻¹…2ⁿ⁻¹−1; subtraction A + (−B).
- BCD: 4 bits/digit, +6 correction. Excess-3 = BCD + 3, self-complementing.
- Gray: G = B ⊕ (B>>1); consecutive 1-bit change.
- Fixed point resolution 2⁻ᶠ; IEEE 1/8/23 bias 127.
- Little-endian: LSB at lowest address.

### Practice
1. 100₁₀ → binary? *(1100100)*
2. −6 ko 4-bit 2's complement? *(1010)*
3. Binary 1100 → Gray? *(1010)*
4. BCD 0110 0101 ka decimal? *(65)*
