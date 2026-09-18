import { useEffect, useMemo, useState } from 'react'
import { Link, useParams, useSearchParams } from 'react-router-dom'
import { getTopicBundle } from '../lib/api'
import { getMastery, setMastery, getRevision, toggleRevision, attemptsForTopic, computeAccuracy, MASTERY_STAGES } from '../lib/progress'
import { useStoreVersion } from '../lib/useStoreVersion'
import { PriorityBadge } from '../components/Badges'
import PatternCard from '../components/PatternCard'
import QuestionCard from '../components/QuestionCard'

const TABS = [
  { id: 'concepts', label: 'Concepts' },
  { id: 'patterns', label: 'Patterns & PYQs' },
  { id: 'practice', label: 'AI Practice' },
  { id: 'revision', label: 'Revision' },
]

export default function TopicPage() {
  const { subjectId, topicSlug } = useParams()
  const [bundle, setBundle] = useState(null)
  const [qs] = useSearchParams()
  const focusPattern = qs.get('pattern')
  const [tab, setTab] = useState(qs.get('tab') || 'concepts')
  useStoreVersion()

  useEffect(() => {
    setBundle(null)
    setTab(qs.get('tab') || 'concepts')
    getTopicBundle(subjectId, topicSlug).then(setBundle)
    window.scrollTo(0, 0)
  }, [subjectId, topicSlug])

  const topicId = `${subjectId}:${topicSlug}`
  const storeVersion = useStoreVersion()
  const attempts = useMemo(() => attemptsForTopic(subjectId, topicSlug), [subjectId, topicSlug, bundle, storeVersion])
  const accuracy = computeAccuracy(attempts)
  const attemptedCount = Object.values(attempts).filter((a) => a.status !== 'unattempted').length

  if (!bundle) return <div style={{ color: 'var(--text-muted)' }}>Loading topic…</div>

  const { topic, concepts, patterns, pyqs, practice, revision } = bundle
  const mastery = getMastery(topicId)
  const revProgress = getRevision(topicId)

  return (
    <div className="mx-auto max-w-4xl pb-16">
      <Link to={`/subjects/${subjectId}`} className="text-xs" style={{ color: 'var(--text-faint)' }}>← {topic.subject}</Link>

      <div className="mt-1 flex flex-wrap items-center gap-2">
        <h1 className="text-2xl font-semibold" style={{ color: 'var(--text)' }}>{topic.name}</h1>
        <PriorityBadge priority={topic.priority} />
      </div>

      <p className="mt-2 text-sm leading-relaxed" style={{ color: 'var(--text-muted)' }}>{topic.priorityEvidence}</p>

      <div className="mt-4 flex flex-wrap items-center gap-4 rounded-2xl px-4 py-3" style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}>
        <div>
          <div className="text-xs" style={{ color: 'var(--text-faint)' }}>Mastery</div>
          <select
            value={mastery}
            onChange={(e) => setMastery(topicId, e.target.value)}
            className="mt-0.5 rounded-lg px-2 py-1 text-sm capitalize"
            style={{ background: 'var(--surface-2)', border: '1px solid var(--border)', color: 'var(--text)' }}
          >
            {MASTERY_STAGES.map((s) => (
              <option key={s} value={s}>{s.replaceAll('_', ' ').toLowerCase()}</option>
            ))}
          </select>
        </div>
        <Stat label="PYQs" value={topic.pyqCountExtracted} />
        <Stat label="Attempted" value={`${attemptedCount}/${pyqs.length + (practice?.questions?.length || 0)}`} />
        <Stat label="Accuracy" value={accuracy === null ? '—' : `${accuracy}%`} />
        {topic.yearsCovered?.length > 0 && (
          <Stat label="Years" value={`${topic.yearsCovered[0]}–${topic.yearsCovered[topic.yearsCovered.length - 1]}`} />
        )}
      </div>

      {(topic.prerequisites?.length > 0 || topic.unlocks?.length > 0) && (
        <div className="mt-4 grid gap-3 sm:grid-cols-2">
          {topic.prerequisites?.length > 0 && (
            <LinkList title="Prerequisites" items={topic.prerequisites} />
          )}
          {topic.unlocks?.length > 0 && (
            <LinkList title="Unlocks next" items={topic.unlocks} />
          )}
        </div>
      )}

      <div className="mt-6 flex gap-1 border-b" style={{ borderColor: 'var(--border)' }}>
        {TABS.map((t) => (
          <button
            key={t.id}
            onClick={() => setTab(t.id)}
            className="px-3 py-2 text-sm font-medium"
            style={{
              color: tab === t.id ? 'var(--accent)' : 'var(--text-muted)',
              borderBottom: tab === t.id ? '2px solid var(--accent)' : '2px solid transparent',
            }}
          >
            {t.label}
          </button>
        ))}
      </div>

      <div className="mt-5">
        {tab === 'concepts' && <ConceptsTab concepts={concepts} />}
        {tab === 'patterns' && (
          <div className="space-y-3">
            {patterns.map((p, i) => (
              <PatternCard key={p.patternId} forceOpen={focusPattern === p.patternId} pattern={p} pyqs={pyqs} practice={practice} subjectId={subjectId} topicSlug={topicSlug} index={i} />
            ))}
          </div>
        )}
        {tab === 'practice' && <PracticeTab practice={practice} subjectId={subjectId} topicSlug={topicSlug} />}
        {tab === 'revision' && <RevisionTab revision={revision} topicId={topicId} revProgress={revProgress} />}
      </div>
    </div>
  )
}

