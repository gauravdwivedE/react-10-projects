import { setAllCompanies } from '@/store/reducer/companyReducer';
import axios from '../api/axios'
import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux';

const GetAllCompanies = () => {

  const dispatch = useDispatch()
 const getAllCompanies = async () => {
  try {
    const response = await axios.get("/companies",{withCredentials: true})
    if(response.status === 200){
      dispatch(setAllCompanies(response.data))
    }
  } catch (err) {
    console.log(err);
  }

 }
 useEffect(() => {
  getAllCompanies()
 },[])
}

export default GetAllCompanies