
'use client'

import React, { useState, useEffect } from 'react';
import AppBar from "../../components/appbar";
import { db } from '@/firebase';
import { collection, getDocs } from 'firebase/firestore';

const OrderPage = () => {
  const [items, setItems] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalCalories, setTotalCalories] = useState(0);
  const [totalCarb, setTotalCarb] = useState(0);
  const [totalProtein, setTotalProtein] = useState(0);
  const [totalfat, setTotalfat] = useState(0);

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
    if (!isItemInList) {
    const price = parseFloat(item.price);
    const carb = parseFloat(item.carb);
    const calories = parseFloat(item.calorie);
    const protein = parseFloat(item.protein);
    const fat = parseFloat(item.fat);
    
    
    setSelectedItems((prevItems) => [...prevItems, item]);

    
    setTotalPrice((prevTotal) => (prevTotal + price));
    setTotalCalories((prevTotal) => (prevTotal+calories));
    setTotalCarb((prevTotal) => (prevTotal+carb));
    setTotalProtein((prevTotal) => (prevTotal+protein));
    setTotalfat((prevTotal) => (prevTotal+fat));
    } else {
        alert((item.name)+" already in bowl");
    }
  };

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
  };
  
  return (
    <div>
      <AppBar pageName="Order" />
      <center>
        <h1 className='text-3xl text-green-500'>My bowl</h1>
        <br />
        
        <img className="w-96" src="https://img.taste.com.au/gpe52rFs/taste/2017/09/easy-beef-and-quinoa-salad-bowl-130828-2.jpg" alt="Salad bowl"></img>
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
        <h2>Add Items</h2>
        
        {items.map((item) => (
          <div key={item.id}>
            <p>{item.name} - &#8377;{item.price}</p>
            <button onClick={() => handleAddItem(item)}>+ Add to Bowl</button>
          </div>
        ))}
        
        
        <p>Total Price: &#8377;{totalPrice}</p>
      </center>
    </div>
  );
};

export default OrderPage;
