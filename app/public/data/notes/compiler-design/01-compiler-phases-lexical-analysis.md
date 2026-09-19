# Compiler Phases, Lexical Analysis aur Symbol Table
<!-- topics: compiler-design/compilation-phases, compiler-design/lexical-analysis, compiler-design/compiler-tokenization, compiler-design/symbol-table, compiler-design/assembler, compiler-design/macros, compiler-design/linker -->

## 1. Compiler kya karta hai?

**Compiler** = high-level source program ko **target (machine/assembly) code** me translate karta hai. **Interpreter** line-by-line execute karta hai (translate + run saath me). **Assembler** = assembly → machine code.

**Language processing system:** Source → **Preprocessor** (macros, include) → **Compiler** → Assembly → **Assembler** → Relocatable object → **Linker/Loader** → Executable.

## 2. Phases of a compiler

```
Source ─► Lexical Analysis ─► Syntax Analysis ─► Semantic Analysis ─► Intermediate Code Gen
        (tokens)            (parse tree)       (annotated tree)      (3-address code)
                                                                        │
   Target code ◄─ Code Generation ◄─ Code Optimization ◄────────────────┘
        (Symbol Table + Error Handler sabhi phases ke saath)
```

| Phase | Input → Output | Kaam / errors |
|---|---|---|
| **Lexical (Scanner)** | Characters → **tokens** | Whitespace/comments hatao; **illegal token/character error**; RE/DFA |
| **Syntax (Parser)** | Tokens → **parse/syntax tree** | Grammar (CFG) check; **syntax error** (missing `;`, bracket) |
| **Semantic** | Tree → annotated tree | **Type checking**, undeclared variable, scope; **semantic errors** |
| **Intermediate code** | → **3-address code / IR** | Machine independent |
| **Optimization** | IR → better IR | Speed/size |
| **Code generation** | IR → target code | Register allocation, instruction selection |

**Front end (analysis):** lexical + syntax + semantic + ICG — **source language dependent, machine independent**.
**Back end (synthesis):** optimization + code generation — **machine dependent**.
**Symbol table** aur **error handler** **sabhi phases** se interact.

**Error → phase (GATE):**
- `fro (i=0, i<n, i++)` (keyword galat) → **lexical/syntax**: `fro` identifier ban jaata, phir syntax error (parser me).
- **`int x; x = "abc";`** → **semantic** (type mismatch).
- **Undeclared variable** → semantic.
- **Missing `;` / unmatched `{`** → syntax.
- **Illegal character (@)** → lexical.
- **Type mismatch, wrong function args** → semantic.

**Passes:** ek pass = source ko ek baar padhna. **Single-pass** (fast, kam optimization) vs **multi-pass**. **Cross compiler** (host ≠ target), **bootstrapping**, **T-diagram**.

## 3. Lexical Analysis

**Lexer** = source characters ko **tokens** me todta hai. **Token = (token-name, attribute value)**.
- **Lexeme** = actual character sequence (`count`, `=`, `25`). **Pattern** = rule (regular expression). **Token** = category (id, num, relop).

**Tokens ke type:** keywords, identifiers, literals (numbers/strings), operators, punctuation (delimiters). **Whitespace aur comments** tokens nahi.

### Token counting (GATE numerical)
`printf("i=%d, &i=%x", i, &i);` → tokens: `printf`, `(`, `"i=%d, &i=%x"` (string literal = **ek token**), `,`, `i`, `,`, `&`, `i`, `)`, `;` = **10 tokens**.
`int max(int i);` → `int`, `max`, `(`, `int`, `i`, `)`, `;` = **7**.
`a = b + 1;` → 6 tokens.

**Longest match (maximal munch):** scanner sabse lamba possible lexeme leta (`<=` ek token, `<` `=` do nahi; `iff` identifier, `if` keyword). **Priority rule**: same length par pehle wali rule (keyword rules pehle).

### Specification aur implementation
- Patterns **regular expressions** se; recognition **DFA (transition diagram)** se. **Lex/Flex** tool: RE → DFA.
- **Lexical analyzer ko regular expressions kaafi hain** (CFG nahi chahiye); par **nested comments/brackets** ke liye parser.
- **Keywords lexical phase me pehchane jaate** hain (symbol table lookup se).
- Lexical errors: illegal characters, invalid numbers, unterminated string.
- **Input buffering**: two-buffer scheme (**sentinel**), lookahead.

