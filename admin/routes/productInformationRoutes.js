import express from "express"
import {addProductInformation , getProductInformation , updateProductInformation , deleteProductInformation} from "../controllers/productInformationController.js"
const router = express.Router();


router.post("/add" , addProductInformation);
router.get("/get" , getProductInformation);
router.put("/update" , updateProductInformation);
router.delete("/delete" , deleteProductInformation);

// Export Router
export default router;