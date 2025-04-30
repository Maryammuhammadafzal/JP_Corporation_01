import React, { useRef, useState, useEffect } from "react";
import Button from "../../../../Components/Button/Button.jsx";
import axios from "axios";
import { statusFeatures } from "../../../../Components/statusFeatures.js";
import optionFeatures from "../../../../Components/optionFeatures.js";
import { Link } from "react-router-dom";
import { EditFileInput } from "../../../../Components/EditFileInput/EditFileInput.jsx";
import EditSelectFeild from "../../../../Components/EditSelectFeild/EditSelectFeild.jsx";
import EditInputFeild from "../../../../Components/EditInputFeild/EditInputFeild.jsx";
import Copyright from "../../../../Components/Copyright/Copyright.jsx";

let capLinkEditId = localStorage.getItem("EditCapLinksId");

const EditCapLinksForm = () => {

   const [isActive , setIsActive] = useState(false);
  const [productFeatureImage, setproductFeatureImage] = useState(null);
  const [productImages, setproductImages] = useState(null);
  const [blImage, setBLImage] = useState(null);
  const [certificateImage, setCertificateImage] = useState(null);
  const [invoiceImage, setInvoiceImage] = useState(null);
  const [englishCertificateImage, setEnglishCerticateImage] = useState(null);
  const [inspectionImage, setInspectionImage] = useState(null);
  const [selectedStatusFeatures, setSelectedStatusFeatures] = useState([]);
  const [selectedOptionFeatures, setselectedOptionFeatures] = useState([]);
  const [selectedNameOption, setSelectedNameOption] = useState("");
  const [selectedForwarderNameOption, setSelectedForwarderNameOption] =
    useState("");
  const [loading, setLoading] = useState(false);
  const [capLink, setCapLink] = useState([]);

  // Fetch car data on mount
  useEffect(() => {
    const fetchCapLink = async () => {
      try {
        const res = await axios.get(
          `/api/capLinks/get/${capLinkEditId}`
        );
        const capLinkData = res.data?.data;
        setCapLink(capLinkData);
        setLoading(false);
      } catch (err) {
        console.error(err);
      }
    };
    fetchCapLink();
  }, [capLinkEditId]);

  useEffect(() => {
    if (capLink?.statusFeatures?.length > 0) {
      const parsedStatus = capLink.statusFeatures[0]
        .split(".,")
        .map((item) =>
          item.slice(-1) !== "." ? item + ".".trim() : item.trim()
        );
      setSelectedStatusFeatures(parsedStatus);
    }
  }, [capLink]);

  useEffect(() => {
    if (capLink?.optionFeatures?.length > 0) {
      const parsedOptions = capLink.optionFeatures[0]
        .split(",")
        .map((item) => item.trim());
      setselectedOptionFeatures(parsedOptions);
    }
  }, [capLink]);

  const notifyInputData = [
    {
      label: "Name",
      id: "notifyPartyNameRef",
      value: capLink?.notifyParty?.notifyPartyNameRef,
    },
    {
      label: "Address",
      id: "notifyPartyAddressRef",
      value: capLink?.notifyParty?.notifyPartyAddressRef,
    },
    {
      label: "City",
      id: "notifyPartyCityRef",
      value: capLink?.notifyParty?.notifyPartyCityRef,
    },
    {
      label: "Country",
      id: "notifyPartyCountryRef",
      value: capLink?.notifyParty?.notifyPartyCountryRef,
    },
    {
      label: "Phone Number1",
      id: "notifyPartyPhoneNumber1Ref",
      value: capLink?.notifyParty?.notifyPartyPhoneNumber1Ref,
    },
    {
      label: "Phone Number2",
      id: "notifyPartyPhoneNumber2Ref",
      value: capLink?.notifyParty?.notifyPartyPhoneNumber2Ref,
    },
    {
      label: "Phone Number3",
      id: "notifyPartyPhoneNumber3Ref",
      value: capLink?.notifyParty?.notifyPartyPhoneNumber3Ref,
    },
    {
      label: "Fax Number",
      id: "notifyPartyFaxNumberRef",
      value: capLink?.notifyParty?.notifyPartyFaxNumberRef,
    },
    {
      label: "Cell Phone Number/Email",
      id: "notifyPartyCellPhoneNumberOREmailRef",
      value: capLink?.notifyParty?.notifyPartyCellPhoneNumberOREmailRef,
    },
  ];

  const consigneeInputData = [
    {
      label: "Name",
      id: "consigneeNameRef",
      value: capLink?.consignee?.consigneeNameRef,
    },
    {
      label: "Address",
      id: "consigneeAddressRef",
      value: capLink?.consignee?.consigneeAddressRef,
    },
    {
      label: "City",
      id: "consigneeCityRef",
      value: capLink?.consignee?.consigneeCityRef,
    },
    {
      label: "Country",
      id: "consigneeCountryRef",
      value: capLink?.consignee?.consigneeCountryRef,
    },
    {
      label: "Phone Number1",
      id: "consigneePhoneNumber1Ref",
      value: capLink?.consignee?.consigneePhoneNumber1Ref,
    },
    {
      label: "Phone Number2",
      id: "consigneePhoneNumber2Ref",
      value: capLink?.consignee?.consigneePhoneNumber2Ref,
    },
    {
      label: "Phone Number3",
      id: "consigneePhoneNumber3Ref",
      value: capLink?.consignee?.consigneePhoneNumber3Ref,
    },
    {
      label: "Fax Number",
      id: "consigneeFaxNumberRef",
      value: capLink?.consignee?.consigneeFaxNumberRef,
    },
    {
      label: "Cell Phone Number/EmailRef",
      id: "consigneeCellPhoneNumberOREmailRef",
      value: capLink?.consignee?.consigneeCellPhoneNumberOREmailRef,
    },
  ];

  useEffect(() => {
    if (capLink) {
      setSelectedNameOption(capLink?.companyName || "");
    }
  }, [capLink]);

  useEffect(() => {
    if (capLink) {
      setSelectedForwarderNameOption(capLink?.forwarderName || "");
    }
  }, [capLink]);
  useEffect(() => {
    if (capLink) {
      setselectedOptionFeatures(capLink.optionFeatures);
    }
  }, [capLink]);
  useEffect(() => {
    if (capLink) {
      setBLImage(capLink.bLFileRef);
    }
  }, [capLink]);
  useEffect(() => {
    if (capLink) {
      setInspectionImage(capLink.inspectionFileRef);
    }
  }, [capLink]);
  useEffect(() => {
    if (capLink) {
      setCertificateImage(capLink.certificateFileRef);
    }
  }, [capLink]);
  useEffect(() => {
    if (capLink) {
      setEnglishCerticateImage(capLink.englishCertificateFileRef);
    }
  }, [capLink]);
  useEffect(() => {
    if (capLink) {
      setInvoiceImage(capLink.invoiceFileRef);
    }
  }, [capLink]);
  useEffect(() => {
    if (capLink) {
      setproductFeatureImage(capLink.productFeatureImageRef);
    }
  }, [capLink]);
  useEffect(() => {
    if (capLink) {
      setproductImages(capLink.productImageRef);
    }
  }, [capLink]);

  // Refrence Object
  const refs = {
    departure: {
      // Departure Ref
      carrierNameRef: useRef(null),
      departureVesselRef: useRef(null),
      departurePartsOfLandingRef: useRef(null),
      departureETDRef: useRef(null),
    },
    arrival: {
      arrivalVesselRef: useRef(null),
      ArrivalPartOfDischargeRef: useRef(null),
      arrivalETDRef: useRef(null),
    },
    document: {
      documentNameRef: useRef(null),
      documentAddressRef: useRef(null),
      documentCityRef: useRef(null),
      documentCountryRef: useRef(null),
      documentFaxNumberRef: useRef(null),
      documentTrackingNumberRef: useRef(null),
      documentPhoneNumber1Ref: useRef(null),
      documentPhoneNumber2Ref: useRef(null),
      documentPhoneNumber3Ref: useRef(null),
      documentCellPhoneNumberOREmailRef: useRef(null),
      documentenrollementRef: useRef(null),
    },
    documentCenter: {
      documentCenterNameRef: useRef(null),
      documentCenterAddressRef: useRef(null),
      documentCenterCityRef: useRef(null),
      documentCenterCountryRef: useRef(null),
      documentCenterPhoneNumber1Ref: useRef(null),
      documentCenterPhoneNumber2Ref: useRef(null),
      documentCenterPhoneNumber3Ref: useRef(null),
      documentCenterEmailRef: useRef(null),
      documentCenterUrlRef: useRef(null),
      documentCenterOtherInformationRef: useRef(null),
    },
    consignee: {
      consigneeNameRef: useRef(null),
      consigneeCityRef: useRef(null),
      consigneeAddressRef: useRef(null),
      consigneeCountryRef: useRef(null),
      consigneeFaxNumberRef: useRef(null),
      consigneePhoneNumber1Ref: useRef(null),
      consigneePhoneNumber2Ref: useRef(null),
      consigneePhoneNumber3Ref: useRef(null),
      consigneeCellPhoneNumberOREmailRef: useRef(null),
    },
    notifyParty: {
      notifyPartyNameRef: useRef(null),
      notifyPartyCityRef: useRef(null),
      notifyPartyCountryRef: useRef(null),
      notifyPartyAddressRef: useRef(null),
      notifyPartyChassisRef: useRef(null),
      notifyPartyDoorRef: useRef(null),
      notifyPartytransmissionRef: useRef(null),
      notifyPartySteeringRef: useRef(null),
      notifyPartySeatsRef: useRef(null),
      notifyPartyRegistrationYearORMonthRef: useRef(null),
      notifyPartyCellPhoneNumberOREmailRef: useRef(null),
      notifyPartyReferenceNoRef: useRef(null),
      notifyPartyEngineNoRef: useRef(null),
      notifyPartyDriveRef: useRef(null),
      notifyPartyEngineSizeRef: useRef(null),
      notifyPartyExtColorRef: useRef(null),
      notifyPartyFuelRef: useRef(null),
      notifyPartyFaxNumberRef: useRef(null),
      notifyPartyMileageRef: useRef(null),
      notifyPartyModelCodeRef: useRef(null),
      notifyPartyModelGradeRef: useRef(null),
      notifyPartyPhoneNumber1Ref: useRef(null),
      notifyPartyPhoneNumber2Ref: useRef(null),
      notifyPartyPhoneNumber3Ref: useRef(null),
      notifyPartyProductNameRef: useRef(null),
      manufactureYearORMonthRef: useRef(null),
    },
    misc: {
      descriptionRef: useRef(null),
    },
  };

  // Toggle Status CheckBox Function
  const toggleCheckbox = (id) => {
    setCapLink((prevData) => {
      const updatedStatusFeatures = prevData.statusFeatures.includes(id)
        ? prevData.statusFeatures.filter((item) => item !== id)
        : [...prevData.statusFeatures, id];

      return {
        ...prevData,
        statusFeatures: updatedStatusFeatures,
      };
    });
  };
  const toggleOptionCheckbox = (id) => {
    setCapLink((prevData) => {
      const updatedOptionFeatures = prevData.optionFeatures.includes(id)
        ? prevData.optionFeatures.filter((item) => item !== id)
        : [...prevData.optionFeatures, id];

      return {
        ...prevData,
        optionFeatures: updatedOptionFeatures,
      };
    });
  };
  let newProductImages = [];
  // File handlers
  const handleProductImageChange = (e) => {
    newProductImages = [...e.target.files];

    if (newProductImages.length > 0) {
      setproductImages(newProductImages);
      let images = document.getElementById("showProductImages");
      images.classList.add("hidden");
    }
  };
  const handleProductionFeaturedImageChange = (e) => {
    let file = e.target.files[0];
    setproductFeatureImage(file);
  };
  console.log(productFeatureImage);
  
  const handleBLFileChange = (e) => {
    let file = e.target.files[0];
    setBLImage(file);
  };
  const handleCertificateChange = (e) => {
    let file = e.target.files[0];
    setCertificateImage(file);
  };
  const handleEnglishCertificateChange = (e) => {
    let file = e.target.files[0];
    setEnglishCerticateImage(file);
  };
  const handleInvoiceChange = (e) => {
    let file = e.target.files[0];
    setInvoiceImage(file);
  };
  const handleInspectionFileChange = (e) => {
    let file = e.target.files[0];
    setInspectionImage(file);
  };

  const hiddenProductImage = (e) => {
    let image = e.target.parentElement;
    image.classList.add("hidden");
  }

  // Radio Button Function
  const handleNameRadioChange = (e) => {
    setSelectedNameOption(e.target.value);
  };
  const handleForwarderNameRadioChange = (e) => {
    setSelectedForwarderNameOption(e.target.value);
  };

  const handleChange = (feild, value) => {
    setCapLink((prevData) => ({
      ...prevData,
      notifyParty: {
        ...prevData.notifyParty,
        [feild]: value,
      },
    }));
  };

  // Handle Status Features Change
  const handleStatusFeatureChange = (e, type) => {
    const { value, checked } = e.target;

    if (type === "statusFeatures") {
      setSelectedStatusFeatures((prevStatusFeatures) => {
        if (checked) {
          return [...prevStatusFeatures, value]; //Added ,If Checked
        } else {
          return prevStatusFeatures.filter((item) => item !== value); // Removed ,If Not Checked
        }
      });
    }
  };

  // Handle Option Features Change
  const handleOptionFeatureChange = (e, type) => {
    const { value, checked } = e.target;

    if (type === "optionFeatures") {
      setselectedOptionFeatures((prevOptionFeatures) => {
        if (checked) {
          return [...prevOptionFeatures, value]; //Added ,If Checked
        } else {
          return prevOptionFeatures.filter((item) => item !== value); // Removed ,If Not Checked
        }
      });
    }
  };

  //  Update Function
  const updateCapLinksData = async (e) => {
    e.preventDefault();

      
    if (!capLink?.departure?.carrierNameRef) {
      // capLink?.departure?.carrierNameRef.scrollIntoView({ behavior: "smooth", block: "center" });
      // capLink?.departure?.carrierNameRef.focus();
      setIsActive("carrierName");
    } else if (!capLink?.notifyParty.manufactureYearORMonthRef) {
      capLink?.notifyParty.manufactureYearORMonthRef.scrollIntoView({ behavior: "smooth", block: "center" });
      capLink?.notifyParty.manufactureYearORMonthRef.focus();
      setIsActive("manufactureYear/Month");
    } else {
      

    const formData = new FormData();

    // Append plain text data from capLink
    Object.keys(capLink).forEach((key) => {
      let value = capLink[key];

      // Handle nested objects
      if (typeof value === "object" && value !== null) {
        Object.keys(value).forEach((innerKey) => {
          formData.append(innerKey, value[innerKey] || "");
        });
      } else {
        formData.append(key, value || "");
      }
    });

    // Handle file inputs separately
    if (productFeatureImage) {
      console.log(productFeatureImage);
      
    }
    formData.append("productFeatureImageRef", productFeatureImage);
    productImages?.forEach((image) => {
      formData.append("productImageRef", image);
    });
    formData.append("bLFileRef", blImage);
    formData.append("certificateFileRef", certificateImage);
    formData.append("englishCertificateFileRef", englishCertificateImage);
    formData.append("invoiceFileRef", invoiceImage);
    formData.append("inspectionFileRef", inspectionImage);

    // Handle features selection (checkboxes)
    formData.append("statusFeatures", JSON.stringify(selectedStatusFeatures));
    formData.append("optionFeatures", JSON.stringify(selectedOptionFeatures));

    // Append selected name options
    if (formData.has("companyName")) {
      formData.delete("companyName");
    }
    formData.append("companyName", selectedNameOption);
    if (formData.has("forwarderName")) {
      formData.delete("forwarderName");
    }
    formData.append("forwarderName", selectedForwarderNameOption);

    try {
      const token = localStorage.getItem("adminToken");

      const response = await axios.put(
        `/api/capLinks/update/${capLinkEditId}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("Success" + JSON.stringify(response.data));
      alert("Updated Successfully");

      // Reset car features
      setSelectedStatusFeatures([]);
      setselectedOptionFeatures([]);
      document
        .querySelectorAll("input[type='checkbox']")
        .forEach((checkbox) => {
          checkbox.checked = false;
        });

      window.location.href = "/dashboard/cap-links"; 
    } catch (error) {
      console.error(error);
      alert("Error updating the data");
    }
  }
  };

  return (
    <div className="w-full max-h-auto min-h-screen rounded-tr-[50px]  flex flex-col overflow-y-auto ">
      <div className="w-full h-auto  flex flex-col gap-4 p-5 mb-4 items-start">
        <div className="w-[95%]  mx-auto border mb-3 rounded-md  ">
         
            <form className="form w-full h-auto p-3  max-sm:p-2 flex flex-col gap-5">
              <div className="nameDetail w-full h-auto flex justify-center gap-5 flex-col">
                <div className="flex justify-between items-center p-6  max-sm:p-3">
                  <h1 className="text-3xl font-bold  max-md:text-2xl max-sm:text-lg">Update Details</h1>
                </div>

                {/* 1st Section */}
                <div className="p-6 max-sm:p-3  border-neutral-500 border rounded-md space-y-5 text-sm text-gray-600 w-full h-auto">
                  {/* Company Name Radio Buttons */}
                  <div className="w-full min-sm:p-3 max-sm:mt-3  flex flex-col gap-5  h-auto justify-between items-start">
                    <h3 className="text-md font-bold max-sm:text-xs max-md:text-sm">Select Name</h3>
                    <div className="w-full h-auto justify-start items-center max-sm:flex-col max-sm:items-start flex gap-5">
                      <label
                        htmlFor="beForward"
                        className="w-36 max-sm:w-auto gap-3 flex justify-center items-center"
                      >
                        <input
                          type="radio"
                          id="beForward"
                          value="Be Forward"
                          checked={selectedNameOption === "Be Forward"}
                          onChange={handleNameRadioChange}
                          className="mt-2 rounded-md p-2"
                        />
                        <p>Be Forward</p>
                      </label>
                      <label
                        htmlFor="jpCorporation"
                        className="w-auto gap-3 flex justify-center items-center"
                      >
                        <input
                          type="radio"
                          id="jpCorporation"
                          value="JP Corporation"
                          checked={selectedNameOption === "JP Corporation"}
                          onChange={handleNameRadioChange}
                          className="mt-2 rounded-md p-2"
                        />
                        <p>JP Corporation</p>
                      </label>
                    </div>
                  </div>

                  {/* Forwarder Name Radio Buttons */}
                  <div className="w-fit flex flex-col gap-5 p-3 space-y-3 h-auto justify-between items-start">
                    <h3 className="text-md font-bold max-sm:text-xs max-md:text-sm">Forwarder Name</h3>
                    <div className="w-full h-auto justify-between items-center max-sm:flex-col max-sm:items-start flex gap-3">
                      <label
                        htmlFor="Satish"
                        className="w-36 max-sm:w-auto gap-3 flex justify-center items-center"
                      >
                        <input
                          type="radio"
                          id="Satish"
                          value="Satish"
                          checked={selectedForwarderNameOption === "Satish"}
                          onChange={handleForwarderNameRadioChange}
                          className="mt-2 border-neutral-500 border rounded-md p-2"
                        />
                        <p>Satish</p>
                      </label>
                      <label
                        htmlFor="Vova"
                        className="w-36 max-sm:w-auto gap-3 flex justify-center items-center"
                      >
                        <input
                          type="radio"
                          id="Vova"
                          value="Vova"
                          checked={selectedForwarderNameOption === "Vova"}
                          onChange={handleForwarderNameRadioChange}
                          className="mt-2 border-neutral-500 border rounded-md p-2"
                        />
                        <p>Vova</p>
                      </label>
                      <label
                        htmlFor="Kaytee"
                        className="w-36 max-sm:w-auto gap-3 flex justify-center items-center"
                      >
                        <input
                          type="radio"
                          id="Kaytee"
                          value="Kaytee"
                          checked={selectedForwarderNameOption === "Kaytee"}
                          onChange={handleForwarderNameRadioChange}
                          className="mt-2 border-neutral-500 border rounded-md p-2"
                        />
                        <p>Kaytee</p>
                      </label>
                    </div>
                  </div>

                  {/* Description Textarea */}
                  <div className="w-full h-auto flex flex-col p-3 max-sm:p-1 justify-center space-y-3 items-start">
                    <h3 className="text-md font-bold max-sm:text-xs max-md:text-sm">Message</h3>
                    <textarea
                      id="description"
                      value={capLink?.misc?.descriptionRef || ""}
                      onChange={(e) =>
                        setCapLink({
                          ...capLink,
                          misc: {
                            ...capLink.misc,
                            descriptionRef: e.target.value,
                          },
                        })
                      }
                      className="mt-2 w-full h-[150px] max-sm:h-[120px] max-sm:text-xs border-neutral-500 border rounded-md p-2"
                    ></textarea>
                  </div>
                </div>
              </div>

              {/* 2nd */}
              {/* Status Features */}
              <div className="statusFeatures w-full h-auto flex justify-center gap-5 flex-col">
                <div className="flex justify-between items-center p-6 max-sm:p-3 ">
                  <h1 className="text-3xl font-bold max-md:text-xl max-sm:text-lg">Status</h1>
                </div>

                {/* Status Features */}
                <div className="card p-6 max-sm:p-3 flex border-neutral-500 border rounded-md">
                  <div className="row flex flex-wrap  min-sm:m-2">
                    <div className="card-body grid grid-cols-3 max-lg:grid-cols-2 max-md:grid-cols-1">
                      {statusFeatures?.map((feature) => (
                        <div
                          key={feature.id}
                          className="mb-5 w-auto  min-sm:px-3 py-1"
                        >
                          <div className="form-check flex items-start">
                            <input
                              className="form-check-input mt-2 mx-2"
                              type="checkbox"
                              name="selectedStatusFeatures[]"
                              value={feature.value}
                              id={feature.id}
                              checked={selectedStatusFeatures.includes(
                                feature.value
                              )}
                              onChange={(e) =>
                                handleStatusFeatureChange(e, "statusFeatures")
                              } // Update the selected status features array
                            />
                            <div>
                              <label
                                className="form-check-label text-sm font-bold text-gray-700"
                                htmlFor={feature.id}
                                onClick={() => toggleCheckbox(feature.id)} // Toggling on label click
                              >
                                {feature.label}
                              </label>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* 3rd */}
              {/* Information Details */}
              <div className="statusFeatures w-full h-auto flex justify-center gap-5 flex-col">
                {/* Heading */}
                <div className="flex justify-between items-center p-6 max-sm:p-3 ">
                  <h1 className="text-3xl font-bold max-md:text-xl max-sm:text-lg">Information</h1>
                </div>
                {/* Content */}
                <div className="p-6 max-sm:p-3 border-neutral-500 border rounded-md space-y-5 text-sm text-gray-600 w-full h-auto">
                  {/* Shipping Information Section */}
                  <div className="w-full min-sm:p-3 max-sm:mt-3  flex flex-col gap-5  h-auto justify-between items-start">
                    <h3 className="text-md font-bold max-sm:text-xs max-md:text-sm">
                      Shipping Information Section
                    </h3>
                    <div className="w-full h-auto justify-start items-center flex gap-5">
                      <label
                        htmlFor="CarrierName"
                        className="w-full gap-3 flex flex-col justify-center items-start max-sm:text-xs"
                      >
                        <p>Carrier</p>
                        <input
                          type="text"
                          id="CarrierName"
                          value={capLink?.departure?.carrierNameRef || ""}
                          onChange={(e) =>
                            setCapLink({
                              ...capLink,
                              departure: {
                                ...capLink.departure,
                                carrierNameRef: e.target.value,
                              },
                            })
                          }
                          className={`${isActive && "border-orange-400"} border-neutral-500 border w-full rounded-md p-3 max-sm:p-2 max-sm:text-xs`}
                          placeholder=" Carrier Name "
                        />
                      </label>
                    </div>
                  </div>

                  {/* Departure Section */}
                  <div className="w-full min-sm:p-3 max-sm:mt-3  flex flex-col gap-5  h-auto justify-between items-start">
                    <h3 className="text-md font-bold max-sm:text-xs max-md:text-sm">Departure Section</h3>
                    {/* Vessel Name */}
                    <div className="w-full h-auto justify-start items-center grid grid-cols-2 max-md:grid-cols-1 gap-5 ">
                      <label
                        htmlFor="VesselName"
                        className="w-full gap-3 flex flex-col justify-center items-start max-sm:text-xs"
                      >
                        <p>Vessel</p>
                        <input
                          type="text"
                          id="VesselName"
                          value={capLink?.departure?.departureVesselRef || ""}
                          onChange={(e) =>
                            setCapLink({
                              ...capLink,
                              departure: {
                                ...capLink.departure,
                                departureVesselRef: e.target.value,
                              },
                            })
                          }
                          className=" border-neutral-500 border w-full rounded-md p-3 max-sm:p-2 max-sm:text-xs"
                          placeholder=" Vessel Name "
                        />
                      </label>
                    </div>

                    {/* Part Of Loading and ETD */}
                    <div className="w-full h-auto justify-start items-center grid grid-cols-2 max-md:grid-cols-1 gap-5 ">
                      <div className="flex flex-col w-full gap-2 h-auto max-sm:text-xs">
                        <label
                          htmlFor="PartOfLoading"
                          className="w-full gap-3 flex flex-col justify-center items-start max-sm:text-xs"
                        >
                          <p>Part Of Loading</p>
                          <input
                            type="text"
                            id="PartOfLoading"
                            value={
                              capLink?.departure?.departurePartsOfLandingRef ||
                              ""
                            }
                            onChange={(e) =>
                              setCapLink({
                                ...capLink,
                                departure: {
                                  ...capLink.departure,
                                  departurePartsOfLandingRef: e.target.value,
                                },
                              })
                            }
                            className=" border-neutral-500 border w-full rounded-md p-3 max-sm:p-2 max-sm:text-xs"
                            placeholder=" Part Of Loading"
                          />
                        </label>
                      </div>
                      <div className="flex flex-col w-full gap-2 h-auto max-sm:text-xs">
                        <label
                          htmlFor="ETD(Estimated Time of Departure)"
                          className="w-full gap-3 flex flex-col justify-center items-start max-sm:text-xs"
                        >
                          <p>ETD (Estimated Time of Departure)</p>
                          <input
                            type="date"
                            id="ETD(Estimated Time of Departure)"
                            value={capLink?.departure?.departureETDRef || ""}
                            onChange={(e) =>
                              setCapLink({
                                ...capLink,
                                departure: {
                                  ...capLink.departure,
                                  departureETDRef: e.target.value,
                                },
                              })
                            }
                            className=" border-neutral-500 border w-full rounded-md p-3 max-sm:p-2 max-sm:text-xs"
                            placeholder=" ETD (Estimated Time of Departure)"
                          />
                        </label>
                      </div>
                    </div>
                  </div>

                  {/* Arrival Section */}
                  <div className="w-full min-sm:p-3 max-sm:mt-3  flex flex-col gap-5  h-auto justify-between items-start">
                    <h3 className="text-md font-bold max-sm:text-xs max-md:text-sm ">Arrival Section</h3>
                    <div className="w-full h-auto justify-start items-center grid grid-cols-2 max-md:grid-cols-1 gap-5 ">
                      <label
                        htmlFor="VesselName"
                        className="w-full gap-3 flex flex-col justify-center items-start"max-sm:text-xs
                      >
                        <p>Vessel</p>
                        <input
                          type="text"
                          id="VesselName"
                          value={capLink?.arrival?.arrivalVesselRef || ""}
                          onChange={(e) =>
                            setCapLink({
                              ...capLink,
                              arrival: {
                                ...capLink.arrival,
                                arrivalVesselRef: e.target.value,
                              },
                            })
                          }
                          className=" border-neutral-500 border w-full rounded-md p-3 max-sm:p-2 max-sm:text-xs"
                          placeholder=" Vessel Name "
                        />
                      </label>
                    </div>

                    {/* Part Of Discharge and ETD */}
                    <div className="w-full h-auto justify-start items-center grid grid-cols-2 max-md:grid-cols-1 gap-5 ">
                      <div className="flex flex-col w-full gap-2 h-auto max-sm:text-xs">
                        <label
                          htmlFor="PartOfDischarge"
                          className="w-full gap-3 flex flex-col justify-center items-start max-sm:text-xs"
                        >
                          <p>Part Of Discharge</p>
                          <input
                            type="text"
                            id="PartOfDischarge"
                            value={
                              capLink?.arrival?.arrivalPartOfDischargeRef || ""
                            }
                            onChange={(e) =>
                              setCapLink({
                                ...capLink,
                                arrival: {
                                  ...capLink.arrival,
                                  arrivalPartOfDischargeRef: e.target.value,
                                },
                              })
                            }
                            className=" border-neutral-500 border w-full rounded-md p-3 max-sm:p-2 max-sm:text-xs"
                            placeholder=" Part Of Discharge"
                          />
                        </label>
                      </div>
                      <div className="flex flex-col w-full gap-2 h-auto max-sm:text-xs">
                        <label
                          htmlFor="ArrivalETD"
                          className="w-full gap-3 flex flex-col justify-center items-start max-sm:text-xs"
                        >
                          <p>ETD (Estimated Time of Arrival)</p>
                          <input
                            type="date"
                            id="ArrivalETD"
                            value={capLink?.arrival?.arrivalETDRef || ""}
                            onChange={(e) =>
                              setCapLink({
                                ...capLink,
                                arrival: {
                                  ...capLink.arrival,
                                  arrivalETDRef: e.target.value,
                                },
                              })
                            }
                            className=" border-neutral-500 border w-full rounded-md p-3 max-sm:p-2 max-sm:text-xs"
                            placeholder=" ETD (Estimated Time of Arrival)"
                          />
                        </label>
                      </div>
                    </div>
                  </div>

                  {/* 4th Section  */}
                  <div className="w-full min-sm:p-3 max-sm:mt-3  flex flex-col gap-5  h-auto justify-between items-start">
                    <h3 className="text-md font-bold max-sm:text-xs max-md:text-sm">Document Section</h3>

                    {/* File Input Rows */}
                    <div className="w-full h-auto justify-start items-center grid grid-cols-2 max-md:grid-cols-1 gap-5 ">
                      <EditFileInput
                        label="B/L"
                        id="bLFileRef"
                        name="bLFileRef"
                        fileRef={capLink?.bLFileRef}
                        onChange={handleBLFileChange}
                        existingFile={`downloads/blFile/${capLink?.bLFileRef}`}
                      />

                      <EditFileInput
                        label="Inspection"
                        id="inspectionFileRef"
                        name="inspectionFileRef"
                        fileRef={capLink?.inspectionFileRef}
                        onChange={handleInspectionFileChange}
                        existingFile={`downloads/inspection/${capLink?.inspectionFileRef}`}
                      />
                    </div>

                    <div className="w-full h-auto justify-start items-center grid grid-cols-2 max-md:grid-cols-1 gap-5 ">
                      <EditFileInput
                        label="Export Certificate"
                        id="certificateFileRef"
                        name="certificateFileRef"
                        fileRef={capLink?.certificateFileRef}
                        onChange={handleCertificateChange}
                        existingFile={`downloads/certificate/${capLink?.certificateFileRef}`}
                      />

                      <EditFileInput
                        label="English Export Certificate"
                        id="englishCertificateFileRef"
                        name="englishCertificateFileRef"
                        fileRef={capLink?.englishCertificateFileRef}
                        onChange={handleEnglishCertificateChange}
                        existingFile={`downloads/english-certificate/${capLink?.englishCertificateFileRef}`}
                      />
                    </div>

                    <div className="w-full h-auto justify-start items-center grid grid-cols-2 max-md:grid-cols-1 gap-5 ">
                      <EditFileInput
                        label="Invoice"
                        id="invoiceFileRef"
                        name="invoiceFileRef"
                        fileRef={capLink?.invoiceFileRef}
                        onChange={handleInvoiceChange}
                        existingFile={`downloads/invoice/${capLink?.invoiceFileRef}`}
                      />
                      {/* Enrollment Input */}
                      <div className="w-full h-auto justify-start items-center grid grid-cols-2 max-md:grid-cols-1 gap-5 mb-9">
                        <div className="imageInput text-sm rounded-md w-full h-auto">
                          <div className="flex flex-col gap-2">
                            <label
                              htmlFor="Enrollement"
                              className="w-full gap-3 flex flex-col justify-center items-start"max-sm:text-xs
                            >
                              <p>Enrollment</p>
                              <input
                                type="text"
                                id="Enrollement"
                                className="border-neutral-500 border w-full max-sm:text-xs rounded-md p-3 max-sm:p-2 max-sm:text-xs"
                                placeholder="Enrollment"
                                value={
                                  capLink?.document?.documentenrollementRef ||
                                  ""
                                }
                                onChange={(e) =>
                                  setCapLink({
                                    ...capLink,
                                    document: {
                                      ...capLink.document,
                                      documentenrollementRef: e.target.value,
                                    },
                                  })
                                }
                              />
                            </label>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* 4th */}
              {/* Document Details */}
              <div className="statusFeatures w-full h-auto flex justify-center gap-5 flex-col">
                {/* Heading */}
                <div className="flex justify-between items-center p-6 max-sm:p-3 ">
                  <h1 className="text-3xl font-bold max-md:text-xl max-sm:text-lg">Documents</h1>
                </div>
                <div className="p-6 max-sm:p-3 border-neutral-500 border rounded-md text-sm text-gray-600 w-full h-auto">
                  <div className="w-full min-sm:p-3 max-sm:mt-3  flex flex-col gap-5  h-auto justify-between items-start">
                    <h3 className="text-md font-bold max-sm:text-xs max-md:text-sm ">
                      Document Delivery Address Section
                    </h3>

                    {/* First Content */}
                    <div className="w-full">
                      <label htmlFor="documentName" className="w-full">
                        <p>
                          Name<sup className="text-orange-700">*</sup>
                        </p>
                        <input
                          type="text"
                          id="documentName"
                          value={capLink?.document?.documentNameRef || ""}
                          onChange={(e) =>
                            setCapLink({
                              ...capLink,
                              document: {
                                ...capLink.document,
                                documentNameRef: e.target.value,
                              },
                            })
                          }
                          className="mt-2 w-full border-neutral-500 border rounded-md p-2"
                          placeholder="Enter name Here"
                        />
                      </label>
                    </div>
                    {/* second Content */}
                    <div className="w-full h-auto justify-start items-center grid grid-cols-2 max-md:grid-cols-1 gap-5 ">
                      <div className="flex flex-col w-full gap-2 h-auto max-sm:text-xs">
                        <label
                          htmlFor="documentAddress"
                          className="w-full gap-3 flex flex-col justify-center items-start max-sm:text-xs"
                        >
                          <p>Address</p>
                          <input
                            type="text"
                            id="documentAddress"
                            value={capLink?.document?.documentAddressRef || ""}
                            onChange={(e) =>
                              setCapLink({
                                ...capLink,
                                document: {
                                  ...capLink.document,
                                  documentAddressRef: e.target.value,
                                },
                              })
                            }
                            className=" border-neutral-500 border w-full rounded-md p-3 max-sm:p-2 max-sm:text-xs"
                            placeholder=" Address"
                          />
                        </label>
                      </div>
                      <div className="flex flex-col w-full gap-2 h-auto max-sm:text-xs">
                        <label
                          htmlFor="documentCity"
                          className="w-full gap-3 flex flex-col justify-center items-start max-sm:text-xs"
                        >
                          <p>City</p>
                          <input
                            type="text"
                            id="documentCity"
                            value={capLink?.document?.documentCityRef || ""}
                            onChange={(e) =>
                              setCapLink({
                                ...capLink,
                                document: {
                                  ...capLink.document,
                                  documentCityRef: e.target.value,
                                },
                              })
                            }
                            className=" border-neutral-500 border w-full rounded-md p-3 max-sm:p-2 max-sm:text-xs"
                            placeholder=" City"
                          />
                        </label>
                      </div>
                    </div>

                    {/* third Content */}
                    <div className="w-full h-auto justify-start items-center grid grid-cols-2 max-md:grid-cols-1 gap-5 ">
                      <div className="flex flex-col w-full gap-2 h-auto max-sm:text-xs">
                        <label
                          htmlFor="documentCountry"
                          className="w-full gap-3 flex flex-col justify-center items-start max-sm:text-xs"
                        >
                          <p>Country</p>
                          <input
                            type="text"
                            id="documentCountry"
                            value={capLink?.document?.documentCountryRef || ""}
                            onChange={(e) =>
                              setCapLink({
                                ...capLink,
                                document: {
                                  ...capLink.document,
                                  documentCountryRef: e.target.value,
                                },
                              })
                            }
                            className=" border-neutral-500 border w-full rounded-md p-3 max-sm:p-2 max-sm:text-xs"
                            placeholder=" Country"
                          />
                        </label>
                      </div>
                      <div className="flex flex-col w-full gap-2 h-auto max-sm:text-xs">
                        <label
                          htmlFor="documentPhoneNumber1"
                          className="w-full gap-3 flex flex-col justify-center items-start max-sm:text-xs"
                        >
                          <p>Phone Number1</p>
                          <input
                            type="number"
                            id="documentPhoneNumber1"
                            value={
                              capLink?.document?.documentPhoneNumber1Ref || ""
                            }
                            onChange={(e) =>
                              setCapLink({
                                ...capLink,
                                document: {
                                  ...capLink.document,
                                  documentPhoneNumber1Ref: e.target.value,
                                },
                              })
                            }
                            className=" border-neutral-500 border w-full rounded-md p-3 max-sm:p-2 max-sm:text-xs"
                            placeholder=" Phone Number1"
                          />
                        </label>
                      </div>
                    </div>

                    {/* Fourth Content */}
                    <div className="w-full h-auto justify-start items-center grid grid-cols-2 max-md:grid-cols-1 gap-5 ">
                      <div className="flex flex-col w-full gap-2 h-auto max-sm:text-xs">
                        <label
                          htmlFor="documentPhoneNumber2"
                          className="w-full gap-3 flex flex-col justify-center items-start max-sm:text-xs"
                        >
                          <p>Phone Number2</p>
                          <input
                            type="number"
                            id="documentPhoneNumber2"
                            value={
                              capLink?.document?.documentPhoneNumber2Ref || ""
                            }
                            onChange={(e) =>
                              setCapLink({
                                ...capLink,
                                document: {
                                  ...capLink.document,
                                  documentPhoneNumber2Ref: e.target.value,
                                },
                              })
                            }
                            className=" border-neutral-500 border w-full rounded-md p-3 max-sm:p-2 max-sm:text-xs"
                            placeholder=" Phone Number2"
                          />
                        </label>
                      </div>
                      <div className="flex flex-col w-full gap-2 h-auto max-sm:text-xs">
                        <label
                          htmlFor="documentPhoneNumber3"
                          className="w-full gap-3 flex flex-col justify-center items-start max-sm:text-xs"
                        >
                          <p>Phone Number3</p>
                          <input
                            type="number"
                            id="documentPhoneNumber3"
                            value={
                              capLink?.document?.documentPhoneNumber3Ref || ""
                            }
                            onChange={(e) =>
                              setCapLink({
                                ...capLink,
                                document: {
                                  ...capLink.document,
                                  documentPhoneNumber3Ref: e.target.value,
                                },
                              })
                            }
                            className=" border-neutral-500 border w-full rounded-md p-3 max-sm:p-2 max-sm:text-xs"
                            placeholder=" Phone Number3"
                          />
                        </label>
                      </div>
                    </div>

                    {/* Fifth Content */}
                    <div className="w-full h-auto justify-start items-center grid grid-cols-2 max-md:grid-cols-1 gap-5 ">
                      <div className="flex flex-col w-full gap-2 h-auto max-sm:text-xs">
                        <label
                          htmlFor="documentFaxNumber"
                          className="w-full gap-3 flex flex-col justify-center items-start max-sm:text-xs"
                        >
                          <p>Fax Number</p>
                          <input
                            type="number"
                            id="documentFaxNumber"
                            value={
                              capLink?.document?.documentFaxNumberRef || ""
                            }
                            onChange={(e) =>
                              setCapLink({
                                ...capLink,
                                document: {
                                  ...capLink.document,
                                  documentFaxNumberRef: e.target.value,
                                },
                              })
                            }
                            className=" border-neutral-500 border w-full rounded-md p-3 max-sm:p-2 max-sm:text-xs"
                            placeholder=" Fax Number"
                          />
                        </label>
                      </div>
                      <div className="flex flex-col w-full gap-2 h-auto max-sm:text-xs">
                        <label
                          htmlFor="documentCellPhoneNumber/Email"
                          className="w-full gap-3 flex flex-col justify-center items-start max-sm:text-xs"
                        >
                          <p>Cell Phone Number/Email</p>
                          <input
                            type="number"
                            id="documentCellPhoneNumber/Email"
                            value={
                              capLink?.document
                                ?.documentCellPhoneNumberOREmailRef || ""
                            }
                            onChange={(e) =>
                              setCapLink({
                                ...capLink,
                                document: {
                                  ...capLink.document,
                                  documentCellPhoneNumberOREmailRef:
                                    e.target.value,
                                },
                              })
                            }
                            className=" border-neutral-500 border w-full rounded-md p-3 max-sm:p-2 max-sm:text-xs"
                            placeholder=" Cell Phone Number/Email"
                          />
                        </label>
                      </div>
                    </div>
                  </div>

                  {/* 2nd Input Section */}
                  <div className="min-sm:p-3 max-sm:mt-3 border-neutral-500  rounded-md text-sm text-gray-600 w-full h-auto">
                    <div className="w-full min-sm:p-3 max-sm:mt-3  flex flex-col gap-5  h-auto justify-between items-start">
                      <h3 className="text-md font-bold max-sm:mt-3 max-sm:text-xs max-md:text-sm ">
                        Document Tracking Number Section
                      </h3>

                      {/* First Content */}
                      <div className="w-full">
                        <label
                          htmlFor="documentTrackingNumber"
                          className="w-full"
                        >
                          <p>
                            Tracking Number
                            <sup className="text-orange-700">*</sup>
                          </p>
                          <input
                            type="text"
                            id="documentTrackingNumber"
                            value={
                              capLink?.document?.documentTrackingNumberRef || ""
                            }
                            onChange={(e) =>
                              setCapLink({
                                ...capLink,
                                document: {
                                  ...capLink.document,
                                  documentTrackingNumberRef: e.target.value,
                                },
                              })
                            }
                            className="mt-2 w-full border-neutral-500 border  max-sm:text-xs rounded-md p-2"
                            placeholder="Tracking Number"
                          />
                        </label>
                      </div>
                    </div>
                  </div>

                  {/* 3rd Input Section */}
                  <div className="min-sm:p-3 border-neutral-500  rounded-md text-sm text-gray-600 w-full h-auto">
                    <div className="w-full min-sm:p-3 max-sm:mt-3 flex flex-col gap-5  h-auto justify-between items-start">
                      <h3 className="text-md font-bold max-sm:mt-3 max-sm:text-xs max-md:text-sm ">
                        Document Center Section
                      </h3>

                      {/* First Content */}
                      <div className="w-full h-auto justify-start items-center grid grid-cols-2 max-md:grid-cols-1 gap-5 ">
                        <div className="flex flex-col w-full gap-2 h-auto max-sm:text-xs">
                          <label
                            htmlFor="documentCenterName"
                            className="w-full gap-3 flex flex-col justify-center items-start max-sm:text-xs"
                          >
                            <p>Name</p>
                            <input
                              type="text"
                              id="documentCenterName"
                              value={
                                capLink?.documentCenter?.documentCenterNameRef
                              }
                              onChange={(e) =>
                                setCapLink({
                                  ...capLink,
                                  documentCenter: {
                                    ...capLink.documentCenter,
                                    documentCenterNameRef: e.target.value,
                                  },
                                })
                              }
                              className=" border-neutral-500 border w-full rounded-md p-3 max-sm:p-2 max-sm:text-xs"
                              placeholder=" Name"
                            />
                          </label>
                        </div>
                        <div className="flex flex-col w-full gap-2 h-auto max-sm:text-xs">
                          <label
                            htmlFor="documentCenterAddress"
                            className="w-full gap-3 flex flex-col justify-center items-start max-sm:text-xs"
                          >
                            <p>Address</p>
                            <input
                              type="text"
                              id="documentCenterAddress"
                              value={
                                capLink?.documentCenter
                                  ?.documentCenterAddressRef
                              }
                              onChange={(e) =>
                                setCapLink({
                                  ...capLink,
                                  documentCenter: {
                                    ...capLink.documentCenter,
                                    documentCenterAddressRef: e.target.value,
                                  },
                                })
                              }
                              className=" border-neutral-500 border w-full rounded-md p-3 max-sm:p-2 max-sm:text-xs"
                              placeholder=" Address"
                            />
                          </label>
                        </div>
                      </div>
                      {/* second Content */}
                      <div className="w-full h-auto justify-start items-center grid grid-cols-2 max-md:grid-cols-1 gap-5 ">
                        <div className="flex flex-col w-full gap-2 h-auto max-sm:text-xs">
                          <label
                            htmlFor="documentCenterCity"
                            className="w-full gap-3 flex flex-col justify-center items-start max-sm:text-xs"
                          >
                            <p>City</p>
                            <input
                              type="text"
                              id="documentCenterCity"
                              value={
                                capLink?.documentCenter?.documentCenterCityRef
                              }
                              onChange={(e) =>
                                setCapLink({
                                  ...capLink,
                                  documentCenter: {
                                    ...capLink.documentCenter,
                                    documentCenterCityRef: e.target.value,
                                  },
                                })
                              }
                              className=" border-neutral-500 border w-full rounded-md p-3 max-sm:p-2 max-sm:text-xs"
                              placeholder=" City"
                            />
                          </label>
                        </div>
                        <div className="flex flex-col w-full gap-2 h-auto max-sm:text-xs">
                          <label
                            htmlFor="documentCenterCountry"
                            className="w-full gap-3 flex flex-col justify-center items-start max-sm:text-xs"
                          >
                            <p>Country</p>
                            <input
                              type="text"
                              id="documentCenterCountry"
                              value={
                                capLink?.documentCenter
                                  ?.documentCenterCountryRef
                              }
                              onChange={(e) =>
                                setCapLink({
                                  ...capLink,
                                  documentCenter: {
                                    ...capLink.documentCenter,
                                    documentCenterCountryRef: e.target.value,
                                  },
                                })
                              }
                              className=" border-neutral-500 border w-full rounded-md p-3 max-sm:p-2 max-sm:text-xs"
                              placeholder=" Country"
                            />
                          </label>
                        </div>
                      </div>

                      {/* third Content */}
                      <div className="w-full h-auto justify-start items-center grid grid-cols-2 max-md:grid-cols-1 gap-5 ">
                        <div className="flex flex-col w-full gap-2 h-auto max-sm:text-xs">
                          <label
                            htmlFor="documentCenterPhoneNumber1"
                            className="w-full gap-3 flex flex-col justify-center items-start max-sm:text-xs"
                          >
                            <p>Phone Number1</p>
                            <input
                              type="text"
                              id="documentCenterPhoneNumber1"
                              value={
                                capLink?.documentCenter
                                  ?.documentCenterPhoneNumber1Ref
                              }
                              onChange={(e) =>
                                setCapLink({
                                  ...capLink,
                                  documentCenter: {
                                    ...capLink.documentCenter,
                                    documentCenterPhoneNumber1Ref:
                                      e.target.value,
                                  },
                                })
                              }
                              className=" border-neutral-500 border w-full rounded-md p-3 max-sm:p-2 max-sm:text-xs"
                              placeholder=" Phone Number1"
                            />
                          </label>
                        </div>
                        <div className="flex flex-col w-full gap-2 h-auto max-sm:text-xs">
                          <label
                            htmlFor="documentCenterPhoneNumber2"
                            className="w-full gap-3 flex flex-col justify-center items-start max-sm:text-xs"
                          >
                            <p>Phone Number2</p>
                            <input
                              type="number"
                              id="documentCenterPhoneNumber2"
                              value={
                                capLink?.documentCenter
                                  ?.documentCenterPhoneNumber2Ref
                              }
                              onChange={(e) =>
                                setCapLink({
                                  ...capLink,
                                  documentCenter: {
                                    ...capLink.documentCenter,
                                    documentCenterPhoneNumber2Ref:
                                      e.target.value,
                                  },
                                })
                              }
                              className=" border-neutral-500 border w-full rounded-md p-3 max-sm:p-2 max-sm:text-xs"
                              placeholder=" Phone Number2"
                            />
                          </label>
                        </div>
                      </div>

                      {/* Fourth Content */}
                      <div className="w-full h-auto justify-start items-center grid grid-cols-2 max-md:grid-cols-1 gap-5 ">
                        <div className="flex flex-col w-full gap-2 h-auto max-sm:text-xs">
                          <label
                            htmlFor="documentCenterPhoneNumber3"
                            className="w-full gap-3 flex flex-col justify-center items-start max-sm:text-xs"
                          >
                            <p>Phone Number3</p>
                            <input
                              type="number"
                              id="documentCenterPhoneNumber3"
                              value={
                                capLink?.documentCenter
                                  ?.documentCenterPhoneNumber3Ref
                              }
                              onChange={(e) =>
                                setCapLink({
                                  ...capLink,
                                  documentCenter: {
                                    ...capLink.documentCenter,
                                    documentCenterPhoneNumber3Ref:
                                      e.target.value,
                                  },
                                })
                              }
                              className=" border-neutral-500 border w-full rounded-md p-3 max-sm:p-2 max-sm:text-xs"
                              placeholder=" Phone Number3"
                            />
                          </label>
                        </div>
                        <div className="flex flex-col w-full gap-2 h-auto max-sm:text-xs">
                          <label
                            htmlFor="documentCenterEmail"
                            className="w-full gap-3 flex flex-col justify-center items-start max-sm:text-xs"
                          >
                            <p>Email</p>
                            <input
                              type="email"
                              id="documentCenterEmail"
                              value={
                                capLink?.documentCenter?.documentCenterEmailRef
                              }
                              onChange={(e) =>
                                setCapLink({
                                  ...capLink,
                                  documentCenter: {
                                    ...capLink.documentCenter,
                                    documentCenterEmailRef: e.target.value,
                                  },
                                })
                              }
                              className=" border-neutral-500 border w-full rounded-md p-3 max-sm:p-2 max-sm:text-xs"
                              placeholder=" Email"
                            />
                          </label>
                        </div>
                      </div>

                      {/* Fifth Content */}
                      <div className="w-full h-auto justify-start items-center grid grid-cols-2 max-md:grid-cols-1 gap-5 ">
                        <div className="flex flex-col w-full gap-2 h-auto max-sm:text-xs">
                          <label
                            htmlFor="documentCenterUrl"
                            className="w-full gap-3 flex flex-col justify-center items-start max-sm:text-xs"
                          >
                            <p>Url</p>
                            <input
                              type="url"
                              id="documentCenterUrl"
                              value={
                                capLink?.documentCenter?.documentCenterUrlRef
                              }
                              onChange={(e) =>
                                setCapLink({
                                  ...capLink,
                                  documentCenter: {
                                    ...capLink.documentCenter,
                                    documentCenterUrlRef: e.target.value,
                                  },
                                })
                              }
                              className=" border-neutral-500 border w-full rounded-md p-3 max-sm:p-2 max-sm:text-xs"
                              placeholder=" Url"
                            />
                          </label>
                        </div>
                        <div className="flex flex-col w-full gap-2 h-auto max-sm:text-xs">
                          <label
                            htmlFor="documentCenterOtherInformation"
                            className="w-full gap-3 flex flex-col justify-center items-start max-sm:text-xs"
                          >
                            <p>Other Information</p>
                            <input
                              type="number"
                              id="documentCenterOtherInformation"
                              value={
                                capLink?.documentCenter
                                  ?.documentCenterOtherInformationRef
                              }
                              onChange={(e) =>
                                setCapLink({
                                  ...capLink,
                                  documentCenter: {
                                    ...capLink.documentCenter,
                                    documentCenterOtherInformationRef:
                                      e.target.value,
                                  },
                                })
                              }
                              className=" border-neutral-500 border w-full rounded-md p-3 max-sm:p-2 max-sm:text-xs"
                              placeholder=" Other Information"
                            />
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* 5th */}
              {/* Consignee Details */}
              <div className=" w-full h-auto flex justify-center gap-5 flex-col">
                {/* Heading */}
                <div className="flex justify-between items-center p-6 max-sm:p-3">
                  <h1 className="text-3xl font-bold max-md:text-xl max-sm:text-lg">
                    Consignee/notify party of your request
                  </h1>
                </div>

                <div className="p-6 max-sm:p-3 border-neutral-500 border rounded-md text-sm text-gray-600 w-full h-auto">
                  <div className="w-full min-sm:p-3 max-sm:mt-3  flex flex-col gap-5  h-auto justify-between items-start">
                    <h3 className="text-md font-bold max-sm:text-xs max-md:text-sm">Consignee</h3>

                    <div className="w-full h-auto grid grid-cols-2 max-md:grid-cols-1 gap-3">
                      {/* Reusable Input Component for Consignee and Notify Party */}
                      {consigneeInputData.map(({ label, id, value }) => (
                        <div
                          className="w-full h-auto justify-start items-center flex gap-5"
                          key={id}
                        >
                          <div className="flex flex-col w-full gap-2 h-auto max-sm:text-xs">
                            <label
                              htmlFor={id}
                              className="w-full gap-3 flex flex-col justify-center items-start"max-sm:text-xs
                            >
                              <p>{label}</p>
                              <input
                                type="text"
                                id={id}
                                value={value}
                                onChange={(e) =>
                                  setCapLink({
                                    ...capLink,
                                    consignee: {
                                      ...capLink.consignee,
                                      [id]: e.target.value,
                                    },
                                  })
                                }
                                className="border-neutral-500 border w-full rounded-md p-3 max-sm:p-2 max-sm:text-xs"
                                placeholder={label}
                              />
                            </label>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Notify Party Section */}
                  <div className="w-full min-sm:p-3 max-sm:mt-3  flex flex-col gap-5  h-auto justify-between items-start">
                    <h3 className="text-md font-bold max-sm:mt-3 max-sm:text-xs max-md:text-sm">Notify Party</h3>
                    <div className="w-full h-auto grid grid-cols-2 max-md:grid-cols-1 gap-3">
                      {/* Reusable Input Component for Notify Party */}
                      {notifyInputData.map(({ label, id, value }) => (
                        <div
                          className="w-full h-auto justify-start items-center flex gap-5"
                          key={id}
                        >
                          <div className="flex flex-col w-full gap-2 h-auto max-sm:text-xs">
                            <label
                              htmlFor={id}
                              className="w-full gap-3 flex flex-col justify-center items-start"max-sm:text-xs
                            >
                              <p>{label}</p>
                              <input
                                type="text"
                                id={id}
                                value={value}
                                onChange={(e) =>
                                  setCapLink({
                                    ...capLink,
                                    notifyParty: {
                                      ...capLink.notifyParty,
                                      [id]: e.target.value,
                                    },
                                  })
                                }
                                className="border-neutral-500 border w-full rounded-md p-3 max-sm:p-2 max-sm:text-xs"
                                placeholder={label}
                              />
                            </label>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* 6th */}
              {/* Purchased Product */}
              <div className=" w-full h-auto flex justify-center gap-5 flex-col">
                {/* Heading */}
                <div className="flex justify-between items-center min-sm:p-6 max-sm:p-2 ">
                  <h1 className="text-3xl font-bold max-md:text-xl max-sm:text-lg">Purchased Product</h1>
                </div>
                <div className="p-6 max-sm:p-3 border-neutral-500 border max-sm:text-xs rounded-md text-sm text-gray-600 w-full h-auto">
                  <div className="w-full flex flex-col gap-5 min-sm:p-3 h-auto items-start">
                    <EditInputFeild
                      label="Product Name"
                      id="notifyPartyProductName"
                      value={
                        capLink?.notifyParty?.notifyPartyProductNameRef || ""
                      }
                      onChange={(e) =>
                        handleChange(
                          "notifyPartyProductNameRef",
                          e.target.value
                        )
                      }
                      placeholder="Enter Product Name Here"
                      required
                    />

                    <div className="w-full grid grid-cols-2 max-sm:grid-cols-1 gap-5 ">
                      <EditInputFeild
                        label="Reference No"
                        id="notifyPartyReferenceNo"
                        value={
                          capLink?.notifyParty?.notifyPartyReferenceNoRef || ""
                        }
                        onChange={(e) =>
                          handleChange(
                            "notifyPartyReferenceNoRef",
                            e.target.value
                          )
                        }
                        placeholder="Reference No"
                      />
                      <EditInputFeild
                        label="Mileage"
                        id="notifyPartyMileage"
                        value={
                          capLink?.notifyParty?.notifyPartyMileageRef || ""
                        }
                        onChange={(e) =>
                          handleChange("notifyPartyMileageRef", e.target.value)
                        }
                        placeholder="Mileage"
                      />
                    </div>

                    <div className="w-full grid grid-cols-2 max-sm:grid-cols-1 gap-5 ">
                      <EditInputFeild
                        label="Model Code"
                        id="notifyPartyModelCode"
                        value={
                          capLink?.notifyParty?.notifyPartyModelCodeRef || ""
                        }
                        onChange={(e) =>
                          handleChange(
                            "notifyPartyModelCodeRef",
                            e.target.value
                          )
                        }
                        placeholder="Model Code"
                      />
                      <EditInputFeild
                        label="Registration Year/Month"
                        id="notifyPartyRegistrationYearMonth"
                        value={
                          capLink?.notifyParty
                            ?.notifyPartyRegistrationYearORMonthRef || ""
                        }
                        onChange={(e) =>
                          handleChange(
                            "notifyPartyRegistrationYearORMonthRef",
                            e.target.value
                          )
                        }
                        placeholder="Registration Year/Month"
                      />
                    </div>

                    <div className="w-full grid grid-cols-2 max-sm:grid-cols-1 gap-5 ">
                      <EditInputFeild
                        label="Manufacture Year/Month"
                        id="ManufactureYearMonth"
                        type="number"
                        active={isActive}
                        value={
                          capLink?.notifyParty?.manufactureYearORMonthRef || ""
                        }
                        onChange={(e) =>
                          handleChange(
                            "manufactureYearORMonthRef",
                            e.target.value
                          )
                        }
                        placeholder="Manufacture Year/Month"
                      />
                      <EditInputFeild
                        label="Model Grade"
                        id="notifyPartyModelGrade"
                        value={
                          capLink?.notifyParty?.notifyPartyModelGradeRef || ""
                        }
                        onChange={(e) =>
                          handleChange(
                            "notifyPartyModelGradeRef",
                            e.target.value
                          )
                        }
                        placeholder="Model Grade"
                      />
                    </div>

                    <div className="w-full grid grid-cols-2 max-sm:grid-cols-1 gap-5 ">
                      <EditInputFeild
                        label="Chassis #"
                        id="notifyPartyChassis"
                        value={
                          capLink?.notifyParty?.notifyPartyChassisRef || ""
                        }
                        onChange={(e) =>
                          handleChange("notifyPartyChassisRef", e.target.value)
                        }
                        placeholder="Chassis #"
                      />
                      <EditInputFeild
                        label="Engine Size"
                        id="notifyPartyEngineSize"
                        type="number"
                        value={
                          capLink?.notifyParty?.notifyPartyEngineSizeRef || ""
                        }
                        onChange={(e) =>
                          handleChange(
                            "notifyPartyEngineSizeRef",
                            e.target.value
                          )
                        }
                        placeholder="Engine Size"
                      />
                    </div>

                    <div className="w-full grid grid-cols-2 max-sm:grid-cols-1 gap-5 ">
                      <EditSelectFeild
                        label="Steering"
                        id="notifyPartySteering"
                        value={
                          capLink?.notifyParty?.notifyPartySteeringRef || ""
                        }
                        onChange={(e) =>
                          handleChange("notifyPartySteeringRef", e.target.value)
                        }
                        options={[
                          { value: "Right", label: "Right" },
                          { value: "Left", label: "Left" },
                        ]}
                        required
                      />
                      <EditSelectFeild
                        label="Transmission"
                        id="notifyPartyTransmission"
                        value={
                          capLink?.notifyParty?.notifyPartytransmissionRef || ""
                        }
                        onChange={(e) =>
                          handleChange(
                            "notifyPartyTransmissionRef",
                            e.target.value
                          )
                        }
                        options={[
                          { value: "AT", label: "AT" },
                          { value: "AUTOMATIC", label: "AUTOMATIC" },
                          { value: "MT", label: "MT" },
                        ]}
                      />
                    </div>
                  </div>

                  {/* Products Features */}
                  <div className="productFeatures w-full p-3 h-auto flex flex-col gap-5 justify-center">
                    <div className="flex justify-between items-center min-sm:p-6 max-sm:mt-3">
                      <h1 className="text-3xl font-bold max-md:text-xl max-sm:text-lg">Option</h1>
                    </div>
                    {/* Status Features */}
                    <div className="card min-md:p-6  rounded-md">
                      <div className="grid grid-cols-3 max-md:grid-cols-2 max-sm:grid-cols-1 gap-4">
                        {optionFeatures.map((feature) => (
                          <div key={feature.id} className="w-[230px] min-smpx-3 py-1">
                            <div className="flex items-start">
                              <label
                                htmlFor={feature.value}
                                className="text-sm font-bold text-gray-700 cursor-pointer"
                              >
                                <input
                                  type="checkbox"
                                  className="mt-1 mr-2"
                                  name="selectedOptionFeatures[]"
                                  value={feature.value}
                                  id={feature.value}
                                  checked={
                                    selectedOptionFeatures &&
                                    selectedOptionFeatures.includes(
                                      feature.value
                                    )
                                  }
                                  onChange={(e) =>
                                    handleOptionFeatureChange(
                                      e,
                                      "optionFeatures"
                                    )
                                  }
                                />
                                {feature.label}
                              </label>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                  {/* 4th Content */}
                  <div className="w-full flex flex-col gap-5 min-sm:p-3 h-auto items-start">
                    {/* First Image Input */}
                    <div className="w-full flex flex-col gap-5">
                      <div className="imageInput w-full h-auto text-sm">
                        <div className="flex flex-col gap-2 max-sm:text-xs">
                          <span>Upload Featured Image</span>
                          <label
                            htmlFor="productFeatureImageRef"
                            className="w-full flex"
                          >
                            {/* Custom Button */}
                            <button
                              type="button"
                              className="bg-neutral-300 border border-neutral-500 border-r-0 hover:bg-neutral-400 w-[120px] max-sm:p-2 p-3 rounded-bl-lg rounded-tl-lg shadow-md transition duration-300"
                            >
                              Upload File
                            </button>

                            {/* Hidden Input */}
                            <input
                              type="file"
                              id="productFeatureImageRef"
                              name="productFeatureImageRef"
                              onChange={handleProductionFeaturedImageChange}
                              className="border-neutral-500 border rounded-br-lg p-3 max-sm:p-2 rounded-tr-lg w-[90%]"
                            />
                          </label>
                        </div>

                        {/* Show Uploaded Featured Image */}
                        {capLink?.productFeatureImageRef && (
                          <div className="w-[200px] max-sm:w-[170px] max-sm:h-[170px] mt-5 h-[200px] flex justify-center items-center relative">
                            <div className="text-lg p-1 shadow-lg rounded-full bg-white hover:bg-red-400 cursor-pointer absolute top-0 right-0 z-10">
                              ❌
                            </div>
                            <img
                              loading="lazy"
                              src={`/${capLink.productFeatureImageRef}`}
                              alt="Featured"
                              className="w-[160px] h-[160px] object-cover rounded-lg max-sm:w-[130px] max-sm:h-[130px]"
                            />
                          </div>
                        )}
                      </div>

                      {/* Multiple Image Upload */}
                      <div className="imageInput w-full h-auto text-sm max-sm:text-xs rounded-md">
                        <div className="flex flex-col gap-2">
                          <span>Upload Images</span>
                          <label
                            htmlFor="productImageRef"
                            className="w-full flex"
                          >
                            {/* Custom Button */}
                            <button
                              type="button"
                              className="bg-neutral-300 border border-neutral-500 border-r-0 hover:bg-neutral-400 w-[120px] p-3 max-sm:p-1 rounded-bl-lg rounded-tl-lg shadow-md transition duration-300"
                            >
                              Upload Files
                            </button>

                            {/* Hidden Multiple Input */}
                            <input
                              type="file"
                              id="productImageRef"
                              name="productImageRef"
                              multiple
                              onChange={handleProductImageChange}
                              className="border-neutral-500 border rounded-br-lg p-3 max-sm:p-2 rounded-tr-lg w-[90%]"
                            />
                          </label>
                        </div>

                        {/* Show Uploaded Images */}
                        {capLink?.productImageRef?.length > 0 && (
                          <div className="flex w-auto h-auto p-3">
                            <div
                              id="showProductImages"
                              className="showImage w-full mt-5 h-auto gap-4 flex-wrap flex justify-start items-center "
                            >
                              {capLink.productImageRef.map(
                                (productImage, index) => (
                                  <div
                                    key={index}
                                    className="w-auto h-auto p-3 relative"
                                  >
                                    <div
                                      className="crossBtn text-lg p-1 shadow-lg h-auto w-auto rounded-full bg-white hover:bg-red-400 cursor-pointer  absolute top-0 right-0 z-10"
                                      onClick={(e) => hiddenProductImage(e)}
                                    >
                                      ❌
                                    </div>
                                    <img
                                      loading="lazy"
                                      src={`/${productImage}`}
                                      alt={`Gallery ${index}`}
                                      className="w-[130px] h-[130px] object-cover rounded-md"
                                    />
                                  </div>
                                )
                              )}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </form>

            <div className="button w-full flex justify-start items-center p-6 max-sm:p-3">
              <button
                className="bg-orange-400 text-white px-4 max-sm:text-sm  max-sm:w-[95%] max-sm:mx-auto py-2 rounded-lg cursor-pointer"
                onClick={updateCapLinksData}
              >
                Update Cap Link
              </button>
            </div>
          </div>
        </div>
        <div className="w-full h-[150px] ">
          <Copyright />
        </div>
      </div>
  );
};

export default EditCapLinksForm;
