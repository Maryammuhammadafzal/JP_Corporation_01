import React from 'react';
import { FaChevronDown } from 'react-icons/fa';

const DownArrowIcon = ({ isOpen }) => {
  return (
    <FaChevronDown
      className={`transition-transform duration-300 ${isOpen ? 'rotate-180' : 'rotate-0'}`}
    />
  );
};

export default DownArrowIcon;
