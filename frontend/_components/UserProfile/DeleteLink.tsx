"use client";
import { deleteLink } from '@/app/services/actions';
import {useState, useEffect} from 'react';
import React from 'react'

type Props = {
    id:string;
}

function DeleteLink({ id }: Props) {
    const handleDelete = async () => {
      try {
        await deleteLink(id);
        console.log(`Link with id ${id} deleted successfully`);
      } catch (error) {
        console.error('Error deleting link:', error);
      }
    };
  
    return (
      <div>
        <button onClick={handleDelete}>Delete</button>
      </div>
    );
  }
  

export default DeleteLink