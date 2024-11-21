import React from 'react'
import { useForm } from 'react-hook-form'

const signup = () => {
  const {register,handleSubmit,formState:{errors}} = useForm()

  function submit(data){
    console.log(data);
  }
  return (
    <div className='text-left'>
    <dialog id="my_modal_signup" className="modal">
      <div className="modal-box">
        <form method="dialog">
          {/* if there is a button in form, it will close the modal */}
          <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
        </form>
        <h3 className="font-bold text-lg">Signup</h3>
        {/* name */}
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
          })}placeholder="enter password" id= "password" className = "w-full text-lg border-2 border-gray-300 px-2 py-[6px] rounded-lg outline-none  "type="text" />
        {errors.password && <p className='text-red-400'>{errors.password.message}</p>}
        </div>
      <button className='btn bg-pink-500 text-white mt-3'>Signup</button>
      </form>
      <div className='mt-3'>
        {/* closing the signup modal to show the login modal which is behind on it */}
      <div className='w-full flex justify-end gap-1'>Have an account? <form method="dialog"><button className='text-pink-500 cursor-pointer hover:border-b-2 border-pink-500 '>Login</button></form></div>
      </div>
      </div>
    </dialog>
    </div>
  )
}

export default signup