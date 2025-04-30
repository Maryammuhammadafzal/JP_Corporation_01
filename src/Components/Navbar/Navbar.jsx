import React, {useEffect , useState} from "react";
import Logo from "../../assets/Images/jplogo.png";
import SideMenu from "../SideMenu/SideMenu";
import { Link } from "react-router-dom";



const Navbar = ({bg}) => {
  const [isScrolled, setIsScrolled] = useState(false);

  // Handle the scroll event
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      if (scrollY > 50) { // You can adjust this value
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);

    // Cleanup on unmount
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const bgColor = bg === "gray-800" ? "bg-gray-800" : "bg-transparent";

  return (
    <>
      <nav  className={`w-full top-0 left-0 z-50 transition-all duration-200 justify-start max-[900px]:hidden min-[900px]:fixed flex items-center h-[100px]
        ${isScrolled ? 'fixed bg-white shadow-md text-gray-800' : `absolute ${bgColor}  text-white`}
      `}>
        <div className="logo w-[150px] mt-3 ml-3 h-[80px] ">
          <img src={Logo} alt="jp logo" className="w-[80px] h-[80px]" />
        </div>
        <div className="tabs w-auto h-[auto] flex justify-center items-center">
          <ul className="flex items-center justify-center gap-3  w-full h-auto">
            <li className="nav-tab relative group cursor-pointer w-fit h-fit p-3 m-3 hover:text-orange-600 active:text-orange-600 ">
         <span className="hoverBorder"></span>
              <Link to="/" className="text-[16px] font-semibold">
                Home
              </Link>
            </li>
            <li className="nav-tab relative group cursor-pointer  w-fit h-fit p-3 m-3 hover:text-orange-600 active:text-orange-600 ">
            <span className="hoverBorder"></span>
              <Link to="/about" className="text-[16px] font-semibold">
                About us{" "}
              </Link>
            </li>
            <li className="nav-tab relative group cursor-pointer  w-fit h-fit p-3 m-3 hover:text-orange-600 active:text-orange-600 ">
            <span className="hoverBorder"></span>
              <Link to="/faq" className="text-[16px] font-semibold">
                FAQ
              </Link>
            </li>
            <li className="nav-tab relative group cursor-pointer  w-fit h-fit p-3 m-3 hover:text-orange-600 active:text-orange-600 ">
            <span className="hoverBorder"></span>
              <Link to="/contact" className="text-[16px] font-semibold">
                Contact
              </Link>
            </li>
          </ul>
        </div>
      </nav>
      <nav 
      className={`w-full justify-start min-[900px]:hidden  flex items-center h-[120px] top-0 left-0 z-50 transition-all duration-300
        ${isScrolled ? 'fixed bg-white shadow-md text-gray-800' : `absolute ${bgColor}  text-white`}
      `}>
        <div className="tabs w-1/2 ml-5 h-[auto] flex items-center">
<SideMenu/>
        </div>
        <div className="logo w-1/2 mt-3 h-[80px] ">
          <img src={Logo} alt="jp logo" className="w-[80px] h-[80px] max-[900px]:w-[70px] max-[900px]:h-[70px] max-[560px]:w-[60px] max-[560px]:h-[60px] max-[360px]:w-[50px] max-[360px]:h-[50px]" />
        </div>
      </nav>
    </>
  );
};

export default Navbar;
