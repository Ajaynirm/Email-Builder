import React, { useEffect, useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useDataStore } from '../../store/useDataStore';
import "./editor.css";
import { QuillDeltaToHtmlConverter } from 'quill-delta-to-html';

const EmailEditor = () => {
   const {title,content,img,currentEdit,setCurrEdit,setVariables}=useDataStore();
   const getHtmlFromDelta = (delta) => {
    const converter = new QuillDeltaToHtmlConverter(delta.ops, {});
    return converter.convert(); // Properly formatted HTML
  };

const modules = {
  toolbar: [
    [{ font: [] }], // Font family
    [{ size: ['small', false, 'large', 'huge'] }], // Font size
    [{ color: [] }, { background: [] }], // Text color and background color
    [{ align: [] }], // Text alignment
    ['bold', 'italic', 'underline', 'strike'], // Formatting options
    
    ['clean'], // Remove formatting
  ],
}

const formats = [
 'header', 
  'bold',
  'italic',
  'underline',  
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


  return (
    <div className='flex flex-col justify-start items-center gap-5 w-[500px]'>
      <h1>Email Editor</h1>
      <ReactQuill className='w-[400px]'
      theme="snow"
       placeholder=""
       modules={modules}
       formats={formats}
        value={(currentEdit==='title')?title:(currentEdit==='content')?content:img} 
        onChange={(value) => handleFieldChange(value)} 
      
      />
      <div className='flex justify-between items-center w-96'>
        <div><button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full' onClick={editTitle}>Title</button></div>
        <div><button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full' onClick={editContent}>Content</button></div>
        <div><button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full' onClick={editImage}>Image</button></div>
      </div>
    </div>
  );
};

export default EmailEditor;

