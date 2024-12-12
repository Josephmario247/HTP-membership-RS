import React from 'react'
import { useAuth } from '../context/AuthContext'
import { Outlet } from 'react-router-dom'
import AdminSideBar from '../components/dashboard/AdminSideBar'
import NavBar from '../components/dashboard/NavBar'

const AdminDashboard = () => {
  const {user} = useAuth()
  
  return (
    <div className='flex md:flex-col'>
      <AdminSideBar/>
      <div className='flex-1 md:flex-col ml-64 bg-gray-100 h-screen'>
        <NavBar/>
        <Outlet/>
      </div>
    </div>
  )

}
export default AdminDashboard;