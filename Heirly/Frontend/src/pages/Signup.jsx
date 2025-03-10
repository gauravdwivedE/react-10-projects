import { Link, useNavigate } from "react-router-dom"
import Navbar from '@/components/shared/Navbar'
import { useForm } from "react-hook-form";
import axios from "../api/axios";
import { toast } from "sonner";
import { useDispatch, useSelector } from "react-redux";
import { setLoading } from "@/store/reducer/loadingReducer";
import { setUser } from '@/store/reducer/authReducer';
import { LucideLoader2 } from 'lucide-react';
import { motion } from 'framer-motion';

function Signup() {

  const { register, handleSubmit, watch, reset, formState: { errors } } = useForm()
  const navigate = useNavigate()
  const { loading } = useSelector((state) => state.showLoading)
  const dispatch = useDispatch()

  async function getSignup(data){
  
      dispatch(setLoading(true))
      
      if(data.profileImage.length > 0){
        
      const profileImage = data.profileImage[0] 
      const reader = new FileReader()
      reader.readAsDataURL(profileImage)

      reader.onloadend = async () => {
      const base64Image = reader.result    
      data.profileImage = base64Image

      try{
      const response = await axios.post('/user/signup', data)
        reset()
        toast.success("Signup successfully please login")
        navigate("/login")
    }
    catch(err){
      toast.error(err.response.data)
    }
    finally{
      dispatch(setLoading(false))
    }
  }
  }else{
    try{
      const response = await axios.post('/user/signup', data)
  
        reset()
        toast.success("Signup successfully please login")
        dispatch(setUser(null))
        navigate("/login")
      }
   
    catch(err){
      toast.error(err.response.data)
    }
    finally{
      dispatch(setLoading(false))
    }
  }
}

  return (
    <>
      <Navbar />
      <motion.div 
      initial={{opacity: 0, y:100}}
      animate={{opacity: 1, y:0}}
      transition={{duration: 0.3}}
      className="mt-16 flex justify-center items-center">
        <form
          className="bg-white p-6 px-8 rounded-lg shadow-md w-full sm:w-[40rem]"
          onSubmit={handleSubmit(getSignup)}
        >
          <h2 className="text-2xl font-semibold text-center text-gray-700 mb-6">Register</h2>

          {/* Full Name */}
          <div className="mb-4">
            <label htmlFor="fullname" className="block text-gray-600 font-medium mb-2">Full Name</label>
            <input
              id="fullname"
              name="fullname"
              type="text"
              {...register("fullname", { required: "Full Name is required" })}
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            {errors.fullname && <p className="text-red-500 text-sm">{errors.fullname.message}</p>}
          </div>

          {/* Email */}
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-600 font-medium mb-2">Email</label>
            <input
              id="email"
              name="email"
              type="email"
              {...register("email", { required: "Email is required", pattern: { value: /^[^@]+@[^@]+\.[^@]+$/, message: "Invalid email format" } })}
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
          </div>

          {/* Phone Number */}
          <div className="mb-4">
            <label htmlFor="phoneNumber" className="block text-gray-600 font-medium mb-2">Phone Number</label>
            <input
              id="phoneNumber"
              name="phoneNumber"
              type="tel"
              maxLength={10}
              {...register("phoneNumber", { 
                required: "Phone number is required", 
                pattern: { value: /^[0-9]{10}$/, message: "Phone number must be 10 digits" }
              })}
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            {errors.phoneNumber && <p className="text-red-500 text-sm">{errors.phoneNumber.message}</p>}
          </div>

          {/* Password */}
          <div className="mb-4">
            <label htmlFor="password" className="block text-gray-600 font-medium mb-2">Password</label>
            <input
              id="password"
              name="password"
              type="password"
              {...register("password", { required: "Password is required", minLength: { value: 6, message: "Password must be at least 6 characters" } })}
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
          </div>

          {/* Confirm Password */}
          <div className="mb-4">
            <label htmlFor="confirmPassword" className="block text-gray-600 font-medium mb-2">Confirm Password</label>
            <input
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              {...register("confirmPassword", { 
                required: "Confirm your password", 
                validate: (value) => value === watch('password') || "Passwords don't match"
              })}
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            {errors.confirmPassword && <p className="text-red-500 text-sm">{errors.confirmPassword.message}</p>}
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

          {/* Profile Image */}
          <div className="mb-4">
            <label htmlFor="profileImage" className="block text-gray-600 font-medium mb-2">Profile Image</label>
            <input
              id="profileImage"
              name="profileImage"
              type="file"
              accept="image/*"
              {...register("profileImage")}
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          {/* Submit Button */}
          <div className="mb-4 text-center">
          {loading ?
          <button
            disabled
            className="w-full p-2 bg-[#5b28b1]  text-white font-semibold rounded-md  focus:outline-none pointer-events-none"
          >
           <span className="w-full text-center space-x-6"> <LucideLoader2 className="inline animate-spin" /> Please wait..</span>
          </button>
           :
          <button
            type="submit"
            className="w-full p-2 bg-[#6a38c2] hover:bg-[#572d9e] text-white font-semibold rounded-md  focus:outline-none"
          >
            Register
          </button>
           }
          </div>

          {/* Login Link */}
          <div className="text-center text-sm text-gray-500">
            <span>Already have an account?</span>
            <Link to="/login" className="text-[#6a38c2] hover:underline">
              Login here
            </Link>
          </div>
        </form>
      </motion.div>
    </>
  )
}

export default Signup;
