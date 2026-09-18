// Copies the generated GATE_CSE knowledge base into public/data so it's
// served as static JSON by Vite. Re-run (or just `npm run dev`/`build`,
// which do this automatically) whenever new topics are added.
import { cpSync, existsSync, mkdirSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import path from 'node:path'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const src = path.resolve(__dirname, '..', '..', 'GATE_CSE')
const dest = path.resolve(__dirname, '..', 'public', 'data')

if (!existsSync(src)) {
  console.error(`Source data folder not found: ${src}`)
  process.exit(1)
}

mkdirSync(dest, { recursive: true })
cpSync(src, dest, { recursive: true })
console.log(`Synced ${src} -> ${dest}`)

// ---- Build a flat search index (topics, patterns, concept notes, PYQs) ----
import { readFileSync, readdirSync, writeFileSync } from 'node:fs'
const rd = (f) => { try { return JSON.parse(readFileSync(f, 'utf8')) } catch { return null } }
const clean = (s) => String(s ?? '').replace(/\s+/g, ' ').trim()
const entries = []
const subjectsDir = path.join(dest, 'subjects')
for (const sid of readdirSync(subjectsDir)) {
  const sdir = path.join(subjectsDir, sid)
  const overview = rd(path.join(sdir, 'overview.json'))
  const sn = overview?.name || sid
  const topics = rd(path.join(sdir, 'topics.json')) || []
  const tmap = new Map(topics.map((t) => [t.topicSlug, t]))
  for (const t of topics) {
    const base = { s: sid, sn, p: t.topicSlug, tn: t.name, pr: t.priority }
    entries.push({ ...base, k: 'topic', title: t.name, text: `${sn} ${t.topicSlug}` })
    if (t.status !== 'PATTERN_COMPLETE') continue
    const tdir = path.join(sdir, t.topicSlug)
    const c = rd(path.join(tdir, 'concepts.json'))
    if (c) {
      const parts = [c.overview, c.coreConcept, c.hinglishExplanation, ...(c.importantProperties || []), ...Object.values(c.formulas || {}), ...(c.commonPitfalls || []), ...(c.standardTechniques || [])]
      entries.push({ ...base, k: 'note', title: `${t.name} — concept notes`, text: clean(parts.join(' ')) })
    }
    for (const pt of rd(path.join(tdir, 'patterns.json')) || []) {
      const parts = [pt.recognitionClueHinglish, ...(pt.whatShouldComeToMind || []), ...(pt.generalSolvingApproach || []), ...(pt.commonTraps || []), ...(pt.variationsObserved || [])]
      entries.push({ ...base, k: 'pattern', id: pt.patternId, title: pt.name, text: clean(parts.join(' ')) })
    }
  }
  for (const q of rd(path.join(sdir, 'pyqs.json')) || []) {
    const t = tmap.get(q.topicSlug)
    entries.push({
      k: 'pyq', s: sid, sn, p: q.topicSlug, tn: t?.name || q.topic, pr: t?.priority, id: q.localId,
      y: q.year ? Number(q.year) : null, qt: q.questionType, a: q.answer,
      title: `GATE ${q.year ?? '?'} · Q ${q.localId}`,
      text: clean(q.questionTextRaw).slice(0, 700), tags: clean(q.tagsRaw).slice(0, 200),
    })
  }
}
writeFileSync(path.join(dest, 'search-index.json'), JSON.stringify(entries))
console.log(`Search index: ${entries.length} entries`)
