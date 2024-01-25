'use client';
import {useEffect, useState} from 'react';
import { updateAvailability } from '@/app/services/actions';
import { authStatus } from '@/app/services/services';
import { useParams } from 'next/navigation';
import { IAvailability } from '@/app/types';
type Props = {
  availabilityId:string,
  date:string,
}

function UpdateAvailability({availabilityId, date}: Props) {
  //auth
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


  //update the availability
  // handle data

 // handle data 
 const [availabilityData, setAvailabilityData] = useState<IAvailability>({
  availabilityId,
  date,
  description: '',
  location:'',
  bookingTime:'',
  status:'',
});


  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    await updateAvailability(availabilityData);
  };




  return (
    <>
    {isUser && (
      <div>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="DATE"
            name="date"
            value={availabilityData.date}
            onChange={(e) => setAvailabilityData({ ...availabilityData, date: e.target.value })}
          />
          <input
            type="text"
            placeholder="status"
            name="status"
            value={availabilityData.status}
            onChange={(e) => setAvailabilityData({ ...availabilityData, status: e.target.value })}
          />
           <input
            type="text"
            placeholder="bookingTime"
            name="bookingTime"
            value={availabilityData.bookingTime}
            onChange={(e) => setAvailabilityData({ ...availabilityData, bookingTime: e.target.value })}
          />
           <input
            type="text"
            placeholder="location"
            name="location"
            value={availabilityData.location}
            onChange={(e) => setAvailabilityData({ ...availabilityData, location: e.target.value })}
          />
           <input
            type="text"
            placeholder="description"
            name="description"
            value={availabilityData.description}
            onChange={(e) => setAvailabilityData({ ...availabilityData, description: e.target.value })}
          />
          <button type="submit">Send it</button>
        </form>
      </div> )}
    </>
    );
}

export default UpdateAvailability