import React, { useEffect, useRef, useState } from 'react'
import Sidebar from './Sidebar'
import { gsap } from 'gsap';

const Nav = () => {
    const [sidebar,setSidebar] = useState(false)
    const firstLine = useRef(null);
  const secondLine = useRef(null);
  const thirdLine = useRef(null);
  const timelineRef = useRef(null); // Ref to store the timeline

  useEffect(() => {
    // Initialize the timeline only once
    timelineRef.current = gsap.timeline();

    // Define the animations in the timeline
    timelineRef.current
      .to(secondLine.current, {
        x: 100,
        autoAlpha: 0,   // `autoAlpha` is a GSAP shorthand for opacity + visibility
        duration: 0.5,
        margin:1,
      })
      .to(
        firstLine.current,
        {
          rotate: 45,
          ease: 'sine',
          duration: 0.5,
          y:6
        },
        'linked'
      )
      .to(
        thirdLine.current,
        {
          rotate: -45,
          ease: 'sine',
          duration: 0.5,
        },
        'linked'
      );
  }, []); // Empty dependency array ensures this runs only once

  useEffect(() => {
    // Control the timeline playback based on `sidebar` state
    if (sidebar) {
      timelineRef.current.play(); // Play the animation forward
    } else {
      timelineRef.current.reverse(); // Reverse the animation
    }
  }, [sidebar]); // Re-run whenever `sidebar` changes

  
  return (
    <>
    <nav className='w-full h-20 flex justify-between px-8 items-center relative top-0'>
        <div>
            <img className = 'h-full w-16 rounded-full' src="https://imgs.search.brave.com/xvMA2sNiEoBWzRCxK-wzFfEPEdsIORE-iGguMIs0O4Q/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly90My5m/dGNkbi5uZXQvanBn/LzAxLzMyLzY3LzU0/LzM2MF9GXzEzMjY3/NTQ1Nl8ySTFUMlFv/MGcxZmQzbzVwVXBQ/djU5UlVyQ0g1c2JX/bC5qcGc" alt="" />
        </div>

        <div onClick={()=>setSidebar(!sidebar)} className='w-20'>
            <span ref = {firstLine} className='block w-6 bg-white h-[2px]  '> </span>
            <span ref = {secondLine} className='block w-10 bg-white h-[2px] my-2'></span>
            <span ref = {thirdLine} className='block w-6 bg-white h-[2px]  '></span>
        </div>
    </nav>
    <Sidebar sidebar = {sidebar}/>
    </>
  )
}

export default Nav