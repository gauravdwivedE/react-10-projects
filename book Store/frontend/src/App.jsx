import React from 'react'
import Nav from './components/Nav';
import {Route, Routes} from 'react-router-dom'
import Home from './pages/Home';
import { Courses } from './pages/Courses';
import NotFound from './pages/NotFound';

  const App = () => {
    return (
    <>
    <Nav />
    <Routes>
      <Route path="/" element = {<Home/>}/>
      <Route path="/courses" element = {<Courses/>}/>
      <Route path="*" element = {<NotFound/>}/>     
    </Routes>
    </>
    )
  }
  
  export default App