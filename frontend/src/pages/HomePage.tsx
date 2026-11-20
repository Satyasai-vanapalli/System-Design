import { useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowDown, ArrowRight, ArrowUpRight, BookOpen, Boxes, Check, CheckCircle2, ChevronDown, Clock3, Code2, Compass, Database, Layers3, Network, Rocket, Search, Sparkles, Workflow, Zap } from 'lucide-react'
import { Link } from 'react-router-dom'
import { CURRICULUM, PATTERNS, type Track } from '../lib/curriculum'
import { PROJECTS } from '../lib/projects'

const tracks: Array<'Everything' | Track> = ['Everything', 'Foundations', 'LLD', 'HLD', 'Advanced']
const icons = [Compass, Boxes, Code2, Workflow, Layers3, Network, Database, Zap]
const TRACK_STYLES: Record<Track, string> = {
  Foundations: 'bg-emerald-50 text-emerald-700 dark:bg-emerald-400/10 dark:text-emerald-300',
  LLD: 'bg-violet-50 text-violet-700 dark:bg-violet-400/10 dark:text-violet-300',
  HLD: 'bg-sky-50 text-sky-700 dark:bg-sky-400/10 dark:text-sky-300',
  Advanced: 'bg-amber-50 text-amber-700 dark:bg-amber-400/10 dark:text-amber-300',
}
const PROGRESS_KEY = 'system-atlas-completed'
function readDone(): string[] { try { return JSON.parse(localStorage.getItem(PROGRESS_KEY) || '[]') as string[] } catch { return [] } }

