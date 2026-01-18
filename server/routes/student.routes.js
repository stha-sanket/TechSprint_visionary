import express from "express";
import {
  registerStudent,
  loginStudent,
  getMe,
} from "../controllers/student.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post("/register", registerStudent);
router.post("/login", loginStudent);
router.get("/me", authMiddleware, getMe);

export default router;
