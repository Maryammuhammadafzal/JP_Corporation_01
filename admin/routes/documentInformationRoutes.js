import express from "express"
import {addDocumentInformation , getDocumentInformation , updateDocumentInformation , getDocumentInformationById, deleteDocumentInformation} from "../controllers/documentInformationController.js"
import verifyToken from "../middlewares/tokenVerify.js";
const router = express.Router();


router.post("/add" , verifyToken , addDocumentInformation);
router.get("/get" , getDocumentInformation);
router.get("/getbyid/:id" , getDocumentInformationById);
router.put("/update/:id" , updateDocumentInformation);
router.delete("/delete/:id" , deleteDocumentInformation);

// Export Router
export default router;