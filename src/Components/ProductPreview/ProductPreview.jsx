import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { FaFacebookF } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import SideCarImage from "../../assets/Images/side_car_image.png";
import Carfax_logo from "../../assets/Images/carfax_logo.png";
import Paypal_logo from "../../assets/Images/paypal_logo.png";
import Jpg from "../../assets/Images/jpg.svg";
import Button from "../../Components/Button/Button";
import CardCarousel from "../CardCarousel/CardCarousel";
import { FaEnvelope } from "react-icons/fa";
import axios from "axios";
import ImagePreview from "../ImagePreview/ImagePreview";

import SendButton from "../SendButton/SendButton";

const ProductPreview = () => {
  let cardId = localStorage.getItem("cardId");
  const [cardData, setCardData] = useState([]);

  // Fetch car data on mount
  useEffect(() => {
    const fetchCar = async () => {
      try {
        const res = await axios.get(
          `http://localhost:8800/api/dashboard/get/${cardId}`
        );
        const car = await res.data;
        console.log(car);
        setCardData(car);
      } catch (err) {
        console.error(err);
      }
    };
    fetchCar();
  }, [cardId]);

  console.log(cardData);;


  return (
    <div className="bg-white w-full">
      <div className=" pt-3 max-[1200px]:flex-col flex w-full rounded-lg">
        <div className="min-[1200px]:hidden p-3">
          <h1 className="min-[500px]:text-4xl font-semibold tracking-wide text-gray-900  max-[500px]:text-2xl  max-[360px]:text-2xl">
            {cardData.carTitle}
          </h1>
        </div>

        {/* <!-- Options --> */}
        <div className="min-[1200px]:hidden  max-[500px]:my-0 p-3   border-b border-gray-400 ">
          <div className="flex  max-[500px]:my-1 gap-5">
            <li className="text-lg  max-[360px]:text-[14px]  max-[500px]:text-[16px] marker:text-orange-600  tracking-tight text-gray-400">
              {cardData.carModel}
            </li>
            <li className="text-lg  max-[360px]:text-[14px]  max-[500px]:text-[16px]  marker:text-orange-600 tracking-tight text-gray-400">
              {cardData.carMake}
            </li>
            <li className="text-lg  max-[360px]:text-[14px]  max-[500px]:text-[16px]  marker:text-orange-600 tracking-tight text-gray-400">
              {cardData.carTransmission}
            </li>
          </div>
        </div>

        {/* <!-- Image gallery --> */}


       <ImagePreview featuredImage={cardData.featuredImage} galleryImages={cardData?.galleryImages}/>

        {/* <!-- Product info --> */}
        <div className="px-4 max-[500px]:px-1 gap-3 flex-col  max-[500px]:items-center flex max-[1300px]:w-[40%]  max-[700px]:w-full max-[1200px]:w-[95%] w-[35%] ">
          <div className="w-auto max-[700px]:w-full h-auto p-3 max-[500px]:p-2 gap-3 flex flex-col min-[1200px]:items-start items-center ">
            <div className="max-[1200px]:hidden">
              <h1 className="text-3xl font-semibold tracking-wide text-gray-900 ">
                {cardData.carTitle}
              </h1>
            </div>

            {/* <!-- Options --> */}
            <div className=" w-full max-[1200px]:hidden  border-b border-gray-400 ">
              <div className="flex my-4 gap-5">
                <li className="text-lg marker:text-orange-600  tracking-tight text-gray-400">
                  {cardData.carModel}
                </li>
                <li className="text-lg  marker:text-orange-600 tracking-tight text-gray-400">
                  {cardData.carCondition}
                </li>
                <li className="text-lg  marker:text-orange-600 tracking-tight text-gray-400">
                  {cardData.carTransmission}
                </li>
              </div>
            </div>

            <form className="w-full">
              <div className="price w-full">
                <h3 className="carPrice font-extrabold text-4xl text-orange-600">
                  ${cardData.carPrice}
                </h3>
              </div>
              <div className="features w-full mt-4  rounded-2xl bg-blue-50 max-[700px]:p-1 p-3 flex-col flex">
                <div className="flex w-full p-2  justify-between">
                  <div className="w-[50%] ">
                    <h4 className="text-md  max-[500px]:text-[14px] font-semibold ">
                      Makes
                    </h4>
                  </div>
                  <div className="w-[50%]">
                    <p className="text-md  max-[500px]:text-[14px] ">
                      {" "}
                      {cardData.carMake}
                    </p>
                  </div>
                </div>
                <div className="flex w-full p-2 justify-between">
                  <div className="w-[50%] ">
                    <h4 className="text-md  max-[500px]:text-[14px] font-semibold ">
                      Color:
                    </h4>
                  </div>
                  <div className="w-[50%]">
                    <p className="text-md  max-[500px]:text-[14px] ">
                      {" "}
                      {cardData.carColour}
                    </p>
                  </div>
                </div>
                <div className="flex w-full p-2 justify-between">
                  <div className="w-[50%] ">
                    <h4 className="text-md  max-[500px]:text-[14px] font-semibold ">
                      Transmission:
                    </h4>
                  </div>
                  <div className="w-[50%]">
                    <p className="text-md  max-[500px]:text-[14px] ">
                      {" "}
                      {cardData.carTransmission}
                    </p>
                  </div>
                </div>
                <div className="flex w-full p-2 justify-between">
                  <div className="w-[50%] ">
                    <h4 className="text-md  max-[500px]:text-[14px] font-semibold ">
                      Condition:
                    </h4>
                  </div>
                  <div className="w-[50%]">
                    <p className="text-md  max-[500px]:text-[14px] ">
                      {" "}
                      {cardData.carCondition}
                    </p>
                  </div>
                </div>
                <div className="flex w-full p-2 justify-between">
                  <div className="w-[50%] ">
                    <h4 className="text-md  max-[500px]:text-[14px] font-semibold ">
                      Year:
                    </h4>
                  </div>
                  <div className="w-[50%]">
                    <p className="text-md  max-[500px]:text-[14px] ">
                      {" "}
                      {cardData.carYear}
                    </p>
                  </div>
                </div>
                <div className="flex w-full p-2 justify-between">
                  <div className="w-[50%] ">
                    <h4 className="text-md  max-[500px]:text-[14px] font-semibold ">
                      Mileage:
                    </h4>
                  </div>
                  <div className="w-[50%]">
                    <p className="text-md  max-[500px]:text-[14px] ">
                      {cardData.carMileage}
                    </p>
                  </div>
                </div>
                <div className="flex w-full p-2 justify-between">
                  <div className="w-[50%] ">
                    <h4 className="text-md  max-[500px]:text-[14px] font-semibold ">
                      Fuel Type:
                    </h4>
                  </div>
                  <div className="w-[50%]">
                    <p className="text-md  max-[500px]:text-[14px] ">
                      {cardData.carFuelType}
                    </p>
                  </div>
                </div>
                <div className="flex w-full p-2 justify-between">
                  <div className="w-[50%] ">
                    <h4 className="text-md  max-[500px]:text-[14px] font-semibold ">
                      Doors:
                    </h4>
                  </div>
                  <div className="w-[50%]">
                    <p className="text-md  max-[500px]:text-[14px] ">
                      {cardData.carDoor}
                    </p>
                  </div>
                </div>
              </div>

              <div className="buttons w-full max-[750px]:flex-col max-[750px]:gap-3 h-auto max-[1200px]:flex max-[1200px]:justify-between max-[1200px]:items-center max-[1200px]:p-3">
                <button
                  type="submit"
                  className="mt-10 flex max-[1200px]:w-[60%] max-[500px]:w-full max-[1200px]:my-auto  w-full items-center justify-center rounded-md border border-transparent bg-orange-600 px-8 py-3 text-base font-medium text-white  "
                >
                  Send Messsage
                </button>

                <div className="socialBtn flex gap-2 mt-5 justify-center max-[300px]:items-start max-[300px]:w-full max-[1200px]:my-auto w-full max-[1200px]:w-fit">
                  <button className="w-fit px-4 py-2 items-center flex max-[300px]:bg-transparent bg-blue-700 gap-2 text-white">
                    <a
                      href="#"
                      title="facebook"
                      className={` facebook rounded-full p-2 items-center bg-white max-[300px]:bg-blue-700 max-[300px]:text-white text-blue-700`}
                    >
                      <FaFacebookF />
                    </a>{" "}
                    <p className="max-[300px]:hidden">Share</p>
                  </button>
                  <button className="w-fit px-4 py-2 items-center flex bg-blue-400 max-[300px]:bg-transparent gap-2 text-white">
                    <a
                      href="#"
                      title="X"
                      className={` twitter rounded-full p-2 items-center bg-white max-[300px]:bg-blue-400 text-blue-400 max-[300px]:text-white`}
                    >
                      <FaXTwitter />
                    </a>{" "}
                    <p className="max-[300px]:hidden">Tweet</p>
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>

      <div className="vehicleHistory max-[1200px]:w-[95%] max-[890px]:w-[99%] flex items-end max-[700px]:justify-center max-[1200px]:mx-auto w-[60%] h-[280px] ml-2 rounded-2xl bg-gray-200">
        <div className="pl-4 border-t items-center border-gray-100 max-[700px]:flex-col  max-[700px]:gap-3 flex  justify-between">
          <div className="w-[32%] max-[700px]:w-[80%] max-[700px]:items-center  max-[700px]:justify-center p-3 flex flex-col gap-5 ">
            <h4 className="text-2xl font-bold ">Vehicle History</h4>
            <div className="downloadReportButton max-[700px]:justify-center max-[700px]:flex w-[90%]">
              <button className="border-2 border-orange-600  px-3 py-3 bg-transparent max-[360px]:text-[14px] text-orange-600 rounded-2xl">
                Download Reports
              </button>
            </div>
            <div className="credit w-full max-[700px]:justify-center max-[700px]:flex flex gap-2">
              <img src={Carfax_logo} alt="carfax logo" className="py-2" />
              <img src={Paypal_logo} alt="paypal logo" className="p-1" />
            </div>
          </div>
          <div className="text-lg max-[700px]:w-[80%] max-[360px]:w-full  max-[700px]:flex max-[700px]:justify-center  w-[32%] p-3 ">
            <p className="text-lg max-[700px]:text-center max-[360px]:text-[16px] ">
              Before you decide to buy a car, read its{" "}
              <a href="#" className="text-orange-600">
                history
              </a>{" "}
              for free.
            </p>
          </div>
          <div className="w-[27%] max-[700px]:hidden">
            <img
              src={SideCarImage}
              alt="sidecar download history"
              className="w-[290px] h-[230px]"
            />
          </div>
        </div>
      </div>

      <div className="features w-full  p-3">
        <h2 className="font-bold text-3xl mt-5 p-3 text-gray-900">Features</h2>
        <ul className="features w-[60%] max-[1200px]:w-full list-disc p-3 marker:text-orange-600 gap-3  grid grid-cols-3 space-x-3 max-md:grid-cols-2 max-sm:text-sm max-sm:grid-cols-1">
          {cardData && cardData?.carAllFeatures?.map((feature , index) => (

          <li key={index} className="text-md max-[360px]:text-[16px] max-[500px]:text-[18px] w-[200px] mx-5 ">
            {feature}
          </li>
          ))}
        </ul>
      </div>

      <div className="attachments w-full p-3">
        <h2 className="font-bold text-3xl mt-5 p-3 text-gray-900">
          Attachments
        </h2>

        <div className="flex gap-3 items-center p-3">
          {cardData.attachmentImage ==  null ? (
            <>
              <img src={Jpg } className="w-[50px]" alt="jpg" />
              <p className="text-lg max-[360px]:text-[15px] hover:text-orange-600">
                No Attachment Found
              </p>
            </>
          ) : (
            <img
              src={`http://localhost:8800/${cardData.attachmentImage}`}
              className="w-[100px]"
              alt="jpg"
            />
          )}
        </div>
      </div>

      <div className="Message w-full py-5 bg-blue-50 rounded-xl">
        <h2 className="font-bold text-3xl mt-5 p-3 text-gray-900">
          Send Message
        </h2>
        <div className="flex gap-3 max-[900px]:flex-col  max-[360px]:p-1  w-full h-auto  p-3">
          <div className="w-[50%] p-3 max-[900px]:w-[98%] h-[350px]">
            <textarea
              name="message"
              placeholder={`I'm interested in ${cardData.carTitle}`}
              value={`I'm interested in ${cardData.carTitle}`}
              className="p-3 max-[360px]:text-[14px] border border-gray-100 bg-white rounded-xl w-[90%] max-[1200px]:w-full h-[280px]"
              id="message"
            ></textarea>
            <div className="button w-[90%] max-[900px]:w-[98%] h-auto p-3 flex justify-end">
          <SendButton/>
          </div>
          </div>
          <div className="w-[50%] max-[900px]:w-[98%] flex justify-center h-auto p-3  max-[360px]:p-1">
            <div className="w-[74%] max-[1200px]:w-[95%] max-[900px]:w-full h-[300px] bg-white rounded-xl flex flex-col">
              <div className="w-full h-[200px] rounded-xl shadow-md  p-3">
                <h2 className="font-bold text-2xl mt-5 px-5 text-gray-900">
                  webadmin
                </h2>
                <p className="text-orange-600  px-5">admistrator</p>
              </div>

              <a
                className="flex h-[100px] max-[900px]:w-full px-5 justify-start max-[360px]:p-1 text-orange-600 items-center p-3"
                href="mailto:jpcorporation66@gmail.com"
                title="jpcorporation66@gmail.com"
              >
                <FaEnvelope fontSize={20} />
                <span className="px-3 text-black font-semibold max-[360px]:text-[14px]">
                  jpcorporation66@gmail.com
                </span>
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="relatedImages w-full h-auto flex flex-col p-3 max-[360px]:p-0">
        <h2 className="font-bold text-3xl mt-5 p-3 text-gray-900">
          Related Listing
        </h2>
        <div className="relatedCard w-full p-3 h-auto max-[360px]:p-2">
          <CardCarousel />
        </div>
      </div>
    </div>
  );
};

export default ProductPreview;
