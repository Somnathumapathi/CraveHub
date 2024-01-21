
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
        <div className="pb-3   ml-4 mr-4">
        <h1 className="flex items-center justify-center text-4xl text-white font-bold w-3/4 hover:text-red-500 mb-2">Orders</h1>
        {orders.map((order) => (
            <div  key={order.id} className="pt-2  w-3/4">
            <div className="pt-2 transform transition-transform bg-green-900 rounded-md pl-4">

            <p className="font-bold font-sans hover:text-red-300">CUSTOMER NAME:  {order.custName} | ORDER ID:   {order.id}</p>
                <div className="text-gray-300 font-semibold font-sans">
                <p className="">Items: {order.items.join(', ')}</p>
                <p>Total Price:{order.price}</p>
                <p>Contact:{order.tlno}</p>
                <p>Address:{order.address}</p>
                </div>
            </div>
            
            </div>
            
        ))}
        
    
    </div>
    )
}
export default MerchantOrders;