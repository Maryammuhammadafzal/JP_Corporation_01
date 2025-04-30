import React , {useState , useEffect} from "react";
import CardImage1 from "../../assets/Images/card_image1.jpeg";
import CardImage2 from "../../assets/Images/card_image2.jpeg";
import CardImage3 from "../../assets/Images/card_image3.jpg";
import CardImage4 from "../../assets/Images/card_image4.jpg";
import Button from "../Button/Button";
import { useNavigate } from "react-router-dom";
import axios from "axios";


const PopularCard = () => {

  const [cards, setCards] = useState([]);
  const navigate = useNavigate();

  const fetchCarData = async()=> {
   let res = await axios.get("/api/dashboard?page=1&limit=2")
    .then((res) => setCards(res.data))
    .catch((err) => console.error(err));
  }
  useEffect( () => {
fetchCarData()
  }, []);
  
  console.log(cards);
  // Function to truncate text
  const truncateText = (text, maxLength) => {
    if (text?.length > maxLength) {
      return text.substring(0, maxLength) + "...";
    }
    return text;
  };


  const handleCardClick = (id)=>{
    navigate(`/listing/${id}`)
    
  }
  
  return (
    <>
      {cards.map(({ _id, carTitle, featuredImage, carAvailability, carYear , carFuelType , carMileage , carPrice, carTransmission, carModel }) => (
        <div
          key={_id}
          onClick={() => handleCardClick(_id)}
          className="card w-[400px] max-[1160px]:w-[48%]  max-[600px]:w-[95%] max-[360px]:w-full h-auto bg-gray-800 rounded-2xl text-white flex flex-col"
        >
          <div className="carImage relative overflow-hidden w-auto h-auto">
            <img
              src={`http://localhost:8800/${featuredImage}`}
              className="cardImage relative max-[1160px]:h-[200px] max-[900px]:h-[230px] max-[600px]:h-[280px] w-full h-[200px] rounded-2xl"
              alt="Card image"
            />
            <span className="absolute top-[15px] -left-[30px] -rotate-45 w-[130px] text-center z-10 bg-green-600 py-[1vh] px-[1vw] text-white text-[12px]" >
              {carAvailability}
            </span>
          </div>
          <div className="cardContent w-full h-auto flex flex-col">
            <div className="cardbody w-full h-auto flex p-4 gap-2 flex-col border-b border-b-gray-600 justify-center">
              <h3 id="carName" className="carName text-lg font-semibold tracking-wider ">
                {" "}
                {truncateText(carTitle, 30)}{" "}
              </h3>
              <p className="carPrice font-extrabold text-2xl ">${carPrice}</p>
            </div>
            <div className="cardfooter w-full h-auto flex p-4  items-center gap-5">
              <button className="w-fit h-fit py-2 px-3 font-semibold text-md text-white bg-orange-600 rounded-lg">
                {carYear}
              </button>
              <p className="miles text-gray-500">{carMileage} miles</p>
              <p className="transmission text-gray-500">{carTransmission}</p>
              <p className="transmission text-gray-500">{carFuelType}</p>
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export default PopularCard;
