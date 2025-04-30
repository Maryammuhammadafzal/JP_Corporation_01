import express from "express"
import {addAttachment , getAttachment , updateAttachment , deleteAttachment} from "../controllers/attachmentController.js"
const router = express.Router();


router.post("/add" , addAttachment);
router.get("/get" , getAttachment);
router.put("/update" , updateAttachment);
router.delete("/delete" , deleteAttachment);

// Export Router
export default router;