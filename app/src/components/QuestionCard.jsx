import { useState } from 'react'
import { getAttempt, recordAttempt, toggleMarkedForReview, MISTAKE_CATEGORIES } from '../lib/progress'
import { useStoreVersion } from '../lib/useStoreVersion'

const STATUS_STYLE = {
  unattempted: { label: 'Unattempted', color: 'var(--text-faint)', bg: 'var(--surface-2)' },
  correct: { label: 'Correct', color: '#16a34a', bg: '#f0fdf4' },
  incorrect: { label: 'Incorrect', color: 'var(--p1)', bg: 'var(--p1-soft)' },
  skipped: { label: 'Skipped', color: 'var(--p3)', bg: 'var(--p3-soft)' },
}

function fmtCategory(c) {
  return c.replaceAll('_', ' ')
}

// Renders one question — either a real GATE PYQ (source-grounded, from pyqs.json)
// or an AI-generated practice question (clearly labeled) — with expand/collapse
// and attempt tracking (correct/incorrect/skip + mistake category on wrong answers).
export default function QuestionCard({ itemId, kind, data }) {
  const [open, setOpen] = useState(false)
  useStoreVersion()
  const attempt = getAttempt(itemId)
  const style = STATUS_STYLE[attempt.status] || STATUS_STYLE.unattempted

  const isPyq = kind === 'pyq'
  const title = isPyq
    ? `${data.year ?? '—'}${data.examStream ? ' ' + data.examStream : ''}${data.sourceQuestionNo ? ' · Q' + data.sourceQuestionNo : ''}`
    : `${(data.difficulty || 'practice').replace(/-/g, ' ')}`

  return (
    <div className="rounded-xl overflow-hidden" style={{ border: '1px solid var(--border)', background: 'var(--surface)' }}>
      <button
        onClick={() => setOpen((o) => !o)}
        className="flex w-full items-center gap-3 px-3 py-2.5 text-left"
      >
        <span
          className="shrink-0 rounded-md px-1.5 py-0.5 text-[10px] font-semibold uppercase tracking-wide"
          style={{
            color: isPyq ? 'var(--accent)' : '#9333ea',
            background: isPyq ? 'var(--accent-soft)' : '#faf5ff',
          }}
        >
          {isPyq ? 'GATE PYQ' : 'AI Practice'}
        </span>
        <span className="min-w-0 flex-1 truncate text-sm" style={{ color: 'var(--text)' }}>
          {title}
          {!isPyq && <span className="ml-2 text-xs" style={{ color: 'var(--text-faint)' }}>({data.practiceId})</span>}
        </span>
        {attempt.markedForReview && <span title="Marked for review">🚩</span>}
        <span
          className="shrink-0 rounded-full px-2 py-0.5 text-[11px] font-medium"
          style={{ color: style.color, background: style.bg }}
        >
          {style.label}
        </span>
        <span className="shrink-0 text-xs" style={{ color: 'var(--text-faint)' }}>{open ? '▲' : '▼'}</span>
      </button>

      {open && (
        <div className="border-t px-3 py-3 text-sm" style={{ borderColor: 'var(--border)' }}>
          <p className="whitespace-pre-wrap leading-relaxed" style={{ color: 'var(--text)' }}>
            {isPyq ? data.questionTextRaw : data.question}
          </p>

          {isPyq && data.formulaExtractionNote && (
            <p className="mt-2 rounded-lg px-2 py-1.5 text-xs" style={{ background: 'var(--p3-soft)', color: 'var(--p3)' }}>
              ⚠ {data.formulaExtractionNote}
            </p>
          )}

          {!isPyq && data.solutionApproach && (
            <div className="mt-2 rounded-lg px-2 py-2 text-xs" style={{ background: 'var(--surface-2)' }}>
              <span className="font-semibold" style={{ color: 'var(--text-muted)' }}>Solution approach: </span>
              <span style={{ color: 'var(--text)' }}>{data.solutionApproach}</span>
            </div>
          )}

          <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs" style={{ color: 'var(--text-faint)' }}>
            {isPyq ? (
              <>
                <span>Type: {data.questionType || 'unknown'}</span>
                {data.difficultySourceTag && <span>Difficulty: {data.difficultySourceTag}</span>}
                <span>Answer: <b style={{ color: 'var(--text)' }}>{data.answerVerified ? data.answer : 'not verified in source'}</b></span>
              </>
            ) : (
              <span>Answer: <b style={{ color: 'var(--text)' }}>{data.answer}</b></span>
            )}
          </div>

          <AttemptControls itemId={itemId} attempt={attempt} />
        </div>
      )}
    </div>
  )
}

function AttemptControls({ itemId, attempt }) {
  const [showMistake, setShowMistake] = useState(false)

  function mark(status) {
    if (status === 'incorrect') {
      setShowMistake(true)
      recordAttempt(itemId, { status })
    } else {
      setShowMistake(false)
      recordAttempt(itemId, { status })
    }
  }

  return (
    <div className="mt-3 flex flex-wrap items-center gap-2 border-t pt-3" style={{ borderColor: 'var(--border)' }}>
      <button onClick={() => mark('correct')} className="rounded-lg px-2.5 py-1 text-xs font-medium" style={{ background: '#f0fdf4', color: '#16a34a', border: '1px solid #bbf7d0' }}>✓ Correct</button>
      <button onClick={() => mark('incorrect')} className="rounded-lg px-2.5 py-1 text-xs font-medium" style={{ background: 'var(--p1-soft)', color: 'var(--p1)', border: '1px solid var(--p1)' }}>✗ Incorrect</button>
      <button onClick={() => mark('skipped')} className="rounded-lg px-2.5 py-1 text-xs font-medium" style={{ background: 'var(--p3-soft)', color: 'var(--p3)', border: '1px solid var(--p3)' }}>⏭ Skipped</button>
      <button
        onClick={() => toggleMarkedForReview(itemId)}
        className="rounded-lg px-2.5 py-1 text-xs font-medium"
        style={{ background: 'var(--surface-2)', color: 'var(--text-muted)', border: '1px solid var(--border)' }}
      >
        {attempt.markedForReview ? '🚩 Unmark review' : '🚩 Mark for review'}
      </button>
      {attempt.attemptCount > 0 && (
        <span className="ml-auto text-xs" style={{ color: 'var(--text-faint)' }}>{attempt.attemptCount} attempt{attempt.attemptCount > 1 ? 's' : ''}</span>
      )}

      {(showMistake || (attempt.status === 'incorrect' && attempt.mistakeCategory)) && (
        <div className="w-full">
          <div className="mb-1 mt-1 text-xs" style={{ color: 'var(--text-muted)' }}>What went wrong?</div>
          <div className="flex flex-wrap gap-1.5">
            {MISTAKE_CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => recordAttempt(itemId, { status: 'incorrect', mistakeCategory: cat })}
                className="rounded-full px-2 py-0.5 text-[11px] capitalize"
                style={{
                  background: attempt.mistakeCategory === cat ? 'var(--accent)' : 'var(--surface-2)',
                  color: attempt.mistakeCategory === cat ? '#fff' : 'var(--text-muted)',
                  border: '1px solid var(--border)',
                }}
              >
                {fmtCategory(cat)}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
