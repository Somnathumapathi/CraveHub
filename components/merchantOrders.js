'use client'
import { useState, useEffect } from "react";
import { db } from '@/firebase'
import { collection, getDocs } from "firebase/firestore"



const MerchantOrders = () => {
    const [orders, setOrders] = useState([])
useEffect(() => {
    const fetchOrders = async () => {
try{
    const snap = await getDocs(collection(db, 'orders'));
    const ordersData = snap.docs.map((doc) => ({
        id: doc.id,
        ...doc.data()
    }));
    setOrders(ordersData)
    console.log('Fetched')
} catch (e) {
    console.log('Error occured: ', e)
}
    } 
    fetchOrders()
}, [])

    return (
        <div className="pb-3">
            <h1>Orders: </h1>
            {orders.map((order) => (
                <div  key={order.id} className="pt-2">
                <div className="bg-green-600 ">
                    <p>Customer Name: {order.custName}</p>
                    <p>Items: {order.items.join(', ')}</p>
                </div>
                
                </div>
                
            ))}
            
        
        </div>
    )
}
export default MerchantOrders;