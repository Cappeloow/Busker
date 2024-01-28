"use client";
import {useState, useEffect} from 'react';
import { createAvailability } from '@/app/services/actions';
import { useParams } from 'next/navigation';
import { IAvailability } from '@/app/types';
import { FaCirclePlus } from "react-icons/fa6";
import { FaMinusCircle } from "react-icons/fa";
type Props = {
  isAuth:string
}

function CreateAvailability({isAuth}: Props) {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const {id} = useParams();

  // handle data 
  const [availabilityData, setAvailabilityData] = useState<IAvailability>({
    date: '',
    description: '',
  });

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsFormOpen(false);
    await createAvailability(availabilityData);
  };



  return (
    <>
    {isAuth === id && (
      <>
      {!isFormOpen ? <FaCirclePlus className='open_availability_form_btn' onClick={() => setIsFormOpen(true)}/>:
      <FaMinusCircle className='open_availability_form_btn' onClick={() => setIsFormOpen(false)}/>
      }
        {isFormOpen && <form onSubmit={handleSubmit} className='create_availability_form'>
          <input
            type="text"
            placeholder="Date"
            name="date"
            value={availabilityData.date}
            onChange={(e) => setAvailabilityData({ ...availabilityData, date: e.target.value })}
          />
          <input
            type="text"
            placeholder="I'm available for any gig, let me know!"
            name="description"
            value={availabilityData.description}
            onChange={(e) => setAvailabilityData({ ...availabilityData, description: e.target.value })}
          />
          <button type="submit">Send it</button>
        </form>}
      </> )}
    </>
    );
}

export default CreateAvailability
