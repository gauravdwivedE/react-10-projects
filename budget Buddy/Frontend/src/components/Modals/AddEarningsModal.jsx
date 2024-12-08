import React from 'react';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import { useForm } from 'react-hook-form';
import getUser from '../../utils/getUser';
import axios from '../../api/axios'
import {successFlash,errorFlash} from '../../utils/flash'
const style = { 
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 700,
  bgcolor: 'background.paper',
  boxShadow: 0,
  borderRadius: 3,
  p: 6,
  outline: 'none',
};

function AddEarningsModal({ openModalAddEarnigs, handleClose ,setLoading}) {
  const {register,handleSubmit,reset,formState: { errors },} = useForm();

  async function addEarning(data){ 
    setLoading(true)   
    const user = getUser()
     try{
      if(user){
      const res = await axios.post(`/earnings/${user.id}`,data)
      if(res) successFlash("Earnings Added Successfully")
     reset()
     handleClose()
     setLoading(false)
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

  return (
    <div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={openModalAddEarnigs}
        onClose={handleClose}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Fade in={openModalAddEarnigs}>
          <Box sx={style}>
            <h1 className="my-3 font-bold text-lg">Add Earnings</h1>
            <form className="w-full flex flex-col justify-center" onSubmit={handleSubmit(addEarning)}>
              <input
                className = {`bg-zinc-100 px-3 py-2 rounded outline-none ${errors.earnings && "border-red-400 border-2 placeholder:text-red-400" }`}
                placeholder = {errors.earnings ? errors.earnings.message : "Enter Earnings"}
                type="text"
                {...register("earning", {required: "Earnings are required",valueAsNumber: true,validate: value => value > 0 || "Earnings must be greater than 0",})}/>
              <br />
              <button type="submit"className="px-3 py-2 rounded text-md outline-none border-none bg-black text-white">
                Save
              </button>
            </form>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}

export default AddEarningsModal;
