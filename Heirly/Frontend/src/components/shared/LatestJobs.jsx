import React from 'react'
import JobCard from './JobCard'
import { useSelector } from 'react-redux'
import { Loader2 } from 'lucide-react'

const LatestJobs = () => {
  const { jobs } = useSelector((state) => state.jobs)
  const { loading } = useSelector((state) => state.showLoading)

  return (
    <div className='max-w-full  px-8 py-4'>
    
      <h1 className='text-4xl font-semibold mb-6'><span className='text-[#6a38c2]'>latest & Top</span> Job Openings</h1>
      {loading ? 
      <h1 className='w-full flex justify-center'><Loader2 className='animate-spin'/></h1>    
      :<div className='grid grid-cols-3 gap-10 px-3'>
      {jobs?.slice(0,6).map((job)=>
        <JobCard key = {job._id} job = {job}/>
      )}
      </div>
}
    </div>
  )
}

export default LatestJobs