import { useMemo, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { ArrowLeft, ArrowRight, BookOpen, Check, CheckCircle2, ChevronRight, Clock3, Lightbulb, ListChecks, RotateCcw, Sparkles, Target, Workflow } from 'lucide-react'
import { CURRICULUM, findLesson, PATTERNS } from '../lib/curriculum'

const PROGRESS_KEY = 'system-atlas-completed'
function readDone(): string[] { try { return JSON.parse(localStorage.getItem(PROGRESS_KEY) || '[]') as string[] } catch { return [] } }

export default function LearnPage() {
  const { slug = '' } = useParams()
  const navigate = useNavigate()
  const entry = findLesson(slug)
  const [done, setDone] = useState<string[]>(readDone)
  const [showNotes, setShowNotes] = useState(false)
  const pattern = entry && 'pattern' in entry ? entry.pattern : undefined
  const lessonIndex = entry ? entry.module.lessons.findIndex((lesson) => lesson.slug === slug) : -1
  const nextLesson = entry && !pattern ? entry.module.lessons[lessonIndex + 1] : undefined
  const nextModule = useMemo(() => {
    if (!entry) return undefined
    const moduleIndex = CURRICULUM.findIndex((item) => item.id === entry.module.id)
    return CURRICULUM[moduleIndex + 1]
  }, [entry])

  if (!entry) return <div className="container-page py-20 text-center"><p className="eyebrow">Topic not found</p><h1 className="mt-3 font-display text-3xl font-extrabold">This lesson may have moved.</h1><Link to="/" className="button-primary mt-6">Back to the learning path</Link></div>

  const isDone = done.includes(slug)
  const toggleDone = () => {
    const updated = isDone ? done.filter((item) => item !== slug) : [...done, slug]
    localStorage.setItem(PROGRESS_KEY, JSON.stringify(updated))
    setDone(updated)
  }
  const ideas = pattern ? [
    `Identify the variation this pattern is designed to contain before introducing its structure.`,
    `Keep callers depending on a stable contract while the implementation or collaboration changes.`,
    `Compare the flexibility it adds with the extra indirection and objects it introduces.`,
  ] : entry.module.ideas
  const practice = pattern
    ? `Imagine you are building ${pattern.example.toLowerCase()}. Explain where ${pattern.name} belongs, what contract it protects, and one reason you might keep the design simpler.`
    : entry.module.practice
  const siblingLessons = entry.module.id === 'patterns' && pattern
    ? PATTERNS.map((item) => ({ slug: item.slug, title: item.name, minutes: 14 }))
    : entry.module.lessons

  return <div className="container-page py-7 sm:py-10">
    <div className="mb-7 flex items-center gap-2 overflow-hidden whitespace-nowrap text-xs text-slate-400"><Link to="/" className="flex items-center gap-1 hover:text-moss-700"><ArrowLeft className="size-3.5" />Learning path</Link><ChevronRight className="size-3.5" /><span className="truncate">{entry.module.title}</span><ChevronRight className="size-3.5" /><span className="truncate text-slate-600 dark:text-slate-300">{entry.lesson.title}</span></div>
    <div className="grid items-start gap-6 xl:grid-cols-[minmax(0,1fr)_300px]">
      <main className="min-w-0 space-y-5">
        <section className="learn-cover overflow-hidden rounded-[26px] border p-6 sm:p-9">
          <div className="relative z-10 max-w-3xl"><div className="flex flex-wrap items-center gap-2"><span className="rounded-full bg-white/75 px-3 py-1.5 text-[10px] font-bold uppercase tracking-[.14em] text-moss-800 dark:bg-white/[.08] dark:text-moss-200">Stage {entry.module.number}</span><span className="rounded-full border border-black/[.06] bg-white/55 px-3 py-1.5 text-[10px] font-bold text-slate-500 dark:border-white/10 dark:bg-white/[.05] dark:text-slate-300">{entry.module.track}</span><span className="inline-flex items-center gap-1.5 text-xs text-slate-500"><Clock3 className="size-3.5" />{entry.lesson.minutes} min</span></div>
            <h1 className="mt-5 font-display text-4xl font-extrabold tracking-[-.055em] sm:text-5xl">{entry.lesson.title}</h1><p className="mt-4 max-w-2xl text-base leading-7 text-slate-600 dark:text-slate-300">{entry.lesson.description}</p>
            <div className="mt-6 flex flex-wrap items-center gap-3"><button onClick={toggleDone} className={isDone ? 'button-secondary !border-moss-300 !bg-moss-50 !text-moss-800 dark:!bg-moss-400/10 dark:!text-moss-200' : 'button-primary'}>{isDone ? <><Check className="size-4" />Completed — mark to revisit</> : <><CheckCircle2 className="size-4" />Mark this lesson complete</>}</button><button onClick={() => setShowNotes((value) => !value)} className="button-secondary"><ListChecks className="size-4" />Design checklist</button></div>
          </div>
        </section>

        <section className="card p-6 sm:p-8"><div className="flex items-center gap-3"><span className="grid size-10 place-items-center rounded-xl bg-moss-50 text-moss-700 dark:bg-moss-400/10 dark:text-moss-300"><BookOpen className="size-5" /></span><div><p className="eyebrow">The mental model</p><h2 className="mt-1 font-display text-xl font-extrabold">A few ideas to keep close</h2></div></div><p className="mt-5 text-sm leading-7 text-slate-600 dark:text-slate-300">{entry.lesson.description} As you work through it, connect each choice back to the users, scale, and constraints of the system you are designing.</p><div className="mt-5 grid gap-3 sm:grid-cols-3">{ideas.map((idea, index) => <div key={idea} className="rounded-2xl border bg-slate-50/70 p-4 dark:bg-white/[.025]"><span className="font-mono text-[10px] font-bold text-moss-700 dark:text-moss-300">0{index + 1}</span><p className="mt-2 text-sm font-semibold leading-6">{idea}</p></div>)}</div></section>

        <section className="card overflow-hidden"><div className="flex items-start gap-3 p-6 sm:p-8"><span className="grid size-10 shrink-0 place-items-center rounded-xl bg-amber-50 text-amber-700 dark:bg-amber-400/10 dark:text-amber-300"><Lightbulb className="size-5" /></span><div><p className="eyebrow !text-amber-700 dark:!text-amber-300">Put it into practice</p><h2 className="mt-1 font-display text-xl font-extrabold">Your design prompt</h2><p className="mt-3 max-w-3xl text-sm leading-7 text-slate-600 dark:text-slate-300">{practice}</p><div className="mt-5 rounded-xl bg-[#17221e] p-4 text-sm leading-6 text-white/80"><span className="font-mono text-[10px] uppercase tracking-[.18em] text-moss-300">Before you move on</span><p className="mt-2">Can you explain what changes if the system grows by 10×, a dependency becomes slow, or a user repeats the same action?</p></div></div></div></section>

        {showNotes && <section className="card p-6 sm:p-8"><div className="flex items-center gap-3"><Target className="size-5 text-moss-600" /><div><p className="eyebrow">Quick review</p><h2 className="mt-1 font-display text-xl font-extrabold">A design checklist</h2></div></div><div className="mt-5 grid gap-3 sm:grid-cols-2">{['Who is the user, and what are they trying to do?', 'What are the important scale and reliability constraints?', 'Where does data live, and who owns each decision?', 'What happens when a dependency fails or a request repeats?'].map((item, index) => <div key={item} className="flex gap-3 rounded-xl border p-3.5 text-sm leading-6"><span className="grid size-6 shrink-0 place-items-center rounded-full bg-moss-50 text-[10px] font-bold text-moss-700 dark:bg-moss-400/10 dark:text-moss-300">{index + 1}</span>{item}</div>)}</div></section>}

        {pattern && <section className="card p-6 sm:p-8"><div className="flex items-center gap-3"><span className="grid size-10 place-items-center rounded-xl bg-violet-50 text-violet-700 dark:bg-violet-400/10 dark:text-violet-300"><Workflow className="size-5" /></span><div><p className="eyebrow !text-violet-700 dark:!text-violet-300">{pattern.family} pattern</p><h2 className="mt-1 font-display text-xl font-extrabold">When it is useful</h2></div></div><p className="mt-4 text-sm leading-7 text-slate-600 dark:text-slate-300">{pattern.usefulWhen}</p><div className="mt-4 rounded-xl border bg-slate-50/70 p-4 dark:bg-white/[.025]"><span className="text-[10px] font-bold uppercase tracking-[.15em] text-slate-400">Example</span><p className="mt-1 text-sm font-semibold">{pattern.example}</p></div><Link to="/patterns" className="mt-5 inline-flex items-center gap-2 text-xs font-bold text-violet-700 hover:underline dark:text-violet-300">Explore related patterns <ArrowRight className="size-3.5" /></Link></section>}

        <div className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border bg-white p-4 dark:bg-white/[.03] sm:p-5"><Link to="/" className="button-secondary"><ArrowLeft className="size-4" />All learning stages</Link>{nextLesson ? <button onClick={() => navigate(`/learn/${nextLesson.slug}`)} className="button-primary">Next lesson <ArrowRight className="size-4" /></button> : nextModule ? <button onClick={() => navigate(`/learn/${nextModule.lessons[0].slug}`)} className="button-primary">Next stage <ArrowRight className="size-4" /></button> : <Link to="/progress" className="button-primary">View your progress <ArrowRight className="size-4" /></Link>}</div>
      </main>

      <aside className="space-y-4 xl:sticky xl:top-[88px]">
        <section className="card overflow-hidden"><div className="border-b p-5"><p className="eyebrow">Stage {entry.module.number}</p><h2 className="mt-1 font-display text-lg font-extrabold">{entry.module.title}</h2><p className="mt-2 text-xs leading-5 text-slate-500 dark:text-slate-400">{entry.module.description}</p></div><div className="max-h-[53vh] overflow-y-auto p-2">{siblingLessons.map((item, index) => <Link key={item.slug} to={`/learn/${item.slug}`} className={`flex items-center gap-3 rounded-xl p-3 transition ${item.slug === slug ? 'bg-moss-50 text-moss-900 dark:bg-moss-400/10 dark:text-moss-200' : 'hover:bg-slate-50 dark:hover:bg-white/[.05]'}`}><span className={`grid size-7 shrink-0 place-items-center rounded-lg text-[10px] font-bold ${done.includes(item.slug) ? 'bg-moss-500 text-white' : 'bg-slate-100 text-slate-500 dark:bg-white/10 dark:text-slate-300'}`}>{done.includes(item.slug) ? <Check className="size-3.5" /> : String(index + 1).padStart(2, '0')}</span><span className="min-w-0 flex-1"><span className="block text-xs font-bold leading-5">{item.title}</span><span className="mt-0.5 block text-[10px] text-slate-400">{item.minutes} min</span></span></Link>)}</div><div className="border-t p-4"><Link to="/" className="flex items-center justify-between text-xs font-bold text-slate-500 hover:text-moss-700 dark:hover:text-moss-300">All stages <ArrowRight className="size-3.5" /></Link></div></section>
        <Link to="/progress" className="group block rounded-2xl bg-[#17221e] p-5 text-white transition hover:bg-[#1e3028]"><div className="flex items-center justify-between"><span className="font-mono text-[10px] uppercase tracking-[.16em] text-moss-300">Your learning rhythm</span><Sparkles className="size-4 text-moss-300" /></div><p className="mt-3 font-display text-lg font-bold">{done.length} lessons complete</p><p className="mt-1 text-xs leading-5 text-white/55">Keep your progress moving, one useful idea at a time.</p><span className="mt-4 inline-flex items-center gap-1.5 text-xs font-bold text-moss-200">Open progress <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-1" /></span></Link>
        {pattern && <div className="rounded-2xl border border-violet-200/70 bg-violet-50/70 p-5 dark:border-violet-300/10 dark:bg-violet-400/[.06]"><div className="flex items-center gap-2 text-violet-800 dark:text-violet-200"><RotateCcw className="size-4" /><span className="text-xs font-bold">Pattern library</span></div><p className="mt-2 text-xs leading-5 text-violet-900/70 dark:text-violet-100/65">Compare this idea with the other patterns in its family.</p><Link to="/patterns" className="mt-3 inline-flex items-center gap-1 text-xs font-bold text-violet-800 hover:underline dark:text-violet-200">Browse patterns <ArrowRight className="size-3.5" /></Link></div>}
      </aside>
    </div>
  </div>
}
