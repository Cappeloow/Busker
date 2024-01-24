"use client";
import React from 'react'
import { createAvailability } from '@/app/services/actions';
type Props = {}

function CreateAvailability({}: Props) {
  return (
    <div>
    <button onClick={() => createAvailability()}>createAvailability</button> 
    </div>
  )
}

export default CreateAvailability