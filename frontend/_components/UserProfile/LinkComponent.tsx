'use client';
import { useEffect, useState } from 'react';
import { ILink } from '@/app/types';
import Link from 'next/link';
import DeleteLink from './DeleteLink';
import { addAmountToLink } from '@/app/services/actions';
import { iconMapping } from '@/app/config';
import { MdDoubleArrow } from "react-icons/md";
import { FaMousePointer } from "react-icons/fa";
type Props = {
  link: ILink;
  userId: string;
  isAuth: string;
};


function LinkComponent({ link, userId, isAuth }: Props) {
  const { linkId, title } = link;

  const handleLinkClick = async () => {
    console.log(linkId);

    try {
      await addAmountToLink(linkId!, userId);
      window.open(link.url.startsWith('http') ? link.url : 'http://' + link.url, '_blank');
    } catch (error) {
      console.error('Error adding amount to link:', error);
    }
  };

  const IconComponent = iconMapping[title] || null;

  return (
    <>
      {IconComponent && <IconComponent style={{ height: '60px', width: '60px', fontSize:'70px' }} />}
      <h1 onClick={handleLinkClick}> <MdDoubleArrow/>  {link.title}</h1>
      <p><FaMousePointer/> {link.linkClicks?.toString()}</p>
      {isAuth === userId && <DeleteLink id={link.linkId!} />}
    </>
  );
}

export default LinkComponent;
