import React, { useState } from 'react'
import Navbar from '@/components/shared/Navbar'
import { Button } from '@/components/ui/button'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { setFilterString } from '@/store/reducer/adminJobsReducer'
import AdminJobsTable from './AdminJobsTable'


const AdminJobs = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  
  return (
    <>
    <Navbar/>
    <div className='px-10 pt-16'>
    <div className='flex justify-between mb-10'>
      <input type="text"  onChange = {(e) => dispatch(setFilterString(e.target.value))} placeholder='Filter by job  or company ' className='border outline-none px-2 text-sm rounded-md'/>
     <Button onClick = {() => navigate("/admin/jobs/create")}>New Job</Button>
    </div>
    <AdminJobsTable/>
    </div>
    </>
  )
}

export default AdminJobs