import express from "express";
import {
  getChaptersBySubject,
  createChapter,
  getAssessmentByChapter,
  createAssessment,
} from "../controllers/learn.controller.js";
import { uploadThreeDModel } from "../middlewares/multer.middleware.js";

const router = express.Router();

// Chapter routes
router.get("/subjects/:subjectName/chapters", getChaptersBySubject);
router.post("/chapters", uploadThreeDModel, createChapter);

// Assessment routes
router.get(
  "/subjects/:subjectId/chapters/:chapterNumber/assessment",
  getAssessmentByChapter,
);
router.post("/assessments", createAssessment);

export default router;
