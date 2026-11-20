import { useEffect, useRef, useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'
import { ArrowUpRight, BookOpen, Search, X } from 'lucide-react'
import { api } from '../lib/api'
import type { SearchResult } from '../lib/types'
import { DifficultyBadge } from './ui'

export function SearchBox({compact=false}:{compact?:boolean}){
  const [query,setQuery]=useState('');const [value,setValue]=useState('');const [focused,setFocused]=useState(false);const navigate=useNavigate();const ref=useRef<HTMLDivElement>(null)
  useEffect(()=>{const timer=setTimeout(()=>setQuery(value.trim()),180);return()=>clearTimeout(timer)},[value])
  useEffect(()=>{const close=(e:MouseEvent)=>{if(!ref.current?.contains(e.target as Node))setFocused(false)};document.addEventListener('mousedown',close);return()=>document.removeEventListener('mousedown',close)},[])
  const {data=[]}=useQuery({queryKey:['search',query],queryFn:()=>api<SearchResult[]>(`/search?q=${encodeURIComponent(query)}`),enabled:query.length>=2})
  const select=(path:string)=>{navigate(path);setFocused(false);setValue('')}
  return <div ref={ref} className="relative w-full"><div className={`flex items-center gap-2 rounded-xl border bg-white transition focus-within:border-moss-400 focus-within:ring-4 focus-within:ring-moss-500/10 dark:bg-white/[.05] ${compact?'h-10 px-3':'h-12 px-4'}`}><Search className="size-4 shrink-0 text-slate-400"/><input value={value} onChange={e=>setValue(e.target.value)} onFocus={()=>setFocused(true)} aria-label="Search concepts and problems" placeholder="Search concepts or problems..." className="w-full bg-transparent text-sm outline-none placeholder:text-slate-400"/>{value&&<button onClick={()=>setValue('')} aria-label="Clear search"><X className="size-4 text-slate-400"/></button>} {!compact&&<kbd className="hidden rounded-md border bg-slate-50 px-1.5 py-0.5 text-[10px] text-slate-400 sm:block dark:bg-white/[.04]">⌘ K</kbd>}</div>
  {focused&&query.length>=2&&<div className="card absolute left-0 right-0 top-[calc(100%+8px)] z-50 overflow-hidden p-2 shadow-lift"><p className="px-3 pb-2 pt-1 text-[10px] font-bold uppercase tracking-[.16em] text-slate-400">Quick results</p>{data.length===0?<div className="px-3 py-6 text-center text-sm text-slate-500">No paths found for “{query}”</div>:data.map((item,i)=><button key={`${item.path}-${i}`} onClick={()=>select(item.path)} className="group flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left hover:bg-moss-50 dark:hover:bg-white/[.06]"><span className="grid size-8 shrink-0 place-items-center rounded-lg bg-slate-100 text-slate-500 dark:bg-white/10"><BookOpen className="size-4"/></span><span className="min-w-0 flex-1"><span className="block truncate text-sm font-semibold">{item.title}</span><span className="block truncate text-xs text-slate-500 dark:text-slate-400">{item.subtitle}</span></span>{item.difficulty&&<DifficultyBadge value={item.difficulty}/>}<ArrowUpRight className="size-4 text-slate-300 transition group-hover:text-moss-600"/></button>)}</div>}</div>
}

