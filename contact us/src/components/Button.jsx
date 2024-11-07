import React from 'react'

const Button = ({value,isOutline}) => {
  return (
    <button className={`px-8 py-3 rounded uppercase text-sm ${isOutline ? 'bg-transparent border-[1px] border-white bg-black px-28' : 'bg-black'}`}>
    {value}
    </button>
  )
}

export default Button