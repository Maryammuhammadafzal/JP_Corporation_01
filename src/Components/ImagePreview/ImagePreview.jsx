import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useState, useRef } from "react";
import { NextArrow, PrevArrow } from "../CustomArrow/CustomArrow"; 
const GalleryCarousel = ({ galleryImages = [] }) => {
  const [nav1, setNav1] = useState(null);
  const [nav2, setNav2] = useState(null);

  const slider1 = useRef(null);
  const slider2 = useRef(null);

  const mainSettings = {
    asNavFor: nav2,
    ref: (slider) => {
      setNav1(slider);
      slider1.current = slider;
    },
    fade: true,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
  };

  const thumbSettings = {
    asNavFor: nav1,
    ref: (slider) => {
      setNav2(slider);
      slider2.current = slider;
    },
    slidesToShow: 3,
    swipeToSlide: true,
    focusOnSelect: true,
    centerMode: true,
    dots: false,
  };

  return (
    <div className="carousel w-[60%] max-[1200px]:w-full h-fit rounded-lg flex flex-col p-3">
      {/* Main Image Slider with arrows */}
      <div className="relative w-full h-auto group">
        <Slider {...mainSettings} className="w-full">
          {galleryImages.map((image, index) => (
            <div key={index} className="relative w-full h-auto">
              <img
                src={`http://localhost:8800/${image}`}
                alt={image}
                className="w-full h-[500px] object-cover rounded-lg"
              />
            </div>
          ))}
        </Slider>
      </div>

      {/* Thumbnail Navigation */}
      <div className="mt-4">
        <Slider {...thumbSettings}>
          {galleryImages.map((image, index) => (
            <div key={index} className="px-1">
              <img
                src={`http://localhost:8800/${image}`}
                alt={`Thumb ${index}`}
                className="w-full opacity-50 hover:opacity-100 h-[150px] object-cover rounded-lg border-2 active:border-orange-600 border-gray-300 hover:border-orange-600 transition"
              />
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default GalleryCarousel;
