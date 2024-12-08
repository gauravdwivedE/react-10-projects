import React, { useEffect, useState } from 'react'
import { RiDeleteBin7Fill, RiEditCircleFill } from "react-icons/ri";
import formatDate from '../utils/formateDate';
import Loading from './Loading';
import axios from '../api/axios'
import getUser from '../utils/getUser';
import Swal from 'sweetalert2'
const ExpCard = ({handleOpen,expense,setExpensesForModal,loading,setLoading}) => {
  
  function handelClick(){
    setExpensesForModal(expense)
    handleOpen()
  }

 async function handelDelete(id){

  const result = await Swal.fire({
    title: 'Are you sure?',
    text: 'You won\'t be able to revert this!',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: 'Yes, delete it!',
    cancelButtonText: 'No, keep it'
  })
   if(!result.isConfirmed)  return

  setLoading(true)
  const user = getUser()
  if(id && user){
    try{
     const res = await axios.delete(`/expenses/${user.id}/${id}`)
       if(res){
      Swal.fire(
        'Deleted!',
        'Your file has been deleted.',
        'success'
      );
       }
       else{
      Swal.fire(
        'Error!',
        'Error while deleting expense',
        'error'
      );
       }
      }catch(err){
        Swal.fire(
          'Error!',
          `${err.response.data}`,
          'error'
        )
      
      
      }
  }
  else{
    Swal.fire(
      'Error!',
      "Something went wrong",
      'error'
    )
  }  
  setLoading(false)
 }

  return (
    <>
     {loading && <Loading/> }
     <div className='my-1 bg-blue-100 w-full h-16 p-3 rounded flex justify-between items-center overflow-auto text-sm '>
      <div onClick = {()=>handelClick()} className=' cursor-pointer w-[85%] flex justify-between items-center'> <h2>{expense.title}<div className='font-semibold'>RS {expense.amount}</div></h2>
       <h1 className='text-sm cursor-pointer select-none'>{formatDate(expense.date)}</h1></div>
      <div className='flex justify-center items-center text-xl gap-3'>
       <RiEditCircleFill className='cursor-pointer'/> <RiDeleteBin7Fill onClick = {()=>handelDelete(expense._id)} className='cursor-pointer' /></div> 
      </div> 
    </>
  )
}

export default ExpCard