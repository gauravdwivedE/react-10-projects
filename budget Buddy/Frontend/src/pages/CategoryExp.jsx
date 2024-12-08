import React, { useEffect, useState } from 'react'
import ExpCard from '../components/ExpCard';
import { FaSearch } from "react-icons/fa";
import ExpModal from '../components/Modals/ExpModal';
import getUser from '../utils/getUser';
import axios from '../api/axios'
import { useParams } from 'react-router-dom';
import {errorFlash} from '../utils/flash'

const CategoryExp = () => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [expensesForModal,setExpensesForModal] = useState({})
  const [expenses,setExpenses] = useState([])
  const [loading,setLoading] = useState(false)
  const {category} = useParams();
  
  useEffect(()=>{
    async function getExpenses(){
      const user = getUser()
      try{
      if(user && category){
        const res = await axios.get(`expenses/categories/${category}/${user._id}`)
        setExpenses(res.data)
      }else{
        errorFlash("Something went wrong user not found")
        setLoading(false)
    }
   }
  catch(err){
    if(!err.response){
    errorFlash(err.message)}
    else{
      errorFlash(err.response.data)
    }
    setLoading(false)
    }
    }
    getExpenses()
  },[loading, category])
  
  return (
    <>
    <ExpModal open={open} expensesForModal={expensesForModal} handleClose={handleClose}/>
    <div className='mb-4 relative w-80 px-2'><input className =" w-full p-2 outline-none border-none rounded" placeholder='Search' type="text" />
    <span className='absolute top-[50%] right-[7%] -translate-y-[50%] text-gray-500'><FaSearch/></span>
    </div>
    <div className='w-full h-[70vh] overflow-auto custom-scrollbar'>
     <div className='grid grid-cols-3 gap-3'>
      {expenses?.length > 0 && expenses.map((expense)=> <ExpCard setExpensesForModal = {setExpensesForModal} key= {expense._id} expense = {expense} handleOpen={handleOpen} loading = {loading} setLoading = {setLoading} />)}
     </div>
    </div>
    </>
  )
}

export default CategoryExp