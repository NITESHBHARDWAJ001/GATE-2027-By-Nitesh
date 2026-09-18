import { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { getAllSubjectsWithTopics } from '../lib/api'
import { getAllMastery } from '../lib/progress'
import { useStoreVersion } from '../lib/useStoreVersion'
import { PriorityBadge } from '../components/Badges'

function StatCard({ label, value, sub, accent }) {
  return (
    <div
      className="rounded-2xl p-4"
      style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}
    >
      <div className="text-2xl font-semibold" style={{ color: accent ? 'var(--accent)' : 'var(--text)' }}>
        {value}
      </div>
      <div className="text-sm" style={{ color: 'var(--text-muted)' }}>{label}</div>
      {sub && <div className="mt-1 text-xs" style={{ color: 'var(--text-faint)' }}>{sub}</div>}
    </div>
  )
}

export default function Dashboard() {
  const [subjects, setSubjects] = useState(null)
  useStoreVersion()

  useEffect(() => {
    getAllSubjectsWithTopics().then(setSubjects)
  }, [])

  const stats = useMemo(() => {
    if (!subjects) return null
    let totalTopics = 0, totalPyqs = 0, notesReady = 0
    const priorityCount = { P1: 0, P2: 0, P3: 0, P4: 0 }
    for (const s of subjects) {
      for (const t of s.topics) {
        totalTopics++
        totalPyqs += t.pyqCountExtracted || 0
        if (t.priority) priorityCount[t.priority] = (priorityCount[t.priority] || 0) + 1
        if (t.status === 'PATTERN_COMPLETE') notesReady++
      }
    }
    const mastery = getAllMastery()
    const masteredCount = Object.values(mastery).filter((m) => m === 'MASTERED').length
    return { totalTopics, totalPyqs, notesReady, priorityCount, masteredCount, subjectCount: subjects.length }
  }, [subjects])

  if (!subjects) {
    return <div style={{ color: 'var(--text-muted)' }}>Loading knowledge base…</div>
  }

  const sortedSubjects = [...subjects].sort((a, b) => {
    const aReady = a.topics.filter((t) => t.status === 'PATTERN_COMPLETE').length
    const bReady = b.topics.filter((t) => t.status === 'PATTERN_COMPLETE').length
    return bReady / (b.topics.length || 1) - aReady / (a.topics.length || 1)
  })

  return (
    <div className="mx-auto max-w-6xl space-y-8">
      <div>
        <h1 className="text-2xl font-semibold" style={{ color: 'var(--text)' }}>GATE CSE 2027</h1>
        <p className="mt-1 text-sm" style={{ color: 'var(--text-muted)' }}>
          PYQ-driven prep system — {stats.subjectCount} subjects, {stats.totalTopics} topics tracked, {stats.totalPyqs.toLocaleString()} PYQs indexed from the source corpus.
        </p>
      </div>

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
        <StatCard label="Subjects" value={stats.subjectCount} />
        <StatCard label="Topics tracked" value={stats.totalTopics} />
        <StatCard label="PYQs indexed" value={stats.totalPyqs.toLocaleString()} />
        <StatCard label="Notes ready" value={`${stats.notesReady}/${stats.totalTopics}`} accent sub="pattern-mined & complete" />
        <StatCard label="Mastered by you" value={stats.masteredCount} accent sub="across all topics" />
      </div>

      <div>
        <h2 className="mb-2 text-sm font-semibold uppercase tracking-wide" style={{ color: 'var(--text-faint)' }}>
          Priority distribution
        </h2>
        <div className="flex flex-wrap gap-2">
          {(['P1', 'P2', 'P3', 'P4']).map((p) => (
            <div key={p} className="flex items-center gap-2 rounded-xl px-3 py-2" style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}>
              <PriorityBadge priority={p} compact />
              <span className="text-sm font-medium" style={{ color: 'var(--text)' }}>{stats.priorityCount[p] || 0} topics</span>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h2 className="mb-3 text-sm font-semibold uppercase tracking-wide" style={{ color: 'var(--text-faint)' }}>
          Subjects
        </h2>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {sortedSubjects.map((s) => {
            const ready = s.topics.filter((t) => t.status === 'PATTERN_COMPLETE').length
            const total = s.topics.length
            const pct = total ? Math.round((ready / total) * 100) : 0
            const p1Count = s.topics.filter((t) => t.priority === 'P1').length
            return (
              <Link
                key={s.subjectId}
                to={`/subjects/${s.subjectId}`}
                className="group rounded-2xl p-4 transition-transform hover:-translate-y-0.5"
                style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}
              >
                <div className="flex items-start justify-between gap-2">
                  <h3 className="font-medium leading-snug" style={{ color: 'var(--text)' }}>
                    {s.overview?.name || s.subjectId}
                  </h3>
                  <span className="shrink-0 text-xs" style={{ color: 'var(--text-faint)' }}>{total} topics</span>
                </div>
                <div className="mt-2 text-xs" style={{ color: 'var(--text-muted)' }}>
                  {s.overview?.totalPyqsExtracted?.toLocaleString() || 0} PYQs · {p1Count} P1 topics
                </div>
                <div className="mt-3 h-1.5 w-full overflow-hidden rounded-full" style={{ background: 'var(--surface-2)' }}>
                  <div className="h-full rounded-full" style={{ width: `${pct}%`, background: 'var(--accent)' }} />
                </div>
                <div className="mt-1 text-xs" style={{ color: 'var(--text-faint)' }}>{ready}/{total} notes ready ({pct}%)</div>
              </Link>
            )
          })}
        </div>
      </div>
    </div>
  )
}
