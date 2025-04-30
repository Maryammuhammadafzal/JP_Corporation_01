import express from "express"
import {addFeature , getFeature , updateFeature , deleteFeature} from "../controllers/featuresController.js"
const router = express.Router();


router.post("/add" , addFeature);
router.get("/get" , getFeature);
router.put("/update" , updateFeature);
router.delete("/delete" , deleteFeature);

// Export Router
export default router;