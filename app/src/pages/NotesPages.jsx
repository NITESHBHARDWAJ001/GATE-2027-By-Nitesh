import { useEffect, useMemo, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { getNotesIndex, getNoteText } from '../lib/api'

const card = { background: 'var(--surface)', border: '1px solid var(--border)' }

export function NotesHome() {
  const { subjectKey } = useParams()
  const [index, setIndex] = useState(null)
  useEffect(() => { getNotesIndex().then((d) => setIndex(d || [])) }, [])
  if (!index) return <div style={{ color: 'var(--text-muted)' }}>Loading notes…</div>

  const subject = subjectKey ? index.find((s) => s.key === subjectKey) : null

  if (subject) {
    const total = subject.chapters.reduce((n, c) => n + c.minutes, 0)
    return (
      <div className="mx-auto max-w-3xl">
        <Link to="/notes" className="text-xs" style={{ color: 'var(--text-faint)' }}>← All notes</Link>
        <h1 className="mt-2 text-2xl font-semibold" style={{ color: 'var(--text)' }}>{subject.emoji} {subject.title}</h1>
        <p className="mt-1 text-sm" style={{ color: 'var(--text-muted)' }}>{subject.description}</p>
        <div className="mt-1 text-xs" style={{ color: 'var(--text-faint)' }}>{subject.chapters.length} chapters · about {total} min reading</div>
        <ol className="mt-5 space-y-2">
          {subject.chapters.map((c, i) => (
            <li key={c.id}>
              <Link to={`/notes/${subject.key}/${c.id}`} className="flex items-center justify-between gap-3 rounded-xl px-4 py-3 hover:opacity-90" style={card}>
                <div className="flex items-center gap-3">
                  <span className="w-6 text-right font-mono text-xs" style={{ color: 'var(--text-faint)' }}>{i + 1}</span>
                  <span className="font-medium" style={{ color: 'var(--text)' }}>{c.title.replace(/^Chapter\s*\d+\s*[:\-–—]\s*/i, '')}</span>
                </div>
                <span className="shrink-0 text-xs" style={{ color: 'var(--text-faint)' }}>{c.minutes} min</span>
              </Link>
            </li>
          ))}
        </ol>
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-3xl">
      <h1 className="text-2xl font-semibold" style={{ color: 'var(--text)' }}>📝 In-depth Notes</h1>
      <p className="mt-1 text-sm" style={{ color: 'var(--text-muted)' }}>
        Hinglish me poore syllabus ke notes: concepts, formulas, solved examples, GATE traps. Padho, phir seedha PYQs solve karo.
      </p>
      {index.length === 0 && <div className="mt-6 text-sm" style={{ color: 'var(--text-faint)' }}>Notes abhi add ho rahe hain.</div>}
      <div className="mt-5 grid gap-3 sm:grid-cols-2">
        {index.map((s) => (
          <Link key={s.key} to={`/notes/${s.key}`} className="rounded-2xl p-4 hover:opacity-90" style={card}>
            <div className="text-2xl">{s.emoji}</div>
            <div className="mt-1 font-semibold" style={{ color: 'var(--text)' }}>{s.title}</div>
            <div className="mt-1 text-xs" style={{ color: 'var(--text-muted)' }}>{s.description}</div>
            <div className="mt-2 text-xs" style={{ color: 'var(--text-faint)' }}>
              {s.chapters.length} chapters · ~{s.chapters.reduce((n, c) => n + c.minutes, 0)} min
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}

export function NoteChapter() {
  const { subjectKey, chapterId } = useParams()
  const [index, setIndex] = useState(null)
  const [text, setText] = useState(null)

  useEffect(() => { getNotesIndex().then((d) => setIndex(d || [])) }, [])
  const subject = index?.find((s) => s.key === subjectKey)
  const pos = subject ? subject.chapters.findIndex((c) => c.id === chapterId) : -1
  const chapter = pos >= 0 ? subject.chapters[pos] : null

  useEffect(() => {
    setText(null)
    if (chapter) getNoteText(subjectKey, chapter.file).then((t) => { setText(t ?? ''); window.scrollTo(0, 0) })
  }, [subjectKey, chapter?.file])

  const headings = useMemo(
    () => (text || '').split('\n').filter((l) => /^##\s/.test(l) && !/^###/.test(l)).map((l) => l.replace(/^##\s+/, '')),
    [text]
  )

  if (!index) return <div style={{ color: 'var(--text-muted)' }}>Loading…</div>
  if (!chapter) return <div style={{ color: 'var(--text-muted)' }}>Chapter nahi mila. <Link to="/notes" className="underline">Notes home</Link></div>

  const prev = subject.chapters[pos - 1], next = subject.chapters[pos + 1]

  return (
    <div className="mx-auto max-w-3xl">
      <Link to={`/notes/${subject.key}`} className="text-xs" style={{ color: 'var(--text-faint)' }}>← {subject.title} · chapter {pos + 1}/{subject.chapters.length} · {chapter.minutes} min</Link>

      {chapter.topics.length > 0 && (
        <div className="mt-3 flex flex-wrap items-center gap-2 text-xs">
          <span style={{ color: 'var(--text-faint)' }}>PYQs practise karo:</span>
          {chapter.topics.map((t) => (
            <Link key={t} to={`/subjects/${t}`} className="rounded-full px-2.5 py-1" style={card}>{t.split('/')[1]?.replace(/-/g, ' ') || t}</Link>
          ))}
        </div>
      )}

      {headings.length > 2 && (
        <details className="mt-4 rounded-xl px-4 py-3 text-sm" style={card}>
          <summary className="cursor-pointer font-medium" style={{ color: 'var(--text)' }}>In this chapter</summary>
          <ol className="mt-2 list-decimal space-y-0.5 pl-5" style={{ color: 'var(--text-muted)' }}>
            {headings.map((h) => <li key={h}>{h}</li>)}
          </ol>
        </details>
      )}

      <article className="notes-md mt-4">
        {text === null ? <div style={{ color: 'var(--text-muted)' }}>Loading chapter…</div> : <ReactMarkdown remarkPlugins={[remarkGfm]}>{text}</ReactMarkdown>}
      </article>

      <div className="mt-10 flex items-stretch justify-between gap-3">
        {prev ? <Link to={`/notes/${subject.key}/${prev.id}`} className="flex-1 rounded-xl px-4 py-3 text-sm" style={card}><div className="text-xs" style={{ color: 'var(--text-faint)' }}>← Previous</div>{prev.title}</Link> : <span className="flex-1" />}
        {next ? <Link to={`/notes/${subject.key}/${next.id}`} className="flex-1 rounded-xl px-4 py-3 text-right text-sm" style={card}><div className="text-xs" style={{ color: 'var(--text-faint)' }}>Next →</div>{next.title}</Link> : <span className="flex-1" />}
      </div>
    </div>
  )
}
