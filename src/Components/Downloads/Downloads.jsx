import React from 'react'
import { useLocation , useParams } from 'react-router-dom'
const Downloads = () => {
        const filename = useParams().filename
        const filePath = useParams().filepath
        
        const location = useLocation()

  return (
    <div className='w-full bg-gray-100 h-screen flex justify-center items-center p-6'>
      <img src={`/api/uploads/${filename}`} alt={filePath} className='w-auto h-auto'/>
    </div>
  )
}

export default Downloads
