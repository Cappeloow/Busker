import React from 'react'
import EditUserDetailsComponents from './EditUserDetailsComponents'
import { IUserDetails } from '@/app/types'
import Link from 'next/link'
import { BsFillPersonVcardFill } from "react-icons/bs";
type Props = {
    userId: string,
    isAuth: string
    user:IUserDetails
}

export default async function UserDetailsComponent({userId, isAuth, user}: Props ) {
  return (
    <div className='user_details_section'>
      {isAuth === userId && (
      <div>
      <Link href={`/user/${userId}/account`}>
        <BsFillPersonVcardFill style={{fontSize:'25px',}}/>
      </Link>

      <EditUserDetailsComponents user={user}/>
      </div>)}
        <p>{user.artistName}</p>
        <p>{user.email}</p>
        
    </div>
  )
}
