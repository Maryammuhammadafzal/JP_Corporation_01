import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
// import dashboardRoutes from "./routes/dashboardRoutes.js";
import adminRoutes from "./routes/adminRoutes.js"
import modelRoutes from "./routes/modelRoutes.js"
import attachmentRoutes from "./routes/attachmentRoutes.js"
import carListingRoutes from "./routes/carListingRoutes.js"
import capRoutes from "./routes/capRoutes.js"
// import carRoutes from "./routes/carRoutes.js"
import consigneeNotifyPartyInformationRoutes from "./routes/consigneeNotifyPartyInformationRoutes.js"
// import contactRoutes from "./routes/contactRoutes.js"
import contactUsRoutes from "./routes/contactUsRoutes.js"
import documentInformationRoutes from "./routes/documentInformationRoutes.js"
import featureRoutes from "./routes/featureRoutes.js"
import imageRoutes from "./routes/imageRoutes.js"
import makeRoutes from "./routes/makeRoutes.js"
import productImageRoutes from "./routes/productImageRoutes.js"
import productInformationRoutes from "./routes/productInformationRoutes.js"
import safetyFeatureRoutes from "./routes/safetyFeatureRoutes.js"
import shippingInformationRoutes from "./routes/shippingInformationRoutes.js"
import statusRoutes from "./routes/statusRoutes.js"

const PORT = process.env.PORT || 8800;
import path from 'path';
const app = express();
dotenv.config();

const allowedOrigins = [
  "https://jpcorporation01-production.up.railway.app/",
  "http://localhost:5173",
  "http://localhost:5174",
  "http://localhost:3000",
  "http://localhost:5000",
  "http://localhost:8000",
  "http://localhost:8800",
  "https://jp-corporation-01.vercel.app"
];
const corsOptions = {
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,                 
  allowedHeaders: ['Content-Type', 'Authorization'],
  methods: ['GET', 'POST', 'PUT', 'DELETE']
}
app.use(cors(corsOptions));
app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.use("/uploads", express.static("public/uploads"));
// app.use(fileUpload({ useTempFiles : true, tempFileDir : '/tmp/' }));


// MongoDB Connection
mongoose.connect(process.env.MONGO_URI)
.then(() => console.log("MongoDB Connected" ,process.env.MONGO_URI))
.catch((err) => console.log(err));


app.use("/api/admin" , adminRoutes)
app.use("/api/carListing" , carListingRoutes);
app.use("/api/model" , modelRoutes)
app.use("/api/images" , imageRoutes)
app.use("/api/attachment" , attachmentRoutes)
app.use("/api/make" , makeRoutes)
app.use("/api/cap" , capRoutes)
app.use("/api/shippingInformation" , shippingInformationRoutes)
app.use("/api/documentInformation" , documentInformationRoutes)
app.use("/api/feature" , featureRoutes)
app.use("/api/consigneeNotifyPartyInformation" , consigneeNotifyPartyInformationRoutes)
app.use("/api/productInformation" , productInformationRoutes)
app.use("/api/status" , statusRoutes)
app.use("/api/productImage" , productImageRoutes)
app.use("/api/safetyFeature" , safetyFeatureRoutes)
app.use("/api/contactUs" , contactUsRoutes)


const __dirname = path.resolve();
// Serve static frontend files
app.use(express.static(path.join(__dirname, '../dist')));


// Serve frontend only for non-API routes
app.get('*', (req, res, next) => {
  console.log("path", req.path);
  
  if (req.path.startsWith('/api')) {
    return res.status(404).json({ message: 'API route not found' });
  }
  res.sendFile(path.join(__dirname, '../dist', 'index.html'));
});;

// Server Start
app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});

