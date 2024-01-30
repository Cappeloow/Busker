'use client';
import React from 'react'
import {useEffect, useState} from 'react';
import { getUserImg } from '@/app/services/services';
import UploadProfileImage from './UploadProfileImage';
type Props = {
    id:string,
    height:number,
    width:number,
    isAuth: string
}

function ImageComponent({id, height, width, isAuth}: Props) {
  const [isOpen, setIsOpen] = useState(false);
  
      function UserImage( id: string) {
    const [url, setUrl] = useState<string | null>(null);
    useEffect(() => {
      (async () => {
        const image: string | null = await getUserImg(id);
        setUrl(image);
      })();
      return () => {
        if (url) URL.revokeObjectURL(url);
      };
    }, [id]);
  
    // next/image doesn't offer any benefits in this case
    return <img src={url || '/gray-background.png'} alt="test" width={width} height={height} style={{borderRadius:'50%'}}/>;
  }
  const img = UserImage(id);


  return (
    <div className='image_section' onMouseOver={() => setIsOpen(true)} onMouseOutCapture={() => setIsOpen(false) }>
      { height > 300 && isOpen && isAuth === id && <UploadProfileImage/>}
        {img ? img : "Loading..."}
    </div>
  )
}

export default ImageComponent