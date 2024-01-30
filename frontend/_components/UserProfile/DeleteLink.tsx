"use client";
import { deleteLink } from '@/app/services/actions';
import {useState, useEffect} from 'react';
import React from 'react'
import { useRouter } from 'next/navigation';
import { MdDelete } from "react-icons/md";

type Props = {
    id:string;
}

function DeleteLink({ id }: Props) {
  const router = useRouter();
    const handleDelete = async () => {
      try {
        await deleteLink(id).then(() => {
          router.refresh();
        });
      } catch (error) {
        console.error('Error deleting link:', error);
      }
    };
  
    return (
      <>
        <MdDelete className="delete_link_btn" onClick={handleDelete}/>
      </>
    );
  }
  

export default DeleteLink