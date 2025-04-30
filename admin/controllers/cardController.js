// import Car from '../models/CarModel.js';
// import upload from '../middlewares/upload.js'
// import path from 'path';

// // GET all cards
// export const getCars = async (req, res) => {
//         const page = parseInt(req.query.page) || 1;
//         const limit = parseInt(req.query.limit) || 100;

//         const getCar = await Car.find().sort({ createdAt: -1 })
//                 .skip((page - 1) * limit)
//                 .limit(limit);

//         res.json(getCar);
        
// };

// export const getCarsByQuery = async (req, res) => {
//   try {
//     let filter = {};

//     console.log("REQ.QUERY ===>", req?.query);

//     if (req.query.type) {
//       console.log("Fetching by TYPE:", req.query.type);
//       filter.carMake = req.query.type;
//     } else {
//       console.log("Searching by custom fields...");
//       if (req.query.carMake) {
//         filter.carMake = req.query.make;
//         console.log("carMake ===>", req.query.carMake);
//       }
//       if (req.query.carModel) {
//         filter.carModel = req.query.model;
//         console.log("carModel ===>", req.query.carModel);
//       }
//       if (req.query.carYear) {
//         filter.minYear = req.query.maxYear;
//         console.log("carYear ===>", req.query.carYear);
//       }
//     }

//     console.log("FINAL FILTER OBJECT ===>", filter);

//     const cars = await Car.find(filter);
//     // console.log("CARS ===>", cars);

//     res.json(cars);

//   } catch (error) {
//     console.error("Error:", error);
//     res.status(500).json({ error: error.message });
//   }
// };




// export const postCar = async (req, res) => {
//         try {
      
//           const {
//             carTitle,
//             carCondition,
//             carType,
//             carMake,
//             carModel,
//             carPrice,
//             carYear,
//             carDriveType,
//             carTransmission,
//             carFuelType,
//             carMileage,
//             carEngineSize,
//             carCylinder,
//             carColour,
//             carDoor,
//             carVin,
//             carAvailability,
//             carDescription
//           } = req.body;
          
        
// let featuredImage = JSON.stringify(req.files['featuredImage'][0].path.replace(/\\/g, '/'));
// let parsedFeaturedImage = featuredImage.split('"')[1]
// let parsedgalleryImages = req.files['galleryImages'].map((image) => image.path.replace(/\\/g, '/'));
// let attachmentImage = req.files['attachmentImage'] ? req.files['attachmentImage'][0].path.replace(/\\/g, '/'): null;
//     let parsedAttachmentImage = attachmentImage ? JSON.stringify(attachmentImage).split('"')[1] : null;
          
//           // Parse features
//           let parsedcarAllFeatures = [];
// if (req.body.carAllFeatures) {
//   parsedcarAllFeatures = JSON.parse(req.body.carAllFeatures);
// } else {
//   console.log('No allFeatures provided');
// }
//           let parsedCarSafetyFeatures = [];
//           console.log(req.body.carSafetyFeatures);
          
// if (req.body.carSafetyFeatures) {
//   parsedCarSafetyFeatures = JSON.parse(req.body.carSafetyFeatures);
// } else {
//   console.log('No allFeatures provided');
// }

//           const newCar = new Car({
//             carTitle,
//             carCondition,
//             carType,
//             carMake,
//             carModel,
//             carPrice,
//             carYear,
//             carDriveType,
//             carTransmission,
//             carFuelType,
//             carMileage,
//             carEngineSize,
//             carCylinder,
//             carColour,
//             carDoor,
//             carVin,
//             carDescription,
//             carAvailability,
//             featuredImage : parsedFeaturedImage,
//             attachmentImage : parsedAttachmentImage,
//             galleryImages : parsedgalleryImages,
//             carAllFeatures : parsedcarAllFeatures,
//             carSafetyFeatures : parsedCarSafetyFeatures,

//           });
      
//           const savedCar = await newCar.save();
      
//           res.status(200).json({
//             message: "Car added successfully",
//             data: savedCar
//           });
      
//         } catch (err) {
//           console.error('Error adding car:', err);
//           res.status(400).json({
//             message: "Failed to add car",
//             error: err.message
//           });
//         }
//       };

    
//       // UPDATE car
// export const updateCar = async (req, res) => {
//   try {
//     const { id } = req.params;
//     console.log('Headers:', req.headers['content-type']);
//     console.log('Updating car with ID:', id);
//     console.log('BODY:', req.body);
//     console.log('FILES:', JSON.stringify(req.files));

