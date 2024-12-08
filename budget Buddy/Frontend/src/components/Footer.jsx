import React from 'react'

const Footer = () => {
  return (
    <div>
    <footer className="footer footer-center bg-base-300 text-base-content p-4 translate-y-16">
     <aside>
     <p>Copyright © {new Date().getFullYear()} - All right reserved by Gaurav Dwivedi</p>
    </aside>
    </footer>
   </div>
  )
}

export default Footer