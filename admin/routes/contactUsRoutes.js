import express from "express"
import {addContactUs , getContactUs , updateContactUs , deleteContactUs} from "../controllers/contactUsController.js"
const router = express.Router();


router.post("/add" , addContactUs);
router.get("/get" , getContactUs);
router.put("/update" , updateContactUs);
router.delete("/delete" , deleteContactUs);

// Export Router
export default router;