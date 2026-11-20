import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { useAuth } from '../state/AuthContext'
import { Skeleton } from './ui'
export function ProtectedRoute({admin=false}:{admin?:boolean}){const {user,loading}=useAuth();const location=useLocation();if(loading)return <div className="container-page py-20"><Skeleton className="mx-auto h-60 max-w-2xl"/></div>;if(!user)return <Navigate to="/login" replace state={{from:location.pathname}}/>;if(admin&&user.role!=='ADMIN')return <Navigate to="/" replace/>;return <Outlet/>}
