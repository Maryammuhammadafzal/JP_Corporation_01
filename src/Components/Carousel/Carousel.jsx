import React from "react";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import Car1 from "../../assets/Images/car1.jpg"
import Car2 from "../../assets/Images/car2.jpg"
import Car3 from "../../assets/Images/car6.jpg"
import Car4 from "../../assets/Images/car4.jpg"
import Car5 from "../../assets/Images/car5.jpg"

const Carousel = () => {
  const settings = {
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    speed: 500,
    autoplaySpeed: 2000,
  };

  return (
    <div className="w-full mx-auto ">
      <Slider {...settings} >
      <div className="relative w-full h-[400px] overflow-hidden rounded-lg">
  {/* Background Image */}
  <img
    src={Car1}
    alt="Slider Image"
    className="w-full h-full object-cover"
  />

  {/* Overlay */}
  <div className="absolute inset-0 bg-black opacity-30"></div>

  {/* Text Content */}
  <div className="absolute inset-0 flex flex-col justify-center items-center text-center px-4">
    <h2 className="text-white text-5xl font-extrabold mb-2">Bank Details</h2>
  </div>
</div>
<div className="relative w-full h-[400px] overflow-hidden rounded-lg">
  {/* Background Image */}
  <img
    src={Car2}
    alt="Slider Image"
    className="w-full h-full object-cover"
  />

  {/* Overlay */}
  <div className="absolute inset-0 bg-black opacity-30"></div>

  {/* Text Content */}
  <div className="absolute inset-0 flex flex-col justify-center items-center text-center px-4">
    <h2 className="text-white text-5xl font-extrabold mb-2">Bank Details</h2>
  </div>
</div>
<div className="relative w-full h-[400px] overflow-hidden rounded-lg">
  {/* Background Image */}
  <img
    src={Car3}
    alt="Slider Image"
    className="w-full h-full object-cover"
  />

  {/* Overlay */}
  <div className="absolute inset-0 bg-black opacity-30"></div>

  {/* Text Content */}
  <div className="absolute inset-0 flex flex-col justify-center items-center text-center px-4">
    <h2 className="text-white text-5xl font-extrabold mb-2">Bank Details</h2>
  </div>
</div>
<div className="relative w-full h-[400px] overflow-hidden rounded-lg">
  {/* Background Image */}
  <img
    src={Car4}
    alt="Slider Image"
    className="w-full h-full object-cover"
  />

  {/* Overlay */}
  <div className="absolute inset-0 bg-black opacity-30"></div>

  {/* Text Content */}
  <div className="absolute inset-0 flex flex-col justify-center items-center text-center px-4">
    <h2 className="text-white text-5xl font-extrabold mb-2">Bank Details</h2>
  </div>
</div>
<div className="relative w-full h-[400px] overflow-hidden rounded-lg">
  {/* Background Image */}
  <img
    src={Car5}
    alt="Slider Image"
    className="w-full h-full object-cover"
  />

  {/* Overlay */}
  <div className="absolute inset-0 bg-black opacity-30"></div>

  {/* Text Content */}
  <div className="absolute inset-0 flex flex-col justify-center items-center text-center px-4">
    <h2 className="text-white text-5xl font-extrabold mb-2">Bank Details</h2>
  </div>
</div>
      </Slider>
    </div>
  );
};

export default Carousel;
