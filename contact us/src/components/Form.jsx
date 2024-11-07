import React, { useState } from 'react'
import {useForm} from 'react-hook-form'
import Button from './Button';
import { IoCloseOutline } from "react-icons/io5";

const Form = () => {
    
    const {register,handleSubmit,reset} = useForm()
    const [data,setData] = useState(null)
    function submit(data){
        setData(data)
        reset()
    }
  return (
    <>
    <form onSubmit={handleSubmit(submit)}>
        <input  {...register('name',{required:true})} className = 'px-2 py-2 outline-none bg-zinc-700 mb-3 rounded w-full'type="text" placeholder='Name' />
        <input  {...register('email',{required:true}) } className = 'px-2 py-2 outline-none bg-zinc-700 mb-3 rounded w-full'type="text" placeholder='Email' />
        <input  {...register('text',{required:true}) } className = 'px-2 py-2 outline-none bg-zinc-700 mb-3 rounded w-full'type="text" placeholder='Text' />
        <div>
        <Button value={'Submit'} isOutline={false}/>
        </div>
    {data && <div className='mt-10 bg-green-400 px-2 py-2 rounded flex items-center justify-between'><p> Form Submitted we will contact you soon {data?.name}</p><span onClick = {()=>setData(null)}className='text-4xl'><IoCloseOutline />
    </span></div>}
    </form>
    </>
  )
}

export default Form