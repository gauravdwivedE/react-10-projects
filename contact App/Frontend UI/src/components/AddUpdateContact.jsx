import React, { useEffect } from 'react'
import Modal  from './Modal'
import {useForm} from 'react-hook-form'
import axios from '../utils/axios';
import sweetAlert from '../utils/sweetAlert'

const AddUpdateContact = ({isOpen, onClose, isUpdate, contact}) => {
 
  const {register,handleSubmit,reset} = useForm({
    defaultValues: isUpdate?{
      name: contact.name,
      number: contact.number,
    }:{
      name: '',
      number: '',
    }
  });

  async function updateContact (data){
    const {name,number} = data
    console.log(contact._id);
    
    try{
      const response = await axios.put(`/contact/${contact._id}`,{name,number})
      reset()
      onClose()
      sweetAlert("Success!","Contact Updated","success")
    }
    catch(err){
      sweetAlert("Error","Contact already exist with this name" ,"error")
    }
  };

  async function createContact (data){    
    const {name,number} = data
    try{
      const response = await axios.post("/contact",{name,number})
      reset()
      onClose()
      sweetAlert("Success!","Contact Added","success")

    }
    catch(err){
      sweetAlert("Error",err.response.data ,"error")
    }
  };

  return (
    <Modal isOpen = {isOpen} onClose = {onClose} isUpdate = {isUpdate} >
    <form onSubmit = {handleSubmit(isUpdate?updateContact:createContact)} className='w-full flex flex-col gap-2 mt-10'>
        <input {...register("name", {required:true})} className = "outline-[#73ba9b] w-full text-zinc-800 rounded-xl bg-transparent text-[16px] border-zinc-400 py-2 px-4 border-[2px] placeholder:text-zinc-300" type="text" placeholder='Enter Name'/>
        <input {...register("number", {required:true})} maxLength="10"  className = "outline-[#73ba9b] w-full text-zinc-800 rounded-xl bg-transparent text-[16px] border-zinc-400 py-2 px-4 border-[2px] placeholder:text-zinc-300" type="text" placeholder='Enter Number'/>            
        <button className='px-4 mt-4 py-2 bg-[#73ba9b] w-fit rounded-xl text-[16px] active:bg-black'>{isUpdate?"Update":"Add"}</button>
    </form>
    </Modal>
)
}

export default AddUpdateContact