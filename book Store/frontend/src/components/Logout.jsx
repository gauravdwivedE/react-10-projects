import React, { useContext } from 'react'
import {AuthContext} from '../context/AuthProvider'
import { useNavigate } from 'react-router-dom';
import { successFlash } from '../utils/Flash'

const Logout = () => {
    const navigate = useNavigate()
    
    const {provideAuth} = useContext(AuthContext)

    const setLogout = () =>{
        console.log("ff");
        localStorage.removeItem("accessToken")
        provideAuth()
        successFlash("LoggedOut successfully")
        navigate("/")
    }
  return (
  <button onClick={setLogout} className="px-5 py-[6px] bg-red-500 text-white rounded cursor-pointer" >Logout</button>
  )
}

export default Logout