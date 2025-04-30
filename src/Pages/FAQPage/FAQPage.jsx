import React from 'react'
import Navbar from "../../Components/Navbar/Navbar";
import Footer from "../Footer/Footer";
import Heading from "../../Components/Heading/Heading";
import FAQQuestion from '../../Components/FAQQuestion/FAQQuestion';
import Button from '../../Components/Button/Button';
import { useNavigate } from 'react-router-dom';


const FAQPage = () => {
 
  const navigate = useNavigate()

  const HandleLearnMoreClick = ()=>{
    navigate('/about')
  }
  return (
        <div className="faq w-full min-h-screen flex flex-col overflow-x-hidden gap-5 justify-center items-center">
        <div className="navbar w-full h-[120px]">
          <Navbar bg="gray-800" />
        </div>
        <div className="faq w-[90%] max-[1150px]:w-[95%] max-[1020px]:w-[98%] h-auto flex items-center flex-col bg-gray-200 justify-center p-5 rounded-xl gap-5">
              <div className="headings w-full h-auto max-[1160px]:items-center text-center justify-center flex p-4  gap-3">
                <Heading text="Frequently Asked Questions" />
              </div>
          <div className="aboutcontent max-[1150px]:w-full w-[95%] h-auto justify-evenly items-center flex flex-wrap gap-3">
         <FAQQuestion/>
         <FAQQuestion/>
         <FAQQuestion/>
         <FAQQuestion/>
         <FAQQuestion/>
         <FAQQuestion/>
         <FAQQuestion/>
         <FAQQuestion/>
          </div>
          <div className="button w-full h-auto flex justify-center items-center p-5">
<Button text="Learn more" onClick={HandleLearnMoreClick}/>
          </div>
        </div>
        <Footer />
      </div>
  )
}

export default FAQPage
