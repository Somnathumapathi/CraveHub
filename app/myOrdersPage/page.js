'use client'
import AppBar from "../../components/appbar";

import { useState, useEffect } from "react";
import { db, auth } from '@/firebase'
import { collection, getDocs, where } from "firebase/firestore"
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
                    const snap = await getDocs(collection(db, 'orders'), where('cusId', '==', currentUser.uid));
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
                <div key={order.id}>
                    <p className="">{order.custName}</p>
                </div>
            ))}</div>
        </div>
    )
    
}
export default MyOrdersPage