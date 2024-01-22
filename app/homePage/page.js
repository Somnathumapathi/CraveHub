'use client'
import React from 'react';
import AppBar from "../../components/appbar"
import Carousel from "../../components/carousel"
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { useEffect, useState } from 'react';
import { auth } from '@/firebase';
import FloatingAB from "../../components/floatingab"

  const HomePage = () => {
    const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
    });

  return () => unsub();
    }, []);
  
  // const handleLogout = async () => {
  //   try {
  //     await signOut(auth);
  //     console.log('User signed out successfully!');
  //     window.location.href = '/';
  //   } catch (error) {
  //     console.error('Error signing out:', error.message);
  //   }
  // };
  // const acccheck = ()=>{
  //   const userid = currentUser.uid
  //   console.log(userid)
  // }

  const carouselImages = [
    '/images/scr1.png',
    '/images/scr2.png',
    '/images/scr3.png'
    ]

  return(
    <div>
      <AppBar pageName="Home"/>
        <div className='bg-gray-800 pt-5'>
              <center>
                <p className='text-5xl mt-5 text-green-600 font-bold'>Welcome To CraveHub!</p>
                <div className='m-11'>
                  <Carousel images={carouselImages} />
                  <FloatingAB text={"order"} navPage={"orderPage"}/>
                </div>
                <div className='text-white text-left ml-40 mr-40 mt-20 mb-20'>
                    <p className='text-4xl font-bold text-green-600 m-4'>About CraveHub</p>
                    <p className='text-xl m-4 mb-8 leading-relaxed border-b-2 border-white/50 pb-8'>
                      Welcome to CraveHub, where we believe in the power of vibrant, nourishing salads that are as
                      unique as you are! Our concept is simple: Build Your Own Healthy Salad Bowl. We are committed to providing 
                      a fresh and customizable dining experience that puts your well-being at the forefront.
                    </p>
                    <p className='text-4xl font-bold text-green-600 m-4'>Our Philosophy</p> 
                    <p className='text-xl m-4 mb-8 leading-relaxed border-b-2 border-white/50 pb-8'>
                      At CraveHub, we are passionate about promoting healthiness through delicious, locally sourced, 
                      and organic ingredients. We believe that what you eat should not only taste good but also make you feel good. 
                      That's why we've carefully curated ingredients that celebrate the flavors of fresh, nutrient-packed produce while 
                      supporting local farmers and sustainable practices.
                    </p>
                    <p className='text-4xl font-bold text-green-600 m-4'>Your Salad, Your Way</p>
                    <p className='text-xl m-4 mb-8 leading-relaxed border-b-2 border-white/50 pb-8'>
                      Dive into a world of endless possibilities as you create your personalized salad masterpiece. Choose from 
                      a vibrant array of locally sourced greens, crisp vegetables, wholesome grains, and protein-packed toppings.
                      Whether you're a veggie enthusiast, protein lover, or looking for a gluten-free option, our diverse selection
                      ensures that there's something for everyone
                    </p>
                    <p className='text-4xl font-bold text-green-600 m-4'>Locally Sourced, Freshly Crafted</p>
                    <p className='text-xl m-4 mb-8 leading-relaxed border-b-2 border-white/50 pb-8'>
                      We take pride in partnering with local farmers to bring you the highest quality, organic produce. 
                      By sourcing ingredients locally, we not only support our community but also reduce our environmental 
                      footprint. Every bite is a celebration of flavor, freshness, and the goodness that comes from the earth
                    </p>
                    <p className='text-4xl font-bold text-green-600 m-4'>Our Commitment to You</p>
                    <p className='text-xl m-4 mb-8 leading-relaxed p-4'>
                      At CraveHub, we are committed to providing a dining experience that goes beyond the plate.
                      Join us at CraveHub and embark on a journey of flavor, freshness, and well-being. 
                      Your health is our priority, and we can't wait to be a part of your deliciously healthy lifestyle.
                    </p>
                </div>
              </center>
        </div>
    </div> 
    
  )
}
export default HomePage;