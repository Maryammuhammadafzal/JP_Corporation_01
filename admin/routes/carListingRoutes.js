import express from "express"
import {addCarListing , getCarListing , updateCarListing , deleteCarListing , getCarListingById , getCarListingByType , getCarListingByQuery} from "../controllers/carListingController.js"
import verifyToken from "../middlewares/tokenVerify.js";
import featuredImageUpload from "../middlewares/multer/featuredImageUpload.js";

const router = express.Router();

router.post("/add" , verifyToken , featuredImageUpload.single("featured_image") ,addCarListing);
router.get("/get" , getCarListing);
router.get("/getById/:id" , getCarListingById);
router.get("/getByType" , getCarListingByType);
router.get("/getByQuery" , getCarListingByQuery);
router.put("/update/:id" , verifyToken , featuredImageUpload.single("featured_image") , updateCarListing);
router.delete("/delete/:id" , verifyToken , deleteCarListing);

// Export Router
export default router;