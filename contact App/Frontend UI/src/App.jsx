import React, { useEffect, useState } from 'react'
import { AiFillPlusCircle } from "react-icons/ai";
import Nav from './components/Nav';
import AddUpdateContact from './components/AddUpdateContact';
import Cards from './components/Cards';
import axios from './utils/axios';
import sweetAlert from './utils/sweetAlert'
import contactProvider from './hooks/contactProvider';

const App = () => {
  const { isOpen, onClose, onOpen } = contactProvider();
  const [contacts, setContacts] = useState(null)
  const [filteredContacts,setFilteredContacts] = useState(null)

  async function getAllContacts() {
    try{
      const response = await axios.get('/contact')
      
      setContacts(response.data)
    } 
    catch(err){
      if(!err.response){
        sweetAlert("Error",err.message+" please refresh the page or try again ","error")
      } else{
        sweetAlert("Error",err.response.data+" please refresh the page or try again ","error")
      }    
    }
  }

  function searchFilter(e){
    const filterString = e.target.value.toLowerCase().trim()

    if(filterString == '' || filterString == null ){
      setFilteredContacts(null)
    }
    const filter = contacts?.filter((item)=> item.name.toLowerCase().includes(filterString))
    setFilteredContacts(filter)
    
  }

  useEffect(()=>{
    getAllContacts()
  },[onClose])

  return (
    <div className='main w-full h-screen flex justify-center items-center lg:p-2'>
      <div className='w-[450px] h-full bg-[#1c1c1c] rounded-lg overflow-hidden overflow-y-auto flex flex-col items-center'>
        <Nav/>
        <div className='flex justify-between w-[calc(100%-20px)] px-2 items-center my-4'>
          <input onChange = {(e)=>searchFilter(e)}className = 'p-2 px-4 flex-1 text-sm outline-none border-[1px] mr-5 bg-transparent rounded-xl placeholder:text-zinc-200'type="text"  placeholder='Search contacts'/>
          <span onClick={()=>onOpen()} className='text-white text-5xl cursor-pointer'> <AiFillPlusCircle /> </span>
        </div>  
        <AddUpdateContact onClose = {onClose}  isOpen = {isOpen}/>  
        {filteredContacts ? filteredContacts.map((item,idx)=><Cards key = {idx} isOpen={isOpen} onClose={onClose} onOpen={onOpen} contact={item} />) : contacts ? contacts.map((item,idx)=><Cards key = {idx} isOpen={isOpen} onClose={onClose} onOpen={onOpen} contact={item} />):"Loading..."}
      </div>
    </div>
  )
}

export default App