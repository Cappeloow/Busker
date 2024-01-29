'use client';
import React, { useEffect, useState } from 'react';
import { FaEdit } from 'react-icons/fa';
import { updateUserDetails } from '@/app/services/actions';
import { IUserDetails } from '@/app/types';


type UserDetailsFormProps = {
  user: IUserDetails;
};

const EditUserDetailsComponent: React.FC<UserDetailsFormProps> = ({ user }) => {
  const [formData, setFormData] = useState<IUserDetails>(user);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateUserDetails(formData);
    setIsOpen(false);
  };
  
  return (
    <>
    <FaEdit  style={{fontSize:'25px', marginLeft:'10px'}} onClick={() => setIsOpen(true)}/>
      {isOpen && <form onSubmit={handleSubmit}>
        <label>
          Artist Name:
          <input
            type="text"
            name="artistName"
            value={formData.artistName}
            onChange={handleInputChange}
          />
        </label>
        <br />
        <label>
          Country:
          <input
            type="text"
            name="country"
            value={formData.country}
            onChange={handleInputChange}
          />
        </label>
        <br />
        <label>
          City:
          <input
            type="text"
            name="city"
            value={formData.city}
            onChange={handleInputChange}
          />
        </label>
        <br />
        <button type="submit">Update Details</button>
      </form>}
    </>
  );
};

export default EditUserDetailsComponent;
