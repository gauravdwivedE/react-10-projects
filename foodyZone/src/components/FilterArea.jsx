import React, { useState } from 'react'
import Button from './Button'

const FilterArea = ({searchFilter,buttonFilter}) => {
  const [clickedButton,setClickedButton] = useState('All')

  return (
    <div className='filter-area flex items-center mt-8 w-full justify-between'>
        <div className='flex gap-[2vw] justify-between flex-wrap '>
        <Button clickedButton = {clickedButton} setClickedButton = {setClickedButton} buttonFilter = {buttonFilter} value={'All'}/>
        <Button clickedButton = {clickedButton} setClickedButton = {setClickedButton} buttonFilter = {buttonFilter} value={'breakfast'}/>
        <Button clickedButton = {clickedButton} setClickedButton = {setClickedButton} buttonFilter = {buttonFilter} value={'lunch'}/>
        <Button clickedButton = {clickedButton} setClickedButton = {setClickedButton} buttonFilter = {buttonFilter} value={'Dinner'}/>
        </div>
        <div>
          <input onChange = {(e)=> searchFilter(e)} className='outline-none border-none rounded px-4 py-1 rounded-full' type="text" placeholder='Search'/>
        </div>
    </div>
  )
}

export default FilterArea