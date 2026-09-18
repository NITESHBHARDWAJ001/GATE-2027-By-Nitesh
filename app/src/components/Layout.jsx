import { useEffect, useState } from 'react'
import { Link, NavLink, Outlet, useNavigate } from 'react-router-dom'

function ThemeToggle() {
  const [theme, setTheme] = useState(() => localStorage.getItem('gatecse:theme') || 'system')

  useEffect(() => {
    const root = document.documentElement
    if (theme === 'system') root.removeAttribute('data-theme')
    else root.setAttribute('data-theme', theme)
    localStorage.setItem('gatecse:theme', theme)
  }, [theme])

  const next = { system: 'light', light: 'dark', dark: 'system' }
  const icon = { system: '🖥️', light: '☀️', dark: '🌙' }

  return (
    <button
      onClick={() => setTheme(next[theme])}
      className="flex h-8 w-8 items-center justify-center rounded-lg text-sm hover:opacity-80"
      style={{ border: '1px solid var(--border)', background: 'var(--surface)' }}
      title={`Theme: ${theme} (click to change)`}
    >
      {icon[theme]}
    </button>
  )
}

function SearchBox() {
  const [q, setQ] = useState('')
  const navigate = useNavigate()

  function onSubmit(e) {
    e.preventDefault()
    if (q.trim()) navigate(`/search?q=${encodeURIComponent(q.trim())}`)
  }

  return (
    <form onSubmit={onSubmit} className="flex-1 max-w-md">
      <input
        value={q}
        onChange={(e) => setQ(e.target.value)}
        placeholder="Search topics, patterns, tags..."
        className="w-full rounded-lg px-3 py-1.5 text-sm outline-none"
        style={{ background: 'var(--surface-2)', border: '1px solid var(--border)', color: 'var(--text)' }}
      />
    </form>
  )
}

const NAV_LINKS = [
  { to: '/', label: 'Dashboard', icon: '📊', end: true },
  { to: '/notes', label: 'In-depth Notes', icon: '📝' },
  { to: '/subjects', label: 'Subjects', icon: '📚' },
  { to: '/study-order', label: 'Study Order', icon: '🗺️' },
  { to: '/search', label: 'Search', icon: '🔎' },
]

export default function Layout() {
  return (
    <div className="flex h-screen" style={{ background: 'var(--bg)' }}>
      <aside
        className="hidden w-56 shrink-0 flex-col gap-1 p-4 md:flex"
        style={{ borderRight: '1px solid var(--border)', background: 'var(--surface)' }}
      >
        <Link to="/" className="mb-4 flex items-center gap-2 px-2">
          <span className="text-xl">🎯</span>
          <span className="font-semibold tracking-tight" style={{ color: 'var(--text)' }}>
            GATE CSE 2027
          </span>
        </Link>
        {NAV_LINKS.map((link) => (
          <NavLink
            key={link.to}
            to={link.to}
            end={link.end}
            className={({ isActive }) =>
              `flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                isActive ? '' : 'hover:opacity-80'
              }`
            }
            style={({ isActive }) => ({
              background: isActive ? 'var(--accent-soft)' : 'transparent',
              color: isActive ? 'var(--accent)' : 'var(--text-muted)',
            })}
          >
            <span>{link.icon}</span>
            {link.label}
          </NavLink>
        ))}
        <div className="mt-auto px-2 text-xs" style={{ color: 'var(--text-faint)' }}>
          PYQ-driven prep system
        </div>
      </aside>

      <div className="flex min-w-0 flex-1 flex-col">
        <header
          className="flex items-center gap-4 px-4 py-3 md:px-6"
          style={{ borderBottom: '1px solid var(--border)', background: 'var(--surface)' }}
        >
          <SearchBox />
          <div className="ml-auto flex items-center gap-2">
            <ThemeToggle />
          </div>
        </header>
        <main className="flex-1 overflow-y-auto scrollbar-thin px-4 py-6 md:px-8">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
