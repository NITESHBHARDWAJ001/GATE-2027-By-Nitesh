import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { getSubjectOverview, getSubjectTopics } from '../lib/api'
import { getMastery } from '../lib/progress'
import { useStoreVersion } from '../lib/useStoreVersion'
import { PriorityBadge, ContentStatusBadge, MasteryBadge } from '../components/Badges'

const PRIORITY_ORDER = { P1: 0, P2: 1, P3: 2, P4: 3 }

export default function SubjectPage() {
  const { subjectId } = useParams()
  const [overview, setOverview] = useState(null)
  const [topics, setTopics] = useState(null)
  const [filter, setFilter] = useState('ALL')
  useStoreVersion()

  useEffect(() => {
    setOverview(null)
    setTopics(null)
    getSubjectOverview(subjectId).then(setOverview)
    getSubjectTopics(subjectId).then((t) => {
      const sorted = [...(t || [])].sort(
        (a, b) => (PRIORITY_ORDER[a.priority] ?? 9) - (PRIORITY_ORDER[b.priority] ?? 9) || b.pyqCountExtracted - a.pyqCountExtracted
      )
      setTopics(sorted)
    })
  }, [subjectId])

  if (!overview || !topics) return <div style={{ color: 'var(--text-muted)' }}>Loading…</div>

  const filtered = filter === 'ALL' ? topics : topics.filter((t) => t.priority === filter)

  return (
    <div className="mx-auto max-w-5xl">
      <Link to="/subjects" className="text-xs" style={{ color: 'var(--text-faint)' }}>← All subjects</Link>
      <h1 className="mt-1 text-2xl font-semibold" style={{ color: 'var(--text)' }}>{overview.name}</h1>
      <p className="mt-1 text-sm" style={{ color: 'var(--text-muted)' }}>
        {overview.totalPyqsExtracted?.toLocaleString()} PYQs across {overview.totalTopics} topics · source: {overview.sourcePdf}
      </p>

      <div className="mt-4 flex flex-wrap gap-2">
        {['ALL', 'P1', 'P2', 'P3', 'P4'].map((p) => (
          <button
            key={p}
            onClick={() => setFilter(p)}
            className="rounded-full px-3 py-1 text-xs font-medium transition-colors"
            style={{
              background: filter === p ? 'var(--accent)' : 'var(--surface)',
              color: filter === p ? '#fff' : 'var(--text-muted)',
              border: '1px solid var(--border)',
            }}
          >
            {p === 'ALL' ? `All (${topics.length})` : `${p} (${overview.priorityDistribution?.[p] ?? 0})`}
          </button>
        ))}
      </div>

      <div className="mt-4 overflow-hidden rounded-2xl" style={{ border: '1px solid var(--border)', background: 'var(--surface)' }}>
        {filtered.map((t, i) => {
          const hasNotes = t.status === 'PATTERN_COMPLETE'
          const mastery = getMastery(`${subjectId}:${t.topicSlug}`)
          const content = (
            <div
              className="flex flex-col gap-2 px-4 py-3 sm:flex-row sm:items-center sm:justify-between"
              style={{ borderTop: i === 0 ? 'none' : '1px solid var(--border)', opacity: hasNotes ? 1 : 0.6 }}
            >
              <div className="min-w-0">
                <div className="flex items-center gap-2">
                  <span className="font-medium" style={{ color: 'var(--text)' }}>{t.name}</span>
                  <PriorityBadge priority={t.priority} compact />
                </div>
                <div className="mt-0.5 text-xs" style={{ color: 'var(--text-faint)' }}>
                  {t.pyqCountExtracted} PYQs
                  {t.recentYearsCovered?.length > 0 && ` · active ${t.recentYearsCovered[0]}-${t.recentYearsCovered[t.recentYearsCovered.length - 1]}`}
                </div>
              </div>
              <div className="flex shrink-0 items-center gap-2">
                <ContentStatusBadge status={t.status} />
                {hasNotes && <MasteryBadge stage={mastery} />}
              </div>
            </div>
          )
          return hasNotes ? (
            <Link key={t.topicSlug} to={`/subjects/${subjectId}/${t.topicSlug}`} className="block transition-colors hover:opacity-90">
              {content}
            </Link>
          ) : (
            <div key={t.topicSlug} className="cursor-not-allowed">
              {content}
            </div>
          )
        })}
        {filtered.length === 0 && (
          <div className="px-4 py-6 text-center text-sm" style={{ color: 'var(--text-faint)' }}>No topics in this priority tier.</div>
        )}
      </div>
    </div>
  )
}
