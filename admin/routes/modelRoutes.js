import express from 'express';
import verifyToken from '../middlewares/tokenVerify.js';
import { getModal , getModalByMake , addModal, getModalById ,updateModal, deleteModal } from '../controllers/modelController.js'

const router = express.Router();


router.post('/add' , verifyToken, addModal);
router.get('/' , verifyToken , getModal);
router.get('/get/:id' ,  getModalById);
router.get('/getModalByMake/:makeId' , getModalByMake);
router.put('/update/:id' , verifyToken , updateModal);
router.delete('/delete/:id', verifyToken , deleteModal);


export default router;