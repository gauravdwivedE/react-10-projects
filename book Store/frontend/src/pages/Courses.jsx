import React from 'react'
import Card from '../components/Card';
import {useNavigate} from 'react-router-dom'

export const Courses = () => {
    const nevigate = useNavigate()
    const goBack = () =>{
        nevigate(-1)
    }
  return (
    <div className='mt-32 max-w-screen-2xl mx-auto px-4'>
        <h1 className='text-nowrap text-center text-2xl font-semibold md:text-4xl'>We'r delighted to have you <span className='text-pink-500'>Here! :)</span></h1>
        <p className='text-justify md:text-center my-8 text-sm md:text-base'>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Reprehenderit cupiditate amet perferendis cum laboriosam dolorem a quas similique quidem sequi. Eum ea tenetur voluptatem ut facilis eaque nulla omnis voluptates reiciendis quidem obcaecati doloribus sapiente mollitia qui repellendus doloremque nesciunt eveniet iusto inventore fugiat, rem fuga exercitationem! Provident, expedita temporibus!</p>
        <div className='text-center'><button onClick = {goBack} className='px-6 py-2 bg-pink-500 text-white rounded'>Back</button></div>
        <div className='flex flex-wrap gap-9 justify-center md:justify-normal mt-28 '>
          <Card/>  
          <Card/>  
          <Card/>  
          <Card/>  
          <Card/>  
          <Card/>  
          <Card/>  
          <Card/>  
          <Card/>  
          <Card/>  
          <Card/>  
        </div>
    </div>
  )
}
