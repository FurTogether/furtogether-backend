import { Router } from 'express';
import authMiddleware from '../middlewares/auth.middleware.js';
import AuthController from '../controllers/auth.controller.js';
import db from '../db/models/index.js';

const router = Router();

const authController = new AuthController(db);

router.post('/sign-up', authController.signUp);
router.post('/sign-in', authController.signIn);
router.get('/re-auth', authMiddleware, authController.reAuth);
router.get('/verify-sign-in', authMiddleware, authController.verifySignIn);
router.get('/sign-out', authController.signOut);
router.get('/', (req, res) => {
  res.send('Welcome to the FurTogether server');
});

export default router;
