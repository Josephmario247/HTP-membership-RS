import React from 'react'
import { useAuth } from '../../context/AuthContext'

const NavBar = () => {
    const {user, logout} = useAuth()
  return (
    <div className='flex items-center text-white h-12 md:w-screen w-full justify-between fixed bg-[#41436A] px-5 md:z-50'>
        <marquee><p className='font-poppins hidden md:flex'>Welcome {user.name} To Holy Trinity Parish Registration System</p></marquee>
        <button className='px-4 py-1 bg-[#41436A] rounded-md md:hover:bg-[#141638] md:mr-64 ml-64 md:ml-0 ' onClick={logout}>Logout</button> 
    </div>
  )
}

export default NavBar;