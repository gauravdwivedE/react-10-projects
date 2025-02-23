import axios from '../api/axios'
import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux';
import { setAdminJobs } from '@/store/reducer/adminJobsReducer';

const GetAllAdminJobs = () => {

  const dispatch = useDispatch()

 const getAllAdminJobs = async () => {
  try {
    const response = await axios.get("/jobs/admin", {withCredentials: true})
    
    if(response.status === 200){
      dispatch(setAdminJobs(response.data))
    }
  } catch (err) {
    console.log(err)
  }

 }
 useEffect(() => {
  getAllAdminJobs()
 },[])
}

export default GetAllAdminJobs