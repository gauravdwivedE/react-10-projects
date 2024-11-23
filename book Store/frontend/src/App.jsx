import React, { useContext } from 'react'
import Nav from './components/Nav';
import {Navigate, Route, Routes} from 'react-router-dom'
import Home from './pages/Home';
import { Courses } from './pages/Courses';
import NotFound from './pages/NotFound';
import { AuthContext } from './context/AuthProvider';
import Signup from './components/Signup';

  const App = () => {
    const {auth} = useContext(AuthContext)
    
    return (
    <>
    <Nav />
    <Routes>
      <Route path="/" element = {<Home/>}/>
      <Route path="/courses" element = {auth?<Courses/>:<Navigate to ="/auth/signup"/>}/>
      <Route path="/auth/signup" element = {<Signup/>}/>
      <Route path="*" element = {<NotFound/>}/>     
    </Routes>
    </>
    )
  }
  
  export default App