import React from 'react'
import Home from '../pages/home/Home'
import Login from '../pages/auth/login/Login'
import Register from '../pages/auth/register/Register'
import {Routes, Route} from 'react-router-dom'
import ResetPassword from '../pages/auth/forgotPassword/ResetPassword'
import ForgotPassword from '../pages/auth/forgotPassword/ForgotPassword'
import Navbar from '../navbar/Navbar'
import Footer from '../footer/Footer'
import Doctor from '../pages/doctor/doctor'
import Pharmacy from '../pages/pharmacy/Pharmacy'
import Blogs from '../pages/blogs/Blogs'
import { Dashboard } from '@mui/icons-material'
import AddDoctor from '../layout/admin/AddDoctor'
import Nav from '../layout/admin/Nav'
import Sidenav from '../layout/admin/Sidenav'
import ViewDoctor from '../pages/doctor/ViewDoctor'
import UserProfile from '../pages/user/UserProfile'
import NotLoggedInPage from '../pages/user/NotLoggedPage'
import BookAppointment from '../pages/doctor/BookAppointment'
import NavProfile from '../navbar/NavProfile'
import Testesewa from '../testesewa'




const Routers = () => {
  return (
   
    <Routes>
        <Route path='/navbar' element={<Navbar/>}/>
        <Route path='/navprofile' element={<NavProfile/>}/>
        <Route path='/footer' element={<Footer/>}/>
        <Route path='/homepage' element={<Home/>}/>
        <Route path='/' element={<NotLoggedInPage/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/register' element={<Register/>}/>
        <Route path='/forgotPassword' element={<ForgotPassword/>}/>
        <Route path='/resetPassword/:id/:token' element={<ResetPassword/>}/>
        <Route path='/doctor' element={<Doctor/>}/>
        <Route path='/pharmacy' element={<Pharmacy/>}/>
        <Route path='/blog' element={<Blogs/>}/>
        <Route path='/viewdoctor' element={<ViewDoctor/>}/>
        <Route path="/profile/:email" element={<UserProfile />} />
        <Route path="/bookappointment/:doctorid" element={<BookAppointment />} />


        <Route path='/testesewa' element={<Testesewa/>}/>



        {/* <Route path="/admin/" element={<AdminLayout />}></Route> */}
        <Route path='/admin/dashboard' element={<Dashboard/>}/>
        <Route path='/admin/adddoctor' element={<AddDoctor/>}/>
        <Route path='/admin/nav' element={<Nav/>}/>
        <Route path='/admin/sidenav' element={<Sidenav/>}/>
         
    </Routes>

  )
}

export default Routers