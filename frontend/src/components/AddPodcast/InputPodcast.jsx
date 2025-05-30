import React, { useState } from 'react'
import axios from 'axios'
import {toast,ToastContainer} from "react-toastify"
const InputPodcast = () => {
  const [frontImage,setFrontImage]=useState(null);
  const [audioFile,setAudioFile]=useState(null);
  const [Dragging,setDragging]=useState(false);
  const [formdata,setFormData]=useState({title:"",description:"",category:""});
  const handleChangeImage=(e)=>{
    const image=e.target.files[0];
    setFrontImage(image);
    // console.log(image);
  }
  const handleDragEnter=(e)=>{
    e.preventDefault();
    setDragging(true);
    // console.log(Dragging);
  }
  const handleDragLeave = (e)=>{
    e.preventDefault();
    setDragging(false);
    // console.log(Dragging);
  }
  const handleDragOver=(e)=>{
    e.preventDefault();
  }
  const handleDropImage=(e)=>{
    console.log("dropped")
    e.preventDefault();
    setDragging(false);
    const file=e.dataTransfer.files[0];
    setFrontImage(file);
  }
  const handleChangeAudio=(e)=>{
    e.preventDefault();
    const file=e.target.files[0];
    setAudioFile(file);
    // console.log(file);
  }
  const onChangeInputs =(e)=>{
    const {name,value}=e.target;
    setFormData({...formdata,[name]:value});
    // console.log(formdata);
  }

  const handleSubmit=async()=>{
    console.log(formdata,frontImage,audioFile);
    
    const data=new FormData();
    data.append("title",formdata.title);
    data.append("description",formdata.description);
    data.append("category",formdata.category);
    data.append("frontImage",frontImage);
    data.append("audioFile",audioFile);
    
    try{
      const res=await axios.post("http://localhost:1000/api/v1/add-podcast",data,
        {
          headers: {
            'Content-Type':'multipart/form-data'
          },
          withCredentials:true,
        }
      );
      console.log(res);
      toast.success(res.data.message);
    }catch(error){
      toast.error(error);
    }
    finally{
      setFrontImage(null);
      setAudioFile(null);
      setFormData({title:"",description:"",category:""});
    }
  };  
 
  return (
    <div className='my-4 px-4 lg:px-12'>
      <ToastContainer/>
      <h1 className='text-2xl font-semibold'>Create Your podcast</h1>
      <div className='mt-5 flex flex-col lg:flex-row items-center justify-between gap-4'>
        <div className='w-full lg:w-2/6 flex items-center justify-center lg:justify-start'>
          <div className='size-[20vh] lg:size-[60vh]  flex items-center justify-center hover:bg-slate-50 transition-all duration-300' 
          style={{border: "1px dashed black"}}
          onDragEnter={handleDragEnter} 
          onDragLeave={handleDragLeave}
          onDragOver={handleDragOver}
          onDrop={handleDropImage}>
            <input 
            type="file" 
            accept="image/*" 
            id="file" 
            name="frontImage" 
            className="hidden" 
            onChange={handleChangeImage}/>
            {frontImage ? (<img src={URL.createObjectURL(frontImage)} alt='thumbnail' className='h-[100%] w-[100%]' />):
            (
              <label htmlFor="file" 
              className={`text-xl p-4 font-semibold h-[100%] w-[100%] hover:cursor-pointer flex items-center justify-center ${Dragging? "bg-blue-200": ""}`} 
             >
              <div className='text-center'>
                Drag and drop the thumbnail or Click to browse
              </div>
              </label>
            )}
            
          </div> 
         
        </div>
        <div className='w-full lg:w-4/6'>
            <div className='flex flex-col'>
              <label htmlFor="title">Title</label>
              <input 
              type="text"
              id="title"
              name="title"
              placeholder='Title for your podcast'
               className='mt-4 px-4 py-2 outline-none border border-zinc-800 rounded'
               value={formdata.title}
               onChange={onChangeInputs}/>
            </div>
            <div className='flex flex-col mt-4'>
              <label htmlFor="title">Description</label>
              <textarea 
              type="text"
              id="description"
              name="description"
              placeholder='Description for your podcast'
               className='mt-4 px-4 py-2 outline-none border border-zinc-800 rounded' rows={4}
               value={formdata.description}
               onChange={onChangeInputs}/>
            </div>
            <div className='flex  mt-4'>
                <div className='flex flex-col w-2/6'>
                <label htmlFor="audiofile">Select audio</label>
                <input 
                type="file"
                accept='.mp3,.wav,.m4a,.ogg'
                id="audiofile"
                className='mt-4'
                onChange={handleChangeAudio}/>
                </div>

                <div className='flex flex-col w-4/6'>
                    <label htmlFor="category">Select Category</label>
                    <select name="category" id="category" className='border border-zinc-900 rounded mt-4 px-4 py-2'
                     value={formdata.category}
                     onChange={onChangeInputs}>
                      <option value="">Select Category</option>
                      <option value="Comedy">Comedy</option>
                      <option value="Government">Government</option>
                      <option value="Business">Business</option>
                      <option value="Drama">Drama</option>
                    </select>
                </div>
              
            
            </div>
            <div className='mt-8 lg:mt-6 flex'>
              <button className='bg-zinc-900 w-full text-white rounded px-8 py-2 font-semibold hover:zinc-800 tansition-all duration-800' onClick={handleSubmit}>
                Create Podcast
              </button>
            </div>
        </div>
       
      </div>
    </div>
    
  )
};

export default InputPodcast
