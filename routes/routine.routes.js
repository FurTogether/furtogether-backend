import { Router } from 'express';
import authMiddleware from '../middlewares/auth.middleware.js';
import RoutineController from '../controllers/routine.controller.js';
import db from '../db/models/index.js';

const router = Router();

const routineController = new RoutineController(db);

router.get('/routines', authMiddleware, routineController.getRoutines);
router.post('/routines/create', authMiddleware, routineController.createRoutines);
router.put('/routines/update', authMiddleware, routineController.updateRoutine);
router.delete('/routines/delete', authMiddleware, routineController.deleteRoutine);

export default router;
