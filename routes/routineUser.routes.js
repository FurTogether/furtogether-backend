import { Router } from 'express';
import authMiddleware from '../middlewares/auth.middleware.js';
import RoutineUserController from '../controllers/routineUser.controller.js';
import db from '../db/models/index.js';

const router = Router();

const routineUserController = new RoutineUserController(db);

router.get('/routines', authMiddleware, routineUserController.getRoutines);

export default router;
