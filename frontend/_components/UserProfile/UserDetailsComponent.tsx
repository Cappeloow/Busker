import React from 'react'
import EditUserDetailsComponents from './EditUserDetailsComponents'
import { getUserById } from '@/app/services/services'
type Props = {
    userId: string,
    isAuth: string
}

export default async function UserDetailsComponent({userId, isAuth}: Props) {
    const user =  await getUserById(userId);
  return (
    <div className='user_details_section'>
      {isAuth === userId && <EditUserDetailsComponents/>}
        <p>{user.artistName}</p>
        <p>{user.email}</p>
    </div>
  )
}
