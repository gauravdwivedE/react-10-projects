import Navbar from '@/components/shared/Navbar'
import { Button } from '@/components/ui/button'
import axios from '../api/axios'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'sonner'
import { Loader2 } from 'lucide-react'
import { useDispatch } from 'react-redux'
import { setSingleCompany } from '@/store/reducer/companyReducer'

const CreateCompany = () => {
  const navigate = useNavigate()
  const [companyName, setCompanyName] = useState(null)
  const [loading, setLoading] = useState(false)
  const dispatch = useDispatch()

   const registerCompany = async() =>{
    try {
    setLoading(true)
    if(!companyName || companyName == null) return toast.error("Please enter company name")
    const response = await axios.post('/companies', {name: companyName}, {withCredentials: true})
  
    if(response.status === 201){
      dispatch(setSingleCompany(response.data))
      toast.success("Comapany created successfully")
      navigate(`/admin/companies/${response?.data?._id}`)
   }
   }
    catch (err) {
    toast.error(err.response.data || err.message)
   }
   finally{
    setLoading(false)
   }
   }
  return (
    <>
    <Navbar/>
    <div className='mx-auto w-fit mt-10 px-2'>
    <div>
      <h1 className='text-xl font-semibold'>Company Name</h1>
      <p className='text-gray-500 text-sm'>You can change your company name in future</p>
      <input
       type="text"
       onChange={(e) => setCompanyName(e.target.value)}
       className='border outline-none rounded-lg px-2 py-3 w-[20rem] md:w-[70vw] lg:w-[45vw]  mt-4'/>
    </div>
      <div className='space-x-3 mt-5'>
      <Button className="bg-gray-400" onClick = {() => navigate(-1)}>Cancel</Button>
      <Button onClick = {registerCompany} >{loading? <Loader2 className='animate-spin'/> :"Add Company" }</Button>
      </div>
    </div>
    </>
  )
}

export default CreateCompany