// import CapLinks from "../models/CapLinksModel.js";
// import verifyToken from "../middlewares/tokenVerify.js";

// // Get All Car
// export const getCapLinks =  async (req, res) => {
//         const page = parseInt(req.query.page) || 1;
//         const limit = parseInt(req.query.limit) || 100;

//         const getCapLinks = await CapLinks.find().sort({ createdAt: -1 })
//                 .skip((page - 1) * limit)
//                 .limit(limit);

//         res.json(getCapLinks);
// };


// // Get CapLinks by id
// export const getCapLinksById = async (req, res) => {
  
//   try {
//           const id = req.params.id;
//           console.log(id);
          
//             const capLinks = await CapLinks.findById(id);     
        
//             if (!capLinks) {
//               return res.status(404).json({ message: "CapLinks not found" });
//             }
        
//             console.log("CapLink" , {data: capLinks});
            
//             res.status(200).json({data: capLinks});
//           } catch (error) {
//             console.error("Error fetching CapLinks by ID:", error);
//             res.status(500).json({ message: "Server error" });
//           }
//     };
    
//     // Delete CapLinks
// export const deleteCapLinks =  async (req, res) => {
//         const id = req.params.id;
//         console.log(id);
        
    
//         try {
//             const deletedCapLinks = await CapLinks.findByIdAndDelete(id);
    
//             if (!deletedCapLinks) {
//                 return res.status(404).json({ message: "CapLinks not found" });
//             }
    
//             res.json({ message: "CapLinks deleted successfully", data: deletedCapLinks });
//         } catch (err) {
//             res.status(400).json({ message: "Failed to delete CapLinks", error: err.message });
//         }
//     };


//     export const addCapLinks = async (req, res) => {
//         try {
//                 const {
//                         carrierNameRef,
//                         departureVesselRef,
//                         departurePartsOfLandingRef,
//                         departureETDRef,
//                         arrivalVesselRef,
//                         arrivalPartOfDischargeRef,
//                         arrivalETDRef,
//                         documentNameRef,
//                         documentAddressRef,
//                         documentCityRef,
//                         documentCountryRef,
//                         documentFaxNumberRef,
//                         documentTrackingNumberRef,
//                         documentPhoneNumber1Ref,
//                         documentPhoneNumber2Ref,
//                         documentPhoneNumber3Ref,
//                         documentCellPhoneNumberOREmailRef,
//                         documentenrollementRef,
//                         documentCenterNameRef,
//                         documentCenterAddressRef,
//                         documentCenterCityRef,
//                         documentCenterCountryRef,
//                         documentCenterPhoneNumber1Ref,
//                         documentCenterPhoneNumber2Ref,
//                         documentCenterPhoneNumber3Ref,
//                         documentCenterEmailRef,
//                         documentCenterUrlRef,
//                         documentCenterOtherInformationRef,
//                         consigneeNameRef,
//                         consigneeCityRef,
//                         consigneeAddressRef,
//                         consigneeCountryRef,
//                         consigneeFaxNumberRef,
//                         consigneePhoneNumber1Ref,
//                         consigneePhoneNumber2Ref,
//                         consigneePhoneNumber3Ref,
//                         consigneeCellPhoneNumberOREmailRef,
//                         notifyPartyNameRef,
//                         notifyPartyCityRef,
//                         notifyPartyCountryRef,
//                         notifyPartyAddressRef,
//                         notifyPartyChassisRef,
//                         notifyPartyDoorRef,
//                         notifyPartytransmissionRef,
//                         notifyPartySteeringRef,
//                         notifyPartySeatsRef,
//                         notifyPartyRegistrationYearORMonthRef,
//                         notifyPartyCellPhoneNumberOREmailRef,
//                         notifyPartyReferenceNoRef,
//                         notifyPartyEngineNoRef,
//                         notifyPartyDriveRef,
//                         notifyPartyEngineSizeRef,
//                         notifyPartyExtColorRef,
//                         notifyPartyFuelRef,
//                         notifyPartyFaxNumberRef,
//                         notifyPartyMileageRef,
//                         notifyPartyModelCodeRef,
//                         notifyPartyModelGradeRef,
//                         notifyPartyPhoneNumber1Ref,
//                         notifyPartyPhoneNumber2Ref,
//                         notifyPartyPhoneNumber3Ref,
//                         notifyPartyProductNameRef,
//                         manufactureYearORMonthRef,
//                         descriptionRef,
//                         forwarderName,
//                         companyName,
//                         optionFeatures,
//                         statusFeatures
//                       } = req.body || {};
                      
                          

//                 const files = JSON.stringify(req.files);
//                 console.dir("Body " + JSON.stringify(req.body));
//                 console.log("Files" + files);

