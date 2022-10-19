import { Router } from "express";
import authMiddleware from '../middlewares/auth.middleware.js';
import db from '../db/models/index.js';
import PhotoAlbumController from "../controllers/photoalbum.controller.js";

const router = Router();

const photoAlbumController = new PhotoAlbumController(db);

router.get('/photoalbum/test', authMiddleware, photoAlbumController.getTestProfile)

router.post('/photoalbum/uploadmultiple', authMiddleware, photoAlbumController.uploadMultipleImages)
router.post('/photoalbum/retrievemultiple', authMiddleware, photoAlbumController.retrieveMultipleImages)
router.get('/photoalbum/retrieveDogs', authMiddleware, photoAlbumController.retrieveAllDogs)

export default router