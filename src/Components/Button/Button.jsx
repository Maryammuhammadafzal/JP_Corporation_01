import React from 'react'

const Button = ({text , onClick , type="button"}) => {
  return (
    <button className='w-fit max-[600px]:w-full h-fit py-3 px-5 font-semibold text-lg text-white bg-orange-600 rounded-xl cursor-pointer' onClick={onClick} type={type}>{text}</button>
  )
}

export default Button
