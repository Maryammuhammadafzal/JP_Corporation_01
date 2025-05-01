import React, { useRef, useState, useEffect } from "react";
import Button from "../../../../Components/Button/Button";
import axios from "axios";
import AllFeatures from "../../../../Components/AllFeatures.js";
import { safetyFeatures } from "../../../../Components/safetyFeatures.js";
import Copyright from "../../../../Components/Copyright/Copyright.jsx";
import AdminButton from "../../../../Components/AdminButton/AdminButton.jsx";

const EditListingForm = ({ carId }) => {
  let [isActive, setIsActive] = useState(false);
  const [featuredImage, setFeaturedImage] = useState(null);
  const [attachmentImage, setAttachmentImage] = useState(null);
  const [galleryImages, setGalleryImages] = useState([]);
  const [carAllFeatures, setCarAllFeatures] = useState([]);
  const [carSafetyFeatures, setCarSafetyFeatures] = useState([]);
  const [carData, setCarData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [make, setMake] = useState(null);
  const [modals, setModals] = useState("");

  // Fetch car data by id
  let editId = localStorage.getItem("EditId");
  let token = localStorage.getItem("adminToken");
  useEffect(() => {
    const fetchCar = async () => {
      try {
        const res = await axios.get(
          `http://localhost:5000/api/carListing/getById/${editId}`,
          {
            headers: {
              Authorization: `Barear ${token}`,
            },
          }
        );
        const car = res.data.data;
        setCarData(car);
        setLoading(false);
      } catch (err) {
        console.error(err);
      }
    };
    fetchCar();
  }, [editId]);

  console.log(carData);

  useEffect(() => {
    if (carData) {
      setFeaturedImage(carData.featured_image);
    }
  }, [carData]);
  useEffect(() => {
    if (carData) {
      setGalleryImages(carData.galleryImages);
    }
  }, [carData]);
  useEffect(() => {
    if (carData) {
      setAttachmentImage(carData.attachmentImage);
    }
  }, [carData]);

  useEffect(() => {
    if (carData) {
      let featuresArray = [];

      // If carData.features exists
      if (Array.isArray(carData?.features)) {
        featuresArray = carData?.features;
      } else if (typeof carData?.features === "string") {
        featuresArray = carData?.features.split(",");
      } else {
        featuresArray = []; // Default fallback if null or unexpected type
      }
      // Set Call All Features
      setCarAllFeatures(featuresArray);
    }
  }, [carData]);

  // Check if Safety features Exist
  useEffect(() => {
    if (carData) {
      let safetyFeaturesArray = [];

      // If carData.safety_features exists
      if (Array.isArray(carData?.safety_features)) {
        safetyFeaturesArray = carData?.safety_features;
      } else if (typeof carData?.safety_features === "string") {
        safetyFeaturesArray = carData?.safety_features.split(",");
      } else {
        safetyFeaturesArray = []; // Default fallback if null or unexpected type
      }
      // Set Car All Features
      setCarSafetyFeatures(safetyFeaturesArray);
    }
  }, [carData]);

  // All input Reference
  const titleRef = useRef(null);
  const conditionRef = useRef(null);
  const typeRef = useRef(null);
  const makeRef = useRef(null);
  const modelRef = useRef(null);
  const priceRef = useRef(null);
  const yearRef = useRef(null);
  const driveTypeRef = useRef(null);
  const transmissionRef = useRef(null);
  const fuelTypeRef = useRef(null);
  const mileageRef = useRef(null);
  const engineSizeRef = useRef(null);
  const cylinderRef = useRef(null);
  const colorRef = useRef(null);
  const doorRef = useRef(null);
  const vinRef = useRef(null);
  const availabilityRef = useRef(null);
  const descriptionRef = useRef(null);

  let newFeaturedImage = null;
  let newAttachmentImage = null;
  let newGalleryImages = [];
  // Handle Images
  const handleFeaturedChange = (e) => {
    newFeaturedImage = e.target.files[0];
    if (newFeaturedImage !== null) {
      setFeaturedImage(newFeaturedImage);
      let image = document.getElementById("showFeaturedImage");
      image.classList.add("hidden");
    }
    setFeaturedImage(carData.featured_image);
  };
  const handleAttachmentChange = (e) => {
    newAttachmentImage = e.target.files[0];
    if (newAttachmentImage !== null) {
      setAttachmentImage(newAttachmentImage);
      let image = document.getElementById("showAttachmentImage");
      image.classList.add("hidden");
    }
    setAttachmentImage(carData.attachmentImage);
  };
  const handleGalleryChange = (e) => {
    newGalleryImages = [...e.target.files];

    if (newGalleryImages.length > 0) {
      setGalleryImages(newGalleryImages);
      let images = document.getElementById("showGalleryImages");
      images.classList.add("hidden");
    }
    setGalleryImages(carData.galleryImages);
  };

  // Show & Hide Images
  const hiddenFeaturedImage = () => {
    let image = document.getElementById("showFeaturedImage");
    image.classList.add("hidden");
  };
  const hiddenGalleryImage = (e) => {
    let image = e.target.parentElement;
    image.classList.add("hidden");
  };
  const hiddenAttachmentImage = () => {
    let image = document.getElementById("showAttachmentImage");
    image.classList.add("hidden");
  };

  // Handle Safety Features Change
  const handleSafetyFeatureChange = (e, type) => {
    const { value, checked } = e.target;
    if (type === "safetyFeatures") {
      setCarSafetyFeatures((prevSafetyFeatures) => {
        if (checked) {
          return [...prevSafetyFeatures, value]; //Added ,If Checked
        } else {
          return prevSafetyFeatures.filter((item) => item !== value); // Removed ,If Not Checked
        }
      });
    }
  };

  // Fetch Modal By Make Api Call
  const fetchModalByMake = async (make) => {
    const response = await axios.get(`/api/model/getModal/${make}`);
    const data = await response.data;
    setModals(data);
  };
  const handleMake = (e) => {
    setMake(e.target.value);
    fetchModalByMake(e.target.value);
  };

  //  Update Listing Function
  const updateDetail = async (e) => {
    e.preventDefault();

    // If input don't get
    if (!titleRef.current.value) {
      titleRef.current.scrollIntoView({ behavior: "smooth", block: "center" });
      titleRef.current.focus();
      setIsActive("title");

      if (!conditionRef.current.value) {
       conditionRef.current.scrollIntoView({
         behavior: "smooth",
         block: "center",
       });
       conditionRef.current.focus();
       setIsActive("condition");
       
       if (!typeRef.current.value) {
         typeRef.current.scrollIntoView({ behavior: "smooth", block: "center" });
         typeRef.current.focus();
         setIsActive("type");
         
         if (!yearRef.current.value) {
          yearRef.current.scrollIntoView({ behavior: "smooth", block: "center" });
          yearRef.current.focus();
          setIsActive("year");
          
          if (!makeRef.current.value) {
           makeRef.current.scrollIntoView({ behavior: "smooth", block: "center" });
           makeRef.current.focus();
           setIsActive("make");
         } 
        } 
       } 
     }  
    } 
    else {
      const formData = new FormData();

      formData.append("title", titleRef.current.value);
      formData.append("condition", conditionRef.current.value);
      formData.append("type", typeRef.current.value);
      formData.append("makeID", makeRef.current.value);
      formData.append("modelID", modelRef.current.value);
      formData.append("price", priceRef.current.value);
      formData.append("year", yearRef.current.value);
      formData.append("drive_type", driveTypeRef.current.value);
      formData.append("transmission", transmissionRef.current.value);
      formData.append("fuel_type", fuelTypeRef.current.value);
      formData.append("mileage", mileageRef.current.value);
      formData.append("engine_size", engineSizeRef.current.value);
      formData.append("cylinders", cylinderRef.current.value);
      formData.append("color", colorRef.current.value);
      formData.append("door", doorRef.current.value);
      formData.append("vin", vinRef.current.value);
      formData.append("availability", availabilityRef.current.value);
      formData.append("description", descriptionRef.current.value);

      // Add features arrays as JSON strings
      formData.append("features", JSON.stringify(carAllFeatures));
      formData.append("safety_features", JSON.stringify(carSafetyFeatures));

      // Images
      formData.append("featured_image", featuredImage);
      formData.append("attachmentImage", attachmentImage);
      for (let i = 0; i < galleryImages.length; i++) {
        formData.append("galleryImages", galleryImages[i]);
      }

      // Edit Listing Api Call
      try {
        const response = await axios.put(
          `http://localhost:5000/api/carListing/update/${editId}`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        console.log("Success" + JSON.stringify(response.data));
        alert("Updated Succesfully");

        // reset car features
        setCarAllFeatures([]);
        setCarSafetyFeatures([]);

        // Reset CheckBoxes
        document
          .querySelectorAll("input[type='checkbox']")
          .forEach((checkbox) => {
            checkbox.checked = false;
          });

        // Redirect to the dashboard
        window.location.href = "/dashboard";
      } catch (error) {
        console.error(error);
        alert("Error");
      }
    }
  };

  return (
    <div className="w-full max-h-auto min-h-screen rounded-tr-[50px] flex flex-col items-end overflow-y-auto ">
      <div className="w-full flex flex-col gap-4 p-5 mb-4 max-md:mb-2 max-sm:mb-0 max-sm:p-3 items-end">
        <div className="w-[95%] min-[1200px]:w-full border rounded-md py-3 max-sm:py-0">
          {/* Edit Listing Heading */}
          <div className="flex justify-between items-center p-6 mb-4 max-md:mb-2 max-sm:mb-0">
            <h1 className="text-3xl font-bold  max-sm:text-2xl max-xs:text-xl">
              Edit Listing
            </h1>
          </div>
          {/* Edit Listing Form */}
          <form className="form w-full h-auto p-3 flex-col flex gap-5 ">
            <div className="p-6 max-sm:text-[14px] max-md:p-4 max-sm:p-2 text-sm border text-gray-600 rounded-md w-full h-auto">
              {/* Title  */}
              <div className="w-full">
                <label htmlFor="title" className="w-full">
                  <p>
                    Listing Title <sup className="text-orange-700">*</sup>
                  </p>
                  <input
                    type="text"
                    value={carData.title || ""}
                    onChange={(e) =>
                      setCarData({ ...carData, title: e.target.value })
                    }
                    id="title"
                    ref={titleRef}
                    className={`mt-2 w-full border rounded-md p-2 max-sm:text-[12px]  ${
                      isActive && "border-orange-400"
                    }`}
                    placeholder="Enter Title Here"
                  />
                </label>
              </div>

              <div className="w-full grid justify-start gap-2 grid-cols-3 max-lg:grid-cols-2 max-md:grid-cols-1 my-3">
                {/* Condition */}
                <div className="w-auto my-3">
                  <label htmlFor="condition" className="w-full">
                    <p>
                      Condition <sup className="text-orange-700">*</sup>
                    </p>
                    <select
                      id="condition"
                      className={`appearance-none mt-2 w-full border rounded-md p-2 max-sm:text-[12px] outline-0  ${
                        isActive && "border-orange-400"
                      }`}
                      placeholder="Select Condition"
                      ref={conditionRef}
                      value={carData.condition || ""}
                      onChange={(e) =>
                        setCarData({ ...carData, condition: e.target.value })
                      }
                    >
                      <option
                        value=""
                        selected
                        disabled
                        className={`appearance-none active:bg-neutral-400 active:text-neutral-500 hover:bg-neutral-400 hover:text-neutral-500 p-2  ${
                          isActive && "border-orange-400"
                        }`}
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
                        value="Used"
                        className="appearance-none active:bg-neutral-400 active:text-neutral-500 hover:bg-neutral-400 hover:text-neutral-500 focus:bg-neutral-400 focus:text-neutral-500 text-neutral-800 bg-white p-2"
                      >
                        Used
                      </option>
                    </select>
                  </label>
                </div>
                {/* Type */}
                <div className="w-auto my-3">
                  <label htmlFor="type" className="w-full">
                    <p>
                      Type <sup className="text-orange-700">*</sup>
                    </p>
                    <select
                      id="type"
                      className={`appearance-none mt-2 w-full border rounded-md p-2 max-sm:text-[12px] outline-0  ${
                        isActive && "border-orange-400"
                      }`}
                      placeholder="Select Type"
                      ref={typeRef}
                      value={carData.type || ""}
                      onChange={(e) =>
                        setCarData({ ...carData, type: e.target.value })
                      }
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
                  </label>
                </div>
                {/* Make Input */}
                <div className="w-auto  my-3">
                  <label htmlFor="make" className="w-full">
                    <p>Make</p>
                    <select
                      id="make"
                      className={`appearance-none mt-2 w-full border rounded-md p-2 max-sm:text-[12px] outline-0 text-gray-700 ${
                        isActive && "border-orange-400"
                      }`}
                      placeholder="Select make"
                      ref={makeRef}
                      value={carData.makeID || ""}
                      onChange={(e) => handleMake(e)}
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
                          value="AUDI"
                          className="appearance-none active:bg-neutral-400 active:text-neutral-500 hover:bg-neutral-400 hover:text-neutral-500  focus:bg-neutral-400 focus:text-neutral-500 text-neutral-800 bg-white p-2"
                        >
                          AUDI
                        </option>
                        <option
                        id="2"
                          value="BENTLEY"
                          className="appearance-none active:bg-neutral-400 active:text-neutral-500 hover:bg-neutral-400 hover:text-neutral-500 focus:bg-neutral-400 focus:text-neutral-500 text-neutral-800 bg-white p-2"
                        >
                          BENTLEY
                        </option>
                        <option
                        id="3"
                          value="BMW"
                          className="appearance-none active:bg-neutral-400 active:text-neutral-500 hover:bg-neutral-400 hover:text-neutral-500 focus:bg-neutral-400 focus:text-neutral-500 text-neutral-800 bg-white p-2"
                        >
                          BMW
                        </option>
                        <option
                        id="4"
                          value="CADILLAC"
                          className="appearance-none active:bg-neutral-400 active:text-neutral-500 hover:bg-neutral-400 hover:text-neutral-500 focus:bg-neutral-400 focus:text-neutral-500 text-neutral-800 bg-white p-2"
                        >
                          CADILLAC
                        </option>
                        <option
                        id="5"
                          value="CHEVROLET"
                          className="appearance-none active:bg-neutral-400 active:text-neutral-500 hover:bg-neutral-400 hover:text-neutral-500 focus:bg-neutral-400 focus:text-neutral-500 text-neutral-800 bg-white p-2"
                        >
                          CHEVROLET
                        </option>
                        <option
                        id="6"
                          value="FARRARI"
                          className="appearance-none active:bg-neutral-400 active:text-neutral-500 hover:bg-neutral-400 hover:text-neutral-500 focus:bg-neutral-400 focus:text-neutral-500 text-neutral-800 bg-white p-2"
                        >
                          FARRARI
                        </option>
                        <option
                        id="7"
                          value="FORD"
                          className="appearance-none active:bg-neutral-400 active:text-neutral-500 hover:bg-neutral-400 hover:text-neutral-500 focus:bg-neutral-400 focus:text-neutral-500 text-neutral-800 bg-white p-2"
                        >
                          FORD
                        </option>
                        <option
                        id="8"
                          value="HINO"
                          className="appearance-none active:bg-neutral-400 active:text-neutral-500 hover:bg-neutral-400 hover:text-neutral-500 focus:bg-neutral-400 focus:text-neutral-500 text-neutral-800 bg-white p-2"
                        >
                          HINO
                        </option>
                        <option
                        id="9"
                          value="HONDA"
                          className="appearance-none active:bg-neutral-400 active:text-neutral-500 hover:bg-neutral-400 hover:text-neutral-500 focus:bg-neutral-400 focus:text-neutral-500 text-neutral-800 bg-white p-2"
                        >
                          HONDA
                        </option>
                        <option
                        id="10"
                          value="ISUZU"
                          className="appearance-none active:bg-neutral-400 active:text-neutral-500 hover:bg-neutral-400 hover:text-neutral-500 focus:bg-neutral-400 focus:text-neutral-500 text-neutral-800 bg-white p-2"
                        >
                          ISUZU
                        </option>
                        <option
                        id="11"
                          value="LEXUS"
                          className="appearance-none active:bg-neutral-400 active:text-neutral-500 hover:bg-neutral-400 hover:text-neutral-500 focus:bg-neutral-400 focus:text-neutral-500 text-neutral-800 bg-white p-2"
                        >
                          LEXUS
                        </option>
                        <option
                        id="12"
                          value="MAZDA"
                          className="appearance-none active:bg-neutral-400 active:text-neutral-500 hover:bg-neutral-400 hover:text-neutral-500 focus:bg-neutral-400 focus:text-neutral-500 text-neutral-800 bg-white p-2"
                        >
                          MAZDA
                        </option>
                        <option
                        id="13"
                          value="MERCEDES-BENZ"
                          className="appearance-none active:bg-neutral-400 active:text-neutral-500 hover:bg-neutral-400 hover:text-neutral-500 focus:bg-neutral-400 focus:text-neutral-500 text-neutral-800 bg-white p-2"
                        >
                          MERCEDES-BENZ
                        </option>
                        <option
                        id="14"
                          value="MISTUBISHI"
                          className="appearance-none active:bg-neutral-400 active:text-neutral-500 hover:bg-neutral-400 hover:text-neutral-500 focus:bg-neutral-400 focus:text-neutral-500 text-neutral-800 bg-white p-2"
                        >
                          MISTUBISHI
                        </option>
                        <option
                        id="15"
                          value="NISSAN"
                          className="appearance-none active:bg-neutral-400 active:text-neutral-500 hover:bg-neutral-400 hover:text-neutral-500 focus:bg-neutral-400 focus:text-neutral-500 text-neutral-800 bg-white p-2"
                        >
                          NISSAN
                        </option>
                        <option
                        id="16"
                          value="PORCH"
                          className="appearance-none active:bg-neutral-400 active:text-neutral-500 hover:bg-neutral-400 hover:text-neutral-500 focus:bg-neutral-400 focus:text-neutral-500 text-neutral-800 bg-white p-2"
                        >
                          PORCH
                        </option>
                        <option
                        id="17"
                          value="SUBARO"
                          className="appearance-none active:bg-neutral-400 active:text-neutral-500 hover:bg-neutral-400 hover:text-neutral-500 focus:bg-neutral-400 focus:text-neutral-500 text-neutral-800 bg-white p-2"
                        >
                          SUBARO
                        </option>
                        <option
                        id="18"
                          value="SUZUKI"
                          className="appearance-none active:bg-neutral-400 active:text-neutral-500 hover:bg-neutral-400 hover:text-neutral-500 focus:bg-neutral-400 focus:text-neutral-500 text-neutral-800 bg-white p-2"
                        >
                          SUZUKI
                        </option>
                        <option
                        id="19"
                          value="TOYOTA"
                          className="appearance-none active:bg-neutral-400 active:text-neutral-500 hover:bg-neutral-400 hover:text-neutral-500 focus:bg-neutral-400 focus:text-neutral-500 text-neutral-800 bg-white p-2"
                        >
                          TOYOTA
                        </option>
                    </select>
                  </label>
                </div>

                {/* Model Input */}
                <div className="w-auto mx-2 my-3">
                  <label htmlFor="model" className="w-full">
                    <p>Model</p>
                    <select
                      id="model"
                      className="appearance-none mt-2 w-full border rounded-md p-2 max-sm:text-[12px] outline-0 text-gray-700 "
                      placeholder="Select Model"
                      ref={modelRef}
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
                            Select Model
                          </option>
                          {modals &&
                            modals.map(({ modalTitle }, index) => (
                              <option
                                key={index}
                                value={modalTitle}
                                className="appearance-none active:bg-neutral-400 active:text-neutral-500 hover:bg-neutral-400 hover:text-neutral-500  focus:bg-neutral-400 focus:text-neutral-500 text-neutral-800 bg-white p-2"
                              >
                                {modalTitle}
                              </option>
                            ))}
                        </>
                      )}
                    </select>
                  </label>
                </div>
                {/*Price Input  */}
                <div className="w-auto my-3">
                  <label htmlFor="price" className="w-full">
                    <p>Price (USD)</p>
                    <input
                      type="text"
                      id="price"
                      ref={priceRef}
                      value={carData.price || ""}
                      onChange={(e) =>
                        setCarData({ ...carData, price: e.target.value })
                      }
                      className="mt-2 w-full border rounded-md p-2 max-sm:text-[12px]"
                    />
                  </label>
                </div>
                {/* Year Input */}
                <div className="w-auto my-3">
                  <label htmlFor="year" className="w-full">
                    <p>
                      Year <sup className="text-orange-700">*</sup>
                    </p>
                    <input
                      type="number"
                      id="year"
                      ref={yearRef}
                      value={carData.year || ""}
                      onChange={(e) =>
                        setCarData({ ...carData, year: e.target.value })
                      }
                      className={`mt-2 w-full border rounded-md p-2 max-sm:text-[12px] ${
                        isActive && "border-orange-400"
                      }`}
                    />
                  </label>
                </div>

                {/* Drive Type Input */}
                <div className="w-auto my-3">
                  <label htmlFor="driveType" className="w-full">
                    <p>Drive Type</p>
                    <select
                      id="driveType"
                      className="appearance-none mt-2 w-full border rounded-md p-2 max-sm:text-[12px] outline-0 "
                      placeholder="Select drive Type"
                      ref={driveTypeRef}
                      value={carData.drive_type || ""}
                      onChange={(e) =>
                        setCarData({ ...carData, drive_type: e.target.value })
                      }
                    >
                      <option
                        value=""
                        selected
                        disabled
                        className="appearance-none active:bg-neutral-400 active:text-neutral-500 hover:bg-neutral-400 hover:text-neutral-500 p-2"
                      >
                        Select Drive Type
                      </option>
                      <option
                        value="2WD"
                        className="appearance-none active:bg-neutral-400 active:text-neutral-500 hover:bg-neutral-400 hover:text-neutral-500  focus:bg-neutral-400 focus:text-neutral-500 text-neutral-800 bg-white p-2"
                      >
                        2WD
                      </option>
                      <option
                        value="4WD"
                        className="appearance-none active:bg-neutral-400 active:text-neutral-500 hover:bg-neutral-400 hover:text-neutral-500 focus:bg-neutral-400 focus:text-neutral-500 text-neutral-800 bg-white p-2"
                      >
                        4WD
                      </option>
                      <option
                        value="AW TS PW TV Airbag Navigation"
                        className="appearance-none active:bg-neutral-400 active:text-neutral-500 hover:bg-neutral-400 hover:text-neutral-500 focus:bg-neutral-400 focus:text-neutral-500 text-neutral-800 bg-white p-2"
                      >
                        AW TS PW TV Airbag Navigation
                      </option>
                      <option
                        value="AWD/4WD"
                        className="appearance-none active:bg-neutral-400 active:text-neutral-500 hover:bg-neutral-400 hover:text-neutral-500 focus:bg-neutral-400 focus:text-neutral-500 text-neutral-800 bg-white p-2"
                      >
                        AWD/4WD
                      </option>
                      <option
                        value="FRONT WHEEL DRIVE"
                        className="appearance-none active:bg-neutral-400 active:text-neutral-500 hover:bg-neutral-400 hover:text-neutral-500 focus:bg-neutral-400 focus:text-neutral-500 text-neutral-800 bg-white p-2"
                      >
                        FRONT WHEEL DRIVE
                      </option>
                      <option
                        value="REAR WHEEL DRIVE"
                        className="appearance-none active:bg-neutral-400 active:text-neutral-500 hover:bg-neutral-400 hover:text-neutral-500 focus:bg-neutral-400 focus:text-neutral-500 text-neutral-800 bg-white p-2"
                      >
                        REAR WHEEL DRIVE
                      </option>
                    </select>
                  </label>
                </div>

                {/* Transmission Input */}
                <div className="w-auto my-3">
                  <label htmlFor="transmission" className="w-full">
                    <p>Select Transmission</p>
                    <select
                      id="transmission"
                      className="appearance-none mt-2 w-full border rounded-md p-2 max-sm:text-[12px] outline-0 "
                      placeholder="Select transmission"
                      ref={transmissionRef}
                      value={carData.transmission || ""}
                      onChange={(e) =>
                        setCarData({ ...carData, transmission: e.target.value })
                      }
                    >
                      <option
                        value=""
                        selected
                        disabled
                        className="appearance-none active:bg-neutral-400 active:text-neutral-500 hover:bg-neutral-400 hover:text-neutral-500 p-2"
                      >
                        Select Transmission
                      </option>
                      <option
                        value="AT"
                        className="appearance-none active:bg-neutral-400 active:text-neutral-500 hover:bg-neutral-400 hover:text-neutral-500  focus:bg-neutral-400 focus:text-neutral-500 text-neutral-800 bg-white p-2"
                      >
                        AT
                      </option>
                      <option
                        value="AUTOMATIC"
                        className="appearance-none active:bg-neutral-400 active:text-neutral-500 hover:bg-neutral-400 hover:text-neutral-500 focus:bg-neutral-400 focus:text-neutral-500 text-neutral-800 bg-white p-2"
                      >
                        AUTOMATIC
                      </option>
                      <option
                        value="MANUAL"
                        className="appearance-none active:bg-neutral-400 active:text-neutral-500 hover:bg-neutral-400 hover:text-neutral-500 focus:bg-neutral-400 focus:text-neutral-500 text-neutral-800 bg-white p-2"
                      >
                        AW TS PW TV Airbag Navigation
                      </option>
                      <option
                        value="MT"
                        className="appearance-none active:bg-neutral-400 active:text-neutral-500 hover:bg-neutral-400 hover:text-neutral-500 focus:bg-neutral-400 focus:text-neutral-500 text-neutral-800 bg-white p-2"
                      >
                        MT
                      </option>
                      <option
                        value="SEMI-AUTOMATIC"
                        className="appearance-none active:bg-neutral-400 active:text-neutral-500 hover:bg-neutral-400 hover:text-neutral-500 focus:bg-neutral-400 focus:text-neutral-500 text-neutral-800 bg-white p-2"
                      >
                        FRONT WHEEL DRIVE
                      </option>
                    </select>
                  </label>
                </div>

                {/* Fuel Type Input */}
                <div className="w-auto my-3">
                  <label htmlFor="fuelType" className="w-full">
                    <p>Fuel Type</p>
                    <select
                      id="fuelType"
                      className="appearance-none mt-2 w-full border rounded-md p-2 max-sm:text-[12px] outline-0 "
                      placeholder="Select fuelType"
                      ref={fuelTypeRef}
                      value={carData.fuel_type || ""}
                      onChange={(e) =>
                        setCarData({ ...carData, fuel_type: e.target.value })
                      }
                    >
                      <option
                        value=""
                        selected
                        disabled
                        className="appearance-none active:bg-neutral-400 active:text-neutral-500 hover:bg-neutral-400 hover:text-neutral-500 p-2"
                      >
                        Select Fuel Type
                      </option>
                      <option
                        value="DEISEL"
                        className="appearance-none active:bg-neutral-400 active:text-neutral-500 hover:bg-neutral-400 hover:text-neutral-500  focus:bg-neutral-400 focus:text-neutral-500 text-neutral-800 bg-white p-2"
                      >
                        DEISEL
                      </option>
                      <option
                        value="ELECTRIC"
                        className="appearance-none active:bg-neutral-400 active:text-neutral-500 hover:bg-neutral-400 hover:text-neutral-500 focus:bg-neutral-400 focus:text-neutral-500 text-neutral-800 bg-white p-2"
                      >
                        ELECTRIC
                      </option>
                      <option
                        value="GAS"
                        className="appearance-none active:bg-neutral-400 active:text-neutral-500 hover:bg-neutral-400 hover:text-neutral-500 focus:bg-neutral-400 focus:text-neutral-500 text-neutral-800 bg-white p-2"
                      >
                        GAS
                      </option>
                      <option
                        value="GASOLINE"
                        className="appearance-none active:bg-neutral-400 active:text-neutral-500 hover:bg-neutral-400 hover:text-neutral-500 focus:bg-neutral-400 focus:text-neutral-500 text-neutral-800 bg-white p-2"
                      >
                        GASOLINE
                      </option>
                      <option
                        value="HYBRID"
                        className="appearance-none active:bg-neutral-400 active:text-neutral-500 hover:bg-neutral-400 hover:text-neutral-500 focus:bg-neutral-400 focus:text-neutral-500 text-neutral-800 bg-white p-2"
                      >
                        PETROL
                      </option>
                    </select>
                  </label>
                </div>

                {/* Mileage Input */}
                <div className="w-auto my-3">
                  <label htmlFor="mileage" className="w-full">
                    <p>Mileage</p>
                    <input
                      type="number"
                      id="mileage"
                      ref={mileageRef}
                      value={carData.mileage || ""}
                      onChange={(e) =>
                        setCarData({ ...carData, mileage: e.target.value })
                      }
                      placeholder="Enter Mileage Here"
                      className="mt-2 w-full border rounded-md p-2 max-sm:text-[12px]"
                    />
                  </label>
                </div>

                {/* Engine Size Input */}
                <div className="w-auto my-3">
                  <label htmlFor="engineSize" className="w-full">
                    <p>Enter Engine Size</p>
                    <input
                      type="number"
                      id="engineSize"
                      ref={engineSizeRef}
                      value={carData.engine_size || ""}
                      onChange={(e) =>
                        setCarData({ ...carData, engine_size: e.target.value })
                      }
                      className="mt-2 w-full border rounded-md p-2 max-sm:text-[12px]"
                    />
                  </label>
                </div>

                {/* Cylinder Input */}
                <div className="w-auto my-3">
                  <label htmlFor="cylinder" className="w-full">
                    <p>Select Cylinders</p>
                    <select
                      id="cylinder"
                      className="appearance-none mt-2 w-full border rounded-md p-2 max-sm:text-[12px] outline-0 "
                      placeholder="Select cylinder"
                      ref={cylinderRef}
                      value={carData.cylinders || ""}
                      onChange={(e) =>
                        setCarData({ ...carData, cylinders: e.target.value })
                      }
                    >
                      <option
                        value=""
                        selected
                        disabled
                        className="appearance-none active:bg-neutral-400 active:text-neutral-500 hover:bg-neutral-400 hover:text-neutral-500 p-2"
                      >
                        Select Cylinders
                      </option>
                      <option
                        value="4"
                        className="appearance-none active:bg-neutral-400 active:text-neutral-500 hover:bg-neutral-400 hover:text-neutral-500  focus:bg-neutral-400 focus:text-neutral-500 text-neutral-800 bg-white p-2"
                      >
                        4
                      </option>
                      <option
                        value="6"
                        className="appearance-none active:bg-neutral-400 active:text-neutral-500 hover:bg-neutral-400 hover:text-neutral-500 focus:bg-neutral-400 focus:text-neutral-500 text-neutral-800 bg-white p-2"
                      >
                        6
                      </option>
                      <option
                        value="8"
                        className="appearance-none active:bg-neutral-400 active:text-neutral-500 hover:bg-neutral-400 hover:text-neutral-500 focus:bg-neutral-400 focus:text-neutral-500 text-neutral-800 bg-white p-2"
                      >
                        8
                      </option>
                    </select>
                  </label>
                </div>

                {/* Colours Input */}
                <div className="w-auto my-3">
                  <label htmlFor="colours" className="w-full">
                    <p>Select Colours</p>
                    <select
                      id="colours"
                      className="appearance-none mt-2 w-full border rounded-md p-2 max-sm:text-[12px] outline-0 "
                      placeholder="Select colours"
                      ref={colorRef}
                      value={carData.color || ""}
                      onChange={(e) =>
                        setCarData({ ...carData, color: e.target.value })
                      }
                    >
                      <option
                        value=""
                        selected
                        disabled
                        className="appearance-none active:bg-neutral-400 active:text-neutral-500 hover:bg-neutral-400 hover:text-neutral-500 p-2"
                      >
                        Select Colours
                      </option>
                      <option
                        value="Black"
                        className="appearance-none active:bg-neutral-400 active:text-neutral-500 hover:bg-neutral-400 hover:text-neutral-500  focus:bg-neutral-400 focus:text-neutral-500 text-neutral-800 bg-white p-2"
                      >
                        Black
                      </option>
                      <option
                        value="Blue"
                        className="appearance-none active:bg-neutral-400 active:text-neutral-500 hover:bg-neutral-400 hover:text-neutral-500 focus:bg-neutral-400 focus:text-neutral-500 text-neutral-800 bg-white p-2"
                      >
                        Blue
                      </option>
                      <option
                        value="Brown"
                        className="appearance-none active:bg-neutral-400 active:text-neutral-500 hover:bg-neutral-400 hover:text-neutral-500 focus:bg-neutral-400 focus:text-neutral-500 text-neutral-800 bg-white p-2"
                      >
                        Brown
                      </option>
                      <option
                        value="Gold"
                        className="appearance-none active:bg-neutral-400 active:text-neutral-500 hover:bg-neutral-400 hover:text-neutral-500 focus:bg-neutral-400 focus:text-neutral-500 text-neutral-800 bg-white p-2"
                      >
                        Gold
                      </option>
                      <option
                        value="Grey"
                        className="appearance-none active:bg-neutral-400 active:text-neutral-500 hover:bg-neutral-400 hover:text-neutral-500 focus:bg-neutral-400 focus:text-neutral-500 text-neutral-800 bg-white p-2"
                      >
                        Grey
                      </option>
                      <option
                        value="Green"
                        className="appearance-none active:bg-neutral-400 active:text-neutral-500 hover:bg-neutral-400 hover:text-neutral-500 focus:bg-neutral-400 focus:text-neutral-500 text-neutral-800 bg-white p-2"
                      >
                        Green
                      </option>

                      <option
                        value="Orange"
                        className="appearance-none active:bg-neutral-400 active:text-neutral-500 hover:bg-neutral-400 hover:text-neutral-500  focus:bg-neutral-400 focus:text-neutral-500 text-neutral-800 bg-white p-2"
                      >
                        Orange
                      </option>
                      <option
                        value="Pearl white"
                        className="appearance-none active:bg-neutral-400 active:text-neutral-500 hover:bg-neutral-400 hover:text-neutral-500 focus:bg-neutral-400 focus:text-neutral-500 text-neutral-800 bg-white p-2"
                      >
                        Pearl white
                      </option>
                      <option
                        value="Red"
                        className="appearance-none active:bg-neutral-400 active:text-neutral-500 hover:bg-neutral-400 hover:text-neutral-500 focus:bg-neutral-400 focus:text-neutral-500 text-neutral-800 bg-white p-2"
                      >
                        Red
                      </option>
                      <option
                        value="Silver"
                        className="appearance-none active:bg-neutral-400 active:text-neutral-500 hover:bg-neutral-400 hover:text-neutral-500 focus:bg-neutral-400 focus:text-neutral-500 text-neutral-800 bg-white p-2"
                      >
                        Silver
                      </option>
                      <option
                        value="White"
                        className="appearance-none active:bg-neutral-400 active:text-neutral-500 hover:bg-neutral-400 hover:text-neutral-500 focus:bg-neutral-400 focus:text-neutral-500 text-neutral-800 bg-white p-2"
                      >
                        White
                      </option>
                      <option
                        value="Wine"
                        className="appearance-none active:bg-neutral-400 active:text-neutral-500 hover:bg-neutral-400 hover:text-neutral-500 focus:bg-neutral-400 focus:text-neutral-500 text-neutral-800 bg-white p-2"
                      >
                        Wine
                      </option>
                      <option
                        value="Yellow"
                        className="appearance-none active:bg-neutral-400 active:text-neutral-500 hover:bg-neutral-400 hover:text-neutral-500 focus:bg-neutral-400 focus:text-neutral-500 text-neutral-800 bg-white p-2"
                      >
                        Yellow
                      </option>
                    </select>
                  </label>
                </div>

                {/* Door Input */}
                <div className="w-auto my-3">
                  <label htmlFor="door" className="w-full">
                    <p>Doors</p>
                    <select
                      id="door"
                      className="appearance-none mt-2 w-full border rounded-md p-2 max-sm:text-[12px] outline-0 "
                      placeholder="Select Doors"
                      ref={doorRef}
                      value={carData.door || ""}
                      onChange={(e) =>
                        setCarData({ ...carData, door: e.target.value })
                      }
                    >
                      <option
                        value=""
                        selected
                        disabled
                        className="appearance-none active:bg-neutral-400 active:text-neutral-500 hover:bg-neutral-400 hover:text-neutral-500 p-2"
                      >
                        Select Doors
                      </option>
                      <option
                        value="2 Doors"
                        className="appearance-none active:bg-neutral-400 active:text-neutral-500 hover:bg-neutral-400 hover:text-neutral-500  focus:bg-neutral-400 focus:text-neutral-500 text-neutral-800 bg-white p-2"
                      >
                        2 Doors
                      </option>
                      <option
                        value="3-Door"
                        className="appearance-none active:bg-neutral-400 active:text-neutral-500 hover:bg-neutral-400 hover:text-neutral-500 focus:bg-neutral-400 focus:text-neutral-500 text-neutral-800 bg-white p-2"
                      >
                        3-Door
                      </option>
                      <option
                        value="4-Door"
                        className="appearance-none active:bg-neutral-400 active:text-neutral-500 hover:bg-neutral-400 hover:text-neutral-500 focus:bg-neutral-400 focus:text-neutral-500 text-neutral-800 bg-white p-2"
                      >
                        4-Door
                      </option>
                      <option
                        value="5-Door"
                        className="appearance-none active:bg-neutral-400 active:text-neutral-500 hover:bg-neutral-400 hover:text-neutral-500 focus:bg-neutral-400 focus:text-neutral-500 text-neutral-800 bg-white p-2"
                      >
                        5-Door
                      </option>
                      <option
                        value="5D"
                        className="appearance-none active:bg-neutral-400 active:text-neutral-500 hover:bg-neutral-400 hover:text-neutral-500 focus:bg-neutral-400 focus:text-neutral-500 text-neutral-800 bg-white p-2"
                      >
                        5D
                      </option>
                    </select>
                  </label>
                </div>

                {/* Vin Input */}
                <div className="w-auto my-3">
                  <label htmlFor="vin" className="w-full">
                    <p>Vin</p>
                    <input
                      type="text"
                      id="vin"
                      ref={vinRef}
                      className="mt-2 w-full border rounded-md p-2 max-sm:text-[12px]"
                      placeholder="Enter Vin Here"
                      value={carData.vin || ""}
                      onChange={(e) =>
                        setCarData({ ...carData, vin: e.target.value })
                      }
                    />
                  </label>
                </div>

                {/* Availabilty Input */}
                <div className="w-auto my-3">
                  <label htmlFor="availability" className="w-full">
                    <p>Availability</p>
                    <select
                      id="availability"
                      className="appearance-none mt-2 w-full border rounded-md p-2 max-sm:text-[12px] outline-0 "
                      placeholder="Select Availability"
                      ref={availabilityRef}
                      value={carData.availability || ""}
                      onChange={(e) =>
                        setCarData({ ...carData, availability: e.target.value })
                      }
                    >
                      <option
                        value=""
                        selected
                        disabled
                        className="appearance-none active:bg-neutral-400 active:text-neutral-500 hover:bg-neutral-400 hover:text-neutral-500 p-2"
                      >
                        Select Availability
                      </option>
                      <option
                        value="Available"
                        className="appearance-none active:bg-neutral-400 active:text-neutral-500 hover:bg-neutral-400 hover:text-neutral-500  focus:bg-neutral-400 focus:text-neutral-500 text-neutral-800 bg-white p-2"
                      >
                        Available
                      </option>
                      <option
                        value="Sold"
                        className="appearance-none active:bg-neutral-400 active:text-neutral-500 hover:bg-neutral-400 hover:text-neutral-500 focus:bg-neutral-400 focus:text-neutral-500 text-neutral-800 bg-white p-2"
                      >
                        Sold
                      </option>
                    </select>
                  </label>
                </div>
              </div>

              {/* Description textArea  */}
              <div className="w-full">
                <label htmlFor="title" className="w-full">
                  <p>Description </p>
                  <textarea
                    id="description"
                    ref={descriptionRef}
                    className="mt-2 w-full h-[250px] max-md:h-[200px] max-sm:h-[150px] border rounded-md p-2"
                    value={carData.carDescription || ""}
                    onChange={(e) =>
                      setCarData({ ...carData, carDescription: e.target.value })
                    }
                  />
                </label>
              </div>
            </div>

            {/* Featured Image */}
            <div>
              {/* Heading */}
              <div className="flex justify-between items-center p-6 max-sm:p-2 mb-4 max-md:mb-2 max-sm:mb-0">
                <h1 className="text-3xl font-bold  max-sm:text-2xl max-xs:text-xl">
                  Feature Image
                </h1>
              </div>

              {/* Content */}
              <div className="imageInpput border text-sm rounded-md w-full h-auto p-10 max-md:p-6 max-sm:p-4">
                {/* Image Input */}
                <div className="flex flex-col gap-2 space-y-4">
                  Upload Featured Image
                  <label htmlFor="featuredImage" className="w-full h-auto flex">
                    {/* Custom Button */}
                    <button
                      type="button"
                      className="bg-neutral-300 border border-r-0 hover:bg-neutral-400 w-[120px] p-3  max-md:w-[100px] max-sm:w-[80px] max-md:text-[14px] max-sm:text-[12px] p-3 max-sm:p-1 rounded-bl-xl rounded-tl-xl shadow-md transition duration-300"
                    >
                      Upload File
                    </button>

                    {/* Hidden Input */}
                    <input
                      type="file"
                      id="featuredImage"
                      required
                      files={carData.featured_image || ""}
                      onChange={handleFeaturedChange}
                      className={`border rounded-br-xl p-3 max-sm:text-[12px] max-md:text-[14px] rounded-tr-xl w-[90%] ${
                        isActive && "border-orange-400"
                      }`}
                    />
                  </label>
                </div>

                {/* Image Preview */}
                <div
                  id="showFeaturedImage"
                  className="showImage w-[200px] mt-5 h-[200px] flex justify-center items-center relative"
                >
                  <div
                    className="crossBtn  text-xl p-1 shadow-lg h-auto w-auto rounded-full bg-white hover:bg-red-400 cursor-pointer  absolute top-0 right-0 z-10"
                    onClick={hiddenFeaturedImage}
                  >
                    ❌
                  </div>
                  <img
                    loading="lazy"
                    src={`/${carData.featured_image}`}
                    alt="image"
                    className="w-[160px] h-[160px] rounded-lg max-[780px]:w-[140px] max-[780px]:h-[140px] object-cover"
                  />
                </div>
              </div>
            </div>

            {/* Gallery Images */}
            <div>
              {/* Heading */}
              <div className="flex justify-between items-center p-6  max-sm:p-2 mb-4 max-md:mb-2 max-sm:mb-0">
                <h1 className="text-3xl font-bold  max-sm:text-2xl max-xs:text-xl">
                  Gallery
                </h1>
              </div>

              {/* Content */}
              <div className="imageInpput border text-sm rounded-md w-full h-auto p-10 max-md:p-6 max-sm:p-4">
                {/* Image Input */}
                <div className="flex flex-col gap-2 space-y-4">
                  Upload Gallery Image
                  <label htmlFor="galleryImages" className="w-full h-auto flex">
                    <button
                      type="file"
                      //  onClick={handleButtonClick}
                      className="bg-neutral-300 border border-r-0 hover:bg-neutral-400 w-[120px] p-3  max-md:w-[100px] max-sm:w-[80px] max-md:text-[14px] max-sm:text-[12px] max-sm:p-1 rounded-bl-xl rounded-tl-xl shadow-md transition duration-300"
                    >
                      Upload File
                    </button>

                    <input
                      type="file"
                      id="galleryImages"
                      required
                      multiple
                      onChange={handleGalleryChange}
                      className={`border rounded-br-xl p-3 rounded-tr-xl w-[90%] max-sm:text-[12px] max-md:text-[14px]  ${
                        isActive && "border-orange-400"
                      }`}
                    />
                  </label>
                </div>
                {/* Image Preview */}
                <div className="flex w-auto h-auto p-3">
                  <div
                    id="showGalleryImages"
                    className="showImage w-full mt-5 h-auto gap-4 flex-wrap flex justify-start items-center "
                  >
                    {carData?.galleryImages?.map((galleryImage, index) => (
                      <div
                        key={index}
                        className="w-auto h-auto p-3 max-[780px]:p-1 relative"
                      >
                        <div
                          className="crossBtn text-xl p-1 shadow-lg h-auto w-auto rounded-full bg-white hover:bg-red-400 cursor-pointer  absolute top-0 right-0 z-10"
                          onClick={(e) => hiddenGalleryImage(e)}
                        >
                          {" "}
                          ❌
                        </div>
                        <img
                          loading="lazy"
                          src={`/${galleryImage}`}
                          alt={`gallery-image-${index}`}
                          className="w-[160px] h-[160px] rounded-lg max-[780px]:w-[140px] max-[780px]:h-[140px] object-cover"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Attachment Images */}
            <div>
              {/* Heading */}
              <div className="flex justify-between items-center p-6 max-sm:p-2 mb-4 max-md:mb-2 max-sm:mb-0">
                <h1 className="text-3xl font-bold  max-sm:text-2xl max-xs:text-xl">
                  Attachements
                </h1>
              </div>

              {/* Content */}
              <div className="imageInpput border text-sm rounded-md w-full h-auto p-10 max-sm:p-4  max-md:p-6 ">
                {/* Image Input */}
                <div className="flex flex-col gap-2 space-y-4">
                  Upload Attachement
                  <label
                    htmlFor="attachmentImage"
                    className="w-full h-auto flex"
                  >
                    <button
                      type="button"
                      className="bg-neutral-300 border border-r-0 hover:bg-neutral-400 w-[120px] max-md:w-[100px] max-sm:w-[80px] max-md:text-[14px] max-sm:text-[12px] p-3 max-sm:p-1 rounded-bl-xl rounded-tl-xl shadow-md transition duration-300"
                    >
                      Upload File
                    </button>

                    <input
                      type="file"
                      id="attachmentImage"
                      onChange={handleAttachmentChange}
                      className={`border rounded-br-xl p-3 max-sm:text-[12px] max-md:text-[14px]  rounded-tr-xl w-[90%]  ${
                        isActive && "border-orange-400"
                      }`}
                    />
                  </label>
                </div>

                {/* Image Preview */}
                {carData.attachmentImage == null ? (
                  <>
                    <h3 className="text-neutral-700 pt-3 text-2xl max-sm:text-[14px] font-bold">
                      Uploaded Image{" "}
                    </h3>
                    <p className="p-2 text-md max-sm:text-[14px]">
                      No Image Uploaded
                    </p>
                  </>
                ) : (
                  <>
                    <div
                      id="showAttachmentImage"
                      className="showImage p-3 w-[200px] mt-5 h-[200px] flex justify-center items-center relative"
                    >
                      <div
                        className="crossBtn  text-xl p-1 shadow-lg h-auto w-auto rounded-full bg-white hover:bg-red-400 cursor-pointer  absolute top-0 right-0 z-10"
                        onClick={hiddenAttachmentImage}
                      >
                        ❌
                      </div>
                      <img
                        loading="lazy"
                        src={`/${carData.attachmentImage}`}
                        alt="image"
                        className="w-[160px] h-[160px] rounded-lg"
                      />
                    </div>
                  </>
                )}
              </div>
            </div>

            {/* Features */}
            <div>
              {/* Heading */}
              <div className="flex justify-between items-center p-3 mb-4 max-md:mb-2 max-sm:mb-0">
                <h1 className="text-3xl font-bold  max-sm:text-2xl max-xs:text-xl">
                  Features
                </h1>
              </div>

              {/* Content */}
              <div className="card pt-3 flex  border rounded-md ">
                <div className="row flex flex-wrap m-2">
                  <div className="card-body p-3 grid grid-cols-3 max-lg:grid-cols-2 max-md:grid-cols-1">
                    {AllFeatures.map((feature) => (
                      <div
                        key={feature.id}
                        className="col-md-4 mb-3 w-auto text-sm font-semibold text-neutral-700 px-3 py-1"
                      >
                        <div className="form-check">
                          <input
                            className="form-check-input mx-2"
                            type="checkbox"
                            name="selectedFeatures[]"
                            value={feature.value}
                            id={feature.value}
                            onChange={(e) =>
                              handleFeatureChange(e, "allFeatures")
                            }
                            checked={carAllFeatures
                              .map((item) => item)
                              .includes(feature.value)}
                          />
                          <label
                            className="form-check-label"
                            htmlFor={feature.value}
                          >
                            {feature.label}
                          </label>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Safety Features */}
            <div>
              {/* heading */}
              <div className="flex justify-between items-center p-3 mb-4 max-md:mb-2 max-sm:mb-0">
                <h1 className="text-3xl font-bold  max-sm:text-2xl max-xs:text-xl">
                  Safety Features
                </h1>
              </div>
              {/* Content */}
              <div className="card pt-3 flex  border rounded-md ">
                <div className="row flex flex-wrap m-2">
                  <div className="card-body p-3 grid grid-cols-3 max-lg:grid-cols-2 max-md:grid-cols-1">
                    {safetyFeatures.map((feature) => (
                      <div
                        key={feature.id}
                        className="col-md-4 mb-3 w-auto text-sm font-semibold text-neutral-700  px-3 py-1"
                      >
                        <div className="form-check">
                          <input
                            className="form-check-input mx-2"
                            type="checkbox"
                            name="selectedSafetyFeatures[]"
                            value={feature.value}
                            id={feature.value}
                            checked={carSafetyFeatures
                              .map((item) => item)
                              .includes(feature.value)}
                            onChange={(e) =>
                              handleSafetyFeatureChange(e, "safetyFeatures")
                            }
                          />

                          <label
                            className="form-check-label"
                            htmlFor={feature.value}
                          >
                            {feature.label}
                          </label>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </form>

          {/* Edit Listing Button */}
          <div className="button w-full flex justify-start items-center p-6">
            <AdminButton text="Update Listing" onClick={updateDetail} />
          </div>
        </div>

        {/* Copyright */}
        <div className="w-full h-[150px] ">
          <Copyright />
        </div>
      </div>
    </div>
  );
};

export default EditListingForm;
