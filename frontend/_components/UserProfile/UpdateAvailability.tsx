'use client';
import {useEffect, useState} from 'react';
import { updateAvailability } from '@/app/services/actions';
import { useParams, useRouter } from 'next/navigation';
import { IAvailability } from '@/app/types';
import { FaEdit } from "react-icons/fa";
import { FaMinusCircle } from "react-icons/fa";
type Props = {
  availabilityId:string,
  date:string,
  status:string,
  location:string,
  description:string,
  bookingTime:string,
  isAuth:string
}

function UpdateAvailability({availabilityId, date, status, description, location, bookingTime,isAuth}: Props) {
  const router = useRouter();
  const {id} = useParams();
  const [isFormOpen, setFormIsOpen] = useState(false);
  //update the availability
  
 const [availabilityData, setAvailabilityData] = useState<IAvailability>({
  availabilityId,
  date,
  description,
  location: location || "",
  bookingTime: bookingTime || "",
  status,
});


  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setFormIsOpen(false);
    await updateAvailability(availabilityData).finally(() => {
      router.refresh();
    })
  };




  return (
    <>
    {!isFormOpen ? <FaEdit onClick={() => setFormIsOpen(true)}/> : <FaMinusCircle onClick={() => setFormIsOpen(false)}/> }
    {isFormOpen &&  (
      <div className='availability_form_section'>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="DATE"
            name="date"
            value={availabilityData.date}
            onChange={(e) => setAvailabilityData({ ...availabilityData, date: e.target.value })}
          />
          <select
            name="status"
            value={availabilityData.status}
            onChange={(e) => setAvailabilityData({ ...availabilityData, status: e.target.value })}
          >
            <option value="In Talks">In Talks</option>
            <option value="Booked">Booked</option>
            <option value="Available">Available</option>
          </select>
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