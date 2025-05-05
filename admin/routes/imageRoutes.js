import express from "express"
import {addImage , getImage , updateImage , deleteImage} from "../controllers/imageController.js"
import galleryImageUpload from "../middlewares/multer/galleryImageUpload.js";
import verifyToken from "../middlewares/tokenVerify.js";
const router = express.Router();


router.post("/add", verifyToken, galleryImageUpload.array("gallery_images", 20), addImage);
router.get("/get/:car_id" , verifyToken , getImage);
router.put("/update/:car_id" , verifyToken , galleryImageUpload.array("gallery_images", 20) , updateImage);
router.delete("/delete" , deleteImage);

// Export Router
export default router;