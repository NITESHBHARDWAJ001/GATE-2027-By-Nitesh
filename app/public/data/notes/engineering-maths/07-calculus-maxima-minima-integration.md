# Calculus II: Maxima–Minima, Integration aur Definite Integrals
<!-- topics: engineering-mathematics-calculus/maxima-minima, engineering-mathematics-calculus/integration, engineering-mathematics-calculus/definite-integral, engineering-mathematics-calculus/summation -->

## 1. Maxima aur Minima (single variable)

### Critical points
**f′(c) = 0 ya f′(c) exist nahi karta** = critical point.
- **First derivative test:** f′ ka sign change: **+ → −** ⇒ local max; **− → +** ⇒ local min; na badle ⇒ extremum nahi.
- **Second derivative test:** f′(c) = 0 aur **f″(c) < 0 ⇒ local max**; **f″(c) > 0 ⇒ local min**; **f″(c) = 0 ⇒ inconclusive** (x⁴, x³ dono ho sakte).
- **Global extrema (closed interval [a,b]):** critical points **aur endpoints** ki values compare (EVT).
- **Increasing:** f′ ≥ 0; **decreasing:** f′ ≤ 0. **Concave up f″ > 0; inflection point: f″ sign badle.**
- **Necessary condition:** interior extremum par f′ = 0 (agar differentiable). **f′(c) = 0 ⇏ extremum** (x³ at 0).

**Example:** f(x) = x³ − 3x: f′ = 3x² − 3 = 0 ⇒ x = ±1; f″ = 6x: **x = −1 local max (f = 2)**, **x = 1 local min (f = −2)**. [0, 2] par global min = −2 (x=1), max = 2 (x=2).
**Example:** f(x) = x² − 4x + 7: min at x = 2, value **3**. f(x) = 6x − x²: max at 3, value **9**.
**Example:** f(x) = x + 1/x (x > 0): f′ = 1 − 1/x² ⇒ x = 1 ⇒ **min 2** (AM-GM).
**Example:** f(x) = x e^{−x}: f′ = (1−x)e^{−x} ⇒ max at x = 1, value 1/e.
**Example:** f(x) = |x|: min at 0 (f′ exist nahi).
**Extrema ki count:** polynomial degree n ⇒ ≤ n − 1 critical points. **x⁴ − 4x³...**: f′ ke roots gino aur sign change dekho.
**Optimization word problems:** constraint se ek variable, phir f′ = 0 (rectangle max area perimeter P: square).

### Functions of two variables
- **Critical point:** fₓ = f_y = 0.
- **Second derivative test:** D = fₓₓf_yy − (fₓᵧ)². **D > 0 & fₓₓ > 0 ⇒ local min; D > 0 & fₓₓ < 0 ⇒ local max; D < 0 ⇒ saddle.**
- **Lagrange multipliers** (constraint ke saath): ∇f = λ∇g.

## 2. Integration (Anti-derivative)

**∫ f(x) dx = F(x) + C, F′ = f.**

### Standard integrals
| ∫ | Result |
|---|---|
| xⁿ dx | xⁿ⁺¹/(n+1) (n ≠ −1) |
| 1/x dx | ln|x| |
| eˣ | eˣ; aˣ: aˣ/ln a |
| sin x | −cos x; cos x: sin x |
| sec²x | tan x |
| 1/(1+x²) | tan⁻¹x |
| 1/√(1−x²) | sin⁻¹x |
| tan x | −ln|cos x| |
| ln x | x ln x − x |

### Techniques
1. **Substitution:** ∫ f(g(x))g′(x)dx = ∫ f(u)du. (Definite me limits badlo.)
2. **By parts:** **∫ u dv = uv − ∫ v du.** **LIATE** (Log, Inverse trig, Algebraic, Trig, Exponential) se u chuno.
   **∫ x eˣ dx = (x − 1)eˣ + C.** **∫ x ln x = (x²/2)ln x − x²/4.**
3. **Partial fractions** (rational functions).
4. **Trig identities:** sin²x = (1 − cos 2x)/2.
5. **Symmetry.**

**Example:** ∫ 2x/(x²+1) dx = ln(x²+1) + C. ∫ sin x cos x dx = sin²x/2.

## 3. Definite Integral

**∫ₐᵇ f(x)dx = F(b) − F(a)** (Fundamental theorem). **Signed area.**

