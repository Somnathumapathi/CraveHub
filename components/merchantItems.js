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
        
<div class="border-l-4 fixed top-1/2 bottom-0 right-0 transform -translate-y-1/2 h-full w-1/4 flex flex-col items-center transition mt-4 mb-4 rounded-md">
<h1 class="text-2xl lg:text-3xl text-green-600 font-bold font-sans leading-loose text-4xl transform transition-transform hover:text-green-500 mb-4">
    My Items:</h1>
    
{merchantItems.map((item) => (
    <div key={item.id}>
        <p class="text-lg lg:font-semibold text-white leading-loose">{item.name}</p>
    </div>
))}
</div>
    )
}
export default MerchantItems