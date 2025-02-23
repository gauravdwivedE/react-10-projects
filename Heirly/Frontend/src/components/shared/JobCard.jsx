import React, { useEffect, useState } from 'react'
import { Badge } from "@/components/ui/badge"
import { Button } from '../ui/button'
import { FaRegBookmark } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import axios from '../../api/axios'
import { toast } from 'sonner'
import { Loader2 } from 'lucide-react'
import { setJobs } from '@/store/reducer/jobsReducer'
import { motion } from 'framer-motion';

const LatestJobCard = ({job}) => {
  const {user} = useSelector((state) => state.user)
  const [isApplied, setIsApplied] = useState(false) 
  const dispatch = useDispatch()
  const [loading, setLoading] = useState(false)
  const {jobs} = useSelector((state) => state.jobs)

  function checkIfApplied(){
   setIsApplied(job.applications.some((application) => application.applicant == user?.id || user?._id) || false)
  }
  useEffect(()=>{
    checkIfApplied()
  }, [jobs, job, ApplyNow])

  async function ApplyNow() {
    if(!user || user == null){
      return navigate("/login")
         
    }
    setLoading(true);
    try {
      const response = await axios.post(`/applications/${job._id}`, {}, { withCredentials: true });
      console.log(response.data);
  
      const jobIdToUpdate = response.data.job; // This is the job id from the response
      
      if (response.status === 201) {
        toast.success("Job applied successfully");
  
        // Update the jobs array
        const updatedJobs = jobs.map(job => {
          // Check if the job._id from the response matches the job's id
          if (job.id === jobIdToUpdate || job._id === jobIdToUpdate) {  // Match based on _id or id
            return {
              ...job,
              applications: [
                ...job.applications,
                response.data  // Add the new application
              ]
            }
          }
          return job;  // No change for other jobs
        })

        // Dispatch the updated jobs to the store
        dispatch(setJobs(updatedJobs));      
      }
    } 
    catch(err){
      toast.error(err.response.data || err.message)
    }
    finally{
     setLoading(false)
    }
    
  }

  const calculateDifference = (date) => {
    const today = new Date();
    const input = new Date(date);
    const timeDiff = today - input;
    const daysDifference = Math.floor(timeDiff / (1000 * 3600 * 24));  // Convert milliseconds to days
    return daysDifference
  }

  const navigate = useNavigate()

  return (
    <motion.div
    initial={{opacity: 0, x:100}}
    animate={{opacity: 1, x:0}}
    transition={{duration: 0.3}}
    className='w-[28rem] h-[43vh] rounded border-[1px] border-gray-200 px-4 py-2'>
       <p className='text-gray-500 text-sm'>{calculateDifference(job.createdAt) == 0 ? "Today" : `${calculateDifference(job.createdAt)} days ago`} </p>
      <div>
        <div className='flex justify-between items-center'>
        <div className='flex gap-2 items-center'>
        <img className = "w-16 rounded-full" src="https://imgs.search.brave.com/mXUkZ54dmZ6zPOxuG_ZnCvOOdCLTAfmi4uAHv29HpSs/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5pc3RvY2twaG90/by5jb20vaWQvOTk1/ODE0ODc4L3ZlY3Rv/ci9zdGFyLWxvZ28t/dmVjdG9yLXRlbXBs/YXRlLWRlc2lnbi1p/bGx1c3RyYXRpb24u/anBnP3M9NjEyeDYx/MiZ3PTAmaz0yMCZj/PXFkcVZKLW9VcDgy/VXhvRVg1ZW1Db0s1/cjZnM2lHMTN4MWxP/RnpERDFDREk9" />
        <h1 className='text-xl font-semibold'>{job?.company?.name}</h1>
        </div>
        <FaRegBookmark className='cursor-pointer'/>
        </div>
        <h3 className='text-zinc-500 text-sm mx-2'>{job?.location}</h3>
      </div>
      <div className='mt-2'>
        <h1 className='text-xl font-bold my-2 mt-4'>{job?.title}</h1>
        <p className='text-sm'>{job?.description}</p>
      </div>
      <div className='grid grid-cols-3 my-5 gap-4'>
        <Badge variant = 'outline' className="text-blue-700" >{job.position}</Badge>
        <Badge variant = 'outline' className="text-[#6a38c2]" >{job.jobType}</Badge>
        <Badge variant = 'outline' className="text-orange-700" >{job.salary}</Badge>
      </div>
      <div className='flex gap-4'>
      <Button onClick = {()=>navigate(`/jobs/${job?._id}`)} className = "text-[12px]">View details</Button>
      <Button disabled = {loading} onClick = {()=> !isApplied && ApplyNow()} className={`px-3 py-2  text-sm rounded-lg ${isApplied ? "bg-gray-300 text-gray-600 cursor-not-allowed" : " bg-[#6a38c2] text-white hover:bg-[#572d9e]" }`}>
       {!loading ? isApplied? "  Applied  " : "Apply Now" : <Loader2 className='animate-spin'/>}
      </Button>
      </div>
    </motion.div>
  )
}

export default LatestJobCard