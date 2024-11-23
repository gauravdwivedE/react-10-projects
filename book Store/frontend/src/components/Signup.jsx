import axios from '../utils/axios'
import React, { useContext, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { AuthContext } from '../context/AuthProvider';
import { useNavigate } from 'react-router-dom';
import { successFlash,errorFlash } from '../utils/Flash'

const Signup = () => {
  const navigate = useNavigate()
  const {provideAuth}  = useContext(AuthContext)
  const {register,handleSubmit,reset,formState:{errors}} = useForm()

  useEffect(()=>{
    document.querySelector("#my_modal_login").close()
  },[])

  async function submit(data){
    try{
    const res = await axios.post("/auth/signup",data)
    localStorage.setItem("accessToken",res.data.accessToken)
    provideAuth()
    reset()
    successFlash("Signup successfully")
    navigate("/")
  }
    catch(err){
     if(!err.response) return  errorFlash(err.message)
      errorFlash(err.response.data)
    }
  }
  return (
  <>
    <div className='flex justify-center h-screen items-center'>

      <div className="modal-box w-[95%] max-w-[35rem] shadow-lg text-lg px-6">
          {/* if there is a button in form, it will close the modal */}
        <h3 className="font-bold text-lg">Signup</h3>
        <form onSubmit={handleSubmit(submit)} >
        <div className='mt-5 space-y-2'>
          <label htmlFor="name">Name</label><br />
          <input {...register("name",{required:"Name is required"})}placeholder='enter name' id= "name" className = "w-full text-lg border-2 border-gray-300 first-letter: px-2 py-[6px] rounded-lg outline-none "type="text"/>
          {errors.name && <p className='text-red-400'>{errors.name.message}</p>}
  
        </div>
        {/* Email */}
        <div className='mt-5 space-y-2'>
          <label htmlFor="email">Email</label><br />
          <input {...register("email",{required:"Email is required",
            pattern:{
            value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
            message: "Invalid email format",
            }
          })}placeholder='enter email' id= "email" className = "w-full text-lg border-2 border-gray-300 first-letter: px-2 py-[6px] rounded-lg outline-none "type="text"/>
        {errors.email && <p className='text-red-400'>{errors.email.message}</p>}
        </div>
        {/* password */}
        <div className='mt-6 space-y-2'>
          <label htmlFor="password">Password</label><br />
          <input {...register("password",{required:"Password is required",
           pattern:{
           value: /^(?=.*[@$!%*?&]).{8,}$/,
           message:"Password must be at least 8 characters and include a special symbol"
          }
          })}placeholder="enter password" id= "password" className = "w-full text-lg border-[1px] border-gray-300 px-2 py-[6px] rounded-lg outline-none  "type="text" />
        {errors.password && <p className='text-red-400'>{errors.password.message}</p>}
        </div>
      <button className='btn bg-pink-500 text-white mt-3'>Signup</button>
      </form>
      <div className='mt-3'>
      <div className='w-full flex justify-end gap-1'>Have an account? <button onClick={()=>document.querySelector("#my_modal_login").showModal()} className='text-pink-500 cursor-pointer hover:border-b-2 border-pink-500 '>Login</button></div>
      </div>
      </div>
    </div>
    </>
  )
}

export default Signup