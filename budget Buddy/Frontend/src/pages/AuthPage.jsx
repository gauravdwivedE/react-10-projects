import React, { useState } from 'react'
import Signup from '../components/Signup';
import Login from '../components/Login';
import bg from '/images/indexbg.jpg'
import Footer from '../components/Footer';

const Index = () => {
  const[showLogin,setShowLogin] = useState(false)
  return (
    <>
    <div style={{backgroundImage:`url(${bg})`}} className='h-fit min-h-screen w-full flex justify-center items-center bg-cover bg-center flex-col relative z-0'>
       {showLogin ?  <Login  setShowLogin = {setShowLogin}/> : <Signup  setShowLogin = {setShowLogin}/>  }    
      <Footer/>
    </div>
    </>

  )
}

export default Index