'use client'
import { useState } from 'react';
import {db} from '@/firebase'
import { collection, addDoc, onSnapshot, setDoc, doc, deleteDoc } from 'firebase/firestore'
import Item from '../../models/item';
import AppBar from '@/components/appbar';

const AddItemPage = () => {
    const [itemName, setItemName] = useState('');
    const [itemCategory, setItemCategory] = useState('');
    const [itemPrice, setItemPrice] = useState('');
    const [itemCarb, setItemCarb] = useState('');
    const [itemProtein, setItemProtein] = useState('');
    const [itemFat, setItemFat] = useState('');
    const [itemCalorie, setItemCalorie] = useState('');
    const calculateCalories = () => {                
        const calories = (itemCarb * 4) + (itemProtein * 4) + (itemFat * 8);
        const caloriesAsString = calories.toString();
        setItemCalorie(caloriesAsString);
        
      };
    
    const addItem = async (e) => {
        // console.log('button clicked')
        
        e.preventDefault();
        try{
            calculateCalories();    
            const newItem = new Item(itemName, itemCategory, itemPrice, itemCalorie, itemCarb, itemProtein, itemFat);
            
            const docRef = await addDoc(collection(db, 'items'), {
                name: newItem.name,
        category: newItem.category,
        price: newItem.price,
        carb: newItem.carb,
        protein: newItem.protein,
        fat: newItem.fat,
        calorie: newItem.calorie
            });
            console.log('reached here', docRef)
        //     await firestore.collection('items').add({
        //         name: newItem.name,
        // category: newItem.category,
        // price: newItem.price,
        // carb: newItem.carb,
        // protein: newItem.protein,
        // fat: newItem.fat,
        // calorie: newItem.calorie
        //     });
            setItemName('');
            setItemCategory('');
            setItemPrice('');
            setItemCalorie('');
            setItemCarb('');
            setItemProtein('');
            setItemFat('');
            console.log('Item added successfully!');
        } catch (error) {
            console.error('Error adding item:', error);
        }
        
    }
    return (
        <div>
            <AppBar/>
            <center className='flex flex-col items-center'>
            <div className='box-content h-120 w-1/3 m-12 bg-slate-300/75 rounded-lg text-left'>
                <h1 className='text-3xl p-6 text-center font-bold text-green-600'>New Menu Item</h1>
             <table>
                <tbody>
                <tr>
                <td>
                    <label className='pl-8 p-3'>Name:</label>
                </td>
                <td>
                    <input className='ml-5 m-1 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2.5
                    dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500' 
                    value={itemName} onChange={(e) => setItemName(e.target.value)} />
                 </td>
                </tr>
                <tr>
                <td>
                    <label className='pl-8 p-4'>Category:</label>
                </td>
                <td>
                    <select className='ml-5 m-1 w-max bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2.5
                    dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500' value={itemCategory} onChange={(e) => setItemCategory(e.target.value)}>
                    <option >Select category</option>
                    <option value="veg">Veg</option>
                    <option value="non-veg">Non-Veg</option>
                    <option value="egg">Egg</option>
                    </select>
                </td>
            </tr>
            <tr>
                <td>
                    <label className='pl-8 p-4'>Price:</label>
                </td>
                <td>
                    <input className='ml-5 m-1 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2.5
                    dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500' type="number" value={itemPrice} onChange={(e) => setItemPrice(e.target.value)} />
                </td>
            </tr>
            <tr>
                <td>
                    <label className='pl-8 p-4'>Carbs:</label>
                </td>
                <td>
                <input className='ml-5 m-1 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2.5
                    dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500' type="number" value={itemCarb} onChange={(e) => setItemCarb(e.target.value)} onKeyUp={calculateCalories} />
                </td>
            </tr>
            <tr>
                <td>
                    <label className='pl-8 p-4'>Protein:</label>
                </td>
                <td>
                    <input className='ml-5 m-1 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2.5
                    dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500' type="number" value={itemProtein} onChange={(e) => setItemProtein(e.target.value)} onKeyUp={calculateCalories} />
                </td>
            </tr>
            <tr>
                <td>
                    <label className='pl-8 p-4'>Fats:</label>
                </td>
                <td>
                    <input className='ml-5 m-1 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2.5
                    dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500' type="number" value={itemFat} onChange={(e) => setItemFat(e.target.value)} onKeyUp={calculateCalories} />
                </td>
            </tr>
            <tr>
                <td>
                    <label className='pl-8 p-4'>Calories:</label>
                </td>
                <td>
                    <input className='ml-5 m-1 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2.5
                    dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500' type="number" value={itemCalorie} onChange={(e) => setItemCalorie(e.target.value)}/>
                </td>
            </tr>
            </tbody>
            </table> 
            <div className='flex flex-col items-center'>
            <button className="bg-green-500 hover:bg-green-600 p-3 mt-2 mb-4 text-white rounded-full" onClick={addItem}>Add Item</button>
            </div>
            </div>         
            </center>
            </div>
    );
}
export default AddItemPage;