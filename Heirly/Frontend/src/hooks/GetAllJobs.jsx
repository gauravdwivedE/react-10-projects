import React, { useEffect, useState } from 'react'
import axios  from '../api/axios';
import { toast } from 'sonner';
import { useDispatch, useSelector } from 'react-redux';
import  { setJobs }  from '@/store/reducer/jobsReducer';
import { setLoading } from '@/store/reducer/loadingReducer';
const GetAllJobs = () => {

  const dispatch = useDispatch()
  async function getAllJobs (){
    try {
      dispatch(setLoading(true))
      const response = await axios.get('/jobs', {withCredentials : true}) 
      dispatch(setJobs(response.data))
    } 
    catch (err) {
      toast.error(err.response.data || err.message)
    }
    finally{
      dispatch(setLoading(false))
    }
  }
  useEffect(()=>{
    getAllJobs()
  }, [])
}

export default GetAllJobs