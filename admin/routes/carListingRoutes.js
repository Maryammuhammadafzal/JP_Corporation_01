import express from "express"
import {addCarListing , getCarListing , updateCarListing , deleteCarListing , getCarListingById} from "../controllers/carListingController.js"
import verifyToken from "../middlewares/tokenVerify.js";
import upload from "../middlewares/upload.js";

const router = express.Router();
router.use(verifyToken);

// router.post("/add" , verifyToken , upload.single({name : "featured_image"}) ,addCarListing);
router.get("/get" , verifyToken, getCarListing);
router.get("/getById/:id" , verifyToken, getCarListingById);
router.post("/add" , verifyToken , upload.single("featured_image"), addCarListing);
router.put("/update/:id" , verifyToken , updateCarListing);
router.delete("/delete/:id" , verifyToken , deleteCarListing);

// Export Router
export default router;