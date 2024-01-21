'use client'
import AppBar from "../../components/appbar";

import { useState, useEffect } from "react";
import { db, auth } from '@/firebase'
import { collection, getDocs, query, where } from "firebase/firestore"
import { onAuthStateChanged } from 'firebase/auth';

const MyOrdersPage = () => {
    const [currentUser, setCurrentUser] = useState(null);

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

    return (
        <div>
            <AppBar pageName="My Orders" />
            <div>{myOrders.map((order) => (
                <div key={order.id} className="pb-5">
                    <p className="">{order.custName}-{(order.cusId)}</p>
                    <p>Price-{order.price}  Calories-{order.calories}</p>
                    <p>Salad items-{order.items}</p>
                    
                </div>
            ))}</div>
        </div>
    )
    
}
export default MyOrdersPage