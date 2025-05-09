import React, { useState, useEffect } from "react";
import Footer from "../Footer/Footer";
import Navbar from "../../Components/Navbar/Navbar";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

const SearchPage = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  
  const homeMake = searchParams.get("make");
  const homeModel = searchParams.get("model");
  const homeMinYear = searchParams.get("minyear");
  const homeMaxYear = searchParams.get("maxyear");

  console.log(homeMake , homeModel , homeMaxYear , homeMinYear);
  
  
  const queryParams = new URLSearchParams(window.location.search);
  const typeFromQuery = queryParams.get("type");
  let type = typeFromQuery?.toUpperCase();
  console.log(type);
  

  const [makeFilter, setMakeFilter] = useState("");
  const [typeFilter, setTypeFilter] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [condition, setCondition] = useState("");
  const [allCars, setAllCars] = useState([]);
  const [filteredCars, setFilteredCars] = useState([]);

  // Fetch Api
  let fetchFromTypeApi = async () => {
    try {
      let token = localStorage.getItem("adminToken");
      const res = await axios.get(
        `http://localhost:5000/api/carListing/getByType?type=${type}`,
        {
          headers: {
            Authorization: `Barear ${token}`,
          },
        }
      );
      const data = await res.data.data;
      setFilteredCars(data);
      console.log(data);
    } catch (error) {
      console.error(error);
    }
  };
  if(type) {
  useEffect(()=> {
    fetchFromTypeApi()
  }, [])
}
  console.log(makeFilter);

  const query = [];
  if (makeFilter) query.push(`make=${makeFilter}`);
  if (typeFilter) query.push(`type=${typeFilter}`);
  if (minPrice) query.push(`minPrice=${minPrice}`);
  if (maxPrice) query.push(`maxPrice=${maxPrice}`);
  if (condition) query.push(`condition=${condition}`);
  if (homeMake) query.push(`make=${homeMake}`);
  if (homeModel) query.push(`model=${homeModel}`);
  if (homeMinYear) query.push(`minyear=${homeMinYear}`);
  if (homeMaxYear) query.push(`maxyear=${homeMaxYear}`);


  const queryString = query.join("&");
  console.log(queryString || null);

  if (queryString !== null) {
useEffect( () => {
    // Fetch Search Api
    let fetchFromSearchApi = async () => {
      try {
        
        const res = await axios.get(
          `http://localhost:5000/api/carListing/getByQuery?${queryString}`);
        const data = await res.data.data;
        setFilteredCars(data);
  
        console.log(data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchFromSearchApi();
    
} , [])
}

 // Fetch Search Api
 let fetchFromSearchApi = async () => {
  try {
    
    const res = await axios.get(
      `http://localhost:5000/api/carListing/getByQuery?${queryString}`);
    const data = await res.data.data;
    setFilteredCars(data);

    console.log(data);
  } catch (error) {
    console.error(error);
  }
};

  // Fetch Search Api
  let fetchApi = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/carListing/get");
      const data = await res.data.data;
      setFilteredCars(data);
      setAllCars(data);
      console.log(data);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(()=> {
    fetchApi
  }, [])

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const carsPerPage = 5;

  const handleSearch = () => {
    fetchFromSearchApi()
    let results = filteredCars;

    if (makeFilter) {
      results = results.filter((car) =>
        car.carMake?.toLowerCase().includes(makeFilter?.toLowerCase())
      );
    }
    if (typeFilter) {
      results = results.filter((car) =>
        car.carType?.toLowerCase().includes(typeFilter?.toLowerCase())
      );
    }
    if (minPrice) {
      results = results.filter((car) => car.price >= parseInt(minPrice));
    }
    if (maxPrice) {
      results = results.filter((car) => car.price <= parseInt(maxPrice));
    }
    if (condition) {
      results = results.filter((car) =>
        car.carCondition?.toLowerCase().includes(condition?.toLowerCase())
      );
    }

    setFilteredCars(results);
    setCurrentPage(1);
  };
  console.log(filteredCars);

  // Pagination Logic
  const indexOfLastCar = currentPage * carsPerPage;
  const indexOfFirstCar = indexOfLastCar - carsPerPage;
  const currentCars = filteredCars.slice(indexOfFirstCar, indexOfLastCar);

  const totalPages = Math.ceil(filteredCars.length / carsPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  let navigate = useNavigate();
  const navigateToPreviewPage = (id) => {
    localStorage.setItem("cardId", id);
    navigate(`/listing/${id}`);
  };

  return (
    <div className="contact w-full h-auto flex flex-col overflow-x-hidden justify-center items-center">
      <div className="navbar w-full h-[120px]">
        <Navbar bg="gray-800" />
      </div>
      <div className="name w-[90%] gap-3 flex p-3 mb-3">
        <p>Homepage </p> - <p className="text-orange-500">Search</p>
      </div>
      <div className=" w-full min-h-screen">
        {/* Filter Section */}
        <div className="flex bg-neutral-50 w-full p-3 py-10 justify-center flex-wrap gap-4 mb-8">
          <select
            onChange={(e) => setMakeFilter(e.target.value)}
            id="make"
            className="appearance-none bg-white  border rounded-md p-3 w-48 outline-0 text-gray-400 "
            placeholder="Select make"
          >
            <option
              value=""
              selected
              disabled
              className="appearance-none active:bg-neutral-400 active:text-neutral-500 hover:bg-neutral-400 hover:text-neutral-500 p-2"
            >
              Select Make
            </option>
            <option
                          id="1"
                          value="1"
                          className="appearance-none active:bg-neutral-400 active:text-neutral-500 hover:bg-neutral-400 hover:text-neutral-500  focus:bg-neutral-400 focus:text-neutral-500 text-neutral-800 bg-white p-2"
                        >
                          AUDI
                        </option>
                        <option
                          id="2"
                          value="2"
                          className="appearance-none active:bg-neutral-400 active:text-neutral-500 hover:bg-neutral-400 hover:text-neutral-500 focus:bg-neutral-400 focus:text-neutral-500 text-neutral-800 bg-white p-2"
                        >
                          BENTLEY
                        </option>
                        <option
                          id="3"
                          value="3"
                          className="appearance-none active:bg-neutral-400 active:text-neutral-500 hover:bg-neutral-400 hover:text-neutral-500 focus:bg-neutral-400 focus:text-neutral-500 text-neutral-800 bg-white p-2"
                        >
                          BMW
                        </option>
                        <option
                          id="4"
                          value="4"
                          className="appearance-none active:bg-neutral-400 active:text-neutral-500 hover:bg-neutral-400 hover:text-neutral-500 focus:bg-neutral-400 focus:text-neutral-500 text-neutral-800 bg-white p-2"
                        >
                          CADILLAC
                        </option>
                        <option
                          id="5"
                          value="5"
                          className="appearance-none active:bg-neutral-400 active:text-neutral-500 hover:bg-neutral-400 hover:text-neutral-500 focus:bg-neutral-400 focus:text-neutral-500 text-neutral-800 bg-white p-2"
                        >
                          CHEVROLET
                        </option>
                        <option
                          id="6"
                          value="6"
                          className="appearance-none active:bg-neutral-400 active:text-neutral-500 hover:bg-neutral-400 hover:text-neutral-500 focus:bg-neutral-400 focus:text-neutral-500 text-neutral-800 bg-white p-2"
                        >
                          FARRARI
                        </option>
                        <option
                          id="7"
                          value="7"
                          className="appearance-none active:bg-neutral-400 active:text-neutral-500 hover:bg-neutral-400 hover:text-neutral-500 focus:bg-neutral-400 focus:text-neutral-500 text-neutral-800 bg-white p-2"
                        >
                          FORD
                        </option>
                        <option
                          id="8"
                          value="8"
                          className="appearance-none active:bg-neutral-400 active:text-neutral-500 hover:bg-neutral-400 hover:text-neutral-500 focus:bg-neutral-400 focus:text-neutral-500 text-neutral-800 bg-white p-2"
                        >
                          HINO
                        </option>
                        <option
                          id="9"
                          value="9"
                          className="appearance-none active:bg-neutral-400 active:text-neutral-500 hover:bg-neutral-400 hover:text-neutral-500 focus:bg-neutral-400 focus:text-neutral-500 text-neutral-800 bg-white p-2"
                        >
                          HONDA
                        </option>
                        <option
                          id="10"
                          value="10"
                          className="appearance-none active:bg-neutral-400 active:text-neutral-500 hover:bg-neutral-400 hover:text-neutral-500 focus:bg-neutral-400 focus:text-neutral-500 text-neutral-800 bg-white p-2"
                        >
                          ISUZU
                        </option>
                        <option
                          id="11"
                          value="11"
                          className="appearance-none active:bg-neutral-400 active:text-neutral-500 hover:bg-neutral-400 hover:text-neutral-500 focus:bg-neutral-400 focus:text-neutral-500 text-neutral-800 bg-white p-2"
                        >
                          LEXUS
                        </option>
                        <option
                          id="12"
                          value="12"
                          className="appearance-none active:bg-neutral-400 active:text-neutral-500 hover:bg-neutral-400 hover:text-neutral-500 focus:bg-neutral-400 focus:text-neutral-500 text-neutral-800 bg-white p-2"
                        >
                          MAZDA
                        </option>
                        <option
                          id="13"
                          value="13"
                          className="appearance-none active:bg-neutral-400 active:text-neutral-500 hover:bg-neutral-400 hover:text-neutral-500 focus:bg-neutral-400 focus:text-neutral-500 text-neutral-800 bg-white p-2"
                        >
                          MERCEDES-BENZ
                        </option>
                        <option
                          id="14"
                          value="14"
                          className="appearance-none active:bg-neutral-400 active:text-neutral-500 hover:bg-neutral-400 hover:text-neutral-500 focus:bg-neutral-400 focus:text-neutral-500 text-neutral-800 bg-white p-2"
                        >
                          MISTUBISHI
                        </option>
                        <option
                          id="15"
                          value="15"
                          className="appearance-none active:bg-neutral-400 active:text-neutral-500 hover:bg-neutral-400 hover:text-neutral-500 focus:bg-neutral-400 focus:text-neutral-500 text-neutral-800 bg-white p-2"
                        >
                          NISSAN
                        </option>
                        <option
                          id="16"
                          value="16"
                          className="appearance-none active:bg-neutral-400 active:text-neutral-500 hover:bg-neutral-400 hover:text-neutral-500 focus:bg-neutral-400 focus:text-neutral-500 text-neutral-800 bg-white p-2"
                        >
                          PORCH
                        </option>
                        <option
                          id="17"
                          value="17"
                          className="appearance-none active:bg-neutral-400 active:text-neutral-500 hover:bg-neutral-400 hover:text-neutral-500 focus:bg-neutral-400 focus:text-neutral-500 text-neutral-800 bg-white p-2"
                        >
                          SUBARO
                        </option>
                        <option
                          id="18"
                          value="18"
                          className="appearance-none active:bg-neutral-400 active:text-neutral-500 hover:bg-neutral-400 hover:text-neutral-500 focus:bg-neutral-400 focus:text-neutral-500 text-neutral-800 bg-white p-2"
                        >
                          SUZUKI
                        </option>
                        <option
                          id="19"
                          value="19"
                          className="appearance-none active:bg-neutral-400 active:text-neutral-500 hover:bg-neutral-400 hover:text-neutral-500 focus:bg-neutral-400 focus:text-neutral-500 text-neutral-800 bg-white p-2"
                        >
                          TOYOTA
                        </option>
          </select>
          {/* Type */}
          <select
            onChange={(e) => setTypeFilter(e.target.value)}
            id="condition"
            className="appearance-none bg-white w-48 border rounded-md p-3 outline-0 text-gray-400 "
            placeholder="Select Type"
          >
            <option
              value=""
              selected
              disabled
              className="appearance-none active:bg-neutral-400 active:text-neutral-500 hover:bg-neutral-400 hover:text-neutral-500 p-2"
            >
              Select Type
            </option>
            <option
              value="BUS"
              className="appearance-none active:bg-neutral-400 active:text-neutral-500 hover:bg-neutral-400 hover:text-neutral-500  focus:bg-neutral-400 focus:text-neutral-500 text-neutral-800 bg-white p-2"
            >
              BUS
            </option>
            <option
              value="CONVERTIBLE"
              className="appearance-none active:bg-neutral-400 active:text-neutral-500 hover:bg-neutral-400 hover:text-neutral-500 focus:bg-neutral-400 focus:text-neutral-500 text-neutral-800 bg-white p-2"
            >
              CONVERTIBLE
            </option>
            <option
              value="COUPE"
              className="appearance-none active:bg-neutral-400 active:text-neutral-500 hover:bg-neutral-400 hover:text-neutral-500 focus:bg-neutral-400 focus:text-neutral-500 text-neutral-800 bg-white p-2"
            >
              COUPE
            </option>
            <option
              value="DUMP-TRUCK"
              className="appearance-none active:bg-neutral-400 active:text-neutral-500 hover:bg-neutral-400 hover:text-neutral-500 focus:bg-neutral-400 focus:text-neutral-500 text-neutral-800 bg-white p-2"
            >
              DUMP-TRUCK
            </option>
            <option
              value="FLAT BODY TRUCK"
              className="appearance-none active:bg-neutral-400 active:text-neutral-500 hover:bg-neutral-400 hover:text-neutral-500 focus:bg-neutral-400 focus:text-neutral-500 text-neutral-800 bg-white p-2"
            >
              FLAT BODY TRUCK
            </option>
            <option
              value="FREEZER BOX"
              className="appearance-none active:bg-neutral-400 active:text-neutral-500 hover:bg-neutral-400 hover:text-neutral-500 focus:bg-neutral-400 focus:text-neutral-500 text-neutral-800 bg-white p-2"
            >
              FREEZER BOX
            </option>
            <option
              value="HATCHBACK"
              className="appearance-none active:bg-neutral-400 active:text-neutral-500 hover:bg-neutral-400 hover:text-neutral-500 focus:bg-neutral-400 focus:text-neutral-500 text-neutral-800 bg-white p-2"
            >
              HATCHBACK
            </option>
            <option
              value="MIN VAN"
              className="appearance-none active:bg-neutral-400 active:text-neutral-500 hover:bg-neutral-400 hover:text-neutral-500 focus:bg-neutral-400 focus:text-neutral-500 text-neutral-800 bg-white p-2"
            >
              MIN VAN
            </option>
            <option
              value="MUV"
              className="appearance-none active:bg-neutral-400 active:text-neutral-500 hover:bg-neutral-400 hover:text-neutral-500 focus:bg-neutral-400 focus:text-neutral-500 text-neutral-800 bg-white p-2"
            >
              MUV
            </option>
            <option
              value="PICKUP TRUCK"
              className="appearance-none active:bg-neutral-400 active:text-neutral-500 hover:bg-neutral-400 hover:text-neutral-500 focus:bg-neutral-400 focus:text-neutral-500 text-neutral-800 bg-white p-2"
            >
              PICK UP TRUCK
            </option>
            <option
              value="SEDAN"
              className="appearance-none active:bg-neutral-400 active:text-neutral-500 hover:bg-neutral-400 hover:text-neutral-500 focus:bg-neutral-400 focus:text-neutral-500 text-neutral-800 bg-white p-2"
            >
              SEDAN
            </option>
            <option
              value="STATION WAGON"
              className="appearance-none active:bg-neutral-400 active:text-neutral-500 hover:bg-neutral-400 hover:text-neutral-500 focus:bg-neutral-400 focus:text-neutral-500 text-neutral-800 bg-white p-2"
            >
              STATION WAGON
            </option>
            <option
              value="SUV"
              className="appearance-none active:bg-neutral-400 active:text-neutral-500 hover:bg-neutral-400 hover:text-neutral-500 focus:bg-neutral-400 focus:text-neutral-500 text-neutral-800 bg-white p-2"
            >
              SUV
            </option>
            <option
              value="VAN"
              className="appearance-none active:bg-neutral-400 active:text-neutral-500 hover:bg-neutral-400 hover:text-neutral-500 focus:bg-neutral-400 focus:text-neutral-500 text-neutral-800 bg-white p-2"
            >
              VAN
            </option>
            <option
              value="WAGON"
              className="appearance-none active:bg-neutral-400 active:text-neutral-500 hover:bg-neutral-400 hover:text-neutral-500 focus:bg-neutral-400 focus:text-neutral-500 text-neutral-800 bg-white p-2"
            >
              WAGON
            </option>
          </select>
          <input
            type="number"
            placeholder="Min Price"
            value={minPrice}
            onChange={(e) => setMinPrice(e.target.value)}
            className="p-3 rounded bg-white border border-neutral-400  w-48"
          />
          <input
            type="number"
            placeholder="Max Price"
            value={maxPrice}
            onChange={(e) => setMaxPrice(e.target.value)}
            className="p-3 rounded bg-white border border-neutral-400 w-48"
          />
          <select
            onChange={(e) => setCondition(e.target.value)}
            id="condition"
            className="appearance-none bg-white w-48 border rounded-md p-3 outline-0 text-gray-400 "
            placeholder="Select Condition"
          >
            <option
              value=""
              selected
              disabled
              className="appearance-none active:bg-neutral-400 active:text-neutral-500 hover:bg-neutral-400 hover:text-neutral-500 p-2"
            >
              Select Condition
            </option>
            <option
              value="New"
              className="appearance-none active:bg-neutral-400 active:text-neutral-500 hover:bg-neutral-400 hover:text-neutral-500  focus:bg-neutral-400 focus:text-neutral-500 text-neutral-800 bg-white p-2"
            >
              New
            </option>
            <option
              value="Old"
              className="appearance-none active:bg-neutral-400 active:text-neutral-500 hover:bg-neutral-400 hover:text-neutral-500 focus:bg-neutral-400 focus:text-neutral-500 text-neutral-800 bg-white p-2"
            >
              Used
            </option>
          </select>
          <button
            onClick={handleSearch}
            className="bg-[#ff4800] text-white font-semibold px-6 py-3 rounded"
          >
            Search
          </button>
        </div>

        {/* Results */}
        <div className="w-[90%] flex  mx-auto justify-center">
          <h2 className="text-4xl w-full font-extrabold mb-6">
            {filteredCars.length} Results
          </h2>
        </div>

        {/* Car Cards */}
        <div className="space-y-4 mx-auto p-2 w-[90%] max-lg:w-full">
          {currentCars && currentCars.length > 0 ? (
            currentCars?.map((car, index) => (
              <div
                key={index}
                className="bg-white p-4 rounded-xl hover:border cursor-pointer border-orange-500  flex justify-between items-end hover:shadow-md transition max-lg:w-full"
                onClick={() => navigateToPreviewPage(car._id)}
              >
                <div className="flex items-center gap-4 max-sm:flex-col max-sm:h-auto max-sm:w-full">
                  {/* Placeholder for Car Image */}
                  <div className="w-[230px] h-[130px] max-sm:h-auto max-sm:w-full bg-amber-200 rounded-xl">
                    <img
                      src={`../../../../admin/public/uploads/${car.featured_image}`}
                      alt="Car image"
                      className="w-full h-full rounded-xl"
                    />
                  </div>

                  <div className="max-sm:w-full px-4 flex flex-col">
                    <h3 className="font-bold text-2xl max-md:text-xl uppercase">
                      {car.title}
                    </h3>
                    <p className="text-gray-500 text-md mb-2">
                      {car.features.length < 4 ? car.features : null}
                    </p>

                    <div className="flex items-center gap-3 text-xs lg:text-sm max-md:text-[12px] max-sm:text-[16px] text-gray-500">
                      <span className="bg-[#ff4800] text-white px-2 py-1 rounded text-xs ">
                        {car.year}
                      </span>
                      <span>{car.mileage}</span>
                      <span>•</span>
                      <span>{car.transmission}</span>
                      <span>•</span>
                      <span>{car.fuel_type}</span>
                      <span className="max-md:hidden">•</span>
                      <span className="max-md:hidden">{car.drive_type}</span>
                    </div>

                    <div className="text-[#ff4800] max-lg:text-2xl mt-6 md:hidden block text-[2rem] font-extrabold">
                      ${car.price}
                    </div>
                  </div>
                </div>

                <div className="text-[#ff4800] max-lg:text-2xl max-md:hidden block text-[2rem] font-extrabold">
                  ${car.price}
                </div>
              </div>
            ))
          ) : (
            <p className="text-5xl font-semibold   mt-5 text-gray-700">
              {" "}
              No Record Found!
            </p>
          )}
        </div>

        {/* Pagination */}
        <div className="flex justify-center mb-5 mt-8 space-x-2">
          {Array.from({ length: totalPages }, (_, index) => (
            <button
              key={index}
              onClick={() => paginate(index + 1)}
              className={`px-4 py-2 rounded border ${
                currentPage === index + 1
                  ? "bg-[#ff4800] text-white"
                  : "bg-white text-gray-700"
              }`}
            >
              {index + 1}
            </button>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default SearchPage;
