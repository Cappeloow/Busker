import React from 'react'
import { getAllUsers } from '../services/services'
type Props = {}
import Link from 'next/link';
import ImageComponent from '@/_components/UserProfile/ImageComponent';
import { IUser } from '../types';
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
            </div>
        ))}
    </div>
  )
}

