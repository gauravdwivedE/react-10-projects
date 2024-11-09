import React from 'react'
import { BASE_URL } from '../App';
import Button from './Button';

const Cards = ({foodsData}) => {
  return (
    <div className='card h-[8rem] lg:w-[31vw] bg-white/20 backdrop-blur-sm rounded flex p-2 items-center gap-2 md:w-[45vw]'>
      <div>
        <img  className = 'w-[100%] ' src={BASE_URL+foodsData.image}/>
      </div>
      <div>
      <h2 className='font-bold text-lg '>
      {foodsData.name}
      </h2>
      <p className='text-[12px]'>{foodsData.text}</p>
      <div className='text-right'>
      <Button value={"$"+foodsData.price+".00"} />
        </div>
      </div>
    </div>
  )
}

export default Cards