import React from 'react'
import { getAllUsers } from '../services/services'
type Props = {}
import Link from 'next/link';
import ImageComponent from '@/_components/UserProfile/ImageComponent';

export default async function Page ({}: Props) {  
    const users = await getAllUsers();
  return (
    <div>
        {users.map((user: { UserID: React.Key | null | undefined; }) => (
            <div key={user.id}>
                <ImageComponent height={100} width={100} id={user.id}/>
                <Link href={`/user/${user.id}`}>{user.username}</Link>
            </div>
        ))}
    </div>
  )
}

