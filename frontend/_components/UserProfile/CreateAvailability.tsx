"use client";
import {useState, useEffect} from 'react';
import { createAvailability } from '@/app/services/actions';
import { useParams } from 'next/navigation';
import { IAvailability } from '@/app/types';
type Props = {
  isAuth:string
}

function CreateAvailability({isAuth}: Props) {
  
  const {id} = useParams();

  // handle data 
  const [availabilityData, setAvailabilityData] = useState<IAvailability>({
    date: '',
    description: '',
  });

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    await createAvailability(availabilityData);
  };



  return (
    <>
    {isAuth === id && (
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

export default CreateAvailability
