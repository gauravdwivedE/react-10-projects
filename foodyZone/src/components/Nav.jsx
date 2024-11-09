import React from 'react'
import FilterArea from './FilterArea';

const Nav = ({searchFilter,buttonFilter}) => {
  return (
    <nav className='p-6 bg-[#1c1c1c] flex flex-col justify-center items-center '>
        <div>
            <img src="./Foody Zone.svg"  />
        </div>
        <FilterArea searchFilter = {searchFilter} buttonFilter = {buttonFilter}/>
    </nav>
  )
}

export default Nav