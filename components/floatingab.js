'use client';
import React from 'react';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import Link from 'next/link';

const FloatingAB = () => {
    return (
        <Link href="orderPage">
      <Fab variant="extended" size="small" color="secondary" aria-label="add" className='absolute bottom-10 right-10'>
      <AddIcon />Order
      
  </Fab>
  </Link>
    )
}
export default FloatingAB