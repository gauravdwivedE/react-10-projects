import React from 'react'
import Signup from './Signup';
import {useForm} from 'react-hook-form'

const Login = () => {
  const {register,handleSubmit,formState:{errors}} = useForm()
  function submit(data){
    console.log(data);
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
      <p>Not registered?  <span onClick={()=>document.getElementById('my_modal_signup').showModal()} className='text-pink-500 cursor-pointer hover:border-b-2 border-pink-500 '>Signup</span></p>
      <Signup/>
      </div>
      </div>
    </dialog>
    </div>
  )
}

export default Login