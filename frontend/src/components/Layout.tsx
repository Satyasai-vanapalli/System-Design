import { Outlet, Link } from 'react-router-dom'
import { MoveUpRight } from 'lucide-react'
import { Logo } from './Logo'
import { Navbar } from './Navbar'

export function Layout() {
  return <div className="min-h-screen"><Navbar /><main><Outlet /></main><footer className="mt-10 border-t"><div className="container-page grid gap-6 py-8 sm:grid-cols-[1fr_auto] sm:items-center"><div><Logo /><p className="mt-3 max-w-md text-xs leading-5 text-slate-500 dark:text-slate-400">A clear path through the ideas, patterns, and practice behind resilient systems.</p></div><div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-xs font-semibold text-slate-500"><Link to="/" className="hover:text-moss-700 dark:hover:text-moss-300">Learning path</Link><Link to="/patterns" className="hover:text-moss-700 dark:hover:text-moss-300">Pattern library</Link><Link to="/projects" className="hover:text-moss-700 dark:hover:text-moss-300">Project studio</Link><Link to="/progress" className="hover:text-moss-700 dark:hover:text-moss-300">Progress</Link><span className="inline-flex items-center gap-1 text-slate-400">Made for curious builders <MoveUpRight className="size-3" /></span></div></div><div className="border-t"><div className="container-page flex flex-wrap items-center justify-between gap-2 py-3 text-[10px] text-slate-400"><span>© {new Date().getFullYear()} System Design Atlas</span><span>Learn it. Sketch it. Build it.</span></div></div></footer></div>
}
