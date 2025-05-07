import express from "express"
import {addProductInformation , getProductInformation , updateProductInformation , deleteProductInformation} from "../controllers/productInformationController.js"
import verifyToken from "../middlewares/tokenVerify.js";
const router = express.Router();
import productfeaturedImageUpload from "../middlewares/multer/productFeaturedImageUpload.js";

router.post("/add" , verifyToken ,productfeaturedImageUpload.single("product_featured_image"), addProductInformation);
router.get("/get" , getProductInformation);
router.put("/update" , updateProductInformation);
router.delete("/delete/:id" , deleteProductInformation);

// Export Router
export default router;