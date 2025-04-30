import React from 'react'
import HeroSection from '../HeroSection/HeroSection'
import HomeSection from '../HomeSection/HomeSection'
import FeaturedSection from '../FeaturedSection/FeaturedSection'
import PopularSection from '../PopularSection/PopularSection'
import AboutSection from '../AboutSection/AboutSection'
import Footer from '../Footer/Footer'

const Home = () => {
  return (
    <div className='Home w-full min-h-screen flex flex-col overflow-x-hidden justify-center items-center'>
        <HomeSection/>
        <FeaturedSection/>
        <PopularSection/>
        <AboutSection/>
        <Footer/>
      
    </div>
  )
}

export default Home
