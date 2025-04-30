import React from 'react'
import DownArrowIcon from '../DownArrowIcon/DownArrowIcon';

const NextArrow = ({ onClick }) => {
        return (
          <div
            className="absolute right-[-20px] top-1/2  -rotate-90 hover:text-white text-[12px] transform -translate-y-1/2 bg-gray-200 text-black p-4 rounded-full cursor-pointer z-10 hover:bg-gray-800 transition"
            onClick={onClick}
          >
         <DownArrowIcon/>
          </div>
        );
      };

export default NextArrow
