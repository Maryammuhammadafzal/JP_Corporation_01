import express from 'express';
import multer from 'multer';
import path from 'path';

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); 
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, "car-images/featured_" + uniqueSuffix + path.extname(file.originalname)); 
  }
});

const upload = multer({ storage : storage });


export default upload;
// fileFilter: (req, file, cb) => {
//   const ext = path.extname(file.originalname).toLowerCase();
//   if (ext === '.jpg' || ext === '.png' || ext === '.jpeg') {
//     cb(null, true);
//   } else {
//     cb(new Error('Only images are allowed'));
//   }
// }
