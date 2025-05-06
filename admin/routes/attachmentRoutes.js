import express from "express"
import {addAttachment , getAttachment , updateAttachment , deleteAttachment} from "../controllers/attachmentController.js"
import verifyToken from "../middlewares/tokenVerify.js";
import attachmentPdfUpload from "../middlewares/multer/attachmentImageUpload.js";
const router = express.Router();


router.post("/add" , verifyToken , attachmentPdfUpload.single("attachment_image") , addAttachment);
router.get("/get/:car_id" ,  getAttachment);
router.put("/update/:car_id" , verifyToken , attachmentPdfUpload.single("attachment_image") , updateAttachment);
router.delete("/delete" , deleteAttachment);

// Export Router
export default router;