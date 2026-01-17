import mongoose from "mongoose";
import Chapter from "./models/chapters.model.js";

async function verifyMultipleModels() {
  console.log("Verifying multiple 3D models support...");

  try {
    const chapter = new Chapter({
      name: "Atoms",
      description: { text: "Basic unit of matter" },
      chapterNumber: 1,
      subject: "Chemistry",
      topic: "Organic Chemistry",
      threeDModels: [
        "https://res.cloudinary.com/demo/image/upload/v1/model1.glb",
        "https://res.cloudinary.com/demo/image/upload/v2/model2.glb",
      ],
    });

    await chapter.validate();
    console.log(
      "Chapter validation OK (Models: " + chapter.threeDModels.length + ")",
    );

    if (
      Array.isArray(chapter.threeDModels) &&
      chapter.threeDModels.length === 2
    ) {
      console.log("Multiple models check: SUCCESS");
    } else {
      console.error("Multiple models check: FAILED");
      process.exit(1);
    }

    console.log("Multiple 3D models support verified successfully!");
  } catch (error) {
    console.error("Verification failed:", error.message);
    process.exit(1);
  }
}

verifyMultipleModels();
