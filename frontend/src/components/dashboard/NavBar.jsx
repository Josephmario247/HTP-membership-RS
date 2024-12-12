import React from 'react'
import { useAuth } from '../../context/AuthContext'

const NavBar = () => {
    const {user, logout} = useAuth()
  return (
    <div className='flex items-center text-white h-12 w-screen justify-between fixed bg-[#41436A] px-5 z-50'>
        <marquee><p className='font-poppins'>Welcome {user.name} To Holy Trinity Parish Registration System</p></marquee>
        <button className='px-4 py-1 bg-[#41436A] rounded-md hover:bg-[#141638] mr-64' onClick={logout}>Logout</button> 
    </div>
  )
}

export default NavBar;