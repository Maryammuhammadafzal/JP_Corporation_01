import React, { useState } from "react";
import Navbar from "../../Components/Navbar/Navbar";
import { IoSearch } from "react-icons/io5";
import HeroSection from "../HeroSection/HeroSection";


const HomeSection = () => {
  return (
        <div className="relative w-full h-auto flex  flex-col">
        <div className="bgImage w-full min-h-screen max-[572px]:h-[850px] max-[360px]:h-[1000px] object-cover"></div>
        <div className="main absolute top-0 left-0 w-full min-h-screen">
          <section className="w-full h-auto flex  flex-col">
            <div className="navbar w-full h-[100px] flex p-4 justify-start items-center">
              <Navbar />
            </div>
            <div className="heroSection w-full min-h-[600px] flex  justify-center items-center">
            <HeroSection/>
            </div>
          </section>
        </div>
      </div>
  )
}

export default HomeSection
