'use client';
import {useEffect, useState} from 'react'
import { ILink } from '@/app/types'
import Link from 'next/link';
import DeleteLink from './DeleteLink';
import { addAmountToLink } from '@/app/services/actions';
type Props = {
    link:ILink
    userId: string;
    isAuth: string;
}

function LinkComponent({link,userId,isAuth}: Props) {
    const {linkId} = link;
    const handleLinkClick = async () => {
        console.log(linkId);
        
        try {
            await addAmountToLink(linkId!, userId);
            window.open(link.url.startsWith('http') ? link.url : 'http://' + link.url, '_blank');
        } catch (error) {
            console.error('Error adding amount to link:', error);
        }
    };
  return (
    <>  
  
  <h1 onClick={handleLinkClick}>Go to {link.title}</h1>
  <p>CLICKS: {link.linkClicks?.toString()}</p>
          { isAuth === userId && <DeleteLink id={link.linkId!}/>}
    </>
  )
}

export default LinkComponent