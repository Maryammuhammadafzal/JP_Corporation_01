import React, { useRef, useState, useEffect } from "react";
import Button from "../../../../Components/Button/Button.jsx";
import axios from "axios";
import { useParams } from "react-router-dom";

const EditModalForm = () => {
  let EditId = localStorage.getItem("EditId");

  let [isActive, setIsActive] = useState(false);
  const [modalData, setModalData] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch car data
  useEffect(() => {
    const fetchModalById = async () => {
      try {
        const res = await axios.get(
          `https://jpcorporation01-production.up.railway.app/api/model/get/${EditId}`);
        const modal = await res.data.data;

        setModalData(modal);
        setLoading(false);
      } catch (err) {
        console.error(err);
      }
    };
    fetchModalById();
  }, [EditId]);

  const titleRef = useRef(null);
  const makeRef = useRef(null);

  const updateModal = async () => {
    if (!titleRef.current.value) {
      titleRef.current.scrollIntoView({ behavior: "smooth", block: "center" });
      titleRef.current.focus();
      setIsActive("title");
    }
    if (!makeRef.current.value) {
      makeRef.current.scrollIntoView({ behavior: "smooth", block: "center" });
      makeRef.current.focus();
      setIsActive("make");
    }

    if (titleRef.current.value && makeRef.current.value) {
      const payload = {
        model: titleRef.current.value,
        make_id: makeRef.current.value,
        model_id: modalData.model_id,
      };

      try {
        const token = localStorage.getItem("adminToken");
        const response = await axios.put(
          `https://jpcorporation01-production.up.railway.app/api/model/update/${EditId}`,
          payload,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        console.log("Success" + JSON.stringify(response.data));
        alert("Updated Succesfully");

        window.location.href = "/dashboard/manage-modal";
      } catch (error) {
        console.error(error);
      }
    }
  };

  return (
    <div className="w-full flex flex-col mx-auto rounded-md p-3">
      <div className="flex justify-between items-center max-sm:p-3 p-6 mb-4">
        <h1 className="text-3xl font-bold max-lg:text-2xl max-md:text-xl">
          Update Modal
        </h1>
      </div>
      <form className="form w-full h-auto p-3  flex flex-col gap-5">
        <div className="p-6 border rounded-md text-sm text-gray-600 w-full h-auto grid grid-cols-2 max-md:grid-cols-1 justify-between items-center gap-5">
          {/* Title Input */}
          <div className="w-auto">
            <label htmlFor="title" className="w-full max-sm:text-xs">
              <p>
                Modal Title <sup className="text-orange-700">*</sup>
              </p>
              <input
                type="text"
                id="title"
                name="title"
                ref={titleRef}
                value={modalData.model}
                onChange={(e) => {
                  setModalData({ ...modalData, model: e.target.value });
                }}
                className={`mt-2 w-full border rounded-md p-2 max-sm:text-xs  ${
                  isActive && "border-orange-400 shadow-orange-300"
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
                name="make"
                className={`appearance-none mt-2 w-full border rounded-md p-2 outline-0 text-gray-400  ${
                  isActive && "border-orange-400 shadow-orange-300"
                }`}
                placeholder="Select make"
                ref={makeRef}
                onChange={(e) =>
                  setModalData({ ...modalData, make_id: e.target.value })
                }
                value={modalData.make_id}
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
            </label>
          </div>
        </div>
      </form>

      <div className="button w-full flex justify-start items-center p-6 max-sm:p-3">
        <button
          className="bg-orange-400 text-white px-4 max-sm:text-sm  max-sm:w-[95%] max-sm:mx-auto py-2 rounded-lg cursor-pointer"
          onClick={updateModal}
        >
          Update Modal
        </button>
      </div>
    </div>
  );
};

export default EditModalForm;
