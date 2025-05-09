import React, { useState, useEffect } from "react";
import CardImage1 from "../../assets/Images/card_image1.jpeg";
import CardImage2 from "../../assets/Images/card_image2.jpeg";
import CardImage3 from "../../assets/Images/card_image3.jpg";
import CardImage4 from "../../assets/Images/card_image4.jpg";
import Button from "../Button/Button";
import { useNavigate } from "react-router-dom";
import axios from "axios";
// const apiUrl = import.meta.env.API_URL;
// console.log(apiUrl);

const Card = () => {
  const [cards, setCards] = useState([]);
  const navigate = useNavigate();

  const fetchCarData = async () => {
    try {
      const res = await axios.get(
        "http://localhost:5000/api/carListing/get?page=1&limit=4");
      const data = await res.data.data;
      setCards(data);
    } catch (error) {
      console.log("error", error.message);
    }
  };
  useEffect(() => {
    fetchCarData();
  }, []);

  const handleCardClick = (id) => {
    localStorage.setItem("cardId", id);
    navigate(`/listing/${id}`);
  };
  // Function to truncate text
  const truncateText = (text, maxLength) => {
    if (text?.length > maxLength) {
      return text.substring(0, maxLength) + "...";
    }
    return text;
  };

  return (
    <>
      {cards.map(
        ({
          _id,
          title,
          featured_image,
          availability,
          mileage,
          year,
          price,
          transmission,
          fuel_type,
        }) => (
          <div
            key={_id}
            onClick={() => handleCardClick(_id)}
            className="card w-[23%]  cursor-pointer max-[1160px]:w-[32%] max-[900px]:w-[46%] max-[600px]:w-[95%] max-[360px]:w-full h-auto bg-gray-800 rounded-2xl text-white flex flex-col"
          >
            <div className="carImage inline-block relative overflow-hidden w-auto h-auto">
              <img
                loading="lazy"
                src={`../../../../admin/public/uploads/${featured_image}`}
                className="cardImage cursor-pointer relative max-[1160px]:h-[200px] max-[900px]:h-[230px] max-[600px]:h-[280px] w-full h-[200px] rounded-2xl"
                alt="Card image"
              />
              <span
                className={`absolute top-[10px] -left-[45px] -rotate-45 w-[130px] text-center z-10 ${
                  availability === "Available"
                    ? "bg-green-600"
                    : "bg-red-600"
                } py-[5px] px-[1vw]  text-white text-[12px]`}
              >
                {availability === "Available" ? "Available" : "Sold"}
              </span>
            </div>
            <div className="cardContent w-full h-auto flex flex-col">
              <div className="cardbody w-full h-auto flex gap-1 p-4 flex-col border-b border-b-gray-600 justify-center">
                <h3
                  id="carName"
                  className="carName text-lg tracking-wider font-semibold"
                >
                  {truncateText(title, 25)}
                </h3>
                <p className="carPrice font-extrabold text-2xl">${price}</p>
              </div>
              <div className="cardfooter w-full h-auto flex p-4 text-sm items-center gap-5">
                <button className="w-fit h-fit py-1 px-2 font-semibold text-md text-white bg-orange-600 rounded-lg">
                  {year}
                </button>
                <p className="text-[12px] miles text-gray-500">{mileage} miles</p>
                <p className="text-[12px] transmission text-gray-500">{transmission}</p>
                <p className="text-[12px] transmission text-gray-500">{fuel_type}</p>
              </div>
            </div>
          </div>
        )
      )}
    </>
  );
};

export default Card;
