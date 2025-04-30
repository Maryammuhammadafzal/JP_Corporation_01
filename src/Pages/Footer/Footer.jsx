import React,{ useState , lazy , Suspense} from "react";
import Logo from "../../assets/Images/jplogo.png";

import Heading from "../../Components/Heading/Heading";
import { Link } from "react-router-dom";


const SocialIcons = React.lazy(()=> import("../../Components/SocialIcons/SocialIcons"))

const Footer = () => {
  return (
    <div className="w-full h-auto bg-gray-800 flex flex-col justify-center items-center ">
      <footer className="w-[95%] max-[360px]:w-full max-[360px]:h-auto max-[360px]:p-2 max-[360px]:items-center h-[400px] flex gap-3 max-md:flex-col max-md:h-auto max-md:items-start  justify-between items-center border-b border-gray-300 p-5">
        <div className="left w-1/2 max-md:w-full h-auto max-[360px]:flex-col flex gap-3 max-[360px]:items-center">
          <div className="logo w-[150px] h-[80px]  ">
            <img src={Logo} alt="jp logo" className="w-[80px] h-[80px]" />
          </div>
          <div className="tabs w-full flex-col h-auto flex gap-3 max-[360px]:items-center">
            <ul className="custom-bullet flex gap-3 space-x-5 text-white w-auto h-auto">
              <li className="w-fit h-fit  list-disc ">
                <Link to="/about" href="#" className="text-[16px] font-semibold">
                About us
                </Link>
              </li>
              <li className="w-fit h-fit  list-disc marker:border marker:border-orange-600 ">
                <Link to="/contact" href="#" className="text-[16px] font-semibold">
                  Contact
                </Link>
              </li>
            </ul>
            <ul className="custom-bullet flex gap-3 space-x-5 text-white w-auto h-auto">
              <li className="w-fit h-fit list-disc marker:border marker:border-orange-600 ">
                <Link to="/faq" href="#" className="text-[16px] font-semibold">
                  FAQ
                </Link>
              </li>
              <li className="w-fit h-fit list-disc marker:border marker:border-orange-600 ">
                <Link to="/bank" href="#" className="text-[16px] font-semibold">
                  Bank Details
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="right w-1/2 max-md:w-full flex justify-center text-white items-center h-auto">
        <div className=" w-[85%] max-md:w-[95%] max-[360px]:w-full max-[360px]:items-center flex flex-col justify-center h-auto gap-3">
        <div className="heading">
          <h2 className="text-3xl font-extrabold max-[560px]:text-2xl max-[360px]:text-xl text-white">
      JP CORPORATION 
      </h2>
          </div>
          <div className="contactDetails w-[350px] max-[360px]:w-full max-[360px]:items-center  tracking-wide flex flex-col flex-wrap h-auto">
            <p className="address w-[300px] text-[16px] max-[360px]:text-center max-[360px]:text-[14px] font-semibold">
              Ibaraki Prefecture, Omitama City, Hatori 261-17. Postal 319-0123
              Japan
            </p>
            <div className="flex gap-3 h-auto max-sm:flex-col max-[360px]:items-center max-sm:pt-3 w-full">
            <p className="address text-[16px] max-[360px]:text-[14px] font-semibold">
              Tel : +06-6264-0043
            </p>
            <p className="address text-[16px] max-[360px]:text-[14px] font-semibold">
              Fax : +06-6264-2093
            </p>
            </div>
          </div>
        </div>
        </div>
      </footer>
      <div className="copyright max-md:flex-col max-md:gap-5 max-md:p-5 flex justify-between max-[600px]:flex-col max-[600px]:gap-5 w-[95%] h-auto p-3 items-center">
      <p className="address text-white max-md:text-center max-[360px]:text-[14px] text-[16px] font-semibold">
              
Copyright Jpcorporation © 2024. All rights reserved.
            </p>
        <div className="SocialMedia text-white order-2 w-auto h-auto items-center max-[600px]:mt-3 max-[600px]:gap-4 max-[600px]:flex-col flex gap-3 ">
               <Suspense > <SocialIcons bg="gray-500"/></Suspense>
        </div>
       

      </div>
    </div>
  );
};

export default Footer;
