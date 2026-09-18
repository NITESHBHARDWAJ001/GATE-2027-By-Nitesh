# Graph Algorithms: BFS, DFS, Topological Sort, SCC, Shortest Paths
<!-- topics: algorithms/graph-search, algorithms/graph-algorithms, algorithms/breadth-first-search, algorithms/depth-first-search, algorithms/topological-sort, algorithms/strongly-connected-components, algorithms/shortest-path, algorithms/dijkstras-algorithm, algorithms/bellman-ford, algorithms/minimum-spanning-tree, discrete-mathematics-graph-theory/graph-connectivity -->

## 1. Graph representation

Graph G = (V, E). **Directed/undirected**, **weighted/unweighted**. Max edges: undirected simple **V(V−1)/2**; directed **V(V−1)**.

| | **Adjacency Matrix** | **Adjacency List** |
|---|---|---|
| Space | **O(V²)** | **O(V + E)** |
| Edge (u,v) exists? | **O(1)** | O(deg(u)) |
| All neighbours of u | O(V) | **O(deg u)** |
| Add edge | O(1) | O(1) |
| Best for | **Dense** graphs | **Sparse** graphs |

**Undirected list me har edge 2 entries** (u ki list me v, v ki list me u). Matrix undirected me **symmetric**.
**Sink vertex** (in-degree V−1, out-degree 0) adjacency matrix se **O(V)** me dhoondh sakte hain (candidate elimination).

## 2. BFS (Breadth First Search)

Queue; source se level-by-level. **O(V + E)** (list). **Unweighted graph me shortest path (edges count)**.
```
BFS(s): dist[s]=0; enqueue s
  while queue: u = dequeue; for v in adj[u]: if not visited: dist[v]=dist[u]+1; enqueue v
```
**BFS tree** me har vertex ki level = shortest distance. **Bipartite check** (2-colouring by levels). **Connected components count.** State-space search (puzzle) me bhi.
**Example:** edges 1–2, 1–3, 2–4, 3–4, 4–5: BFS from 1: order 1, 2, 3, 4, 5; dist(5) = 3.

## 3. DFS (Depth First Search)

Stack/recursion; jitna gehra ho sake jao, phir backtrack. **O(V + E)**. **Discovery time d[v], finish time f[v]**.

### Edge classification (directed DFS)
- **Tree edge**: DFS tree ka. **Back edge**: descendant → ancestor. **Forward**: ancestor → descendant (non-tree). **Cross**: baaki.
- **Directed graph me cycle ⟺ back edge**. Undirected me cycle ⟺ non-tree edge.
- **Parenthesis theorem:** intervals [d,f] nested ya disjoint.

**Uses:** cycle detection, **topological sort**, **SCC**, **articulation points (cut vertices)**, **bridges**, connected components.
**DFS traversal order adjacency list order par depend.**

**Articulation point:** vertex jiske hatne par graph disconnect (low-link values se O(V+E)). **Bridge:** aisi edge.

## 4. Topological Sort

**DAG** ke vertices ka linear order jisme har edge u → v ke liye u pehle. **Sirf DAG** ke liye.
- **DFS finish time descending** ya **Kahn's algorithm** (indegree 0 vertices queue me; hatate jao). **O(V + E)**.
- **Unique topological order** ⟺ DAG me **Hamiltonian path** (har consecutive pair ke beech edge).
- **Number of topological orders**: har step par available (indegree 0) choices multiply/enumerate.

**Example:** edges A→C, B→C, C→D. Orders: **A B C D, B A C D** (2).
**DAG me longest/shortest path** topological order me relax karke **O(V+E)** (negative edges bhi OK).

## 5. Strongly Connected Components (SCC)

Directed graph: u ↔ v dono taraf pahunch sakein. **SCC ka condensation graph DAG** hota hai.
**Kosaraju:** (1) DFS, finish times; (2) **transpose graph** par finish time descending order me DFS; har DFS tree = ek SCC. **Tarjan** (single DFS, low-link). **O(V + E)**.
**Undirected me connected components** DFS/BFS/Union-Find se O(V+E).

