import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import {
  FaCogs,
  FaTachometerAlt,
  FaUser,
  FaUsers
} from 'react-icons/fa';
import NavBar from './NavBar';
import { FaBars } from 'react-icons/fa6';
import images from '../../assets/images.jpeg';
const AdminSideBar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };
  return (
    <>
      {/* Logo Section */}
      {/* <div
        className="bg-[#41436A] text-white h-12 pr-40 fixed flex items-center px-5 justify-items-start md:group-hover:justify-start md:group-hover:px-4
                   transition-all duration-300"
      >
        <h3 className="text-2xl font-poppins">HTP-MRS</h3>
      </div> */}
      <div className="bg-[#41436A] text-white h-12 w-60 pr-20 md:pr-60 fixed flex items-center px-5 justify-between md:w-full z-50">
         <img src={images} alt="HT-img"className=" rounded-full w-10 h-10 ml-0 hidden md:block" />
        <h3 className="text-xl font-poppins ml-10 px-2 absolute">Holy Trinity</h3>
        <button onClick={toggleSidebar} className="md:hidden absolute">
          <FaBars className="text-2xl" />
        </button>
      </div>
      {/* <div
        className="bg-gray-800 text-white md:h-screen w-full md:w-20 fixed left-0 top-[3rem] bottom-0 flex flex-col space-y-2 group md:hover:w-64  transition-all duration-300 overflow-hidden transform -translate-x-full md:translate-x-0"
      > */}
      <div className={`bg-gray-800 bg-opacity-80 md:bg-opacity-100 text-white h-screen fixed left-0 top-[3rem] bottom-0 flex flex-col space-y-2 
                  group w-56 md:w-20 md:hover:w-64 transition-all duration-300 overflow-hidden 
                   transform ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0`}>

        {/* Navigation Links */}
        <div className="px-2 space-y-4 mt-4">
          <NavLink
            to="/admin-dashboard"
            className={({ isActive }) =>
              `${isActive ? 'bg-[#41436A]' : ''} flex items-center space-x-4 py-2.5 px-4 rounded group-hover:px-4`
            }
            end
          >
            <FaTachometerAlt className="text-lg" />
            <span className=" md:hidden group-hover:block">Dashboard</span>
          </NavLink>
          <NavLink
            to="/admin-dashboard/register-member"
            className={({ isActive }) =>
              `${isActive ? 'bg-[#41436A]' : ''} flex items-center space-x-4 py-2.5 px-4 rounded group-hover:px-4`
            }
            end
          >
            <FaUser className="text-lg" />
            <span className="md:hidden group-hover:block">Register Member</span>
          </NavLink>
          <NavLink
            to="/admin-dashboard/members"
            className={({ isActive }) =>
              `${isActive ? 'bg-[#41436A]' : ''} flex items-center space-x-4 py-2.5 px-4 rounded group-hover:px-4`
            }
          >
            <FaUsers className="text-lg" />
            <span className="md:hidden group-hover:block">Members</span>
          </NavLink>
          <NavLink
            to="/admin-dashboard/member/modify/regNo"
            className={({ isActive }) =>
              `${isActive ? 'bg-[#41436A]' : ''} flex items-center space-x-4 py-2.5 px-4 rounded group-hover:px-4`
            }
          >
            <FaUser className="text-lg" />
            <span className="md:hidden group-hover:block">Modify Member</span>
          </NavLink>
          {/* <NavLink
            // to="/admin-dashboard/baptism/register"
            className={({ isActive }) =>
              `${isActive ? 'bg-[#41436A]' : ''} flex items-center space-x-4 py-2.5 px-4 rounded group-hover:px-4`
            }
          >
            <FaUser className="text-lg" />
            <span className="hidden group-hover:block">Baptismal registration</span>
          </NavLink>
          <NavLink
            // to="/admin-dashboard/confirmation/register"
            className={({ isActive }) =>
              `${isActive ? 'bg-[#41436A]' : ''} flex items-center space-x-4 py-2.5 px-4 rounded group-hover:px-4`
            }
          >
            <FaUser className="text-lg" />
            <span className="hidden group-hover:block">Confirmation Registration</span>
          </NavLink>
          <NavLink
            // to="/admin-dashboard/firstCommunion/register"
            className={({ isActive }) =>
              `${isActive ? 'bg-[#41436A]' : ''} flex items-center space-x-4 py-2.5 px-4 rounded group-hover:px-4`
            }
          >
            <FaUser className="text-lg" />
            <span className="hidden group-hover:block">First-Communion Registration</span>
          </NavLink>
          <NavLink
            // to="/admin-dashboard/marriage/register"
            className={({ isActive }) =>
              `${isActive ? 'bg-[#41436A]' : ''} flex items-center space-x-4 py-2.5 px-4 rounded group-hover:px-4`
            }
          >
            <FaUser className="text-lg" />
            <span className="hidden group-hover:block">Marriage Registration</span>
          </NavLink> */}
          <NavLink
            to="/admin-dashboard/setting"
            className={({ isActive }) =>
              `${isActive ? 'bg-[#41436A]' : ''} flex items-center space-x-4 py-2.5 px-4 rounded group-hover:px-4`
            }
          >
            <FaCogs className="text-lg" />
            <span className="md:hidden group-hover:block">Settings</span>
          </NavLink>
        </div>
      </div>
    </>
  );
};

export default AdminSideBar;
