    'use client'
    import { useState } from 'react';
    import {db} from '@/firebase'
    import { collection, addDoc, onSnapshot, setDoc, doc, deleteDoc } from 'firebase/firestore'
    import Item from '../../models/item';

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
        <h1>Add Item</h1>
        <label>Name:</label>
        <input className='text-black' type="text" value={itemName} onChange={(e) => setItemName(e.target.value)} />
        <br />
        <label>Category:</label>
        <select className='text-black' value={itemCategory} onChange={(e) => setItemCategory(e.target.value)}>
            <option >Select category</option>
            <option value="veg">Veg</option>
            <option value="non-veg">Non-Veg</option>
            <option value="egg">Egg</option>
        </select>
        <br />
        <label>Price:</label>
        <input className='text-black' type="number" value={itemPrice} onChange={(e) => setItemPrice(e.target.value)} />
        <br />
        <label>Carbs:</label>
        <input className='text-black' type="number" value={itemCarb} onChange={(e) => setItemCarb(e.target.value)} onKeyUp={calculateCalories} />
        <br />
        
        <label>Protein:</label>
        <input className='text-black' type="number" value={itemProtein} onChange={(e) => setItemProtein(e.target.value)} onKeyUp={calculateCalories} />
        <br />
        
        <label>Fats:</label>
        <input className='text-black' type="number" value={itemFat} onChange={(e) => setItemFat(e.target.value)} onKeyUp={calculateCalories} />
        <br />
        <label>Calories:</label>
        <input className='text-black' type="number" value={itemCalorie} onChange={(e) => setItemCalorie(e.target.value)}
         />
        <br />
        <button onClick={addItem}>Add Item</button>
        
        </div>
        
    );
    }
    export default AddItemPage;