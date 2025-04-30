import express from "express"
import {addSafetyFeatures , getSafetyFeatures , updateSafetyFeatures , deleteSafetyFeatures} from "../controllers/safetyFeaturesController.js"
const router = express.Router();


router.post("/add" , addSafetyFeatures);
router.get("/get" , getSafetyFeatures);
router.put("/update" , updateSafetyFeatures);
router.delete("/delete" , deleteSafetyFeatures);

// Export Router
export default router;