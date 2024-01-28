import React from 'react'
import { getUserById } from '@/app/services/services'
type Props = {
    userId: string
}

export default async function UserDetailsComponent({userId}: Props) {
    const user =  await getUserById(userId);
  return (
    <div className='user_details_section'>
        <p>{user.artistName}</p>
        <p>{user.email}</p>
    </div>
  )
}
