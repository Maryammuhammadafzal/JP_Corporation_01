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
    try {
      const res = await axios.get("http://localhost:5000/api/carListing/get?page=1&limit=2" );
      const data = await res.data.data;
      setCards(data);
    } catch (error) {
      console.log("error", error.message);
    }
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
      {cards.map(({ _id, title, featured_image, availability, year , fuel_type , mileage , price, transmission }) => (
        <div
          key={_id}
          onClick={() => handleCardClick(_id)}
          className="card w-[400px] max-[1160px]:w-[48%]  max-[600px]:w-[95%] max-[360px]:w-full h-auto bg-gray-800 rounded-2xl text-white flex flex-col"
        >
          <div className="carImage relative overflow-hidden w-auto h-auto">
            <img
              src={`../../../../admin/public/uploads/${featured_image}`}
              className="cardImage relative max-[1160px]:h-[200px] max-[900px]:h-[230px] max-[600px]:h-[280px] w-full h-[200px] rounded-2xl"
              alt="Card image"
            />
            <span className="absolute top-[15px] -left-[30px] -rotate-45 w-[130px] text-center z-10 bg-green-600 py-[1vh] px-[1vw] text-white text-[12px]" >
              {availability}
            </span>
          </div>
          <div className="cardContent w-full h-auto flex flex-col">
            <div className="cardbody w-full h-auto flex p-4 gap-2 flex-col border-b border-b-gray-600 justify-center">
              <h3 id="carName" className="carName text-lg font-semibold tracking-wider ">
                {" "}
                {truncateText(title, 30)}{" "}
              </h3>
              <p className="carPrice font-extrabold text-2xl ">${price}</p>
            </div>
            <div className="cardfooter w-full h-auto flex p-4  items-center gap-5">
              <button className="w-fit h-fit py-2 px-3 font-semibold text-md text-white bg-orange-600 rounded-lg">
                {year}
              </button>
              <p className="miles text-gray-500">{mileage} miles</p>
              <p className="transmission text-gray-500">{transmission}</p>
              <p className="transmission text-gray-500">{fuel_type}</p>
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export default PopularCard;
