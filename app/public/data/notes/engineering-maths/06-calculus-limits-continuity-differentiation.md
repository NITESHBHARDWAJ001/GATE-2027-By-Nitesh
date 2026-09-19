# Calculus I: Limits, Continuity aur Differentiation
<!-- topics: engineering-mathematics-calculus/limits, engineering-mathematics-calculus/continuity, engineering-mathematics-calculus/differentiation, engineering-mathematics-calculus/polynomials -->

## 1. Limits

**lim_{x→a} f(x) = L**: x, a ke paas jaaye (a par pahunche bina) to f(x), L ke paas jaata hai.
- **Exist karta hai ⟺ left-hand limit = right-hand limit.**
- **Direct substitution** pehle try karo. **Indeterminate forms:** 0/0, ∞/∞, 0·∞, ∞ − ∞, 1^∞, 0⁰, ∞⁰.

### Limit laws
Sum, product, quotient (denominator ≠ 0), power, composition — limits exist ho to.
**Squeeze theorem:** g ≤ f ≤ h, lim g = lim h = L ⇒ lim f = L.
**Bounded × vanishing = 0:** lim x·sin(1/x) = 0 (x→0). lim sin(x)/x (x→∞) = 0.

### Standard limits (yaad karo)
| Limit | Value |
|---|---|
| lim_{x→0} sin x / x | **1** |
| lim_{x→0} tan x / x | 1 |
| lim_{x→0} (1 − cos x)/x² | **1/2** |
| lim_{x→0} (eˣ − 1)/x | 1 |
| lim_{x→0} ln(1 + x)/x | 1 |
| lim_{x→0} (aˣ − 1)/x | ln a |
| lim_{x→0} (1 + x)^(1/x) | **e** |
| lim_{x→∞} (1 + 1/x)^x | **e** |
| lim_{x→∞} (1 + a/x)^x | **eᵃ** |
| lim_{x→0} sin(ax)/(bx) | a/b |
| lim_{x→a} (xⁿ − aⁿ)/(x − a) | **n aⁿ⁻¹** |
| lim_{x→0} ((1 + x)ⁿ − 1)/x | n |
| lim_{x→∞} xⁿ/eˣ | 0 |
| lim_{x→∞} (ln x)/x | 0 |
| lim_{x→0⁺} x ln x | 0 |
| lim_{n→∞} n^(1/n) | 1 |
| lim_{n→∞} (n!)^(1/n)/n | 1/e |

### L'Hôpital's Rule
**0/0 ya ∞/∞ form par: lim f/g = lim f′/g′** (agar exist kare; repeat kar sakte).
**Example:** lim (eˣ − 1 − x)/x² = (eˣ − 1)/2x = eˣ/2 = **1/2**.
**Example:** lim (sin x − x)/x³ = (cos x − 1)/3x² = −sin x/6x = **−1/6**.
**Example:** lim_{x→0} (1 − cos x)/x² = sin x/2x = **1/2**.
**Example:** lim_{x→0} (sin 3x)/x = **3**.

### Other forms
- **0·∞:** f·g = f/(1/g). **∞ − ∞:** common denominator/rationalize.
  **lim (√(x²+x) − x) (x→∞) = x/(√(x²+x)+x) → 1/2.**
