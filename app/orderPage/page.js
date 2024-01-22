
'use client'

import React, { useState, useEffect } from 'react';
import AppBar from "../../components/appbar";
import { db } from '@/firebase';
import { collection, getDocs, addDoc } from 'firebase/firestore';
import { onAuthStateChanged } from 'firebase/auth';
import Image from 'next/image'
import { auth } from '@/firebase';
import Order from '../../models/order'
import Link  from 'next/link'

const OrderPage = () => {
  const [items, setItems] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalCalories, setTotalCalories] = useState(0);
  const [totalCarb, setTotalCarb] = useState(0);
  const [totalProtein, setTotalProtein] = useState(0);
  const [totalfat, setTotalfat] = useState(0);
  const [phno, setPhno] = useState(0);
  const [address, setAddress] = useState('');
  const [currentUser, setCurrentUser] = useState(null);
  const [name, setName] = useState('');
  // const [itemName, setItemName] = useState([])
  const [bowlItems, setBowlItems] = useState([])

 const bowlItemImages = {
  veg: '/images/vegetables.png',
  'non-veg': '/images/meat.png',
  egg: '/images/egg.png'
 }
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
    });

    
    return () => unsub();
  }, []);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'items'));
        const itemsData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setItems(itemsData);
      } catch (error) {
        console.error('Error fetching items:', error);
      }
    };

    fetchItems();
  }, []);

  const handleAddItem = (item) => {
    const isItemInList = selectedItems.some((selectedItem) => selectedItem.id === item.id);
    const isCategoryInBowl = bowlItems.some((bowlItem) => bowlItem.category === item.category);
    if (!isItemInList) {
    const price = parseFloat(item.price);
    const carb = parseFloat(item.carb);
    const calories = parseFloat(item.calorie);
    const protein = parseFloat(item.protein);
    const fat = parseFloat(item.fat);
    console.log(currentUser.uid)
    
    
    setSelectedItems((prevItems) => [...prevItems, item]);
    setTotalPrice((prevTotal) => (prevTotal + price));
    setTotalCalories((prevTotal) => (prevTotal+calories));
    setTotalCarb((prevTotal) => (prevTotal+carb));
    setTotalProtein((prevTotal) => (prevTotal+protein));
    setTotalfat((prevTotal) => (prevTotal+fat));
    // const bowlItem = bowlItemImages[item.category];
    // setBowlItems((prevItem) => [...prevItem, bowlItem]);
    if (!isCategoryInBowl) {
      const bowlItem = bowlItemImages[item.category];
      setBowlItems((prevItems) => [...prevItems, { category: item.category, image: bowlItem }]);

    }
    } else {
      alert((item.name)+" already in bowl");
  };}

  const handleRemoveItem = (item) => {
    const price = parseFloat(item.price);
    const carb = parseFloat(item.carb);
    const calories = parseFloat(item.calorie);
    const protein = parseFloat(item.protein);
    const fat = parseFloat(item.fat);
  
    setSelectedItems((prevItems) => prevItems.filter((selectedItem) => selectedItem.id !== item.id));
  
    setTotalPrice((prevTotal) => prevTotal - price);
    setTotalCalories((prevTotal) => prevTotal - calories);
    setTotalCarb((prevTotal) => prevTotal - carb);
    setTotalProtein((prevTotal) => prevTotal - protein);
    setTotalfat((prevTotal) => prevTotal - fat);

    const isCategoryStillInBowl = selectedItems.some(
      (selectedItem) => selectedItem.category === item.category && selectedItem.id !== item.id
    );
  
    if (!isCategoryStillInBowl) {
      setBowlItems((prevItems) => prevItems.filter((bowlItem) => bowlItem.category !== item.category));
    }
  };
  
  
  
  
  

  const placeOrder = async (e) => {
 e.preventDefault();
 try{
  if(selectedItems!=[]) {
    if(name!='' && phno != 0 && address!='') {
      const itemNames = selectedItems.map(item=>(item.name))
      const newOrder = new Order(currentUser.uid, name, itemNames, totalPrice, phno, address, totalCalories);
      const docRef = await addDoc(collection(db, "orders"), {
        cusId: newOrder.cusId,
        custName: newOrder.custName,
        items: newOrder.items,
        price: newOrder.price,
        phno: newOrder.phno,
        address: newOrder.address,
      calories: newOrder.calories
        
      }
      
      )
      
      // setSelectedItems([])
      
      // setPhno(0)
      // setAddress('')
      // setName('')
      alert("Order placed succussfully!")
window.location.href= 'homePage';
      
    } else {
      alert("Enter all the fields")
    } 
   
  } else {
    alert("Cart is empty")
  }
 
 } catch (e) {
console.log("Error occured: ", e)
 }

  }
  
  return (
    <div className='bg-gray-800'>
      <AppBar />
      <center>
        <p className='m-4 text-4xl  p-4 font-bold text-green-600'>Build Your Bowl!</p>
        <div className='flex flex-col'>
          <br />
          <div className='flex flex-grow flex-row mt-10 order-first items-center justify-center mb-4'>
            <div className='relative'>
              <Image className='w-96' src='/images/bowl.png' alt='Salad Bowl' width={300} height={300}></Image>
              <div className='absolute inset-0 flex items-center justify-center'>
                {bowlItems.map((item, i) => (
                  <Image key={i} src={item.image} width={125} height={125} alt={i}></Image>
                ))}
              </div>
            </div>
            <div className='inline-block m-10 ml-40 bg-gray-500 w-[280px] h-[240px] rounded-lg hover:bg-green-500/50 hover:scale-110 duration-300 text-xl p-5 leading-relaxed'>
              <p className='font-bold text-2xl'>Nutritional Info:</p>
              <br />
              <div className='text-left'>
                <p>Energy(kcal): {totalCalories}</p>
                <p>Carbohydrates: {totalCarb}</p>
                <p>Protein: {totalProtein}</p>
                <p>Fat: {totalfat}</p>
              </div>
            </div>
          </div>
          <br />
          <div>
            <p className='text-4xl mt-4 mb-4 p-3 font-bold text-green-600'>Add To Bowl:</p>
            <div className='flex flex-row order-first'>
              <div>
                {items.map((item) => (
                  <div className='flex flex-col leading-relaxed ml-[200px] m-2 text-white' key={item.id}>
                    <div className='flex flex-row mt-4 mr-40 items-center'>
                      <p className='w-[200px] h-[20px]'>{item.name} - &#8377; {item.price}</p>
                      {selectedItems.find((selectedItem) => selectedItem.id === item.id) ? (
                                    <button onClick={() => handleRemoveItem(item)} className="ml-4 w-[90px] self-end border-red-600 border bg-red-600 hover:bg-red-700 p-2 hover:scale-105 duration-200 text-white rounded-full">
                                      Remove
                                    </button>
                                  ) : (
                                    <button onClick={() => handleAddItem(item)} className="ml-4 w-[90px] self-end border-green-600 border bg-green-600 hover:bg-green-700 p-2 hover:scale-105 duration-200 text-white rounded-full">
                                      Add
                                    </button>
                                  )} 
                    </div>
                  </div>
                ))}
                <br />
              </div>
              <div className='flex flex-row order-last'>
                <div className='flex flex-col ml-[300px] mr-[100px] leading-loose m-3 items-center'>
                  <div>
                    <p className='text-3xl font-bold text-green-600 mb-8'>Enter your details:</p>
                    <div className='m-3 p-2'>
                      <label className='mr-10 text-white'>Enter Name:</label>
                      <input type='text' className='text-black border-2 border-black rounded-md p-2' value={name} onChange={(e) => setName(e.target.value)} placeholder='Name' />
                    </div>
                    <div className='m-3 p-2'>
                      <label className='mr-3 text-white'>Enter Phone no:</label>
                      <input type='number' className='text-black border-2 border-black rounded-md p-2' value={phno} onChange={(e) => setPhno(e.target.value)} placeholder='Phone number' />
                    </div>
                    <div className='m-3 p-2'>
                      <label className='mr-5 text-white'>Enter Address:</label>
                      <input type='text' className='text-black border-2 border-black rounded-md p-2' value={address} onChange={(e) => setAddress(e.target.value)} placeholder='Address' />
                    </div>
                    <div className='mt-5'>
                      <p className='text-2xl text-white font-bold'>Total Price: &#8377;{totalPrice}</p>
                    </div>
                  </div>
                  <br />
                  <button
                    onClick={placeOrder}
                    className='mb-5 h-[50px] w-[200px] focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-xl px-5 py-2.5 me-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800 hover:scale-105 duration-300'
                  >
                    Place Order
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </center>
    </div>
  );
};

export default OrderPage;
