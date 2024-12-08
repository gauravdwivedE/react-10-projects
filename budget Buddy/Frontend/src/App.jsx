import React from 'react'
import AuthPage from './pages/AuthPage';
import Dashboard from './pages/Dashboard';
import { useAuth } from './context/AuthProvider';
import { ToastContainer } from 'react-toastify';

const App = () => {
const {auth} = useAuth()
  return (
    <div>
      <ToastContainer/>
      {auth ?  <Dashboard/>: <AuthPage/>} 
    </div>
  )
}

export default App
