import React from "react";
import Heading from "../../Components/Heading/Heading";
import PopularCard from "../../Components/PopularCard/PopularCard";
import SocialIcons from "../../Components/SocialIcons/SocialIcons";
import Button from "../../Components/Button/Button";
import { useNavigate } from "react-router-dom";

const PopularSection = () => {
  let navigate = useNavigate()

  let veiwAllCars = () => {
    navigate("/search")
  }
  return (
    <div className="w-full  min-h-screen bg-gray-100 flex  justify-center flex-col items-center">
      <div className="w-[95%] max-[900px]:w-[98%] min-h-screen bg-gray-100 flex justify-center items-center flex-col ">
      <div className="headings w-full h-auto max-[1160px]:items-center   flex-col flex p-4  gap-3">
        <Heading text="Popular Makes" />
      </div>
<div className="cardSection w-full my-8 max-[700px]:my-4 h-auto gap-2 max-[700px]:justify-center flex justify-start items-center flex-wrap">
<PopularCard/>
</div>
<div className="viewSection flex justify-end max-[768px]:justify-center max-[700px]:gap-5 max-[700px]:mt-0  mt-3 w-full h-auto p-3 items-center">
        <div className="viewButton max-[700px]:w-full">
                <Button text="View All"  onClick={veiwAllCars}/>
        </div>
</div>
      </div>
    </div>
  );
};

export default PopularSection;
