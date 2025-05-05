import express from "express"
import {addCarListing , getCarListing , updateCarListing , deleteCarListing , getCarListingById} from "../controllers/carListingController.js"
import verifyToken from "../middlewares/tokenVerify.js";
import featuredImageUpload from "../middlewares/multer/featuredImageUpload.js";

const router = express.Router();
router.use(verifyToken);

router.post("/add" , verifyToken , featuredImageUpload.single("featured_image") ,addCarListing);
router.get("/get" , verifyToken, getCarListing);
router.get("/getById/:id" , verifyToken, getCarListingById);
router.put("/update/:id" , verifyToken , featuredImageUpload.single("featured_image") , updateCarListing);
router.delete("/delete/:id" , verifyToken , deleteCarListing);

// Export Router
export default router;