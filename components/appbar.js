import React from 'react';

const AppBar = () => {
    return (
    <nav>
        <div className="bg-gray-800 p-6" >
            <a className="text-3xl py-4 pr-4 font-bold text-green-700 align-middle" href="homePage"><span className='text-green-600'>Crave</span>Hub</a>
            <a className="text-white p-4 align-middle" href="homePage">Home</a>
            <a className="text-white p-4 align-middle" href="orderPage">Order</a>
            <a className="text-white p-4 align-middle" href="myOrdersPage">My Orders</a>
            <a className="text-white p-1 float-right align-middle" href="/">Log out</a>
            </div>
    </nav>
    );
};

export default AppBar;