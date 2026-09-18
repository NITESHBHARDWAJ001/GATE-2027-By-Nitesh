const PRIORITY_LABEL = {
  P1: 'P1 · Must Master',
  P2: 'P2 · High Priority',
  P3: 'P3 · Moderate',
  P4: 'P4 · Revision Only',
}

const PRIORITY_VAR = {
  P1: '--p1',
  P2: '--p2',
  P3: '--p3',
  P4: '--p4',
}

export function PriorityBadge({ priority, compact = false }) {
  if (!priority) return null
  const colorVar = PRIORITY_VAR[priority] || '--p4'
  return (
    <span
      className="inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-medium"
      style={{
        color: `var(${colorVar})`,
        background: `var(${colorVar}-soft)`,
        border: `1px solid var(${colorVar})`,
      }}
    >
      <span
        className="h-1.5 w-1.5 rounded-full"
        style={{ background: `var(${colorVar})` }}
      />
      {compact ? priority : PRIORITY_LABEL[priority] || priority}
    </span>
  )
}

const CONTENT_STATUS_LABEL = {
  NOT_STARTED: 'Notes not built yet',
  LEARNING: 'Learning',
  CONCEPT_COMPLETE: 'Concept ready',
  PATTERN_COMPLETE: 'Full notes ready',
  PYQ_IN_PROGRESS: 'PYQs in progress',
  PYQ_COMPLETE: 'PYQs complete',
  PRACTICE_COMPLETE: 'Practice complete',
  REVISION_REQUIRED: 'Revision required',
  MASTERED: 'Mastered',
}

export function ContentStatusBadge({ status }) {
  const label = CONTENT_STATUS_LABEL[status] || status
  const ready = status && status !== 'NOT_STARTED'
  return (
    <span
      className="inline-flex items-center gap-1.5 rounded-full px-2 py-0.5 text-xs font-medium"
      style={{
        color: ready ? 'var(--accent)' : 'var(--text-faint)',
        background: ready ? 'var(--accent-soft)' : 'var(--surface-2)',
        border: `1px solid ${ready ? 'var(--accent)' : 'var(--border)'}`,
      }}
    >
      {label}
    </span>
  )
}

export function MasteryBadge({ stage }) {
  const idx = ['NOT_STARTED','LEARNING','CONCEPT_COMPLETE','PATTERN_COMPLETE','PYQ_IN_PROGRESS','PYQ_COMPLETE','PRACTICE_COMPLETE','REVISION_REQUIRED','MASTERED'].indexOf(stage)
  const isMastered = stage === 'MASTERED'
  const label = (stage || 'NOT_STARTED').replaceAll('_', ' ').toLowerCase()
  return (
    <span
      className="inline-flex items-center gap-1.5 rounded-full px-2 py-0.5 text-xs font-medium capitalize"
      style={{
        color: isMastered ? '#16a34a' : 'var(--text-muted)',
        background: isMastered ? '#f0fdf4' : 'var(--surface-2)',
        border: `1px solid ${isMastered ? '#16a34a' : 'var(--border)'}`,
      }}
      title={`Learning stage ${idx + 1} of 9`}
    >
      {isMastered ? '✓ ' : ''}{label}
    </span>
  )
}
