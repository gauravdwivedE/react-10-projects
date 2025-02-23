import { setApplicants } from '@/store/reducer/ApplicantsReducer';
import axios from '../api/axios'
import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux';

const GetAllApplicants = (jobId, changeStatus) => {
  const dispatch = useDispatch()

  async function getAllApplicants() {
    try {
      const response = await axios.get(`/applications/${jobId}`, {withCredentials: true})
    if(response.status === 200){
      dispatch(setApplicants(response.data))
    }
    } 
    catch (err) {
      console.log(err)
    }
  }
  useEffect(()=>{
    getAllApplicants()
  },[jobId, changeStatus])
}

export default GetAllApplicants