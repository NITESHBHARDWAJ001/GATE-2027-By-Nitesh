import { useState } from 'react'
import QuestionCard from './QuestionCard'

export default function PatternCard({ pattern, pyqs, practice, subjectId, topicSlug, index, forceOpen }) {
  const [open, setOpen] = useState(index === 0 || !!forceOpen)
  const linkedPyqs = pyqs.filter((p) => p.patternId === pattern.patternId)
  const linkedPractice = (practice?.questions || []).filter((p) => p.patternId === pattern.patternId)

  return (
    <div className="rounded-2xl overflow-hidden" style={{ border: '1px solid var(--border)', background: 'var(--surface)' }}>
      <button onClick={() => setOpen((o) => !o)} className="flex w-full items-start justify-between gap-3 px-4 py-3 text-left">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono" style={{ color: 'var(--text-faint)' }}>#{index + 1}</span>
            <h3 className="font-medium" style={{ color: 'var(--text)' }}>{pattern.name}</h3>
          </div>
          <div className="mt-1 flex flex-wrap gap-1.5 text-[11px]" style={{ color: 'var(--text-faint)' }}>
            <span>{linkedPyqs.length} PYQs</span>
            {linkedPractice.length > 0 && <span>· {linkedPractice.length} AI practice</span>}
            {pattern.difficultyRangeSourceTagged && <span>· {pattern.difficultyRangeSourceTagged}</span>}
          </div>
        </div>
        <span className="shrink-0 text-sm" style={{ color: 'var(--text-faint)' }}>{open ? '▲' : '▼'}</span>
      </button>

      {open && (
        <div className="space-y-4 border-t px-4 py-4" style={{ borderColor: 'var(--border)' }}>
          <Field label="Kaise pehchaano (recognition)" hinglish>
            {pattern.recognitionClueHinglish}
          </Field>

          {pattern.whatShouldComeToMind?.length > 0 && (
            <Field label="Turant kya sochna hai">
              <ul className="list-disc space-y-1 pl-4">
                {pattern.whatShouldComeToMind.map((x, i) => <li key={i}>{x}</li>)}
              </ul>
            </Field>
          )}

          {pattern.generalSolvingApproach?.length > 0 && (
            <Field label="General solving method">
              <ol className="list-decimal space-y-1 pl-4">
                {pattern.generalSolvingApproach.map((x, i) => (
                  <li key={i}>{x.replace(/^\d+\.\s*/, '')}</li>
                ))}
              </ol>
            </Field>
          )}

          {pattern.commonTraps?.length > 0 && (
            <Field label="Common traps" tone="warn">
              <ul className="list-disc space-y-1 pl-4">
                {pattern.commonTraps.map((x, i) => <li key={i}>{x}</li>)}
              </ul>
            </Field>
          )}

          {pattern.variationsObserved?.length > 0 && (
            <Field label="Variations seen across years">
              <ul className="list-disc space-y-1 pl-4">
                {pattern.variationsObserved.map((x, i) => <li key={i}>{x}</li>)}
              </ul>
            </Field>
          )}

          {pattern.edgeCases?.length > 0 && (
            <Field label="Edge cases">
              <ul className="list-disc space-y-1 pl-4">
                {pattern.edgeCases.map((x, i) => <li key={i}>{x}</li>)}
              </ul>
            </Field>
          )}

          {linkedPyqs.length > 0 && (
            <div>
              <div className="mb-2 text-xs font-semibold uppercase tracking-wide" style={{ color: 'var(--text-faint)' }}>
                PYQs in this pattern ({linkedPyqs.length})
              </div>
              <div className="space-y-1.5">
                {linkedPyqs.map((pyq) => (
                  <QuestionCard
                    key={pyq.pyqId}
                    itemId={`${subjectId}:${topicSlug}:pyq:${pyq.pyqId}`}
                    kind="pyq"
                    data={pyq}
                  />
                ))}
              </div>
            </div>
          )}

          {linkedPractice.length > 0 && (
            <div>
              <div className="mb-2 text-xs font-semibold uppercase tracking-wide" style={{ color: 'var(--text-faint)' }}>
                AI-generated practice ({linkedPractice.length})
              </div>
              <div className="space-y-1.5">
                {linkedPractice.map((q) => (
                  <QuestionCard
                    key={q.practiceId}
                    itemId={`${subjectId}:${topicSlug}:practice:${q.practiceId}`}
                    kind="practice"
                    data={q}
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

function Field({ label, children, tone, hinglish }) {
  return (
    <div>
      <div
        className="mb-1 text-xs font-semibold uppercase tracking-wide"
        style={{ color: tone === 'warn' ? 'var(--p2)' : 'var(--text-faint)' }}
      >
        {label}
      </div>
      <div className="text-sm leading-relaxed" style={{ color: 'var(--text)' }}>
        {children}
      </div>
    </div>
  )
}
