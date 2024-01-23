"use client"
import React, { useState, useEffect } from 'react';
import { getAllLinks } from '@/app/services/services';
import CreateLinks from './CreateLinks';

type Link = {
  linkId: string;
  title: string;
  // ... other properties
};

type Props = {
  userId: string;
};

export default function LinkSection({ userId }: Props) {
  const [links, setLinks] = useState<Link[]>([]);

  useEffect(() => {
    const fetchLinks = async () => {
      try {
        const fetchedLinks = await getAllLinks(userId);
        setLinks(fetchedLinks);
      } catch (error) {
        console.error('Error fetching links:', error);
      }
    };

    fetchLinks();
  }, [userId]);

  return (
    <div>
      {links.map((link) => (
        <div key={link.linkId}>
          <h1>{link.title}</h1>
        </div>
      ))}
      <CreateLinks />
    </div>
  );
}
