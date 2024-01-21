'use client';
import React from 'react';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import Link from 'next/link';

const FloatingAB = ({text, navPage}) => {


    return (
        
      <Fab variant="extended" size="small" aria-label="add" className='fixed bottom-10 right-10 text-white hover:bg-green-700'>
        <Link href={navPage}>
      <AddIcon />{text}
      </Link>
      
  </Fab>
  
    )
}
export default FloatingAB