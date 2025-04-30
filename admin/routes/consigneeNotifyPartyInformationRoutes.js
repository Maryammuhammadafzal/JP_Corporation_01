import express from "express"
import {addConsigneeNotifypartInformation , getConsigneeNotifypartInformation , updateConsigneeNotifypartInformation , deleteConsigneeNotifypartInformation} from "../controllers/consigneeNotifypartInformationController.js"
const router = express.Router();


router.post("/add" , addConsigneeNotifypartInformation);
router.get("/get" , getConsigneeNotifypartInformation);
router.put("/update" , updateConsigneeNotifypartInformation);
router.delete("/delete" , deleteConsigneeNotifypartInformation);

// Export Router
export default router;