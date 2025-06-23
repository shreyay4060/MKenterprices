import React from 'react'
import {BrowserRouter as Router , Routes , Route} from "react-router-dom"
import HomePage from './pages/homePage/HomePage'
import Login from './pages/registration/Login'
import Signup from './pages/registration/Signup'
import { Toaster } from 'react-hot-toast';
import MyState from "./context/myState"
import WorkforceService from './pages/service/WorkforceService'
import About from './pages/about/About'
import Service from './pages/service/Service'
import Contact from './pages/contact/Contact'
// import Facility from './pages/service/Facility'
import Facilyty from './pages/service/Facility'
import Logistics from './pages/service/Logistics'
import Admin from './pages/service/Admin'
import ScrollTop from './components/scrollTop/ScrollTop'
import UserDashboard from './pages/user/UserDashboard'
import AdminDashboard from './pages/admin/AdminDashboard'
import WorkInfo from './pages/work/WorkInfo'
import AddWork from './pages/addWork/AddWork'
import UserWorkInfo from './pages/work/UserWorkInfo'
import UpdateUSerDetail from './components/admin/UpdateUSerDetail'


export default function App() {
  return (
    <MyState>
    <Router>
      <ScrollTop />
      <Toaster />
      <Routes>
        <Route path= "/" element={<HomePage />} />
        <Route path='/homePage' element={<HomePage />} />
        <Route path="/about" element={<About />} />
        <Route path="/service" element={<Service />} />
        <Route path="/contact" element={<Contact />} />
        
        <Route path="/login" element={<Login />} />
        <Route path = "/signup" element={<Signup />} />
        <Route path = "/workforce" element={<WorkforceService />} />
        <Route path="/facility" element={<Facilyty />} />
        <Route path = "/logistics" element={<Logistics />} />
        <Route path='/admin' element={<Admin />} />



        <Route path="/userDashboard" element={<UserDashboard />} />
        <Route path="/adminDashboard" element = {<AdminDashboard />} />

        <Route path = "/workInfo" element={<WorkInfo />} />
        <Route path="/addWork" element={<AddWork />} />

        <Route path="/work/:id" element={<UserWorkInfo />} />

        <Route path='/updateUSerDetail/:id' element={<UpdateUSerDetail />} />
      </Routes>
    </Router>
      
    </MyState>
  )
}
