import React from 'react'
import {BrowserRouter as Router , Routes , Route} from "react-router-dom"
import HomePage from './pages/homePage/HomePage'
import Login from './pages/registration/Login'
import Signup from './pages/registration/signup'
import { Toaster } from 'react-hot-toast';
import MyState from "./context/myState"
import WorkforceService from './pages/service/WorkforceService'

export default function App() {
  return (
    <MyState>
    <Router>
      <Toaster />
      <Routes>
        <Route path= "/" element={<HomePage />} />
        <Route path='/homePage' element={<HomePage />} />
        <Route path="/login" element={<Login />} />
        <Route path = "/signup" element={<Signup />} />
        <Route path = "/workforce" element={<WorkforceService />} />
        <Route path = "/facility" element={<WorkforceService />} />
      </Routes>
    </Router>
      
    </MyState>
  )
}
