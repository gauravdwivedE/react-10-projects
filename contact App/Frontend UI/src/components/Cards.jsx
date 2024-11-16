import { CgProfile } from "react-icons/cg";
import { RiEditCircleFill } from "react-icons/ri";
import { RiDeleteBin2Fill } from "react-icons/ri";
import AddUpdateContact from "./AddUpdateContact";
import contactProvider from "../hooks/contactProvider"
import sweetAlert from '../utils/sweetAlert'
import axios from "../utils/axios";
import Swal from 'sweetalert2'
const Cards = ({contact}) => {
  const { isOpen, onClose, onOpen } = contactProvider();

  async function deleteContact(id) {
    try {
      const result = await Swal.fire({
        title: 'Are you sure?',
        text: 'You won\'t be able to revert this!',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes, delete it!',
        cancelButtonText: 'No, cancel!',
        confirmButtonColor: '#73ba9b', // Set the color of the confirm button (e.g., yellow)
      });
  
      if (result.isConfirmed) {
        const response = await axios.delete(`/contact/${id}`);
  
        // Show success message
        sweetAlert("Success!","Contact Deleted","success")
        onClose(); 
  
      } else {
      
        sweetAlert("Cancelled!","Contact is Safe","info")
      }
    } catch (err) {
      sweetAlert("Error",err.response ? err.response.data : 'An error occurred while deleting the contact.',"error")
    }
 }

return (
  <div  className='w-[calc(100%-30px)] h-16 p-2 bg-[#73ba9b] mt-3 rounded-xl flex justify-between items-center'>
      <AddUpdateContact onClose = {onClose}  isOpen = {isOpen} isUpdate contact = {contact}/>  

        <div className='flex gap-3 items-center'>
        <div className='text-4xl'>
            <CgProfile/>
        </div>
        <div>
            <h1 className='capitalize text-[16px]'>{contact?.name}</h1>
            <h1 className='text-[14px] text-zinc-300'>{contact?.number}</h1>
        </div>
        </div>
        <div className='flex text-black gap-3 '>
          <span onClick = {()=>onOpen()} className='text-[23px] cursor-pointer'><RiEditCircleFill/></span>  
          <span onClick = {()=>deleteContact(contact._id)} className='text-[23px] cursor-pointer'><RiDeleteBin2Fill/></span>
        </div>
        

    </div>
  )
}

export default Cards