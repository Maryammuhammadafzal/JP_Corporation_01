import React, { useEffect, useRef, useState } from "react";
import Button from "../../../../Components/Button/Button";
import axios from "axios";
import { statusFeatures } from "../../../../Components/statusFeatures.js";
import optionFeatures from "../../../../Components/optionFeatures.js";
import Copyright from "../../../../Components/Copyright/Copyright.jsx";

const GenerateCapLinksForm = () => {
  const [isActive, setIsActive] = useState(false);
  const [productFeatureImage, setproductFeatureImage] = useState(null);
  const [productImages, setproductImages] = useState(null);
  const [blImage, setBLImage] = useState(null);
  const [certificateImage, setCertificateImage] = useState(null);
  const [invoiceImage, setInvoiceImage] = useState(null);
  const [englishCertificateImage, setEnglishCerticateImage] = useState(null);
  const [inspectionImage, setInspectionImage] = useState(null);
  const [selectedStatusFeatures, setSelectedStatusFeatures] = useState([]);
  const [selectedNameOption, setSelectedNameOption] = useState("Be Forward");
  const [selectedForwarderNameOption, setSelectedForwarderNameOption] =
    useState("Satish");
  const [selectedOptionFeatures, setselectedOptionFeatures] = useState([]);

  // Toggle Status CheckBox Function
  const toggleCheckbox = (featureId) => {
    if (selectedStatusFeatures.includes(featureId)) {
      setSelectedStatusFeatures(
        selectedStatusFeatures.filter((id) => id !== featureId)
      );
    } else {
      setSelectedStatusFeatures([...selectedStatusFeatures, featureId]);
    }
  };

  // Toggle Option CheckBox Function
  const toggleOptionCheckbox = (featureId) => {
    if (selectedOptionFeatures.includes(featureId)) {
      setselectedOptionFeatures(
        selectedOptionFeatures.filter((id) => id !== featureId)
      );
    } else {
      setselectedOptionFeatures([...selectedOptionFeatures, featureId]);
    }
  };

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
      arrivalPartOfDischargeRef: useRef(null),
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

  // File handlers
  const handleProductionFeaturedImageChange = (e) => {
    setproductFeatureImage(e.target.files[0]);
  };

  const handleProductImageChange = (e) => {
    setproductImages([...e.target.files]);
  };

  const handleBLFileChange = (e) => {
    setBLImage(e.target.files[0]);
  };

  const handleCertificateChange = (e) => {
    setCertificateImage(e.target.files[0]);
  };

  const handleEnglishCertificateChange = (e) => {
    setEnglishCerticateImage(e.target.files[0]);
  };

  const handleInvoiceChange = (e) => {
    setInvoiceImage(e.target.files[0]);
  };
  const handleInspectionFileChange = (e) => {
    setInspectionImage(e.target.files[0]);
  };

  // Radio Button Function
  const handleNameRadioChange = (e) => {
    setSelectedNameOption(e.target.value);
  };
  const handleForwarderNameRadioChange = (e) => {
    setSelectedForwarderNameOption(e.target.value);
  };

  // Submit All Deatails Function
  const GenerateCapLinks = async (e) => {
    e.preventDefault();
    
    if( !productFeatureImage) {
      alert ("featured image is required");
      return;
    }
    if( !productImages) {
      alert ("product images are required");
      return;
    }
    if (!refs.departure.carrierNameRef.current.value) {
      refs.departure.carrierNameRef.current.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
      refs.departure.carrierNameRef.current.focus();
      setIsActive("carrier");
      return;
    }  if (!refs.notifyParty.notifyPartyProductNameRef.current.value) {
      refs.notifyParty.notifyPartyProductNameRef.current.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
      refs.notifyParty.notifyPartyProductNameRef.current.focus();
      setIsActive("product_name");
      return;
    }  if (!refs.notifyParty.notifyPartyReferenceNoRef.current.value) {
      refs.notifyParty.notifyPartyReferenceNoRef.current.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
      refs.notifyParty.notifyPartyReferenceNoRef.current.focus();
      setIsActive("reference_no");
      return;
    }  if (!refs.document.documentNameRef.current.value) {
      refs.document.documentNameRef.current.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
      refs.document.documentNameRef.current.focus();
      setIsActive("doc_name");
      return;
    }  if (!refs.notifyParty.notifyPartyMileageRef.current.value) {
      refs.notifyParty.notifyPartyMileageRef.current.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
      refs.notifyParty.notifyPartyMileageRef.current.focus();
      setIsActive("mileage");
      return;
    }  if (!refs.notifyParty.notifyPartyModelCodeRef.current.value) {
      refs.notifyParty.notifyPartyModelCodeRef.current.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
      refs.notifyParty.notifyPartyModelCodeRef.current.focus();
      setIsActive("modelCode");
      return;
    }  if (!refs.notifyParty.notifyPartyRegistrationYearORMonthRef.current.value) {
      refs.notifyParty.notifyPartyRegistrationYearORMonthRef.current.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
      refs.notifyParty.notifyPartyRegistrationYearORMonthRef.current.focus();
      setIsActive("registeration_year_month");
    }  if (!refs.notifyParty.manufactureYearORMonthRef.current.value) {
      refs.notifyParty.manufactureYearORMonthRef.current.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
      refs.notifyParty.manufactureYearORMonthRef.current.focus();
      setIsActive("manufacture_year_month");
      return;
    }  if (!refs.notifyParty.notifyPartyModelGradeRef.current.value) {
      refs.notifyParty.notifyPartyModelGradeRef.current.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
      refs.notifyParty.notifyPartyModelGradeRef.current.focus();
      setIsActive("modelGrade");
      return;
    }  else {

      // Adding Cap Data
      const capData = new FormData();

      capData.append("company_name", selectedNameOption);
      capData.append("forwarder_name", selectedForwarderNameOption);
      if (refs.misc.descriptionRef) {
        capData.append("message", refs.misc.descriptionRef.current.value);
      }
      const token = localStorage.getItem("adminToken");
      if (!token) {
        alert("Admin token missing!");
        return;
      }
      let cap_id;

      try {
        const capResponse = await axios.post(
          "http://localhost:5000/api/cap/add",
          capData,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        console.log("Success:", capResponse.data.data);
        cap_id = parseInt(capResponse.data.data?.md5_id);
      } catch (error) {
        console.log("Error Cap:", error.message);
      }

      if (cap_id) {
        // Adding Shipping Data
        const shippingData = new FormData();
        shippingData.append(
          "carrier",
          refs.departure.carrierNameRef.current.value
        );
        shippingData.append(
          "dep_vessel_name",
          refs.departure.departureVesselRef.current.value
        );
        shippingData.append(
          "port_of_loading",
          refs.departure.departurePartsOfLandingRef.current.value
        );
        shippingData.append(
          "etd",
          refs.departure.departureETDRef.current.value
        );
        shippingData.append(
          "arrive_vessel_name",
          refs.arrival.arrivalVesselRef.current.value
        );
        shippingData.append(
          "port_of_discharge",
          refs.arrival.arrivalPartOfDischargeRef.current.value
        );
        shippingData.append("eta", refs.arrival.arrivalETDRef.current.value);
        shippingData.append("bl", blImage);
        shippingData.append("inspection", inspectionImage);
        shippingData.append("export_certificate", certificateImage);
        shippingData.append(
          "english_export_certificate",
          englishCertificateImage
        );
        shippingData.append("invoice", invoiceImage);
        shippingData.append(
          "enrollment",
          refs.document.documentenrollementRef.current.value
        );

        shippingData.append("cap_id", cap_id);

        try {

          const shippingResponse = await axios.post(
            "http://localhost:5000/api/shippingInformation/add",
            shippingData,
            {
              headers: {
                "Content-Type": "multipart/form-data",
                Authorization: `Bearer ${token}`,
              },
            }
          );

          console.log("Success:", shippingResponse.data.data);
        } catch (error) {
          console.log("Error Shipping:", error.message);
        }

        const documentData = new FormData();

        documentData.append("cap_id", cap_id);

        documentData.append(
          "doc_name",
          refs.document.documentNameRef.current.value
        );
        documentData.append(
          "doc_address",
          refs.document.documentAddressRef.current.value
        );
        documentData.append(
          "doc_city",
          refs.document.documentCityRef.current.value
        );
        documentData.append(
          "doc_country",
          refs.document.documentCountryRef.current.value
        );
        documentData.append(
          "doc_phone1",
          refs.document.documentPhoneNumber1Ref.current.value
        );
        documentData.append(
          "doc_phone2",
          refs.document.documentPhoneNumber2Ref.current.value
        );
        documentData.append(
          "doc_phone3",
          refs.document.documentPhoneNumber3Ref.current.value
        );
        documentData.append(
          "doc_faxno",
          refs.document.documentFaxNumberRef.current.value
        );
        documentData.append(
          "cellphone_no_email",
          refs.document.documentCellPhoneNumberOREmailRef.current.value
        );
        documentData.append(
          "tracking_no",
          refs.document.documentTrackingNumberRef.current.value
        );
        documentData.append(
          "docCenter_name",
          refs.documentCenter.documentCenterNameRef.current.value
        );
        documentData.append(
          "docCenter_address",
          refs.documentCenter.documentCenterAddressRef.current.value
        );
        documentData.append(
          "docCenter_city",
          refs.documentCenter.documentCenterCityRef.current.value
        );
        documentData.append(
          "docCenter_country",
          refs.documentCenter.documentCenterCountryRef.current.value
        );
        documentData.append(
          "docCenter_phone1",
          refs.documentCenter.documentCenterPhoneNumber1Ref.current.value
        );
        documentData.append(
          "docCenter_phone2",
          refs.documentCenter.documentCenterPhoneNumber2Ref.current.value
        );
        documentData.append(
          "docCenter_phone3",
          refs.documentCenter.documentCenterPhoneNumber3Ref.current.value
        );
        documentData.append(
          "email",
          refs.documentCenter.documentCenterEmailRef.current.value
        );
        documentData.append(
          "url",
          refs.documentCenter.documentCenterUrlRef.current.value
        );
        documentData.append(
          "other_information",
          refs.documentCenter.documentCenterOtherInformationRef.current.value
        );

        try {

          const documentResponse = await axios.post(
            "http://localhost:5000/api/documentInformation/add",
            documentData,
            {
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
              },
            }
          );

          console.log("Success:", documentResponse.data.data);
        } catch (error) {
          console.log("Error Document:", error.message);
        }

        const consigneeData = new FormData();

        consigneeData.append("cap_id", cap_id);

        consigneeData.append(
          "consignee_name",
          refs.consignee.consigneeNameRef.current.value
        );
        consigneeData.append(
          "consignee_address",
          refs.consignee.consigneeAddressRef.current.value
        );
        consigneeData.append(
          "consignee_city",
          refs.consignee.consigneeCityRef.current.value
        );
        consigneeData.append(
          "consignee_country",
          refs.consignee.consigneeCountryRef.current.value
        );
        consigneeData.append(
          "consignee_phone1",
          refs.consignee.consigneePhoneNumber1Ref.current.value
        );
        consigneeData.append(
          "consignee_phone2",
          refs.consignee.consigneePhoneNumber2Ref.current.value
        );
        consigneeData.append(
          "consignee_phone3",
          refs.consignee.consigneePhoneNumber3Ref.current.value
        );
        consigneeData.append(
          "consignee_faxno",
          refs.consignee.consigneeFaxNumberRef.current.value
        );
        consigneeData.append(
          "consignee_phoneno_email",
          refs.consignee.consigneeCellPhoneNumberOREmailRef.current.value
        );
        consigneeData.append(
          "notifyParty_name",
          refs.notifyParty.notifyPartyNameRef.current.value
        );
        consigneeData.append(
          "notifyParty_address",
          refs.notifyParty.notifyPartyAddressRef.current.value
        );
        consigneeData.append(
          "notifyParty_city",
          refs.notifyParty.notifyPartyCityRef.current.value
        );
        consigneeData.append(
          "notifyParty_country",
          refs.notifyParty.notifyPartyCountryRef.current.value
        );
        consigneeData.append(
          "notifyParty_phone1",
          refs.notifyParty.notifyPartyPhoneNumber1Ref.current.value
        );
        consigneeData.append(
          "notifyParty_phone2",
          refs.notifyParty.notifyPartyPhoneNumber2Ref.current.value
        );
        consigneeData.append(
          "notifyParty_phone3",
          refs.notifyParty.notifyPartyPhoneNumber3Ref.current.value
        );
        consigneeData.append(
          "notifyParty_faxno",
          refs.notifyParty.notifyPartyFaxNumberRef.current.value
        );
        consigneeData.append(
          "notifyParty_phoneno_email",
          refs.notifyParty.notifyPartyCellPhoneNumberOREmailRef.current.value
        );

        try {
          const consigneeResponse = await axios.post(
            "http://localhost:5000/api/consigneeNotifyPartyInformation/add",
            consigneeData,
            {
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
              },
            }
          );

          console.log("Success:", consigneeResponse.data.data);
        } catch (error) {
          console.log("Error consignee:", error.message);
        }
        if (productImages) {

          const productImageData = new FormData();
  
          productImageData.append("productID" , cap_id);
          
          for (let i = 0; i < productImages.length; i++) {
            productImageData.append("product_images", productImages[i]);
          }
          try {
          const product_images_response = await axios.post(
            "http://localhost:5000/api/productImage/add",
            productImageData,
            {
              headers: {
                "Content-Type": "multipart/form-data",
                Authorization: `Bearer ${token}`,
              },
            }
          );
  
          console.log("Success" + JSON.stringify(product_images_response.data));
        } catch (error) {
          console.log("Failed to add Product images" , error.message);
          
        }
        }

        const productData = new FormData();

        productData.append("cap_id", cap_id);

        productData.append(
          "product_name",
          refs.notifyParty.notifyPartyProductNameRef.current.value
        );
        productData.append(
          "reference_no",
          refs.notifyParty.notifyPartyReferenceNoRef.current.value
        );
        productData.append(
          "mileage",
          refs.notifyParty.notifyPartyMileageRef.current.value
        );
        productData.append(
          "modelCode",
          refs.notifyParty.notifyPartyModelCodeRef.current.value
        );
        productData.append(
          "registeration_year_month",
          refs.notifyParty.notifyPartyRegistrationYearORMonthRef.current.value
        );
        productData.append(
          "manufacture_year_month",
          refs.notifyParty.manufactureYearORMonthRef.current.value
        );
        productData.append(
          "modelGrade",
          refs.notifyParty.notifyPartyModelGradeRef.current.value
        );
        productData.append(
          "chassis",
          refs.notifyParty.notifyPartyChassisRef.current.value
        );
        productData.append(
          "engine_size",
          refs.notifyParty.notifyPartyEngineSizeRef.current.value
        );
        productData.append(
          "drive",
          refs.notifyParty.notifyPartyDriveRef.current.value
        );
        productData.append(
          "ext_color",
          refs.notifyParty.notifyPartyExtColorRef.current.value
        );
        productData.append(
          "steering",
          refs.notifyParty.notifyPartySteeringRef.current.value
        );
        productData.append(
          "transmission",
          refs.notifyParty.notifyPartytransmissionRef.current.value
        );
        productData.append(
          "fuel",
          refs.notifyParty.notifyPartyFuelRef.current.value
        );
        productData.append(
          "seats",
          refs.notifyParty.notifyPartySeatsRef.current.value
        );
        productData.append(
          "doors",
          parseInt(refs.notifyParty.notifyPartyDoorRef.current.value)
        );
        productData.append(
          "engine_no",
          refs.notifyParty.notifyPartyEngineNoRef.current.value
        );

        productData.append(
          "options",
          optionFeatures.map((feature) => feature.value).toString()
        );
        productData.append("featured_image", productFeatureImage);

        try {
          const productResponse = await axios.post(
            "http://localhost:5000/api/productInformation/add",
            productData,
            {
              headers: {
                "Content-Type": "multipart/form-data",
                Authorization: `Bearer ${token}`,
              },
            }
          );

          console.log("Success:", productResponse.data.data);

          //  Reset checkboxes
          document
            .querySelectorAll("input[type='checkbox']")
            .forEach((checkbox) => {
              checkbox.checked = false;
            });
          // Reset radio
          document
            .querySelectorAll("input[type='radio']")
            .forEach((checkbox) => {
              checkbox.checked = false;
            });

          window.location.replace("/dashboard/cap-links");
        } catch (error) {
          console.log("Error product:", error.message);
        }
      }

   
    }
  };
  return (
    <div className="w-full max-h-auto min-h-screen rounded-tr-[50px]  flex flex-col overflow-y-auto ">
      <div className="w-full h-auto  flex flex-col gap-4 p-5 mb-4 max-sm:p-3 items-start">
        <div className="w-[95%]  mx-auto border mb-3 rounded-md  py-3">
          <form
            action=""
            className="form  w-full h-auto p-3  flex flex-col gap-5"
          >
            <div className="nameDetail w-full h-auto flex justify-center gap-5 flex-col">
              <div className="flex justify-between items-center p-6 max-sm:p-3 ">
                <h1 className="text-3xl font-bold  max-md:text-xl max-sm:text-lg">
                  Add Details
                </h1>
              </div>

              {/* 1st */}
              <div className="p-6 max-sm:p-3 border-neutral-500 border rounded-md space-y-5 text-sm text-gray-600 w-full h-auto">
                {/* Name */}
                <div className="w-full flex flex-col gap-5 p-3 max-sm:p-1 h-auto justify-between items-start">
                  <h3 className="text-md font-bold max-sm:text-xs">
                    Select Name
                  </h3>
                  <div className="w-full h-auto justify-start items-center grid grid-cols-4 gap-5 max-lg:grid-cols-2 max-md:grid-cols-1">
                    <label
                      htmlFor="beForward"
                      className="w-36 max-sm:w-25 max-sm:text-[12px] gap-3 flex justify-center items-center "
                    >
                      <input
                        type="radio"
                        name="company_name"
                        id="beForward"
                        value="Be Forward"
                        checked={selectedNameOption === "Be Forward"}
                        onChange={(e) => handleNameRadioChange(e)}
                        className="mt-2 rounded-md p-2"
                      />
                      Be Forward
                    </label>
                    <label
                      htmlFor="jpCorporation"
                      className="w-36 max-sm:w-28 max-sm:text-[12px] gap-3 flex justify-center items-center"
                    >
                      <input
                        type="radio"
                        name="company_name"
                        id="jpCorporation"
                        value="JP Corporation"
                        checked={selectedNameOption === "JP Corporation"}
                        onChange={(e) => handleNameRadioChange(e)}
                        className="mt-2 rounded-md p-2"
                      />
                      JP Corporation
                    </label>
                  </div>
                </div>
                <div className="w-fit flex flex-col gap-5 p-3 max-sm:p-1 space-y-3 h-auto justify-between items-start">
                  <h3 className="text-md font-bold max-sm:text-xs">
                    Forwarder Name
                  </h3>
                  <div className="w-full h-auto justify-between items-center flex max-sm:flex-col gap-3 ">
                    <label
                      htmlFor="Satish"
                      className="w-36 max-sm:text-[12px] gap-3 flex justify-center max-sm:justify-start max-sm:pl-3 items-center"
                    >
                      <input
                        type="radio"
                        name="forwarder_name"
                        id="Satish"
                        value="Satish"
                        checked={selectedForwarderNameOption === "Satish"}
                        onChange={(e) => handleForwarderNameRadioChange(e)}
                        className="mt-2 border-neutral-500 border rounded-md p-2"
                        placeholder="Enter Satish Here"
                      />
                      <p>Satish</p>
                    </label>
                    <label
                      htmlFor="Vova"
                      className="w-36 max-sm:text-[12px] gap-3 flex justify-center max-sm:justify-start max-sm:pl-3 items-center"
                    >
                      <input
                        type="radio"
                        name="forwarder_name"
                        id="Vova"
                        value="Vova"
                        checked={selectedForwarderNameOption === "Vova"}
                        onChange={(e) => handleForwarderNameRadioChange(e)}
                        className="mt-2 border-neutral-500 border rounded-md p-2"
                        placeholder="Enter Vova Here"
                      />
                      <p>Vova</p>
                    </label>
                    <label
                      htmlFor="Kaytee"
                      className="w-36 max-sm:text-[12px] gap-3 flex justify-center max-sm:justify-start max-sm:pl-3 items-center"
                    >
                      <input
                        type="radio"
                        name="forwarder_name"
                        id="Kaytee"
                        value="Kaytee"
                        checked={selectedForwarderNameOption === "Kaytee"}
                        onChange={(e) => handleForwarderNameRadioChange(e)}
                        className="mt-2 border-neutral-500 border rounded-md p-2"
                        placeholder="Enter Kaytee Here"
                      />
                      <p>Kaytee</p>
                    </label>
                  </div>
                </div>
                <div className="w-full h-auto flex flex-col p-3  max-sm:p-1  justify-center space-y-3 items-start">
                  <h3 className="text-md font-bold max-sm:text-xs">Message</h3>
                  <textarea
                    id="description"
                    name="description"
                    ref={refs.misc.descriptionRef}
                    className="mt-2 w-full h-[150px] max-sm:h-[120px] border-neutral-500 border rounded-md p-2"
                  />
                </div>
              </div>
            </div>
            {/* 2nd */}
            {/* Status Features */}
            <div className="statusFeatures w-full h-auto flex justify-center gap-5 flex-col">
              <div className="flex justify-between items-center p-6 max-sm:p-3 ">
                <h1 className="text-3xl font-bold  max-md:text-xl max-sm:text-lg">
                  Status
                </h1>
              </div>
              {/* Status Features */}
              <div className="card p-6 max-sm:p-0 max-sm:pt-2 flex  border-neutral-500 border rounded-md ">
                <div className="row flex flex-wrap m-2">
                  <div className="card-body grid grid-cols-3 max-lg:grid-cols-2 max-md:grid-cols-1 gap-3">
                    {statusFeatures.map((feature) => (
                      <div
                        key={feature.id}
                        className="col-md-4 mb-5 w-auto px-3  py-1"
                      >
                        <div className="form-check flex items-start ">
                          <input
                            className="form-check-input mt-2 mx-2"
                            type="checkbox"
                            name="selectedStatusFeatures[]"
                            value={feature.value}
                            id={feature.id}
                            checked={selectedStatusFeatures.includes(
                              feature.value
                            )}
                            onChange={() => toggleCheckbox(feature.value)}
                          />
                          <div>
                            <label
                              className="form-check-label text-sm font-bold text-gray-700"
                              htmlFor={feature.id}
                              onClick={() => toggleCheckbox(feature.value)}
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
            <div className=" w-full h-auto flex justify-center gap-5 flex-col">
              {/* Heading */}
              <div className="flex justify-between items-center p-6 max-sm:p-3 ">
                <h1 className="text-3xl font-bold  max-md:text-xl max-sm:text-lg">
                  Information
                </h1>
              </div>
              {/* Content */}
              <div className="p-6 max-sm:p-1 max-sm:pt-2 border-neutral-500 border rounded-md space-y-5 text-sm text-gray-600 w-full h-auto">
                {/* first content  */}
                <div className="w-full flex flex-col gap-5 p-3 max-sm:p-1 h-auto justify-between items-start">
                  <h3 className="text-md font-bold max-sm:text-xsmax-sm:text-xs">
                    Shipping Information Section
                  </h3>
                  {/* first input */}
                  <div className="w-full h-auto justify-start items-center flex gap-5 max-sm:text-xs">
                    <label
                      htmlFor="carrierName"
                      className="w-full gap-3 flex flex-col justify-center items-start max-sm:text-xs "
                    >
                      <p>Carrier</p>
                      <input
                        type="text"
                        id="carrierName"
                        name="carrier"
                        ref={refs.departure.carrierNameRef}
                        className={` border-neutral-500 border w-full rounded-md p-3 max-sm:p-2 ${
                          isActive && "border-orange-400"
                        }`}
                        placeholder=" Carrier Name "
                      />
                    </label>
                  </div>
                </div>

                {/* 2nd Content  */}
                <div className="w-full flex flex-col gap-5 p-3 max-sm:p-2 h-auto justify-between items-start max-sm:text-xs">
                  <h3 className="text-md font-bold max-sm:text-xsmax-sm:text-xs">
                    Departure Section
                  </h3>
                  {/* first input */}
                  <div className="w-full h-auto justify-start items-center flex gap-5 ">
                    <label
                      htmlFor="VesselName"
                      className="w-full gap-3 flex flex-col justify-center items-start max-sm:text-xs"
                    >
                      <p>Vessel</p>
                      <input
                        type="text"
                        id="VesselName"
                        ref={refs.departure.departureVesselRef}
                        className=" border-neutral-500 border w-full rounded-md p-3 max-sm:p-2"
                        placeholder=" Vessel Name "
                      />
                    </label>
                  </div>
                  {/* 2nd Inputs */}
                  <div className="w-full h-auto justify-start items-center grid grid-cols-2 max-md:grid-cols-1 gap-5 ">
                    <div className="flex flex-col w-full gap-2 h-auto">
                      <label
                        htmlFor="PartOfLoading"
                        className="w-full gap-3 flex flex-col justify-center items-start max-sm:text-xs "
                      >
                        <p>Part Of Loading</p>
                        <input
                          type="text"
                          id="PartOfLoading"
                          ref={refs.departure.departurePartsOfLandingRef}
                          className=" border-neutral-500 border w-full rounded-md p-3 max-sm:p-2"
                          placeholder=" Part Of Loading"
                        />
                      </label>
                    </div>
                    <div className="flex flex-col w-full gap-2 h-auto">
                      <label
                        htmlFor="ETD(Estimated Time of Departure)"
                        className="w-full gap-3 flex flex-col justify-center items-start max-sm:text-xs "
                      >
                        <p>ETD (Estimated Time of Departure)</p>
                        <input
                          type="date"
                          id="ETD(Estimated Time of Departure)"
                          ref={refs.departure.departureETDRef}
                          className=" border-neutral-500 border w-full rounded-md p-3 max-sm:p-2"
                          placeholder=" ETD (Estimated Time of Departure)"
                        />
                      </label>
                    </div>
                  </div>
                </div>

                {/* 3rd Content  */}
                <div className="w-full flex flex-col gap-5 p-3 h-auto justify-between items-start max-sm:p-2">
                  <h3 className="text-md font-bold max-sm:text-xsmax-sm:text-xs">
                    Arrival Section
                  </h3>
                  {/* first input */}
                  <div className="w-full h-auto justify-start items-center flex gap-5 ">
                    <label
                      htmlFor="VesselName"
                      className="w-full gap-3 flex flex-col justify-center items-start max-sm:text-xs"
                    >
                      <p>Vessel</p>
                      <input
                        type="text"
                        id="VesselName"
                        ref={refs.arrival.arrivalVesselRef}
                        className=" border-neutral-500 border w-full rounded-md p-3 max-sm:p-2"
                        placeholder=" Vessel Name "
                      />
                    </label>
                  </div>
                  {/* 2nd Inputs */}
                  <div className="w-full h-auto justify-start items-center grid grid-cols-2 gap-5 max-md:grid-cols-1">
                    <div className="flex flex-col w-full gap-2 h-auto">
                      <label
                        htmlFor="PartOfDischarge"
                        className="w-full gap-3 flex flex-col justify-center items-start max-sm:text-xs "
                      >
                        <p>Part Of Discharge</p>
                        <input
                          type="text"
                          id="PartOfDischarge"
                          ref={refs.arrival.arrivalPartOfDischargeRef}
                          className=" border-neutral-500 border w-full rounded-md p-3 max-sm:p-2"
                          placeholder=" Part Of Discharge  "
                        />
                      </label>
                    </div>
                    <div className="flex flex-col w-full gap-2 h-auto">
                      <label
                        htmlFor="ETD(Estimated Time of Departure)"
                        className="w-full gap-3 flex flex-col justify-center items-start max-sm:text-xs "
                      >
                        <p>ETD (Estimated Time of Departure)</p>
                        <input
                          type="date"
                          id="ETD(Estimated Time of Departure)"
                          ref={refs.arrival.arrivalETDRef}
                          className=" border-neutral-500 border w-full rounded-md p-3 max-sm:p-2"
                          placeholder=" ETD (Estimated Time of Departure)"
                        />
                      </label>
                    </div>
                  </div>
                </div>

                {/* 4th Content */}
                <div className="w-full flex flex-col gap-5 p-3 h-auto justify-between items-start max-sm:text-xs">
                  <h3 className="text-md font-bold max-sm:text-xs">
                    Document Section
                  </h3>
                  {/* first input */}
                  <div className="w-full h-auto justify-start items-center grid grid-cols-2 gap-5 max-md:grid-cols-1">
                    {/* First Image input */}
                    <div className="imageInpput max-sm:text-xs text-sm rounded-md w-full h-auto  ">
                      <div className="flex flex-col gap-2 ">
                        Upload B/L
                        <label htmlFor="B/L" className="w-full h-auto flex">
                          {/* Custom Button */}
                          <button
                            type="button"
                            className="bg-neutral-300 border-neutral-500 border  border-r-0 hover:bg-neutral-400 w-[120px] p-3 max-sm:p-2 rounded-bl-lg rounded-tl-lg shadow-md transition duration-300"
                          >
                            Upload File
                          </button>

                          {/* File Input */}
                          <input
                            type="file"
                            id="B/L"
                            name="bl"
                            accept="application/pdf"
                            onChange={(e) => handleBLFileChange(e)}
                            className="border-neutral-500 border rounded-br-lg p-3 max-sm:p-2 rounded-tr-lg w-[90%]"
                          />
                        </label>
                      </div>
                    </div>

                    {/* 2nd Image Input  */}
                    <div className="imageInpput max-sm:text-xs  text-sm rounded-md w-full h-auto  ">
                      <div className="flex flex-col gap-2 ">
                        Upload Inspection
                        <label
                          htmlFor="inspection"
                          className="w-full h-auto flex"
                        >
                          {/* Custom Button */}
                          <button
                            type="button"
                            className="bg-neutral-300  border border-neutral-500 border-r-0 hover:bg-neutral-400 w-[120px] p-3 max-sm:p-2 rounded-bl-lg rounded-tl-lg shadow-md transition duration-300"
                          >
                            Upload File
                          </button>

                          {/* File Input */}
                          <input
                            type="file"
                            id="inspection"
                            name="inspection"
                            accept="application/pdf"
                            onChange={(e) => handleInspectionFileChange(e)}
                            className="border-neutral-500 border rounded-br-lg p-3 rounded-tr-lg max-sm:p-2 w-[90%]"
                          />
                        </label>
                      </div>
                    </div>
                  </div>

                  {/* second input */}
                  <div className="w-full h-auto justify-start items-center grid grid-cols-2 gap-5 max-md:grid-cols-1">
                    {/* First Image input */}
                    <div className="imageInpput max-sm:text-xs  text-sm rounded-md w-full h-auto  ">
                      <div className="flex flex-col gap-2 ">
                        Upload Export Certificate
                        <label
                          htmlFor="certificate"
                          className="w-full h-auto flex"
                        >
                          {/* Custom Button */}
                          <button
                            type="button"
                            className="bg-neutral-300  border border-neutral-500 border-r-0 hover:bg-neutral-400 w-[120px] p-3 max-sm:p-2  rounded-bl-lg rounded-tl-lg shadow-md transition duration-300"
                          >
                            Upload File
                          </button>

                          {/* File Input */}
                          <input
                            type="file"
                            id="certificate"
                            name="export_certificate"
                            accept="application/pdf"
                            onChange={(e) => handleCertificateChange(e)}
                            className="border-neutral-500 border rounded-br-lg p-3 rounded-tr-lg max-sm:p-2 w-[90%]"
                          />
                        </label>
                      </div>
                    </div>

                    {/* 2nd Image Input  */}
                    <div className="imageInpput max-sm:text-xs  text-sm rounded-md w-full h-auto  ">
                      <div className="flex flex-col gap-2 ">
                        Upload English Export Certificate
                        <label
                          htmlFor="englishCertificate"
                          className="w-full h-auto flex"
                        >
                          {/* Custom Button */}
                          <button
                            type="button"
                            className="bg-neutral-300 border border-neutral-500 border-r-0 hover:bg-neutral-400 w-[120px] p-3 max-sm:p-2  rounded-bl-lg rounded-tl-lg shadow-md transition duration-300"
                          >
                            Upload File
                          </button>

                          {/* Hidden Input */}
                          <input
                            type="file"
                            id="englishCertificate"
                            name="english_export_certificate"
                            accept="application/pdf"
                            onChange={(e) => handleEnglishCertificateChange(e)}
                            className="border-neutral-500 border rounded-br-lg p-3 rounded-tr-lg max-sm:p-2 w-[90%]"
                          />
                        </label>
                      </div>
                    </div>
                  </div>
                  {/* third input */}
                  <div className="w-full h-auto justify-start items-center grid grid-cols-2 gap-5 max-md:grid-cols-1">
                    {/* First Image input */}
                    <div className="imageInpput max-sm:text-xs  text-sm rounded-md w-full h-auto  ">
                      <div className="flex flex-col gap-2 ">
                        Upload Invoice
                        <label htmlFor="invoice" className="w-full h-auto flex">
                          {/* Custom Button */}
                          <button
                            type="button"
                            className="bg-neutral-300 border border-neutral-500 border-r-0 hover:bg-neutral-400 w-[120px] p-3 max-sm:p-2  rounded-bl-lg rounded-tl-lg shadow-md transition duration-300"
                          >
                            Upload File
                          </button>

                          {/* Hidden Input */}
                          <input
                            type="file"
                            id="invoice"
                            name="invoice"
                            accept="application/pdf"
                            onChange={(e) => handleInvoiceChange(e)}
                            className="border-neutral-500 border rounded-br-lg p-3 rounded-tr-lg max-sm:p-2 w-[90%]"
                          />
                        </label>
                      </div>
                    </div>

                    {/* 2nd Image Input  */}
                    <div className="imageInpput max-sm:text-xs  text-sm rounded-md w-full h-auto  ">
                      <div className="flex flex-col gap-2 ">
                        <label
                          htmlFor="Enrollement"
                          className="w-full gap-3 flex flex-col justify-center items-start max-sm:text-xs "
                        >
                          <p> Enrollment</p>
                          <input
                            type="text"
                            id="Enrollement"
                            name="enrollment"
                            className=" border-neutral-500 border w-full rounded-md p-3 max-sm:p-2"
                            placeholder="Enrollment"
                            ref={refs.document.documentenrollementRef}
                          />
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* 4th */}
            {/* Document Details */}
            <div className=" w-full h-auto flex justify-center gap-5 flex-col">
              {/* Heading */}
              <div className="flex justify-between items-center p-6 max-sm:p-3 ">
                <h1 className="text-3xl font-bold  max-md:text-xl max-sm:text-lg">
                  Documents
                </h1>
              </div>
              <div className="p-6 max-sm:p-3 border-neutral-500 border rounded-md text-sm text-gray-600 w-full h-auto">
                <div className="w-full flex flex-col gap-5 p-3 max-sm:p-1 h-auto justify-between items-start max-sm:text-xs">
                  <h3 className="text-md font-bold max-sm:text-xs">
                    Document Delivery Address Section
                  </h3>

                  {/* First Content */}
                  <div className="w-full">
                    <label htmlFor="documentName" className="w-full">
                      <p>Name</p>
                      <input
                        type="text"
                        id="documentName"
                        name="doc_name"
                        ref={refs.document.documentNameRef}
                        className="mt-2 w-full border-neutral-500 border rounded-md p-2"
                        placeholder="Enter name Here"
                      />
                    </label>
                  </div>
                  {/* second Content */}
                  <div className="w-full h-auto justify-start items-center grid grid-cols-2 gap-5 max-md:grid-cols-1">
                    <div className="flex flex-col w-full gap-2 h-auto">
                      <label
                        htmlFor="documentAddress"
                        className="w-full gap-3 flex flex-col justify-center items-start max-sm:text-xs "
                      >
                        <p>Address</p>
                        <input
                          type="text"
                          id="documentAddress"
                          ref={refs.document.documentAddressRef}
                          className=" border-neutral-500 border w-full rounded-md p-3 max-sm:p-2"
                          placeholder=" Address"
                        />
                      </label>
                    </div>
                    <div className="flex flex-col w-full gap-2 h-auto">
                      <label
                        htmlFor="documentCity"
                        className="w-full gap-3 flex flex-col justify-center items-start max-sm:text-xs "
                      >
                        <p>City</p>
                        <input
                          type="text"
                          id="documentCity"
                          ref={refs.document.documentCityRef}
                          className=" border-neutral-500 border w-full rounded-md p-3 max-sm:p-2"
                          placeholder=" City"
                        />
                      </label>
                    </div>
                  </div>

                  {/* third Content */}
                  <div className="w-full h-auto justify-start items-center grid grid-cols-2 gap-5 max-md:grid-cols-1">
                    <div className="flex flex-col w-full gap-2 h-auto">
                      <label
                        htmlFor="documentCountry"
                        className="w-full gap-3 flex flex-col justify-center items-start max-sm:text-xs "
                      >
                        <p>Country</p>
                        <input
                          type="text"
                          id="documentCountry"
                          ref={refs.document.documentCountryRef}
                          className=" border-neutral-500 border w-full rounded-md p-3 max-sm:p-2"
                          placeholder=" Country"
                        />
                      </label>
                    </div>
                    <div className="flex flex-col w-full gap-2 h-auto">
                      <label
                        htmlFor="documentPhoneNumber1"
                        className="w-full gap-3 flex flex-col justify-center items-start max-sm:text-xs "
                      >
                        <p>Phone Number1</p>
                        <input
                          type="number"
                          id="documentPhoneNumber1"
                          ref={refs.document.documentPhoneNumber1Ref}
                          className=" border-neutral-500 border w-full rounded-md p-3 max-sm:p-2"
                          placeholder=" Phone Number1"
                        />
                      </label>
                    </div>
                  </div>

                  {/* Fourth Content */}
                  <div className="w-full h-auto justify-start items-center grid grid-cols-2 gap-5 max-md:grid-cols-1">
                    <div className="flex flex-col w-full gap-2 h-auto">
                      <label
                        htmlFor="documentPhoneNumber2"
                        className="w-full gap-3 flex flex-col justify-center items-start max-sm:text-xs "
                      >
                        <p>Phone Number2</p>
                        <input
                          type="number"
                          id="documentPhoneNumber2"
                          ref={refs.document.documentPhoneNumber2Ref}
                          className=" border-neutral-500 border w-full rounded-md p-3 max-sm:p-2"
                          placeholder=" Phone Number2"
                        />
                      </label>
                    </div>
                    <div className="flex flex-col w-full gap-2 h-auto">
                      <label
                        htmlFor="documentPhoneNumber3"
                        className="w-full gap-3 flex flex-col justify-center items-start max-sm:text-xs "
                      >
                        <p>Phone Number3</p>
                        <input
                          type="number"
                          id="documentPhoneNumber3"
                          ref={refs.document.documentPhoneNumber3Ref}
                          className=" border-neutral-500 border w-full rounded-md p-3 max-sm:p-2"
                          placeholder=" Phone Number3"
                        />
                      </label>
                    </div>
                  </div>

                  {/* Fifth Content */}
                  <div className="w-full h-auto justify-start items-center grid grid-cols-2 gap-5 max-md:grid-cols-1">
                    <div className="flex flex-col w-full gap-2 h-auto">
                      <label
                        htmlFor="documentFaxNumber"
                        className="w-full gap-3 flex flex-col justify-center items-start max-sm:text-xs "
                      >
                        <p>Fax Number</p>
                        <input
                          type="number"
                          id="documentFaxNumber"
                          ref={refs.document.documentFaxNumberRef}
                          className=" border-neutral-500 border w-full rounded-md p-3 max-sm:p-2"
                          placeholder=" Fax Number"
                        />
                      </label>
                    </div>
                    <div className="flex flex-col w-full gap-2 h-auto">
                      <label
                        htmlFor="documentCellPhoneNumber/Email"
                        className="w-full gap-3 flex flex-col justify-center items-start max-sm:text-xs "
                      >
                        <p>Cell Phone Number/Email</p>
                        <input
                          type="number"
                          id="documentCellPhoneNumber/Email"
                          ref={refs.document.documentCellPhoneNumberOREmailRef}
                          className=" border-neutral-500 border w-full rounded-md p-3 max-sm:p-2"
                          placeholder=" Cell Phone Number/Email"
                        />
                      </label>
                    </div>
                  </div>
                </div>

                {/* 2nd Input Section */}
                <div className="border-neutral-500 mt-3 rounded-md text-sm text-gray-600 w-full h-auto">
                  <div className="w-full flex flex-col gap-5 p-3 max-sm:p-1 h-auto justify-between items-start max-sm:text-xs">
                    <h3 className="text-md font-bold max-sm:text-xs">
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
                          ref={refs.document.documentTrackingNumberRef}
                          className="mt-2 w-full border-neutral-500 border rounded-md p-2"
                          placeholder="Tracking Number"
                        />
                      </label>
                    </div>
                  </div>
                </div>

                {/* 3rd Input Section */}
                <div className="border-neutral-500 mt-3 rounded-md text-sm text-gray-600 w-full h-auto">
                  <div className="w-full flex flex-col gap-5 p-3 max-sm:p-1 h-auto justify-between items-start max-sm:text-xs">
                    <h3 className="text-md font-bold max-sm:text-xs">
                      Document Center Section
                    </h3>

                    {/* First Content */}
                    <div className="w-full h-auto justify-start items-center grid grid-cols-2 gap-5 max-md:grid-cols-1">
                      <div className="flex flex-col w-full gap-2 h-auto">
                        <label
                          htmlFor="documentCenterName"
                          className="w-full gap-3 flex flex-col justify-center items-start max-sm:text-xs "
                        >
                          <p>Name</p>
                          <input
                            type="text"
                            id="documentCenterName"
                            ref={refs.documentCenter.documentCenterNameRef}
                            className=" border-neutral-500 border w-full rounded-md p-3 max-sm:p-2"
                            placeholder=" Name"
                          />
                        </label>
                      </div>
                      <div className="flex flex-col w-full gap-2 h-auto">
                        <label
                          htmlFor="documentCenterAddress"
                          className="w-full gap-3 flex flex-col justify-center items-start max-sm:text-xs "
                        >
                          <p>Address</p>
                          <input
                            type="text"
                            id="documentCenterAddress"
                            ref={refs.documentCenter.documentCenterAddressRef}
                            className=" border-neutral-500 border w-full rounded-md p-3 max-sm:p-2"
                            placeholder=" Address"
                          />
                        </label>
                      </div>
                    </div>
                    {/* second Content */}
                    <div className="w-full h-auto justify-start items-center grid grid-cols-2 gap-5 max-md:grid-cols-1">
                      <div className="flex flex-col w-full gap-2 h-auto">
                        <label
                          htmlFor="documentCenterCity"
                          className="w-full gap-3 flex flex-col justify-center items-start max-sm:text-xs "
                        >
                          <p>City</p>
                          <input
                            type="text"
                            id="documentCenterCity"
                            ref={refs.documentCenter.documentCenterCityRef}
                            className=" border-neutral-500 border w-full rounded-md p-3 max-sm:p-2"
                            placeholder=" City"
                          />
                        </label>
                      </div>
                      <div className="flex flex-col w-full gap-2 h-auto">
                        <label
                          htmlFor="documentCenterCountry"
                          className="w-full gap-3 flex flex-col justify-center items-start max-sm:text-xs "
                        >
                          <p>Country</p>
                          <input
                            type="text"
                            id="documentCenterCountry"
                            ref={refs.documentCenter.documentCenterCountryRef}
                            className=" border-neutral-500 border w-full rounded-md p-3 max-sm:p-2"
                            placeholder=" Country"
                          />
                        </label>
                      </div>
                    </div>

                    {/* third Content */}
                    <div className="w-full h-auto justify-start items-center grid grid-cols-2 gap-5 max-md:grid-cols-1">
                      <div className="flex flex-col w-full gap-2 h-auto">
                        <label
                          htmlFor="documentCenterPhoneNumber1"
                          className="w-full gap-3 flex flex-col justify-center items-start max-sm:text-xs "
                        >
                          <p>Phone Number1</p>
                          <input
                            type="text"
                            id="documentCenterPhoneNumber1"
                            ref={
                              refs.documentCenter.documentCenterPhoneNumber1Ref
                            }
                            className=" border-neutral-500 border w-full rounded-md p-3 max-sm:p-2"
                            placeholder=" Phone Number1"
                          />
                        </label>
                      </div>
                      <div className="flex flex-col w-full gap-2 h-auto">
                        <label
                          htmlFor="documentCenterPhoneNumber2"
                          className="w-full gap-3 flex flex-col justify-center items-start max-sm:text-xs "
                        >
                          <p>Phone Number2</p>
                          <input
                            type="number"
                            id="documentCenterPhoneNumber2"
                            ref={
                              refs.documentCenter.documentCenterPhoneNumber2Ref
                            }
                            className=" border-neutral-500 border w-full rounded-md p-3 max-sm:p-2"
                            placeholder=" Phone Number2"
                          />
                        </label>
                      </div>
                    </div>

                    {/* Fourth Content */}
                    <div className="w-full h-auto justify-start items-center grid grid-cols-2 gap-5 max-md:grid-cols-1">
                      <div className="flex flex-col w-full gap-2 h-auto">
                        <label
                          htmlFor="documentCenterPhoneNumber3"
                          className="w-full gap-3 flex flex-col justify-center items-start max-sm:text-xs "
                        >
                          <p>Phone Number3</p>
                          <input
                            type="number"
                            id="documentCenterPhoneNumber3"
                            ref={
                              refs.documentCenter.documentCenterPhoneNumber3Ref
                            }
                            className=" border-neutral-500 border w-full rounded-md p-3 max-sm:p-2"
                            placeholder=" Phone Number3"
                          />
                        </label>
                      </div>
                      <div className="flex flex-col w-full gap-2 h-auto">
                        <label
                          htmlFor="documentCenterEmail"
                          className="w-full gap-3 flex flex-col justify-center items-start max-sm:text-xs "
                        >
                          <p>Email</p>
                          <input
                            type="email"
                            id="documentCenterEmail"
                            ref={refs.documentCenter.documentCenterEmailRef}
                            className=" border-neutral-500 border w-full rounded-md p-3 max-sm:p-2"
                            placeholder=" Email"
                          />
                        </label>
                      </div>
                    </div>

                    {/* Fifth Content */}
                    <div className="w-full h-auto justify-start items-center grid grid-cols-2 gap-5 max-md:grid-cols-1">
                      <div className="flex flex-col w-full gap-2 h-auto">
                        <label
                          htmlFor="documentCenterUrl"
                          className="w-full gap-3 flex flex-col justify-center items-start max-sm:text-xs "
                        >
                          <p>Url</p>
                          <input
                            type="url"
                            id="documentCenterUrl"
                            ref={refs.documentCenter.documentCenterUrlRef}
                            className=" border-neutral-500 border w-full rounded-md p-3 max-sm:p-2"
                            placeholder=" Url"
                          />
                        </label>
                      </div>
                      <div className="flex flex-col w-full gap-2 h-auto">
                        <label
                          htmlFor="documentCenterOtherInformation"
                          className="w-full gap-3 flex flex-col justify-center items-start max-sm:text-xs "
                        >
                          <p>Other Information</p>
                          <input
                            type="number"
                            id="documentCenterOtherInformation"
                            ref={
                              refs.documentCenter
                                .documentCenterOtherInformationRef
                            }
                            className=" border-neutral-500 border w-full rounded-md p-3 max-sm:p-2"
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
              <div className="flex justify-between items-center p-6 max-sm:p-3 ">
                <h1 className="text-3xl font-bold max-md:text-xl  max-sm:text-[16px]">
                  Consignee/notify party of your request
                </h1>
              </div>
              <div className="p-6 max-sm:p-2 max-md:p-3 border-neutral-500 border rounded-md text-sm text-gray-600 w-full h-auto">
                <div className="w-full flex flex-col gap-5 p-3 max-sm:p-1 h-auto justify-between items-start max-sm:text-xs">
                  <h3 className="text-md font-bold max-sm:text-xs">
                    Consignee
                  </h3>

                  {/* First Content */}
                  <div className="w-full">
                    <label htmlFor="consigneeName" className="w-full">
                      <p>
                        Name<sup className="text-orange-700">*</sup>
                      </p>
                      <input
                        type="text"
                        id="consigneeName"
                        ref={refs.consignee.consigneeNameRef}
                        className="mt-2 w-full border-neutral-500 border rounded-md p-2"
                        placeholder="Enter name Here"
                      />
                    </label>
                  </div>
                  {/* second Content */}
                  <div className="w-full h-auto justify-start items-center grid grid-cols-2 gap-5 max-md:grid-cols-1">
                    <div className="flex flex-col w-full gap-2 h-auto">
                      <label
                        htmlFor="consigneeAddress"
                        className="w-full gap-3 flex flex-col justify-center items-start max-sm:text-xs "
                      >
                        <p>Address</p>
                        <input
                          type="text"
                          id="consigneeAddress"
                          ref={refs.consignee.consigneeAddressRef}
                          className=" border-neutral-500 border w-full rounded-md p-3 max-sm:p-2"
                          placeholder=" Address"
                        />
                      </label>
                    </div>
                    <div className="flex flex-col w-full gap-2 h-auto">
                      <label
                        htmlFor="consigneeCity"
                        className="w-full gap-3 flex flex-col justify-center items-start max-sm:text-xs "
                      >
                        <p>City</p>
                        <input
                          type="text"
                          id="consigneeCity"
                          ref={refs.consignee.consigneeCityRef}
                          className=" border-neutral-500 border w-full rounded-md p-3 max-sm:p-2"
                          placeholder=" City"
                        />
                      </label>
                    </div>
                  </div>

                  {/* third Content */}
                  <div className="w-full h-auto justify-start items-center grid grid-cols-2 gap-5 max-md:grid-cols-1">
                    <div className="flex flex-col w-full gap-2 h-auto">
                      <label
                        htmlFor="consigneeCountry"
                        className="w-full gap-3 flex flex-col justify-center items-start max-sm:text-xs "
                      >
                        <p>Country</p>
                        <input
                          type="text"
                          id="consigneeCountry"
                          ref={refs.consignee.consigneeCountryRef}
                          className=" border-neutral-500 border w-full rounded-md p-3 max-sm:p-2"
                          placeholder=" Country"
                        />
                      </label>
                    </div>
                    <div className="flex flex-col w-full gap-2 h-auto">
                      <label
                        htmlFor="consigneePhoneNumber1"
                        className="w-full gap-3 flex flex-col justify-center items-start max-sm:text-xs "
                      >
                        <p>Phone Number1</p>
                        <input
                          type="number"
                          id="consigneePhoneNumber1"
                          ref={refs.consignee.consigneePhoneNumber1Ref}
                          className=" border-neutral-500 border w-full rounded-md p-3 max-sm:p-2"
                          placeholder=" Phone Number1"
                        />
                      </label>
                    </div>
                  </div>

                  {/* Fourth Content */}
                  <div className="w-full h-auto justify-start items-center grid grid-cols-2 gap-5 max-md:grid-cols-1">
                    <div className="flex flex-col w-full gap-2 h-auto">
                      <label
                        htmlFor="consigneePhoneNumber2"
                        className="w-full gap-3 flex flex-col justify-center items-start max-sm:text-xs "
                      >
                        <p>Phone Number2</p>
                        <input
                          type="number"
                          id="consigneePhoneNumber2"
                          ref={refs.consignee.consigneePhoneNumber2Ref}
                          className=" border-neutral-500 border w-full rounded-md p-3 max-sm:p-2"
                          placeholder=" Phone Number2"
                        />
                      </label>
                    </div>
                    <div className="flex flex-col w-full gap-2 h-auto">
                      <label
                        htmlFor="consigneePhoneNumber3"
                        className="w-full gap-3 flex flex-col justify-center items-start max-sm:text-xs "
                      >
                        <p>Phone Number3</p>
                        <input
                          type="number"
                          id="consigneePhoneNumber3"
                          ref={refs.consignee.consigneePhoneNumber3Ref}
                          className=" border-neutral-500 border w-full rounded-md p-3 max-sm:p-2"
                          placeholder=" Phone Number3"
                        />
                      </label>
                    </div>
                  </div>

                  {/* Fifth Content */}
                  <div className="w-full h-auto justify-start items-center grid grid-cols-2 gap-5 max-md:grid-cols-1">
                    <div className="flex flex-col w-full gap-2 h-auto">
                      <label
                        htmlFor="consigneeFaxNumber"
                        className="w-full gap-3 flex flex-col justify-center items-start max-sm:text-xs "
                      >
                        <p>Fax Number</p>
                        <input
                          type="number"
                          id="consigneeFaxNumber"
                          ref={refs.consignee.consigneeFaxNumberRef}
                          className=" border-neutral-500 border w-full rounded-md p-3 max-sm:p-2"
                          placeholder=" Fax Number"
                        />
                      </label>
                    </div>
                    <div className="flex flex-col w-full gap-2 h-auto">
                      <label
                        htmlFor="consigneeCellPhoneNumber/Email"
                        className="w-full gap-3 flex flex-col justify-center items-start max-sm:text-xs "
                      >
                        <p>Cell Phone Number/Email</p>
                        <input
                          type="number"
                          id="consigneeCellPhoneNumber/Email"
                          ref={
                            refs.consignee.consigneeCellPhoneNumberOREmailRef
                          }
                          className=" border-neutral-500 border w-full rounded-md p-3 max-sm:p-2"
                          placeholder=" Cell Phone Number/Email"
                        />
                      </label>
                    </div>
                  </div>
                </div>
                {/* 2nd Inputs */}
                <div className="w-full flex flex-col gap-5 p-3 max-sm:p-2 mt-3 h-auto justify-between items-start max-sm:text-xs">
                  <h3 className="text-md font-bold max-sm:text-xs">
                    Notify Party
                  </h3>

                  {/* First Content */}
                  <div className="w-full">
                    <label htmlFor="notifyPartyName" className="w-full">
                      <p>
                        Name<sup className="text-orange-700">*</sup>
                      </p>
                      <input
                        type="text"
                        id="notifyPartyName"
                        ref={refs.notifyParty.notifyPartyNameRef}
                        className="mt-2 w-full border-neutral-500 border rounded-md p-2"
                        placeholder="Enter name Here"
                      />
                    </label>
                  </div>
                  {/* second Content */}
                  <div className="w-full h-auto justify-start items-center grid grid-cols-2 gap-5 max-md:grid-cols-1">
                    <div className="flex flex-col w-full gap-2 h-auto">
                      <label
                        htmlFor="notifyPartyAddress"
                        className="w-full gap-3 flex flex-col justify-center items-start max-sm:text-xs "
                      >
                        <p>Address</p>
                        <input
                          type="text"
                          id="notifyPartyAddress"
                          ref={refs.notifyParty.notifyPartyAddressRef}
                          className=" border-neutral-500 border w-full rounded-md p-3 max-sm:p-2"
                          placeholder=" Address"
                        />
                      </label>
                    </div>
                    <div className="flex flex-col w-full gap-2 h-auto">
                      <label
                        htmlFor="notifyPartyCity"
                        className="w-full gap-3 flex flex-col justify-center items-start max-sm:text-xs "
                      >
                        <p>City</p>
                        <input
                          type="text"
                          id="notifyPartyCity"
                          ref={refs.notifyParty.notifyPartyCityRef}
                          className=" border-neutral-500 border w-full rounded-md p-3 max-sm:p-2"
                          placeholder=" City"
                        />
                      </label>
                    </div>
                  </div>

                  {/* third Content */}
                  <div className="w-full h-auto justify-start items-center grid grid-cols-2 gap-5 max-md:grid-cols-1">
                    <div className="flex flex-col w-full gap-2 h-auto">
                      <label
                        htmlFor="notifyPartyCountry"
                        className="w-full gap-3 flex flex-col justify-center items-start max-sm:text-xs "
                      >
                        <p>Country</p>
                        <input
                          type="text"
                          id="notifyPartyCountry"
                          ref={refs.notifyParty.notifyPartyCountryRef}
                          className=" border-neutral-500 border w-full rounded-md p-3 max-sm:p-2"
                          placeholder=" Country"
                        />
                      </label>
                    </div>
                    <div className="flex flex-col w-full gap-2 h-auto">
                      <label
                        htmlFor="notifyPartyPhoneNumber1"
                        className="w-full gap-3 flex flex-col justify-center items-start max-sm:text-xs "
                      >
                        <p>Phone Number1</p>
                        <input
                          type="number"
                          id="notifyPartyPhoneNumber1"
                          ref={refs.notifyParty.notifyPartyPhoneNumber1Ref}
                          className=" border-neutral-500 border w-full rounded-md p-3 max-sm:p-2"
                          placeholder=" Phone Number1"
                        />
                      </label>
                    </div>
                  </div>

                  {/* Fourth Content */}
                  <div className="w-full h-auto justify-start items-center grid grid-cols-2 gap-5 max-md:grid-cols-1">
                    <div className="flex flex-col w-full gap-2 h-auto">
                      <label
                        htmlFor="notifyPartyPhoneNumber2"
                        className="w-full gap-3 flex flex-col justify-center items-start max-sm:text-xs "
                      >
                        <p>Phone Number2</p>
                        <input
                          type="number"
                          id="notifyPartyPhoneNumber2"
                          ref={refs.notifyParty.notifyPartyPhoneNumber2Ref}
                          className=" border-neutral-500 border w-full rounded-md p-3 max-sm:p-2"
                          placeholder=" Phone Number2"
                        />
                      </label>
                    </div>
                    <div className="flex flex-col w-full gap-2 h-auto">
                      <label
                        htmlFor="notifyPartyPhoneNumber3"
                        className="w-full gap-3 flex flex-col justify-center items-start max-sm:text-xs "
                      >
                        <p>Phone Number3</p>
                        <input
                          type="number"
                          id="notifyPartyPhoneNumber3"
                          ref={refs.notifyParty.notifyPartyPhoneNumber3Ref}
                          className=" border-neutral-500 border w-full rounded-md p-3 max-sm:p-2"
                          placeholder=" Phone Number3"
                        />
                      </label>
                    </div>
                  </div>

                  {/* Fifth Content */}
                  <div className="w-full h-auto justify-start items-center grid grid-cols-2 gap-5 max-md:grid-cols-1">
                    <div className="flex flex-col w-full gap-2 h-auto">
                      <label
                        htmlFor="notifyPartyFaxNumber"
                        className="w-full gap-3 flex flex-col justify-center items-start max-sm:text-xs "
                      >
                        <p>Fax Number</p>
                        <input
                          type="number"
                          id="notifyPartyFaxNumber"
                          ref={refs.notifyParty.notifyPartyFaxNumberRef}
                          className=" border-neutral-500 border w-full rounded-md p-3 max-sm:p-2"
                          placeholder=" Fax Number"
                        />
                      </label>
                    </div>
                    <div className="flex flex-col w-full gap-2 h-auto">
                      <label
                        htmlFor="notifyPartyCellPhoneNumber/Email"
                        className="w-full gap-3 flex flex-col justify-center items-start max-sm:text-xs "
                      >
                        <p>Cell Phone Number/Email</p>
                        <input
                          type="number"
                          id="notifyPartyCellPhoneNumber/Email"
                          ref={
                            refs.notifyParty
                              .notifyPartyCellPhoneNumberOREmailRef
                          }
                          className=" border-neutral-500 border w-full rounded-md p-3 max-sm:p-2"
                          placeholder=" Cell Phone Number/Email"
                        />
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* 6th */}
            {/* Purchased Product */}
            <div className=" w-full h-auto flex justify-center gap-5 flex-col">
              {/* Heading */}
              <div className="flex justify-between items-center p-6 max-sm:p-3 ">
                <h1 className="text-3xl font-bold  max-md:text-xl max-sm:text-md ">
                  Purchased Product
                </h1>
              </div>
              <div className="p-6 max-sm:p-3 border-neutral-500 border rounded-md text-sm text-gray-600 w-full h-auto">
                <div className="w-full flex flex-col gap-5 p-3 max-sm:p-1 mt-2 h-auto justify-between items-start max-sm:text-xs">
                  {/* First Content */}
                  <div className="w-full">
                    <label htmlFor="notifyPartyProductName" className="w-full">
                      <p>
                        Product Name<sup className="text-orange-700">*</sup>
                      </p>
                      <input
                        type="text"
                        id="notifyPartyProductName"
                        name="product_name"
                        ref={refs.notifyParty.notifyPartyProductNameRef}
                        className="mt-2 w-full border-neutral-500 border rounded-md p-2"
                        placeholder="Enter Product Name Here"
                      />
                    </label>
                  </div>
                  {/* second Content */}
                  <div className="w-full h-auto justify-start items-center grid grid-cols-2 gap-5 max-md:grid-cols-1">
                    <div className="flex flex-col w-full gap-2 h-auto">
                      <label
                        htmlFor="notifyPartyReferenceNo"
                        className="w-full gap-3 flex flex-col justify-center items-start max-sm:text-xs "
                      >
                        <p>Reference No</p>
                        <input
                          type="text"
                          id="notifyPartyReferenceNo"
                          name="reference_no"
                          ref={refs.notifyParty.notifyPartyReferenceNoRef}
                          className=" border-neutral-500 border w-full rounded-md p-3 max-sm:p-2"
                          placeholder=" Reference No"
                        />
                      </label>
                    </div>
                    <div className="flex flex-col w-full gap-2 h-auto">
                      <label
                        htmlFor="notifyPartyMileage"
                        className="w-full gap-3 flex flex-col justify-center items-start max-sm:text-xs "
                      >
                        <p>Mileage</p>
                        <input
                          type="text"
                          id="notifyPartyMileage"
                          name="mileage"
                          ref={refs.notifyParty.notifyPartyMileageRef}
                          className=" border-neutral-500 border w-full rounded-md p-3 max-sm:p-2"
                          placeholder=" Mileage"
                        />
                      </label>
                    </div>
                  </div>

                  {/* third Content */}
                  <div className="w-full h-auto justify-start items-center grid grid-cols-2 gap-5 max-md:grid-cols-1">
                    <div className="flex flex-col w-full gap-2 h-auto">
                      <label
                        htmlFor="notifyPartyModelCode"
                        className="w-full gap-3 flex flex-col justify-center items-start max-sm:text-xs "
                      >
                        <p>Model Code</p>
                        <input
                          type="text"
                          id="notifyPartyModelCode"
                          name="modelCode"
                          ref={refs.notifyParty.notifyPartyModelCodeRef}
                          className=" border-neutral-500 border w-full rounded-md p-3 max-sm:p-2"
                          placeholder=" Model Code"
                        />
                      </label>
                    </div>
                    <div className="flex flex-col w-full gap-2 h-auto">
                      <label
                        htmlFor="notifyPartyRegistrationYear/Month"
                        className="w-full gap-3 flex flex-col justify-center items-start max-sm:text-xs "
                      >
                        <p>Registration Year/Month</p>
                        <input
                          type="text"
                          id="notifyPartyRegistrationYear/Month"
                          name="registeration_year_month"
                          ref={
                            refs.notifyParty
                              .notifyPartyRegistrationYearORMonthRef
                          }
                          className={` border-neutral-500 border w-full rounded-md p-3 max-sm:p-2`}
                          placeholder=" Registration Year/Month"
                        />
                      </label>
                    </div>
                  </div>

                  {/* Fourth Content */}
                  <div className="w-full h-auto justify-start items-center grid grid-cols-2 gap-5 max-md:grid-cols-1">
                    <div className="flex flex-col w-full gap-2 h-auto">
                      <label
                        htmlFor="manufactureYear/Month"
                        className="w-full gap-3 flex flex-col justify-center items-start max-sm:text-xs "
                      >
                        <p>Manufacture Year/Month</p>
                        <input
                          type="text"
                          id="manufactureYear/Month"
                          name="manufacture_year_month"
                          ref={refs.notifyParty.manufactureYearORMonthRef}
                          className={`border-neutral-500 border w-full rounded-md p-3 max-sm:p-2 ${
                            isActive && "border-orange-400"
                          }`}
                          placeholder=" Manufacture Year/Month"
                        />
                      </label>
                    </div>
                    <div className="flex flex-col w-full gap-2 h-auto">
                      <label
                        htmlFor="notifyPartyModelGrade"
                        className="w-full gap-3 flex flex-col justify-center items-start max-sm:text-xs "
                      >
                        <p>Model Grade</p>
                        <input
                          type="text"
                          id="notifyPartyModelGrade"
                          name="modelGrade"
                          ref={refs.notifyParty.notifyPartyModelGradeRef}
                          className=" border-neutral-500 border w-full rounded-md p-3 max-sm:p-2"
                          placeholder=" Model Grade"
                        />
                      </label>
                    </div>
                  </div>

                  {/* Fifth Content */}
                  <div className="w-full h-auto justify-start items-center grid grid-cols-2 gap-5 max-md:grid-cols-1">
                    <div className="flex flex-col w-full gap-2 h-auto">
                      <label
                        htmlFor="notifyPartyChassis#"
                        className="w-full gap-3 flex flex-col justify-center items-start max-sm:text-xs "
                      >
                        <p>Chassis #</p>
                        <input
                          type="text"
                          id="notifyPartyChassis#"
                          ref={refs.notifyParty.notifyPartyChassisRef}
                          className=" border-neutral-500 border w-full rounded-md p-3 max-sm:p-2"
                          placeholder=" Chassis #"
                        />
                      </label>
                    </div>
                    <div className="flex flex-col w-full gap-2 h-auto">
                      <label
                        htmlFor="notifyPartyEngineSize"
                        className="w-full gap-3 flex flex-col justify-center items-start max-sm:text-xs "
                      >
                        <p>Engine Size</p>
                        <input
                          type="number"
                          id="notifyPartyEngineSize"
                          ref={refs.notifyParty.notifyPartyEngineSizeRef}
                          className=" border-neutral-500 border w-full rounded-md p-3 max-sm:p-2"
                          placeholder=" Engine Size"
                        />
                      </label>
                    </div>
                  </div>

                  {/* Sixth Content */}
                  <div className="w-full h-auto justify-start items-center grid grid-cols-2 gap-5 max-md:grid-cols-1">
                    <div className="flex flex-col w-full gap-2 h-auto">
                      <label
                        htmlFor="notifyPartyDrive"
                        className="w-full gap-3 flex flex-col justify-center items-start max-sm:text-xs "
                      >
                        <p>Drive</p>
                        <input
                          type="text"
                          id="notifyPartyDrive"
                          ref={refs.notifyParty.notifyPartyDriveRef}
                          className=" border-neutral-500 border w-full rounded-md p-3 max-sm:p-2"
                          placeholder=" Drive"
                        />
                      </label>
                    </div>
                    <div className="flex flex-col w-full gap-2 h-auto">
                      <label
                        htmlFor="notifyPartyExtColor"
                        className="w-full gap-3 flex flex-col justify-center items-start max-sm:text-xs "
                      >
                        <p>Ext. Color</p>
                        <input
                          type="number"
                          id="notifyPartyExtColor"
                          ref={refs.notifyParty.notifyPartyExtColorRef}
                          className=" border-neutral-500 border w-full rounded-md p-3 max-sm:p-2"
                          placeholder=" Ext. Color"
                        />
                      </label>
                    </div>
                  </div>

                  {/* Seventh Content */}
                  <div className="w-full h-auto justify-start items-center grid grid-cols-2 gap-5 max-md:grid-cols-1">
                    <div className="flex flex-col w-full gap-2 h-auto">
                      <label htmlFor="notifyPartySteering" className="w-full">
                        <p>
                          Steering <sup className="text-orange-700">*</sup>
                        </p>
                        <select
                          id="notifyPartySteering"
                          className="appearance-none mt-2 w-full border-neutral-500 border rounded-md p-2 outline-0 text-gray-400 "
                          placeholder="Select Steering"
                          ref={refs.notifyParty.notifyPartySteeringRef}
                        >
                          <option
                            value=""
                            selected
                            disabled
                            className="appearance-none active:bg-neutral-400 active:text-neutral-500 hover:bg-neutral-400 hover:text-neutral-500 p-2"
                          >
                            Select Steering
                          </option>
                          <option
                            value="Right"
                            className="appearance-none active:bg-neutral-400 active:text-neutral-500 hover:bg-neutral-400 hover:text-neutral-500  focus:bg-neutral-400 focus:text-neutral-500 text-neutral-800 bg-white p-2"
                          >
                            Right
                          </option>
                          <option
                            value="Left"
                            className="appearance-none active:bg-neutral-400 active:text-neutral-500 hover:bg-neutral-400 hover:text-neutral-500 focus:bg-neutral-400 focus:text-neutral-500 text-neutral-800 bg-white p-2"
                          >
                            Left
                          </option>
                        </select>
                      </label>
                    </div>
                    <div className="flex flex-col w-full gap-2 h-auto">
                      <label
                        htmlFor="notifyPartytransmission"
                        className="w-full"
                      >
                        <p>Select Transmission</p>
                        <select
                          id="notifyPartytransmission"
                          className="appearance-none mt-2 w-full border-neutral-500 border rounded-md p-2 outline-0 text-gray-400 "
                          placeholder="Select transmission"
                          ref={refs.notifyParty.notifyPartytransmissionRef}
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
                  </div>
                  {/* Eighth Content */}
                  <div className="w-full h-auto justify-start items-center grid grid-cols-2 gap-5 max-md:grid-cols-1">
                    <div className="flex flex-col w-full gap-2 h-auto">
                      <label
                        htmlFor="notifyPartyFuel"
                        className="w-full gap-3 flex flex-col justify-center items-start max-sm:text-xs "
                      >
                        <p>Fuel</p>
                        <input
                          type="text"
                          id="notifyPartyFuel"
                          ref={refs.notifyParty.notifyPartyFuelRef}
                          className=" border-neutral-500 border w-full rounded-md p-3 max-sm:p-2"
                          placeholder=" Fuel"
                        />
                      </label>
                    </div>
                    <div className="flex flex-col w-full gap-2 h-auto">
                      <label
                        htmlFor="notifyPartySeats"
                        className="w-full gap-3 flex flex-col justify-center items-start max-sm:text-xs "
                      >
                        <p>Seats</p>
                        <input
                          type="number"
                          id="notifyPartySeats"
                          ref={refs.notifyParty.notifyPartySeatsRef}
                          className=" border-neutral-500 border w-full rounded-md p-3 max-sm:p-2"
                          placeholder=" Seats"
                        />
                      </label>
                    </div>
                  </div>

                  {/* Ninth Content */}
                  <div className="w-full h-auto justify-start items-center grid grid-cols-2 gap-5 max-md:grid-cols-1">
                    <div className="flex flex-col w-full gap-2 h-auto">
                      <label
                        htmlFor="notifyPartyDoor"
                        className="w-full gap-3 flex flex-col justify-center items-start max-sm:text-xs "
                      >
                        <p>Door</p>
                        <select
                          id="notifyPartyDoor"
                          className=" border-neutral-500 border w-full rounded-md p-3 max-sm:p-2"
                          placeholder="Select Doors"
                          ref={refs.notifyParty.notifyPartyDoorRef}
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
                            value="2"
                            className="appearance-none active:bg-neutral-400 active:text-neutral-500 hover:bg-neutral-400 hover:text-neutral-500  focus:bg-neutral-400 focus:text-neutral-500 text-neutral-800 bg-white p-2"
                          >
                            2 Doors
                          </option>
                          <option
                            value="3"
                            className="appearance-none active:bg-neutral-400 active:text-neutral-500 hover:bg-neutral-400 hover:text-neutral-500 focus:bg-neutral-400 focus:text-neutral-500 text-neutral-800 bg-white p-2"
                          >
                            3-Door
                          </option>
                          <option
                            value="4"
                            className="appearance-none active:bg-neutral-400 active:text-neutral-500 hover:bg-neutral-400 hover:text-neutral-500 focus:bg-neutral-400 focus:text-neutral-500 text-neutral-800 bg-white p-2"
                          >
                            4-Door
                          </option>
                          <option
                            value="5"
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
                    <div className="flex flex-col w-full gap-2 h-auto">
                      <label
                        htmlFor="notifyPartyEngineNo"
                        className="w-full gap-3 flex flex-col justify-center items-start max-sm:text-xs "
                      >
                        <p>Engine No.</p>
                        <input
                          type="number"
                          id="notifyPartyEngineNo"
                          ref={refs.notifyParty.notifyPartyEngineNoRef}
                          className=" border-neutral-500 border w-full rounded-md p-3 max-sm:p-2"
                          placeholder=" Engine No."
                        />
                      </label>
                    </div>
                  </div>
                </div>

                {/* Products Features */}
                <div className="productFeatures w-full h-auto flex justify-center gap-5 my-3 flex-col">
                  <div className="flex justify-between items-center p-6 max-md:p-0 ">
                    <h1 className="text-3xl font-bold max-md:text-xl max-sm:text-md">
                      Option
                    </h1>
                  </div>
                  {/* Status Features */}
                  <div className="card p-6  max-md:p-0 flex  border-neutral-500 rounded-md ">
                    <div className="row flex flex-wrap m-2 max-md:m-0">
                      <div className="card-body grid grid-cols-3 max-md:grid-cols-2 max-sm:grid-cols-1 gap-2">
                        {optionFeatures.map((feature) => (
                          <div
                            key={feature.id}
                            className="col-md-4 mb-3 max-md:mb-2 max-sm:mb-1 w-auto px-3 py-1"
                          >
                            <div className="form-check flex items-start ">
                              <input
                                className="form-check-input mt-2 max-sm:mt-0 mx-2 max-sm:mx-1"
                                type="checkbox"
                                name="selectedOptionFeatures[]"
                                value={feature.value}
                                id={feature.id}
                                checked={selectedOptionFeatures.includes(
                                  feature.value
                                )}
                                onChange={() =>
                                  toggleOptionCheckbox(feature.value)
                                }
                              />
                              <div>
                                <label
                                  className="form-check-label text-sm font-bold text-gray-700"
                                  htmlFor={feature.id}
                                  onClick={() =>
                                    toggleOptionCheckbox(feature.value)
                                  }
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

                {/* 4th Content */}
                <div className="w-full flex flex-col gap-5 p-3 h-auto justify-between items-start max-sm:p-2">
                  {/* first input */}
                  <div className="w-full h-auto justify-start items-center flex flex-col gap-5 ">
                    {/* First Image input */}
                    <div className="imageInpput text-sm rounded-md w-full h-auto  ">
                      <div className="flex flex-col gap-2 max-sm:text-xs">
                        Upload Featured Image
                        <label
                          htmlFor="productFeatureImage"
                          className="w-full h-auto flex"
                        >
                          {/* Custom Button */}
                          <button
                            type="button"
                            className={`bg-neutral-300 border border-neutral-500 border-r-0 hover:bg-neutral-400 w-[120px] p-3 max-sm:p-2  rounded-bl-lg rounded-tl-lg shadow-md transition duration-300 ${
                              isActive && "border-orange-400"
                            }`}
                          >
                            Upload File
                          </button>

                          {/* Hidden Input */}
                          <input
                            type="file"
                            required
                            id="productFeatureImage"
                            name="featured_image"
                            onChange={(e) =>
                              handleProductionFeaturedImageChange(e)
                            }
                            className={`border-neutral-500 border rounded-br-lg p-3 rounded-tr-lg max-sm:p-2 w-[90%] ${
                              isActive && "border-orange-400"
                            }`}
                          />
                        </label>
                      </div>
                    </div>

                    {/* 2nd Image Input  */}
                    <div className="imageInpput  text-sm rounded-md w-full h-auto">
                      <div className="flex flex-col gap-2 max-sm:text-xs">
                        Upload Image
                        <label
                          htmlFor="productImage"
                          className="w-full h-auto flex"
                        >
                          {/* Custom Button */}
                          <button
                            type="button"
                            className={`bg-neutral-300 border border-neutral-500 border-r-0 hover:bg-neutral-400 w-[120px] p-3 max-sm:p-2  rounded-bl-lg rounded-tl-lg shadow-md transition duration-300 ${
                              isActive && "border-orange-400"
                            }`}
                          >
                            Upload File
                          </button>

                          {/* Hidden Input */}
                          <input
                            type="file"
                            id="productImage"
                            required
                            multiple
                            onChange={handleProductImageChange}
                            className={` border-neutral-500 border rounded-br-lg p-3 rounded-tr-lg max-sm:p-2 w-[90%] ${
                              isActive && "border-orange-400"
                            }`}
                          />
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </form>

          <div className="button w-full flex justify-start items-center p-6 max-sm:p-3">
            <button
              className="bg-orange-400 text-white px-4 max-sm:text-sm  max-sm:w-[95%] max-sm:mx-auto py-2 rounded-lg cursor-pointer"
              onClick={GenerateCapLinks}
            >
              Add Cap Link
            </button>
          </div>
        </div>

        <div className="w-full h-[150px] ">
          <Copyright />
        </div>
      </div>
    </div>
  );
};

export default GenerateCapLinksForm;
