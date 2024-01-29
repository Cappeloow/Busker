import React from 'react'
import EditUserDetailsComponents from './EditUserDetailsComponents'
import { IUserDetails } from '@/app/types'
type Props = {
    userId: string,
    isAuth: string
    user:IUserDetails
}

export default async function UserDetailsComponent({userId, isAuth, user}: Props ) {
  return (
    <div className='user_details_section'>
      {isAuth === userId && <EditUserDetailsComponents user={user}/>}
        <p>{user.artistName}</p>
        <p>{user.email}</p>
    </div>
  )
}
