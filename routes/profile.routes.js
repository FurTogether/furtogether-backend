import { Router } from 'express';
import authMiddleware from '../middlewares/auth.middleware.js';
import ProfileController from '../controllers/profile.controller.js';
import db from '../db/models/index.js';

const router = Router();

const profileController = new ProfileController(db);

router.get('/profile', authMiddleware, profileController.getHumanProfile);
router.put(
  '/profile/updateUser',
  authMiddleware,
  profileController.updateUserProfile
);
router.put(
  '/profile/updateDog',
  authMiddleware,
  profileController.updateDogProfile
);
router.delete(
  '/profile/deleteDog',
  authMiddleware,
  profileController.deleteDogProfile
);
router.post(
  '/profile/createDog',
  authMiddleware,
  profileController.createDogProfile
);
router.post(
  '/profile/createAvatar',
  authMiddleware,
  profileController.createAvatarProfile
)

router.get(
  '/profile/getAvatar',
  authMiddleware,
  profileController.retrieveAvatarProfile
)

export default router;
