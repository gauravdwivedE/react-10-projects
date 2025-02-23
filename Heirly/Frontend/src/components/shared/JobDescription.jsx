import React, { useEffect, useState } from "react"
import Navbar from "./Navbar";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { Loader2 } from "lucide-react";
import { Button } from "../ui/button";
import { setJobs } from "@/store/reducer/jobsReducer";
import { toast } from "sonner";
import axios from "../../api/axios";

const JobDescription = () => {
  const { jobs } = useSelector((state) => state.jobs)
  const params = useParams()
  const jobId = params.id
  const job =  jobs && jobs.find((item) => item._id === jobId)
  const {user} = useSelector((state) => state.user)
  const [isApplied, setIsApplied] = useState(false) 
  const dispatch = useDispatch()
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  function checkIfApplied(){
    setIsApplied(job.applications.some((application) => application.applicant == user?.id || user?._id) || false)
  }
   useEffect(()=>{
     checkIfApplied()
   }, [jobs, job])
   
  async function ApplyNow() {
    if(!user || user == null){
      return navigate("/login")
    }
    setLoading(true);
    try {
      const response = await axios.post(`/applications/${job._id}`,{}, { withCredentials: true });  
      const jobIdToUpdate = response.data.job; // This is the job id from the response
      
      if (response.status === 201) {  
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
        toast.success("Job applied successfully");
      }
    } 
    catch(err){
      toast.error(err.response.data || err.message)
    }
    finally{
     setLoading(false)
    }
    
  } 

  return (
    <>
    <Navbar/>
    {job ?
    <div className="max-w-4xl mx-auto bg-white rounded-2xl p-6 py-10 mt-10 border border-gray-200">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold text-gray-800">{job.title}</h2>
        <Button disabled = {loading} onClick = {()=> !isApplied && ApplyNow()} className={`px-3 py-2  text-sm rounded-lg ${isApplied ? "bg-gray-300 text-gray-600 cursor-not-allowed" : " bg-[#6a38c2] text-white hover:bg-[#572d9e]" }`}>
       {!loading ? isApplied? "Already Applied" : "Apply Now" : <Loader2 className='animate-spin'/>}
      </Button>
      </div>
      <div className="flex flex-wrap gap-2 mb-4">
        <span className="px-3 py-1 bg-blue-100 text-blue-600 text-sm rounded-full">
          {job.position}
        </span>
        <span className="px-3 py-1 bg-orange-100 text-orange-600 text-sm rounded-full">
          {job.jobType}
        </span>
        <span className="px-3 py-1 bg-green-100 text-green-600 text-sm rounded-full">
          {job.salary}
        </span>
      </div>
      <div className="text-gray-700">
        <p>
          <span className="font-medium">Location:</span> {job.location}
        </p>
        <p>
          <span className="font-medium">Experience:</span> {job.experience}
        </p>
        <p>
          <span className="font-medium">Salary:</span> {job.salary}
        </p>
        <p>
          <span className="font-medium">Positions:</span> {job.position}
        </p>
        <p>
          <span className="font-medium">Total Applicants:</span> {job.applications.length}
        </p>
        <p>
          <span className="font-medium">Posted Date:</span> {job.createdAt.split("T")[0]}
        </p>
      </div>
      <p className="mt-4 text-gray-600 text-sm">
        {job.description}
      </p>
    </div>:
      <h1 className='w-full flex justify-center mt-5'><Loader2 className='animate-spin'/></h1>    
    }
    </>
   
  )
}

export default JobDescription;
