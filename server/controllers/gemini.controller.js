import axios from "axios";
import FormData from "form-data";
import dotenv from "dotenv";

dotenv.config();

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
const GEMINI_FILE_API_URL =
  "https://generativelanguage.googleapis.com/upload/v1beta/files";
const GEMINI_GENERATE_URL =
  "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent";

if (!GEMINI_API_KEY) {
  console.error("❌ GEMINI_API_KEY not set in environment variables.");
}

const geminiController = async (req, res) => {
  const { message } = req.body;
  const imageFile = req.file;

  try {
    let fileDataPart = null;

    // --- STEP 1: UPLOAD TO FILE API ---
    if (imageFile) {
      const formData = new FormData();

      // Metadata part: Tells Gemini what the file is
      formData.append(
        "metadata",
        JSON.stringify({
          file: { displayName: imageFile.originalname },
        }),
        { contentType: "application/json" },
      );

      // File part: The actual binary buffer
      formData.append("file", imageFile.buffer, {
        filename: imageFile.originalname,
        contentType: imageFile.mimetype,
      });

      const uploadResponse = await axios.post(
        `${GEMINI_FILE_API_URL}?key=${GEMINI_API_KEY}`,
        formData,
        { headers: { ...formData.getHeaders() } },
      );

      fileDataPart = {
        fileData: {
          mimeType: uploadResponse.data.file.mimeType,
          fileUri: uploadResponse.data.file.uri,
        },
      };
      console.log(
        "✅ File uploaded successfully:",
        uploadResponse.data.file.uri,
      );
    }

    // --- STEP 2: BUILD PARTS ARRAY ---
    const currentParts = [];
    if (fileDataPart) currentParts.push(fileDataPart);
    if (message) currentParts.push({ text: message });

    // --- STEP 3: GENERATE CONTENT ---
    //
    const response = await axios.post(
      `${GEMINI_GENERATE_URL}?key=${GEMINI_API_KEY}`,
      {
        contents: [
          {
            role: "user",
            parts: currentParts, // This array now contains your fileData and/or text
          },
        ],
        systemInstruction: {
          parts: [
            {
              text: "You are a friendly AI study assistant. Provide clear, concise help.",
            },
          ],
        },
      },
      {
        headers: { "Content-Type": "application/json" },
      },
    );

    const reply =
      response.data.candidates?.[0]?.content?.parts?.[0]?.text ||
      "No response generated.";

    res.json({
      reply,
      fileUri: fileDataPart ? fileDataPart.fileData.fileUri : null,
    });
  } catch (error) {
    const errorData = error.response?.data || error.message;
    console.error("🚨 Gemini API Error:", JSON.stringify(errorData, null, 2));

    res.status(500).json({
      error: "Failed to communicate with Gemini API.",
      details: errorData,
    });
  }
};

export default geminiController;
