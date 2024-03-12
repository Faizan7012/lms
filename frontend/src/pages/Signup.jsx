import React, { useState } from 'react'
import '../css/form.css'
import axios from 'axios'
import leaf1 from '../assets/leaf_01.png'
import leaf2 from '../assets/leaf_02.png'
import leaf3 from '../assets/leaf_03.png'
import leaf4 from '../assets/leaf_04.png'
import bg from '../assets/bg.jpg'
import girl from '../assets/girl.png'
import trees from '../assets/trees.png'
import { Link, useNavigate } from 'react-router-dom';
import {useToast} from '@chakra-ui/react';
const initInfo = {
    name : '',
    email:'',
    password:'',
    role :''
}
const Signup = () => {
const [userInfo , setUserInfo] = useState(initInfo);
const [loading , setLoading] = useState(false);
const toast = useToast();
const navigate = useNavigate()
const handleChange = (e)=>{
    const {name , value} = e.target;
    setUserInfo({...userInfo , [name]:value})
}

const handleSubmit = async(e)=>{
    e.preventDefault();
    setLoading(true);
   try {
    let regDetails = await axios.post('https://magnificent-bat-sandals.cyclic.app/user/signup' , userInfo);
    let data = await regDetails.data;
    if(data.status){
        setLoading(false);
        setUserInfo(initInfo)
        toast(
            {
              title: 'Register Success',
              status: 'success',
              duration: 2000,
              position: "top",
              isClosable: true,
            }
          )
        navigate('/login')
    }
    else{
        toast(
            {
              title: data.message,
              status: 'error',
              duration: 2000,
              position: "top",
              isClosable: true,
            }
          )
        setLoading(false)
    }
   } catch (error) {
    toast(
        {
          title: error.message,
          status: 'error',
          duration: 2000,
          position: "top",
          isClosable: true,
        }
      )
    setLoading(false)
   }
    
}

  return (
    <section>
    <div className="leaves">
        <div className="set">
            <div><img src={leaf1} /></div>
            <div><img src={leaf2} /></div>
            <div><img src={leaf3} /></div>
            <div><img src={leaf4} /></div>
            <div><img src={leaf1} /></div>
            <div><img src={leaf2} /></div>
            <div><img src={leaf3} /></div>
            <div><img src={leaf4} /></div>
        </div>
    </div>
    <img src={bg} className="bg" />
    <img src={girl} className="girl" />
    <img src={trees} className="trees" />
    <div className="login">
        <h2>Sign Up</h2>
        <form onSubmit={handleSubmit}>
        <div className="inputBox">
            <input onChange={(e)=>handleChange(e)} required value={userInfo.name} name='name' type="text" placeholder="Username" />
        </div>
        <div className="inputBox">
            <input onChange={(e)=>handleChange(e)} required value={userInfo.email} name='email' type="email" placeholder="Email" />
        </div>
        <div className="inputBox">
            <input onChange={(e)=>handleChange(e)} required value={userInfo.password} name='password' type="password" placeholder="Password" />
        </div>
        <select onChange={(e)=>handleChange(e)} required type="text" placeholder="User Role" className="inputBox" value={userInfo.role} name='role'>
            <option value="">Select Role</option>
           <option value="user">User</option>
           <option value="admin">Admin</option>
        </select>
        <div className="inputBox">
            <input type="submit" value={loading ? "Registering....":"Register"} id="btn" />
        </div>
        <div className="group">
            <a href="#">Forget Password</a>
            <Link to='/login'>Login</Link>
        </div>
        </form>
    </div>
    
</section>
  )
}

export default Signup
