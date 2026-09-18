import { useEffect, useMemo, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { getSearchIndex } from '../lib/api'
import { PriorityBadge } from '../components/Badges'

const KINDS = [
  { id: 'all', label: 'All' },
  { id: 'topic', label: 'Topics' },
  { id: 'pattern', label: 'Patterns' },
  { id: 'chapter', label: 'Study notes' },
  { id: 'note', label: 'Concept summary' },
  { id: 'pyq', label: 'PYQs' },
]
const KIND_LABEL = { topic: 'Topic', pattern: 'Pattern', note: 'Concept summary', chapter: 'Study notes', pyq: 'PYQ' }
const KIND_WEIGHT = { topic: 40, chapter: 30, pattern: 25, note: 12, pyq: 8 }
const MAX_SHOWN = 60

const norm = (s) => String(s ?? '').toLowerCase()

function tokenize(q) {
  return norm(q).split(/[^a-z0-9+#.]+/).filter(Boolean)
}

function scoreEntry(e, tokens, phrase) {
  const title = e._title, text = e._text, meta = e._meta
  let score = 0
  for (const t of tokens) {
    let s = 0
    if (title.includes(t)) s += 30
    if (meta.includes(t)) s += 10
    if (text.includes(t)) s += 4
    if (e.id && norm(e.id) === t) s += 60
    if (s === 0) return 0 // every token must match somewhere
    score += s
  }
  if (tokens.length > 1 && (title.includes(phrase) || text.includes(phrase))) score += 25
  return score + KIND_WEIGHT[e.k] + (e.pr === 'P1' ? 6 : e.pr === 'P2' ? 3 : 0)
}

function snippet(text, tokens, len = 200) {
  const low = norm(text)
  let at = -1
  for (const t of tokens) {
    const i = low.indexOf(t)
    if (i >= 0 && (at < 0 || i < at)) at = i
  }
  if (at < 0) return text.slice(0, len)
  const start = Math.max(0, at - 50)
  return (start > 0 ? '…' : '') + text.slice(start, start + len) + (start + len < text.length ? '…' : '')
}

function Highlight({ text, tokens }) {
  if (!tokens.length) return text
  const escaped = tokens.map((t) => t.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'))
  const re = new RegExp('(' + escaped.join('|') + ')', 'gi')
  return text.split(re).map((part, i) =>
    i % 2 === 1 ? (
      <mark key={i} className="rounded px-0.5" style={{ background: 'rgba(250,204,21,.35)', color: 'inherit' }}>{part}</mark>
    ) : (
      part
    )
  )
}

function linkFor(e) {
  if (e.k === 'chapter') return `/notes/${e.s}/${e.p}`
  const base = `/subjects/${e.s}/${e.p}`
  if (e.k === 'topic') return base
  if (e.k === 'note') return `${base}?tab=concepts`
  if (e.k === 'pattern') return `${base}?tab=patterns&pattern=${encodeURIComponent(e.id)}`
  return `${base}?tab=patterns`
}

export default function SearchPage() {
  const [params, setParams] = useSearchParams()
  const q = params.get('q') || ''
  const kind = params.get('kind') || 'all'
  const subject = params.get('subject') || ''
  const year = params.get('year') || ''
  const prio = params.get('prio') || ''
  const [input, setInput] = useState(q)
  const [index, setIndex] = useState(null)

  useEffect(() => {
    getSearchIndex().then((idx) => {
      const prepared = (idx || []).map((e) => ({
        ...e,
        _title: norm(e.title),
        _text: norm(e.text),
        _meta: norm(`${e.sn} ${e.tn} ${e.p} ${e.tags || ''} ${e.id || ''}`),
      }))
      setIndex(prepared)
    })
  }, [])
  useEffect(() => setInput(q), [q])

  function update(patch) {
    const next = { q, kind, subject, year, prio, ...patch }
    for (const k of Object.keys(next)) if (!next[k] || next[k] === 'all') delete next[k]
    setParams(next)
  }

  const subjects = useMemo(() => {
    if (!index) return []
    const m = new Map()
    for (const e of index) m.set(e.s, e.sn)
    return [...m].sort((a, b) => a[1].localeCompare(b[1]))
  }, [index])

  const tokens = useMemo(() => tokenize(q), [q])

  const { results, counts, total } = useMemo(() => {
    if (!index || tokens.length === 0) return { results: [], counts: {}, total: 0 }
    const phrase = tokens.join(' ')
    const scored = []
    const counts = { all: 0, topic: 0, pattern: 0, note: 0, chapter: 0, pyq: 0 }
    for (const e of index) {
      if (subject && e.s !== subject) continue
      if (prio && e.pr !== prio) continue
      if (year && !(e.k === 'pyq' && String(e.y) === year)) continue
      const sc = scoreEntry(e, tokens, phrase)
      if (!sc) continue
      counts.all++
      counts[e.k]++
      if (kind === 'all' || kind === e.k) scored.push([sc, e])
    }
    scored.sort((a, b) => b[0] - a[0])
    return { results: scored.slice(0, MAX_SHOWN).map((x) => x[1]), counts, total: scored.length }
  }, [index, tokens, kind, subject, year, prio])

  function onSubmit(e) {
    e.preventDefault()
    update({ q: input.trim() })
  }

  const boxStyle = { background: 'var(--surface)', border: '1px solid var(--border)', color: 'var(--text)' }

  return (
    <div className="mx-auto max-w-3xl">
      <h1 className="mb-4 text-2xl font-semibold" style={{ color: 'var(--text)' }}>Search</h1>
      <form onSubmit={onSubmit} className="mb-3">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Try: nand gate, lru, precedence graph, 2NF, hinglish words…"
          className="w-full rounded-xl px-4 py-2.5 text-sm outline-none"
          style={boxStyle}
          autoFocus
        />
      </form>

      <div className="mb-4 flex flex-wrap items-center gap-2">
        {KINDS.map((k) => (
          <button
            key={k.id}
            onClick={() => update({ kind: k.id })}
            className="rounded-full px-3 py-1 text-xs font-medium"
            style={kind === k.id ? { background: '#6366f1', color: '#fff' } : boxStyle}
          >
            {k.label}
            {q.trim() && counts[k.id] != null ? ` (${counts[k.id]})` : ''}
          </button>
        ))}
        <select value={subject} onChange={(e) => update({ subject: e.target.value })} className="rounded-lg px-2 py-1 text-xs" style={boxStyle}>
          <option value="">All subjects</option>
          {subjects.map(([id, name]) => (
            <option key={id} value={id}>{name}</option>
          ))}
        </select>
        <select value={prio} onChange={(e) => update({ prio: e.target.value })} className="rounded-lg px-2 py-1 text-xs" style={boxStyle}>
          <option value="">Any priority</option>
          {['P1', 'P2', 'P3', 'P4'].map((p) => (
            <option key={p} value={p}>{p}</option>
          ))}
        </select>
        <input
          value={year}
          onChange={(e) => update({ year: e.target.value.replace(/\D/g, '').slice(0, 4) })}
          placeholder="PYQ year"
          inputMode="numeric"
          className="w-24 rounded-lg px-2 py-1 text-xs outline-none"
          style={boxStyle}
        />
      </div>

      {!index && <div style={{ color: 'var(--text-muted)' }}>Loading search index…</div>}

      {index && tokens.length === 0 && (
        <div className="rounded-xl px-4 py-8 text-center text-sm" style={{ background: 'var(--surface)', border: '1px dashed var(--border)', color: 'var(--text-faint)' }}>
          Topics, patterns, concept notes (Hinglish bhi) aur {index.filter((e) => e.k === 'pyq').length.toLocaleString()} PYQs me search karo. Year filter se kisi saal ke questions bhi dekh sakte ho.
        </div>
      )}

      {index && tokens.length > 0 && (
        <div className="mb-3 text-xs" style={{ color: 'var(--text-faint)' }}>
          {total} result{total === 1 ? '' : 's'} for "{q}"{total > MAX_SHOWN ? ` — showing top ${MAX_SHOWN}` : ''}
        </div>
      )}

      <div className="space-y-2">
        {results.map((e, i) => (
          <Link
            key={`${e.k}-${e.s}-${e.p}-${e.id || ''}-${i}`}
            to={linkFor(e)}
            className="block rounded-xl px-4 py-3 transition-colors hover:opacity-90"
            style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}
          >
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="rounded px-1.5 py-0.5 text-[10px] font-semibold uppercase tracking-wide" style={{ background: 'rgba(128,128,128,.15)', color: 'var(--text-muted)' }}>
                    {KIND_LABEL[e.k]}
                  </span>
                  <span className="font-medium" style={{ color: 'var(--text)' }}>
                    <Highlight text={e.title} tokens={tokens} />
                  </span>
                </div>
                <div className="mt-0.5 text-xs" style={{ color: 'var(--text-faint)' }}>
                  {e.sn} › {e.tn}
                  {e.k === 'pyq' && e.qt ? ` · ${e.qt}` : ''}
                </div>
              </div>
              {e.pr && <PriorityBadge priority={e.pr} compact />}
            </div>
            {e.k !== 'topic' && e.text && (
              <div className="mt-1.5 text-[13px] leading-snug" style={{ color: 'var(--text-muted)' }}>
                <Highlight text={snippet(e.text, tokens)} tokens={tokens} />
              </div>
            )}
          </Link>
        ))}
        {index && tokens.length > 0 && results.length === 0 && (
          <div className="rounded-xl px-4 py-8 text-center text-sm" style={{ background: 'var(--surface)', border: '1px dashed var(--border)', color: 'var(--text-faint)' }}>
            Kuch nahi mila. Chhota ya alag word try karo, ya filters hata do.
          </div>
        )}
      </div>
    </div>
  )
}
