import express from 'express';
import multer from 'multer';
import path from 'path';

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public/uploads/'); 
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, `download/${file.fieldname}_` + uniqueSuffix + path.extname(file.originalname));  
  }
});

const downloadImages = multer({ storage : storage });


export default downloadImages;