function Stat({ label, value }) {
  return (
    <div>
      <div className="text-xs" style={{ color: 'var(--text-faint)' }}>{label}</div>
      <div className="text-sm font-semibold" style={{ color: 'var(--text)' }}>{value}</div>
    </div>
  )
}

function LinkList({ title, items }) {
  return (
    <div className="rounded-xl px-3 py-2.5" style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}>
      <div className="text-xs font-semibold uppercase tracking-wide" style={{ color: 'var(--text-faint)' }}>{title}</div>
      <ul className="mt-1.5 space-y-1.5">
        {items.map((it, i) => (
          <li key={i} className="text-xs">
            <span className="font-medium" style={{ color: 'var(--text)' }}>{it.topic || it.name}</span>
            {it.why && <span style={{ color: 'var(--text-faint)' }}> — {it.why}</span>}
            {it.note && <span style={{ color: 'var(--text-faint)' }}> — {it.note}</span>}
          </li>
        ))}
      </ul>
    </div>
  )
}

function Section({ title, children }) {
  if (!children) return null
  return (
    <div className="mb-5">
      <h3 className="mb-1.5 text-sm font-semibold" style={{ color: 'var(--text)' }}>{title}</h3>
      <div className="text-sm leading-relaxed" style={{ color: 'var(--text-muted)' }}>{children}</div>
    </div>
  )
}

