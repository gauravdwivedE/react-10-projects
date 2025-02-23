import Navbar from '@/components/shared/Navbar'
import React, { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button';
import { ArrowLeft, LucideLoader2 } from 'lucide-react';
import { useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import axios from '../api/axios';
import { toast } from 'sonner';
import GetSingleCompany from '@/hooks/GetSingleCompany';

const GetCompanyById = () => {
  const params = useParams()
  const companyId = params.id
  GetSingleCompany(companyId)
  const {singleCompany} = useSelector((state) => state.company)
  const {register, handleSubmit, reset } = useForm({defaultValues : singleCompany})
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)

  const onSubmit = async(data) => {
    setLoading(true)
    try {
      const formData = new FormData()
      formData.append("name", data.name)
      formData.append("description", data.description)
      formData.append("website", data.website)
      formData.append("location", data.location)
      formData.append("logo", data.logo[0])

      const response = await axios.put(`/companies/${companyId}`, formData, {withCredentials: true})
      if(response.status === 200){
        toast.success("Company has been updated")
        navigate("/admin/companies")
      }
    }
    catch (err) {      
      toast.error(err?.response?.data?.message || err?.response?.data || err?.message)
    }
    finally{
      setLoading(false)
    }
  } 

  useEffect(() => {    
    if(singleCompany){
    reset(singleCompany)
    }
  },[singleCompany, reset])

  return (
    <>
    <Navbar/>
    <div className=' mx-auto p-10 w-[60vw]'>
      <div className='flex gap-10 items-center'>
        <Button variant = 'outline' onClick = {() => navigate(-1)}>
          <ArrowLeft/>
           Back </Button>
           <h2 className='font-bold text-xl'>Company Setup</h2>
      </div>
      <div>
      <form onSubmit={handleSubmit(onSubmit)} className='mt-8'>
      <div className='flex gap-10 w-full '>
      <div className='w-1/2'>
       <label className = "text-sm">Name</label> 
       <input {...register("name")} type="text"  className='border outline-none block w-full  p-2 rounded'/>
       </div>
       <div className='w-1/2'>
       <label className = "text-sm"> Description</label> 
       <input {...register("description")} type="text"  className='border outline-none block  w-full p-2 rounded'/>
      </div>
      </div>

      <div className='flex gap-10 w-full my-3 '>
      <div className='w-1/2'>
       <label className = "text-sm"> Website Link</label> 
       <input {...register("website")}  type="text"  className='border outline-none block w-full  p-2 rounded'/>
       </div>
       <div className='w-1/2'>
       <label className = "text-sm"> Location</label> 
       <input {...register("location")} type="text"  className='border outline-none block  w-full p-2 rounded'/>
      </div>
      </div>

        <label className = "text-sm"> Logo</label> 
        <input {...register("logo")} type="file"  className='border outline-none block w-full p-2 rounded'/>
       <div className='mt-5 flex justify-end'>

        {loading ?
          <Button type="button" disabled>
           <span> <LucideLoader2 className="inline animate-spin" /> Please wait..</span>
          </Button>
           :
          <Button>
           Update
         </Button>
           }
        </div>
    </form>
      </div>
    </div>
    </>
  )
}

export default GetCompanyById