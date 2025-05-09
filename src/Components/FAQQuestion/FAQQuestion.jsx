import React, { useState } from 'react';
import DownArrowIcon from '../DownArrowIcon/DownArrowIcon';

const FAQQuestion = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div
      onClick={() => setIsOpen(!isOpen)}
      className="cursor-pointer w-[450px] max-[1020px]:w-[400px] max-[900px]:w-full bg-white border border-gray-400"
    >
      <div className="flex justify-between items-center p-5">
        <p className="w-[85%] text-md max-[350px]:text-[12px] max-[500px]:text-[14px]">
          {question}
        </p>
        <div className="w-[10%] flex justify-center">
          <DownArrowIcon isOpen={isOpen} />
        </div>
      </div>

      {isOpen && (
        <div className="px-5 pb-5 text-sm text-gray-700">
          {answer}
        </div>
      )}
    </div>
  );
};

export default FAQQuestion;
