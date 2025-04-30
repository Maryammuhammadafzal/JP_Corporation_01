import express from "express"
import {addMake , getMake , updateMake , deleteMake} from "../controllers/makeController.js"
const router = express.Router();


router.post("/add" , addMake);
router.get("/get" , getMake);
router.put("/update" , updateMake);
router.delete("/delete" , deleteMake);

// Export Router
export default router;