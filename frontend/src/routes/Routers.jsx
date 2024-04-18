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
import AddDoctor from '../dashboard/addDoctor/AddDoctor'
import Nav from '../dashboard/Nav'
import Sidenav from '../dashboard/Sidenav'
import ViewDoctor from '../pages/doctor/ViewDoctor'
import UserProfile from '../pages/user/UserProfile'
import NotLoggedInPage from '../pages/user/NotLoggedPage'
import BookAppointment from '../pages/doctor/BookAppointment'
import NavProfile from '../navbar/NavProfile'
import Testesewa from '../testesewa'
import CreateBlog from '../dashboard/createBlog/CreateBlog'
import PostBlogs from '../dashboard/createBlog/PostBlogs'
import UpdateBlog from '../dashboard/createBlog/UpdateBlog'
import AddProduct from '../dashboard/product/addProduct'
import SingleProduct from '../pages/pharmacy/SingleProduct'
import Cart from '../pages/pharmacy/cart'
import CheckOut from '../pages/pharmacy/CheckOut'
// import AdminDashboard from '../dashboard/adminDashboard/AdminDashboard'
// import ViewAppointment from '../dashboard/Apppointment/ViewAppointment'
// import EditAppointment from '../dashboard/Apppointment/EditAppointment'
// import AdminDashboard from '../dashboard/adminDashboard/adminDashboard'
import ViewAppointment from '../dashboard/Appointment/ViewAppointment'
import EditAppointment from '../dashboard/Appointment/EditAppointment'
import AdminDashboard from '../dashboard/adminDashboard/AdminDashboard'
import Chats from '../pages/chat/Chats'
import AddItems from '../dashboard/AddItems/AddItems'





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

        <Route path='/cart' element={<Cart/>}/>
        <Route path='/checkout' element={<CheckOut/>}/>
        <Route path='/singleproduct/:productId' element={<SingleProduct/>}/>

        <Route path='/chat' element={<Chats/>}/>






        { /* admin dashboard */ }

        <Route path='/dashboard' element={<AdminDashboard/>}/>
        <Route path='/dashboard/adddoctor' element={<AddDoctor/>}/>
        <Route path='/dashboard/viewappointment' element={<ViewAppointment/>}/>
        <Route path='/dashboard/editappointment/:appID' element={<EditAppointment/>}/>
        <Route path='/dashboard/nav' element={<Nav/>}/>
        <Route path='/dashboard/sidenav' element={<Sidenav/>}/>
        <Route path='/dashboard/createBlog' element={<CreateBlog/>}/>
        <Route path='/dashboard/blog' element={<PostBlogs/>}/>
        <Route path='/dashboard/updateBlog/:id' element={<UpdateBlog/>}/>
        <Route path='/dashboard/addproduct' element={<AddProduct/>}/>
        <Route path='/dashboard/additems' element={<AddItems/>}/>




{/* <Route path='/dashboard' element={<Sidenav/>}>
  <Route path='adddoctor' element={<AddDoctor/>}/>
  <Route path='viewappointment' element={<ViewAppointment/>}/>
  <Route path='editappointment/:appID' element={<EditAppointment/>}/>
  <Route path='nav' element={<Nav/>}/>
  <Route path='sidenav' element={<Sidenav/>}/>
  <Route path='createBlog' element={<CreateBlog/>}/>
  <Route path='blog' element={<PostBlogs/>}/>
  <Route path='updateBlog/:id' element={<UpdateBlog/>}/>
  <Route path='addproduct' element={<AddProduct/>}/>
</Route> */}


         
    </Routes>

  )
}

export default Routers








