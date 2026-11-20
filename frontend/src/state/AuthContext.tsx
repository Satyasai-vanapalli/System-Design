import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from 'react'
import { useQueryClient } from '@tanstack/react-query'
import { api, authApi, tokens } from '../lib/api'
import type { AuthResponse, User } from '../lib/types'

interface AuthState { user:User|null; loading:boolean; login:(email:string,password:string)=>Promise<void>; signup:(name:string,email:string,password:string)=>Promise<void>; logout:()=>Promise<void>; acceptTokens:(access:string,refresh:string)=>Promise<void> }
const AuthContext=createContext<AuthState|null>(null)

export function AuthProvider({children}:{children:ReactNode}){
  const [user,setUser]=useState<User|null>(null);const [loading,setLoading]=useState(Boolean(tokens.access()));const queryClient=useQueryClient()
  useEffect(()=>{if(!tokens.access()){setLoading(false);return}authApi.me().then(setUser).catch(()=>tokens.clear()).finally(()=>setLoading(false))},[])
  const store=(auth:AuthResponse)=>{tokens.set(auth);setUser(auth.user)}
  const value=useMemo<AuthState>(()=>({user,loading,login:async(email,password)=>store(await authApi.login(email,password)),signup:async(name,email,password)=>store(await authApi.signup(name,email,password)),logout:async()=>{const refreshToken=tokens.refresh();try{if(refreshToken)await api('/auth/logout',{method:'POST',body:JSON.stringify({refreshToken})})}finally{tokens.clear();setUser(null);queryClient.clear()}},acceptTokens:async(access,refresh)=>{tokens.set({accessToken:access,refreshToken:refresh});setUser(await authApi.me())}}),[user,loading,queryClient])
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
export const useAuth=()=>{const value=useContext(AuthContext);if(!value)throw new Error('useAuth must be used inside AuthProvider');return value}

