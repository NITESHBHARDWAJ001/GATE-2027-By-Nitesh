# Number Representation, Arithmetic aur IEEE 754
<!-- topics: digital-logic/number-representation, digital-logic/ieee-representation, digital-logic/booths-algorithm, digital-logic/fixed-point-representation, digital-logic/floating-point-representation -->

## 1. Number systems

Base conversions: **binary (2), octal (8), hex (16)**. 3 binary bits = 1 octal digit; 4 bits = 1 hex digit.

- Decimal → binary: 2 se baar-baar divide, remainders ulta. Fraction: 2 se baar-baar multiply, integer parts.
- **n bits me unsigned range: 0 to 2ⁿ − 1.**

**Example:** 45₁₀ = 101101₂ = 55₈ = 2D₁₆. 0.625 = 0.101₂ (0.625×2=1.25→1; 0.25×2=0.5→0; 0.5×2=1.0→1).

## 2. Signed number representations (n bits)

| Representation | Range | Zero | Note |
|---|---|---|---|
| **Sign-magnitude** | −(2ⁿ⁻¹−1) to +(2ⁿ⁻¹−1) | **Do zeros** (+0, −0) | MSB = sign |
| **1's complement** | −(2ⁿ⁻¹−1) to +(2ⁿ⁻¹−1) | **Do zeros** | Negative = bits invert |
| **2's complement** | **−2ⁿ⁻¹ to +(2ⁿ⁻¹−1)** | **Ek zero** | Negative = invert + 1. **Sabse popular** |
| **Excess-K (biased)** | −K to 2ⁿ−1−K | Ek | Exponent me use |

