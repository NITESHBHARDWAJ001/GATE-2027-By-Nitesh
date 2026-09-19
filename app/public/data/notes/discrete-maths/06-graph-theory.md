# Graph Theory: Basics, Degree, Connectivity, Trees, Euler/Hamilton, Planarity, Colouring, Matching
<!-- topics: discrete-mathematics-graph-theory/graph-connectivity, discrete-mathematics-graph-theory/degree-of-graph, discrete-mathematics-graph-theory/graph-coloring, discrete-mathematics-graph-theory/graph-planarity, discrete-mathematics-graph-theory/graph-isomorphism, discrete-mathematics-graph-theory/graph-matching, discrete-mathematics-graph-theory/counting, discrete-mathematics-graph-theory/graph-algorithms, discrete-mathematics-graph-theory/jaccard-coefficient -->

## 1. Basics

**Graph G = (V, E):** vertices aur edges. **Simple graph:** no self-loop, no parallel edges. **Multigraph, pseudograph.** **Directed (digraph)** vs **undirected**.
- **Adjacent, incident, neighbour.** **Subgraph**, **spanning subgraph**, **induced subgraph**.
- **Complete graph Kₙ:** **n(n−1)/2 edges.** **Cycle Cₙ:** n vertices, n edges. **Path Pₙ.** **Wheel Wₙ.** **Complete bipartite K_{m,n}:** mn edges. **Regular graph:** sab degree same. **Hypercube Qₙ:** 2ⁿ vertices, n·2ⁿ⁻¹ edges, n-regular, bipartite.
- **Complement Ḡ:** Kₙ − G; **edges(G) + edges(Ḡ) = n(n−1)/2.**

## 2. Degree aur Handshaking

- **Handshaking lemma:** **Σ deg(v) = 2|E|.** **Odd-degree vertices ki sankhya even.**
- **Directed:** Σ in-degree = Σ out-degree = |E|.
- **Simple graph me kam se kam do vertices ka degree same** (n ≥ 2) — pigeonhole (degrees 0..n−1, par 0 aur n−1 saath nahi).
- **Max edges (simple): n(n−1)/2.** **Connected: ≥ n−1.**
- **Min degree δ ≤ 2E/n ≤ Δ.**

### Degree sequence
**Graphic** = kisi simple graph ka degree sequence. **Havel–Hakimi:** sorted descending (d₁, d₂...), **d₁ hataao aur agle d₁ degrees me 1 ghatao**, repeat; negative ya galat aaye ⇒ not graphic. **Necessary:** sum even.
**Example:** (3,3,3,1): 3 hataao → (2,2,0) → 2 hataao → (1, −1) ⇒ **not graphic**. (3,3,2,2,2): → (2,1,1,2)= sort (2,2,1,1) → (1,0,1) → (1,1,0) → (0,0) ✓ graphic.
**Example:** n = 5 vertices, har vertex degree ≥ 2 ⇒ min edges = 5 (C₅).

## 3. Connectivity

- **Walk, trail (no repeated edge), path (no repeated vertex), cycle.**
- **Connected:** har do vertices ke beech path. **Component.** Disconnected graph n vertices, c components: **max edges = C(n−c+1, 2)**.
- **Connected graph min edges n − 1** (tree).
- **Cut vertex (articulation point):** hataane par disconnect. **Bridge (cut edge):** aisi edge. **Edge in cycle ⇒ bridge nahi.**
- **Vertex connectivity κ(G) ≤ edge connectivity λ(G) ≤ min degree δ(G).**
- **Directed:** **strongly connected** (u ⇒ v aur v ⇒ u), **weakly connected.** **SCC.**
- **Bipartite ⟺ koi odd cycle nahi ⟺ 2-colourable.**
- **Number of edges ≥ C(n−1, 2) + 1 ⇒ connected** (n vertices simple). Max edges of disconnected: C(n−1, 2).

**Example:** n = 10 vertices simple graph, **kam se kam kitne edges se connected pakka?** Max disconnected = C(9,2) = 36 ⇒ **37 edges connected guarantee.**

## 4. Trees

