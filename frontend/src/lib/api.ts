import type { AuthResponse } from './types'

const API = import.meta.env.VITE_API_URL || '/api'
const ACCESS_KEY = 'dsa_access_token'
const REFRESH_KEY = 'dsa_refresh_token'

export const tokens = {
  access: () => localStorage.getItem(ACCESS_KEY),
  refresh: () => localStorage.getItem(REFRESH_KEY),
  set: (auth: Pick<AuthResponse,'accessToken'|'refreshToken'>) => { localStorage.setItem(ACCESS_KEY,auth.accessToken); localStorage.setItem(REFRESH_KEY,auth.refreshToken) },
  clear: () => { localStorage.removeItem(ACCESS_KEY); localStorage.removeItem(REFRESH_KEY) },
}

async function refreshAccess() {
  const refreshToken=tokens.refresh()
  if(!refreshToken) return false
  const response=await fetch(`${API}/auth/refresh`,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({refreshToken})})
  if(!response.ok){tokens.clear();return false}
  const auth:AuthResponse=await response.json();tokens.set(auth);return true
}

export async function api<T>(path:string, options:RequestInit={}, canRefresh=true):Promise<T>{
  const headers=new Headers(options.headers); if(options.body&&!headers.has('Content-Type'))headers.set('Content-Type','application/json'); const access=tokens.access();if(access)headers.set('Authorization',`Bearer ${access}`)
  const response=await fetch(`${API}${path}`,{...options,headers})
  if(response.status===401&&canRefresh&&await refreshAccess())return api<T>(path,options,false)
  if(!response.ok){let message='Something went wrong';try{const body=await response.json();message=body.message||message}catch{/* empty */}throw new Error(message)}
  if(response.status===204)return undefined as T
  return response.json()
}

export const authApi = {
  login:(email:string,password:string)=>api<AuthResponse>('/auth/login',{method:'POST',body:JSON.stringify({email,password})}),
  signup:(name:string,email:string,password:string)=>api<AuthResponse>('/auth/signup',{method:'POST',body:JSON.stringify({name,email,password})}),
  me:()=>api<AuthResponse['user']>('/auth/me'),
}

