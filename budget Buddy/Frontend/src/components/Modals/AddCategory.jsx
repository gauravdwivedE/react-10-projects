import * as React from 'react';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import axios  from '../../api/axios';
import { useForm } from 'react-hook-form';
import getUser from '../../utils/getUser';
import {errorFlash,successFlash} from '../../utils/flash'
const style = { 
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 700,
  bgcolor: 'background.paper',
  boxShadow: 0,
  borderRadius:3,
  p: 6,
  outline:'none'
};
 
function AddCategory({openModalAddCategory,handleClose,setLoading}) {
  const {register,handleSubmit,reset,formState:{errors}} = useForm()  

  async function addCategory(data){ 
    setLoading(true)   
    const user = getUser()
    try{
      if(user){
     const res = await axios.post(`/categories/${user.id}`,data)
     if(res)successFlash("Category Added Successfully")
     reset()
     handleClose()
     setLoading(false)
    }
    else{
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
  return (
    <div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={openModalAddCategory}
        onClose={handleClose}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
        },}}>
        <Fade in={openModalAddCategory}>
          <Box sx={style}>
            <h1 className='my-3 font-bold text-lg'>Add Category</h1>
           <form onSubmit={handleSubmit(addCategory)} className= "w-full flex flex-col  "action="">
            <input {...register("category",{required:"Enter category", validate: {
              isAlpha: value =>
              /^[A-Za-z]+$/.test(value) || "Only alphabetic characters are allowed",
              minLength: value =>
              value.length >= 3 || "Category must be at least 3 characters long",
              },})} className={`bg-zinc-100 px-3 py-2 rounded outline-none ${errors.category ? " border-2 border-red-400 placeholder:text-red-400": "border-none "}`} placeholder={`${errors.category ? "Category is required ": "Enter Category"}`} type="text" /><br />
            <button className='px-3 py-2 rounded text-md outline-none border-none bg-black text-white'>Save</button>
           </form>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}
export default AddCategory