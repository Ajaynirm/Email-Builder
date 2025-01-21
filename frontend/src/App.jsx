import React, { useState,useEffect } from 'react';
import EmailEditor from './components/EmailEditor';
import Preview from './components/Preview';
import ImageUploader from "./components/ImageUploader"
import {useDataStore} from '../store/useDataStore';
import './App.css';
import BootPage from './components/BootPage';
import {Toaster} from "react-hot-toast";

function App() {
  const [boot,setBoot]=useState(true);
  useEffect(() => {
    const timer = setTimeout(() => {
      setBoot(false);
    }, 3000);

   
    return () => clearTimeout(timer);
  }, []);

  


  return (
    <>
       {boot ? <BootPage /> : 
       <div className='flex flex-row sm:flex-wrap lg:flex-nowrap m-10 gap-10 h-600px justify-center '>
        <div className='h-3/4 w-3/4'>
        <Preview />
        </div>
       <div>
        <EmailEditor/>
    </div>
       </div>
    }
       <Toaster position="top-center" reverseOrder={false} />
    </>
  )
}

export default App



