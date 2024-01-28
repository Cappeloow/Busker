"use client";
import React from 'react'
import Link from 'next/link';
type Props = {}

function GoToStoreButton({}: Props) {
  return (
    <>
        <Link href={`/store`}>
            <button className='go_to_store_btn'>STORE</button>
        </Link>
    </>
  )
}

export default GoToStoreButton