**Kya lexer ke saath lambe identifiers slow?** Longer identifiers **zyada compile time**, par object program nahi badalta.

## 4. Symbol Table

Data structure jo **identifiers ke attributes** rakhta: naam, **type, scope, storage/address, size, line number**, function ke parameters.
- Operations: **insert, lookup (search), delete/scope exit**. Implementations: **hash table (best, O(1) avg)**, linked list, BST.
- **Scope management:** nested scopes ke liye **stack of tables** ya tree; block exit par delete.
- **Sabhi phases** use karte hain (lexical me insert, semantic me type lookup, codegen me address). Sirf lexical + syntax tak limited nahi.
- Symbol table **variables/attributes** manage karta hai, **memory allocate nahi** karta (allocation runtime/OS).

## 5. Assemblers

**Two-pass assembler:**
- **Pass 1:** **symbol table** banao (labels ke addresses, **location counter LC**), literal table, pseudo-ops (**ORG, EQU, START, END, DS/DC**) process. **Forward references** isliye do pass.
- **Pass 2:** **machine code generate** (opcodes, operands ko symbol table se resolve), object file/relocation info.

**Location counter:** current instruction ka address; har instruction ke baad length se badhta.

**One-pass assembler:** forward reference **backpatching** se (ya sirf backward refs allow).

**Pass assignment (GATE):** **Symbol table = pass 1; object code generation = pass 2; literal pool allocation = pass 1; macro expansion = pass 1 (macro preprocessor).**

## 6. Macros

**Macro** = naam wala code block; call par **text substitution (expansion)**, function call nahi (no call overhead, code size badhta).
- **Macro definition:** `MACRO ADD x, y ... MEND`; **formal parameters** (x, y) → call par **actual parameters**.
- **Macro expansion pass 1 me** (pehle expand phir baaki processing), isliye macro processor **pehle**.
- **Conditional macro expansion** (`.IF`, `.WHILE`) **assembly time** par condition test (runtime nahi). **Recursive macros infinite loop** kar sakte agar condition kabhi false na ho.
- **C preprocessor macros:** `#define SQ(x) x*x` → `SQ(a+1)` = `a+1*a+1` (parentheses).

## 7. Linkers aur Loaders

- **Linker (link editor):** alag-alag **object modules** ko jodta, **external references resolve**, **relocation**; output executable.
- **Loader:** executable ko **memory me load**, **relocation** (agar load address alag), execution shuru. **Loader hamesha memory me** resident (bootstrap).
- **Static linking**: link time par library executable me. **Dynamic linking (DLL/.so):** run time par; **fayde:** kam memory (shared library), update easy; **nuksan:** security (library search path runtime tak pata nahi), slight overhead.
- **Relocation constants:** modules lengths ke cumulative sum: modules of length 100, 200, 50 loaded from 0 → **0, 100, 300**.
- **Absolute loader**, **relocating loader**, **direct-linking loader**, **dynamic loading** (routine call par load).
- **Link-load-and-go** scheme: kam storage nahi, har baar linking.

## 8. Quick Revision
- Phases: lexical → syntax → semantic → ICG → optimize → codegen; front end = source dependent.
- Lexical: tokens/lexemes/pattern, maximal munch, RE/DFA; string literal = 1 token.
- Type check = semantic. Missing `;` = syntax. Illegal char = lexical.
- Symbol table: sabhi phases, hash table; memory allocate nahi karta.
- Assembler: pass 1 symbol table, pass 2 object code.
- Macro expansion pass 1; conditional expansion assembly time.
- Dynamic linking: shared libs, security concern.

### Practice
1. `x = y * (z + 1);` tokens? *(x = y * ( z + 1 ) ; = 10)*
2. Type mismatch kis phase me? *(Semantic)*
3. Forward reference ki wajah se assembler me kya? *(Two passes)*
4. Modules 40, 60, 100 load at 200: relocation constants? *(200, 240, 300)*
