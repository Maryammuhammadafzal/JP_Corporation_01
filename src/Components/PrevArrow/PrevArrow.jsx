import React from 'react'
import DownArrowIcon from '../DownArrowIcon/DownArrowIcon';

const PrevArrow = ({ onClick }) => {
        return (
          <div
            className="absolute left-[-20px] top-1/2 rotate-90 transform -translate-y-1/2 bg-gray-200 text-black p-4 rounded-full cursor-pointer z-10 hover:bg-gray-800 hover:text-white transition"
            onClick={onClick}
          >
          <DownArrowIcon/>
          </div>
        );
      };
      

export default PrevArrow
