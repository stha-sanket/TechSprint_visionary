import Chapter from "../models/chapters.model.js";
import Assessment from "../models/assesments.model.js";
import { uploadToCloudinary } from "../services/cloudinary.service.js";

// --- Chapter Controllers ---

export const getChaptersBySubject = async (req, res) => {
  try {
    const { subjectName } = req.params;
    const chapters = await Chapter.find({ subject: subjectName });
    res.status(200).json(chapters);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createChapter = async (req, res) => {
  try {
    const { name, description, chapterNumber, subject, topic } = req.body;
    let threeDModelUrls = [];

    if (req.files && req.files.length > 0) {
      const uploadPromises = req.files.map((file) =>
        uploadToCloudinary(file.buffer, "chapters/models"),
      );
      const results = await Promise.all(uploadPromises);
      threeDModelUrls = results.map((result) => result.secure_url);
    }

    const chapter = await Chapter.create({
      name,
      description,
      chapterNumber,
      subject,
      topic,
      threeDModels: threeDModelUrls,
    });
    res.status(201).json(chapter);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// --- Assessment Controllers ---

export const getAssessmentByChapter = async (req, res) => {
  try {
    const { chapterNumber, subjectId } = req.params;
    const assessment = await Assessment.findOne({
      chapterNumber: chapterNumber,
      subject: subjectId,
    });
    if (!assessment) {
      return res.status(404).json({ message: "Assessment not found" });
    }
    res.status(200).json(assessment);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createAssessment = async (req, res) => {
  try {
    const {
      name,
      description,
      chapterNumber,
      subject,
      questions,
      fillInTheBlanks,
    } = req.body;
    const assessment = await Assessment.create({
      name,
      description,
      chapterNumber,
      subject,
      questions,
      fillInTheBlanks,
    });
    res.status(201).json(assessment);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
