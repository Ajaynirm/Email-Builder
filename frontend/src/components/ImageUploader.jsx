import React, { useState } from 'react';
import axios from 'axios';

const ImageUploader = ({ onUpload }) => {
  const [image, setImage] = useState(null);
  const [selectedImg, setSelectedImg] = useState(null);

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

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();

    reader.readAsDataURL(file);

    reader.onload = async () => {
      const base64Image = reader.result;
      setSelectedImg(base64Image);
    };
  };

  return (
    <div>
      <input type="file" onChange={(e) => setSelectedImg(e.target.files[0])} />
      <button onClick={handleImageUpload}>Upload Image</button>
      <img src={selectedImg} alt="image" height={"60px"} width={"100px"}  />
    </div>
  );
};

export default ImageUploader;
