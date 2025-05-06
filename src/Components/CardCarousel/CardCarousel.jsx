import React , {useRef , useState , useEffect} from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import PrevArrow from "../PrevArrow/PrevArrow";
import NextArrow from "../NextArrow/NextArrow";
import Button from "../Button/Button";
import { useNavigate } from "react-router-dom";

import axios from "axios";

const CardCarousel = () => {
    const [modalData, setModalData] = useState([]);
        const sliderRef = useRef(null);
 
  const [cardData, setCardData] = useState([]);
  const navigate = useNavigate();

  const fetchCarData = async()=> {
try {
   let res = await axios.get("http://localhost:5000/api/carListing/get?page=1&limit=10")
   const data = await res.data.data 
   setCardData(data)
} catch (error) {
   console.log("Error " , error.message);
   
}
  }
  useEffect( () => {
fetchCarData()
  }, []);

  const navigateToSearchPage = () => {
    navigate("/search")
  }

  // Fetch Models
  const fetchModalData = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/model/",);
      const data = await res.data;
      setModalData(data);
    } catch (error) {
      console.log("error", error.message);
    }
  };
  useEffect(() => {
    fetchModalData();
  }, []);

  
  const handleCardClick = (id)=>{
    localStorage.setItem("cardId" , id);
    navigate(`/listing/${id}`)
    window.scrollTo({ top: 0, behavior: 'smooth' });
   
    fetchCarData()

    setTimeout(()=>{
      window.location.reload()
    },1000)
    
}
  
  
  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 4, // how many cards to show at once
    slidesToScroll: 1,
    
    responsive: [
        {
                breakpoint: 1180, // Screen width at 1200px or below
                settings: {
                  slidesToShow: 3,
                  slidesToScroll: 1,
                  infinite: true,
                  dots: true,
                },
              },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

    // Function to truncate text
    const truncateText = (text, maxLength) => {
      if (text?.length > maxLength) {
        return text.substring(0, maxLength) + "...";
      }
      return text;
    };
  return (
    <div className="w-full p-3 max-[500px]:p-0 flex flex-col gap-3">
      <Slider ref={sliderRef} {...settings}>
          {cardData.map(({  _id, title, featured_image,  fuel_type , mileage , price, transmission, modelID }) => (
            <div key={_id} 
            onClick={() => handleCardClick(_id)} 
            className="px-3 max-[360px]:px-1">
              <div className="card w-full h-auto bg-gray-800 rounded-2xl shadow-lg text-black flex flex-col overflow-hidden">
                <div className="relative">
               
                  <img
                    loading="lazy"
                    src={`../../../../admin/public/uploads/${featured_image}`}
                    alt={title}
                    className="cardImage w-full h-[180px] object-cover"
                  />
                </div> 
                <div className="p-4">
                  <div className=" text-white text-md font-semibold">
                  {truncateText(title, 25)}
                  </div>
                  <p className="text-2xl font-extrabold text-orange-600">
                    ${price}
                  </p>
                  <div className="flex justify-start gap-5 text-gray-400 text-xs mt-2">
                    <span>{mileage}</span>
                    <span>{transmission}</span>
                    <span> {modalData.find(
                            (model) =>
                              String(model.model_id) === String(modelID)
                          )?.model || "Unknown"}</span>
                    <span>{fuel_type}</span>
                  </div>
                </div>
              </div>
            </div>
          )
        )}
        
      </Slider>
      <div className="btns flex justify-between p-4 max-[500px]:flex-col max-[500px]:items-center max-[500px]:w-full gap-3 w-full">
        <div className="flex gap-6 w-[80px]  max-[500px]:h-[70px] ml-4 max-[500px]:justify-center relative">
        <PrevArrow onClick={sliderRef?.current?.slickPrev}/> 
        <NextArrow onClick={sliderRef?.current?.slickNext}/>
        </div>
        <div className="button  max-[500px]:w-full">
<Button text="See a New Search" onClick={navigateToSearchPage}/>
        </div>
      </div>
    </div>
  );
};

export default CardCarousel;
