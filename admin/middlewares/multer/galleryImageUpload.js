import express from 'express';
import multer from 'multer';
import path from 'path';

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public/uploads/'); 
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, "car-images/img_" + uniqueSuffix + path.extname(file.originalname)); 
    console.log("car-images/img_" + uniqueSuffix + path.extname(file.originalname));
    
  }
});

const galleryImageUpload = multer({ storage : storage });


export default galleryImageUpload;
// fileFilter: (req, file, cb) => {
//   const ext = path.extname(file.originalname).toLowerCase();
//   if (ext === '.jpg' || ext === '.png' || ext === '.jpeg') {
//     cb(null, true);
//   } else {
//     cb(new Error('Only images are allowed'));
//   }
// }
