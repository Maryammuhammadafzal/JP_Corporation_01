import express from "express"
import {addImage , getImage , updateImage , deleteImage} from "../controllers/imageController.js"
const router = express.Router();


router.post("/add" , addImage);
router.get("/get" , getImage);
router.put("/update" , updateImage);
router.delete("/delete" , deleteImage);

// Export Router
export default router;