## 6. Shortest Path

### Dijkstra (non-negative weights, single source)
Greedy: **min tentative distance wala vertex finalize**, uske neighbours relax.
- **Array: O(V²)**, **binary heap: O((V+E) log V)**, **Fibonacci heap: O(E + V log V)**.
- **Negative edge par fail.**
- **Unweighted graph par BFS** (linear) better.
- Undirected positive weights par bhi.

**Example:** s→a 4, s→b 1, b→a 2, a→t 1, b→t 5. Dijkstra from s: dist b = 1; a = min(4, 1+2) = 3; t = min(3+1, 1+5) = **4**. Path s→b→a→t.

### Bellman–Ford (negative weights ok)
V−1 baar **saare edges relax**. **O(VE)**. Ek aur pass me improve ho to **negative cycle**. (DP-jaisa.)

### Floyd–Warshall (all pairs) O(V³) (DP chapter me).
### Johnson's: negative weights ke saath sparse graphs par all-pairs: reweighting + Dijkstra.

### Shortest path facts (GATE statements)
- **Edges me constant c add** karne par **shortest path badal sakta hai** (kam edges wala favour), **MST nahi badalta** (relative order same).
- **Sab weights multiply by c>0**: shortest path same.
- MST me do vertices ke beech path **shortest path nahi hota** generally.
- **Distinct weights** ⇒ unique MST (shortest path tree unique nahi zaroori).
- **Dijkstra greedy hai**, Floyd-Warshall DP.
- Shortest path **optimal substructure**: shortest path ka har subpath shortest.

## 7. MST (recap)
Kruskal O(E log E), Prim O(E log V). Detail Greedy chapter me.

## 8. Other graph facts (GATE)
- **Handshaking:** Σ deg = 2E. Tree: E = V − 1. **Connected graph: E ≥ V − 1.** Forest with c components: E = V − c.
- **Bipartite ⟺ no odd cycle ⟺ 2-colourable.**
- **Euler circuit** ⟺ connected + sab degree even; **Euler path** ⟺ exactly 0 ya 2 odd-degree.
- **Complete graph K_n**: n(n−1)/2 edges; spanning trees nⁿ⁻².
- **Planar:** E ≤ 3V − 6.
- **Union-Find (Disjoint Set):** find with **path compression**, union by rank → **near O(α(n))** per op. Kruskal/connectivity ke liye.

## 9. Complexity summary
| Algorithm | Time | Notes |
|---|---|---|
| BFS/DFS | O(V+E) | list; matrix O(V²) |
| Topological sort | O(V+E) | DAG |
| SCC (Kosaraju/Tarjan) | O(V+E) | |
| Dijkstra (heap) | O((V+E)logV) | non-negative |
| Bellman-Ford | O(VE) | negative ok |
| Floyd–Warshall | O(V³) | all pairs |
| Prim (heap) / Kruskal | O(E log V) | MST |

## 10. Quick Revision
- BFS = shortest (unweighted), queue; DFS = stack, back edge = cycle.
- Topological sort: DAG only; DFS finish time descending / Kahn.
- SCC Kosaraju: DFS → transpose → DFS by finish desc.
- Dijkstra: no negative edges; O((V+E) log V).
- Bellman-Ford O(VE); negative cycle detect.
- Adjacency matrix O(V²) space; list O(V+E).
- Constant add: shortest path may change; MST same.

### Practice
1. Directed graph DFS me back edge mila: kya hai? *(Cycle)*
2. DAG: A→B, A→C, B→D, C→D: topological orders kitne? *(A B C D, A C B D = 2)*
3. Dijkstra kis case me galat? *(Negative edge weight)*
4. Undirected graph V = 6, E = 5, connected: tree hai? *(Haan, E = V−1)*
