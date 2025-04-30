import express from "express"
import {addProductImage , getProductImage , updateProductImage , deleteProductImage} from "../controllers/ProductImageController.js"
const router = express.Router();


router.post("/add" , addProductImage);
router.get("/get" , getProductImage);
router.put("/update" , updateProductImage);
router.delete("/delete" , deleteProductImage);

// Export Router
export default router;