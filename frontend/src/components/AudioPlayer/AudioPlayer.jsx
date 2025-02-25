import React, { useRef, useState } from 'react'
import { CgPlayBackwards,CgPlayForwards, } from "react-icons/cg";
import { FaPause } from "react-icons/fa6";
import { RxCross2 } from "react-icons/rx";
import { useDispatch,useSelector }from "react-redux"
import { playerActions } from '../../store/player';
import { FaPlay } from "react-icons/fa";
import { useEffect } from 'react';
const AudioPlayer = () => {
  const [isSongPlaying,setisSongPlaying]=useState();
  const [currentTime,setCurrentTime]=useState()
  const [duration,setDuration]=useState(0);
  const dispatch=useDispatch();
  const playerDivState=useSelector((state) => state.player.isPlayerDiv);
  const songPath=useSelector((state) => state.player.songPath);
  const img=useSelector((state) => state.player.img);
  // const playerDivState=useSelector((state) => state.player.isPlayerDiv);
 
 
 
   const audioref=useRef();
   const formatTime=(time)=>{
    const minutes=Math.floor(time/60);
    const seconds=Math.floor(time%60);
    return `${minutes}:${seconds<10?`0${seconds}`:seconds}`;
   }
 
 
  const closeAudioPlayerDiv=(e)=>{
          e.preventDefault();
          dispatch(playerActions.closeDiv());
          if(isSongPlaying) {
            audioref.current.pause();
          }
          dispatch(playerActions.changeSong(""));
          dispatch(playerActions.changeImage(""));
          
      }
      const handlePlayPodcast=(e)=>{
        setisSongPlaying(!isSongPlaying);
        if(isSongPlaying) {
          audioref.current.pause();
        }else{
          audioref.current.play();
        }
      }
      const handleTimeUpdate = (e)=>{
        if(audioref.current){
          setCurrentTime(audioref.current.currentTime);
       
        }
      }
      const handleLoadedMetadata = (e)=>{
        if(audioref.current){
          setDuration(audioref.current.duration);
          
        }
      }
      const backward=()=>{
        if(audioref.current){
          let newTime=Math.max(currentTime-10,0);
          audioref.current.currentTime=newTime;
          setCurrentTime(newTime);
        }
      }
      const forward=()=>{
        if(audioref.current){
          let newTime=Math.max(currentTime+10,duration);
          audioref.current.currentTime=newTime;
          setCurrentTime(newTime);
        }
      }
      const handleSeek=(e)=>{
        if(audioref.current){
          let newTime=(e.target.value/100)*duration;
          audioref.current.currentTime=newTime;
          setCurrentTime(newTime);
        }


      }


  useEffect(()=>{
    if (songPath) { // Ensure songPath is valid before playing
      setisSongPlaying(true);
      audioref.current?.play();
    }
    const currentAudio=audioref.current;
    if(currentAudio){
      currentAudio.addEventListener("timeupdate",handleTimeUpdate);
      currentAudio.addEventListener("loadedmetadata",handleLoadedMetadata);
    }

    return () => {
      if (currentAudio) {
        currentAudio.removeEventListener("timeupdate", handleTimeUpdate);
        currentAudio.removeEventListener("loadedmetadata", handleLoadedMetadata);
      }
    };
  },[songPath])
  return (
    <div className={`${playerDivState?"fixed":"hidden"} h-[15vh] bottom-0 left-0 w-[100%] flex items-center gap-4 bg-zinc-900 text-zinc-300 px-4 rounded`}>
      <div className='hidden md:block w-1/3'>
        <img 
        src={img}
         alt="" 
         className={`size-12 rounded-full object-cover`}/>
      </div>
      <div className='w-full md:w-1/3 flex flex-col items-center justify-center'>
        <div className='w-full flex items-center justify-center gap-4 text-xl'>
            <button onClick={backward}><CgPlayBackwards /></button>
            <button onClick={handlePlayPodcast}>
              {isSongPlaying ?<FaPause />:<FaPlay />}
             </button>
            <button onClick={forward}><CgPlayForwards /></button>
        </div>
        <div className='w-full flex items-center justify-center mt-3 '>
          <input 
          type="range"
          min="0"
          max="100"
          value={(currentTime/duration)*100||0}
          className='w-full hover:cursor-pointer'
          onChange={handleSeek}/>

        </div>

        <div className='w-full flex items-center justify-between text-sm'>
          <span>{formatTime(currentTime)}</span>
          <span>{formatTime(duration)}</span>

        </div>

      </div>

      <div className='w-1/3 flex items-center justify-end'>
        <button onClick={closeAudioPlayerDiv}>
        <RxCross2 />
        </button>
      </div>

      <audio src={songPath} ref={audioref}/>


    </div>
  );
}

export default AudioPlayer