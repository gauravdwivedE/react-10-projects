import React, { createContext, useContext, useEffect, useState } from 'react'
import { jwtDecode } from "jwt-decode";

export const AuthContext = createContext()
export function useAuth(){
    return useContext(AuthContext)
}
const AuthProvider = ({children}) => {
    const[auth,setAuth] = useState(false)

   
    function provideAuth(){
      try{
        const token = localStorage.getItem("token")

        if (!token) {
            console.log("No token found in localStorage");
            return setAuth(false); 
        }
        const decoded = jwtDecode(token)
        if(decoded) {
            return setAuth(true)  
        }
        const currentTime = Date.now() / 1000; // Convert milliseconds to seconds

        if (decoded.exp && decoded.exp < currentTime) {
            console.log("Token has expired");
            return setAuth(false)      
        }
      }
      catch(err){
        console.log(err.message); 
        setAuth(false)
      }
    }
    useEffect(()=>{
        provideAuth()
    // Set up interval to check the token every second
        const interval = setInterval(() => {
          provideAuth();
      }, 20000); // Check every 20s (1 second)
    
      // Cleanup interval on unmount
      return () => clearInterval(interval);
    
    },[])

    return (
    <AuthContext.Provider value={{auth,provideAuth}}>{children}</AuthContext.Provider>
  )
}

export default AuthProvider