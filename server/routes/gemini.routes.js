import express from "express";
import multer from "multer";
import geminiController from "../controllers/gemini.controller.js";

const router = express.Router();

// Configure multer for memory storage
const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 100 * 1024 * 1024, // 100MB limit (Gemini supports up to 2GB)
  },
  fileFilter: (req, file, cb) => {
    // Accept common image formats
    const allowedMimes = [
      "image/jpeg",
      "image/png",
      "image/webp",
      "image/heic",
      "image/heif",
    ];
    if (allowedMimes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error("Invalid file type. Only images are allowed."));
    }
  },
});

// POST route for sending messages with optional image
router.post("/", upload.single("image"), geminiController);

export default router;
