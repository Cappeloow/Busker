import React from 'react'
import CreateAvailability from './CreateAvailability'
import { getAllAvailabilities } from '@/app/services/services'
import UpdateAvailability from './UpdateAvailability'
import { IAvailability } from '@/app/types'
type Props = {
    userId:string
}

async function Calender(props: Props) {
    const {userId} = props;
    const availabilities = await getAllAvailabilities(userId);
  return (
    <div>
        <h1>My Calender</h1>
        {/*import a calender*/}
        {/*need to change the attribute of my availibity (bookedDateTime should rather be time or something) */}

        {availabilities.map((availability:IAvailability) => (
            <div key={availability.availabilityId}>
                <h3>{availability.date}</h3>
                <p>{availability.description}</p>
            </div>
        ))}
        <CreateAvailability/>
        <UpdateAvailability/>
    </div>
  )
}

export default Calender