import { Link, Route, Routes } from 'react-router-dom'
import { ArrowLeft, SearchX } from 'lucide-react'
import { Layout } from './components/Layout'
import HomePage from './pages/HomePage'
import LearnPage from './pages/LearnPage'
import PatternsPage from './pages/PatternsPage'
import ProgressPage from './pages/ProgressPage'
import ProjectsPage from './pages/ProjectsPage'
import ProjectGuidePage from './pages/ProjectGuidePage'

function NotFound() {
  return <div className="container-page grid min-h-[55vh] place-items-center py-16 text-center"><div><span className="mx-auto grid size-14 place-items-center rounded-2xl bg-slate-100 text-slate-500 dark:bg-white/[.06]"><SearchX className="size-6" /></span><p className="eyebrow mt-5">Page not found</p><h1 className="mt-2 font-display text-3xl font-extrabold tracking-tight">That path does not exist.</h1><p className="mt-2 text-sm text-slate-500">Choose a topic from the learning path and keep going.</p><Link to="/" className="button-primary mt-6"><ArrowLeft className="size-4" />Back to the roadmap</Link></div></div>
}

export default function App() {
  return <Routes><Route element={<Layout />}><Route index element={<HomePage />} /><Route path="learn/:slug" element={<LearnPage />} /><Route path="patterns" element={<PatternsPage />} /><Route path="projects" element={<ProjectsPage />} /><Route path="projects/:slug" element={<ProjectGuidePage />} /><Route path="progress" element={<ProgressPage />} /><Route path="*" element={<NotFound />} /></Route></Routes>
}
