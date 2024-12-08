import * as React from 'react';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import formatDate from '../../utils/formateDate';

const style = { 
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 700,
  bgcolor: 'background.paper',
  border: 'none',
  boxShadow: 0,
  borderRadius:3,
  outline:'none',
  p: 6,
  
};

function ExpModal({open,handleClose,expensesForModal}) {

  return (
    <div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Fade in={open}>
          <Box sx={style}>
            <div className='flex items-center mb-4 gap-10'><h1 className='text-2xl font-semibold'>{expensesForModal.category}</h1> <h1>{formatDate(expensesForModal.date)}</h1></div>
            <h1 className='text-lg font-semibold'>Title - {expensesForModal.title} </h1>
            <p className='text-sm'>{expensesForModal.desc}</p>
            <div className='mt-5 flex gap-2 items-center'><h2 className='text-lg font-semibold'>Budget : </h2> {expensesForModal.budget}</div>
            <div className='mt-1 flex gap-2 items-center'><h2 className='text-lg font-semibold'>Expend : </h2> {expensesForModal.amount}</div>
            <div className='mt-1 flex gap-2 items-center'><h2 className='text-lg font-semibold'>Balance : </h2> {expensesForModal.balance}</div>
            <div className='flex items-center mt-10 gap-5'>
                <button className='px-6 py-2 bg-black text-sm text-white rounded'>Edit</button>
                <button className='px-6 py-2 bg-red-500 text-sm text-white rounded'>Delete</button>
            </div>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}
export default ExpModal