**2's complement tricks:**
- Negative number ki value: MSB ka weight **−2ⁿ⁻¹**. 1010 (4-bit) = −8 + 2 = **−6**.
- Negate karne ke liye: **right se pehla 1 tak same, uske baad bits flip**. (0110 → 1010.)
- **Sign extension:** bits badhane par MSB copy karo (1010 → 111010).
- **Addition/subtraction ek hi hardware** se; A − B = A + (2's comp of B).
- **Asymmetric range:** −8 ka positive counterpart nahi (4 bit).

### Overflow (2's complement)
- **Do positive add karke negative** ya **do negative add karke positive** = overflow.
- **Different signs** add karne par overflow **nahi**.
- **Detect:** carry into MSB **XOR** carry out of MSB = 1.
- Unsigned me overflow = **carry out of MSB**.

**Example:** 4-bit: 0111 (+7) + 0011 (+3) = 1010 (−6 ?) → **overflow** (dono positive, result negative).

## 3. Binary arithmetic ka time/hardware
- **Ripple carry adder**: delay ∝ n. **Carry lookahead**: G = AB, P = A⊕B, C_{i+1} = G_i + P_iC_i, faster.
- **Full adder**: Sum = A⊕B⊕Cin, Cout = AB + Cin(A⊕B).

## 4. Multiplication: Booth's Algorithm (signed, 2's complement)

Multiplier ke bits ki **runs of 1s** ko ek subtract aur ek add se replace karta hai (kam operations).

**Q₀ Q₋₁ pair ke hisaab se:**
- **01** → Add multiplicand (A = A + M)
- **10** → Subtract (A = A − M)
- **00 / 11** → sirf **arithmetic right shift**

Har step ke baad A, Q, Q₋₁ ko **arithmetic right shift**. n steps.

**Recoding view:** multiplier ke bits (right to left): ek 1 se pehle 0→1 transition = −1, 1→0 transition = +1.
**Example:** multiplier 0111 = +7: recoded 1 0 0 −1 (8 − 1) → sirf 2 operations. Multiplier **0101...** (alternating) = **worst case** (har bit pe operation).

## 5. IEEE 754 floating point

### Single precision (32 bit)
`| S (1) | Exponent (8) | Fraction/Mantissa (23) |`
- **Value = (−1)^S × 1.F × 2^(E − 127)**  (normalized; hidden leading 1)
- **Bias = 127**. Exponent stored **E = actual + 127**.
- **Special:** E = 0 & F = 0 → **±0**; E = 0 & F ≠ 0 → **denormal** (0.F × 2⁻¹²⁶); E = 255 & F = 0 → **±∞**; E = 255 & F ≠ 0 → **NaN**.
- **Normalized E range: 1 to 254** → actual exponent −126 to +127.

### Double precision (64 bit): 1 | 11 | 52, **bias 1023**.

### Convert decimal → IEEE 754 (example: −10.75)
1. |10.75| = 1010.11₂ = **1.01011 × 2³**.
2. S = 1. E = 3 + 127 = 130 = 10000010₂. F = 01011 followed by zeros (23 bits).
3. Bits: `1 10000010 01011000...0` = **0xC12C0000**.

### Decode (0x40490FDB style): hex → binary → S, E, F; value = (−1)^S(1.F)2^(E−127).
**Example:** 0x3F800000: S = 0, E = 0x7F = 127, F = 0 ⇒ 1.0 × 2⁰ = **1.0**.

### Comparison
Positive IEEE floats ko **integer ki tarah compare** kar sakte hain (exponent MSB side me hai). Isliye biased exponent.

### Precision vs range
- **Fraction bits ↑** = precision ↑. **Exponent bits ↑** = range ↑.
- **Largest single** ≈ (2 − 2⁻²³) × 2¹²⁷ ≈ 3.4 × 10³⁸. **Smallest normalized** = 2⁻¹²⁶.
- Floating-point **associative nahi**: (a+b)+c ≠ a+(b+c) rounding se. Adding very small to very large lost.
- **Machine epsilon** (single) = 2⁻²³.

### FP addition steps
1. Exponents compare, **chhote ko align** (mantissa right shift).
2. Mantissa add/sub.
3. **Normalize**. 4. **Round**. 5. Overflow/underflow check.

### FP multiplication
Exponents **add (bias ek baar subtract)**, mantissas multiply, normalize.

## 6. Fixed-point
Binary point fixed jagah. n bits, f fraction bits: **resolution 2⁻ᶠ**, unsigned max = (2ⁿ−1)/2ᶠ. Example: 8-bit, 3 fraction bits: max = 255/8 = **31.875**, step 0.125.

## 7. Codes
- **BCD**: har decimal digit 4 bit (0–9). **Gray code**: consecutive values me **ek bit** fark; binary→Gray: g_i = b_i ⊕ b_{i+1}, MSB same. **Excess-3**. **ASCII** 7 bit, **parity/Hamming** error detection.
- **Hamming distance d**: **d−1 errors detect**, **⌊(d−1)/2⌋ correct**.

## 8. Endianness
Multi-byte number memory me kaise: **Little endian** = **LSB lowest address** par (x86); **Big endian** = **MSB lowest address**. 0x12345678: little = 78 56 34 12.

## 9. Quick Revision
- 2's complement range −2ⁿ⁻¹ … 2ⁿ⁻¹−1, ek zero. Overflow = carry into MSB ⊕ carry out.
- Booth: 01 add, 10 subtract, 00/11 shift. Worst case alternating 0101.
- IEEE single: 1/8/23, bias 127; double 1/11/52, bias 1023; hidden 1.
- Fraction bits = precision, exponent bits = range.
- Gray: g = b ⊕ (b >> 1). Hamming: detect d−1, correct ⌊(d−1)/2⌋.

### Practice
1. −13 ko 8-bit 2's complement me? *(13 = 00001101 → invert 11110010 + 1 = **11110011**)*
2. 0xC0A00000 single-precision ka value? *(S=1, E=0x81=129 → 2², F=.01 → 1.25 → **−5.0**)*
3. 5-bit 2's complement range? *(−16 to +15)*
