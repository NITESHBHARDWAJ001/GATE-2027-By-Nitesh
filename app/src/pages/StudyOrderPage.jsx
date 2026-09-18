import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { getStudyOrder } from '../lib/api'

// study-order.json topic entries use display names ("Set Theory") and a
// subjectId; topic detail pages are keyed by topicSlug, so we slugify the
// same way the content-generation pipeline did.
function slugify(s) {
  return s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
}

export default function StudyOrderPage() {
  const [data, setData] = useState(null)

  useEffect(() => {
    getStudyOrder().then(setData)
  }, [])

  if (!data) return <div style={{ color: 'var(--text-muted)' }}>Loading…</div>

  return (
    <div className="mx-auto max-w-4xl">
      <h1 className="mb-1 text-2xl font-semibold" style={{ color: 'var(--text)' }}>Recommended Study Order</h1>
      <p className="mb-2 text-sm" style={{ color: 'var(--text-muted)' }}>{data.methodology}</p>
      {data.note && <p className="mb-6 text-xs italic" style={{ color: 'var(--text-faint)' }}>{data.note}</p>}

      <div className="space-y-6">
        {data.trackOrder.map((track, ti) => (
          <div key={ti} className="rounded-2xl px-5 py-4" style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}>
            <h2 className="font-semibold" style={{ color: 'var(--text)' }}>{track.track}</h2>
            <p className="mt-0.5 text-xs" style={{ color: 'var(--text-faint)' }}>{track.reasonForFirst}</p>
            <ol className="mt-3 space-y-2.5">
              {track.sequence.map((step, si) => (
                <li key={si} className="flex gap-3 text-sm">
                  <span
                    className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-[11px] font-semibold"
                    style={{ background: 'var(--accent-soft)', color: 'var(--accent)' }}
                  >
                    {si + 1}
                  </span>
                  <div>
                    <Link
                      to={`/subjects/${step.subjectId}/${slugify(step.topic)}`}
                      className="font-medium hover:underline"
                      style={{ color: 'var(--text)' }}
                    >
                      {step.topic}
                    </Link>
                    <p className="mt-0.5 text-xs" style={{ color: 'var(--text-muted)' }}>{step.why}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        ))}
      </div>
    </div>
  )
}
