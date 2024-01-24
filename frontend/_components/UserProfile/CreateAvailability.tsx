"use client";
import {useState, useEffect} from 'react';
import { authStatus } from '@/app/services/services';
import { createAvailability } from '@/app/services/actions';
import { useParams } from 'next/navigation';
type Props = {}

function CreateAvailability({}: Props) {
  const {id} = useParams();
  const [isUser, setIsUser] = useState<boolean>(false)

  useEffect(() => {
    const getAuth = async () => {
      const {userId} = await authStatus();
      if (userId === id){
        setIsUser(true);
      }
    }
    getAuth();
  },[])



  return (
    <>
    {isUser && (
      <div>
        <input type="text" />
        <input type="text" />
        <button onClick={() => createAvailability()}>createAvailability</button> 
      </div>
    )}
    </>
  )
}

export default CreateAvailability