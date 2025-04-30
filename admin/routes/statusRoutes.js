import express from "express"
import {addStatus , getStatus , updateStatus , deleteStatus} from "../controllers/statusController.js"
const router = express.Router();


router.post("/add" , addStatus);
router.get("/get" , getStatus);
router.put("/update" , updateStatus);
router.delete("/delete" , deleteStatus);

// Export Router
export default router;