import express from 'express';
import { addBankAccController, getAllBankAccController, deleteBankAccController, updateBankAccController } from '../controllers/bankAccContoller.js'; 

const router = express.Router();

router.route("/addAccount").post(addBankAccController);

router.route("/getAccount").post(getAllBankAccController);

router.route("/deleteAccount/:id").post(deleteBankAccController);

router.route('/updateAccount/:id').put(updateBankAccController);

export default router;