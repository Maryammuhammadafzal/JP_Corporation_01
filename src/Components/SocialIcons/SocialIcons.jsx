import React from 'react'
import { FaFacebookF } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { FaInstagram } from "react-icons/fa";

const SocialIcons = ({bg = "gray-200"}) => {
  const bgColor = bg === "gray-500" ? "bg-gray-500" : "bg-gray-200";
  return (
    <div className='w-auto flex gap-3'>
        <a href='#' title='facebook' className={` facebook rounded-full p-3 items-center ${bgColor}`}>
        <FaFacebookF/>
        </a>
        <a href='#' title='X' className={` twitter rounded-full p-3 items-center ${bgColor}`}><FaXTwitter/></a>
        <a href='#' title='Instagram' className={` instagram rounded-full p-3 items-center ${bgColor}`}><FaInstagram/></a>
    </div>
  )
}

export default SocialIcons