**Tree = connected + acyclic.** Equivalent:
- **Connected + E = V − 1.**
- **Acyclic + E = V − 1.**
- **Do vertices ke beech exactly ek path.**
- **Minimally connected** (koi edge hatao ⇒ disconnect).
- **Tree me ≥ 2 leaves** (n ≥ 2).
- **Σ degrees = 2(n − 1).**
- **Forest c components: E = n − c.**
- **Rooted tree:** height, level, subtree.
- **Number of labeled trees on n vertices = n^(n−2)** (Cayley). n=4 ⇒ 16. **Spanning trees of Kₙ = n^(n−2).** **Cycle Cₙ: n spanning trees**; **K_{m,n}: m^(n−1) n^(m−1).**
- **Kirchhoff (matrix-tree theorem):** spanning trees = kisi cofactor of Laplacian.
- **Full binary tree:** L = I + 1. **m-ary full:** L = (m−1)I + 1.
- **Center of tree:** 1 ya 2 vertices.
**Example:** tree with degrees: 1 vertex degree 3, 2 vertices degree 2, baaki leaves: total degree = 2(n − 1); n = 3 + L; 3 + 4 + L = 2(3 + L − 1) ⇒ 7 + L = 4 + 2L ⇒ L = 3, n = 6.

### Spanning tree / MST
Kruskal/Prim (Algorithms notes).

## 5. Euler aur Hamilton

### Euler
- **Euler circuit (closed trail: har edge exactly ek baar):** connected (non-zero degree vertices) + **har vertex ka degree even.**
- **Euler path (open):** connected + **exactly 2 odd-degree vertices** (start-end wahi).
- **Directed:** in-degree = out-degree har vertex.
- Kₙ me Euler circuit ⟺ **n odd**. K_{m,n}: m, n both even.
**Example:** K₅: har degree 4 ⇒ Euler circuit ✓. K₄: degree 3 (odd) ⇒ nahi.
**Königsberg bridges:** 4 odd vertices ⇒ nahi.
**Edges add karke Euler banane ke liye:** odd vertices ko pair karo.

### Hamilton
- **Hamilton cycle:** har vertex exactly ek baar (closed). **Path.** **NP-complete** (koi simple iff condition nahi).
- **Sufficient:** **Dirac: n ≥ 3, δ ≥ n/2 ⇒ Hamiltonian.** **Ore: deg(u) + deg(v) ≥ n non-adjacent pairs ke liye.**
- **Kₙ (n ≥ 3):** Hamiltonian; **number of distinct Hamilton cycles = (n−1)!/2.**
- **Bipartite K_{m,n}:** Hamiltonian ⟺ m = n (≥ 2). **Petersen graph non-Hamiltonian**. Hypercube Qₙ (n ≥ 2) Hamiltonian (Gray code).
- **Hamilton vs Euler alag concepts.**

## 6. Planar Graphs

**Planar** = plane me edges bina crossing ke draw ho sakte. **Faces** (outer bhi).
- **Euler's formula (connected planar):** **V − E + F = 2.** (c components: V − E + F = 1 + c.)
- **Simple planar (V ≥ 3): E ≤ 3V − 6.** **Bipartite (triangle-free) planar: E ≤ 2V − 4.**
- **Har planar graph me ek vertex ka degree ≤ 5.**
- **Kuratowski:** planar ⟺ **K₅ ya K₃,₃ ka subdivision (homeomorph) nahi**. **Wagner:** minor.
- **K₅ non-planar (E = 10 > 3·5−6 = 9)**, **K₃,₃ non-planar** (bipartite: 9 > 2·6−4 = 8). **Kₙ planar ⟺ n ≤ 4.**
- **Face degree sum = 2E.** **Har face ≥ 3 edges (simple) ⇒ 3F ≤ 2E.**
- **Dual graph.**
**Example:** connected planar, V = 8, E = 12 ⇒ F = 2 − 8 + 12 = **6**.
**Example (max edges):** planar 10 vertices ⇒ ≤ 24.
**Planarity test linear time.**

## 7. Graph Colouring

- **Proper vertex colouring:** adjacent alag colour. **Chromatic number χ(G).**
- **χ(Kₙ) = n. χ(bipartite with edge) = 2. χ(Cₙ) = 2 (even), 3 (odd). χ(tree) = 2 (n ≥ 2). χ(wheel: hub + Cₙ) = 3 (n even), 4 (n odd).**
- **χ(G) ≥ ω(G)** (clique number); **χ ≤ Δ + 1** (greedy); **Brooks: connected, not complete/odd cycle ⇒ χ ≤ Δ.**
- **Four Colour Theorem: har planar graph 4-colourable.** (Sufficient count 4; "5" ya "6" easy bounds.) **Planar graph 5-colourable (easy proof), 6-colourable (degree ≤ 5).**
- **χ(G) = 2 ⟺ bipartite ⟺ no odd cycle.** 3-colouring NP-complete; 2-colouring easy (BFS).
- **Chromatic polynomial P(G, k):** Kₙ: k(k−1)…(k−n+1). **Tree: k(k−1)^(n−1).** Cycle Cₙ: (k−1)ⁿ + (−1)ⁿ(k−1).
- **Edge colouring:** **χ′(G) ≥ Δ; Vizing: χ′ ∈ {Δ, Δ + 1}.** **Bipartite: χ′ = Δ (König).** **χ′(Kₙ) = n − 1 (n even), n (n odd).**
- **Independent set, clique, vertex cover:** **α(G) + β(G) = n** (max independent set + min vertex cover).
**Example (2020 GATE-type):** G = K₆ (6 vertices) me vertex add karke usko sab se joda ⇒ K₇; edge colouring K₇ = **7**.