export default function HomePage() {
  const [track, setTrack] = useState<(typeof tracks)[number]>('Everything')
  const [query, setQuery] = useState('')
  const [expanded, setExpanded] = useState<string[]>([])
  const done = useMemo(readDone, [])
  const filtered = CURRICULUM.filter((module) => (track === 'Everything' || module.track === track) &&
    (!query || `${module.title} ${module.description} ${module.lessons.map((item) => item.title).join(' ')}`.toLowerCase().includes(query.toLowerCase())))
  const lessonCount = CURRICULUM.reduce((count, module) => count + module.lessons.length, 0)
  const roadmapComplete = done.length >= lessonCount + PATTERNS.length
  const toggleExpanded = (id: string) => setExpanded((current) => current.includes(id) ? current.filter((item) => item !== id) : [...current, id])

  return <>
    <section className="hero-surface relative overflow-hidden border-b">
      <div className="hero-grid absolute inset-0" />
      <div className="container-page relative grid gap-12 py-14 sm:py-20 lg:grid-cols-[1.05fr_.95fr] lg:items-center lg:gap-14 lg:py-24">
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .55 }}>
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-moss-200/80 bg-white/80 px-3.5 py-2 text-xs font-semibold text-moss-800 shadow-sm dark:border-white/10 dark:bg-white/[.06] dark:text-moss-200"><Sparkles className="size-3.5" /> A guided path from first principles to production</div>
          <h1 className="max-w-3xl font-display text-[clamp(3rem,6.7vw,5.5rem)] font-extrabold leading-[.94] tracking-[-.07em]">Think bigger.<br /><span className="text-moss-600 dark:text-moss-300">Design clearly.</span></h1>
          <p className="mt-6 max-w-xl text-base leading-7 text-slate-600 dark:text-slate-300 sm:text-lg sm:leading-8">A practical, step-by-step way to learn system design. Start with the basics, get confident in LLD and HLD, then bring it all together in real-world designs.</p>
          <div className="mt-8 flex flex-wrap items-center gap-3"><Link to="/learn/systems-thinking" className="button-primary group !rounded-xl !px-5 !py-3.5">Start learning <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" /></Link><a href="#roadmap" className="button-secondary !rounded-xl !px-5 !py-3.5">Explore the roadmap <ArrowDown className="size-4" /></a></div>
          <div className="mt-9 flex flex-wrap gap-x-7 gap-y-3 text-xs font-semibold text-slate-500 dark:text-slate-400"><span className="inline-flex items-center gap-2"><BookOpen className="size-4 text-moss-600" />{lessonCount} focused lessons</span><span className="inline-flex items-center gap-2"><Layers3 className="size-4 text-moss-600" />8 clear learning stages</span><span className="inline-flex items-center gap-2"><CheckCircle2 className="size-4 text-moss-600" />Progress saved on this device</span></div>
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 20, scale: .98 }} animate={{ opacity: 1, y: 0, scale: 1 }} transition={{ delay: .12, duration: .6 }} className="relative mx-auto w-full max-w-[590px] lg:ml-auto">
          <div className="diagram-halo absolute -inset-9 rounded-full blur-3xl" />
          <div className="architecture-card relative overflow-hidden rounded-[26px] border border-white/10 bg-[#121c1b] p-5 text-white shadow-lift sm:p-7">
            <div className="flex items-center justify-between border-b border-white/10 pb-5"><div><p className="font-mono text-[10px] font-medium uppercase tracking-[.24em] text-moss-300">A design, layer by layer</p><h2 className="mt-2 font-display text-xl font-bold tracking-tight">A system you can reason about</h2></div><span className="grid size-11 place-items-center rounded-2xl border border-moss-300/20 bg-moss-300/10 text-moss-200"><Network className="size-5" /></span></div>
            <div className="relative mt-5 space-y-3">
              <div className="architecture-line absolute left-[22px] top-7 bottom-7 w-px" />
              {[
                { icon: Code2, title: 'Clients & API', caption: 'Clear contracts · predictable requests', label: '01' },
                { icon: Workflow, title: 'Application services', caption: 'Business rules · independent scaling', label: '02' },
                { icon: Database, title: 'Data & messaging', caption: 'Persistence · asynchronous work', label: '03' },
                { icon: GlobeIcon, title: 'Operations & delivery', caption: 'Observability · resilient rollout', label: '04' },
              ].map(({ icon: Icon, title, caption, label }, index) => <motion.div key={label} initial={{ opacity: 0, x: 12 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: .35 + index * .1 }} className="relative grid grid-cols-[44px_1fr_auto] items-center gap-3 rounded-2xl border border-white/[.08] bg-white/[.045] p-3.5 transition hover:border-moss-300/35 hover:bg-white/[.075] sm:p-4"><span className="relative z-10 grid size-11 place-items-center rounded-xl border border-moss-200/15 bg-[#172522] text-moss-200"><Icon className="size-[18px]" /></span><span><span className="block text-sm font-bold">{title}</span><span className="mt-1 block text-[11px] leading-4 text-slate-400">{caption}</span></span><span className="font-mono text-[10px] text-white/35">{label}</span></motion.div>)}
            </div>
            <div className="mt-5 flex items-center justify-between rounded-xl border border-white/[.08] bg-white/[.035] px-4 py-3"><span className="flex items-center gap-2 text-xs text-slate-300"><span className="size-1.5 rounded-full bg-moss-300 shadow-[0_0_10px_#9fc58a]" /> Every decision has a tradeoff</span><span className="font-mono text-[10px] text-slate-500">SYSTEMS / 101</span></div>
          </div>
        </motion.div>
      </div>
    </section>

    <section className="container-page py-11 sm:py-14">
      <div className="grid gap-3 sm:grid-cols-3">
        <div className="stat-card"><span className="stat-icon bg-emerald-50 text-emerald-700 dark:bg-emerald-400/10 dark:text-emerald-300"><BookOpen className="size-5" /></span><span><span className="block font-display text-2xl font-extrabold tracking-tight">{lessonCount}</span><span className="mt-1 block text-xs text-slate-500 dark:text-slate-400">Short, structured lessons</span></span></div>
        <div className="stat-card"><span className="stat-icon bg-violet-50 text-violet-700 dark:bg-violet-400/10 dark:text-violet-300"><Workflow className="size-5" /></span><span><span className="block font-display text-2xl font-extrabold tracking-tight">16</span><span className="mt-1 block text-xs text-slate-500 dark:text-slate-400">Classic design patterns</span></span></div>
        <div className="stat-card"><span className="stat-icon bg-sky-50 text-sky-700 dark:bg-sky-400/10 dark:text-sky-300"><Network className="size-5" /></span><span><span className="block font-display text-2xl font-extrabold tracking-tight">13</span><span className="mt-1 block text-xs text-slate-500 dark:text-slate-400">Hands-on design case studies</span></span></div>
      </div>
    </section>

    <section id="roadmap" className="container-page scroll-mt-24 pb-8 pt-10 sm:pt-14">
      <div className="mb-8 grid gap-6 lg:grid-cols-[1fr_auto] lg:items-end">
        <div><p className="eyebrow">The learning path</p><h2 className="mt-2 font-display text-3xl font-extrabold tracking-[-.045em] sm:text-4xl">Build your understanding, layer by layer.</h2><p className="mt-3 max-w-2xl text-sm leading-6 text-slate-500 dark:text-slate-400">Follow the sequence or jump straight to the topic you need. Each stage builds on the last, with practical prompts to make the ideas stick.</p></div>
        <div className="relative w-full lg:w-[290px]"><Search className="absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-slate-400" /><input value={query} onChange={(event) => setQuery(event.target.value)} aria-label="Filter the learning path" placeholder="Find a topic..." className="h-11 w-full rounded-xl border bg-white pl-10 pr-4 text-sm outline-none transition placeholder:text-slate-400 focus:border-moss-400 focus:ring-4 focus:ring-moss-500/10 dark:bg-white/[.04]" /></div>
      </div>
      <div className="mb-7 flex gap-2 overflow-x-auto pb-1 scrollbar-none">{tracks.map((item) => <button key={item} onClick={() => setTrack(item)} className={`whitespace-nowrap rounded-full border px-4 py-2 text-xs font-bold transition ${track === item ? 'border-ink bg-ink text-white dark:border-moss-300 dark:bg-moss-300 dark:text-ink' : 'bg-white text-slate-500 hover:border-moss-300 dark:bg-white/[.04] dark:text-slate-300'}`}>{item}</button>)}</div>
      {filtered.length ? <div className="grid items-start gap-4 lg:grid-cols-2">{filtered.map((module) => {
        const Icon = icons[Number(module.number) - 1] || Boxes
        const isExpanded = expanded.includes(module.id)
        const visibleLessons = isExpanded ? module.lessons : module.lessons.slice(0, 3)
        const completed = module.lessons.filter((item) => done.includes(item.slug)).length
        return <motion.article layout key={module.id} className="module-card">
          <div className="flex items-start gap-4"><span className={`module-icon ${TRACK_STYLES[module.track]}`}><Icon className="size-5" /></span><div className="min-w-0 flex-1"><div className="flex flex-wrap items-center gap-2"><span className={`rounded-full px-2.5 py-1 text-[10px] font-bold ${TRACK_STYLES[module.track]}`}>{module.track}</span><span className="text-[10px] font-semibold uppercase tracking-[.12em] text-slate-400">{module.level}</span></div><h3 className="mt-2 font-display text-xl font-extrabold tracking-tight">{module.number}. {module.title}</h3></div><span className="hidden items-center gap-1.5 pt-1 text-[11px] font-medium text-slate-400 sm:inline-flex"><Clock3 className="size-3.5" />{module.time}</span></div>
          <p className="mt-4 text-sm leading-6 text-slate-500 dark:text-slate-400">{module.description}</p>
          <div className="mt-5 space-y-1.5">{visibleLessons.map((lesson, index) => <Link key={lesson.slug} to={`/learn/${lesson.slug}`} className="lesson-row group"><span className={`grid size-7 shrink-0 place-items-center rounded-lg text-[10px] font-bold ${done.includes(lesson.slug) ? 'bg-moss-500 text-white' : 'bg-slate-100 text-slate-500 dark:bg-white/[.08] dark:text-slate-300'}`}>{done.includes(lesson.slug) ? <Check className="size-3.5" /> : String(index + 1).padStart(2, '0')}</span><span className="min-w-0 flex-1"><span className="block truncate text-sm font-semibold transition group-hover:text-moss-700 dark:group-hover:text-moss-300">{lesson.title}</span><span className="mt-0.5 block truncate text-xs text-slate-400">{lesson.description}</span></span><span className="hidden shrink-0 items-center gap-1 text-[10px] text-slate-400 sm:inline-flex"><Clock3 className="size-3" />{lesson.minutes}m</span><ArrowUpRight className="size-4 shrink-0 text-slate-300 transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-moss-600" /></Link>)}</div>
          <div className="mt-4 flex flex-wrap items-center justify-between gap-3 border-t pt-4"><button onClick={() => toggleExpanded(module.id)} className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-500 transition hover:text-ink dark:hover:text-white">{isExpanded ? 'Show fewer' : `Explore all ${module.lessons.length} lessons`}<ChevronDown className={`size-3.5 transition-transform ${isExpanded ? 'rotate-180' : ''}`} /></button><span className="text-[10px] font-medium text-slate-400">{completed} / {module.lessons.length} complete</span></div>
          {module.id === 'patterns' && <Link to="/patterns" className="mt-4 flex items-center justify-between rounded-xl border border-violet-200/70 bg-violet-50/70 px-3.5 py-3 text-xs font-bold text-violet-800 transition hover:bg-violet-100 dark:border-violet-300/10 dark:bg-violet-400/[.07] dark:text-violet-200"><span className="flex items-center gap-2"><Workflow className="size-4" /> Browse all 16 patterns in the library</span><ArrowRight className="size-4" /></Link>}
        </motion.article>
      })}</div> : <div className="card grid place-items-center px-6 py-14 text-center"><Search className="mb-3 size-6 text-slate-400" /><h3 className="font-display font-bold">No topics found</h3><p className="mt-1 text-sm text-slate-500">Try another search or learning stage.</p></div>}
    </section>

    <section className="container-page py-14 sm:py-20"><div className="overflow-hidden rounded-[26px] bg-[#15211d] p-6 text-white shadow-lift sm:p-9 lg:p-11"><div className="grid gap-7 lg:grid-cols-[1fr_auto] lg:items-center"><div><p className="eyebrow !text-moss-300">A pattern is a tool, not a rule</p><h2 className="mt-2 max-w-2xl font-display text-3xl font-extrabold tracking-[-.045em] sm:text-4xl">Meet the patterns you'll reach for again and again.</h2><p className="mt-3 max-w-xl text-sm leading-6 text-white/60">Explore creational, structural, and behavioral patterns with a plain-language guide to when each one helps.</p></div><Link to="/patterns" className="button-secondary w-fit !border-white/15 !bg-white/[.07] !text-white hover:!bg-white/[.13]">Explore the pattern library <ArrowRight className="size-4" /></Link></div></div></section>

    <section className="container-page pb-14 sm:pb-20"><div className="mb-7 flex flex-col justify-between gap-5 sm:flex-row sm:items-end"><div><p className="eyebrow">{roadmapComplete ? 'Roadmap complete · time to build' : 'Recommended after the roadmap'}</p><h2 className="mt-2 font-display text-3xl font-extrabold tracking-[-.045em] sm:text-4xl">{roadmapComplete ? 'Put your system design skills to work.' : 'Five projects. A clear plan for each.'}</h2><p className="mt-3 max-w-2xl text-sm leading-6 text-slate-500 dark:text-slate-400">Build from a first API to a distributed media platform. Every guide includes the architecture, data model, endpoints, step-by-step milestones, and ways to extend it.</p></div><Link to="/projects" className="button-primary w-fit">Open project studio <ArrowRight className="size-4" /></Link></div><div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">{PROJECTS.map((project) => <Link key={project.slug} to={`/projects/${project.slug}`} className="group rounded-2xl border bg-white p-4 transition hover:-translate-y-0.5 hover:border-moss-300 hover:shadow-soft dark:bg-[#161d19]"><div className="flex items-center justify-between"><span className="grid size-9 place-items-center rounded-xl bg-moss-50 text-moss-700 dark:bg-moss-400/10 dark:text-moss-300"><Rocket className="size-4" /></span><span className="font-mono text-[10px] text-slate-400">{project.number}</span></div><h3 className="mt-3 font-display font-extrabold">{project.title}</h3><p className="mt-1 text-xs leading-5 text-slate-500 dark:text-slate-400">{project.focus}</p><span className="mt-3 inline-flex items-center gap-1 text-[10px] font-bold text-moss-700 group-hover:underline dark:text-moss-300">Open build guide <ArrowUpRight className="size-3.5" /></span></Link>)}</div></section>
  </>
}

function GlobeIcon({ className }: { className?: string }) { return <Network className={className} /> }
