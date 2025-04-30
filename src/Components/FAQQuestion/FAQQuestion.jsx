import React from 'react'
import DownArrowIcon from '../DownArrowIcon/DownArrowIcon'

const FAQQuestion = () => {
  return (
        <div className="flex justify-between items-center p-5 max-[900px]:w-full w-[450px] max-[1020px]:w-[400px] bg-white h-auto border border-gray-400">
        <p className="question w-[85%] h-auto text-md max-[350px]:text-[12px] max-[500px]:text-[14px]">
                What is the purpose of the website?
        </p>
        <div className="w-[10%] flex justify-center h-auto">
             <DownArrowIcon/>   
        </div>
  </div>
  )
}

export default FAQQuestion
