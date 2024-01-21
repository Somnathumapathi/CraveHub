'use client'
import FloatingAB from "@/components/floatingab"
import MerchantOrders from "../../components/merchantOrders"
import MerchantItems from "../../components/merchantItems"
import { auth } from '@/firebase';
import { signOut } from 'firebase/auth';


const MerchantPage = () => {
    const handleLogout = async () => {
        try {
          await signOut(auth);
          console.log('User signed out successfully!');
          window.location.href = '/merchantLogin';
        } catch (error) {
          console.error('Error signing out:', error.message);
        }
      };
    return (
        <div>
            <div className=" pt-3">
            <h1 className="flex items-center justify-center text-4xl font-bold w-3/4 pl-2 duration-300 text-green-600 hover:text-green-500 mb-4">Merchant Page</h1></div>
        <MerchantOrders/>
        <MerchantItems/>
        <button onClick={handleLogout} className="text-white hover:bg-green-700 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 ml-4">Logout</button>
            <FloatingAB text={"Add Item"} navPage={"additemPage"}/>
        </div>

    )
}
export default MerchantPage