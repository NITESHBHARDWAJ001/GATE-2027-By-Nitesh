import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { getAllSubjectsWithTopics } from '../lib/api'

export default function SubjectsList() {
  const [subjects, setSubjects] = useState(null)

  useEffect(() => {
    getAllSubjectsWithTopics().then((list) => {
      list.sort((a, b) => (a.overview?.name || '').localeCompare(b.overview?.name || ''))
      setSubjects(list)
    })
  }, [])

  if (!subjects) return <div style={{ color: 'var(--text-muted)' }}>Loading…</div>

  return (
    <div className="mx-auto max-w-5xl">
      <h1 className="mb-1 text-2xl font-semibold" style={{ color: 'var(--text)' }}>All Subjects</h1>
      <p className="mb-6 text-sm" style={{ color: 'var(--text-muted)' }}>{subjects.length} subjects from the GATE CSE syllabus</p>

      <div className="overflow-hidden rounded-2xl" style={{ border: '1px solid var(--border)', background: 'var(--surface)' }}>
        {subjects.map((s, i) => {
          const total = s.topics.length
          const ready = s.topics.filter((t) => t.status === 'PATTERN_COMPLETE').length
          const p1 = s.topics.filter((t) => t.priority === 'P1').length
          return (
            <Link
              key={s.subjectId}
              to={`/subjects/${s.subjectId}`}
              className="flex items-center justify-between gap-4 px-4 py-3 transition-colors hover:opacity-90"
              style={{ borderTop: i === 0 ? 'none' : '1px solid var(--border)' }}
            >
              <div>
                <div className="font-medium" style={{ color: 'var(--text)' }}>{s.overview?.name || s.subjectId}</div>
                <div className="text-xs" style={{ color: 'var(--text-faint)' }}>
                  {s.overview?.totalPyqsExtracted?.toLocaleString() || 0} PYQs · {total} topics · {p1} P1
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="hidden w-32 sm:block">
                  <div className="h-1.5 w-full overflow-hidden rounded-full" style={{ background: 'var(--surface-2)' }}>
                    <div
                      className="h-full rounded-full"
                      style={{ width: `${total ? (ready / total) * 100 : 0}%`, background: 'var(--accent)' }}
                    />
                  </div>
                </div>
                <span className="text-xs tabular-nums" style={{ color: 'var(--text-faint)' }}>{ready}/{total}</span>
              </div>
            </Link>
          )
        })}
      </div>
    </div>
  )
}
