import React, { useEffect, useState } from 'react'
import ExpCard from '../components/ExpCard';
import ExpModal from '../components/Modals/ExpModal';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import getUser from '../utils/getUser';
import axios from '../api/axios'
import Loading from '../components/Loading';
import AddCategory from '../components/Modals/AddCategory';
import { FaCirclePlus } from 'react-icons/fa6';
import {successFlash,errorFlash} from '../utils/flash'
const Home = () => {

  const [openModalAddCategory, setOpenModalAddEarnigs] = useState(false);
  const handleOpenAddCategory = () => setOpenModalAddEarnigs(true);
  const handleCloseAddCategory = () => setOpenModalAddEarnigs(false);
  const [open, setOpen] = useState(false)
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)
  const [loading,setLoading] = useState(false)
  const [dataLoading,setDataLoading] = useState(false)
  const [latestExpenses,setLatestExpenses] = useState([])
  const [expensesForModal,setExpensesForModal] = useState({})
  const [categories,setCategories] = useState([])

  const {register,handleSubmit,reset,formState:{errors,}} = useForm({
    defaultValues:{
      date:new Date().toISOString().split("T")[0]
   }})
  
   //create expesnes api calling
  async function createExpenses(data){
    setLoading(true)
    const user = getUser()
    try{
    if(user){
      const res = await axios.post(`/expenses/${user.id}`,data)
      if(res) successFlash("Expense Created")
      reset()
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

  //recent expenses api calling
  useEffect(()=>{  
    async function getLatestExpenses(){
      setDataLoading(true)
      const user = getUser()
      try{
      if(user){           
      const res = await axios.get(`/expenses/latest/${user.id}`)
      setLatestExpenses(res.data)
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
    setDataLoading(false)
  }
  }
    getLatestExpenses()
  },[loading])
  
  //get category api calling
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
      errorFlash(err.response.data)
      setDataLoading(false)
    }
    }
    getCategories()
  },[loading])

  return (
   <>
   {loading || dataLoading && <Loading/>}
   <AddCategory setLoading={setLoading} handleClose={handleCloseAddCategory} openModalAddCategory={openModalAddCategory} />
   <ExpModal open={open} handleClose={handleClose} expensesForModal={expensesForModal} />
    <h1 className='text-3xl font-semibold '>Add Expenses</h1>
    <div className='w-full h-[70vh] flex gap-x-10 p-5 '>
    <div className='w-1/2 h-full pr-4 py-2'>
    <form className="flex flex-col" onSubmit={handleSubmit(createExpenses)}>
      {/* Title Field */}
      <label htmlFor="title">Title</label>
      <input
        {...register("title", { required: "Title is required" })}
        className="px-3 py-2 rounded-lg outline-none border-none"
        type="text"
      />
      {errors.title && <span className="text-red-500">{errors.title.message}</span>}

      {/* Description Field */}
      <label htmlFor="desc" className="mt-3">Description</label>
      <input
        {...register("desc", { required: "Description is required" })}
        className="px-3 py-2 rounded-lg outline-none border-none"
        type="text"
      />
      {errors.desc && <span className="text-red-500">{errors.desc.message}</span>}

      {/* Amount Field */}
      <label htmlFor="amount" className="mt-3">Amount</label>
      <input
        {...register("amount", {
          required: "Amount is required",
          valueAsNumber: true,
          validate: (value) =>
            !isNaN(value) && value > 0|| "Amount must be a valid number",
        })}
      
        className="px-3 py-2 rounded-lg outline-none border-none"
        type="text"
      />
      {errors.amount && <span className="text-red-500">{errors.amount.message}</span>}

      {/* Budget Field */}
      <label htmlFor="budget" className="mt-3">Budget</label>
      <input
        {...register("budget", {
          required: "Budget is required",
          valueAsNumber: true,
          validate: (value) =>
            !isNaN(value) && value > 0|| "Budget must be a valid number",
        })}
        className="px-3 py-2 rounded-lg outline-none border-none"
        type="text"
      />
      {errors.budget && <span className="text-red-500">{errors.budget.message}</span>}

      {/* Category Field */}
      <label htmlFor="category" className="mt-3">Category</label>
      <div className='flex w-full items-center gap-4 pr-2'>
      <select 
      onChange={()=>console.log("gggg")}
        defaultValue=""
        {...register("category", { required: "Category is required" })}
        className="flex-1 px-3 py-2 rounded-lg outline-none border-none"
      >
        <option value="" disabled>
          Select
        </option>
        {categories.map((category)=><option key={category._id} value={category.category}>{category.category}</option> )}
      </select>
      <span className='text-2xl'><FaCirclePlus onClick={handleOpenAddCategory} /></span>
      </div>
      {errors.category && (
        <span className="text-red-500">{errors.category.message}</span>
      )}


      {/* Date Field */}
      <label htmlFor="date" className="mt-3">Date</label>
      <input
        {...register("date", { required: "Date is required" })}
        className="px-3 py-2 rounded-lg outline-none border-none"
        type="date"
      />
      {errors.date && <span className="text-red-500">{errors.date.message}</span>}

      {/* Submit Button */}
      <button className="px-3 py-2 rounded-lg outline-none border-none mt-3 bg-black text-white">
        Save
      </button>
    </form>
    </div>
    <div className='bg-white shadow-sm rounded flex-1 p-4 overflow-hidden flex flex-col mt-4'>
      <div className=''><h1 className='font-semibold text-xl mb-6 bg-white w-full'>Recents</h1></div>
      <div className='flex-1 overflow-hidden overflow-y-auto px-2 custom-scrollbar'>
      {latestExpenses?.length > 0  ? latestExpenses.map((expense)=><ExpCard setExpensesForModal = {setExpensesForModal} key= {expense._id} expense = {expense} handleOpen={handleOpen} setLoading={setLoading}/>):"No expenses found..."}
      <div className='flex justify-center h-8'><Link to = "/expenses" className='hover:border-b-2 border-blue-100 cursor-pointer mt-2'>More</Link></div>
      </div>
    </div>
    </div>
 </>

  )
}

export default Home