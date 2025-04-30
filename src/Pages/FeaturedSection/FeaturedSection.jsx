import React from "react";
import Heading from "../../Components/Heading/Heading";
import Card from "../../Components/Card/Card";
import SocialIcons from "../../Components/SocialIcons/SocialIcons";
import Button from "../../Components/Button/Button";
import { useNavigate } from "react-router-dom";
const FeaturedSection = () => {
let navigate = useNavigate()

  let veiwAllCars = () => {
    navigate("/search")
  }
  return (
    <div className="w-full  min-h-screen bg-white flex  justify-center flex-col items-center">
      <div className="w-[95%] max-[900px]:w-[98%] min-h-screen bg-white flex justify-center items-center flex-col ">
      <div className="headings w-full h-auto max-[1160px]:items-center   flex-col flex p-4  gap-3">
        <h5 className="subheading text-xl text-orange-600 ">Handly Picked</h5>
        <Heading text="Featured Listings" />
      </div>
<div className="cardSection w-full my-8 max-[600px]:my-4 h-auto gap-4 max-[600px]:justify-center flex justify-start items-center flex-wrap">
<Card/>
</div>
<div className="viewSection flex justify-between max-[600px]:flex-col max-[600px]:gap-5 max-[600px]:mt-0  mt-3 w-full h-auto p-3 items-center">
        <div className="SocialMedia max-[600px]:order-2 w-auto h-auto items-center max-[600px]:mt-3 max-[600px]:gap-4 max-[600px]:flex-col flex gap-3 ">
                <p className="text-xl text-gray-400">Follow Us:</p>
                <SocialIcons/>

        </div>
        <div className="viewButton max-[600px]:w-full">
                <Button text="View All" onClick={veiwAllCars}/>
        </div>
</div>
      </div>
    </div>
  );
};

export default FeaturedSection;
