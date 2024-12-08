import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Category from '../src/pages/Category';
import CategoryExp from '../src/pages/CategoryExp';
import Home from '../src/pages/Home';
import ExpList from '../src/pages/ExpList';
import Analysis from '../src/pages/Analysis';
import NotFoundPage from '../src/pages/NotFound';

const MainRoutes = () => {
  return (
    <Routes>
        <Route path='/' element = {<Home/>} />
        <Route path='/categories' element = {<Category/>}/>
        <Route path='/expenses' element = {<ExpList/>} />
        <Route path='/categories/expenses/:category' element = {<CategoryExp/>}/>
        <Route path='/analysis' element = {<Analysis/>} />
        <Route path='/*' element = {<NotFoundPage/>} />
    </Routes>
    
  )
}

export default MainRoutes