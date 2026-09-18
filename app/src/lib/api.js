// Thin fetch layer over the static JSON knowledge base served from /data
// (public/data, synced from ../GATE_CSE by scripts/sync-data.mjs).

const cache = new Map()

async function getJSON(path) {
  if (cache.has(path)) return cache.get(path)
  const res = await fetch(path)
  if (!res.ok) {
    if (res.status === 404) return null
    throw new Error(`Failed to load ${path}: ${res.status}`)
  }
  const data = await res.json()
  cache.set(path, data)
  return data
}

export function getSubjectsOverview() {
  return getJSON('/data/analytics/subjects-overview.json')
}

export function getTopicPriority() {
  return getJSON('/data/analytics/topic-priority.json')
}

export function getTopicFrequency() {
  return getJSON('/data/analytics/topic-frequency.json')
}

export function getStudyOrder() {
  return getJSON('/data/analytics/study-order.json')
}

export function getSubjectOverview(subjectId) {
  return getJSON(`/data/subjects/${subjectId}/overview.json`)
}

export function getSubjectTopics(subjectId) {
  return getJSON(`/data/subjects/${subjectId}/topics.json`)
}

export function getSubjectPyqs(subjectId) {
  return getJSON(`/data/subjects/${subjectId}/pyqs.json`)
}

export async function getTopicBundle(subjectId, topicSlug) {
  const base = `/data/subjects/${subjectId}/${topicSlug}`
  const [topic, concepts, patterns, pyqs, practice, revision, mistakes] = await Promise.all([
    getJSON(`${base}/topic.json`),
    getJSON(`${base}/concepts.json`),
    getJSON(`${base}/patterns.json`),
    getJSON(`${base}/pyqs.json`),
    getJSON(`${base}/practice.json`),
    getJSON(`${base}/revision.json`),
    getJSON(`${base}/mistakes.json`),
  ])
  if (!topic) return null
  return { topic, concepts, patterns: patterns || [], pyqs: pyqs || [], practice, revision, mistakes }
}

// Load every subject's overview + topics.json in one shot (used by Dashboard/Search).
export async function getAllSubjectsWithTopics() {
  const overviews = await getSubjectsOverview()
  if (!overviews) return []
  const subjectIds = [...new Set(overviews.map((s) => s.subjectId))]
  const results = await Promise.all(
    subjectIds.map(async (id) => {
      const [overview, topics] = await Promise.all([getSubjectOverview(id), getSubjectTopics(id)])
      return { subjectId: id, overview, topics: topics || [] }
    })
  )
  return results
}

export function getSearchIndex() {
  return getJSON('/data/search-index.json')
}

export function getNotesIndex() {
  return getJSON('/data/notes/index.json')
}

export async function getNoteText(subjectKey, file) {
  const path = `/data/notes/${subjectKey}/${file}`
  if (cache.has(path)) return cache.get(path)
  const res = await fetch(path)
  if (!res.ok) return null
  const text = await res.text()
  cache.set(path, text)
  return text
}
