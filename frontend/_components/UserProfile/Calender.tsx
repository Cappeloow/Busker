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
        {availabilities.map((availability:IAvailability) => (
            <div key={availability.availabilityId}>
                <h3>{availability.date}</h3>
                <p>{availability.description}</p>
                {/*CHECKING THE CURRENT STATUS OF THE DATE*/}
                {
                    availability.status === 'Available' ? (
                        <div style={{ background: 'green', color: 'white' }}>
                        I'm Free
                        </div>
                    ) : availability.status === 'In Talks' ? (
                        <div style={{ background: 'yellow', color: 'black' }}>
                        In Talks
                        </div>
                    ) : (
                        <div style={{ background: 'red', color: 'black' }}>
                        Booked!
                        </div>
                    )
                    }

                <UpdateAvailability availabilityId={availability.availabilityId!} date={availability.date}/>
            </div>
        ))}
        <CreateAvailability/>
    </div>
  )
}

export default Calender