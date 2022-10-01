import { Router } from "express";
// import authMiddleware from "../middlewares/auth.middleware";
import * as WalkController from "../controllers/walk.controller.js";


const router = Router();

router.get("/api/walk/map", WalkController.getAllMarkers);
// router.get("/api/walk/:markerIndex", WalkController.getHeadCount);
router.put("/api/walk/join/:markerIndex", WalkController.changeHeadCount);
router.get("/api/test", (req, res) => res.send("aaaa"));


export default router;
