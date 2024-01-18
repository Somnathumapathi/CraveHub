'use client'
import React from 'react';

import AppBar from "../../components/appbar"
import Carousel from "../../components/carousel"
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { useEffect, useState } from 'react';
import { auth } from '@/firebase';



import Link from 'next/link';
import FloatingAB from "../../components/floatingab"

const HomePage = () => {
    const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
    });

    
    return () => unsub();
  }, []);
  
  const handleLogout = async () => {
    try {
      await signOut(auth);
      console.log('User signed out successfully!');
      window.location.href = '/';
    } catch (error) {
      console.error('Error signing out:', error.message);
    }
  };
  const acccheck = ()=>{
    const userid = currentUser.uid
    console.log(userid)
  }
  

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
        My orders
        </div>
        
        </Link>
        <button onClick={acccheck}>acccheck</button>
        <button
              onClick={handleLogout}
              className=""
            >
              Logout
            </button>
      </center>
      
      <FloatingAB text={"order"} navPage={"orderPage"}/>
      
      
        </div>
    )
}
export default HomePage;