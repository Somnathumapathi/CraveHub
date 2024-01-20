'use client'
import { collection, getDocs } from "firebase/firestore"
import { db } from '@/firebase'
import { useEffect, useState } from "react"


const MerchantItems = () => {
const [merchantItems, setMerchantitems] = useState([])

useEffect(() => {
    const fetchMerchantItems = async () => {
        try {
            const snap = await getDocs(collection(db, 'items'));
            const merchItemData = snap.docs.map((doc) => ({
                id: doc.id,
                ...doc.data()
                
            }));
            setMerchantitems(merchItemData)
        } catch (e) {
            console.log('Error occured: ', e)
        }
    }; fetchMerchantItems()
},[])
    return (
<div>
    <h1>My Items:</h1>
    
{merchantItems.map((item) => (
    <div key={item.id}>
        <p>{item.name}</p>
    </div>
))}
</div>
    )
}
export default MerchantItems