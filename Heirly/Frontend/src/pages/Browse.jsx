import Navbar from '@/components/shared/Navbar'
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { Search } from 'lucide-react' // Importing the Search icon
import { useDispatch, useSelector } from 'react-redux'
import { setSearchTerm } from '@/store/reducer/jobsReducer'
import axios from '../api/axios'
import { toast } from 'sonner'
import LatestJobCard from '@/components/shared/JobCard'
import { Loader2 } from 'lucide-react';

const Browse = () => {
  const { register, handleSubmit } = useForm()
  const dispatch = useDispatch() 
  const {searchTerm} = useSelector((state) => state.jobs)
  const [loading, setLoading] = useState(false)
  const [jobs, setJobs]  = useState(null)

  const onSubmit = (data) => {
    dispatch(setSearchTerm(data.searchTerm))
  }

  const getJobsBySearchQuery = async () => {
    setLoading(true)
    try {
      const response = await axios.get(`/jobs?keyword=${searchTerm}`)
      setJobs(response.data)
    }
     catch (err) {
      setJobs(null)
      toast.error(err.response.data || err.response.data.message || err.message)
    }
    finally{
      setLoading(false)
    }
  }

  useEffect(()=>{
    getJobsBySearchQuery()
    return () => {
       dispatch(setSearchTerm(""))
    }
  },[searchTerm])

  return (
    <>
      <Navbar />

      {/* Search Bar Section */}
      <div className="flex justify-center items-center my-8">  
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="relative w-full max-w-lg flex items-center"
        >
          <input
            type="text"
            {...register('searchTerm', { required: true })}
            placeholder="Search for jobs, developers, skills..."
            className="w-full p-4  rounded-full border outline-none border-gray-300 shadow-md focus:outline-none "
          />
          
          {/* Search Icon Button from Lucide */}
          <button 
            type="submit" 
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-blue-500"
          >
            <Search className="w-6 h-6" />
          </button>
        </form>
      </div>
      {loading ?
      <div className='flex justify-center'><Loader2 className='animate-spin'/></div>
       : 
       <>
       <div className='px-6 py-2'>{jobs ? <h1 className='text-xl font-bold'>{jobs && jobs?.length} Jobs found</h1> : <h1 className='text-xl font-bold'> No jobs found</h1>}</div>
       <div className='w-full grid grid-cols-3 px-6 gap-4'>
      {jobs && jobs.map((job) => <LatestJobCard job = {job}/> )}
       </div>
       </>
}
    </>
  )
}

export default Browse
