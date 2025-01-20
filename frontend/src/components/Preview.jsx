import React, { useEffect, useState } from 'react';
import { useDataStore } from '../../store/useDataStore';
import DOMPurify from 'dompurify';

const Preview = () => {
  const {
    htmlLayout,
    title,content,img
  } = useDataStore();
  const [html, setHtml] = useState('');
  
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
    
    <div className="flex flex-col justify-center items-center p-2 border-double border-4 border-yellow-600">
      <h2 className="p-2">Preview</h2>
      <div className='border-double border-4 border-indigo-600  w-[800px]'
    
        dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(html) }}
      />
      
    </div>
    </>
  );
};

export default Preview;
