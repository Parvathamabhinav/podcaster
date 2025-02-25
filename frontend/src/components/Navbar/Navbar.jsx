import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import { RxCross2 } from "react-icons/rx";
import {IoReorderThreeOutline} from "react-icons/io5";
import { useSelector } from 'react-redux';

const Navbar = () => {

  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  // console.log(isLoggedIn);


  const [MobileNav,setMobileNav]=useState(false);

  const navLinks=[
    {
      name: 'Home',
      path: '/',
    },
    {
      name: 'Categories',
      path: '/categories',
    },
    {
      name: 'All Podcasts',
      path: '/get-podcasts',
    },
    
  ];

  const closeMobileNav=()=>setMobileNav(false); 
  
  return (
    <nav className=' px-4 md:px-8 lg:px-12 py-2' >
      <div className='flex items-center justify-between'>
        <div className='logo brand-name w-2/6 flex items-center gap-4 '>
          <img 
            src="https://cdn-icons-png.flaticon.com/128/9043/9043096.png"
            alt="podcaster" 
            className='h-12'/>
          <Link to ="/" className="text-2xl font-bold">
            Podcaster
          </Link>
        </div>
        <div className=" hidden w-2/6 lg:flex items-center justify-center">
            {navLinks.map((items,i) =>(
              <Link 
              key={i} 
              to={items.path} 
              className="ms-4 hover:font-semibold transition-all duration-300">
              {items.name}
              </Link>
            ))}
        </div>
        {/*login signup*/ }
        {/*if not logged in show login & signup*/}
        {!isLoggedIn && (
          <>
             <div className=" hidden w-2/6 lg:flex items-center justify-end">
                <Link to="/signin" className='px-6 py-3 border border-black rounded-full'>Login</Link>
                <Link to="/signup" className='ms-4 px-6 py-3 bg-black text-white rounded-full'>Signup</Link>
            </div>
          </>
        )}
        {/*if logged in show profile*/ }
        {isLoggedIn && (
          <>
            <Link to="/profile" className='ms-4 px-6 py-3 bg-black text-white hidden lg:block rounded-full'>Profile</Link>
          </>
        )}
        <div className='w-4/6 flex items-center  fixed top-4 right-4 justify-end lg:hidden z-[60] '>
         <button
          className={`text-4xl ${
            MobileNav? "rotate-360 " :"rotate-180"
          } transition-all duration-300`} onClick={()=> setMobileNav(!MobileNav)}>
            {MobileNav ? <RxCross2/>: <IoReorderThreeOutline/>}
         </button>
        </div>

        {/*chatgpt */}
        {/* <div className='w-4/6 flex items-center justify-end lg:hidden z-[60] fixed top-4 right-4'>
          <button
            className={`text-4xl ${MobileNav ? "rotate-360" : "rotate-180"} transition-all duration-300`}
            onClick={() => setMobileNav(!MobileNav)}
          >
            {MobileNav ? <RxCross2 /> : <IoReorderThreeOutline />}
          </button>
        </div> */}

      </div>
      {/* mobile nav*/ }
      <div className={` fixed top-0 left-0 w-full h-screen bg-blue-100 
        ${MobileNav?"translate-y-[0%] z-50":"translate-y-[-100%] -z-10"} transition-all duration-500 ease-in-out pointer-events-${MobileNav?"auto":"none"}`}>

          
           <div className="h-full flex flex-col items-center justify-center">
               
                {navLinks.map((items,i) =>(
                <Link 
                key={i} 
                to={items.path} 
                className="mb-12 text-3xl hover:font-semibold transition-all duration-300"
                onClick={closeMobileNav}>
                  {items.name}
                </Link>
                ))}  
                {!isLoggedIn ? (
                  <>
                    <Link 
                  
                  to="/signin" 
                  className="mb-12 text-3xl hover:font-semibold transition-all duration-300"
                  onClick={closeMobileNav}>
                  Login
                </Link>
                <Link 
                  to="/signup" 
                  className="mb-12 text-3xl hover:font-semibold transition-all duration-300"
                  onClick={closeMobileNav}>
                  Signup
                </Link>
                  
                
                  </>
                ):(
                  <>
                    <Link 
                  to="/profile" 
                  className="mb-12 text-3xl hover:font-semibold transition-all duration-300"
                  onClick={closeMobileNav}>
                  Profile
                </Link>
                  </>
                )
                
                }
               
            </div>
      </div>
    </nav>
  )
}

export default Navbar
