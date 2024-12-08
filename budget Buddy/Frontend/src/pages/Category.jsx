import React, { useEffect, useState } from 'react'
import TopCard from '../components/TopCard';
import { FaCirclePlus } from 'react-icons/fa6';
import AddCategory from '../components/Modals/AddCategory';
import axios from '../api/axios';
import getUser from '../utils/getUser';
import Loading from '../components/Loading';
import { NavLink } from 'react-router-dom';
import {errorFlash} from '../utils/flash'

const Category = () => {
  const [openModalAddCategory, setOpenModalAddEarnigs] = useState(false);
  const handleOpen = () => setOpenModalAddEarnigs(true);
  const handleCloseAddCategory = () => setOpenModalAddEarnigs(false);
  const [categories,setCategories] = useState([])
  const [loading,setLoading] = useState(false)
  const [dataLoading,setDataLoading] = useState(false)

  useEffect(()=>{
    async function getCategories() {
      setDataLoading(true)
      const user = getUser()
      try{
        if(user){
          const res = await axios.get(`/categories/${user.id}`)
          setCategories(res.data) 
          setDataLoading(false)
        }
          else{
            errorFlash("Something went wrong user not found")
            setDataLoading(false)
        }
       }
      catch(err){
        if(!err.response){
        errorFlash(err.message)}
        else{
          errorFlash(err.response.data)
        }
        setDataLoading(false)
      }
    }
    getCategories()
  },[loading])

  return (
    <>
    {loading || dataLoading && <Loading/>}
   <AddCategory setLoading={setLoading} handleClose={handleCloseAddCategory} openModalAddCategory={openModalAddCategory} />
    <div className='grid grid-cols-5 gap-3'>
    <div onClick = {handleOpen} className='rounded bg-white px-5 py-3  flex items-center text-3xl cursor-pointer shadow-sm'>< FaCirclePlus/></div>
    {categories.map((category)=><NavLink  key = {category._id} to = {`/categories/expenses/${category.category}`} ><TopCard  value={["",`${category.category}`]}/></NavLink>)}
    </div>
    </>
  )
}

export default Category