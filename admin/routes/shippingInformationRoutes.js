import express from "express"
import {addShippingInformation , getShippingInformation , updateShippingInformation , deleteShippingInformation} from "../controllers/shippingInformationController.js"
const router = express.Router();


router.post("/add" , addShippingInformation);
router.get("/get" , getShippingInformation);
router.put("/update" , updateShippingInformation);
router.delete("/delete" , deleteShippingInformation);

// Export Router
export default router;