import LatestJobCard from '@/components/shared/JobCard'
import Navbar from '@/components/shared/Navbar'
import React, { useEffect, useState } from 'react'
import Filter from '../components/shared/Filter';
import { useSelector } from 'react-redux';
import { Loader2 } from 'lucide-react';

const Jobs = () => {
  const { loading } = useSelector((state) => state.showLoading)
  const { jobs } = useSelector((state) => state.jobs)
  const { searchFilter } = useSelector((state) => state.jobs)
  const [filterJobs, setFilterJobs] = useState(jobs)

  const filterJobByFilter =  async () => {
    if(!searchFilter){
      return  true
    }

  const { Location, Salary, Jobs } = searchFilter;
  const lowerCaseJobs = Jobs.toLowerCase(); // Convert Jobs only once
  const lowerCaseLocation = Location ? Location.toLowerCase() : null; // Convert Location only if it's provided

  const filter = jobs && jobs.filter((job) => {

  const lowerCaseTitle = job.title.toLowerCase();
  const lowerCaseDescription = job.description.toLowerCase();
  
  const matchesJob = lowerCaseTitle.includes(lowerCaseJobs) || lowerCaseDescription.includes(lowerCaseJobs);
  const matchesSalary = Salary ? job.salary <= Salary : true; // Only check salary if provided
  const matchesLocation = lowerCaseLocation ? job.location.toLowerCase().includes(lowerCaseLocation) : true; // Only check location if provided

  return matchesJob && matchesSalary && matchesLocation;

  }
  )
    setFilterJobs(filter)
  }
  
  useEffect(() => {
    filterJobByFilter()
  },[searchFilter, ])
  return (
    <>
    <Navbar/>
    <div className='h-[92vh] w-full flex py-3'>
      <Filter/>
      {loading ? 
      <h1 className='w-full flex justify-center mt-5'><Loader2 className='animate-spin'/></h1>    
      :<div className='flex-1 flex flex-wrap gap-10 lg:ml-10 ml-6 overflow-y-auto'>
      {filterJobs?.length ? filterJobs?.map((job) =>
        <LatestJobCard key = {job._id} job = {job}/>
      )  
      :
      <div className='font-bold'>No Jobs available for this filter</div>
      }
      </div>
    }
    </div>
    </>
  )
}

export default Jobs