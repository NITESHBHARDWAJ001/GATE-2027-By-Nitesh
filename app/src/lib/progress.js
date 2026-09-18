// Client-side progress tracking (localStorage only — this is a personal
// single-user study tool, no backend). Three independent stores:
//   - attempts: per-PYQ/practice-question attempt record
//   - mastery: per-topic lifecycle stage
//   - revision: per-topic revision-pass checkboxes

const ATTEMPTS_KEY = 'gatecse:attempts:v1'
const MASTERY_KEY = 'gatecse:mastery:v1'
const REVISION_KEY = 'gatecse:revision:v1'

export const MASTERY_STAGES = [
  'NOT_STARTED',
  'LEARNING',
  'CONCEPT_COMPLETE',
  'PATTERN_COMPLETE',
  'PYQ_IN_PROGRESS',
  'PYQ_COMPLETE',
  'PRACTICE_COMPLETE',
  'REVISION_REQUIRED',
  'MASTERED',
]

export const MISTAKE_CATEGORIES = [
  'conceptual_mistake',
  'formula_mistake',
  'calculation_mistake',
  'pattern_recognition_mistake',
  'misread_question',
  'silly_mistake',
  'time_management_issue',
  'edge_case_mistake',
  'wrong_assumption',
]

function readStore(key) {
  try {
    const raw = localStorage.getItem(key)
    return raw ? JSON.parse(raw) : {}
  } catch {
    return {}
  }
}

function writeStore(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value))
    window.dispatchEvent(new CustomEvent('gatecse:store-changed', { detail: { key } }))
  } catch {
    // storage unavailable (private mode etc.) — fail silently, app still works
  }
}

// ---- Attempts ----
// itemId convention: `${subjectId}:${topicSlug}:${kind}:${id}`  kind = 'pyq' | 'practice'

export function getAttempt(itemId) {
  const store = readStore(ATTEMPTS_KEY)
  return store[itemId] || { status: 'unattempted', attemptCount: 0, mistakeCategory: null, markedForReview: false }
}

export function getAllAttempts() {
  return readStore(ATTEMPTS_KEY)
}

export function recordAttempt(itemId, { status, mistakeCategory, timeTakenSec } = {}) {
  const store = readStore(ATTEMPTS_KEY)
  const prev = store[itemId] || { status: 'unattempted', attemptCount: 0, mistakeCategory: null, markedForReview: false }
  store[itemId] = {
    ...prev,
    status: status ?? prev.status,
    attemptCount: (prev.attemptCount || 0) + 1,
    mistakeCategory: status === 'incorrect' ? (mistakeCategory ?? prev.mistakeCategory) : null,
    lastAttemptAt: Date.now(),
    timeTakenSec: timeTakenSec ?? prev.timeTakenSec,
  }
  writeStore(ATTEMPTS_KEY, store)
  return store[itemId]
}

export function toggleMarkedForReview(itemId) {
  const store = readStore(ATTEMPTS_KEY)
  const prev = store[itemId] || { status: 'unattempted', attemptCount: 0, mistakeCategory: null, markedForReview: false }
  store[itemId] = { ...prev, markedForReview: !prev.markedForReview }
  writeStore(ATTEMPTS_KEY, store)
  return store[itemId]
}

export function attemptsForTopic(subjectId, topicSlug) {
  const store = readStore(ATTEMPTS_KEY)
  const prefix = `${subjectId}:${topicSlug}:`
  const out = {}
  for (const [k, v] of Object.entries(store)) {
    if (k.startsWith(prefix)) out[k] = v
  }
  return out
}

// ---- Mastery ----

export function getMastery(topicId) {
  const store = readStore(MASTERY_KEY)
  return store[topicId] || 'NOT_STARTED'
}

export function getAllMastery() {
  return readStore(MASTERY_KEY)
}

export function setMastery(topicId, stage) {
  const store = readStore(MASTERY_KEY)
  store[topicId] = stage
  writeStore(MASTERY_KEY, store)
}

// ---- Revision passes ----

export function getRevision(topicId) {
  const store = readStore(REVISION_KEY)
  return store[topicId] || { rev1: false, rev2: false, rev3: false, final: false }
}

export function toggleRevision(topicId, pass) {
  const store = readStore(REVISION_KEY)
  const prev = store[topicId] || { rev1: false, rev2: false, rev3: false, final: false }
  store[topicId] = { ...prev, [pass]: !prev[pass] }
  writeStore(REVISION_KEY, store)
  return store[topicId]
}

// ---- Derived stats ----

export function computeAccuracy(attemptsMap) {
  const vals = Object.values(attemptsMap)
  const attempted = vals.filter((a) => a.status === 'correct' || a.status === 'incorrect')
  if (attempted.length === 0) return null
  const correct = attempted.filter((a) => a.status === 'correct').length
  return Math.round((correct / attempted.length) * 100)
}
