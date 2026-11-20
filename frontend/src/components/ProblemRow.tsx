import { Link } from 'react-router-dom'
import { Check, Clock3, Star } from 'lucide-react'
import type { ProblemSummary } from '../lib/types'
import { cn } from '../lib/utils'
import { DifficultyBadge } from './ui'

export function ProblemRow({problem,index}:{problem:ProblemSummary;index:number}){return <Link to={`/problems/${problem.slug}`} className="group grid grid-cols-[34px_1fr_auto] items-center gap-3 border-t px-4 py-3.5 transition first:border-t-0 hover:bg-moss-50/70 sm:grid-cols-[40px_1fr_100px_90px_52px] dark:hover:bg-moss-400/[.05]"><span className={cn('grid size-7 place-items-center rounded-lg text-xs font-bold',problem.completed?'bg-moss-500 text-white':'bg-slate-100 text-slate-400 dark:bg-white/[.06]')}>{problem.completed?<Check className="size-4"/>:String(index+1).padStart(2,'0')}</span><span className="min-w-0"><span className="block truncate text-sm font-semibold transition group-hover:text-moss-700 dark:group-hover:text-moss-300">{problem.name}</span><span className="mt-1 flex gap-1.5 overflow-hidden sm:hidden">{problem.topics.slice(0,2).map(t=><span key={t} className="truncate text-[10px] text-slate-400">{t}</span>)}</span></span><span className="hidden sm:block"><DifficultyBadge value={problem.difficulty}/></span><span className="hidden items-center gap-1.5 text-xs text-slate-400 sm:flex"><Clock3 className="size-3.5"/>{problem.estimatedMinutes} min</span><span className="flex justify-end text-slate-300">{problem.revision&&<Star className="size-4 fill-amber-400 text-amber-400"/>}</span></Link>}

