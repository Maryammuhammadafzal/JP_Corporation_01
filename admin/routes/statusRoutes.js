import express from "express"
import {addStatus , getStatus , updateStatus , deleteStatus} from "../controllers/statusController.js"
const router = express.Router();


router.post("/add" , addStatus);
router.get("/get" , getStatus);
router.put("/update/:id" , updateStatus);
router.delete("/delete/:id" , deleteStatus);

// Export Router
export default router;