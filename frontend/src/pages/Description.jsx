import React from 'react'
import { useParams } from 'react-router-dom'
import { useState,useEffect } from 'react';
import axios from 'axios';

const Description = () => {
  const [podcasts,setPodcasts]=useState();
  const {id}=useParams();
  useEffect(()=>{
      const fetchPodcasts = async()=>{
          const response = await axios.get(`http://localhost:1000/api/v1/get-podcast/${id}`,
            {withCredentials:true},
          );
          setPodcasts(response.data.data);
      }
      fetchPodcasts();
  },[])

    return (
    <div className='px-4 lg:px-12 py-4  flex flex-col md:flex-row flex-wrap items-start justify-between gap-4'>
      {podcasts && 
      <>
        <div className='w-full  lg:w-2/6 flex items-center justify-center md:justify-start md:items-start'>
            <img 
            src={`http://localhost:1000/${podcasts.frontImage}`} 
            alt="No pic" 
            className='rounded  w-full  object-cover'/>
        </div>
        <div className="w-full h-auto lg:w-4/6">
            <div className='text-4xl font-semibold'>
                {podcasts.title}
            </div>
            <h4 className='mt-2'>{podcasts.description}</h4>
            <div className='mt-2  w-fit bg-orange-100 text-orange-700 border border-orange-700 
        rounded-full px-4 py-2 text-center'>
            {podcasts.category.categoryName}
        </div>
        </div>
      </>}
    </div>
  )
}

export default Description
