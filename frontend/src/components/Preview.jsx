import React, { useEffect, useRef, useState } from 'react';
import { useDataStore } from '../../store/useDataStore';
import DOMPurify from 'dompurify';

const Preview = () => {
  const htmlRef=useRef(null);
  const handleDownload = ()=>{
    if(htmlRef.current){
      const innerHtml = htmlRef.current.innerHTML;
      const blob = new Blob([innerHtml], { type: 'text/html' });

      const url = URL.createObjectURL(blob);

      const a = document.createElement('a');
      a.href = url;
      a.download = 'downloaded_Email-Template.html';
      document.body.appendChild(a);
      a.click();

      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    }
  }
  const {
    htmlLayout,
    title,content,img,postObject
  } = useDataStore();
  const [html, setHtml] = useState('');
  const postHtmlObject =(e)=>{
    e.preventDefault();
    postObject();
  }
  useEffect(() => {
    if (htmlLayout) {
      // Parse the HTML into a DOM tree
      const parser = new DOMParser();
      const doc = parser.parseFromString(htmlLayout, 'text/html');

      // Dynamically update the HTML with variable values
      const updateHtmlContent = (id, value) => {
        const element = doc.getElementById(id);
        if (element) element.innerHTML = value;
      };

        updateHtmlContent('title', title);
     
        updateHtmlContent('content',content);
      
      const imageElement = doc.querySelector('img');
      if (imageElement) {
        imageElement.src = img;
      }

      setHtml(doc.body.innerHTML);
    }
  }, [title,content]);


  return (
    <>
    
    <div className="flex flex-col  flex-wrap justify-center items-center p-2 border-double border-4 border-yellow-600">
      <h2 className="p-2">Preview</h2>
      {(htmlLayout) ? (
        <div>
        <div className='border-double border-4 border-indigo-600  max-w-full'
        ref={htmlRef}
        dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(html) }}
        contentEditable
        
      />
      <div className='flex justify-around p-2'>
        <button onClick={handleDownload} className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full'>Download</button>
        <button onClick={postHtmlObject} className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full'>Post current values</button>
      </div>
      </div>
      
      ):(
        <div>Error while getting HTML template from backend</div>
      )
    }
      
      
    </div>
    </>
  );
};

export default Preview;

