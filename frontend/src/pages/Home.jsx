import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

const Home = () => {
  const navigate=useNavigate();
  const isLoggedIn=useSelector((state)=>state.auth.isLoggedIn)
  const handleLogin=() =>{
    // handle login logic
    
  }
  return (
    <div className='bg-green-100 px-12 h-fixed lg: h-[90vh] flex flex-col items-center  justify-center'>
      <div className="w-full flex items-center justify-between gap-4 ">
        <div className=" w-full lg:w-5/6">
          
          <h1 className="text-4xl md:text-6xl lg:text-8xl font-bold">Create & listen the <br/>
            <h1 className='flex items-end justify-center lg:justify-start mt-2 lg:mt-0'>
              p 
            <span>
              <img 
              src="https://cdn-icons-png.flaticon.com/128/2113/2113324.png" 
              alt="headphone"
              className='h-8 md:h-12 lg:h-20 lg:mx-2' />
            </span>dcast
              </h1>
          </h1>
        </div>
        {/* <div className="hidden lg:block w-1/6">
          <div className='py-6 border border-black font-semibold -rotate-90 text-center  rounded-full'>
              Scroll Down
          </div>
        </div> */}
      </div>
      <div className='mt-12 w-full flex flex-col lg:flex-col lg:items-start items-center justify-between'>
        <div className='flex  flex-col items-center lg:items-start'>
          <p className='text-xl font-semibold text-center lg:text-end'>
          Listen to the most popular podcasts on just one platform -<b> PODCASTER</b>
          </p>
          {!isLoggedIn && (
        <button
          className="mt-4 px-6 py-2 bg-black  text-white rounded-lg hover:bg-blue-600 transition-all duration-300"
          onClick={() => navigate('/signin')}
        >
          Login to Listen
        </button>
      )}
          
        </div>
        <div className='mt-6 lg:mt-8 lg:mt-0'>
          <p className='text-zinc-700 font-bold text-center lg:text-end'>
            Our app contains more than 2000 podcasts for you
          </p>
        </div>
      </div>
    </div>
  )
}

export default Home
