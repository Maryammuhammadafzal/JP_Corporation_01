import express from 'express';
import verifyToken from '../middlewares/tokenVerify.js';
// import { addModal , getModal , deleteModal , getModalById , updateModal , getModalByMake  } from '../controllers/modelController.js'
import { getModal  } from '../controllers/modelController.js'

const router = express.Router();

// // Get All Cards

// router.post('/add' , addModal);
router.get('/' , getModal);
// router.get('/get/:id' , getModalById);
// router.get('/getModal/:modalMake' , getModalByMake);
// router.put('/update/:id' , updateModal);
// router.delete('/delete/:id', deleteModal);

// Export Router
export default router;