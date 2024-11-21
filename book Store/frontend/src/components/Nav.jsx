import React, { useEffect, useState } from 'react'
import {NavLink} from 'react-router-dom'
import Login from './Login';
const Nav = () => {
  const [sticky,setSticky] = useState(false)
  const [theme,setTheme] = useState(localStorage.getItem("theme")|| "light")

  useEffect(()=>{
    document.documentElement.setAttribute("data-theme",theme)
    localStorage.setItem("theme",theme)
  },[theme])
  
  function toggleTheme (){
    setTheme((prev)=> prev ==="light"?"dark":"light")
  }
  useEffect(()=>{
    const handleScroll = ()=>{
      if(scrollY>50){
        setSticky(true)
      }else{
        setSticky(false)
      }
    }
    window.addEventListener("scroll",handleScroll)
  },[])
  
  const links =(
    <>
    <li><NavLink to = {"/"}>Home</NavLink></li>
    <li><NavLink to = {"/courses"}>Courses</NavLink></li>
    <li><NavLink to = {"/about"}>About</NavLink></li>
    <li><NavLink to = {"/contacts"}>Contacts</NavLink></li>
    </>
  )
  
  return (
    <>
   <div className={`fixed top-0 left-0 right-0 max-w-screen-2xl mx-auto z-50 ${sticky && 'bg-base-200 duration-500 transition-all shadow-sm ease-in-out '}`}>
   <div className="navbar">
  <div className="navbar-start">
    <div className="dropdown">
      <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M4 6h16M4 12h8m-8 6h16" />
        </svg>
      </div>
      <ul
        tabIndex={0}
        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
        {links}
      </ul>
    </div>
    <a className="text-2xl font-bold">Book Store</a>
  </div>
  <div className="navbar-end">
  <div className="navbar-center hidden lg:flex">
    <ul className="menu menu-horizontal px-1">
     {links}
    </ul>
  </div>
  
  <label className="px-3 py-1 rounded-full  items-center gap-2 border-1 border-gray-300 outline-none border-2 hidden md:flex ">
  <input type="text" className="grow outline-none bg-transparent" placeholder="Search" />
  <svg 
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 16 16"
    fill="currentColor"
    className="h-4 w-4 opacity-70">
    <path
      fillRule="evenodd"
      d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
      clipRule="evenodd" />
  </svg>
</label>
<label className="grid cursor-pointer place-items-center mx-3">
  <input onClick={()=>toggleTheme()}
    checked = {theme === "dark"? true: false}
    type="checkbox"
    value="synthwave"
    className="toggle theme-controller bg-base-content col-span-2 col-start-1 row-start-1" />
  <svg
    className="stroke-base-100 fill-base-100 col-start-1 row-start-1"
    xmlns="http://www.w3.org/2000/svg"
    width="14"
    height="14"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round">
    <circle cx="12" cy="12" r="5" />
    <path
      d="M12 1v2M12 21v2M4.2 4.2l1.4 1.4M18.4 18.4l1.4 1.4M1 12h2M21 12h2M4.2 19.8l1.4-1.4M18.4 5.6l1.4-1.4" />
  </svg>
  <svg
    className="stroke-base-100 fill-base-100 col-start-2 row-start-1"
    xmlns="http://www.w3.org/2000/svg"
    width="14"
    height="14"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round">
    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
  </svg>
</label>
{/* You can open the modal using document.getElementById('ID').showModal() method */}
    <a className="px-5 py-[6px] bg-black text-white rounded cursor-pointer" onClick={()=>document.getElementById('my_modal_login').showModal()}>Login</a>
  </div>
</div>
   <Login/>
   </div>
   </>
  )
}

export default Nav