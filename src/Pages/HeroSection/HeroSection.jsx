import React, { useRef, useState } from "react";
import Navbar from "../../Components/Navbar/Navbar";
import { IoSearch } from "react-icons/io5";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const HeroSection = () => {
  const navigate = useNavigate();
  const [selectedMakes, setSelectedMakes] = useState("");
  const [selectedModels, setSelectedModels] = useState("");
  const [selectedFromYear, setSelectedFromYear] = useState("");
  const [selectedToYear, setSelectedToYear] = useState("");
  const [modals, setModals] = useState("");

  let makeRef = useRef(null);
  let modelRef = useRef(null);
  let fromYearRef = useRef(null);
  let toYearRef = useRef(null);

  // Fetch Modal By Make Api Call
  const fetchModalByMake = async (make) => {
    let makeId = parseInt(make);
    const response = await axios.get(
      `https://jpcorporation01-production.up.railway.app/api/model/getModalByMake/${makeId}`
    );
    const data = await response.data;
    setModals(data);
  };

  const handleMake = (e) => {
    setSelectedMakes(e.target.value);
    fetchModalByMake(e.target.value);
  };

  // console.log(makeRef.current.value, modelRef.current.value, fromYearRef.current.value, toYearRef.current.value);

  
  
  const handleSearch = () => {
  
    if (
      !makeRef.current.value &&
      !modelRef.current.value &&
      !fromYearRef.current.value &&
      !toYearRef.current.value
    ) {
      alert("Please select at least one option!");
      return;
    }

   
    const query = [];
    if (selectedMakes) query.push(`make=${makeRef.current.value}`);
    if (selectedModels) query.push(`model=${modelRef.current.value}`);
    if (selectedFromYear) query.push(`minyear=${fromYearRef.current.value}`);
    if (selectedToYear) query.push(`maxyear=${toYearRef.current.value}`);
  
    const queryString = query.join("&");
    console.log(queryString || null);

    navigate(
      `/search?${queryString}`
    );
  
  };
  const handleCarClick = (type) => {
    navigate(`/search/?type=${type}`);
  };
  return (
    <div className="hero w-full h-auto  justify-center flex-col gap-3   items-center  p-4 flex ">
      <div className="heading w-fit h-fit my-3">
        <h1 className="text-7xl font-extrabold  max-[550px]:text-3xl max-[360px]:text-2xl text-white max-[900px]:text-4xl">
          Find Your <span className="text-orange-600">Perfect</span> Car
        </h1>
      </div>
      <div className="input w-[700px] h-[100px]  max-[550px]:w-[97%] my-5 max-[900px]:h-auto  max-[900px]:w-[500px]">
        <div className="bg-white shadow-[0px_12px_1px_rgba(0,0,0,0.1)] max-[900px]:py-5 max-[900px]:px-3  shadow-gray-300 w-full h-full rounded-2xl flex max-[900px]:flex-col max-[900px]:h-auto justify-center gap-3 items-center">
          <select
            name="make"
            id="make"
            ref={makeRef}
            onChange={(e) => handleMake(e)}
            aria-label="Select Make"
            className="form-select border-2 max-[900px]:w-[90%] border-gray-200 rounded-lg p-3 focus:border-blue-200 focus:shadow-md focus:shadow-blue-200"
          >
            <option selected value="">All Makes</option>
            <option value="1">AUDI </option>
            <option value="2">BENTLEY</option>
            <option value="3">BMW </option>
            <option value="4">CADILLAC </option>
            <option value="5">CHEVROLET </option>
            <option value="6">FERRARI </option>
            <option value="7">FORD </option>
            <option value="8">HINO </option>
            <option value="9">HONDA </option>
            <option value="10">ISUZU </option>
            <option value="11">LEXUS </option>
            <option value="12">MAZDA </option>
            <option value="13">MERCEDES-BENZ </option>
            <option value="14">MITSUBISHI </option>
            <option value="15">NISSAN </option>
            <option value="16">PORCHE </option>
            <option value="17">SUBARU </option>
            <option value="18">SUZUKI </option>
            <option value="19">TOYOTA </option>
          </select>
          <select
            name="model"
            ref={modelRef}
            onChange={(e) => setSelectedModels(e.target.value)}
            aria-label="Select Model"
            className="form-select max-[900px]:w-[90%] border-2 border-gray-200 rounded-lg p-3 focus:border-blue-200 focus:shadow-md focus:shadow-blue-200"
          >
            {makeRef.current === null ? (
              <option
                value=""
                selected
                disabled
                className="appearance-none active:bg-neutral-400 active:text-neutral-500 hover:bg-neutral-400 hover:text-neutral-500 p-2"
              >
                Select Make First
              </option>
            ) : (
              <>
                <option
                  value=""
                  selected
                  disabled
                  className="appearance-none active:bg-neutral-400 active:text-neutral-500 hover:bg-neutral-400 hover:text-neutral-500 p-2"
                >
                  All Models
                </option>
                {modals &&
                  modals.map(({ make_id, model_id, model }, index) => (
                    <option
                      key={index}
                      value={model_id}
                      className="appearance-none active:bg-neutral-400 active:text-neutral-500 hover:bg-neutral-400 hover:text-neutral-500  focus:bg-neutral-400 focus:text-neutral-500 text-neutral-800 bg-white p-2"
                    >
                      {model}
                    </option>
                  ))}
              </>
            )}
          
          </select>
          <select
            name="fromYear"
            aria-label="From Year"
            ref={fromYearRef}
            className="form-select max-[900px]:w-[90%]  border-2 border-gray-200 rounded-lg p-3 focus:border-blue-200 focus:shadow-md focus:shadow-blue-200 "
          >
            <option selected value="">Year</option>
            <option value="1992">1992 </option>
            <option value="1993">1993 </option>
            <option value="1994">1994 </option>
            <option value="1995">1995 </option>
            <option value="1996">1996 </option>
            <option value="1997">1997 </option>
            <option value="1998">1998 </option>
            <option value="1999">1999 </option>
            <option value="2000">2000 </option>
            <option value="2001">2001 </option>
            <option value="2002">2002 </option>
            <option value="2003">2003 </option>
            <option value="2004">2004 </option>
            <option value="2005">2005 </option>
            <option value="2006">2006 </option>
            <option value="2007">2007 </option>
            <option value="2008">2008 </option>
            <option value="2009">2009 </option>
            <option value="2010">2010 </option>
            <option value="2011">2011 </option>
            <option value="2012">2012 </option>
            <option value="2013">2013 </option>
            <option value="2014">2014 </option>
            <option value="2015">2015 </option>
            <option value="2016">2016 </option>
            <option value="2017">2017 </option>
            <option value="2018">2018 </option>
            <option value="2019">2019 </option>
            <option value="2020">2020 </option>
            <option value="2021">2021 </option>
            <option value="2022">2022 </option>
            <option value="2023">2023 </option>
            <option value="2024">2024 </option>
            <option value="2025">2025 </option>
            <option value="2026">2026 </option>
          </select>
          <select
            name="toYear"
            aria-label="To Year"
            value={selectedToYear}
            className="form-select max-[900px]:w-[90%] border-2 border-gray-200 rounded-lg p-3 focus:border-blue-200 focus:shadow-md focus:shadow-blue-200 "
          >
            <option selected value="">Year</option>
            <option value="1992">1992 </option>
            <option value="1993">1993 </option>
            <option value="1994">1994 </option>
            <option value="1995">1995 </option>
            <option value="1996">1996 </option>
            <option value="1997">1997 </option>
            <option value="1998">1998 </option>
            <option value="1999">1999 </option>
            <option value="2000">2000 </option>
            <option value="2001">2001 </option>
            <option value="2002">2002 </option>
            <option value="2003">2003 </option>
            <option value="2004">2004 </option>
            <option value="2005">2005 </option>
            <option value="2006">2006 </option>
            <option value="2007">2007 </option>
            <option value="2008">2008 </option>
            <option value="2009">2009 </option>
            <option value="2010">2010 </option>
            <option value="2011">2011 </option>
            <option value="2012">2012 </option>
            <option value="2013">2013 </option>
            <option value="2014">2014 </option>
            <option value="2015">2015 </option>
            <option value="2016">2016 </option>
            <option value="2017">2017 </option>
            <option value="2018">2018 </option>
            <option value="2019">2019 </option>
            <option value="2020">2020 </option>
            <option value="2021">2021 </option>
            <option value="2022">2022 </option>
            <option value="2023">2023 </option>
            <option value="2024">2024 </option>
            <option value="2025">2025 </option>
            <option value="2026">2026 </option>
          </select>
          <div
            onClick={handleSearch}
            className="searchButton max-[900px]:hidden bg-orange-600 rounded-lg p-3 text-white"
          >
            <IoSearch fontSize={20} />
          </div>
          <div className="searchButton min-[900px]:hidden flex w-[90%] justify-center items-center text-xl gap-3 font-bold bg-orange-600 rounded-lg p-3 text-white">
            Search <IoSearch fontSize={20} />
          </div>
        </div>
      </div>

      <div className="CarsCard w-[600px] h-auto my-4 max-[900px]:w-auto max-[900px]:h-auto flex flex-wrap justify-between max-[550px]:flex max-[572px]:justify-center ">
        {/* Card 1 */}
        <div className="card1 w-fit h-[180px] p-3 max-[900px]:h-[130px]  flex flex-col items-center justify-between">
          <div className="cardImage cur border-2 w-[80px] h-[80px]  hover:border hover:border-orange-500  border-white rounded-full flex justify-center items-center">
            <button
              onClick={() => {
                handleCarClick("sedan");
              }}
              className="elementor-icon elementor-animation- "
              tabIndex="-1"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                id="Group_557"
                data-name="Group 557"
                width="50"
                height="50"
                viewBox="0 0 164.104 64.102"
              >
                <path
                  id="Subtraction_30"
                  data-name="Subtraction 30"
                  d="M-13895.81,20663.1a14.9,14.9,0,0,1-10.609-4.395,14.9,14.9,0,0,1-4.393-10.607,14.9,14.9,0,0,1,4.393-10.6,14.9,14.9,0,0,1,10.609-4.395,14.889,14.889,0,0,1,10.6,4.395,14.9,14.9,0,0,1,4.393,10.6,14.9,14.9,0,0,1-4.393,10.607A14.889,14.889,0,0,1-13895.81,20663.1Zm0-24a9.009,9.009,0,0,0-9,9,9.011,9.011,0,0,0,9,9,9.009,9.009,0,0,0,9-9A9.007,9.007,0,0,0-13895.81,20639.1Z"
                  transform="translate(13925 -20599)"
                  fill="#fff"
                ></path>
                <path
                  id="Subtraction_29"
                  data-name="Subtraction 29"
                  d="M-13895.81,20663.1a14.9,14.9,0,0,1-10.609-4.395,14.9,14.9,0,0,1-4.393-10.607,14.9,14.9,0,0,1,4.393-10.6,14.9,14.9,0,0,1,10.609-4.395,14.889,14.889,0,0,1,10.6,4.395,14.9,14.9,0,0,1,4.393,10.6,14.9,14.9,0,0,1-4.393,10.607A14.889,14.889,0,0,1-13895.81,20663.1Zm-.5-24a8.77,8.77,0,0,0-8.5,9,8.773,8.773,0,0,0,8.5,9,8.771,8.771,0,0,0,8.5-9A8.769,8.769,0,0,0-13896.308,20639.1Z"
                  transform="translate(14029 -20599)"
                  fill="#fff"
                ></path>
                <path
                  id="Subtraction_28"
                  data-name="Subtraction 28"
                  d="M-13904.136,20686.107c-3.425,0-5.024-1.373-5.763-2.523a4.979,4.979,0,0,1-.79-2.52,67.152,67.152,0,0,1,.5-13.7,18.819,18.819,0,0,1,2.632-7.51c2.288-3.4,5.433-4.031,8.474-4.643l.017,0c.3-.059.6-.121.9-.184,13.069-.969,29.571-1.146,29.714-1.146a206.77,206.77,0,0,0,17.679-11.3,53.678,53.678,0,0,1,12.248-6.725c3.983-1.592,7.777-2.312,14.5-2.758a153.9,153.9,0,0,1,20.244,1.211,76.571,76.571,0,0,1,18.3,4.994,47.084,47.084,0,0,1,9.506,9.672,38.831,38.831,0,0,1,3.131,4.9h15.706a7.339,7.339,0,0,1,5.476,2.633,18.189,18.189,0,0,1,3.572,7.764,52.571,52.571,0,0,1,1.285,9.652,89.68,89.68,0,0,1-.2,11.7v.006h-12.326a30.669,30.669,0,0,0-.408-6.361c-.544-3.285-1.872-7.93-5.114-11.4-3.126-3.346-7.464-5.041-12.894-5.041-10.312,0-15.274,6.2-17.621,11.4a32.1,32.1,0,0,0-2.648,11.4h-64.184a30.162,30.162,0,0,0-.421-6.312c-.552-3.264-1.892-7.881-5.14-11.355-3.188-3.408-7.627-5.135-13.192-5.135-5.543,0-10.006,1.7-13.263,5.061-6.151,6.34-6.029,16.57-6,17.717,0,.014,0,.023,0,.025A18.617,18.617,0,0,1-13904.136,20686.107Zm46.36-31.562c.067.141,5.9.209,17.834.209,1.438,0,3.068,0,4.933-.006l6.105-15.047h0a41.4,41.4,0,0,0-14.236,4.387,63.744,63.744,0,0,0-14.631,10.453l-.006,0Zm46.291-15.639c-3.291,0-6.452.18-9.51.354l-.09.006-.187.016-6.272,15.451c2.433,0,5.121-.016,7.968-.029l.752,0,1.353,0,6.412-15.789Zm7.7.439-6.219,15.318,3.47-.02,1.088,0c4.3-.023,10.188-.053,16.615-.1.312,0,.478,0,.493,0a13.3,13.3,0,0,0-.161-5.219,10.916,10.916,0,0,0-2.123-4.371,12.332,12.332,0,0,0-5.192-3.65,32.811,32.811,0,0,0-7.97-1.953Z"
                  transform="translate(13910.81 -20633.102)"
                  fill="#fff"
                ></path>
                <path
                  id="Path_211"
                  data-name="Path 211"
                  d="M14227.891-17798.156c.049-.1,1.166.375,2.176,3.344a23.225,23.225,0,0,1,.9,4.076c0-.068-5.548,0-5.548,0S14219.066-17798.758,14227.891-17798.156Z"
                  transform="translate(-14071.219 17822.395)"
                  fill="#ff4605"
                ></path>
                <path
                  id="Path_212"
                  data-name="Path 212"
                  d="M14226.857-17795.76c-.061-.1-4.7,1.8-5.48,5.779,0-.066,10.9,0,10.9,0S14238.238-17798.965,14226.857-17795.76Z"
                  transform="translate(-14216.396 17821.074)"
                  fill="#ff4605"
                ></path>
                <path
                  id="Path_268"
                  data-name="Path 268"
                  d="M13596.227-20971.381l46.691,32.488-51.559.025Z"
                  transform="translate(-13541.95 20991.875)"
                  fill="#f1efef"
                ></path>
              </svg>
            </button>
          </div>
          <div className="cardText  flex justify-center">
            <p className="text-[16px] font-semibold text-white">Sedan</p>
          </div>
        </div>
        {/* Card 2 */}
        <div className="card2 w-fit h-[180px] p-3 max-[900px]:h-[130px]  flex flex-col items-center justify-between">
          <div className="cardImage border-2 w-[80px] h-[80px] hover:border hover:border-orange-500  border-white rounded-full flex justify-center items-center">
            <button
              onClick={() => {
                handleCarClick("coupe");
              }}
              className="elementor-icon elementor-animation-"
              tabIndex="-1"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="50"
                height="50"
                viewBox="0 0 163.558 58.459"
              >
                <g
                  id="Group_559"
                  data-name="Group 559"
                  transform="translate(0.002 -0.002)"
                >
                  <path
                    id="Path_240"
                    data-name="Path 240"
                    d="M14682.666-17675.51c6.831-.441,3.493-2,4.658-4.357s6.83-3.8,0-5.064-20.491-1.707-27.321,0-5.665,4.475,0,6.832S14675.836-17675.068,14682.666-17675.51Z"
                    transform="translate(-14527.08 17699.047)"
                    fill="#fff"
                  ></path>
                  <path
                    id="Subtraction_37"
                    data-name="Subtraction 37"
                    d="M-14351,20677.193c-4.549,0-10.068-.318-10.531-1.832-.166-.545.341-1.217,1.506-2-1-4.67.082-10.6,2.963-16.275a31.61,31.61,0,0,1,4.858-7.084,19.218,19.218,0,0,1,6.015-4.553c2.4-1.07,6.081-1.248,9.639-1.422h.021l.221-.012c.041,0,.081,0,.121-.006l.457-.023.449-.023c.063,0,.123,0,.181-.008l.222-.01c2.574-.145,5.389-.219,8.366-.219,4.87,0,8.565.2,8.971.217.016,0,.023,0,.023,0a49.835,49.835,0,0,1,8.942-8.25,46.131,46.131,0,0,1,10.239-5.662,36.257,36.257,0,0,1,13.245-2.574h1.987c18.48,0,41.806,6.238,58.118,11.471,13.4,4.3,22.219,7.941,22.265,8.033,1.4.955,2.458,2.762,3.146,5.367a34.248,34.248,0,0,1,.944,7.867,80.532,80.532,0,0,1-.675,11.512l-.011.072,0,.01,0,.021a.227.227,0,0,0,0,.031v.012a10.27,10.27,0,0,1-8.112,4.3,7.186,7.186,0,0,1-1.022-.066l-13.479.248a8.889,8.889,0,0,0,1.816-5.418,9.014,9.014,0,0,0-9-9,9.012,9.012,0,0,0-9,9,9.007,9.007,0,0,0,2.02,5.678l-13.386.244v.037h-52.056v-.006h-14.706a9.3,9.3,0,0,0,2.125-5.953,8.771,8.771,0,0,0-8.5-9,8.773,8.773,0,0,0-8.5,9,9.29,9.29,0,0,0,2.126,5.953h-13.165v.006a.117.117,0,0,1-.036,0C-14345.3,20677.084-14348.42,20677.193-14351,20677.193Zm68.726-44.031a51.983,51.983,0,0,0-11.112,1.063c-3.456.809-7.623,3.857-10.51,6.271-3.077,2.586-5.472,5.09-5.48,5.1h38.489s0-.039,0-.115a111.559,111.559,0,0,0,0-11.256A54.193,54.193,0,0,0-14282.279,20633.162Zm18,2.1h0v10.322h18.97l-.006,0a15.92,15.92,0,0,0-6.5-6.5C-14256.434,20636.564-14264.2,20635.27-14264.275,20635.264Z"
                    transform="translate(14361.565 -20627.461)"
                    fill="#fff"
                  ></path>
                  <path
                    id="Path_270"
                    data-name="Path 270"
                    d="M13596.071-20971.381l45.2,31.449-49.911.025Z"
                    transform="translate(-13543.885 20989.234)"
                    fill="#f1efef"
                  ></path>
                  <path
                    id="Subtraction_36"
                    data-name="Subtraction 36"
                    d="M-14346.568,20657.461a14.9,14.9,0,0,1-10.605-4.393,14.9,14.9,0,0,1-4.393-10.605,14.9,14.9,0,0,1,4.393-10.607,14.9,14.9,0,0,1,10.605-4.4,14.9,14.9,0,0,1,10.605,4.4,14.9,14.9,0,0,1,4.393,10.607,14.9,14.9,0,0,1-4.393,10.605A14.9,14.9,0,0,1-14346.568,20657.461Zm0-24a9.01,9.01,0,0,0-9,9,9.01,9.01,0,0,0,9,9,9.01,9.01,0,0,0,9-9A9.01,9.01,0,0,0-14346.568,20633.463Z"
                    transform="translate(14479 -20599)"
                    fill="#fff"
                  ></path>
                  <path
                    id="Subtraction_38"
                    data-name="Subtraction 38"
                    d="M-14346.568,20657.461a14.9,14.9,0,0,1-10.605-4.393,14.9,14.9,0,0,1-4.393-10.605,14.9,14.9,0,0,1,4.393-10.607,14.9,14.9,0,0,1,10.605-4.4,14.9,14.9,0,0,1,10.605,4.4,14.9,14.9,0,0,1,4.393,10.607,14.9,14.9,0,0,1-4.393,10.605A14.9,14.9,0,0,1-14346.568,20657.461Zm0-24a9.01,9.01,0,0,0-9,9,9.01,9.01,0,0,0,9,9,9.01,9.01,0,0,0,9-9A9.01,9.01,0,0,0-14346.568,20633.463Z"
                    transform="translate(14385 -20599)"
                    fill="#fff"
                  ></path>
                  <path
                    id="Path_234"
                    data-name="Path 234"
                    d="M14672.021-17633.193h-4.091s-1.186,4.4,2.152,6.127h2.729a12.841,12.841,0,0,0,.188-3.463A6.689,6.689,0,0,0,14672.021-17633.193Z"
                    transform="translate(-14512.557 17655.711)"
                    fill="#ff4605"
                  ></path>
                  <path
                    id="Path_235"
                    data-name="Path 235"
                    d="M14925.816-17637.883a3.027,3.027,0,0,0-.832.637c-.32.391-.746.926-.746.926h6.58l.775-1.562S14928.518-17639.443,14925.816-17637.883Z"
                    transform="translate(-14911.271 17658.619)"
                    fill="#fff"
                  ></path>
                  <path
                    id="Path_236"
                    data-name="Path 236"
                    d="M0,5.691a26.481,26.481,0,0,0,5.8-.1A3.041,3.041,0,0,0,8.255,4.01C9.178,2.59,10.661,0,10.661,0L2.633.14Z"
                    transform="matrix(-1, -0.017, 0.017, -1, 18.502, 29.281)"
                    fill="#ff4605"
                  ></path>
                </g>
              </svg>
            </button>
          </div>
          <div className="cardText  flex justify-center">
            <p className="text-[16px] font-semibold text-white">Coupe</p>
          </div>
        </div>
        {/* Card 3 */}
        <div className="card3 w-fit h-[180px] p-3 max-[900px]:h-[130px]  flex flex-col items-center justify-between">
          <div className="cardImage border-2 w-[80px] h-[80px] hover:border hover:border-orange-500  border-white rounded-full flex justify-center items-center">
            <button
              onClick={() => {
                handleCarClick("suv");
              }}
              className="elementor-icon elementor-animation-"
              tabIndex="-1"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="50"
                height="50"
                viewBox="0 0 148.092 64.414"
              >
                <g
                  id="Group_562"
                  data-name="Group 562"
                  transform="translate(-15054.172 20866.895)"
                >
                  <path
                    id="Subtraction_23"
                    data-name="Subtraction 23"
                    d="M13,26A13,13,0,0,1,7.94,1.022,13,13,0,0,1,18.06,24.978,12.919,12.919,0,0,1,13,26ZM13,5.4A7.6,7.6,0,1,0,20.6,13,7.612,7.612,0,0,0,13,5.4Z"
                    transform="translate(15068 -20828.48)"
                    fill="#fff"
                  ></path>
                  <path
                    id="Subtraction_22"
                    data-name="Subtraction 22"
                    d="M13,26A13,13,0,0,1,7.94,1.022,13,13,0,0,1,18.06,24.978,12.919,12.919,0,0,1,13,26ZM13,5.4A7.6,7.6,0,1,0,20.6,13,7.612,7.612,0,0,0,13,5.4Z"
                    transform="translate(15158 -20828.48)"
                    fill="#fff"
                  ></path>
                  <path
                    id="Subtraction_24"
                    data-name="Subtraction 24"
                    d="M4.79,55.743a9.09,9.09,0,0,1-2.406-.132.018.018,0,0,1,0-.018c-2.017-2.013-2.759-5.142-2.2-9.3a34.145,34.145,0,0,1,2.03-7.471,3.138,3.138,0,0,0,.176-.5h0c.093-5.967,3.757-10.3,10.89-12.873,6.1-2.2,13.551-2.662,18.731-2.662,1.677,0,4.262.049,7.059.284l.158.012a101.441,101.441,0,0,1,9.812-11.362,60.4,60.4,0,0,1,7.707-6.5,24.215,24.215,0,0,1,6.843-3.64L130.358.049C130.983.017,131.583,0,132.143,0c3.935,0,6.254.81,6.892,2.408a3.332,3.332,0,0,1-.054,2.3,9.35,9.35,0,0,1-1.22,2.317,18.053,18.053,0,0,1-2.12,2.5l.02.044c.981,2.212,5.866,13.261,5.712,13.5a.008.008,0,0,1-.007,0,9.681,9.681,0,0,1,1.435,3.669,31.171,31.171,0,0,1,.582,4.607,54.535,54.535,0,0,1,.036,5.61l.183.2c2.133,2.354,3.257,3.6,3.34,3.692a9.394,9.394,0,0,1,.981,3.186,19.173,19.173,0,0,1,.156,3.377,26.38,26.38,0,0,1-.4,3.769l-15.555,4.4A27.2,27.2,0,0,0,131.953,50c-.378-2.885-1.4-6.963-4.147-10-2.63-2.914-6.364-4.392-11.1-4.392s-8.511,1.481-11.206,4.4a19.131,19.131,0,0,0-4.356,10,26.949,26.949,0,0,0-.286,5.583H43.183a27.626,27.626,0,0,0-.282-5.632c-.438-2.9-1.547-7-4.346-10.038-2.64-2.862-6.317-4.313-10.93-4.313s-8.3,1.452-10.963,4.315c-2.82,3.035-3.959,7.133-4.418,10.037a27.493,27.493,0,0,0-.323,5.631l-.06,0C10.816,55.63,7.216,55.743,4.79,55.743Zm67.9-49.63c-6.185.007-9.75.016-9.779.025a48.793,48.793,0,0,0-8.3,5.62,36.725,36.725,0,0,0-5.083,5.217,21,21,0,0,0-3.245,5.338l29.8-.5ZM97.568,6.1c-7.234,0-14.817,0-20.806.008L80.14,21.741,106.3,21.3,103.011,6.1H97.568Zm9.521,0,3.27,15.129,11.1-.186,6.6-8.088A7.91,7.91,0,0,0,128.3,11.2a5.258,5.258,0,0,0-.889-3.271,5.208,5.208,0,0,0-4.3-1.794c-.74-.018-6.129-.03-16.018-.035Z"
                    transform="translate(15054.172 -20866.895)"
                    fill="#fff"
                  ></path>
                  <path
                    id="Path_252"
                    data-name="Path 252"
                    d="M18443.912-21087.6s1.129-5.34-.436-5.994-5.883.795-5.883.795-1.25,2.672,0,3.541S18443.912-21087.6,18443.912-21087.6Z"
                    transform="translate(-3247.885 255.873)"
                    fill="#ff7443"
                  ></path>
                  <path
                    id="Path_254"
                    data-name="Path 254"
                    d="M18644.531-21084.064c-1.186-.162-8.268-1.527-9.451,5.209.07.078,4.029,0,4.029,0S18643.834-21080.219,18644.531-21084.064Z"
                    transform="translate(-3576.694 248.652)"
                    fill="#ff4605"
                  ></path>
                  <path
                    id="Path_266"
                    data-name="Path 266"
                    d="M13596.393-20971.381l48.289,33.6-53.322.025Z"
                    transform="translate(1507.626 126.604)"
                    fill="#f1efef"
                  ></path>
                </g>
              </svg>
            </button>
          </div>
          <div className="cardText  flex justify-center">
            <p className="text-[16px] font-semibold text-white">SUV</p>
          </div>
        </div>
        {/* Card 4 */}
        <div className="card4 w-fit h-[180px] p-3 max-[900px]:h-[130px]  flex flex-col items-center justify-between">
          <div className="cardImage border-2 w-[80px] h-[80px] hover:border hover:border-orange-500  border-white rounded-full flex justify-center items-center">
            <button
              onClick={() => {
                handleCarClick("hatchback");
              }}
              className="elementor-icon elementor-animation-"
              tabIndex="-1"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="50"
                height="50"
                viewBox="0 0 127.603 54.465"
              >
                <g
                  id="Group_561"
                  data-name="Group 561"
                  transform="translate(-14684.518 20863.809)"
                >
                  <path
                    id="Subtraction_21"
                    data-name="Subtraction 21"
                    d="M118.832,43.013a1.3,1.3,0,0,1-.035-.273c-.429-4.477-2.738-14.891-14.873-14.891-7.591,0-11.447,4.123-13.345,7.581a20.472,20.472,0,0,0-2.323,7.581H43.1a21.368,21.368,0,0,0-2.078-7.594,13.077,13.077,0,0,0-12.373-7.594c-.332,0-.659.009-1,.026-7.591.391-11.241,4.493-12.966,7.865a18.574,18.574,0,0,0-1.944,7.3H4.2a8.178,8.178,0,0,1-1.972-.8A3.852,3.852,0,0,1,.094,39.3c-.212-2.776,0-9.87,0-9.941A5.384,5.384,0,0,1,.9,27.494a15.4,15.4,0,0,1,4.514-4.4,42.655,42.655,0,0,1,11.361-5.128,114.82,114.82,0,0,1,21.349-4.054,25.375,25.375,0,0,1,2.5-2.211,53.8,53.8,0,0,1,7.1-4.778,54.752,54.752,0,0,1,11.13-4.761A50.642,50.642,0,0,1,73.443,0C84.5,0,95.624,3.663,106.518,10.886a16.257,16.257,0,0,0,1.989.048c2.155,0,5.325-.043,5.679-.048l.007,0a95.794,95.794,0,0,1,7.8,10.484,45.044,45.044,0,0,1,4.6,9.084c1.15,3.326,1.315,6.039.491,8.066-1.075,2.643-3.852,4.153-8.253,4.489h0ZM70.8,5.323h0a37.186,37.186,0,0,0-23.624,9.3l48.494-2.734a43.116,43.116,0,0,0-6.928-3.215,53.066,53.066,0,0,0-17.54-3.353l-.4,0Z"
                    transform="translate(14684.518 -20863.809)"
                    fill="#fff"
                  ></path>
                  <path
                    id="Path_176"
                    data-name="Path 176"
                    d="M16313.668-17534.393s6.613-5.395,9.764-5.326c4.773.064,4.773,5.326,2.027,5.326Z"
                    transform="translate(-1625.359 -3301.786)"
                    fill="#ff4605"
                  ></path>
                  <path
                    id="Path_179"
                    data-name="Path 179"
                    d="M16313.665-17531.758s8.018-3.207,11.9-3.131c3.043-4.037,6.029,3.131,2.643,3.131Z"
                    transform="translate(-1524.175 -3320.697)"
                    fill="#fff"
                  ></path>
                  <path
                    id="Subtraction_20"
                    data-name="Subtraction 20"
                    d="M12,24A12,12,0,0,1,3.514,3.515,12,12,0,1,1,20.485,20.485,11.921,11.921,0,0,1,12,24ZM12,5.333A6.667,6.667,0,1,0,18.666,12,6.674,6.674,0,0,0,12,5.333Z"
                    transform="translate(14700.46 -20833.344)"
                    fill="#fff"
                  ></path>
                  <path
                    id="Subtraction_19"
                    data-name="Subtraction 19"
                    d="M12,24A12,12,0,0,1,3.514,3.515,12,12,0,1,1,20.485,20.485,11.921,11.921,0,0,1,12,24ZM12,5.333A6.667,6.667,0,1,0,18.666,12,6.674,6.674,0,0,0,12,5.333Z"
                    transform="translate(14775.46 -20833.344)"
                    fill="#fff"
                  ></path>
                  <path
                    id="Subtraction_6"
                    data-name="Subtraction 6"
                    d="M12.589,7.919H3.959A3.96,3.96,0,0,1,3.959,0H7.9l4.683,7.918Z"
                    transform="translate(14796.028 -20844.098)"
                    fill="#ff4605"
                  ></path>
                  <path
                    id="Path_265"
                    data-name="Path 265"
                    d="M13595.619-20971.383l40.867,28.436-45.127.021Z"
                    transform="translate(1136.298 122.13)"
                    fill="#f1efef"
                  ></path>
                </g>
              </svg>
            </button>
          </div>
          <div className="cardText  flex justify-center">
            <p className="text-[16px] font-semibold text-white">HatchBack</p>
          </div>
        </div>
        {/* Card 5 */}
        <div className="card5 w-fit h-[180px] p-3 max-[900px]:h-[130px]  flex flex-col items-center justify-between">
          <div className="cardImage border-2 w-[80px] h-[80px] hover:border hover:border-orange-500  border-white rounded-full flex justify-center items-center">
            <button
              onClick={() => {
                handleCarClick("convertible");
              }}
              className="elementor-icon elementor-animation-"
              tabIndex="-1"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="50"
                height="50"
                viewBox="0 0 164.044 61.482"
              >
                <g
                  id="Group_558"
                  data-name="Group 558"
                  transform="translate(-0.003)"
                >
                  <path
                    id="Subtraction_33"
                    data-name="Subtraction 33"
                    d="M-14120.83,20656.484a14.4,14.4,0,0,1-10.252-4.248,14.413,14.413,0,0,1-4.246-10.256,14.4,14.4,0,0,1,4.246-10.252,14.4,14.4,0,0,1,10.252-4.246,14.4,14.4,0,0,1,10.252,4.246,14.4,14.4,0,0,1,4.246,10.252,14.408,14.408,0,0,1-4.246,10.256A14.4,14.4,0,0,1-14120.83,20656.484Zm0-23.205a8.709,8.709,0,0,0-8.7,8.7,8.709,8.709,0,0,0,8.7,8.7,8.709,8.709,0,0,0,8.7-8.7A8.71,8.71,0,0,0-14120.83,20633.279Z"
                    transform="translate(14149 -20595)"
                    fill="#fff"
                  ></path>
                  <path
                    id="Subtraction_32"
                    data-name="Subtraction 32"
                    d="M-14120.83,20656.484a14.4,14.4,0,0,1-10.252-4.248,14.413,14.413,0,0,1-4.246-10.256,14.4,14.4,0,0,1,4.246-10.252,14.4,14.4,0,0,1,10.252-4.246,14.4,14.4,0,0,1,10.252,4.246,14.4,14.4,0,0,1,4.246,10.252,14.408,14.408,0,0,1-4.246,10.256A14.4,14.4,0,0,1-14120.83,20656.484Zm0-23.205a8.709,8.709,0,0,0-8.7,8.7,8.709,8.709,0,0,0,8.7,8.7,8.709,8.709,0,0,0,8.7-8.7A8.71,8.71,0,0,0-14120.83,20633.279Z"
                    transform="translate(14248 -20595)"
                    fill="#fff"
                  ></path>
                  <path
                    id="Subtraction_31"
                    data-name="Subtraction 31"
                    d="M-13990.584,20674.887v0a25.019,25.019,0,0,0-2.979-8.184,16.663,16.663,0,0,0-14.1-8.678c-.331-.014-.619-.02-.88-.02a14.835,14.835,0,0,0-13.31,7.693,23.029,23.029,0,0,0-2.782,7.7h-65.425a21.34,21.34,0,0,0-2.913-7.9c-2.241-3.6-6.646-7.9-14.91-7.9-8.076,0-12.209,4.123-14.253,7.582a19.418,19.418,0,0,0-2.168,5.529,9.751,9.751,0,0,0-.342,2.678c-4.977-2.93-7.726-5.2-9.194-7.584-1.424-2.311-1.788-4.9-1.258-8.953.264-1.76,3.22-5.633,10.03-8.541,7.8-2.193,21.052-4.367,30.791-5.807,10.664-1.572,19.413-2.617,19.482-2.625.043-.037,7.152-6.262,13.34-11.523,1.109-.129,2.148-.26,3.064-.375l.209-.027a45.629,45.629,0,0,1,4.761-.471c.782,0,1.229.111,1.41.352a.561.561,0,0,1,.057.521c-.661,2.557-15.752,17.67-15.9,17.822h46.107l5.76-5.764c.092.01,2.661.326,6.216.764,9.6,1.182,27.466,3.381,27.511,3.4l.567.113c8.667,1.752,8.667,1.752,9.891,5.625l.048.152.063.2a30.078,30.078,0,0,1,0,9.707,14.426,14.426,0,0,1-4.123,6.322,31.111,31.111,0,0,1-6.365,4.539,48.054,48.054,0,0,1-8.4,3.654Zm-69.823-43.678h0l-11.872,10.045,2.543,2.869,12.3-12.914Z"
                    transform="translate(14135.329 -20627.482)"
                    fill="#fff"
                  ></path>
                  <path
                    id="Path_222"
                    data-name="Path 222"
                    d="M14916.186-18071.605s-9.358,4.66-8.392,7.77c0-.035,8.08.449,8.392-3.109A15.845,15.845,0,0,0,14916.186-18071.605Z"
                    transform="translate(-14904.673 18095.307)"
                    fill="#ff4605"
                  ></path>
                  <path
                    id="Rectangle_545"
                    data-name="Rectangle 545"
                    d="M0,0H0A3.954,3.954,0,0,1,3.954,3.954V7.344a0,0,0,0,1,0,0h0A3.954,3.954,0,0,1,0,3.389V0A0,0,0,0,1,0,0Z"
                    transform="matrix(-0.996, 0.087, -0.087, -0.996, 161.709, 27.005)"
                    fill="#ff4605"
                  ></path>
                  <rect
                    id="Rectangle_546"
                    data-name="Rectangle 546"
                    width="17"
                    height="4"
                    rx="2"
                    transform="translate(143.671 41.482)"
                    fill="#fff"
                  ></rect>
                  <path
                    id="Path_269"
                    data-name="Path 269"
                    d="M13595.381-20971.379l38.592,26.852-42.614.021Z"
                    transform="translate(-13528.095 20990.256)"
                    fill="#f1efef"
                  ></path>
                </g>
              </svg>
            </button>
          </div>
          <div className="cardText  flex justify-center">
            <p className="text-[16px] font-semibold text-white">Convertible</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
