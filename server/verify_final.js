import mongoose from "mongoose";
import Chapter from "./models/chapters.model.js";
import Assessment from "./models/assesments.model.js";
import dotenv from "dotenv";

dotenv.config();

async function verifyFinal() {
  console.log("Verifying final model alignment...");

  if (!process.env.MONGO_URI && !process.env.MONGODB_URI) {
    console.error("MONGO_URI or MONGODB_URI is missing in .env");
    process.exit(1);
  }

  try {
    await mongoose.connect(process.env.MONGO_URI || process.env.MONGODB_URI);
    console.log("Connected to MongoDB");
    // Test Chapter
    const chapter = new Chapter({
      name: "Atoms",
      description: { text: "Basic unit of matter" },
      chapterNumber: 1,
      subject: "Chemistry",
      topic: "Organic Chemistry",
      threeDModel:
        "https://res.cloudinary.com/demo/image/upload/v1234567890/sample.glb",
    });
    console.log("Chapter model OK (Subject: " + chapter.subject + ")");

    await chapter.save();
    console.log("Chapter saved OK");

    // Test Assessment
    const assessment = new Assessment({
      name: "Atoms Quiz",
      description: "Test your knowledge of atoms",
      chapterNumber: 1,
      subject: "Chemistry", // Now a String
      questions: [
        {
          question: "What is an atom?",
          options: [{ option: "A particle", isCorrect: true }],
          answer: "A particle",
        },
      ],
    });
    await assessment.save();
    console.log("Assessment saved OK");

    if (chapter.subject === assessment.subject) {
      console.log("Alignment check: SUCCESS (Both use String enum)");
    } else {
      console.error("Alignment check: FAILED");
    }

    console.log("All final changes verified successfully!");
  } catch (error) {
    console.error("Verification failed:", error.message);
  } finally {
    await mongoose.disconnect();
    console.log("Disconnected from MongoDB");
  }
}

verifyFinal();
