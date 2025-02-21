import React, { useEffect, useState } from 'react'
import axios from 'axios'
import PodcastCard from "../components/PodcastCard/PodcastCard"
const Allpodcasts = () => {
    const [podcasts,setPodcasts]=useState();
    useEffect(()=>{
        const fetchPodcasts = async()=>{
            const response = await axios.get('http://localhost:1000/api/v1/get-podcasts');
            setPodcasts(response.data.data);
        }
        fetchPodcasts();
    },[])
    // console.log(podcasts );
  return (
    <div>
      <div className='w-full px-4 lg:px-12 py-4 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4'>
          {podcasts && podcasts.map((items,i)=>
          <div key={i}>
            <PodcastCard items={items}/>{" "}
          </div>
          )}
      </div>
    </div>
  )
}

export default Allpodcasts
