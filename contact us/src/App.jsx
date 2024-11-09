import React from 'react'
import Nav from './components/Nav';
import Hero from './components/Hero';
import Button from './components/Button';
import Form from './components/Form';

const App = () => {
  return (
    <div className='h-screen w-full relative'>
      <Nav/>
      <div className='w-full px-32'>
      <Hero/>
      <div className='mt-10 flex gap-6'>
      <Button value={'via support chat'} isOutline={false}/>
      <Button value={'via call'} isOutline={false}/>
      </div>
      <div className='my-6'>
      <Button value={'via email form'} isOutline={true}/>
      </div>
      <div className='w-full h-[45vh] flex justify-between '>
        <div className="left h-full w-1/2 flex justify-center items-center">
        <Form/>
        </div>
        <div className="right flex-1 flex justify-end items-center">
          <img className = 'h-[60%] w-[60%]' src="./react.svg"/>
        </div>
      </div>
      </div>
    </div>
  )
}

export default App