import React, { useState } from 'react';
import axios from 'axios';
import { useDataStore } from '../../store/useDataStore';

const ImageUploader = ({ onUpload }) => {
  // const [image, setImage] = useState(null);
  const [selectedImg, setSelectedImg] = useState(null);
  const {setImage}=useDataStore();

  const handleUpload = async () => {
    const formData = new FormData();
    formData.append('image', image);

    try {
      const response = await axios.post('/api/emails/uploadImage', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      onUpload(response.data.imageUrl); // Return the URL of the uploaded image
    } catch (error) {
      console.error('Error uploading image:', error);
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    console.log(file); 
    //setImage(file); // Set the file for uploading

    const reader = new FileReader();
    reader.onload = () => {
      setSelectedImg(reader.result); // Convert file to base64 for preview
      setImage(reader.result);
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className='flex justify-center items-center'>
        <div className="file-input-wrapper relative inline-block">
      {/* Hidden Input */}
      <input
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
      />

      {/* Custom Button or UI */}
      <button
        type="button"
        className="px-4 py-2 bg-blue-500 text-white font-medium rounded hover:bg-blue-600"
      >
        Upload Image
      </button>
    </div>
     
    </div>

  );
};

export default ImageUploader;