- **1^∞:** **lim f^g = e^(lim g(f−1)).** **lim_{x→∞}(1 + 2/x)^{3x} = e⁶.**
- **Polynomial ratio x → ∞:** highest power ka ratio. (3x²+2)/(5x²−1) → 3/5; degree upar bada ⇒ ∞.
- **Taylor/Maclaurin se limit** (jab L'Hôpital lamba): sin x = x − x³/6 + …; cos x = 1 − x²/2 + x⁴/24; eˣ = 1 + x + x²/2 + …; ln(1+x) = x − x²/2 + …; (1+x)ⁿ = 1 + nx + ….
- **Limit at infinity of rational/exp:** exp poly se tez.
- **Sequence limits:** lim (1 + 1/n)ⁿ = e; Σ 1/n diverges; **Cesàro/Stolz**.

**Example (GATE-type):** lim_{x→0} (x − sin x)/x³ = **1/6**.
**Example:** lim_{x→∞} (x + 1)/(x²) = 0. lim_{x→0} |x|/x: left −1, right +1 ⇒ **does not exist**.
**Example:** f(x) = (x² − 4)/(x − 2): limit at 2 = 4 (jabki f(2) undefined).

## 2. Continuity

**f continuous at a ⟺ (1) f(a) defined, (2) lim_{x→a} f(x) exists, (3) lim = f(a).**
- **Types of discontinuity:** **removable** (limit exist, value alag/undefined), **jump** (left ≠ right), **infinite**, **oscillatory** (sin(1/x)).
- **Polynomials, eˣ, sin, cos continuous everywhere.** **Rational: denominator ≠ 0 par.** **|x| continuous.** **⌊x⌋ integers par discontinuous.**
- **Sum, product, composition of continuous = continuous.**
- **Piecewise function ke constants:** LHL = RHL = f(a) equations.
  **Example:** f(x) = (x²−1)/(x−1) x≠1; f(1) = k: **k = 2**.

### Important theorems (continuous f on [a, b])
- **Intermediate Value Theorem (IVT):** f(a), f(b) ke beech ki har value kisi c par milti. **f(a)·f(b) < 0 ⇒ ∃ root (a,b).**
- **Extreme Value Theorem:** closed interval me f **max aur min attain** karta (bounded).
- **Continuous on closed ⇒ integrable, bounded, uniformly continuous.**
- **Composition of continuous ⇒ continuous; f continuous, injective on interval ⇒ monotone.**
**Example:** x³ + x − 1 = 0 root (0,1) me: f(0) = −1, f(1) = 1 ⇒ exists.
**Example:** f : [0,1] → [0,1] continuous ⇒ **fixed point exist** (g(x) = f(x) − x pe IVT: g(0) ≥ 0, g(1) ≤ 0).
**Continuity at a point vs neighbourhood:** f(x) = x (rational), 0 (irrational): sirf x = 0 par continuous.

## 3. Differentiation

**f′(a) = lim_{h→0} (f(a+h) − f(a))/h** (slope of tangent).
- **Differentiable ⇒ continuous.** **Continuous ⇏ differentiable** (|x| at 0, corners, cusps).
- **Differentiable at a ⟺ left derivative = right derivative (aur finite).**

### Rules
- **Sum, product (uv)′ = u′v + uv′, quotient (u/v)′ = (u′v − uv′)/v², chain (f∘g)′ = f′(g)·g′.**
- **Standard:** (xⁿ)′ = nxⁿ⁻¹; (eˣ)′ = eˣ; (aˣ)′ = aˣ ln a; (ln x)′ = 1/x; (sin)′ = cos; (cos)′ = −sin; (tan)′ = sec²; (sin⁻¹x)′ = 1/√(1−x²); (tan⁻¹x)′ = 1/(1+x²); (xˣ)′ = xˣ(1 + ln x).
- **Logarithmic differentiation:** y = f^g ⇒ ln y.
- **Implicit, parametric.**
- **Higher order:** d²y/dx². **Leibniz rule: (uv)⁽ⁿ⁾ = Σ C(n,k)u⁽ᵏ⁾v⁽ⁿ⁻ᵏ⁾.**
- **Polynomial of degree n: derivative degree n−1.** **Product of polynomials degrees add.**

### Piecewise function ka differentiability (GATE favourite)
Junction a par:
1. **Continuity:** left value = right value.
2. **Derivative:** left slope = right slope.
**Example:** f(x) = x² (x ≤ 1), ax + b (x > 1): continuity 1 = a + b; slope 2 = a ⇒ **a = 2, b = −1**.
**Example:** f(x) = |x|: 0 par nahi. **f(x) = x|x|: 0 par differentiable (f′(0) = 0).** f(x) = x^(2/3): cusp at 0 (f′ infinite). f(x) = x² sin(1/x), f(0) = 0: differentiable at 0 (f′(0) = 0) par f′ continuous nahi.
**|x| ka set of non-differentiable points:** |f(x)| ke liye jahan f = 0 (aur f′ ≠ 0).
**Sum/product of differentiable differentiable; |f| nahi zaroori.**

## 4. Mean Value Theorems

- **Rolle's theorem:** f continuous [a,b], differentiable (a,b), **f(a) = f(b)** ⇒ ∃ c: **f′(c) = 0.**
- **Lagrange's MVT:** f continuous [a,b], differentiable (a,b) ⇒ ∃ c: **f′(c) = (f(b) − f(a))/(b − a).**
- **Cauchy MVT.**
- **Consequences:** **f′ > 0 ⇒ increasing; f′ = 0 ⇒ constant.** **|f′| ≤ M ⇒ |f(b)−f(a)| ≤ M|b − a| (Lipschitz).**
- **Root counting:** f′ ka koi root nahi ⇒ f ke ≤ 1 root; p(x) ke n distinct real roots ⇒ p′ ke n−1 roots (Rolle).
**Example:** f(x) = x² on [1, 3]: f′(c) = 2c = (9−1)/2 = 4 ⇒ c = 2.
**Example:** f(0) = 0 aur f′(x) ≤ 3 ∀x ⇒ f(2) ≤ 6 (MVT: f(2) − f(0) = 2f′(c) ≤ 6).

## 5. Taylor/Maclaurin series
**f(x) = Σ f⁽ⁿ⁾(a)(x − a)ⁿ/n!.** Maclaurin (a = 0): eˣ, sin x, cos x, 1/(1−x) = Σxⁿ, ln(1+x). **Radius of convergence.**
**Approximation error (Lagrange remainder).**
**Numerical differentiation:** f′(x) ≈ (f(x+h) − f(x−h))/2h; **f″(x) ≈ (f(x+h) − 2f(x) + f(x−h))/h².**

## 6. Partial derivatives (short)
f(x,y): ∂f/∂x. **Chain rule multi-variable.** **Gradient ∇f.** **Mixed partials equal (continuity).** **Jacobian, Hessian.**

## 7. GATE patterns
1. **Limit compute** (standard/L'Hôpital/Taylor).
2. **Continuity parameter.**
3. **Differentiability at a point / piecewise parameters.**
4. **MVT/Rolle statements.**
5. **Sequence limits (n^(1/n), (1+1/n)ⁿ).**
6. **Derivative value / degree.**

## 8. Quick Revision
- Limit exists ⟺ LHL = RHL. sin x/x → 1; (1−cos)/x² → 1/2; (1+1/x)ˣ → e.
- L'Hôpital only 0/0, ∞/∞. 1^∞: e^(lim g(f−1)).
- Continuous: LHL = RHL = f(a). IVT for roots; EVT on closed interval.
- Differentiable ⇒ continuous; piecewise: match value and slope.
- Rolle f(a)=f(b) ⇒ f′(c)=0; MVT slope.
- Taylor for hard limits.

### Practice
1. lim_{x→0} (e^{2x} − 1)/x? *(2)*
2. lim_{x→∞} (1 + 3/x)^x? *(e³)*
3. f(x) = |x − 1|: differentiable at 1? *(Nahi)*
4. MVT f(x) = x³ on [0,2]: c? *(f′ = 3c² = 8/2 = 4 ⇒ c = 2/√3)*
