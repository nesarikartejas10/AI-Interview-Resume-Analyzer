import express from "express";
import {
  getMeController,
  loginController,
  logoutController,
  registerController,
} from "../controllers/auth.controllers.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post("/register", registerController);
router.post("/login", loginController);
router.get("/logout", logoutController);
router.get("/get-me", authMiddleware, getMeController);

export default router;
