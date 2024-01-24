'use client';
import {useEffect, useState} from 'react';
import { updateAvailability } from '@/app/services/actions';
import { authStatus } from '@/app/services/services';
import { useParams } from 'next/navigation';
type Props = {}

function UpdateAvailability({}: Props) {
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
        <button onClick={() => updateAvailability()}>updateAvailability</button> 
      </div>
    )}
  </>
  )
}

export default UpdateAvailability