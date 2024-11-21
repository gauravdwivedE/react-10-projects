import React from 'react'

const Banner = () => {
  return (
    <div className='px-4 max-w-screen-2xl mx-auto flex flex-col md:flex-row p-2 my-10 mt-12 md:mt-44'>
        <div className='w-full md:w-1/2  order-2 md:order-1'>
        <div className='space-y-5 md:space-y-12 '>
        <h1 className='text-5xl font-semibold'>Hello, welcomes here to learn something <span className='text-pink-500'>new everyday</span></h1>
        <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Enim praesentium neque repellat fugit ratione blanditiis saepe, magni provident voluptates expedita! Cumque delectus rem exercitationem</p>
        <label className="px-3 py-2 rounded-full border-2 border-gray-300 flex items-center gap-2">
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 16 16"
    fill="currentColor"
    className="h-4 w-4 opacity-70">
    <path
      d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" />
    <path
      d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" />
  </svg>
  <input type="text" className="grow outline-none bg-transparent
  " placeholder="Email" />
</label>
</div>
<button className="btn btn-secondary mt-6">Secondary</button>
        </div>

        <div className='w-full md:w-1/2  order-1 md:order-2 '>
        <img className='w-92 object-contain mx-auto' src="https://img.freepik.com/free-vector/realistic-book-lover-composition-with-stack-colorful-books-with-eyeglasses-home-plants-tea-cup-vector-illustration_1284-77312.jpg?semt=ais_hybrid" />
        </div>
    </div>
  )
}

export default Banner