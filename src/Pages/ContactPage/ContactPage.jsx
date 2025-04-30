import React from "react";
import Navbar from "../../Components/Navbar/Navbar";
import Footer from "../Footer/Footer";
import Heading from "../../Components/Heading/Heading";
import ContactForm from "../../Components/ContactForm/ContactForm";
import { FaFacebookF } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { FaYoutube } from "react-icons/fa";

const ContactPage = () => {
  return (
    <div className="contact w-full h-auto flex flex-col overflow-x-hidden justify-center items-center">
      <div className="navbar w-full h-[120px]">
        <Navbar bg="gray-800" />
      </div>
      <div className="contact w-[95%] p-3  h-auto flex max-[900px]:flex-col max-md:w-full justify-center">
        <div className="contact-info w-1/2 max-[900px]:w-[90%] max-[360px]:p-0 p-3 h-auto flex flex-col ">
          <div className="heading my-3">
            <Heading text="Contact Us"/>
          </div>
          <div className="para w-full max-[360px]:w-full gap-5 max-[360px]:items-center  tracking-wide flex flex-col flex-wrap h-auto">
          <h2 className="text-3xl font-extrabold my-3 max-[560px]:text-2xl max-[360px]:text-xl">
              Get in Touch with us
            </h2>
            <p className="address w-full text-[18px] max-[1000px]:text-[16px] my-5 max-[1000px]:my-2  max-[500px]:text-[14px] max-[360px]:text-[12px] font-semibold">
              We appreciate you showing interest in JP Corporation! If you have
              any queries, remarks, or worries, we are available to help. We
              invite you to contact us using the details shown below, and we
              will be pleased to help you.
            </p>
           
          </div>
          <div className="contactTiming w-[90%] my-5 max-[1000px]:my-2 max-[360px]:w-full max-[360px]:items-center  tracking-wide flex flex-col flex-wrap h-auto">
            <p className="address w-full  text-[18px] max-[1000px]:text-[16px]   max-[360px]:text-[12px] max-[500px]:text-[14px] font-semibold">
              Hours of Customer Service: 9:00 AM to 5:00 PM (EST) Monday through
              Friday
            </p>
          </div>
          <div className="contactDetails w-[90%] my-5 max-[1000px]:my-2 max-[360px]:w-full max-[360px]:items-center  tracking-wide flex flex-col flex-wrap h-auto">
            <p className="address w-[450px] max-[1000px]:w-full text-[18px] max-[1000px]:text-[16px]   max-[360px]:text-[12px] max-[500px]:text-[14px] font-semibold">
              Ibaraki Prefecture, Omitama City, Hatori 261-17. Postal 319-0123
              Japan
            </p>
            <div className="flex gap-5 my-2 h-auto max-sm:flex-col max-[360px]:items-start max-sm:pt-3 w-full">
              <p className="address text-[18px] max-[1000px]:text-[16px]  max-[360px]:text-[12px] max-[500px]:text-[14px] font-semibold">
                Tel : +06-6264-0043
              </p>
              <p className="address text-[18px] max-[1000px]:text-[16px]  max-[360px]:text-[12px] max-[500px]:text-[14px] font-semibold">
                Fax : +06-6264-2093
              </p>
            </div>
          </div>

          <div className="socialIcon flex w-[90%] gap-4 my-5 max-[1000px]:my-2 max-[360px]:w-full max-[360px]:items-center  tracking-wide  flex-wrap h-auto">
            <div className="facebook shakeAnimation bg-blue-900 w-[60px] h-[60px] shadow-md rounded flex justify-center items-center ">
            <a class="elementor-icon elementor-social-icon elementor-social-icon-facebook elementor-animation-buzz elementor-repeater-item-1e94673" target="_blank">
																	<FaFacebookF  size={25} color="white"/>
																		</a>
            </div>
            <div className="twitter shakeAnimation bg-blue-500 w-[60px] h-[60px] shadow-md rounded flex justify-center items-center ">
            <a class=" bg-elementor-icon elementor-social-icon elementor-social-icon-twitter elementor-animation-buzz elementor-repeater-item-630529d" target="_blank">
            <FaXTwitter  size={25} color="white"/>
																		</a>
            </div>
            <div className="Youtube shakeAnimation bg-red-500 w-[60px] h-[60px] shadow-md rounded flex justify-center items-center ">
            <a class="elementor-icon elementor-social-icon elementor-social-icon-youtube elementor-animation-buzz elementor-repeater-item-d9cd114" target="_blank">
            <FaYoutube  size={25} color="white"/>
																		</a>
            </div>
          </div>
        </div>
        <div className="contact-form w-1/2 max-[900px]:w-full  max-[450px]:w-full p-3 max-[360px]:p-0 h-auto flex justify-center ">
        <ContactForm/></div>
      </div>
      <Footer />
    </div>
  );
};

export default ContactPage;
