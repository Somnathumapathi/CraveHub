import React from 'react';

import AppBar from "../../components/appbar"
import Carousel from "../../components/carousel"
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import Link from 'next/link';

const HomePage = () => {
    const carouselImages = [
        "https://s3-ap-southeast-1.amazonaws.com/foodvista.1/7827a873-586d-419d-8b1c-8c0c0211d6fb.jpg",
        "https://s3-ap-southeast-1.amazonaws.com/foodvista.1/b3a806dc-60c5-42c2-b7c0-9dd1d36e8f89.jpg",
        "https://s3-ap-southeast-1.amazonaws.com/foodvista.1/45eb9dd2-7b52-439d-b843-662e06c84caa.jpg"
    ]
    return (
        <div className="">
            <AppBar pageName="Home"/>
            
            <center>
            <Carousel images={carouselImages} />
        <h1 className='text-3xl text-green-500'>Welcome To CraveHub</h1><br></br>
        {/* <br/> */}
        <Link href='myOrdersPage'>
        <div className='w-auto hover: cursor-pointer hover:scale-110 text-green-500'>
        <a>My orders</a>
        </div>
        </Link>
      </center>
      <Link href="orderPage">
      <Fab variant="extended" size="small" color="secondary" aria-label="add" className='absolute bottom-10 right-10'>
      <AddIcon />Order
      
  </Fab>
  </Link>
        </div>
    )
}
export default HomePage;