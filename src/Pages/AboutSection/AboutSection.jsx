import React from 'react'
import Heading from '../../Components/Heading/Heading'
import AboutCard from '../../Components/AboutCard/AboutCard'
const AboutSection = () => {
  return (
        <div className="w-full  min-h-screen bg-white flex  justify-center flex-col items-center">
        <div className="w-[95%] max-[1100px]:w-[98%] min-h-screen gap-5 bg-white flex justify-center items-center flex-col ">
        <div className="headings w-full h-auto items-center justify-center flex p-4  gap-3">
          <Heading text="Why Choose Us?" />
        </div>
  <div className="cardSection w-[90%] my-8 max-[600px]:my-4 max-[1200px]:w-full h-auto gap-3 flex justify-center items-center flex-wrap">
  <AboutCard/>
  </div>
 
        </div>
      </div>
  )
}

export default AboutSection
