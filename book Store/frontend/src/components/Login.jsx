import React, { useContext } from 'react'
import {useForm} from 'react-hook-form'
import axios from '../utils/axios';
import { AuthContext } from '../context/AuthProvider';
import { NavLink, useNavigate } from 'react-router-dom';
import { successFlash, errorFlash} from '../utils/Flash'

const Login = () => {
  const navigate = useNavigate()
  const {provideAuth}  = useContext(AuthContext)
  const {register,handleSubmit,reset,formState:{errors}} = useForm()
  async function submit(data){
    try{
      const res = await axios.post("/auth/login",data)
      localStorage.setItem("accessToken",res.data.accessToken)
      provideAuth()
      reset()
      document.getElementById('my_modal_login').close();
      successFlash("LoggedIn successfully")
      navigate("/")
    }
    catch(err){
     reset()
     if(!err.response) return  errorFlash(err.message)
     errorFlash(err.response.data)
    }
  }

  return (
    <div>
    <dialog id="my_modal_login" className="modal">
      <div className="modal-box">
        <form method="dialog">
          {/* if there is a button in form, it will close the modal */}
          <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
        </form>
        <h3 className="font-bold text-lg">Login</h3>
        <form onSubmit={handleSubmit(submit)}>
        {/* Email */}
        <div className='mt-5 space-y-2'>
          <label htmlFor="email">Email</label><br />
          <input {
            ...register("email",{required:"Email is required",
            pattern: {
            value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
            message: "Invalid email format",
            }}
          )}
          placeholder='enter email' id= "email" className = "w-full text-lg border-2 border-gray-300 first-letter: px-2 py-[6px] rounded-lg outline-none "type="text"/>
          {errors.email && <p className='text-red-400'>{errors.email.message}</p>}
        </div>
        {/* password */}
        <div className='mt-6 space-y-2'>
          <label htmlFor="email">Password</label><br />
          <input {...register("password",{required:"Password is required",
            pattern: {
            value: /^(?=.*[@$!%*?&]).{8,}$/,
            message:"Password must be at least 8 characters and include a special symbol"
            }
          })}placeholder="enter password" id= "email" className = "w-full text-lg border-2 border-gray-300 px-2 py-[6px] rounded-lg outline-none  "type="text" />
          {errors.password && <p className='text-red-400'>{errors.password.message}</p>}
        
        </div>
      <button className='btn bg-pink-500 text-white mt-3'>Login</button>
      </form>
      <div className='text-end mt-3'>
      <p>Not registered?  <NavLink to = {"/auth/signup"}
        className='text-pink-500 cursor-pointer hover:border-b-2 border-pink-500 '>Signup</NavLink></p>
      
      </div>
      </div>
    </dialog>
    </div>
  )
}

export default Login