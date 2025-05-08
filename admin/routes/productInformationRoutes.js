import express from "express"
import {addProductInformation , getProductInformation , updateProductInformation , deleteProductInformation, getProductInformationById} from "../controllers/productInformationController.js"
import verifyToken from "../middlewares/tokenVerify.js";
const router = express.Router();
import productfeaturedImageUpload from "../middlewares/multer/productFeaturedImageUpload.js";

router.post("/add" , verifyToken ,productfeaturedImageUpload.single("featured_image"), addProductInformation);
router.get("/get" , getProductInformation);
router.get("/getbyid/:id" , getProductInformationById);
router.put("/update/:id" , updateProductInformation);
router.delete("/delete/:id" , deleteProductInformation);

// Export Router
export default router;