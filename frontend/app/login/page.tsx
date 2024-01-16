"use client"
import React, { useState, ChangeEvent, FormEvent } from 'react';
import { uploadImage } from '../services/services';

const Page: React.FC = () => {
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
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <form onSubmit={handleFormSubmit}>
      <label htmlFor="image">Choose an image:</label>
      <input
        type="file"
        id="image"
        name="image"
        accept="image/*"
        onChange={handleImageChange}
      />
      <button type="submit">Upload</button>
    </form>
  );
};

export default Page;