## 8. Matching
- **Matching** = non-adjacent edges ka set. **Perfect matching:** har vertex covered (|V| even). **Maximum matching.**
- **K₂ₙ perfect matchings = (2n − 1)!! = (2n)!/(2ⁿ n!)**: K₄ → 3, K₆ → 15.
- **Hall's theorem:** bipartite (X, Y): X ka complete matching ⟺ **har S ⊆ X ke liye |N(S)| ≥ |S|.**
- **König:** bipartite me **max matching = min vertex cover.** **Regular bipartite graph me perfect matching.**
- **Path Pₙ me matchings ki count** = Fibonacci (Pₙ: F(n+1)).
- **Tree me perfect matching ho to unique.**
- **Matching number ν(G) ≤ n/2.**

## 9. Isomorphism
**G₁ ≅ G₂:** bijection f : V₁ → V₂ jo adjacency preserve kare.
**Necessary conditions (invariants):** **same |V|, |E|, degree sequence, cycle lengths, connectivity, bipartiteness.** **Sufficient nahi** — structure check karo.
- **Self-complementary graph:** G ≅ Ḡ. **n ≡ 0 ya 1 (mod 4)** aur **E = n(n−1)/4.** C₅ aur P₄ self-complementary.
- **Cₙ ≅ complement(Cₙ) ⟺ n = 5.**
- **Number of non-isomorphic graphs:** 4 vertices: **11**; 3 vertices: **4**; **non-isomorphic trees:** n=4: 2, n=5: 3, n=6: 6.
- **Petersen graph:** 10 vertices, 15 edges, 3-regular, girth 5, non-planar, non-Hamiltonian (Kneser K(5,2)).

## 10. Counting graphs
- **Labeled graphs on n vertices: 2^(n(n−1)/2).** n=4 ⇒ 64; n=3 ⇒ 8.
- **Labeled graphs with exactly m edges: C(n(n−1)/2, m).**
- **Labeled graphs with at least k edges**: Σ.
- **Cycles in Kₙ (as subgraphs) of length k: C(n,k)·(k−1)!/2.** Hamilton cycles: (n−1)!/2.
- **Triangles in Kₙ: C(n,3).**
- **Labeled trees: nⁿ⁻².**

## 11. Jaccard-type / miscellaneous
**Jaccard coefficient J(A,B) = |A ∩ B|/|A ∪ B|** (sets/edge-sets similarity). **Spanning trees T₁, T₂ of Kₙ (n−1 edges each):** J = |common|/(2(n−1) − |common|).

## 12. Problem patterns
1. **Handshaking / degree sequence / edges count.**
2. **Kitne edges min/max (connected/planar/etc.).**
3. **Chromatic number** given graph (clique + odd cycle).
4. **Planarity (E ≤ 3V − 6, faces).**
5. **Euler/Hamilton exist?**
6. **Isomorphism / self-complementary.**
7. **Matchings, perfect matching counts.**
8. **Counting labeled graphs/trees.**

## 13. Quick Revision
- Σdeg = 2E; odd-degree vertices even. Kₙ edges n(n−1)/2.
- Tree: E = n−1; n^(n−2) labeled; ≥ 2 leaves.
- Euler circuit: all even; path: 2 odd. Hamilton: Dirac δ ≥ n/2; Kₙ (n−1)!/2 cycles.
- Planar: V−E+F = 2; E ≤ 3V−6; K₅, K₃,₃ non-planar.
- χ: Kₙ n; bipartite 2; planar ≤ 4; ≤ Δ+1.
- α + β = n; König (bipartite).
- Labeled graphs 2^(n(n−1)/2).

### Practice
1. Degree sequence (5,5,4,3,2,1) graphic hai? *(Sum 20 even par Havel-Hakimi: 5 hataao → (4,3,2,1,0); 4 hataao → (2,1,0,−1) negative ⇒ graphic nahi)*
2. Connected planar V = 7, E = 15 possible? *(3·7−6 = 15 ✓ max, possible)*
3. K₆ Euler circuit? *(Nahi, degree 5 odd)*
4. Tree 10 vertices: edges? *(9)*
