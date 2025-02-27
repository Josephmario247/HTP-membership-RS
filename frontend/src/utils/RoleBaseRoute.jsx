 import React from 'react'
import { useAuth } from '../context/AuthContext'
import { Navigate } from 'react-router-dom'
 
 const RoleBaseRoute = ({children, requiredRole}) => {
    const {user, loading} = useAuth()
    if (loading) {
      return (
        //Loading Indicators:
        <div className="flex items-center justify-center h-screen bg-gray-100">
            <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
          </div>
    )
    }
  if (!requiredRole.includes(user.role)) {
    <Navigate to={'/unauthorized'}/>
  }
  return user ? children : <Navigate to={'/login'}/>
 }
 
 export default RoleBaseRoute