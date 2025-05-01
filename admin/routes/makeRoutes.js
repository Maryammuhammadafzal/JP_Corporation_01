import express from "express"
import {addMake , getMake , updateMake , deleteMake} from "../controllers/makeController.js"
import verifyToken from "../middlewares/tokenVerify.js";
const router = express.Router();

router.post("/add" , addMake);
router.get("/" , verifyToken, getMake);
router.put("/update" , updateMake);
router.delete("/delete" , deleteMake);

// Export Router
export default router;