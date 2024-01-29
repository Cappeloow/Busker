import React from 'react'
import { getAllUsers } from '../services/services'
type Props = {}
import TotalClicksComponent from '@/_components/Explore/TotalClicksComponent';
import Link from 'next/link';
import ImageComponent from '@/_components/UserProfile/ImageComponent';
import { IUser } from '../types';

//Explore is meant to showcase all the users that exists in the db, they're listed by most amount of clicks on their social media platforms.
export default async function Page ({}: Props) {  
    const users = await getAllUsers();
  return (
    <div>
      <h2>TOP ARTIST</h2>
        {users.map((user:IUser) => (
          <div key={user.userId} >
            <Link href={`/user/${user.userId}`}>
            <ImageComponent height={100} width={100} id={user.userId}/>
                {user.artistName}
            </Link>
            {/* <TotalClicksComponent userId={user.userId}/> */}
            <p> Total external links clicked on: {user.linkClicks?.toString()}</p>
            </div>
        ))}
    </div>
  )
}

