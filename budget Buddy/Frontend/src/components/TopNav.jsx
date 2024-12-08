import React, { useEffect, useState } from 'react'
import TopCard from './TopCard';
import 'react-toastify/dist/ReactToastify.css';
import Loading from './Loading';
import axios from '../api/axios';
import getUser from '../utils/getUser';
import { errorFlash } from '../utils/flash';

const TopNav = () => {
  const [loading,setLoading] = useState(false)
  const [earnings,setEarnings]= useState({})
  const [balance,setBalance]= useState({})

  useEffect(()=>{
    async function getEarnings(){
      const user = getUser()
      try{
       const res = await axios.get(`earnings/${user.id}`)
       setEarnings(res.data)
      }
      catch(err){
        errorFlash("Error while fetching your earnings")
      
      }
    }
    getEarnings()
  }),[loading]

  useEffect(()=>{
    async function getBalance(){
      const user = getUser()
      try{
       const res = await axios.get(`balances/${user.id}`)
       setBalance(res.data)
      }
      catch(err){
        errorFlash("Error while fetching your balance")
      }
    }
    getBalance()
  }),[loading]

  return (
    <>
    { loading && <Loading/> }
    {/* <ToastContainer /> */}
    <div className='flex justify-between items-center mb-14'>
    <h3 className='text-xl font-semibold font-serif'>Budget Buddy</h3>
    <div className='flex gap-x-4 items-center justify-end'>
    {balance && <TopCard setLoading = {setLoading} value={["Balance",`${balance.balance}`]}/>}
    {earnings && <TopCard setLoading = {setLoading} value={["Earnings",`${earnings.totalEarnings}`]}/>}
    </div>
  </div>
    </>
  )
}

export default TopNav