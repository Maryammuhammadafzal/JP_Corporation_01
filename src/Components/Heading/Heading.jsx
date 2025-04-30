import React from 'react'

const Heading = ({text}) => {
  return (
        <h2 className="text-5xl font-extrabold max-[550px]:text-4xl max-[360px]:text-3xl text-gray-800 max-[900px]:text-5xl">
       {text}
      </h2>
  )
}

export default Heading
