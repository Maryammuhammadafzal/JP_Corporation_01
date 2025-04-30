import express from "express"
import {addDocumentInformation , getDocumentInformation , updateDocumentInformation , deleteDocumentInformation} from "../controllers/documentInformationController.js"
const router = express.Router();


router.post("/add" , addDocumentInformation);
router.get("/get" , getDocumentInformation);
router.put("/update" , updateDocumentInformation);
router.delete("/delete" , deleteDocumentInformation);

// Export Router
export default router;