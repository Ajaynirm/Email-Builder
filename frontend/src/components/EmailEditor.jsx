import React, { useEffect, useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useDataStore } from '../../store/useDataStore';
import "./editor.css";
import toast,{Toaster} from "react-hot-toast";
import ImageUploader from './ImageUploader';

const EmailEditor = () => {
   const {title,content,img,currentEdit,setCurrEdit,setVariables,setImage,getHtmlLayout}=useDataStore();
  
   useEffect(() => {
    toast.promise(getHtmlLayout(),{
      loading: "Html Layout Fetching...",
      success: "Html Fetched successfully!",
      error: "Layout Fetching Failed. Refresh the page.",
    })
    
  }, []);

const modules = {
  toolbar: [
    
    [{ header: [1, 2, 3, false] }], 
    [{ font: ['serif', 'monospace'] }], 
    [{ color: ["#ff0000", "#00ff00", "#0000ff", "#ff9900", "#ffffff", "#000000"] },
     { background: ["#ffff00", "#ff0000", "#00ff00", "#0000ff","white","black","pink","violet"] }], 
    ["bold", "italic", "underline"],
    [{ list: "ordered" }, { list: "bullet" }],
    ["clean"], 
  ],
  
}

const formats = [
  
  'header', // Font size
  'font', // Font family
  'color', // Text color
  'background', // Background color
  'align', // Text alignment
  'bold',
  'italic',
  'underline',
  'strike',
  'clean',
]

const handleFieldChange = (value) => {   
  setVariables(value);
};


const editTitle =()=>{
  setCurrEdit('title')
}
const editContent =()=>{
 setCurrEdit('content')
}
const editImage =()=>{
 setCurrEdit('img')
}

const updateImage =(e)=>{
  const file = e.target.files[0];
  if (!file) return;
  const reader = new FileReader();
  reader.readAsDataURL(file);

  reader.onload = async () => {
    const base64Image = reader.result;
    console.log(base64Image)
    setImage(base64Image);
  };
}


  return (
    <div className='flex flex-col justify-start items-center gap-5 w-[500px]'>
      <Toaster />
      <h1>Email Editor</h1>
      <ReactQuill className='w-[400px]'
      theme="snow"
       placeholder=""
       modules={modules}
       formats={formats}
        value={(currentEdit==='title')?title:(currentEdit==='content')?content:img} 
        onChange={(value) => handleFieldChange(value)} 
      
      />
      <div className='pt-5 font-serif animate-pulse'>Click Below to Edit</div>
      <div className='flex justify-between items-center w-96 pt-5'>
        <div><button className='btn btn-neutral  text-white font-bold py-2 px-4' onClick={editTitle}>Title</button></div>
        <div><button className='btn btn-neutral  font-bold py-2 px-4 ' onClick={editContent}>Content</button></div>
        <div>
          <ImageUploader />
        </div>
      </div>
     
    </div>
  );
};

export default EmailEditor;

