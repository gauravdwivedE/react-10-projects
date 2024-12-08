import React from 'react'
import SideNav from '../components/SideNav'
import TopNav from '../components/TopNav';
import MainRoutes from '../../routes/MainRoutes';
import { useAuth } from '../context/AuthProvider';
import { Navigate } from 'react-router-dom';
const Dashboard = () => {
  const {auth} = useAuth()
    if (!auth) {
      return <Navigate to="/" />;
   }
  return (
    <div className='flex h-screen w-full bg-blue-50'>
      <SideNav />
      <div className='flex-1 p-7'>
      <TopNav/>
     <MainRoutes/> 
      </div>
    </div>
  )
}

export default Dashboard