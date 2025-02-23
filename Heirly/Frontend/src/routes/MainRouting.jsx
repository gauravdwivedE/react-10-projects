import {Routes, Route} from 'react-router-dom'
import Home from '../pages/Home';
import Login from '../pages/Login';
import Signup from '../pages/Signup';
import Jobs from '@/pages/Jobs';
import Browse from '@/pages/Browse';
import Profile from '@/pages/Profile';
import JobDescription from '@/components/shared/JobDescription';
import Companies from '@/admin/Companies';
import CreateCompany from '@/admin/CreateCompany';
import GetCompanyById from '@/admin/CompanySetup';
import AdminJobs from '../admin/AdminJobs';
import JobPostingForm from '../admin/JobPostingForm';
import Applicants from '@/admin/Applicants';
import ProtectedRoute from '@/admin/ProtectedRoute';

const MainRouting = () => {
  return (
    <Routes>
      <Route path = '/' element = {<Home/>}/>
      <Route path = '/login' element = {<Login/>}/>
      <Route path = '/signup' element = {<Signup/>}/>
      <Route path = '/jobs' element = {<Jobs/>}/>
      <Route path = '/jobs/:id' element = {<JobDescription/>}/>
      <Route path = '/browse' element = {<Browse/>}/>
      <Route path = '/Profile' element = {<Profile/>}/>
      <Route path = '/admin/companies' element = {<ProtectedRoute><Companies/></ProtectedRoute>}/>
      <Route path = '/admin/companies/create' element = {<ProtectedRoute><CreateCompany/></ProtectedRoute>}/>
      <Route path = '/admin/companies/:id' element = {<ProtectedRoute><GetCompanyById/></ProtectedRoute>}/>
      <Route path = '/admin/jobs' element = {<ProtectedRoute><AdminJobs/></ProtectedRoute>}/>
      <Route path = '/admin/jobs/create' element = {<ProtectedRoute><JobPostingForm/></ProtectedRoute>}/>
      <Route path = '/admin/job/:id/applicants' element = {<ProtectedRoute><Applicants/></ProtectedRoute>}/>
    </Routes>
  )
}

export default MainRouting