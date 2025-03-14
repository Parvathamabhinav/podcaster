import React, { useState } from 'react'
import { useEffect } from 'react'
import axios from 'axios'
import { useDispatch } from 'react-redux';
import {useNavigate} from "react-router-dom";
import {authActions} from "../../store/auth"
const Header = () => {
    const navigate=useNavigate()
    const [userdata,setUserdata]=useState();
    const dispatch=useDispatch();
    useEffect(()=>{
        const fetchUserDetails = async()=>{
            const response=await axios.get('http://localhost:1000/api/v1/user-details',{withCredentials:true});
            setUserdata(response.data.user);
        };
        fetchUserDetails();
    },[]);
const LogoutHandler=async()=>{
    const res=await axios.post('http://localhost:1000/api/v1/logout',{withCredentials:true});
    // setUserdata(null);
    // console.log(res);
    dispatch(authActions.logout());
    navigate("/");
  };

  return (
    <>
     {userdata && (
        <div className='bg-green-900 py-8 flex flex-col md:flex-row items-center justify-center gap-4 md:justify-between px-4 lg:px-12'>
        <div className='flex flex-col items-center md:items-start'>
          <p className='text-zinc-300'>
              Profile
          </p>
          <h1 className='text-3xl md:text-4xl lg:text-5xl text-zinc-100 font-bold text-center'>
             {userdata.username}
          </h1>
          <p className='text-zinc-300 mt-1'>{userdata.email}</p>
        </div>
        <div>
          <button className='bg-white px-4 rounded text-zinc-800 font-semibold hover:shadow hover:shadow-xl transition-all duration-300' onClick={LogoutHandler}>Logout</button>
        </div>
      </div>
     )}
    </>
   
  )
}


export default Header