//                 // let newCompanyName = req.body.companyName;
//                 // console.log("Company Name" ,newCompanyName);
                

//       let productFeatureImageRef =  JSON.stringify(req?.files['productFeatureImageRef'][0].path.replace(/\\/g, '/'));
//       let parsedProductFeatureImageRef =  productFeatureImageRef.split('"')[1] ;
//       let parsedProductImageRef = req.files['productImageRef'].map((image) => image.path.replace(/\\/g, '/')) ;
//        let bLFileRef = req.files['bLFileRef'] ? JSON.stringify(req.files['bLFileRef'][0].path.replace(/\\/g, '/')) : null;
//       let parsedBLFileRef = bLFileRef ? bLFileRef.split('"')[1] : null;
//       let certificateFileRef = req.files['certificateFileRef'] ?  JSON.stringify(req.files['certificateFileRef'][0].path.replace(/\\/g, '/'))  : null;
//       let parsedCertificateFileRef = certificateFileRef ? certificateFileRef.split('"')[1] : null;
//       let englishCertificateFileRef = req.files['englishCertificateFileRef'] ?  JSON.stringify(req.files['englishCertificateFileRef'][0].path.replace(/\\/g, '/'))  : null;
//       let parsedEnglishCertificateFileRef = englishCertificateFileRef ? englishCertificateFileRef.split('"')[1] : null;
//       let inspectionFileRef = req.files['inspectionFileRef'] ?  JSON.stringify(req.files['inspectionFileRef'][0].path.replace(/\\/g, '/'))  : null;
//       let parsedInspectionFileRef = inspectionFileRef ? inspectionFileRef.split('"')[1] : null;
//       let invoiceFileRef = req.files['invoiceFileRef'] ?  JSON.stringify(req.files['invoiceFileRef'][0].path.replace(/\\/g, '/')) : null;
//       let parsedInvoiceFileRef = invoiceFileRef ? invoiceFileRef.split('"')[1] : null;



//           const newCapLinkData = { 
//             departure: {
//               carrierNameRef,
//               departureVesselRef,
//               departurePartsOfLandingRef,
//               departureETDRef,
//             },
//             arrival: {
//               arrivalVesselRef,
//               arrivalPartOfDischargeRef,
//               arrivalETDRef,
//             },
//             document: {
//               documentNameRef,
//               documentAddressRef,
//               documentCityRef,
//               documentCountryRef,
//               documentFaxNumberRef,
//               documentTrackingNumberRef,
//               documentPhoneNumber1Ref,
//               documentPhoneNumber2Ref,
//               documentPhoneNumber3Ref,
//               documentCellPhoneNumberOREmailRef,
//               documentenrollementRef,
//             },
//             documentCenter: {
//               documentCenterNameRef,
//               documentCenterAddressRef,
//               documentCenterCityRef,
//               documentCenterCountryRef,
//               documentCenterPhoneNumber1Ref,
//               documentCenterPhoneNumber2Ref,
//               documentCenterPhoneNumber3Ref,
//               documentCenterEmailRef,
//               documentCenterUrlRef,
//               documentCenterOtherInformationRef,
//             },
//             consignee: {
//               consigneeNameRef,
//               consigneeCityRef,
//               consigneeAddressRef,
//               consigneeCountryRef,
//               consigneeFaxNumberRef,
//               consigneePhoneNumber1Ref,
//               consigneePhoneNumber2Ref,
//               consigneePhoneNumber3Ref,
//               consigneeCellPhoneNumberOREmailRef,
//             },
//             notifyParty: {
//               notifyPartyNameRef,
//               notifyPartyCityRef,
//               notifyPartyCountryRef,
//               notifyPartyAddressRef,
//               notifyPartyChassisRef,
//               notifyPartyDoorRef,
//               notifyPartytransmissionRef,
//               notifyPartySteeringRef,
//               notifyPartySeatsRef,
//               notifyPartyRegistrationYearORMonthRef,
//               notifyPartyCellPhoneNumberOREmailRef,
//               notifyPartyReferenceNoRef,
//               notifyPartyEngineNoRef,
//               notifyPartyDriveRef,
//               notifyPartyEngineSizeRef,
//               notifyPartyExtColorRef,
//               notifyPartyFuelRef,
//               notifyPartyFaxNumberRef,
//               notifyPartyMileageRef,
//               notifyPartyModelCodeRef,
//               notifyPartyModelGradeRef,
//               notifyPartyPhoneNumber1Ref,
//               notifyPartyPhoneNumber2Ref,
//               notifyPartyPhoneNumber3Ref,
//               notifyPartyProductNameRef,
//               manufactureYearORMonthRef,
//             },
//             misc: {
//               descriptionRef,
//             },
//             productFeatureImageRef : parsedProductFeatureImageRef,
//             productImageRef : parsedProductImageRef,
//             bLFileRef : parsedBLFileRef,
//             certificateFileRef : parsedCertificateFileRef,
//             englishCertificateFileRef : parsedEnglishCertificateFileRef,
//             invoiceFileRef : parsedInvoiceFileRef,
//             inspectionFileRef: parsedInspectionFileRef,
//             forwarderName,
//             companyName,
//             optionFeatures,
//             statusFeatures,
//            };
          
