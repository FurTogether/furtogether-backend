import { Router } from 'express';
import authMiddleware from '../middlewares/auth.middleware.js';
import ProfileController from '../controllers/profile.controller.js';
import db from '../db/models/index.js';

const router = Router();

const profileController = new ProfileController(db);

router.get('/profile', authMiddleware, profileController.getHumanProfile);
router.post(
  '/profile/update',
  authMiddleware,
  profileController.updateHumanProfile
);
router.put(
  '/profile/updateDog',
  authMiddleware,
  profileController.updateDogProfile
);
router.delete(
  '/profile/deleteDog',
  authMiddleware,
  profileController.updateDogProfile
);

export default router;