function ConceptsTab({ concepts }) {
  if (!concepts) return <Empty text="Concepts not written yet for this topic." />
  return (
    <div className="rounded-2xl px-5 py-5" style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}>
      <Section title="Overview">{concepts.overview}</Section>
      <Section title="Why this matters for GATE">{concepts.whyItMatters}</Section>
      <Section title="Core Concept">{concepts.coreConcept}</Section>
      <Section title="Hinglish Explanation">{concepts.hinglishExplanation}</Section>
      <Section title="Formal Definition">
        <code className="rounded bg-transparent" style={{ color: 'var(--text)' }}>{concepts.formalDefinition}</code>
      </Section>

      {concepts.importantProperties?.length > 0 && (
        <div className="mb-5">
          <h3 className="mb-1.5 text-sm font-semibold" style={{ color: 'var(--text)' }}>Important Properties</h3>
          <ul className="list-disc space-y-1.5 pl-4 text-sm leading-relaxed" style={{ color: 'var(--text-muted)' }}>
            {concepts.importantProperties.map((p, i) => <li key={i}>{p}</li>)}
          </ul>
        </div>
      )}

      {concepts.formulas && Object.keys(concepts.formulas).length > 0 && (
        <div className="mb-5">
          <h3 className="mb-1.5 text-sm font-semibold" style={{ color: 'var(--text)' }}>Formulas / Facts</h3>
          <div className="space-y-1.5">
            {Object.entries(concepts.formulas).map(([k, v]) => (
              <div key={k} className="rounded-lg px-3 py-2 text-xs" style={{ background: 'var(--surface-2)' }}>
                <div className="font-mono font-semibold" style={{ color: 'var(--accent)' }}>{k}</div>
                <div className="mt-0.5" style={{ color: 'var(--text)' }}>{v}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {concepts.commonPitfalls?.length > 0 && (
        <div className="mb-5">
          <h3 className="mb-1.5 text-sm font-semibold" style={{ color: 'var(--p1)' }}>Common Pitfalls</h3>
          <ul className="list-disc space-y-1.5 pl-4 text-sm leading-relaxed" style={{ color: 'var(--text-muted)' }}>
            {concepts.commonPitfalls.map((p, i) => <li key={i}>{p}</li>)}
          </ul>
        </div>
      )}

      {concepts.standardTechniques?.length > 0 && (
        <div>
          <h3 className="mb-1.5 text-sm font-semibold" style={{ color: 'var(--text)' }}>Standard Techniques</h3>
          <ol className="list-decimal space-y-1.5 pl-4 text-sm leading-relaxed" style={{ color: 'var(--text-muted)' }}>
            {concepts.standardTechniques.map((p, i) => <li key={i}>{p.replace(/^\d+\.\s*/, '')}</li>)}
          </ol>
        </div>
      )}
    </div>
  )
}

function PracticeTab({ practice, subjectId, topicSlug }) {
  if (!practice?.questions?.length) return <Empty text="No AI-generated practice for this topic yet." />
  return (
    <div>
      <p className="mb-3 rounded-lg px-3 py-2 text-xs" style={{ background: '#faf5ff', color: '#9333ea' }}>
        {practice.disclaimer}
      </p>
      <div className="space-y-1.5">
        {practice.questions.map((q) => (
          <QuestionCard key={q.practiceId} itemId={`${subjectId}:${topicSlug}:practice:${q.practiceId}`} kind="practice" data={q} />
        ))}
      </div>
    </div>
  )
}

function RevisionTab({ revision, topicId, revProgress }) {
  if (!revision) return <Empty text="No revision sheet for this topic yet." />
  return (
    <div className="rounded-2xl px-5 py-5" style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}>
      <div className="mb-4 flex flex-wrap gap-2">
        {['rev1', 'rev2', 'rev3', 'final'].map((pass) => (
          <button
            key={pass}
            onClick={() => toggleRevision(topicId, pass)}
            className="rounded-full px-3 py-1 text-xs font-medium"
            style={{
              background: revProgress[pass] ? '#f0fdf4' : 'var(--surface-2)',
              color: revProgress[pass] ? '#16a34a' : 'var(--text-muted)',
              border: `1px solid ${revProgress[pass] ? '#16a34a' : 'var(--border)'}`,
            }}
          >
            {revProgress[pass] ? '✓ ' : ''}{pass === 'final' ? 'Final revision' : `Revision ${pass.slice(-1)}`}
          </button>
        ))}
      </div>

      <Section title="Core Idea">{revision.coreIdea}</Section>

      {revision.mustRememberFormulas?.length > 0 && (
        <div className="mb-5">
          <h3 className="mb-1.5 text-sm font-semibold" style={{ color: 'var(--text)' }}>Must-Remember Formulas</h3>
          <ul className="list-disc space-y-1 pl-4 text-sm" style={{ color: 'var(--text-muted)' }}>
            {revision.mustRememberFormulas.map((f, i) => <li key={i} className="font-mono text-xs">{f}</li>)}
          </ul>
        </div>
      )}

      {revision.patternRecognitionTable?.length > 0 && (
        <div className="mb-5">
          <h3 className="mb-1.5 text-sm font-semibold" style={{ color: 'var(--text)' }}>Pattern Recognition Quick-Reference</h3>
          <div className="overflow-hidden rounded-lg" style={{ border: '1px solid var(--border)' }}>
            {revision.patternRecognitionTable.map((row, i) => (
              <div key={i} className="grid grid-cols-2 gap-2 px-3 py-2 text-xs" style={{ borderTop: i === 0 ? 'none' : '1px solid var(--border)' }}>
                <span style={{ color: 'var(--text-muted)' }}>{row.seeThis}</span>
                <span className="font-mono font-medium" style={{ color: 'var(--accent)' }}>{row.thinkThis}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {revision.commonTrapsQuickList?.length > 0 && (
        <div className="mb-5">
          <h3 className="mb-1.5 text-sm font-semibold" style={{ color: 'var(--p1)' }}>Traps Quick List</h3>
          <ul className="list-disc space-y-1 pl-4 text-sm" style={{ color: 'var(--text-muted)' }}>
            {revision.commonTrapsQuickList.map((t, i) => <li key={i}>{t}</li>)}
          </ul>
        </div>
      )}

      {revision.highYieldPyqLessons?.length > 0 && (
        <div>
          <h3 className="mb-1.5 text-sm font-semibold" style={{ color: 'var(--text)' }}>High-Yield Lessons</h3>
          <ul className="list-disc space-y-1 pl-4 text-sm" style={{ color: 'var(--text-muted)' }}>
            {revision.highYieldPyqLessons.map((t, i) => <li key={i}>{t}</li>)}
          </ul>
        </div>
      )}
    </div>
  )
}

function Empty({ text }) {
  return <div className="rounded-2xl px-5 py-8 text-center text-sm" style={{ background: 'var(--surface)', border: '1px dashed var(--border)', color: 'var(--text-faint)' }}>{text}</div>
}
