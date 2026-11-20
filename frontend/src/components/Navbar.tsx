import { useEffect, useMemo, useRef, useState } from 'react'
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom'
import { ArrowUpRight, BookOpen, Menu, Moon, Rocket, Search, Sun, Workflow, X } from 'lucide-react'
import { useTheme } from '../state/useTheme'
import { Logo } from './Logo'
import { ALL_LESSONS, PATTERNS } from '../lib/curriculum'
import { PROJECTS } from '../lib/projects'

const linkStyle = ({ isActive }: { isActive: boolean }) => `rounded-lg px-3 py-2 text-sm font-semibold transition ${isActive ? 'bg-black/[.055] text-ink dark:bg-white/[.08] dark:text-white' : 'text-slate-500 hover:bg-black/[.035] hover:text-ink dark:text-slate-400 dark:hover:bg-white/[.05] dark:hover:text-white'}`

export function Navbar() {
  const { dark, toggle } = useTheme()
  const [query, setQuery] = useState('')
  const [searchOpen, setSearchOpen] = useState(false)
  const [mobile, setMobile] = useState(false)
  const searchRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const location = useLocation()
  const navigate = useNavigate()
  const matches = useMemo(() => {
    if (query.trim().length < 2) return []
    const term = query.trim().toLowerCase()
    const lessons = ALL_LESSONS.filter((item) => `${item.title} ${item.description}`.toLowerCase().includes(term)).map((item) => ({ title: item.title, subtitle: item.description, to: `/learn/${item.slug}`, icon: BookOpen }))
    const patterns = PATTERNS.filter((item) => `${item.name} ${item.family} ${item.intent}`.toLowerCase().includes(term)).map((item) => ({ title: item.name, subtitle: `${item.family} pattern · ${item.intent}`, to: `/learn/${item.slug}`, icon: Workflow }))
    const projects = PROJECTS.filter((item) => `${item.title} ${item.focus} ${item.summary}`.toLowerCase().includes(term)).map((item) => ({ title: item.title, subtitle: `Guided project · ${item.focus}`, to: `/projects/${item.slug}`, icon: Rocket }))
    return [...lessons, ...patterns, ...projects].slice(0, 6)
  }, [query])
  useEffect(() => { setQuery(''); setSearchOpen(false); setMobile(false) }, [location.pathname])
  useEffect(() => {
    const close = (event: MouseEvent) => { if (!searchRef.current?.contains(event.target as Node)) setSearchOpen(false) }
    document.addEventListener('mousedown', close)
    return () => document.removeEventListener('mousedown', close)
  }, [])
  useEffect(() => {
    const shortcut = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k') {
        event.preventDefault()
        setSearchOpen(true)
        inputRef.current?.focus()
      }
    }
    document.addEventListener('keydown', shortcut)
    return () => document.removeEventListener('keydown', shortcut)
  }, [])
  const choose = (to: string) => { navigate(to); setQuery(''); setSearchOpen(false) }

  return <header className="sticky top-0 z-40 border-b border-black/[.06] bg-paper/90 backdrop-blur-xl dark:border-white/[.07] dark:bg-[#101512]/90">
    <div className="container-page flex h-[68px] items-center gap-4 lg:gap-6"><Logo />
      <nav className="ml-2 hidden items-center gap-1 md:flex"><NavLink to="/" end className={linkStyle}>Roadmap</NavLink><NavLink to="/patterns" className={linkStyle}>Patterns</NavLink><NavLink to="/projects" className={linkStyle}>Projects</NavLink><NavLink to="/progress" className={linkStyle}>Progress</NavLink></nav>
      <div ref={searchRef} className="relative ml-auto hidden w-full max-w-[310px] lg:block"><div className={`flex h-10 items-center gap-2 rounded-xl border bg-white px-3 transition dark:bg-white/[.04] ${searchOpen ? 'border-moss-400 ring-4 ring-moss-500/10' : ''}`}><Search className="size-4 shrink-0 text-slate-400" /><input ref={inputRef} value={query} onChange={(event) => { setQuery(event.target.value); setSearchOpen(true) }} onFocus={() => setSearchOpen(true)} onKeyDown={(event) => { if (event.key === 'Escape') setSearchOpen(false); if (event.key === 'Enter' && matches[0]) choose(matches[0].to) }} aria-label="Search lessons and patterns" placeholder="Search lessons..." className="w-full bg-transparent text-sm outline-none placeholder:text-slate-400" />{query && <button onClick={() => setQuery('')} aria-label="Clear search" className="text-slate-400"><X className="size-3.5" /></button>}<kbd className="rounded-md border bg-slate-50 px-1.5 py-0.5 font-mono text-[9px] text-slate-400 dark:bg-white/[.04]">Ctrl K</kbd></div>
        {searchOpen && query.trim().length >= 2 && <div className="card absolute left-0 right-0 top-[calc(100%+8px)] z-50 overflow-hidden p-2 shadow-lift"><p className="px-3 pb-2 pt-1 text-[9px] font-bold uppercase tracking-[.15em] text-slate-400">Learning library</p>{matches.length ? matches.map((item) => <button key={item.to} onClick={() => choose(item.to)} className="group flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left transition hover:bg-moss-50 dark:hover:bg-white/[.06]"><span className="grid size-8 shrink-0 place-items-center rounded-lg bg-slate-100 text-slate-500 dark:bg-white/10"><item.icon className="size-4" /></span><span className="min-w-0 flex-1"><span className="block truncate text-xs font-bold">{item.title}</span><span className="mt-0.5 block truncate text-[10px] text-slate-500">{item.subtitle}</span></span><ArrowUpRight className="size-3.5 text-slate-300 transition group-hover:text-moss-600" /></button>) : <p className="px-3 py-5 text-center text-xs text-slate-500">No lessons match “{query}”.</p>}</div>}
      </div>
      <button onClick={toggle} aria-label="Toggle theme" className="grid size-10 shrink-0 place-items-center rounded-xl border bg-white text-slate-500 transition hover:text-ink dark:bg-white/[.04] dark:text-slate-300 dark:hover:text-white">{dark ? <Sun className="size-4" /> : <Moon className="size-4" />}</button>
      <Link to="/learn/systems-thinking" className="button-primary hidden !rounded-xl !px-3.5 !py-2.5 text-xs sm:inline-flex">Start learning <ArrowUpRight className="size-3.5" /></Link>
      <button onClick={() => setMobile((value) => !value)} aria-label="Toggle menu" className="grid size-10 shrink-0 place-items-center rounded-xl border md:hidden">{mobile ? <X className="size-5" /> : <Menu className="size-5" />}</button>
    </div>
    {mobile && <div className="container-page border-t py-4 md:hidden"><div className="grid gap-1"><NavLink to="/" end className={linkStyle}>Learning path</NavLink><NavLink to="/patterns" className={linkStyle}>Pattern library</NavLink><NavLink to="/projects" className={linkStyle}>Project studio</NavLink><NavLink to="/progress" className={linkStyle}>My progress</NavLink></div><div className="mt-3"><label className="flex h-11 items-center gap-2 rounded-xl border bg-white px-3 dark:bg-white/[.04]"><Search className="size-4 text-slate-400" /><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search lessons..." aria-label="Search lessons and patterns" className="w-full bg-transparent text-sm outline-none" /></label>{query.trim().length >= 2 && <div className="mt-2 overflow-hidden rounded-xl border bg-white p-1 dark:bg-[#161d19]">{matches.length ? matches.map((item) => <button key={item.to} onClick={() => choose(item.to)} className="flex w-full items-center gap-3 rounded-lg p-2.5 text-left"><item.icon className="size-4 text-moss-700 dark:text-moss-300" /><span className="text-xs font-semibold">{item.title}</span></button>) : <p className="p-3 text-xs text-slate-500">No matches yet.</p>}</div>}</div></div>}
  </header>
}
