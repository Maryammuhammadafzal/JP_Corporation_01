import express from "express"
import {addProductImage , getProductImage , updateProductImage , deleteProductImage , getProductImageById } from "../controllers/ProductImageController.js"
import verifyToken from "../middlewares/tokenVerify.js";
import productImagesUpload from "../middlewares/multer/productImagesUpload.js";
const router = express.Router();


router.post("/add" ,verifyToken, productImagesUpload.array("product_images", 20), addProductImage);
router.get("/get" , getProductImage);
router.get("/getbyid/:productID" , getProductImageById);
router.put("/update/:productID" ,productImagesUpload.array("product_images", 20), updateProductImage);
router.delete("/delete/:productID" , deleteProductImage);

// Export Router
export default router;