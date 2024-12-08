import React, { useState } from 'react'
import logo from "/images/logo.png"
import { useForm } from 'react-hook-form'
import axios from '../api/axios'
import {successFlash,errorFlash} from '../utils/flash'
import Loading from './Loading';

const Login = ({setShowLogin}) => {
  const [loading,setLoading] = useState(false)
  const {register,handleSubmit,reset,formState:{errors}} = useForm()
  
  async function submit(data){
    setLoading(true)
  try{
    const res = await axios.post("/users/login",data)
    localStorage.setItem("token",res.data)
    reset()
    window.location.reload();
    successFlash("SignIn Success")
    setLoading(false)
  }
    catch(err){
      reset()
      setLoading(false)
      if(!err.response){
        errorFlash(err.message)
      }
      else{
        errorFlash(err.response.data)
      }
    }
  }

  return (
    <>
    {loading && <Loading/>}
    <div className=' w-[95vw] md:w-[40rem] bg-white/30 rounded backdrop-blur-xl shadow-md p-5 py-8'>
    <div  className='flex items-center flex-col '>
      <img className = 'w-[5.5rem]' src={logo} alt="logo..."/>
      <h1 className='text-4xl font-semibold text-zinc-800'>Sign In</h1>
      <p className='text-zinc-600'>Return Back !</p>
      <form onSubmit = {handleSubmit(submit)} className='flex flex-col w-[80%] mt-11'>
        <label>Email</label>
        <input  {...register("email",{required:"Email is required",
         pattern:{
           value:/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
           message: "Invalid email address",
         }})} 
         className  = "px-2 border-b-2 border-zinc-700 bg-transparent outline-none" type="text" />
         {errors.email && <p className='text-red-400 text-s'>{errors.email.message}</p>}
        <label className='mt-10'>Password</label>
        <input {...register("password",{required:"Password is required",
          pattern:{
            value:/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/,
            message:"Password needs uppercase, lowercase, number, symbol, 6+ chars."
          }})} className = "px-2 border-b-2 border-zinc-700 bg-transparent outline-none" type="text" />
          {errors.password && <p className='text-red-400 text-s'>{errors.password.message}</p>}            
        <button className='w-full bg-blue-700 mt-7 px-2 py-2 text-white rounded'>Sign In</button>
        <p className='text-center mt-4'>Don't have account <span onClick = {()=>setShowLogin(false)} className='text-blue-700 hover:border-b-2 hover:border-blue-700 cursor-pointer'>Sign up</span></p>
      </form>
    </div>
    </div>
    </>

 )
}

export default Login