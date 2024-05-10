import express from 'express';
import { addGoalController, deleteGoalController, getAllGoalController, updateGoalController } from '../controllers/goalController.js';

const router = express.Router();
router.route("/addGoal").post(addGoalController);
router.route("/getGoal").post(getAllGoalController);
router.route("/deleteGoal/:id").post(deleteGoalController);
router.route('/updateGoal/:id').put(updateGoalController);
export default router;