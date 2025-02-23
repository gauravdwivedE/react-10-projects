import React, { useState } from 'react'
import Navbar from '@/components/shared/Navbar'
import { Button } from '@/components/ui/button'
import CompaniesTable from './CompaniesTable'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { setFilterString } from '@/store/reducer/companyReducer'


const Companies = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  
  return (
    <>
    <Navbar/>
    <div className='px-10 pt-16'>
    <div className='flex justify-between mb-10'>
      <input type="text"  onChange = {(e) => dispatch(setFilterString(e.target.value))} placeholder='Filter by name' className='border outline-none px-2 rounded-md'/>
     <Button onClick = {() => navigate("/admin/companies/create")}>Add new</Button>
    </div>
    <CompaniesTable/>
    </div>
    </>
  )
}

export default Companies