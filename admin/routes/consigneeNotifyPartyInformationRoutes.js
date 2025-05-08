import express from "express"
import {addConsigneeNotifypartInformation , getConsigneeNotifypartInformation , updateConsigneeNotifypartInformation , deleteConsigneeNotifypartInformation, getConsigneeNotifypartInformationById} from "../controllers/consigneeNotifypartInformationController.js"
import verifyToken from "../middlewares/tokenVerify.js";
const router = express.Router();


router.post("/add" , verifyToken , addConsigneeNotifypartInformation);
router.get("/get" , getConsigneeNotifypartInformation);
router.get("/getbyid/:id" , getConsigneeNotifypartInformationById);
router.put("/update/:id" , updateConsigneeNotifypartInformation);
router.delete("/delete/:id" , deleteConsigneeNotifypartInformation);

// Export Router
export default router;