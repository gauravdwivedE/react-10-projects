import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import Navbar from "@/components/shared/Navbar";
import axios from "../api/axios";
import { toast } from "sonner";
import { setLoading } from "@/store/reducer/loadingReducer";
import { setUser } from "@/store/reducer/authReducer";
import { useSelector, useDispatch } from "react-redux";
import { LucideLoader2 } from "lucide-react";
import { motion } from 'framer-motion';

function Login() {
  const { loading } = useSelector((state) => state.showLoading)
  const dispatch = useDispatch()

  const { register, handleSubmit, reset, formState: { errors } } = useForm()
  const navigate = useNavigate()

  async function getLogin (data){
   try{
      dispatch(setLoading(true))
      const response = await axios.post("/user/login",data,{withCredentials:true})
      if(response.status == 200){
        dispatch(setUser(response.data))
        toast.success("Login Success")
        navigate("/")
      }
   }
   catch(err){
     toast.error(err.response.data)
    }
    finally{
    reset()
    dispatch(setLoading(false))
   }
  }

  return (
    <>
    <Navbar/>
    <motion.div
    initial={{opacity: 0, y:80}}
    animate={{opacity: 1, y:0}}
    transition={{duration: 0.3}}
    className="mt-32 flex justify-center items-center">
      <form
        className="bg-white p-8 rounded-lg shadow-lg w-full sm:w-[35rem]"
        onSubmit={handleSubmit(getLogin)}
      >
        <h2 className="text-2xl font-semibold text-center text-gray-700 mb-6">Login</h2>

        {/* Email */}
        <div className="mb-4">
          <label htmlFor="email" className="block text-gray-600 font-medium mb-2">Email</label>
          <input
            id="email"
            name="email"
            type="email"
            {...register("email", { required: "Email is required" })}
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
        </div>

        {/* Password */}
        <div className="mb-4">
          <label htmlFor="password" className="block text-gray-600 font-medium mb-2">Password</label>
          <input
            id="password"
            type="password"
            {...register("password", { required: "Password is required", minLength: { value: 6, message: "Password must be at least 6 characters" } })}
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
        </div>

        {/* Role Selection */}
        <div className="mb-4">
          <label className="block text-gray-600 font-medium mb-2">Role</label>
          <div className="flex gap-4">
            <label className="flex items-center">
              <input
                type="radio"
                {...register("role", { required: "Please select a role" })}
                value="Job seeker"
                className="mr-2"
              />
              Job Seeker
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                {...register("role", { required: "Please select a role" })}
                value="Recruiter"
                className="mr-2"
              />
              Recruiter
            </label>
          </div>
          {errors.role && <p className="text-red-500 text-sm">{errors.role.message}</p>}
        </div>

        {/* Submit Button */}
       
        <div className="mb-4 text-center">
        {loading ?
          <button
            disabled
            className="w-full p-2 bg-[#552d99]  text-white font-semibold rounded-md  focus:outline-none pointer-events-none"
          >
           <span className="w-full text-center space-x-6"> <LucideLoader2 className="inline animate-spin" /> Please wait..</span>
          </button>
           :
          <button
            type="submit"
            className="w-full p-2 bg-[#6a38c2] hover:bg-[#572d9e] text-white font-semibold rounded-md  focus:outline-none"
          >
            Login
          </button>
           }
        </div>

        {/* Register Link */}
        <div className="text-center text-sm text-gray-500">
          <span>Don't have an account?</span>
          <Link to = "/signup" className="text-[#6a38c2] hover:underline">
            Register here
          </Link>
        </div>
      </form>
    </motion.div>
    </>
  )
}

export default Login
