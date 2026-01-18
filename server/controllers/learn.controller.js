import Chapter from "../models/chapters.model.js";
import Assessment from "../models/assesments.model.js";
import { uploadToCloudinary } from "../services/cloudinary.service.js";

// --- Chapter Controllers ---

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

export const getChapterNamesWithIdBySubject = async (req, res) => {
  try {
    const { subjectName } = req.params;
    const chapters = await Chapter.find({ subject: subjectName });
    const chapterNamesWithId = chapters.map((chapter) => ({
      id: `chem_${chapter.chapterNumber}`,
      identification: chapter._id,
      name: chapter.name,
    }));
    res.status(200).json(chapterNamesWithId);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getChapterById = async (req, res) => {
  try {
    const { chapterId } = req.params;
    const { subjectName } = req.params;
    const cleanId = chapterId.split("_")[1];
    const chapter = await Chapter.findOne({
      chapterNumber: cleanId,
      subject: subjectName,
    });
    if (!chapter) {
      return res.status(404).json({ message: "Chapter not found" });
    }
    res.status(200).json(chapter);
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
    const { name, description, chapterNumber, subject, questions } = req.body;
    const assessment = await Assessment.create({
      name,
      description,
      chapterNumber,
      subject,
      questions,
    });
    res.status(201).json(assessment);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
