import React, { useState } from 'react';
import axios from 'axios';
import { useDataStore } from '../../store/useDataStore';
import toast from 'react-hot-toast';

const ImageUploader = ({ onUpload }) => {
  const [selectedImg, setSelectedImg] = useState(null);
  const {setImage}=useDataStore();

  // Due to time constraints Iam not working on it right now.
  const handleUpload = async () => {
    const formData = new FormData();
    formData.append('image', image);

    try {
      const response = await axios.post('/api/emails/uploadImage', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      onUpload(response.data.imageUrl); 
    } catch (error) {
      console.error('Error uploading image:', error);
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    //setImage(file); // file for uploading

    const reader = new FileReader();
    reader.onload = () => {
      setSelectedImg(reader.result); 
      setImage(reader.result);
    };
    reader.readAsDataURL(file);
    toast.success("Image Inserted Successfully");
  };

  return (
    <div className='flex justify-center items-center'>
        <div className="file-input-wrapper relative inline-block">
      
      <input
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
      />
      <button
        type="button"
        className="btn btn-warning px-4 py-2"
      >
        Insert Image
      </button>
    </div>
     
    </div>

  );
};

export default ImageUploader;


