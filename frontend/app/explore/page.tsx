import React from 'react'
import { getAllUsers } from '../services/services'
type Props = {}
import Link from 'next/link';

export default async function Page ({}: Props) {  
    const users = await getAllUsers();
    console.log(users.length);
  return (
    <div>
        {users.map((user: { UserID: React.Key | null | undefined; }) => (
            <div key={user.id}>
                <Link href={`/user/${user.id}`}>{user.username}</Link>
            </div>
        ))}
    </div>
  )
}

