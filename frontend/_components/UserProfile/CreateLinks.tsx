"use client"
import { ILink } from '@/app/types';
import React, { useEffect, useState } from 'react';
import { createLink } from '@/app/services/services';
import { useFormState } from 'react-dom';
import { useRouter, useParams } from 'next/navigation';
type Props = {
  isAuth:string
};

export default function CreateLinks({isAuth}: Props) {
  const router = useRouter();
  const {id} = useParams();
const [linkData, setLinkData] = useState<ILink>({
  icon: '',
  title: '',
  url: '',
});

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    await createLink(linkData).finally(() => {
      router.refresh();
    });
  };

  return (
  <>
  {isAuth === id && (
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
    </div> )}
  </>
  );
}
