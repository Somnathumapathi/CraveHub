  "use client";

  import React, { useState } from 'react';
  import Link from 'next/link'
  import { auth } from '@/firebase';
  import { createUserWithEmailAndPassword } from "firebase/auth";
  

  const Register = () => {
    
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSignUp = async (e) => {
      e.preventDefault();
      try {

        await createUserWithEmailAndPassword(auth, email, password);
        console.log('User signed up successfully!');
        window.location.href = '/homePage';

      } catch (error) {
        console.error('Error signing up:', error.message);
      }
    };

      return (
        <div className="w-full min-h-screen flex justify-center items-center bg-white flex-col">
          <h1 className="text-5xl font-bold text-green-500 mb-9 display-block">CRAVE HUB</h1>
          
          
    
          
          
          <div className="absolute inset-1 bg-gray-800 rounded-lg z-10 p-5 relative w-[380px] h-[380px]">
          
            <form onSubmit={handleSignUp}>
              <h2 className="text-2xl font-semibold text-green-500 text-center mb-6">Register</h2>
              {/* <div className="relative flex flex-col mb-6">
                <input
                  type="text"
                  id="text"
                  autoFocus
                  
                  className="relative z-10 border-0 border-b-2 border-green-500 h-10 bg-transparent text-gray-100 outline-none px-2 peer"
                
                />
                <i className="bg-green-500 rounded w-full bottom-0 left-0 absolute h-1 -z-10 transition-transform duration-300 origin-bottom transform peer-focus:h-1 peer-placeholder-shown:h-[0.5px]"></i>
                <label className="peer-focus:font-medium absolute text-sm duration-300 transform -translate-y-8 scale-75 top-3 left-0 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-green-500 text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:text-gray-500 peer-focus:scale-75 peer-focus:-translate-y-8">Enter Name</label>
              </div> */}
              <div className="relative flex flex-col mb-6">
                <input
                  type="email"
                  id="Email"
                  autoFocus
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="relative z-10 border-0 border-b-2 border-green-500 h-10 bg-transparent text-gray-100 outline-none px-2 peer"
                
                />
                <i className="bg-green-500 rounded w-full bottom-0 left-0 absolute h-1 -z-10 transition-transform duration-300 origin-bottom transform peer-focus:h-1 peer-placeholder-shown:h-[0.5px]"></i>
                <label className="peer-focus:font-medium absolute text-sm duration-300 transform -translate-y-8 scale-75 top-3 left-0 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-green-500 text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:text-gray-500 peer-focus:scale-75 peer-focus:-translate-y-8">Enter Email</label>
              </div>
    
              <div className="relative flex flex-col mb-6">
                <input
                  type="password"
                  id="Password"
                
                  className="relative z-10 border-0 border-b-2 border-green-500 h-10 bg-transparent text-gray-100 outline-none px-2 peer"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <i className="bg-green-500 rounded w-full bottom-0 left-0 absolute h-1 -z-10 transition-transform duration-300 origin-bottom transform peer-focus:h-1 peer-placeholder-shown:h-[0.5px]"></i>
                <label className="peer-focus:font-medium absolute text-sm duration-300 transform -translate-y-8 scale-75 top-3 left-0 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-green-500 text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:text-gray-500 peer-focus:scale-75 peer-focus:-translate-y-8">Enter Password</label>
              </div>
    
              <button
                type="submit"
                className="py-3 text-gray-100 bg-green-700 w-full rounded hover:bg-green-500 hover:scale-105 duration-300"
              >
                Register
              </button>
            </form>
    
            <p className="mt-4 text-gray-600">
              Already have an account?{' '}     
                  <Link href='/' className="text-green-500">Login</Link>
            </p>
          </div>
        
        </div>
      );
    };
    
    export default Register;
    