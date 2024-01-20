import React, { useState, useRef } from 'react';
import { BiInfoCircle } from 'react-icons/bi';

const InfoToolTip = ({ content }) => {
  const [isHovered, setIsHovered] = useState(false);
  const timeoutRef = useRef(null);

  const handleMouseEnter = () => {
    clearTimeout(timeoutRef.current);
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setIsHovered(false);
    }, 2500);
  };

  return (
    <div className="relative inline-block ml-2">
      <BiInfoCircle
        className="text-green-500 cursor-pointer"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      />
       <div
        className={`${
          isHovered ? 'block' : 'hidden'
        } absolute bg-slate-600 p-4 rounded-md shadow-md text-sm -left-1/2 transform -translate-x-1/2 -top-12 opacity-100 pointer-events-auto transition-opacity duration-300 w-96`}
      >
          {content}
        </div>
      
    </div>
  );
};

export default InfoToolTip;
