import express from "express"
import {addImage , getImage , updateImage , deleteImage} from "../controllers/imageController.js"
import galleryImageUpload from "../middlewares/multer/galleryImageUpload.js";
import verifyToken from "../middlewares/tokenVerify.js";
const router = express.Router();


router.post("/add", verifyToken, galleryImageUpload.array("gallery_images", 20), addImage);
router.get("/get" , getImage);
router.put("/update" , updateImage);
router.delete("/delete" , deleteImage);

// Export Router
export default router;