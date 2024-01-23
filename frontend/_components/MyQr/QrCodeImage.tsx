'use client';
import React, { useEffect, useState } from 'react';
import { generateQRCode } from '@/app/services/services';

type Props = {
  id:string
}

const QrCodeImage = (props: Props) => {
  const {id} = props;

    const [qrCode, setQRCode] = useState<string | null>(null);

    useEffect(() => {
      const fetchQRCode = async () => {
        try {
          const data = await generateQRCode(id);
          setQRCode(data); 
        } catch (error:any) {
          console.error('Error fetching QR code:', error.message);
        }
      };
  
      fetchQRCode();
    }, []);
  
    return (
      <div>
        {qrCode && (
          <img
            src={`${qrCode}`}
            alt="QR Code"
            style={{ maxWidth: '100%', maxHeight: '100%' }}
          />
        )}
      </div>
    );
  };

export default QrCodeImage