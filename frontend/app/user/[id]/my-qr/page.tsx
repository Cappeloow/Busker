"use client"
import React from 'react'
import { useParams } from 'next/navigation'
type Props = {}
import Link from 'next/link'
import QrCodeImage from '@/_components/MyQr/QrCodeImage'

const page = (props: Props) => {
    const {id} = useParams();
    const singleId: string = Array.isArray(id) ? id[0] : id;
  return (
    <main>
      <QrCodeImage id={singleId}/>
        <Link href={`/store`}>
            <button>MY STORE</button>
        </Link>
    </main>
  )
}

export default page