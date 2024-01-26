import React from 'react'
import { getTotalClicksCount } from '@/app/services/services'
type Props = {
    userId:string
}

export default async function TotalClicksComponent({userId}: Props) {
    const {totalClicks} = await getTotalClicksCount(userId);
    console.log(totalClicks);
  return (
    <>
    <p>Total external links clicked on: {totalClicks.toString()}</p>
    </>
  )
}
