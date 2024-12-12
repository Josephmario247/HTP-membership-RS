import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  FaBuilding,
  FaCalendarAlt,
  FaCogs,
  FaMoneyBillWave,
  FaTachometerAlt,
  FaUser,
  FaUsers
} from 'react-icons/fa';
import NavBar from './NavBar';

const AdminSideBar = () => {
  return (
    <>
      {/* Logo Section */}
      <div
        className="bg-[#41436A] text-white h-12 pr-40 fixed flex items-center px-5 justify-items-start group-hover:justify-start group-hover:px-4
                   transition-all duration-300"
      >
        <h3 className="text-2xl font-poppins">HTP-MRS</h3>
      </div>
      <div
        className="bg-gray-800 text-white h-screen fixed left-0 top-[3rem] bottom-0 flex flex-col space-y-2 group hover:w-64 w-20 transition-all duration-300 overflow-hidden"
      >


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
            <span className="hidden group-hover:block">Dashboard</span>
          </NavLink>
          <NavLink
            to="/admin-dashboard/register-member"
            className={({ isActive }) =>
              `${isActive ? 'bg-[#41436A]' : ''} flex items-center space-x-4 py-2.5 px-4 rounded group-hover:px-4`
            }
            end
          >
            <FaUser className="text-lg" />
            <span className="hidden group-hover:block">Register Member</span>
          </NavLink>
          <NavLink
            to="/admin-dashboard/members"
            className={({ isActive }) =>
              `${isActive ? 'bg-[#41436A]' : ''} flex items-center space-x-4 py-2.5 px-4 rounded group-hover:px-4`
            }
          >
            <FaUsers className="text-lg" />
            <span className="hidden group-hover:block">Members</span>
          </NavLink>
          <NavLink
            to="/admin-dashboard/member/modify/regNo"
            className={({ isActive }) =>
              `${isActive ? 'bg-[#41436A]' : ''} flex items-center space-x-4 py-2.5 px-4 rounded group-hover:px-4`
            }
          >
            <FaUser className="text-lg" />
            <span className="hidden group-hover:block">Modify Member</span>
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
            <span className="hidden group-hover:block">Settings</span>
          </NavLink>
        </div>
      </div>
    </>
  );
};

export default AdminSideBar;
