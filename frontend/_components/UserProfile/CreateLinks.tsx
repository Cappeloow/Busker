"use client"
import { ILink } from '@/app/types';
import React, { useEffect, useState } from 'react';
import { createLink } from '@/app/services/services';
import { useFormState } from 'react-dom';
import { authStatus } from '@/app/services/services';
import { useRouter, useParams } from 'next/navigation';
type Props = {};

export default function CreateLinks({}: Props) {
  const router = useRouter();
  const {id} = useParams();
const [linkData, setLinkData] = useState<ILink>({
  icon: '',
  title: '',
  url: '',
});
const [isUser, setIsUser] = useState<boolean>(false)

  useEffect(() => {
    const getAuth = async () => {
      const {userId} = await authStatus();
      if (userId === id){
        setIsUser(true);
      }
    }
    getAuth();
  },[])

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    await createLink(linkData).finally(() => {
      router.refresh();
    });
  };

  return (
    isUser &&
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="ICON"
          name="icon"
          value={linkData.icon}
          onChange={(e) => setLinkData({ ...linkData, icon: e.target.value })}
        />
        <input
          type="text"
          placeholder="TITLE"
          name="title"
          value={linkData.title}
          onChange={(e) => setLinkData({ ...linkData, title: e.target.value })}
        />
        <input
          type="text"
          placeholder="URL"
          name="url"
          value={linkData.url}
          onChange={(e) => setLinkData({ ...linkData, url: e.target.value })}
        />
        <button type="submit">Send it</button>
      </form>
    </div>
  );
}
