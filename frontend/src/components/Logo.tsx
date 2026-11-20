import { Link } from 'react-router-dom'
import { Boxes } from 'lucide-react'

export function Logo() {
  return <Link to="/" aria-label="System Design Atlas home" className="flex shrink-0 items-center gap-2.5 rounded-lg"><span className="grid size-9 place-items-center rounded-xl bg-ink text-white shadow-sm dark:bg-moss-300 dark:text-ink"><Boxes className="size-[18px]" /></span><span className="font-display text-[15px] font-extrabold tracking-[-.035em] sm:text-base">System Design <span className="text-moss-700 dark:text-moss-300">Atlas</span></span></Link>
}
