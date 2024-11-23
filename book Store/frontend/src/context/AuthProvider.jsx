import React, { createContext, useEffect, useState } from 'react'
import {jwtDecode} from 'jwt-decode'
import {successFlash} from '../utils/Flash'

export const AuthContext = createContext()
const AuthProvider = ({children}) => {
    const [auth, setAuth] = useState(null);

    function provideAuth(){
      try{
      const token = localStorage.getItem("accessToken")
      if(!token) return setAuth(null)
        const decoded = jwtDecode(token)
        setAuth(decoded)
      }
      catch(err){
        successFlash(err.message)
        setAuth(null)
      }
    }
    useEffect(()=>{
      provideAuth()
    },[])
    
  return (
    <AuthContext.Provider value={{auth,setAuth,provideAuth}} >{children}</AuthContext.Provider>
  )
}

export default AuthProvider
