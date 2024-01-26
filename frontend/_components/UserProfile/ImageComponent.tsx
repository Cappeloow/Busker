'use client';
import React from 'react'
import {useEffect, useState} from 'react';
import { getUserImg } from '@/app/services/services';
type Props = {
    id:string 
    height:number,
    width:number
}

function ImageComponent({id, height, width}: Props) {
      function UserImage( id: string) {
    const [url, setUrl] = useState<string | null>(null);
    useEffect(() => {
      (async () => {
        const image = await getUserImg(id);
        setUrl(image);
      })();
      return () => {
        if (url) URL.revokeObjectURL(url);
      };
    }, [id]);
  
    if (!url) return null;
    // next/image doesn't offer any benefits in this case
    return <img src={url} alt="test" width={width} height={height} style={{borderRadius:'50%'}}/>;
  }
  const img = UserImage(id);


  return (
    <div>
        {img ? img : "Loading..."}
    </div>
  )
}

export default ImageComponent