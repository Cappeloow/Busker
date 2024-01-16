'use client';

import React, { useEffect, useState } from 'react';
import { generateQRCode } from '../services/services';

const Page = () => {
  const [qrCode, setQRCode] = useState<string | null>(null);

  useEffect(() => {
    const fetchQRCode = async () => {
      try {
        const data = await generateQRCode("237ae2c7-8e56-4383-83ac-d8ac52c5be5e");
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

export default Page;
