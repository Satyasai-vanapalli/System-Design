import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'
import type { Difficulty, Language } from './types'

export const cn = (...inputs: ClassValue[]) => twMerge(clsx(inputs))
export const difficultyLabel: Record<Difficulty,string> = { EASY:'Easy', MEDIUM:'Medium', HARD:'Hard' }
export const difficultyClass: Record<Difficulty,string> = {
  EASY:'bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-400/10 dark:text-emerald-300 dark:border-emerald-400/20',
  MEDIUM:'bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-400/10 dark:text-amber-300 dark:border-amber-400/20',
  HARD:'bg-rose-50 text-rose-700 border-rose-200 dark:bg-rose-400/10 dark:text-rose-300 dark:border-rose-400/20',
}
export const languageLabel: Record<Language,string> = { C:'C', CPP:'C++', JAVA:'Java', PYTHON:'Python', KOTLIN:'Kotlin' }
export const monacoLanguage: Record<Language,string> = { C:'c', CPP:'cpp', JAVA:'java', PYTHON:'python', KOTLIN:'kotlin' }
export const extension: Record<Language,string> = { C:'c', CPP:'cpp', JAVA:'java', PYTHON:'py', KOTLIN:'kt' }

