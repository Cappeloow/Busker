"use client"
import { ILink } from '@/app/types';
import React, { useEffect, useState } from 'react';
import { createLink } from '@/app/services/services';
import { useRouter, useParams } from 'next/navigation';
import { socialMediaTitles } from '@/app/config';
import { FaCirclePlus } from "react-icons/fa6";
type Props = {
  isAuth:string
};

export default function CreateLinks({isAuth}: Props) {
  const router = useRouter();
  const {id} = useParams();
  const [isCreateLinkOpen, setIsCreateLinkOpen] = useState<boolean>(false);
const [linkData, setLinkData] = useState<ILink>({
  title: '',
  url: '',
});

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    await createLink(linkData).finally(() => {
      router.refresh();
    });
    setIsCreateLinkOpen(false);
  };
  
  return (
  <>
  {isAuth === id && (
    <div className='create_link_section'>
      {!isCreateLinkOpen &&
      <FaCirclePlus onClick={() => setIsCreateLinkOpen(true)} className='open_form_btn'/>
    }
      
      {isCreateLinkOpen && <form onSubmit={handleSubmit} className='create_link_form'>
      <select
                value={linkData.title}
                onChange={(e) => setLinkData({ ...linkData, title: e.target.value })}
              >
                <option value='' disabled>
                  Select Title
                </option>
                {socialMediaTitles.map((title, index) => (
                  <option key={index} value={title}>
                    {title}
                  </option>
                ))}
      </select>
        <input
          type="text"
          placeholder="URL"
          name="url"
          value={linkData.url}
          onChange={(e) => setLinkData({ ...linkData, url: e.target.value })}
        />
        <button type="submit">Send it</button>
      </form>}
    </div> )}
  </>
  );
}