//           const newCapLink = new CapLinks(newCapLinkData);
//           await newCapLink.save();
//           res.status(201).json(newCapLink);
//         } catch (error) {
//           console.error("Error adding capLinks:", error);
//           res.status(500).json({ message: "Server Error" });
//         }
//       };
     
// // Update Cap links 
//       export const updateCapLinks = async (req, res) => {
//         const id = req.params.id;
//         try {
  
//           const {
//             carrierNameRef,
//             departureVesselRef,
//             departurePartsOfLandingRef,
//             departureETDRef,
//             arrivalVesselRef,
//             arrivalPartOfDischargeRef,
//             arrivalETDRef,
//             documentNameRef,
//             documentAddressRef,
//             documentCityRef,
//             documentCountryRef,
//             documentFaxNumberRef,
//             documentTrackingNumberRef,
//             documentPhoneNumber1Ref,
//             documentPhoneNumber2Ref,
//             documentPhoneNumber3Ref,
//             documentCellPhoneNumberOREmailRef,
//             documentenrollementRef,
//             documentCenterNameRef,
//             documentCenterAddressRef,
//             documentCenterCityRef,
//             documentCenterCountryRef,
//             documentCenterPhoneNumber1Ref,
//             documentCenterPhoneNumber2Ref,
//             documentCenterPhoneNumber3Ref,
//             documentCenterEmailRef,
//             documentCenterUrlRef,
//             documentCenterOtherInformationRef,
//             consigneeNameRef,
//             consigneeCityRef,
//             consigneeAddressRef,
//             consigneeCountryRef,
//             consigneeFaxNumberRef,
//             consigneePhoneNumber1Ref,
//             consigneePhoneNumber2Ref,
//             consigneePhoneNumber3Ref,
//             consigneeCellPhoneNumberOREmailRef,
//             notifyPartyNameRef,
//             notifyPartyCityRef,
//             notifyPartyCountryRef,
//             notifyPartyAddressRef,
//             notifyPartyChassisRef,
//             notifyPartyDoorRef,
//             notifyPartytransmissionRef,
//             notifyPartySteeringRef,
//             notifyPartySeatsRef,
//             notifyPartyRegistrationYearORMonthRef,
//             notifyPartyCellPhoneNumberOREmailRef,
//             notifyPartyReferenceNoRef,
//             notifyPartyEngineNoRef,
//             notifyPartyDriveRef,
//             notifyPartyEngineSizeRef,
//             notifyPartyExtColorRef,
//             notifyPartyFuelRef,
//             notifyPartyFaxNumberRef,
//             notifyPartyMileageRef,
//             notifyPartyModelCodeRef,
//             notifyPartyModelGradeRef,
//             notifyPartyPhoneNumber1Ref,
//             notifyPartyPhoneNumber2Ref,
//             notifyPartyPhoneNumber3Ref,
//             notifyPartyProductNameRef,
//             manufactureYearORMonthRef,
//             descriptionRef,
//             forwarderName,
//             companyName,
//             optionFeatures,
//             statusFeatures
//           } = req.body || {};

//           console.dir("Body " + JSON.stringify(req.body));
//           console.log("Files" , req.files);
//           console.log("Image" , req.body.productFeatureImageRef[0]);
        

//           let productFeatureImageRef = req?.files['productFeatureImageRef'] && JSON.stringify(req?.files['productFeatureImageRef'][0]?.path?.replace(/\\/g, '/')) ;
//           let parsedProductFeatureImageRef = productFeatureImageRef ? productFeatureImageRef?.split('"')[1] : req.body.productFeatureImageRef[0];
//           let parsedProductImageRef =  req.files['productImageRef'] ? req.files['productImageRef'].map((image) => image.path.replace(/\\/g, '/')) : req.body.productImageRef;
//            let bLFileRef = req.files['bLFileRef'] ? JSON.stringify(req.files['bLFileRef'][0].path.replace(/\\/g, '/')) : null;
//           let parsedBLFileRef = bLFileRef ? bLFileRef.split('"')[1] :null
//           let certificateFileRef =  req.files['certificateFileRef'] ? JSON.stringify(req.files['certificateFileRef'][0].path.replace(/\\/g, '/')) : null;
//           let parsedCertificateFileRef = certificateFileRef ? certificateFileRef.split('"')[1] :null
//           let englishCertificateFileRef = req.files['englishCertificateFileRef'] ? JSON.stringify(req.files['englishCertificateFileRef'][0].path.replace(/\\/g, '/')) : null;
//           let parsedEnglishCertificateFileRef = englishCertificateFileRef ?  englishCertificateFileRef.split('"')[1] :null
//           let inspectionFileRef = req.files['inspectionFileRef'] ?  JSON.stringify(req.files['inspectionFileRef'][0].path.replace(/\\/g, '/')) : null;
//           let parsedInspectionFileRef = inspectionFileRef ? inspectionFileRef.split('"')[1] :null
//           let invoiceFileRef = req.files['invoiceFileRef'] ?  JSON.stringify(req.files['invoiceFileRef'][0].path.replace(/\\/g, '/')) : null;
//           let parsedInvoiceFileRef = invoiceFileRef ? invoiceFileRef.split('"')[1] :null 
    


