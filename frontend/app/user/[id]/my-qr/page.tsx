"use client"
import React from 'react'
import { useParams } from 'next/navigation'
type Props = {}
import { generateQRCode } from '@/app/services/services'
import Link from 'next/link'
import QrCodeImage from '@/_components/MyQr/QrCodeImage'

const page = (props: Props) => {
    const {id} = useParams();
  return (
    <main>
      <QrCodeImage/>
        <Link href={`/user/${id}/my-qr/store`}>
            <button>MY STORE</button>
        </Link>
    </main>
  )
}

export default page