import React from "react";
import Heading from "../../Components/Heading/Heading";
import Navbar from "../../Components/Navbar/Navbar";
import Footer from "../Footer/Footer";
import Button from "../../Components/Button/Button";
import ProductPreview from "../../Components/ProductPreview/ProductPreview";

const CardPage = () => {
  return (
        <div className="about w-full min-h-screen flex flex-col overflow-x-hidden justify-center items-center">
        <div className="navbar w-full h-[120px]">
          <Navbar bg="gray-800" />
        </div>
        <div className="main w-full">
                <ProductPreview/>
        </div>
        <Footer />
      </div>
  )
}

export default CardPage
