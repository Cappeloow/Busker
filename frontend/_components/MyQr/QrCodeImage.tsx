'use client';
import React, { useEffect, useState } from 'react';
import { generateQRCode } from '@/app/services/services';

type Props = {}

const QrCodeImage = (props: Props) => {
    const [qrCode, setQRCode] = useState<string | null>(null);

    useEffect(() => {
      const fetchQRCode = async () => {
        try {
          const data = await generateQRCode("229ec007-f043-41dd-89cb-44e7712b2268");
          setQRCode(data); // assuming data is the base64-encoded image
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