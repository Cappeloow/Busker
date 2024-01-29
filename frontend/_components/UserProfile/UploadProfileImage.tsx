"use client"
import React, { useState, ChangeEvent, FormEvent } from 'react';
import { uploadImage } from '@/app/services/actions';
import { RiFolderUploadFill } from "react-icons/ri";
type Props = {}

const UploadProfileImage = (props: Props) => {
  const [selectedImage, setSelectedImage] = useState<File | null>(null);

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setSelectedImage(file);
  };

  const handleFormSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!selectedImage) {
      console.error('No image selected');
      return;
    }

    try {
      const formData = new FormData();
      formData.append('profileImage', selectedImage);

      
      await uploadImage(formData);
      window.location.reload();
    } catch (error) {
        console.error('Error:', error);
    }
  };

  return (
    <form onSubmit={handleFormSubmit} className='image_uploader_form'>
      <input
        type="file"
        id="image"
        name="image"
        accept="image/*"
        onChange={handleImageChange}
      />
      <button type="submit"><RiFolderUploadFill/></button>
    </form>
  );
}

export default UploadProfileImage