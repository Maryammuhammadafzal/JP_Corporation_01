import express from "express"
import { addShippingInformation, getShippingInformation, updateShippingInformation, getShippingInformationById, deleteShippingInformation } from "../controllers/shippingInformationController.js"
import verifyToken from "../middlewares/tokenVerify.js";
const router = express.Router();
import downloadImages from "../middlewares/multer/downloadImagesUpload.js"

router.post("/add", verifyToken, downloadImages.fields([
        { name: "bl" },
        { name: "inspection" },
        { name: "export_certificate" },
        { name: "english_export_certificate" },
        { name: "invoice" }
]), addShippingInformation);
router.get("/get", getShippingInformation);
router.get("/getbyid/:id", getShippingInformationById);
router.put("/update/:id", verifyToken, downloadImages.fields([
        { name: "bl" },
        { name: "inspection" },
        { name: "export_certificate" },
        { name: "english_export_certificate" },
        { name: "invoice" }
]), updateShippingInformation);
router.delete("/delete/:id", deleteShippingInformation);

// Export Router
export default router;