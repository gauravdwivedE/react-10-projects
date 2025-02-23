import Navbar from '../components/shared/Navbar'
import React, { useEffect } from 'react'
import HeroSection from '../components/shared/HeroSection';
import Categorycarousel from '../components/shared/CategoryCarousel';
import LatestJob from '../components/shared/LatestJobs';
import Footer from '../components/shared/Footer';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const Home = () => {
  const navigate = useNavigate()
  const {user} = useSelector((state) => state.user)
  useEffect(()=>{
      user?.role == 'Recruiter' && navigate("/admin/companies")
  },[])
  return (
   <>
    <Navbar />
    <HeroSection />
    <Categorycarousel/>
    <LatestJob/>
    <Footer/>
   </>
  )
}

export default Home