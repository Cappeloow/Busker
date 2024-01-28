import React from 'react'
import CreateAvailability from './CreateAvailability'
import { getAllAvailabilities } from '@/app/services/services'
import UpdateAvailability from './UpdateAvailability'
import { IAvailability } from '@/app/types'
type Props = {
    userId:string,
    isAuth:string
}

async function Calender(props: Props) {
    const {userId,isAuth} = props;
    const availabilities = await getAllAvailabilities(userId);
  return (
    <div className='calender_section'>
        <h1>My Calender</h1>
        <CreateAvailability isAuth={isAuth}/>
        <div className='availability_list'>
        {availabilities.map((availability:IAvailability) => (
            <div key={availability.availabilityId} className='availability_component'>
                <h2>{availability.location && availability.location}</h2>
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

                {isAuth === userId && <UpdateAvailability isAuth={isAuth} availabilityId={availability.availabilityId!} description={availability.description} date={availability.date} status={availability.status!} location={availability.location!} bookingTime={availability.bookingTime!} />}
            </div>
        ))}
        </div>
    </div>
  )
}

export default Calender