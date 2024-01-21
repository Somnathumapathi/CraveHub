
'use client'

import React, { useState, useEffect } from 'react';
import AppBar from "../../components/appbar";
import { db } from '@/firebase';
import { collection, getDocs, addDoc } from 'firebase/firestore';
import { onAuthStateChanged } from 'firebase/auth';
import Image from 'next/image'
import { auth } from '@/firebase';
import Order from '../../models/order'

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
    
    setTotalPrice((prevTotal) => (prevTotal - price));
    setTotalCalories((prevTotal) => (prevTotal-calories));
    setTotalCarb((prevTotal) => (prevTotal-carb));
    setTotalProtein((prevTotal) => (prevTotal-protein));
    setTotalfat((prevTotal) => (prevTotal-fat));
    setBowlItems((prevItems) => 
 prevItems.filter((bowlItem) => bowlItem.category !== item.category)
      
    );
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
    <div>
      <AppBar pageName="Order" />
      <center>
        <h1 className='text-3xl text-green-500'>My bowl</h1>
        <br />
        <div className="flex justify-center items-center">
        <div className="flex-grow">
        <div className='relative'>
        <Image className="w-96" src="/images/bowl.png" alt="Salad bowl" width={300}
      height={300}></Image>
      <div className='absolute inset-0 flex items-center justify-center'>
      {bowlItems.map((item, i) => ( 
        <Image key={i} src={item.image} width={125}
        height={125} alt={i}></Image>
      ))}
      </div>
      </div>
        </div>
        </div>
        <br />
          <h2>My salad items:</h2>
          {selectedItems.map((item) => (
            <div key={item.id}>
              <p>{item.name}</p>
              <button onClick={() => handleRemoveItem(item)}>Remove</button>
            </div>
          ))}
          <br />
          <div className="bg-neutral-600 w-[200px] h-[150px] rounded-lg hover:bg-green-800 hover:scale-105 duration-300">
            <h2>Nutritional Info:</h2><br/>   
            <p>Energy(kcal): {totalCalories}</p>
            <p>Carbohydrates: {totalCarb}</p>
            <p>Protein: {totalProtein}</p>
            <p>Fat: {totalfat}</p>

          </div>
          <br />
          <p>Total Price: &#8377;{totalPrice}</p>
        
        <br />
        <h2>Add Items</h2>
        
        {items.map((item) => (
          <div key={item.id}>
            <p>{item.name} - &#8377;{item.price}</p>
            <button onClick={() => handleAddItem(item)}>+ Add to Bowl</button>
          </div>
        ))}
        <br/>
        <h2>Enter your details:</h2>
        <br/>
        <label>Enter Name:     </label>
       <input type='text' className='text-black' value={name} onChange={(e) => setName(e.target.value)} placeholder='Name' />
       <br/><br/>
        <label>Enter Phone no.: </label>
        <input type='number' className='text-black' value={phno} onChange={(e) => setPhno(e.target.value)} placeholder='Phone number'/>
       <br/><br/>
       <label>Enter Address:     </label>
       <input type='text' className='text-black' value={address} onChange={(e) => setAddress(e.target.value)} placeholder='Address'/>
       <br/><br/>
       <button onClick={placeOrder} className='focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800'>Place Order</button>
      </center>
    </div>
  );
};

export default OrderPage
