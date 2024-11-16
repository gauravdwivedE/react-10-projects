import { IoClose } from "react-icons/io5";
import { createPortal } from "react-dom"

const Modal = ({isOpen, onClose, isUpdate, children}) => { 
  return createPortal(
    <>
    {isOpen && 
    <>
    <div className='backdrop-blur h-screen w-full absolute top-0 z-50 py-20'>
     <div className="w-[380px] m-auto bg-white p-4 rounded-xl">
      <div className='text-black flex justify-between'>
        <h1 className='text-xl font-semibold'>{isUpdate?"Update Contact":"Add Contact"}</h1>
        <span onClick = {()=>onClose()}className='text-4xl cursor-pointer'><IoClose /></span>
      </div>
      {children}
    </div>
     </div>
  </>}
  </>
  ,document.querySelector("#modal-root"))
}

export default Modal