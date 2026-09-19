# Compiler Design: Master Tables, Traps aur GATE Strategy
<!-- topics: compiler-design/parsing, compiler-design/lr-parser, compiler-design/first-and-follow, compiler-design/syntax-directed-translation, compiler-design/code-optimization -->

## 1. Phases ek nazar me
Lexical (tokens, RE/DFA) → Syntax (parse tree, CFG) → Semantic (types) → ICG (TAC) → Optimization → Code generation. Symbol table + error handler har phase me.
Front end = source dependent; back end = machine dependent.

## 2. Parser comparison

| | LL(1) | LR(0) | SLR(1) | LALR(1) | CLR(1) |
|---|---|---|---|---|---|
| Direction | Top-down | Bottom-up | Bottom-up | Bottom-up | Bottom-up |
| Derivation | LMD | rev. RMD | rev. RMD | rev. RMD | rev. RMD |
| Lookahead | 1 | 0 | FOLLOW | Merged LR(1) | Exact |
| States | - | n | n | n (= LR(0)) | ≥ n |
| Left recursion | ✗ | ✓ | ✓ | ✓ | ✓ |
| Power | Least | Low | ↑ | ↑↑ | Most |

**LR(0) < SLR(1) < LALR(1) < CLR(1);  LL(1) ⊂ LR(1);  LR(1) ≡ DCFL.**
LALR merge ⇒ R/R conflict ho sakta, S/R nahi.

## 3. Formulas / rules
- **Left recursion:** A → Aα|β ⇒ A → βA′, A′ → αA′|ε.
- **FOLLOW:** $ in FOLLOW(S); B → αAβ: FIRST(β)−ε ⊆ FOLLOW(A); β nullable/end: FOLLOW(B) ⊆ FOLLOW(A).
- **LL(1) table:** a ∈ FIRST(α) → M[A,a]; ε ∈ FIRST(α) → FOLLOW(A) cells.
- **SLR reduce:** A→α• on FOLLOW(A).
- **Leaders:** first instr, jump target, instr after jump; #blocks = #leaders.
- **Live variable:** IN = use ∪ (OUT − def) (backward, ∪). **Available expressions:** forward, ∩.
- **Horner:** 2n ops. **Sethi–Ullman:** equal labels ⇒ +1.
- **Token count:** string literal = 1 token; whitespace/comments 0.
- **CNF steps 2n−1; GNF n.**

## 4. SDT
Synthesized (children) vs inherited (parent/left siblings). S-attributed ⊂ L-attributed. Postfix SDT: reduce par action.

## 5. Runtime
Static allocation (no recursion), stack (AR: params, return, control link, access link, saved regs, locals), heap (dynamic lifetime).
Static (lexical) vs dynamic scope. Call by value/reference/copy-restore/name.
Activation tree: call sequence = preorder.

## 6. Top 20 Traps
1. Type error = semantic (syntax nahi).
2. String literal ek token.
3. Two-pass assembler: forward reference.
4. Macro expansion pass 1; conditional expansion assembly time.
5. LL(1) ke liye left recursion + left factoring dono.
6. FOLLOW me ε nahi; start ke FOLLOW me $.
7. LL(1) table cell me 2 productions ⇒ not LL(1).
8. Ambiguous grammar ⇒ na LL na LR.
9. SLR vs LALR vs CLR power/states.
10. LALR: R/R conflict naya, S/R nahi.
11. Handle/viable prefix definitions.
12. Predictive parser top-down.
13. S-attributed bottom-up; L-attributed top-down/LL.
14. Inherited attribute right sibling se nahi.
15. Quads vs triples (result explicit vs position).
16. DAG: versions after redefinition.
17. Recursion ⇒ stack; unknown-size arrays ⇒ heap.
18. Static vs dynamic scope output.
19. Call by name ≠ reference.
20. Live variable analysis backward.

## 7. GATE strategy (CD)
1. **Grammar sawal:** FIRST/FOLLOW table me likho, iterate.
2. **LR items:** closure/goto step by step; states count.
3. **Parsing table trace** with stack.
4. **Code snippets:** TAC/leaders/DAG/liveness ke liye instructions number karo.
5. **Concept statements:** phase mapping (front/back, lexical/syntax/semantic).

## 8. Practice order (web app)
Subjects → Compiler Design: **Grammar/Parsing → First & Follow → LR parser → SDT → Runtime environment → Intermediate code → Code optimization**.