### Properties (GATE me bahut kaam)
- **∫ₐᵇ f = −∫ᵦᵃ f; ∫ₐᵃ = 0; ∫ₐᵇ = ∫ₐᶜ + ∫꜀ᵇ.**
- **Linearity.**
- **∫ₐᵇ f(x)dx = ∫ₐᵇ f(a + b − x)dx** (king's property).
- **∫₀ᵃ f(x)dx = ∫₀ᵃ f(a − x)dx.**
- **Even f: ∫₋ₐᵃ f = 2∫₀ᵃ f. Odd f: ∫₋ₐᵃ f = 0.**
- **Periodic f (period T): ∫₀ⁿᵀ f = n∫₀ᵀ f.**
- **f ≤ g ⇒ ∫f ≤ ∫g.** **|∫ f| ≤ ∫ |f|.**
- **d/dx ∫ₐˣ f(t)dt = f(x)** (Leibniz/FTC). **d/dx ∫_{g(x)}^{h(x)} f(t)dt = f(h)h′ − f(g)g′.**

**Examples:**
- **∫₀¹ x dx = 1/2; ∫₀^π sin x dx = 2; ∫₋₁¹ x³ dx = 0; ∫₀^{π/2} sin²x dx = π/4.**
- **∫₀^π sin²x = π/2.** **∫₀^{π/2} sin x/(sin x + cos x) dx = π/4** (king's property: I = J, I + J = π/2).
- **∫₀^∞ e⁻ˣ dx = 1; ∫₀^∞ x e⁻ˣ dx = 1; ∫₀^∞ xⁿe⁻ˣ dx = n!** (Gamma).
- **∫₋∞^∞ e^{−x²} dx = √π.**
- **∫₀ᵃ √(a² − x²) dx = πa²/4** (quarter circle area).
- **Area under curve between limits.**

### Improper integrals
- **∫₁^∞ 1/xᵖ dx converges ⟺ p > 1** (value 1/(p−1)). **∫₀¹ 1/xᵖ converges ⟺ p < 1.** **∫₁^∞ 1/x diverges.**
- Limit se define.

### Double integrals (short)
**∬ f(x,y) dA:** iterated. **Order change** limits ke saath. **∬ over rectangle = product (separable).** **Area = ∬ 1 dA.** Polar: dA = r dr dθ.
**Example:** ∫₀¹∫₀^x dy dx = 1/2 (triangle). ∫₀¹∫₀¹ xy dx dy = 1/4.

### Numerical integration (short)
Trapezoidal (h/2)(f₀ + 2Σf + fₙ); Simpson's 1/3 (h/3)(f₀ + 4f_odd + 2f_even + fₙ) (n even).
**Newton–Raphson:** x_{n+1} = xₙ − f(xₙ)/f′(xₙ); **√a: xₙ₊₁ = ½(xₙ + a/xₙ).**

## 4. Summations & Series (quick)
- **Σ i = n(n+1)/2; Σ i² = n(n+1)(2n+1)/6; Σ i³ = [n(n+1)/2]².**
- **Geometric Σ rⁱ = (rⁿ⁺¹ − 1)/(r − 1); infinite 1/(1−r), |r| < 1.**
- **Riemann sum limit:** lim (1/n)Σ f(i/n) = ∫₀¹ f(x)dx.
  **Example:** lim (1/n)Σ_{i=1}^n i/n = ∫₀¹ x dx = 1/2.
- **Convergence tests:** p-series Σ1/nᵖ (p > 1), ratio test, comparison, integral test. **Harmonic diverges.**
- **Σ 1/(n(n+1)) = 1 (telescoping).**

## 5. GATE patterns
1. **Max/min value** of function on interval / statements about extrema.
2. **Number of extrema/roots.**
3. **Definite integral value** (properties, symmetry, standard).
4. **Integral statements** (∫ f ≤ ...).
5. **Improper convergence (p-test).**
6. **Riemann sum limits, series sums.**
7. **Optimization (word).**

## 6. Quick Revision
- f′ = 0 critical; f″ > 0 min, f″ < 0 max; closed interval: endpoints too.
- Even/odd symmetry; king's property a+b−x; ∫ₐˣ f ⇒ f(x).
- ∫₀^∞ xⁿe⁻ˣ = n!; ∫₋∞^∞ e^{−x²} = √π; ∫ 1/xᵖ (1 to ∞) converges p>1.
- By parts LIATE; substitution change limits.
- Riemann sum → integral.

### Practice
1. Min of f(x) = x² − 6x + 10? *(x = 3, f = 1)*
2. ∫₀^{2π} sin x dx? *(0)*
3. ∫₀^{π/2} cos²x dx? *(π/4)*
4. ∫₀^∞ x²e⁻ˣ dx? *(2! = 2)*
