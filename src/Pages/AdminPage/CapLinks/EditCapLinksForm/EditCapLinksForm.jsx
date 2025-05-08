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
  const [isActive, setIsActive] = useState(false);
  const [loading, setLoading] = useState(false);
  const [capLink, setCapLink] = useState([]);
  const [consigneeData, setConsigneeData] = useState([]);
  const [productImagesData, setProductImagesData] = useState([]);
  const [productInfo, setProductInfo] = useState([]);
  const [documentInfo, setDocumentInfo] = useState([]);
  const [shippingInfo, setShippingInfo] = useState([]);
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

  // Fetch car data on mount
  useEffect(() => {
    const fetchCapLink = async () => {
      try {
        const res = await axios.get(
          `http://localhost:5000/api/cap/getbyid/${capLinkEditId}`
        );
        const data = res.data?.data;
        setCapLink(data);
        setLoading(false);
      } catch (err) {
        console.error(err);
      }
    };
    fetchCapLink();
  }, [capLinkEditId]);

  useEffect(() => {
    const fetchConsignee = async () => {
      try {
        const res = await axios.get(
          `http://localhost:5000/api/consigneeNotifyPartyInformation/getbyid/${capLinkEditId}`
        );
        const data = res.data?.data;
        setConsigneeData(data);

        setLoading(false);
      } catch (err) {
        console.error(err);
      }
    };
    fetchConsignee();
  }, [capLinkEditId]);

  useEffect(() => {
    const fetchproductImages = async () => {
      try {
        const res = await axios.get(
          `http://localhost:5000/api/productImage/getbyid/${capLinkEditId}`
        );
        const data = res.data?.data;
        setProductImagesData(data);

        setLoading(false);
      } catch (err) {
        console.error(err);
      }
    };
    fetchproductImages();
  }, [capLinkEditId]);

  useEffect(() => {
    const fetchproductInfo = async () => {
      try {
        const res = await axios.get(
          `http://localhost:5000/api/productInformation/getbyid/${capLinkEditId}`
        );
        const data = res.data?.data;
        setProductInfo(data);

        setLoading(false);
      } catch (err) {
        console.error(err);
      }
    };
    fetchproductInfo();
  }, [capLinkEditId]);

  useEffect(() => {
    const fetchDocumentInfo = async () => {
      try {
        const res = await axios.get(
          `http://localhost:5000/api/documentInformation/getbyid/${capLinkEditId}`
        );
        const data = res.data?.data;
        setDocumentInfo(data);

        setLoading(false);
      } catch (err) {
        console.error(err);
      }
    };
    fetchDocumentInfo();
  }, [capLinkEditId]);

  useEffect(() => {
    const fetchShippingInfo = async () => {
      try {
        const res = await axios.get(
          `http://localhost:5000/api/shippingInformation/getbyid/${capLinkEditId}`
        );
        const data = res.data?.data;
        setShippingInfo(data);

        setLoading(false);
      } catch (err) {
        console.error(err);
      }
    };
    fetchShippingInfo();
  }, [capLinkEditId]);

  let featuresArray = [];
  useEffect(() => {
    if (productInfo) {
      // If productInfo.features exists
      if (Array.isArray(productInfo?.options)) {
        featuresArray = productInfo?.options;
      } else if (typeof productInfo?.options === "string") {
        featuresArray = productInfo?.options.split(",");
      } else {
        featuresArray = []; // Default fallback if null or unexpected type
      }

      // Set Call All Features
      setselectedOptionFeatures(featuresArray);
    }
  }, [productInfo]);

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

  // useEffect(() => {
  //   if (capLink?.optionFeatures?.length > 0) {
  //     const parsedOptions = capLink.optionFeatures[0]
  //       .split(",")
  //       .map((item) => item.trim());
  //     setselectedOptionFeatures(parsedOptions);
  //   }
  // }, [capLink]);

  const notifyInputData = [
    {
      label: "Name",
      id: "notifyPartyNameRef",
      value: consigneeData.notifyParty_name,
      onChange: (e) =>
        setConsigneeData({
          ...consigneeData,
          notifyParty_name: e.target.value,
        }),
    },
    {
      label: "Address",
      id: "notifyPartyAddressRef",
      value: consigneeData.notifyParty_address,
      onChange: (e) =>
        setConsigneeData({
          ...consigneeData,
          notifyParty_address: e.target.value,
        }),
    },
    {
      label: "City",
      id: "notifyPartyCityRef",
      value: consigneeData.notifyParty_city,
      onChange: (e) =>
        setConsigneeData({
          ...consigneeData,
          notifyParty_city: e.target.value,
        }),
    },
    {
      label: "Country",
      id: "notifyPartyCountryRef",
      value: consigneeData.notifyParty_country,
      onChange: (e) =>
        setConsigneeData({
          ...consigneeData,
          notifyParty_country: e.target.value,
        }),
    },
    {
      label: "Phone Number1",
      id: "notifyPartyPhoneNumber1Ref",
      value: consigneeData.notifyParty_phone1,
      onChange: (e) =>
        setConsigneeData({
          ...consigneeData,
          notifyParty_phone1: e.target.value,
        }),
    },
    {
      label: "Phone Number2",
      id: "notifyPartyPhoneNumber2Ref",
      value: consigneeData.notifyParty_phone2,
      onChange: (e) =>
        setConsigneeData({
          ...consigneeData,
          notifyParty_phone2: e.target.value,
        }),
    },
    {
      label: "Phone Number3",
      id: "notifyPartyPhoneNumber3Ref",
      value: consigneeData.notifyParty_phone3,
      onChange: (e) =>
        setConsigneeData({
          ...consigneeData,
          notifyParty_phone3: e.target.value,
        }),
    },
    {
      label: "Fax Number",
      id: "notifyPartyFaxNumberRef",
      value: consigneeData.notifyParty_faxno,
      onChange: (e) =>
        setConsigneeData({
          ...consigneeData,
          notifyParty_faxno: e.target.value,
        }),
    },
    {
      label: "Cell Phone Number/Email",
      id: "notifyPartyCellPhoneNumberOREmailRef",
      value: consigneeData.notifyParty_phoneno_email,
      onChange: (e) =>
        setConsigneeData({
          ...consigneeData,
          notifyParty_phoneno_email: e.target.value,
        }),
    },
  ];

  const consigneeInputData = [
    {
      label: "Name",
      id: "consigneeNameRef",
      value: consigneeData.consignee_name,
      onChange: (e) =>
        setConsigneeData({ ...consigneeData, consignee_name: e.target.value }),
    },
    {
      label: "Address",
      id: "consigneeAddressRef",
      value: consigneeData.consignee_address,
      onChange: (e) =>
        setConsigneeData({
          ...consigneeData,
          consignee_address: e.target.value,
        }),
    },
    {
      label: "City",
      id: "consigneeCityRef",
      value: consigneeData.consignee_city,
      onChange: (e) =>
        setConsigneeData({ ...consigneeData, consignee_city: e.target.value }),
    },
    {
      label: "Country",
      id: "consigneeCountryRef",
      value: consigneeData.consignee_country,
      onChange: (e) =>
        setConsigneeData({
          ...consigneeData,
          consignee_country: e.target.value,
        }),
    },
    {
      label: "Phone Number1",
      id: "consigneePhoneNumber1Ref",
      value: consigneeData.consignee_phone1,
      onChange: (e) =>
        setConsigneeData({
          ...consigneeData,
          consignee_phone1: e.target.value,
        }),
    },
    {
      label: "Phone Number2",
      id: "consigneePhoneNumber2Ref",
      value: consigneeData.consignee_phone2,
      onChange: (e) =>
        setConsigneeData({
          ...consigneeData,
          consignee_phone2: e.target.value,
        }),
    },
    {
      label: "Phone Number3",
      id: "consigneePhoneNumber3Ref",
      value: consigneeData.consignee_phone3,
      onChange: (e) =>
        setConsigneeData({
          ...consigneeData,
          consignee_phone3: e.target.value,
        }),
    },
    {
      label: "Fax Number",
      id: "consigneeFaxNumberRef",
      value: consigneeData.consignee_faxno,
      onChange: (e) =>
        setConsigneeData({ ...consigneeData, consignee_faxno: e.target.value }),
    },
    {
      label: "Cell Phone Number/EmailRef",
      id: "consigneeCellPhoneNumberOREmailRef",
      value: consigneeData.consignee_phoneno_email,
      onChange: (e) =>
        setConsigneeData({
          ...consigneeData,
          consignee_phoneno_email: e.target.value,
        }),
    },
  ];

  useEffect(() => {
    if (capLink) {
      setSelectedNameOption(capLink?.company_name || "");
    }
  }, [capLink]);

  useEffect(() => {
    if (capLink) {
      setSelectedForwarderNameOption(capLink?.forwarder_name || "");
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
    if (productImagesData) {
      setproductImages(productImagesData ? productImagesData?.map(images => images.img_url) : []);
    }
  }, [productImagesData]);

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
    if (file.length > 0) {
      setproductFeatureImage(file);
      let images = document.getElementById("showFeaturedImage");
      images.classList.add("hidden");
  }
  }

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
  };

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
          return [...prevStatusFeatures, value]; //update/${capLinkEditId}`d ,If Checked
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
          return [...prevOptionFeatures, value]; //update/${capLinkEditId}`d ,If Checked
        } else {
          return prevOptionFeatures.filter((item) => item !== value); // Removed ,If Not Checked
        }
      });
    }
  };

  //  Update Function
  const updateCapLinksData = async (e) => {
    e.preventDefault();

    if (!productFeatureImage) {
      alert("featured image is required");
      return;
    }
    if (!productImages) {
      alert("product images are required");
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
    }
    if (!refs.notifyParty.notifyPartyProductNameRef.current.value) {
      refs.notifyParty.notifyPartyProductNameRef.current.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
      refs.notifyParty.notifyPartyProductNameRef.current.focus();
      setIsActive("product_name");
      return;
    }
    if (!refs.notifyParty.notifyPartyReferenceNoRef.current.value) {
      refs.notifyParty.notifyPartyReferenceNoRef.current.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
      refs.notifyParty.notifyPartyReferenceNoRef.current.focus();
      setIsActive("reference_no");
      return;
    }
    if (!refs.document.documentNameRef.current.value) {
      refs.document.documentNameRef.current.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
      refs.document.documentNameRef.current.focus();
      setIsActive("doc_name");
      return;
    }
    if (!refs.notifyParty.notifyPartyMileageRef.current.value) {
      refs.notifyParty.notifyPartyMileageRef.current.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
      refs.notifyParty.notifyPartyMileageRef.current.focus();
      setIsActive("mileage");
      return;
    }
    if (!refs.notifyParty.notifyPartyModelCodeRef.current.value) {
      refs.notifyParty.notifyPartyModelCodeRef.current.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
      refs.notifyParty.notifyPartyModelCodeRef.current.focus();
      setIsActive("modelCode");
      return;
    }
    if (!refs.notifyParty.notifyPartyRegistrationYearORMonthRef.current.value) {
      refs.notifyParty.notifyPartyRegistrationYearORMonthRef.current.scrollIntoView(
        {
          behavior: "smooth",
          block: "center",
        }
      );
      refs.notifyParty.notifyPartyRegistrationYearORMonthRef.current.focus();
      setIsActive("registeration_year_month");
    }
    if (!refs.notifyParty.manufactureYearORMonthRef.current.value) {
      refs.notifyParty.manufactureYearORMonthRef.current.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
      refs.notifyParty.manufactureYearORMonthRef.current.focus();
      setIsActive("manufacture_year_month");
      return;
    }
    if (!refs.notifyParty.notifyPartyModelGradeRef.current.value) {
      refs.notifyParty.notifyPartyModelGradeRef.current.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
      refs.notifyParty.notifyPartyModelGradeRef.current.focus();
      setIsActive("modelGrade");
      return;
    } else {
      const token = localStorage.getItem("adminToken");
      // "Content-Type": "multipart/form-data",
      const capData = new FormData();

      capData.append("company_name", selectedNameOption);
      capData.append("forwarder_name", selectedForwarderNameOption);
      if (refs.misc.descriptionRef) {
        capData.append("message", refs.misc.descriptionRef.current.value);
      }
      let cap_id;

      try {
        const capResponse = await axios.put(
          `http://localhost:5000/api/cap/update/${capLinkEditId}`,
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
          const shippingResponse = await axios.put(
            `http://localhost:5000/api/shippingInformation/update/${capLinkEditId}`,
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
          const documentResponse = await axios.put(
            `http://localhost:5000/api/documentInformation/update/${capLinkEditId}`,
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
          const consigneeResponse = await axios.put(
            `http://localhost:5000/api/consigneeNotifyPartyInformation/update/${capLinkEditId}`,
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

          productImageData.append("productID", cap_id);

          for (let i = 0; i < productImages.length; i++) {
            productImageData.append("product_images", productImages[i]);
          }
          try {
            const product_images_response = await axios.put(
              `http://localhost:5000/api/productImage/update/${capLinkEditId}`,
              productImageData,
              {
                headers: {
                  "Content-Type": "multipart/form-data",
                  Authorization: `Bearer ${token}`,
                },
              }
            );

            console.log(
              "Success" + JSON.stringify(product_images_response.data)
            );
          } catch (error) {
            console.log("Failed to add Product images", error.message);
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
          const productResponse = await axios.put(
            `http://localhost:5000/api/productInformation/update/${capLinkEditId}`,
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
          console.error(error);
          alert("Error updating the data");
        }
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
                <h1 className="text-3xl font-bold  max-md:text-2xl max-sm:text-lg">
                  Update Details
                </h1>
              </div>

              {/* 1st Section */}
              <div className="p-6 max-sm:p-3  border-neutral-500 border rounded-md space-y-5 text-sm text-gray-600 w-full h-auto">
                {/* Company Name Radio Buttons */}
                <div className="w-full min-sm:p-3 max-sm:mt-3  flex flex-col gap-5  h-auto justify-between items-start">
                  <h3 className="text-md font-bold max-sm:text-xs max-md:text-sm">
                    Select Name
                  </h3>
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
                  <h3 className="text-md font-bold max-sm:text-xs max-md:text-sm">
                    Forwarder Name
                  </h3>
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
                  <h3 className="text-md font-bold max-sm:text-xs max-md:text-sm">
                    Message
                  </h3>
                  <textarea
                    id="description"
                    value={capLink?.message || ""}
                    onChange={(e) =>
                      setCapLink({
                        ...capLink,
                        message: e.target.value,
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
                <h1 className="text-3xl font-bold max-md:text-xl max-sm:text-lg">
                  Status
                </h1>
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
                <h1 className="text-3xl font-bold max-md:text-xl max-sm:text-lg">
                  Information
                </h1>
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
                        value={shippingInfo.carrier || ""}
                        onChange={(e) =>
                          setShippingInfo({
                            ...shippingInfo,
                            carrier: e.target.value,
                          })
                        }
                        className={`${
                          isActive && "border-orange-400"
                        } border-neutral-500 border w-full rounded-md p-3 max-sm:p-2 max-sm:text-xs`}
                        placeholder=" Carrier Name "
                      />
                    </label>
                  </div>
                </div>

                {/* Departure Section */}
                <div className="w-full min-sm:p-3 max-sm:mt-3  flex flex-col gap-5  h-auto justify-between items-start">
                  <h3 className="text-md font-bold max-sm:text-xs max-md:text-sm">
                    Departure Section
                  </h3>
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
                        value={shippingInfo.dep_vessel_name || ""}
                        onChange={(e) =>
                          setShippingInfo({
                            ...shippingInfo,
                            dep_vessel_name: e.target.value,
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
                          value={shippingInfo.port_of_loading || ""}
                          onChange={(e) =>
                            setShippingInfo({
                              ...shippingInfo,
                              port_of_loading: e.target.value,
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
                          value={shippingInfo.etd || ""}
                          onChange={(e) =>
                            setShippingInfo({
                              ...shippingInfo,
                              etd: e.target.value,
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
                  <h3 className="text-md font-bold max-sm:text-xs max-md:text-sm ">
                    Arrival Section
                  </h3>
                  <div className="w-full h-auto justify-start items-center grid grid-cols-2 max-md:grid-cols-1 gap-5 ">
                    <label
                      htmlFor="VesselName"
                      className="w-full gap-3 flex flex-col justify-center items-start"
                      max-sm:text-xs
                    >
                      <p>Vessel</p>
                      <input
                        type="text"
                        id="VesselName"
                        value={shippingInfo.arrive_vessel_name || ""}
                        onChange={(e) =>
                          setShippingInfo({
                            ...shippingInfo,
                            arrive_vessel_name: e.target.value,
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
                          value={shippingInfo.port_of_discharge || ""}
                          onChange={(e) =>
                            setShippingInfo({
                              ...shippingInfo,
                              port_of_discharge: e.target.value,
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
                          value={shippingInfo.eta || ""}
                          onChange={(e) =>
                            setShippingInfo({
                              ...shippingInfo,
                              etA: e.target.value,
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
                  <h3 className="text-md font-bold max-sm:text-xs max-md:text-sm">
                    Document Section
                  </h3>

                  {/* File Input Rows */}
                  <div className="w-full h-auto justify-start items-center grid grid-cols-2 max-md:grid-cols-1 gap-5 ">
                    <EditFileInput
                      label="B/L"
                      id="bLFileRef"
                      name="bl"
                      fileRef={shippingInfo.bl}
                      onChange={handleBLFileChange}
                      existingFile={`${shippingInfo.bl}`}
                    />

                    <EditFileInput
                      label="Inspection"
                      id="inspectionFileRef"
                      name="inspection"
                      fileRef={shippingInfo.inspection}
                      onChange={handleInspectionFileChange}
                      existingFile={`${shippingInfo.inspection}`}
                    />
                  </div>

                  <div className="w-full h-auto justify-start items-center grid grid-cols-2 max-md:grid-cols-1 gap-5 ">
                    <EditFileInput
                      label="Export Certificate"
                      id="certificateFileRef"
                      name="export_certificate"
                      fileRef={shippingInfo.export_certificate}
                      onChange={handleCertificateChange}
                      existingFile={`${shippingInfo.export_certificate}`}
                    />

                    <EditFileInput
                      label="English Export Certificate"
                      id="englishCertificateFileRef"
                      name="english_export_certificate"
                      fileRef={shippingInfo.english_export_certificate}
                      onChange={handleEnglishCertificateChange}
                      existingFile={`downloads/english-certificate/${shippingInfo.english_export_certificate}`}
                    />
                  </div>

                  <div className="w-full h-auto justify-start items-center grid grid-cols-2 max-md:grid-cols-1 gap-5 ">
                    <EditFileInput
                      label="Invoice"
                      id="invoiceFileRef"
                      name="invoice"
                      fileRef={shippingInfo.invoice}
                      onChange={handleInvoiceChange}
                      existingFile={`downloads/invoice/${shippingInfo.invoice}`}
                    />
                    {/* Enrollment Input */}
                    <div className="w-full h-auto justify-start items-center grid grid-cols-2 max-md:grid-cols-1 gap-5 mb-9">
                      <div className="imageInput text-sm rounded-md w-full h-auto">
                        <div className="flex flex-col gap-2">
                          <label
                            htmlFor="Enrollement"
                            className="w-full gap-3 flex flex-col justify-center items-start"
                            max-sm:text-xs
                          >
                            <p>Enrollment</p>
                            <input
                              type="text"
                              id="Enrollement"
                              name="enrollment"
                              className="border-neutral-500 border w-full rounded-md p-3 max-sm:p-2 max-sm:text-xs"
                              placeholder="Enrollment"
                              value={shippingInfo.enrollment || ""}
                              onChange={(e) =>
                                setShippingInfo({
                                  ...shippingInfo,
                                  enrollment: e.target.value,
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
                <h1 className="text-3xl font-bold max-md:text-xl max-sm:text-lg">
                  Documents
                </h1>
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
                        value={documentInfo.doc_name || ""}
                        onChange={(e) =>
                          setDocumentInfo({
                            ...documentInfo,
                            doc_name: e.target.value,
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
                          value={documentInfo.doc_address || ""}
                          onChange={(e) =>
                            setDocumentInfo({
                              ...documentInfo,
                              doc_address: e.target.value,
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
                          value={documentInfo.doc_city || ""}
                          onChange={(e) =>
                            setDocumentInfo({
                              ...documentInfo,
                              doc_city: e.target.value,
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
                          value={documentInfo.doc_country || ""}
                          onChange={(e) =>
                            setDocumentInfo({
                              ...documentInfo,
                              doc_country: e.target.value,
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
                          value={documentInfo.doc_phone1 || ""}
                          onChange={(e) =>
                            setDocumentInfo({
                              ...documentInfo,
                              doc_phone1: e.target.value,
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
                          value={documentInfo.doc_phone2 || ""}
                          onChange={(e) =>
                            setDocumentInfo({
                              ...documentInfo,
                              doc_phone2: e.target.value,
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
                          value={documentInfo.doc_phone3 || ""}
                          onChange={(e) =>
                            setDocumentInfo({
                              ...documentInfo,
                              doc_name: e.target.value,
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
                          value={documentInfo.doc_faxno || ""}
                          onChange={(e) =>
                            setDocumentInfo({
                              ...documentInfo,
                              doc_faxno: e.target.value,
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
                          value={documentInfo.cellphone_no_email || ""}
                          onChange={(e) =>
                            setDocumentInfo({
                              ...documentInfo,
                              cellphone_no_email: e.target.value,
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
                          value={documentInfo.tracking_no || ""}
                          onChange={(e) =>
                            setDocumentInfo({
                              ...documentInfo,
                              tracking_no: e.target.value,
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
                            value={documentInfo.docCenter_name}
                            onChange={(e) =>
                              setDocumentInfo({
                                ...documentInfo,
                                docCenter_name: e.target.value,
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
                            value={documentInfo.docCenter_address}
                            onChange={(e) =>
                              setDocumentInfo({
                                ...documentInfo,
                                docCenter_address: e.target.value,
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
                            value={documentInfo.docCenter_city}
                            onChange={(e) =>
                              setDocumentInfo({
                                ...documentInfo,
                                docCenter_city: e.target.value,
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
                            value={documentInfo.docCenter_country}
                            onChange={(e) =>
                              setDocumentInfo({
                                ...documentInfo,
                                docCenter_country: e.target.value,
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
                            value={documentInfo.docCenter_phone1}
                            onChange={(e) =>
                              setDocumentInfo({
                                ...documentInfo,
                                docCenter_phone1: e.target.value,
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
                            value={documentInfo.docCenter_phone2}
                            onChange={(e) =>
                              setDocumentInfo({
                                ...documentInfo,
                                docCenter_phone2: e.target.value,
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
                            value={documentInfo.docCenter_phone3}
                            onChange={(e) =>
                              setDocumentInfo({
                                ...documentInfo,
                                docCenter_phone3: e.target.value,
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
                            value={documentInfo.email}
                            onChange={(e) =>
                              setDocumentInfo({
                                ...documentInfo,
                                email: e.target.value,
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
                            value={documentInfo.url}
                            onChange={(e) =>
                              setDocumentInfo({
                                ...documentInfo,
                                url: e.target.value,
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
                            value={documentInfo.other_information}
                            onChange={(e) =>
                              setDocumentInfo({
                                ...documentInfo,
                                other_information: e.target.value,
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
                  <h3 className="text-md font-bold max-sm:text-xs max-md:text-sm">
                    Consignee
                  </h3>

                  <div className="w-full h-auto grid grid-cols-2 max-md:grid-cols-1 gap-3">
                    {/* Reusable Input Component for Consignee and Notify Party */}
                    {consigneeInputData.map(
                      ({ label, id, value, onChange }) => (
                        <div
                          className="w-full h-auto justify-start items-center flex gap-5"
                          key={id}
                        >
                          <div className="flex flex-col w-full gap-2 h-auto max-sm:text-xs">
                            <label
                              htmlFor={id}
                              className="w-full gap-3 flex flex-col justify-center items-start"
                              max-sm:text-xs
                            >
                              <p>{label}</p>
                              <input
                                type="text"
                                id={id}
                                value={value}
                                onChange={onChange}
                                className="border-neutral-500 border w-full rounded-md p-3 max-sm:p-2 max-sm:text-xs"
                                placeholder={label}
                              />
                            </label>
                          </div>
                        </div>
                      )
                    )}
                  </div>
                </div>

                {/* Notify Party Section */}
                <div className="w-full min-sm:p-3 max-sm:mt-3  flex flex-col gap-5  h-auto justify-between items-start">
                  <h3 className="text-md font-bold max-sm:mt-3 max-sm:text-xs max-md:text-sm">
                    Notify Party
                  </h3>
                  <div className="w-full h-auto grid grid-cols-2 max-md:grid-cols-1 gap-3">
                    {/* Reusable Input Component for Notify Party */}
                    {notifyInputData.map(({ label, id, value, onChange }) => (
                      <div
                        className="w-full h-auto justify-start items-center flex gap-5"
                        key={id}
                      >
                        <div className="flex flex-col w-full gap-2 h-auto max-sm:text-xs">
                          <label
                            htmlFor={id}
                            className="w-full gap-3 flex flex-col justify-center items-start"
                            max-sm:text-xs
                          >
                            <p>{label}</p>
                            <input
                              type="text"
                              id={id}
                              value={value}
                              onChange={onChange}
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
                <h1 className="text-3xl font-bold max-md:text-xl max-sm:text-lg">
                  Purchased Product
                </h1>
              </div>
              <div className="p-6 max-sm:p-3 border-neutral-500 border max-sm:text-xs rounded-md text-sm text-gray-600 w-full h-auto">
                <div className="w-full flex flex-col gap-5 min-sm:p-3 h-auto items-start">
                  <EditInputFeild
                    label="Product Name"
                    id="notifyPartyProductName"
                    value={productInfo.product_name || ""}
                    onChange={(e) =>
                      setProductInfo({
                        ...productInfo,
                        product_name: e.target.value,
                      })
                    }
                    placeholder="Enter Product Name Here"
                    required
                  />

                  <div className="w-full grid grid-cols-2 max-sm:grid-cols-1 gap-5 ">
                    <EditInputFeild
                      label="Reference No"
                      id="notifyPartyReferenceNo"
                      value={productInfo.reference_no || ""}
                      onChange={(e) =>
                        setProductInfo({
                          ...productInfo,
                          reference_no: e.target.value,
                        })
                      }
                      placeholder="Reference No"
                    />
                    <EditInputFeild
                      label="Mileage"
                      id="notifyPartyMileage"
                      value={productInfo.mileage || ""}
                      onChange={(e) =>
                        setProductInfo({
                          ...productInfo,
                          mileage: e.target.value,
                        })
                      }
                      placeholder="Mileage"
                    />
                  </div>

                  <div className="w-full grid grid-cols-2 max-sm:grid-cols-1 gap-5 ">
                    <EditInputFeild
                      label="Model Code"
                      id="notifyPartyModelCode"
                      value={productInfo.modelCode || ""}
                      onChange={(e) =>
                        setProductInfo({
                          ...productInfo,
                          modelCode: e.target.value,
                        })
                      }
                      placeholder="Model Code"
                    />
                    <EditInputFeild
                      label="Registration Year/Month"
                      id="notifyPartyRegistrationYearMonth"
                      value={productInfo.registeration_year_month || ""}
                      onChange={(e) =>
                        setProductInfo({
                          ...productInfo,
                          registeration_year_month: e.target.value,
                        })
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
                      value={productInfo.manufacture_year_month || ""}
                      onChange={(e) =>
                        setProductInfo({
                          ...productInfo,
                          manufacture_year_month: e.target.value,
                        })
                      }
                      placeholder="Manufacture Year/Month"
                    />
                    <EditInputFeild
                      label="Model Grade"
                      id="notifyPartyModelGrade"
                      value={productInfo.modelGrade || ""}
                      onChange={(e) =>
                        setProductInfo({
                          ...productInfo,
                          modelGrade: e.target.value,
                        })
                      }
                      placeholder="Model Grade"
                    />
                  </div>

                  <div className="w-full grid grid-cols-2 max-sm:grid-cols-1 gap-5 ">
                    <EditInputFeild
                      label="Chassis #"
                      id="notifyPartyChassis"
                      value={productInfo.chassis || ""}
                      onChange={(e) =>
                        setProductInfo({
                          ...productInfo,
                          chassis: e.target.value,
                        })
                      }
                      placeholder="Chassis #"
                    />
                    <EditInputFeild
                      label="Engine Size"
                      id="notifyPartyEngineSize"
                      type="number"
                      value={productInfo.engine_size || ""}
                      onChange={(e) =>
                        setProductInfo({
                          ...productInfo,
                          engine_size: e.target.value,
                        })
                      }
                      placeholder="Engine Size"
                    />

                    <EditInputFeild
                      label="Drive"
                      id="notifyPartyDrive"
                      type="text"
                      value={productInfo.drive || ""}
                      onChange={(e) =>
                        setProductInfo({
                          ...productInfo,
                          drive: e.target.value,
                        })
                      }
                      placeholder="Drive"
                    />

                    <EditInputFeild
                      label="Ext Color"
                      id="notifyPartyColor"
                      type="text"
                      value={productInfo.ext_color || ""}
                      onChange={(e) =>
                        setProductInfo({
                          ...productInfo,
                          ext_color: e.target.value,
                        })
                      }
                      placeholder="Ext Color"
                    />
                  </div>

                  <div className="w-full grid grid-cols-2 max-sm:grid-cols-1 gap-5 ">
                    <EditSelectFeild
                      label="Steering"
                      id="notifyPartySteering"
                      value={productInfo.steering || ""}
                      onChange={(e) =>
                        setProductInfo({
                          ...productInfo,
                          steering: e.target.value,
                        })
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
                      value={productInfo.transmission || ""}
                      onChange={(e) =>
                        setProductInfo({
                          ...productInfo,
                          transmission: e.target.value,
                        })
                      }
                      options={[
                        { value: "AT", label: "AT" },
                        { value: "AUTOMATIC", label: "AUTOMATIC" },
                        { value: "MT", label: "MT" },
                      ]}
                    />
                    <EditSelectFeild
                      label="Fuel"
                      id="notifyPartyFuel"
                      value={productInfo.fuel || ""}
                      onChange={(e) =>
                        setProductInfo({ ...productInfo, fuel: e.target.value })
                      }
                      options={[
                        { value: "GAS", label: "GAS" },
                        { value: "GASOLINE", label: "GASOLINE" },
                        { value: "PETROL", label: "PETROL" },
                        { value: "DEISEL", label: "DEISEL" },
                        { value: "ELECTRIC", label: "ELECTRIC" },
                      ]}
                    />
                    <EditSelectFeild
                      label="Seats"
                      id="notifyPartySeats"
                      value={productInfo.seats || ""}
                      onChange={(e) =>
                        setProductInfo({
                          ...productInfo,
                          seats: e.target.value,
                        })
                      }
                      options={[
                        { value: "1", label: "1" },
                        { value: "2", label: "2" },
                        { value: "4", label: "4" },
                        { value: "5", label: "5" },
                      ]}
                    />
                    <EditSelectFeild
                      label="Doors"
                      id="notifyPartyDoors"
                      value={productInfo.doors || ""}
                      onChange={(e) =>
                        setProductInfo({
                          ...productInfo,
                          doors: e.target.value,
                        })
                      }
                      options={[
                        { value: "1", label: "1-Doors" },
                        { value: "2", label: "2-Doors" },
                        { value: "4", label: "4-Doors" },
                        { value: "5", label: "5D" },
                      ]}
                    />
                    <EditInputFeild
                      label="Engine no"
                      id="notifyPartyEngineNo"
                      type="text"
                      value={productInfo.engine_no || ""}
                      onChange={(e) =>
                        setProductInfo({
                          ...productInfo,
                          engine_no: e.target.value,
                        })
                      }
                      placeholder="Engine no"
                    />
                  </div>
                </div>

                {/* Products Features */}
                <div className="productFeatures w-full p-3 h-auto flex flex-col gap-5 justify-center">
                  <div className="flex justify-between items-center min-sm:p-6 max-sm:mt-3">
                    <h1 className="text-3xl font-bold max-md:text-xl max-sm:text-lg">
                      Option
                    </h1>
                  </div>
                  {/* Status Features */}
                  <div className="card min-md:p-6  rounded-md">
                    <div className="grid grid-cols-3 max-md:grid-cols-2 max-sm:grid-cols-1 gap-4">
                      {optionFeatures.map((feature) => (
                        <div
                          key={feature.id}
                          className="w-[230px] min-smpx-3 py-1"
                        >
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
                                    feature?.value
                                  )
                                }
                                onChange={(e) =>
                                  handleOptionFeatureChange(e, "optionFeatures")
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
                      {productInfo.featured_image && (
                        <div className="showFeaturedImage w-[200px] max-sm:w-[170px] max-sm:h-[170px] mt-5 h-[200px] flex justify-center items-center relative">
                          <div className="text-lg p-1 shadow-lg rounded-full bg-white hover:bg-red-400 cursor-pointer absolute top-0 right-0 z-10">
                            ❌
                          </div>
                          <img
                            loading="lazy"
                            src={`../../../../../admin/public/uploads/${productInfo.featured_image}`}
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
                      {productImagesData?.length > 0 && (
                        <div className="flex w-auto h-auto p-3">
                          <div
                            id="showProductImages"
                            className="showImage w-full mt-5 h-auto gap-4 flex-wrap flex justify-start items-center "
                          >
                            {productImagesData.map((productImage, index) => (
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
                                  src={`../../../../../admin/public/uploads/${productImage.img_url}`}
                                  alt={`Gallery ${index}`}
                                  className="w-[130px] h-[130px] object-cover rounded-md"
                                />
                              </div>
                            ))}
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
