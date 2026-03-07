import express from "express";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import { generateInterviewReportController } from "../controllers/interview.controller.js";

const router = express.Router();

router.post("/", authMiddleware, generateInterviewReportController);

export default router;
