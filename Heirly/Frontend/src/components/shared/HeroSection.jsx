import { setSearchTerm } from '@/store/reducer/jobsReducer'
import { Search } from 'lucide-react'
import React from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'

const HeroSection = () => {
  const { register, handleSubmit, formState: { errors } } = useForm()
  const dispatch = useDispatch()
  const navigate = useNavigate()
  
  const onSubmit = (data) => {
    dispatch(setSearchTerm(data.searchTerm))
    navigate("/browse")
  }

  return (
    <motion.div
    initial={{opacity: 0, y:100}}
    animate={{opacity: 1, y:0}}
    transition={{duration: 0.2}}
     className='w-full flex flex-col items-center '>
      <div className='capitalize p-3 bg-zinc-200 w-fit rounded-full text-sm text-orange-700 my-4'>
        No.1 Job Hunting platform
      </div>
      <h1 className='text-[50px] font-bold leading-tight'>Search, Apply & </h1>
      <h1 className='text-[50px] font-bold leading-tight'>
        Get your <span className='text-[#6a38c2]'>Dream Jobs</span>
      </h1>
      <p className='mt-3'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Deserunt, laboriosam. Lorem ipsum</p>
      <form onSubmit={handleSubmit(onSubmit)} className='mt-5 flex items-center w-[45%]'>
        <input
          className='shadow-xl p-2 px-4 w-full outline-none rounded-l-full border-[1px] border-zinc-100'
          placeholder="Search..."
          type="text"
          {...register('searchTerm', { required: 'Search term is required' })}
        />
        {errors.searchTerm && <span className="text-red-500 text-sm">{errors.searchTerm.message}</span>}
        
        <button
          type="submit"
          className='p-2 shadow-xl bg-[#6a38c2] border-[1px] px-4 border-[#6a38c2] rounded-r-full text-white'
        >
          <Search />
        </button>
      </form>
    </motion.div>
  )
}

export default HeroSection
