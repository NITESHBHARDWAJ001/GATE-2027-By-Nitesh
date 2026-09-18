# GATE CSE 2027 Knowledge Base — Content Generation Progress

**Last updated:** 2026-09-18

## Status: ALL 464 topics complete: P1 64/64, P2 80/80, P3 266/266, P4 54/54

Each completed topic has a full set of files under `GATE_CSE/subjects/<subject>/<topic>/`:
`topic.json`, `concepts.json`, `patterns.json`, `pyqs.json` (with `patternId`), `practice.json` (AI-GENERATED, labeled), `revision.json`, `mistakes.json`.
Every P1 topic is `status: PATTERN_COMPLETE` in its subject's `topics.json`.

### Done (P1)
- **Discrete Math:** set-theory, relations, functions, group-theory, propositional-logic, first-order-logic, graph-connectivity, combinatory
- **Programming:** programming-in-c, recursion, pointers; data structures (stack, queue, linked-list, binary-tree, binary-search-tree, binary-heap)
- **Algorithms:** asymptotic-notations, recurrence-relation, time-complexity, sorting, quick-sort, graph-search, minimum-spanning-tree, identify-function
- **TOC:** regular-language, finite-automata, minimal-state-automata, regular-expression, context-free-language, pushdown-automata, identify-class-language, decidability
- **Compiler Design:** grammar, lr-parser, syntax-directed-translation
- **CO & Architecture:** cache-memory, machine-instruction, pipelining
- **Digital Logic:** number-representation, boolean-algebra, digital-counter, min-sum-of-products-form
- **Operating System:** process-scheduling, process-synchronization, virtual-memory, page-replacement, resource-allocation, disk-scheduling
- **Databases:** database-normalization, sql, relational-algebra, b-tree, transaction-and-concurrency, indexing
- **Computer Networks:** subnetting, tcp
- **Engineering Maths:** eigen-value, matrix, system-of-equations, probability, expectation, limits
- **General Aptitude:** most-appropriate-word

### Done (P2)
All 80 P2 topics across every subject (OS 5, Databases 3, Algorithms 7, CO 8, Compiler 7, Networks 12, Digital Logic 6, Discrete Math 5, Calculus 3, Linear Algebra 3, Probability 5, DS 2, C 5, TOC 2, General Aptitude 7). P2 notes are more compact than P1 (2-3 patterns per topic).

### Done (P3)
All 266 P3 topics have compact single-pattern notes (all of the topic's PYQs mapped to one pattern, 1 AI practice question each). These are lighter than P1/P2. General Aptitude quantitative topics (46) were written from standard concepts without a per-question read of the PYQs, so treat them as generic revision notes; the practice items are AI-written and unverified.

### Done (P4)
All 54 P4 topics have compact single-pattern notes like P3 (1-2 PYQs each).

### Remaining
- Nothing left in topic coverage. Possible next work: verify AI practice answers, fill figure/equation gaps from the source PDFs, parse the ~140 header-unparsed PYQs, improve GA coverage, and improve app search. Their `topics.json` status is `NOT_STARTED`; the PYQs are still browsable in each subject's `pyqs.json` and the app.
- Resume recipe: dump the topic's PYQs from `subjects/<subject>/pyqs.json` by `topicSlug`, cluster into patterns, write a generator using `Gen` (see scratchpad `gcommon.py`, `gen_norm.py`), run `finalize_topic.py <subject> <topic>`.

### Known data limitations
- Text-only extraction: many equations, matrices, figures, circuit and automata diagrams are blank in the extracted question text; answer keys are preserved but questions may need the source PDF.
- About 140 PYQs (~3.7%) were not header-parsed; some stray/misfiled PYQs are deliberately unmapped to patterns.
- General Aptitude coverage is partial.
- Answers for some descriptive / old questions are N/A in the source.

### Quality pass (latest)
- App search rebuilt: index of topics, patterns, concept notes and all PYQs (built by scripts/sync-data.mjs into public/data/search-index.json); filters by type, subject, priority, PYQ year; deep links open the right tab/pattern.
- Cache Memory: 18 unmapped PYQs now mapped (69/69).
- Every P2 topic now has at least 2 practice questions (answers hand-checked).
- Still thin: P3/P4 topics (1 practice question, short notes); GA quantitative notes are generic (PYQs not read one by one).
- 3 misfiled PYQs deliberately unmapped: relations 4.12.14, binary-heap 3.4.1, linked-list 3.10.2.
