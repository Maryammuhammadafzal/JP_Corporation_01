import express from "express"
import {addCap , getCap , updateCap , deleteCap, getCapById} from "../controllers/capController.js"
import verifyToken from "../middlewares/tokenVerify.js";
const router = express.Router();


router.post("/add" , verifyToken , addCap);
router.get("/get" , getCap);
router.get("/getbyid/:id" , getCapById);
router.put("/update/:id" , updateCap);
router.delete("/delete/:id" , deleteCap);

// Export Router
export default router;