//     const {
//       carTitle,
//       carCondition,
//       carType,
//       carMake,
//       carModel,
//       carPrice,
//       carYear,
//       carDriveType,
//       carTransmission,
//       carFuelType,
//       carMileage,
//       carEngineSize,
//       carCylinder,
//       carColour,
//       carDoor,
//       carVin,
//       carAvailability,
//       carDescription,
//       carAllFeatures,
//       carSafetyFeatures,
//     } = req.body;



//     // Parse features if exists
//     let parsedCarAllFeatures = [];
//     if (carAllFeatures) {
//       parsedCarAllFeatures = JSON.parse(carAllFeatures);
//     }
//     let parsedCarSafetyFeatures = [];
//     if (carSafetyFeatures) {
//       parsedCarSafetyFeatures = JSON.parse(carSafetyFeatures);
//     }
    

//       //  Prepare updated 
//       const updatedFields = {
//         carTitle,
//         carCondition,
//         carType,
//         carMake,
//         carModel,
//         carPrice,
//         carYear,
//         carDriveType,
//         carTransmission,
//         carFuelType,
//         carMileage,
//         carEngineSize,
//         carCylinder,
//         carColour,
//         carDoor,
//         carVin,
//         carAvailability,
//         carDescription,
//         carAllFeatures,
//         carSafetyFeatures,
//       };

//       //  Add features array 
//     if (parsedCarAllFeatures.length > 0) {
//       updatedFields.carAllFeatures = parsedCarAllFeatures;
//     }
//     if (parsedCarSafetyFeatures.length > 0) {
//       updatedFields.carSafetyFeatures = parsedCarSafetyFeatures;
//     }

//     let parsedFeaturedImage =  req.files['featuredImage'] && JSON.stringify(req.files['featuredImage'][0].path.replace(/\\/g, '/'));
//     updatedFields.featuredImage = parsedFeaturedImage ? parsedFeaturedImage.split('"')[1] : req.body.featuredImage;
// let parsedgalleryImages =  req.files['galleryImage'] && req.files['galleryImages'].map((image) => image.path.replace(/\\/g, '/'));
//   updatedFields.galleryImages = parsedgalleryImages === undefined ? req.body.galleryImages : parsedgalleryImages;
// let parsedAttachmentImage = req.files['attachmentImage'] ? req.files['attachmentImage'][0].path.replace(/\\/g, '/') : null;
//    updatedFields.attachmentImage = parsedAttachmentImage ? JSON.stringify(parsedAttachmentImage).split('"')[1] : null;
          

//     // // Handle Images
//     // if (req.files?.featuredImage) {
//     //   updatedFields.featuredImage = req.files.featuredImage[0].filename;
//     // }

//     // if (req.files?.attachmentImage) {
//     //   updatedFields.attachmentImage = req.files.attachmentImage[0].filename;
//     // }

//     // if (req.files?.galleryImages) {
//     //   updatedFields.galleryImages = req.files.galleryImages.map((file) => file.filename);
//     // }

// // findByIdAndUpdate 
// const updatedCar = await Car.findByIdAndUpdate(id, updatedFields, { new: true });

// if (!updatedCar) {
//   return res.status(404).json({ message: 'Car not found' });
// }

// res.status(200).json({
//   message: 'Car updated successfully',
//   car: updatedCar,
// });
// } catch (error) {
// console.error(error);
// res.status(500).json({ message: 'Server error' });
// }
  
// };

// //           // Multer files
// //           // const featuredImage = req.files?.featuredImage?.[0]?.filename || null;
// //           const featuredImage = req.files ? req.files.filename : null;
// //           console.log("featuredImage" +featuredImage);
          
// //           const attachmentImage = req.files ? req.files.filename : null;
// //            console.log("attachmentImage" +attachmentImage);
           
// //           // const galleryImages = req.file ? req.file.filename.map(file => file.filename) : [];
// //           // const galleryImages = req.files ? req.files.map((file) => file.filename) : [];
// //           const galleryImages = req.files.map((file) => file.filename);
// //           console.log( "galleryImages"+galleryImages);
          
      