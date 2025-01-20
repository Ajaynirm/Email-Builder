import React, { useState,useEffect } from 'react';
import EmailEditor from './components/EmailEditor';
import Preview from './components/Preview';
import ImageUploader from './components/ImageUploader';
import {useDataStore} from '../store/useDataStore'
import './App.css'

function App() {
  const {getHtmlLayout}=useDataStore();
  const {loading}=useDataStore()
  useEffect(() => {
    getHtmlLayout();
  }, []);

  if(loading){
    return <div> Loading</div>
  }

  return (
    <>
      
       <div className='flex flex-row m-10 gap-10 h-600px justify-center '>
        <div className='h-3/4 w-3/4'>
        <Preview />
        </div>
       
       <div><EmailEditor/>
      {/* <ImageUploader /> */}
      
    </div>
       </div>
       
    </>
  )
}

export default App



