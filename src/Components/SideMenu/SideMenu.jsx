import React, { useState } from "react";
import Logo from "../../assets/Images/jplogo.png";
import { Link } from "react-router-dom";

const SideMenu = ({state}) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div>
      {/* MENU ICON */}
      <div className="menuIcon cursor-pointer" onClick={toggleMenu}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="25"
          height="20"
          viewBox="0 0 28 21"
          className="vehica-menu-icon"
        >
          <g id="vehica-menu-svg" transform="translate(-11925 99)">
            <rect
              width="28"
              height="4.2"
              rx="1.5"
              transform="translate(11925 -99)"
              fill="#ff4605"
            ></rect>
            <rect
              width="19.6"
              height="4.2"
              rx="1.5"
              transform="translate(11925 -90.6)"
              fill="#ff4605"
            ></rect>
            <rect
              width="14"
              height="4.2"
              rx="1.5"
              transform="translate(11925 -82.2)"
              fill="#ff4605"
            ></rect>
          </g>
        </svg>
      </div>

      {/* SIDEBAR MENU */}
      <div
        className={`fixed top-0 left-0 h-full space-y-4 w-[350px] bg-gray-900 text-white shadow-lg transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300 ease-in-out z-50`}
      >
       <div className="logo flex justify-between bg-gray-800 items-center p-3 py-5 h-auto w-full">
         <img src={Logo} alt="jp logo" className="w-[40px] h-[40px] " />
         {/* Close Button */}
         <button
          className="cursor-pointer font-extrabold text-3xl text-orange-600"
          onClick={toggleMenu}
        >
          ✕
        </button>

       </div>
        {/* Menu Content */}
        <div className="p-2">
          <ul className="space-y-4">
            <li className="border-b w-full border-gray-700 p-3 font-bold text-xl">
              <Link to="/" href="#" className="hover:text-orange-500">
                Home
              </Link>
            </li>
            <li className="border-b w-full border-gray-700 p-3 font-bold text-xl">
              <Link to="/about" href="#" className="hover:text-orange-500">
                About
              </Link>
            </li>
            <li className="border-b w-full border-gray-700 p-3 font-bold text-xl">
              <Link to="/faq" href="#" className="hover:text-orange-500">
                FAQ
              </Link>
            </li>
            <li className="border-b w-full border-gray-700 p-3 font-bold text-xl">
              <Link to="/contact" href="#" className="hover:text-orange-500">
                Contact
              </Link>
            </li>
          </ul>
        </div>
      </div>

      {/* BACKDROP OVERLAY (optional) */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black opacity-40 z-40"
          onClick={toggleMenu}
        ></div>
      )}
    </div>
  );
};

export default SideMenu;
