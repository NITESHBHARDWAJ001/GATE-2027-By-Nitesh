// Builds public/data/notes/index.json from GATE_CSE/notes/<subject>/*.md
// Each subject folder has _subject.json {title, emoji, order, description, topicSubjectIds[]}.
// Chapters are NN-slug.md; title = first "# " heading; optional "<!-- topics: subj/topic, ... -->" line links to topic pages.
import { existsSync, readdirSync, readFileSync, writeFileSync, mkdirSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import path from 'node:path'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const root = path.resolve(__dirname, '..', 'public', 'data', 'notes')
if (!existsSync(root)) {
  mkdirSync(root, { recursive: true })
  writeFileSync(path.join(root, 'index.json'), '[]')
  process.exit(0)
}

const subjects = []
for (const key of readdirSync(root, { withFileTypes: true }).filter((d) => d.isDirectory()).map((d) => d.name)) {
  const dir = path.join(root, key)
  let meta = {}
  try { meta = JSON.parse(readFileSync(path.join(dir, '_subject.json'), 'utf8')) } catch {}
  const chapters = readdirSync(dir)
    .filter((f) => f.endsWith('.md'))
    .sort()
    .map((f) => {
      const text = readFileSync(path.join(dir, f), 'utf8')
      const title = (text.match(/^#\s+(.+)$/m) || [, f])[1].trim()
      const topicsLine = (text.match(/<!--\s*topics:\s*(.+?)\s*-->/) || [, ''])[1]
      const words = text.split(/\s+/).length
      return {
        id: f.replace(/\.md$/, ''),
        file: f,
        title,
        topics: topicsLine.split(',').map((s) => s.trim()).filter(Boolean),
        minutes: Math.max(1, Math.round(words / 180)),
      }
    })
  subjects.push({ key, order: 99, title: key, emoji: '📘', description: '', ...meta, chapters })
}
subjects.sort((a, b) => a.order - b.order)
writeFileSync(path.join(root, 'index.json'), JSON.stringify(subjects, null, 1))
console.log(`Notes index: ${subjects.length} subjects, ${subjects.reduce((n, s) => n + s.chapters.length, 0)} chapters`)

// ---- Add notes sections to the search index (kind: 'chapter') ----
const idxPath = path.resolve(__dirname, '..', 'public', 'data', 'search-index.json')
if (existsSync(idxPath)) {
  const idx = JSON.parse(readFileSync(idxPath, 'utf8')).filter((e) => e.k !== 'chapter')
  for (const subj of subjects) {
    for (const c of subj.chapters) {
      const text = readFileSync(path.join(root, subj.key, c.file), 'utf8').replace(/<!--[\s\S]*?-->/g, '')
      const parts = text.split(/^##\s+/m).slice(1)
      for (const part of parts) {
        const nl = part.indexOf(String.fromCharCode(10))
        const heading = part.slice(0, nl).trim()
        const body = part.slice(nl + 1).replace(/[`*|>#]/g, ' ').replace(/\s+/g, ' ').trim().slice(0, 900)
        idx.push({ k: 'chapter', s: subj.key, sn: subj.title, p: c.id, tn: c.title, title: heading, text: body })
      }
    }
  }
  writeFileSync(idxPath, JSON.stringify(idx))
  console.log(`Search index + notes sections: ${idx.length} entries`)
}
