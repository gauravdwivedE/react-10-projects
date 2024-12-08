import React, { useState } from 'react'
import { FaCirclePlus } from "react-icons/fa6";
import AddEarningsModal from './Modals/AddEarningsModal';
import Loading from './Loading';

const TopCard = ({value,setLoading}) => {
  const [openModalAddEarnigs, setOpenModalAddEarnigs] = useState(false);
  const handleOpen = () => setOpenModalAddEarnigs(true);
  const handleClose = () => setOpenModalAddEarnigs(false);
  return (
    <>
  
    <div className=' rounded bg-white px-5 py-3  flex items-center gap-x-6 text-2xl cursor-pointer shadow-sm'>
      <h2 className='text-sm '>{value[0]}<span className='font-semibold block'>{value[1]}</span></h2>{value[0]=== 'Earnings' && <FaCirclePlus onClick={handleOpen}/>}
    <AddEarningsModal setLoading = {setLoading} openModalAddEarnigs={openModalAddEarnigs} handleClose={handleClose}/></div>
    </>
  )
}

export default TopCard