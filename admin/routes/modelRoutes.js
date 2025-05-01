import express from 'express';
import verifyToken from '../middlewares/tokenVerify.js';
// import { addModal , getModal , deleteModal , getModalById , updateModal , getModalByMake  } from '../controllers/modelController.js'
import { getModal , getModalByMake } from '../controllers/modelController.js'

const router = express.Router();

// // Get All Cards

// router.post('/add' , addModal);
router.get('/' , verifyToken , getModal);
// router.get('/get/:id' , getModalById);
router.get('/getModalByMake/:modalMake' , getModalByMake);
// router.put('/update/:id' , updateModal);
// router.delete('/delete/:id', deleteModal);

// Export Router
export default router;