import { Router } from 'express';
// import authMiddleware from "../middlewares/auth.middleware";
import WalkController from '../controllers/walk.controller.js';
import db from '../db/models/index.js';

const router = Router();
const walkController = new WalkController(db);

router.get('/api/walk/user', walkController.getUserDaily);
router.post('/api/walk/map', walkController.getSameTimingMarkers);
router.delete('/api/walk/cancel', walkController.deleteDaily);
router.put('/api/walk/join', walkController.changeHeadCount);
router.get('/api/walk/markers', walkController.getAllMarkers);

export default router;
