import express from "express";
import {
  getChapterNamesWithIdBySubject,
  createChapter,
  getAssessmentByChapter,
  createAssessment,
  getChapterById,
} from "../controllers/learn.controller.js";
import { uploadThreeDModel } from "../middlewares/multer.middleware.js";

const router = express.Router();

// Chapter routes
router.get("/subjects/:subjectName/chapters", getChapterNamesWithIdBySubject);
router.get("/subject/:subjectName/chapters/:chapterId", getChapterById);
router.post("/chapters", uploadThreeDModel, createChapter);

// Assessment routes
router.get(
  "/subjects/:subjectId/chapters/:chapterNumber/assessment",
  getAssessmentByChapter,
);
router.post("/assessments", createAssessment);

export default router;
