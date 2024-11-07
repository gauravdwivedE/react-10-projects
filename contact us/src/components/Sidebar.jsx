import { gsap } from 'gsap';
import { useEffect, useRef } from 'react';


const Sidebar = ({sidebar}) => {
    const sidebarRef = useRef(null)
    useEffect(() => {
        gsap.to(sidebarRef.current, { 
            right: `${sidebar?'0rem':'-40rem'}`,
            delay:.03
        });
      }, [sidebar]);
    
  return (
    <div ref = {sidebarRef} className= 'bg-white/30 backdrop-blur-lg rounded h-[calc(100%-5rem)] p-10 w-[30rem]  absolute right-[-40rem] z-[99] text-4xl text-white '>
       <h2 className='my-10'>Home</h2>
       <h2 className='my-10'>About</h2>
       <h2 className='my-10'>Contact</h2>
       <h2 className='my-10'>Service</h2> 
       <h2 className='my-10'>Request a call</h2> 
    </div>
  )
}

export default Sidebar