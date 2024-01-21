import React from 'react';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { useEffect, useState } from 'react';
import { auth } from '@/firebase';


const AppBar = () => {
    // const [currentUser, setCurrentUser] = useState(null);

    // useEffect(() => {
    //   const unsub = onAuthStateChanged(auth, (user) => {
    //     setCurrentUser(user);
    //   });
  
      
    //   return () => unsub();
    // }, []);
    const handleLogout = async () => {
        try {
          await signOut(auth);
          console.log('User signed out successfully!');
          window.location.href = '/';
        } catch (error) {
          console.error('Error signing out:', error.message);
        }
      };
    return (
        
    <nav>
        <div className="bg-gray-800 p-6 border-b border-white" >
            <a className="text-3xl py-4 pr-4 font-bold text-green-700 align-middle" href="homePage"><span className='text-green-600'>Crave</span>Hub</a>
            <a className="text-white p-4 align-middle" href="homePage">Home</a>
            <a className="text-white p-4 align-middle" href="orderPage">Order</a>
            <a className="text-white p-4 align-middle" href="myOrdersPage">My Orders</a>
            <a className="text-white p-1 float-right align-middle" href="/" onClick={handleLogout}>Log out</a>
            </div>
    </nav>
    );
};

export default AppBar;