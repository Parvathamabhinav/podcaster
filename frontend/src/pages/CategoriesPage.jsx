import React from 'react'
import { useParams } from 'react-router-dom'
import { useState,useEffect } from 'react';
import axios from 'axios';
import PodcastCard from '../components/PodcastCard/PodcastCard';
const CategoriesPage = () => {
  const {cat} =useParams();
  const [podcasts,setPodcasts]=useState();
  useEffect(()=>{
      const fetchPodcasts = async()=>{
          const response = await axios.get(`http://localhost:1000/api/v1/category/${cat}`,
            {withCredentials:true},
          );
          setPodcasts(response.data.data);
      }
      fetchPodcasts();
  },[])
  return (
    
    <div className='px-4 py-4 lg:px-12'>
      <h1 className='text-xl font-semibold'>
        {cat}
      </h1>
      <div className='w-full px-4 lg:px-12 py-4 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4'>
          {podcasts && podcasts.map((items,i)=>
          <div key={i}>
            <PodcastCard items={items}/>{" "}
          </div>
          )}
          {podcasts && podcasts.length==0 &&(
            <div className='text-3xl font-semibold h-screen w-[100%] flex items-center justify-center'>
                {" "}
                No podcasts right now{" "}
            </div>
          )}
      </div>
    </div>
  )
}

export default CategoriesPage
