import React from 'react'
import { FaHome } from "react-icons/fa";
import { TbCategoryFilled } from "react-icons/tb";
import { FaThList } from "react-icons/fa";
import { BsCalendar2DateFill } from "react-icons/bs";
import { NavLink, useNavigate } from 'react-router-dom';
import { BiSolidLeftArrowSquare } from "react-icons/bi";
import { useAuth } from '../context/AuthProvider';


const SideNav = () => {
  const navigate = useNavigate()
  const {provideAuth} = useAuth();
  const handleLogout = () =>{
    localStorage.removeItem("token")
    provideAuth()
    navigate("/")
    window.location.reload()
  }
  return (
    <>
    <div className="w-40 h-full p-8">
        <div className='w-full h-full bg-black gap-[6vh] justify-center rounded-full flex flex-col py-[4vh] items-center text-white text-2xl'>
        <NavLink to = "/" 
         style={({ isActive }) => ({
          color: isActive && "#3B82F6", // Blue if active, gray if inactive
        })}
        className='hover:text-blue-600 cursor-pointer'><FaHome/></NavLink>

        <NavLink to = "/categories" 
        style={({ isActive }) => ({
          color: isActive && "#3B82F6", // Blue if active, gray if inactive
        })}
        className='hover:text-blue-600 cursor-pointer'><TbCategoryFilled/></NavLink>

        <NavLink to = "/expenses" 
        style={({ isActive }) => ({
          color: isActive && "#3B82F6", // Blue if active, gray if inactive
        })}
        className='hover:text-blue-600 cursor-pointer'><FaThList/></NavLink>

        <NavLink to = "/analysis"
        style={({ isActive }) => ({
          color: isActive && "#3B82F6", // Blue if active, gray if inactive
        })}
         className='hover:text-blue-600 cursor-pointer'><BsCalendar2DateFill/></NavLink>

         <div onClick={handleLogout} className='hover:text-blue-600 cursor-pointer'><BiSolidLeftArrowSquare/></div> {/* logout button */}
        </div>
    </div>
    </>
  )
}

export default SideNav