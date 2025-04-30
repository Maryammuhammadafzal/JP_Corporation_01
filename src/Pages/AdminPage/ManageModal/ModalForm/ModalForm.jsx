import React, { useRef, useState } from "react";
import Button from "../../../../Components/Button/Button";
import axios from "axios";
import AllFeatures from "../../../../Components/AllFeatures.js";
import { safetyFeatures } from "../../../../Components/safetyFeatures.js";

const ModalForm = () => {
  let [active, setActive] = useState(false);

  const titleRef = useRef(null);
  const makeRef = useRef(null);

  const submitModal = async () => {
    if (titleRef.current.value === "") {
      setActive(true);
    }
    if (makeRef.current.value === "") {
      setActive(true);
    }

    if (titleRef.current.value && makeRef.current.value) {
      const payload = {
        modalMake: makeRef.current.value.toUpperCase(),
        modalTitle: titleRef.current.value.toUpperCase(),
      };

      try {
        const token = localStorage.getItem("adminToken");
        const response = await axios.post(
          "/api/model/add",
          payload,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log("Success" + JSON.stringify(response.data));
        alert("Added Succesfully");

        // Reset refs
        titleRef.current.value = "";
        makeRef.current.value = "";

        window.location.href = "/dashboard/manage-modal";
      } catch (error) {
        console.error(error);
      }
    }
  };
  return (
    <div className="w-full flex flex-col mx-auto rounded-md p-3">
      <div className="flex justify-between items-center p-6 max-sm:p-3 mb-4">
        <h1 className="text-3xl font-bold max-lg:text-2xl max-md:text-xl">
          Add Modal
        </h1>
      </div>
      <form className="form w-full h-auto min-sm:p-3 max-sm:text-xs flex flex-col gap-5">
        <div className="p-6 max-md:p-3  border rounded-md text-sm text-gray-600 w-full h-auto grid grid-cols-2 max-md:grid-cols-1 justify-center items-center gap-5">
          {/* Title Input */}
          <div className="w-auto">
            <label htmlFor="title" className="w-full max-sm:text-xs">
              <p>
                Modal Title <sup className="text-orange-700 ">*</sup>
              </p>
              <input
                type="text"
                id="title"
                ref={titleRef}
                className={`mt-2 w-full border rounded-md max-sm:text-xs p-2 ${
                  active && "border-orange-400 shadow-orange-300"
                }`}
                placeholder="Enter Title Here"
              />
            </label>
          </div>

          {/* Make Input */}
          <div className="w-auto ">
            <label htmlFor="make" className="w-full max-sm:text-xs">
              <p>Make</p>
              <select
                id="make"
                className={`appearance-none mt-2 w-full border rounded-md max-sm:text-xs p-2 outline-0 text-gray-400  ${
                  active && "border-orange-400 shadow-orange-300"
                }`}
                placeholder="Select make"
                ref={makeRef}
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
                  value="AUDI"
                  className="appearance-none active:bg-neutral-400 active:text-neutral-500 hover:bg-neutral-400 hover:text-neutral-500  focus:bg-neutral-400 focus:text-neutral-500 text-neutral-800 bg-white p-2"
                >
                  AUDI
                </option>
                <option
                  value="BENTLEY"
                  className="appearance-none active:bg-neutral-400 active:text-neutral-500 hover:bg-neutral-400 hover:text-neutral-500 focus:bg-neutral-400 focus:text-neutral-500 text-neutral-800 bg-white p-2"
                >
                  BENTLEY
                </option>
                <option
                  value="BMW"
                  className="appearance-none active:bg-neutral-400 active:text-neutral-500 hover:bg-neutral-400 hover:text-neutral-500 focus:bg-neutral-400 focus:text-neutral-500 text-neutral-800 bg-white p-2"
                >
                  BMW
                </option>
                <option
                  value="CADILLAC"
                  className="appearance-none active:bg-neutral-400 active:text-neutral-500 hover:bg-neutral-400 hover:text-neutral-500 focus:bg-neutral-400 focus:text-neutral-500 text-neutral-800 bg-white p-2"
                >
                  CADILLAC
                </option>
                <option
                  value="CHEVROLET"
                  className="appearance-none active:bg-neutral-400 active:text-neutral-500 hover:bg-neutral-400 hover:text-neutral-500 focus:bg-neutral-400 focus:text-neutral-500 text-neutral-800 bg-white p-2"
                >
                  CHEVROLET
                </option>
                <option
                  value="FARRARI"
                  className="appearance-none active:bg-neutral-400 active:text-neutral-500 hover:bg-neutral-400 hover:text-neutral-500 focus:bg-neutral-400 focus:text-neutral-500 text-neutral-800 bg-white p-2"
                >
                  FARRARI
                </option>
                <option
                  value="FORD"
                  className="appearance-none active:bg-neutral-400 active:text-neutral-500 hover:bg-neutral-400 hover:text-neutral-500 focus:bg-neutral-400 focus:text-neutral-500 text-neutral-800 bg-white p-2"
                >
                  FORD
                </option>
                <option
                  value="HINO"
                  className="appearance-none active:bg-neutral-400 active:text-neutral-500 hover:bg-neutral-400 hover:text-neutral-500 focus:bg-neutral-400 focus:text-neutral-500 text-neutral-800 bg-white p-2"
                >
                  HINO
                </option>
                <option
                  value="HONDA"
                  className="appearance-none active:bg-neutral-400 active:text-neutral-500 hover:bg-neutral-400 hover:text-neutral-500 focus:bg-neutral-400 focus:text-neutral-500 text-neutral-800 bg-white p-2"
                >
                  HONDA
                </option>
                <option
                  value="ISUZU"
                  className="appearance-none active:bg-neutral-400 active:text-neutral-500 hover:bg-neutral-400 hover:text-neutral-500 focus:bg-neutral-400 focus:text-neutral-500 text-neutral-800 bg-white p-2"
                >
                  ISUZU
                </option>
                <option
                  value="LEXUS"
                  className="appearance-none active:bg-neutral-400 active:text-neutral-500 hover:bg-neutral-400 hover:text-neutral-500 focus:bg-neutral-400 focus:text-neutral-500 text-neutral-800 bg-white p-2"
                >
                  LEXUS
                </option>
                <option
                  value="MAZDA"
                  className="appearance-none active:bg-neutral-400 active:text-neutral-500 hover:bg-neutral-400 hover:text-neutral-500 focus:bg-neutral-400 focus:text-neutral-500 text-neutral-800 bg-white p-2"
                >
                  MAZDA
                </option>
                <option
                  value="MERCEDES-BENZ"
                  className="appearance-none active:bg-neutral-400 active:text-neutral-500 hover:bg-neutral-400 hover:text-neutral-500 focus:bg-neutral-400 focus:text-neutral-500 text-neutral-800 bg-white p-2"
                >
                  MERCEDES-BENZ
                </option>
                <option
                  value="MISTUBISHI"
                  className="appearance-none active:bg-neutral-400 active:text-neutral-500 hover:bg-neutral-400 hover:text-neutral-500 focus:bg-neutral-400 focus:text-neutral-500 text-neutral-800 bg-white p-2"
                >
                  MISTUBISHI
                </option>
                <option
                  value="NISSAN"
                  className="appearance-none active:bg-neutral-400 active:text-neutral-500 hover:bg-neutral-400 hover:text-neutral-500 focus:bg-neutral-400 focus:text-neutral-500 text-neutral-800 bg-white p-2"
                >
                  NISSAN
                </option>
                <option
                  value="PORCH"
                  className="appearance-none active:bg-neutral-400 active:text-neutral-500 hover:bg-neutral-400 hover:text-neutral-500 focus:bg-neutral-400 focus:text-neutral-500 text-neutral-800 bg-white p-2"
                >
                  PORCH
                </option>
                <option
                  value="SUBARO"
                  className="appearance-none active:bg-neutral-400 active:text-neutral-500 hover:bg-neutral-400 hover:text-neutral-500 focus:bg-neutral-400 focus:text-neutral-500 text-neutral-800 bg-white p-2"
                >
                  SUBARO
                </option>
                <option
                  value="SUZUKI"
                  className="appearance-none active:bg-neutral-400 active:text-neutral-500 hover:bg-neutral-400 hover:text-neutral-500 focus:bg-neutral-400 focus:text-neutral-500 text-neutral-800 bg-white p-2"
                >
                  SUZUKI
                </option>
                <option
                  value="TOYOTA"
                  className="appearance-none active:bg-neutral-400 active:text-neutral-500 hover:bg-neutral-400 hover:text-neutral-500 focus:bg-neutral-400 focus:text-neutral-500 text-neutral-800 bg-white p-2"
                >
                  TOYOTA
                </option>
              </select>
            </label>
          </div>
        </div>
      </form>

      <div className="button w-full flex justify-start items-center p-6">
        <button
          className="bg-orange-400 text-white px-4 max-sm:text-sm  max-sm:w-[95%] max-sm:mx-auto py-2 rounded-lg cursor-pointer"
          onClick={submitModal}
        >
          Add Modal
        </button>
      </div>
    </div>
  );
};

export default ModalForm;
