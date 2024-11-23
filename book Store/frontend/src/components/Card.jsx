import React from 'react'

const Card = ({books}) => {
  return (
    <div>
    <div className="card shadow-lg bg-base-100 w-80 h-96 shadow-xl">
  <figure className='aspect-[16/9]'>
    <img className='w-full h-64 object-contain'
      src={books.image}
      alt="book..." />
  </figure>
  <div className="card-body">
    <h2 className="card-title">
      {books.name}
      <div className="badge badge-secondary  text-nowrap">{books.category}</div>
    </h2>
    <p>{books.desc}</p>
    <div className="card-actions justify-between mt-2">
      <div className=''>${books.price}</div>
      <div className="badge badge-outline p-3 px-4 hover:bg-pink-500">{books.price == 0 ? "Read" :"Buy Now"}</div>
    </div>
  </div>
</div>
</div>
  )
}

export default Card