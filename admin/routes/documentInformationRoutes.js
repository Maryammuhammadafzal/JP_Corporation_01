import express from "express"
import {addDocumentInformation , getDocumentInformation , updateDocumentInformation , deleteDocumentInformation} from "../controllers/documentInformationController.js"
import verifyToken from "../middlewares/tokenVerify.js";
const router = express.Router();


router.post("/add" , verifyToken , addDocumentInformation);
router.get("/get" , getDocumentInformation);
router.put("/update" , updateDocumentInformation);
router.delete("/delete/:id" , deleteDocumentInformation);

// Export Router
export default router;