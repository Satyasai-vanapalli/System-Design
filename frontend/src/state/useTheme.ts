import { useEffect, useState } from 'react'
export function useTheme(){
  const [dark,setDark]=useState(()=>localStorage.getItem('dsa_theme')==='dark'||(!localStorage.getItem('dsa_theme')&&matchMedia('(prefers-color-scheme: dark)').matches))
  useEffect(()=>{document.documentElement.classList.toggle('dark',dark);localStorage.setItem('dsa_theme',dark?'dark':'light')},[dark])
  return {dark,toggle:()=>setDark(v=>!v)}
}

