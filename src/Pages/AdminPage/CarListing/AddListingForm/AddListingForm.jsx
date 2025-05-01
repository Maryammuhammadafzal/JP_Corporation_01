import React, { useEffect, useRef, useState } from "react";
import Button from "../../../../Components/Button/Button.jsx";
import axios from "axios";
import AllFeatures from "../../../../Components/AllFeatures.js";
import { safetyFeatures } from "../../../../Components/safetyFeatures.js";
import Copyright from "../../../../Components/Copyright/Copyright.jsx";

const AddListingForm = () => {
  let [isActive, setIsActive] = useState(false);
  const [featuredImage, setFeaturedImage] = useState(null);
  const [attachmentImage, setAttachmentImage] = useState(null);
  const [galleryImages, setGalleryImages] = useState([]);
  const [selectedAllFeatures, setSelectedAllFeatures] = useState([]);
  const [selectedSafetyFeatures, setselectedSafetyFeatures] = useState([]);
  const [make, setMake] = useState(null);
  const [modals, setModals] = useState("");

  // Handle Features
  const toggleCheckbox = (featureValue) => {
    if (selectedAllFeatures.includes(featureValue)) {
      setSelectedAllFeatures(
        selectedAllFeatures.filter((value) => value !== featureValue)
      );
    } else {
      setSelectedAllFeatures([...selectedAllFeatures, featureValue]);
    }
  };

  const toggleSafetyCheckbox = (featureValue) => {
    if (selectedSafetyFeatures.includes(featureValue)) {
      setselectedSafetyFeatures(
        selectedSafetyFeatures.filter((value) => value !== featureValue)
      );
    } else {
      setselectedSafetyFeatures([...selectedSafetyFeatures, featureValue]);
    }
  };

  // Handle Input Reference
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

  // Handle Images
  const handleFeaturedChange = (e) => {
    setFeaturedImage(e.target.files[0]);
  };
  const handleAttachmentChange = (e) => {
    setAttachmentImage(e.target.files[0]);
  };
  const handleGalleryChange = (e) => {
    setGalleryImages([...e.target.files]);
  };

  // Fetch Modal By Make Api Call
  const fetchModalByMake = async (make) => {
    const response = await axios.get(
      `http://localhost:5000/api/model/`
    );
    const data = await response.data;

    setModals(data);
    console.log(data);
    
  };
  
  const handleMake = (e) => {
    setMake(e.target.value);
    fetchModalByMake(e.target.value);
  };

  // Submit Listing Form
  const SubmitDetail = async (e) => {
    e.preventDefault();

    if (!titleRef.current.value) {
      titleRef.current.scrollIntoView({ behavior: "smooth", block: "center" });
      titleRef.current.focus();
      setIsActive("title");
    } else if (!conditionRef.current.value) {
      conditionRef.current.scrollIntoView({ behavior: "smooth", block: "center" });
      conditionRef.current.focus();
      setIsActive("condition");
    } else if (!typeRef.current.value) {
      typeRef.current.scrollIntoView({ behavior: "smooth", block: "center" });
      typeRef.current.focus();
      setIsActive("type");
    } else if (!yearRef.current.value) {
      yearRef.current.scrollIntoView({ behavior: "smooth", block: "center" });
      yearRef.current.focus();
      setIsActive("year");
    }  else if (!makeRef.current.value) {
      makeRef.current.scrollIntoView({ behavior: "smooth", block: "center" });
      makeRef.current.focus();
      setIsActive("make");
    }  else {
      const formData = new FormData();

      // All Inputs
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
      formData.append("doors", doorRef.current.value);
      formData.append("vin", vinRef.current.value);
      formData.append("availability", availabilityRef.current.value);
      formData.append("description", descriptionRef.current.value);
      formData.append("features", JSON.stringify(selectedAllFeatures));
      formData.append(
        "safety_features",
        JSON.stringify(selectedSafetyFeatures)
      );
      // Images
      formData.append("featured_image", featuredImage);
      // formData.append("attachmentImage", attachmentImage);

      // for (let i = 0; i < galleryImages.length; i++) {
      //   formData.append("galleryImages", galleryImages[i]);
      // }

      
      // Post Api Call
      try {
        const token = localStorage.getItem("adminToken");
        const response = await axios.post(
          "http://localhost:5000/api/carListing/add",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
              // "Content-Type": "application/json",
              "Authorization": `Bearer ${token}`
            },
          }
        );

        console.log("Success" + JSON.stringify(response.data));
        alert("Added Succesfully");

        // Reset refs
        titleRef.current.value = "";
        typeRef.current.value = "";
        availabilityRef.current.value = "";
        descriptionRef.current.value = "";
        vinRef.current.value = "";
        doorRef.current.value = "";
        colorRef.current.value = "";
        cylinderRef.current.value = "";
        engineSizeRef.current.value = "";
        mileageRef.current.value = "";
        fuelTypeRef.current.value = "";
        transmissionRef.current.value = "";
        driveTypeRef.current.value = "";
        yearRef.current.value = "";
        priceRef.current.value = "";
        modelRef.current.value = "";
        makeRef.current.value = "";

        // Reset file inputs
        document.getElementById("featuredImage").value = "";
        document.getElementById("galleryImages").value = "";
        document.getElementById("attachmentImage").value = "";

        // Reset checkboxes
        document
          .querySelectorAll("input[type='checkbox']")
          .forEach((checkbox) => {
            checkbox.checked = false;
          });

        // Redirect to dashboard
        window.location.href = "/dashboard";
      } catch (error) {
        console.error(error);
        alert("Error");
      }
    }
  };

  return (
    <div className="w-full max-h-auto min-h-screen rounded-tr-[50px]  flex flex-col overflow-y-auto ">
      <div className="w-full h-auto  flex flex-col gap-4 p-5 mb-4 max-sm:p-3 items-start">
        <div className="w-[95%]  mx-auto border mb-3 rounded-md  py-3">
          <div className="w-full flex flex-col mx-auto rounded-md p-3 mb-4">
            {/* Add Listing Heading */}
            <div className="flex justify-between items-center p-6 mb-4">
              <h1 className="text-3xl font-bold">Add Details</h1>
            </div>

            {/* Add Listing Form */}
            <form
              onSubmit={SubmitDetail}
              className="form w-full h-auto p-3 flex flex-col gap-5"
            >
              <div className="p-6 border rounded-md text-sm text-gray-600 w-full h-auto">
                {/* Title Input */}
                <div className="w-full">
                  <label htmlFor="title" className="w-full">
                    <p>
                      Listing Title <sup className="text-orange-700">*</sup>
                    </p>
                    <input
                      type="text"
                      id="title"
                      ref={titleRef}
                      className={`mt-2 w-full border rounded-md p-2 ${
                        isActive && "border-orange-400"
                      }`}
                      placeholder="Enter Title Here"
                    />
                  </label>
                </div>
                <div className="w-full  grid grid-cols-3 justify-start max-lg:grid-cols-2 max-md:grid-cols-1 my-3">
                  {/* Condition Input */}
                  <div className="w-auto mx-2 my-3">
                    <label htmlFor="condition" className="w-full">
                      <p>
                        Condition <sup className="text-orange-700">*</sup>
                      </p>
                      <select
                        id="condition"
                        className={`appearance-none mt-2 w-full border rounded-md p-2 outline-0 text-gray-700  ${
                          isActive && "border-orange-400"
                        }`}
                        placeholder="Select Condition"
                        ref={conditionRef}
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
                    </label>
                  </div>
                  {/* Type Input */}
                  <div className="w-auto mx-2 my-3">
                    <label htmlFor="type" className="w-full">
                      <p>
                        Type <sup className="text-orange-700">*</sup>
                      </p>
                      <select
                        id="type"
                        className={`appearance-none mt-2 w-full border rounded-md p-2 outline-0 text-gray-700  ${
                          isActive && "border-orange-400"
                        }`}
                        placeholder="Select Type"
                        ref={typeRef}
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
                  <div className="w-auto mx-2 my-3">
                    <label htmlFor="make" className="w-full">
                      <p>Make</p>
                      <select
                        id="make"
                        className={`appearance-none mt-2 w-full border rounded-md p-2 outline-0 text-gray-700 ${isActive && "border-orange-400"}`}
                        placeholder="Select make"
                        ref={makeRef}
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
                        className="appearance-none mt-2 w-full border rounded-md p-2 outline-0 text-gray-700 "
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
                              modals.map(({ makeID , modelID , model }, index) => (
                                <option
                                  key={modelID}
                                  value={model}
                                  className="appearance-none active:bg-neutral-400 active:text-neutral-500 hover:bg-neutral-400 hover:text-neutral-500  focus:bg-neutral-400 focus:text-neutral-500 text-neutral-800 bg-white p-2"
                                >
                                  {model}
                                </option>
                              ))}
                          </>
                        )}
                      </select>
                    </label>
                  </div>

                  {/*Price Input  */}
                  <div className="w-auto mx-2 my-3">
                    <label htmlFor="price" className="w-full">
                      <p>Price (USD)</p>
                      <input
                        type="number"
                        id="price"
                        ref={priceRef}
                        className="mt-2 w-full border rounded-md p-2"
                      />
                    </label>
                  </div>
                  <div className="w-auto mx-2 my-3">
                    <label htmlFor="year" className="w-full">
                      <p>
                        Year <sup className="text-orange-700">*</sup>
                      </p>
                      <input
                        type="number"
                        id="year"
                        ref={yearRef}
                        className={`mt-2 w-full border rounded-md p-2  ${
                          isActive && "border-orange-400"
                        }`}
                      />
                    </label>
                  </div>

                  {/* Drive Type Input */}
                  <div className="w-auto mx-2 my-3">
                    <label htmlFor="driveType" className="w-full">
                      <p>Drive Type</p>
                      <select
                        id="driveType"
                        className="appearance-none mt-2 w-full border rounded-md p-2 outline-0 text-gray-700 "
                        placeholder="Select drive Type"
                        ref={driveTypeRef}
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
                  <div className="w-auto mx-2 my-3">
                    <label htmlFor="transmission" className="w-full">
                      <p>Select Transmission</p>
                      <select
                        id="transmission"
                        className="appearance-none mt-2 w-full border rounded-md p-2 outline-0 text-gray-700 "
                        placeholder="Select transmission"
                        ref={transmissionRef}
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
                  <div className="w-auto mx-2 my-3">
                    <label htmlFor="fuelType" className="w-full">
                      <p>Fuel Type</p>
                      <select
                        id="fuelType"
                        className="appearance-none mt-2 w-full border rounded-md p-2 outline-0 text-gray-700 "
                        placeholder="Select fuelType"
                        ref={fuelTypeRef}
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
                          value="PETROL"
                          className="appearance-none active:bg-neutral-400 active:text-neutral-500 hover:bg-neutral-400 hover:text-neutral-500 focus:bg-neutral-400 focus:text-neutral-500 text-neutral-800 bg-white p-2"
                        >
                          PETROL
                        </option>
                      </select>
                    </label>
                  </div>

                  {/* Mileage Input */}
                  <div className="w-auto mx-2 my-3">
                    <label htmlFor="mileage" className="w-full">
                      <p>Mileage</p>
                      <input
                        type="number"
                        id="mileage"
                        ref={mileageRef}
                        placeholder="Enter Mileage Here"
                        className="mt-2 w-full border rounded-md text-gray-600 p-2"
                      />
                    </label>
                  </div>

                  {/* Engine Size Input */}
                  <div className="w-auto mx-2 my-3">
                    <label htmlFor="engineSize" className="w-full">
                      <p>Enter Engine Size</p>
                      <input
                        type="number"
                        id="engineSize"
                        ref={engineSizeRef}
                        className="mt-2 w-full border rounded-md p-2"
                      />
                    </label>
                  </div>

                  {/* Cylinder Input */}
                  <div className="w-auto mx-2 my-3">
                    <label htmlFor="cylinder" className="w-full">
                      <p>Select Cylinders</p>
                      <select
                        id="cylinder"
                        className="appearance-none mt-2 w-full border rounded-md p-2 outline-0 text-gray-700 "
                        placeholder="Select cylinder"
                        ref={cylinderRef}
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
                  <div className="w-auto mx-2 my-3">
                    <label htmlFor="colours" className="w-full">
                      <p>Select Colours</p>
                      <select
                        id="colours"
                        className="appearance-none mt-2 w-full border rounded-md p-2 outline-0 text-gray-700 "
                        placeholder="Select colours"
                        ref={colorRef}
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
                  <div className="w-auto mx-2 my-3">
                    <label htmlFor="door" className="w-full">
                      <p>Doors</p>
                      <select
                        id="door"
                        className="appearance-none mt-2 w-full border rounded-md p-2 outline-0 text-gray-700 "
                        placeholder="Select Doors"
                        ref={doorRef}
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
                  <div className="w-auto mx-2 my-3">
                    <label htmlFor="vin" className="w-full">
                      <p>Vin</p>
                      <input
                        type="text"
                        id="vin"
                        ref={vinRef}
                        className="mt-2 w-full border rounded-md p-2"
                        placeholder="Enter Vin Here"
                      />
                    </label>
                  </div>

                  {/* Availabilty Input */}
                  <div className="w-auto mx-2 my-3">
                    <label htmlFor="availability" className="w-full">
                      <p>Availability</p>
                      <select
                        id="availability"
                        className="appearance-none mt-2 w-full border rounded-md p-2 outline-0 text-gray-700 "
                        placeholder="Select Availability"
                        ref={availabilityRef}
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
                {/* Description */}
                <div className="w-full">
                  <label htmlFor="description" className="w-full">
                    <p>Description </p>
                    <textarea
                      id="description"
                      ref={descriptionRef}
                      className="mt-2 w-full h-[250px] border rounded-md p-2"
                    />
                  </label>
                </div>
              </div>

              {/* Featured Image */}
              <div className="flex justify-between items-center p-6 mb-4">
                <h1 className="text-3xl font-bold">Feature Image</h1>
              </div>
              <div className="imageInpput border text-sm rounded-md w-full h-auto p-10 ">
                <div className="flex flex-col gap-2 space-y-4">
                  Upload Featured Image
                  <label htmlFor="featuredImage" className="w-full h-auto flex">
                    {/* Custom Button */}
                    <button
                      type="button"
                      className="bg-neutral-300 border border-r-0 hover:bg-neutral-400 w-[120px] p-3  rounded-bl-xl rounded-tl-xl shadow-md transition duration-300"
                    >
                      Upload File
                    </button>

                    {/* Hidden Input */}
                    <input
                      type="file"
                      id="featuredImage"
                      accept="image/*"
                      required
                      onChange={handleFeaturedChange}
                      className="border rounded-br-xl p-3 rounded-tr-xl w-[90%]"
                    />
                  </label>
                </div>
              </div>

              {/* Gallery Images */}
              <div className="flex justify-between items-center p-6 mb-4">
                <h1 className="text-3xl font-bold">Gallery</h1>
              </div>
              <div className="imageInpput border text-sm rounded-md w-full h-auto p-10 ">
                <div className="flex flex-col gap-2 space-y-4">
                  Upload Gallery Image
                  <label htmlFor="galleryImages" className="w-full h-auto flex">
                    <button
                      type="file"
                      className="bg-neutral-300 border border-r-0 hover:bg-neutral-400 w-[120px] p-3  rounded-bl-xl rounded-tl-xl shadow-md transition duration-300"
                    >
                      Upload File
                    </button>

                    <input
                      type="file"
                      id="galleryImages"
                      multiple
                      required
                      onChange={handleGalleryChange}
                      className="border rounded-br-xl p-3 rounded-tr-xl w-[90%]"
                    />
                  </label>
                </div>
              </div>

              {/* Attachment Image */}
              <div className="flex justify-between items-center p-6 mb-4">
                <h1 className="text-3xl font-bold">Attachements</h1>
              </div>
              <div className="imageInpput border text-sm rounded-md w-full h-auto p-10 ">
                <div className="flex flex-col gap-2 space-y-4">
                  Upload Attachement
                  <label
                    htmlFor="attachmentImage"
                    className="w-full h-auto flex"
                  >
                    <button
                      type="button"
                      className="bg-neutral-300 border border-r-0 hover:bg-neutral-400 w-[120px] p-3  rounded-bl-xl rounded-tl-xl shadow-md transition duration-300"
                    >
                      Upload File
                    </button>

                    <input
                      type="file"
                      id="attachmentImage"
                      onChange={handleAttachmentChange}
                      className="border rounded-br-xl p-3 rounded-tr-xl w-[90%]"
                    />
                  </label>
                </div>
              </div>

              {/* All Features */}
              <div className="flex justify-between items-center p-3 mb-4">
                <h1 className="text-3xl font-bold">Features</h1>
              </div>
              <div className="card pt-4 flex  border rounded-md ">
                <div className="row flex flex-wrap m-2">
                  <div className="card-body p-3 grid grid-cols-3 max-lg:grid-cols-2 max-md:grid-cols-1">
                    {AllFeatures.map((feature) => (
                      <div
                        key={feature.id}
                        className="col-md-4 text-sm font-semibold text-neutral-700 mb-5 w-auto px-3 py-1"
                      >
                        <div className="form-check flex">
                          <div>
                            <input
                              className="form-check-input mx-2"
                              type="checkbox"
                              name="selectedAllFeatures[]"
                              value={feature.value}
                              id={feature.value}
                              checked={selectedAllFeatures.includes(
                                feature.value
                              )}
                              onChange={() => toggleCheckbox(feature.value)}
                            />
                          </div>
                          <label
                            className="form-check-label"
                            htmlFor={feature.value}
                            onClick={() => toggleCheckbox(feature.value)}
                          >
                            {feature.label}
                          </label>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Safety Features */}
              <div className="flex justify-between items-center p-3 mb-4">
                <h1 className="text-3xl font-bold">Safety Features</h1>
              </div>
              <div className="card pt-3 flex  border rounded-md ">
                <div className="row flex flex-wrap m-2">
                  <div className="card-body p-3 grid grid-cols-3 max-lg:grid-cols-2 max-md:grid-cols-1">
                    {safetyFeatures.map((feature) => (
                      <div
                        key={feature.id}
                        className="col-md-4 mb-3 w-auto text-sm font-semibold text-neutral-700 px-3 py-1"
                      >
                        <div className="form-check flex">
                          <div>
                            <input
                              className="form-check-input mx-2"
                              type="checkbox"
                              name="selectedSafetyFeatures[]"
                              value={feature.value}
                              id={feature.value}
                              checked={selectedSafetyFeatures.includes(
                                feature.value
                              )}
                              onChange={() =>
                                toggleSafetyCheckbox(feature.value)
                              }
                            />
                          </div>
                          <label
                            className="form-check-label"
                            htmlFor={feature.value}
                            onClick={() => toggleSafetyCheckbox(feature.value)}
                          >
                            {feature.label}
                          </label>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Add Listing Button */}
              <div className="button w-full flex justify-start items-center p-6">
                <button
                  className="bg-orange-400 text-white px-4 max-sm:text-sm  max-sm:w-[95%] max-sm:mx-auto py-2 rounded-lg cursor-pointer"
                  type="submit"
                >
                  Add Listing
                </button>
              </div>
            </form>
          </div>
        </div>
        <div className="w-full h-[150px] ">
          <Copyright />
        </div>
      </div>
    </div>
  );
};

export default AddListingForm;
