'use client'
import AppBar from "../../components/appbar";

import { useState, useEffect } from "react";
import { db, auth } from '@/firebase'
import { collection, getDocs, query, where } from "firebase/firestore"
import { onAuthStateChanged } from 'firebase/auth';

const MyOrdersPage = () => {
    const [currentUser, setCurrentUser] = useState(null);
    const [expandedOrderId, setExpandedOrderId] = useState(null);
     useEffect(() => {
        const unsub = onAuthStateChanged(auth, (user) => {
            setCurrentUser(user);
        });

        return () => unsub();
    }, []);

    const [myOrders, setMyOrders] = useState([]);
   
    useEffect(() => {
        
        if (currentUser) {
            const fetchMyOrders = async () => {
                try {
                    const q = query(collection(db, 'orders'), where('cusId', '==', currentUser.uid));
                    const snap = await getDocs(q);
                    const ordersData = snap.docs.map((doc) => ({
                        id: doc.id,
                        ...doc.data()
                    }));
                    setMyOrders(ordersData);
                    console.log('Fetched');
                } catch (e) {
                    console.log('Error occurred: ', e)
                }
            }

            fetchMyOrders();
        }
    }, [currentUser]);
    const toggleDetails = (orderId) => {
      setExpandedOrderId((prevExpandedOrderId) =>
        prevExpandedOrderId === orderId ? null : orderId
      );
    };
  
    return (
      <div classname="">
      <div className="bg-green-900 text-white">
        <AppBar pageName="My Orders" />
        <div className="container mx-auto mt-5 pb-5 p-5">
          {myOrders.map((order) => (
            <div
              key={order.id}
              className="border p-4 mb-4 rounded-md shadow-md bg-green-700 relative whitespace-pre-wrap">
              
            
              <div className="flex justify-between items-center pb-2 mb-2">
                <p className="text-xl font-semibold">
                  {order.custName} - ORDER ID: {order.id}
                </p>
                <button
                  className="text-white-500 cursor-pointer"
                  onClick={() => toggleDetails(order.id)}
                >
                  {expandedOrderId === order.id ? '∧ Hide Details' : '∨ Show Details'}
                </button>
              </div>
              {expandedOrderId === order.id && (
                <div>
                  <p className="text-lg">TOTAL PRICE: {order.price}</p>
                  <p classname="text-lg">PHONE: {order.phno}</p>
                  <p className="text-lg">ITEMS: {Array.isArray(order.items) ? order.items.join(', ') : order.items} </p>
                  <p className="text-lg">CALORIES: {order.calories}</p>
                  <p classname="text-lg">ADDRESS: {order.address}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
      </div>
    );
  };
  
  export default MyOrdersPage;