// const updatedCapLinkData = { 
//   departure: {
//     carrierNameRef,
//     departureVesselRef,
//     departurePartsOfLandingRef,
//     departureETDRef,
//   },
//   arrival: {
//     arrivalVesselRef,
//     arrivalPartOfDischargeRef,
//     arrivalETDRef,
//   },
//   document: {
//     documentNameRef,
//     documentAddressRef,
//     documentCityRef,
//     documentCountryRef,
//     documentFaxNumberRef,
//     documentTrackingNumberRef,
//     documentPhoneNumber1Ref,
//     documentPhoneNumber2Ref,
//     documentPhoneNumber3Ref,
//     documentCellPhoneNumberOREmailRef,
//     documentenrollementRef,
//   },
//   documentCenter: {
//     documentCenterNameRef,
//     documentCenterAddressRef,
//     documentCenterCityRef,
//     documentCenterCountryRef,
//     documentCenterPhoneNumber1Ref,
//     documentCenterPhoneNumber2Ref,
//     documentCenterPhoneNumber3Ref,
//     documentCenterEmailRef,
//     documentCenterUrlRef,
//     documentCenterOtherInformationRef,
//   },
//   consignee: {
//     consigneeNameRef,
//     consigneeCityRef,
//     consigneeAddressRef,
//     consigneeCountryRef,
//     consigneeFaxNumberRef,
//     consigneePhoneNumber1Ref,
//     consigneePhoneNumber2Ref,
//     consigneePhoneNumber3Ref,
//     consigneeCellPhoneNumberOREmailRef,
//   },
//   notifyParty: {
//     notifyPartyNameRef,
//     notifyPartyCityRef,
//     notifyPartyCountryRef,
//     notifyPartyAddressRef,
//     notifyPartyChassisRef,
//     notifyPartyDoorRef,
//     notifyPartytransmissionRef,
//     notifyPartySteeringRef,
//     notifyPartySeatsRef,
//     notifyPartyRegistrationYearORMonthRef,
//     notifyPartyCellPhoneNumberOREmailRef,
//     notifyPartyReferenceNoRef,
//     notifyPartyEngineNoRef,
//     notifyPartyDriveRef,
//     notifyPartyEngineSizeRef,
//     notifyPartyExtColorRef,
//     notifyPartyFuelRef,
//     notifyPartyFaxNumberRef,
//     notifyPartyMileageRef,
//     notifyPartyModelCodeRef,
//     notifyPartyModelGradeRef,
//     notifyPartyPhoneNumber1Ref,
//     notifyPartyPhoneNumber2Ref,
//     notifyPartyPhoneNumber3Ref,
//     notifyPartyProductNameRef,
//     manufactureYearORMonthRef,
//   },
//   misc: {
//     descriptionRef,
//   },
//   productFeatureImageRef : parsedProductFeatureImageRef,
//   productImageRef : parsedProductImageRef,
//   bLFileRef : parsedBLFileRef,
//   certificateFileRef : parsedCertificateFileRef,
//   englishCertificateFileRef : parsedEnglishCertificateFileRef,
//   invoiceFileRef : parsedInvoiceFileRef,
//   inspectionFileRef : parsedInspectionFileRef,
//   forwarderName,
//   companyName,
//   optionFeatures,
//   statusFeatures,
//  };

//           const updateCapLinks = await CapLinks.findByIdAndUpdate(id, updatedCapLinkData , { new: true });

//           if (!updateCapLinks) {
//             return res.status(404).json({ message: 'CapLinks not found' });
//           }
          
//           res.status(200).json({
//             message: 'CapLinks updated successfully',
//             car: updateCapLinks,
//           });
          
//         }  catch (error) {
//           console.error(error);
//           res.status(500).json({ message: 'Server error' });
//           }
//       };