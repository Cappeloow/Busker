"use client"
import React, { useState } from 'react';
import { createLink } from '@/app/services/services';
import { useRouter, useParams } from 'next/navigation';
type Props = {};

export default function CreateLinks({}: Props) {
    const router = useRouter();
    const {id} = useParams();
  const [linkData, setLinkData] = useState({
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
