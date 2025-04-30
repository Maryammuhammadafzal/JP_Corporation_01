import express from "express"
import {addCar , getCar , updateCar , deleteCar} from "../controllers/carController.js"
const router = express.Router();


router.post("/add" , addCar);
router.get("/get" , getCar);
router.put("/update" , updateCar);
router.delete("/delete" , deleteCar);

// Export Router
export default router;