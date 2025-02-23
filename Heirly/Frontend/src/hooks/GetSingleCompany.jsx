import axios from '../api/axios'
import React, { useEffect } from 'react'
import { setSingleCompany } from '@/store/reducer/companyReducer';
import { useDispatch } from 'react-redux';

const GetSingleCompany = (companyId) => {
  const dispatch = useDispatch()
  const getSingleCompant = async () => {
    try {
      const response = await axios.get(`companies/${companyId}`, {withCredentials: true})
      if(response.status === 200){
        console.log(response.data);
        
        dispatch(setSingleCompany(response.data))
      }
    }
     catch (err) {
      console.log(err);
    }
  }
  useEffect(() => {
    getSingleCompant()
  },[companyId])
}

export default GetSingleCompany