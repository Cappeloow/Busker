'use client';
import React from 'react'
import { updateAvailability } from '@/app/services/actions';

type Props = {}

function UpdateAvailability({}: Props) {
  return (
    <div>
      <button onClick={() => updateAvailability()}>updateAvailability</button> 
    </div>
  )
}

export default UpdateAvailability