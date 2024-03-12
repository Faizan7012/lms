import React, { useContext } from 'react'
import {Routes , Route} from 'react-router-dom'
import Signup from '../pages/Signup'
import Login from '../pages/Login'
import { AuthContext } from '../context/user'
import AdminDashboard from '../pages/AdminDashboard'
import UserDashboard from '../pages/UserDashboard'
import Profile from '../pages/Profile'
import PrivateRoute from '../pages/PrivateRoute'
import AllCourse from '../pages/AllCourse'
import Lecture from '../pages/Lecture'
import AllStudent from '../pages/AllStudent'

const AllRoutes = () => {
    const {user} = useContext(AuthContext)
    const {role} = user;
  return (
    <Routes>
    <Route path="/" element={role === 'admin' ? <PrivateRoute><AdminDashboard /></PrivateRoute> : <PrivateRoute><UserDashboard /></PrivateRoute>} />
    <Route path="/signup" element={<Signup />} />
    <Route path="/login" element={<Login />} />
    <Route path="/profile" element={<PrivateRoute><Profile /></PrivateRoute>} />
    <Route path="/allcourses" element={<PrivateRoute><AllCourse /></PrivateRoute>} />
    <Route path="/profile" element={<PrivateRoute><Profile /></PrivateRoute>} />
    <Route path="/course/:id" element={<PrivateRoute><Lecture /></PrivateRoute>} />
    <Route path="/allstudents" element={<PrivateRoute><AllStudent /></PrivateRoute>} />
  
  </Routes>
  )
}

export default AllRoutes
