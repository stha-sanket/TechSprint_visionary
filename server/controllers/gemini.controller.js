import axios from "axios";
import FormData from "form-data";
import dotenv from "dotenv";

dotenv.config();

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
const GEMINI_FILE_API_URL =
  "https://generativelanguage.googleapis.com/upload/v1beta/files";
const GEMINI_GENERATE_URL =
  "https://generativelanguage.googleapis.com/v1/models/gemini-2.5-flash:generateContent";

if (!GEMINI_API_KEY) {
  console.error("❌ GEMINI_API_KEY not set in environment variables.");
}

const geminiController = async (req, res) => {
  const { message, pastMessages } = req.body;
  const imageFile = req.file; // Uploaded via multer

  try {
    let fileUri = null;
    let mimeType = null;

    // Step 1: If image exists, upload to Gemini File API
    if (imageFile) {
      const formData = new FormData();
      formData.append("file", imageFile.buffer, {
        filename: imageFile.originalname,
        contentType: imageFile.mimetype,
      });

      const uploadResponse = await axios.post(
        `${GEMINI_FILE_API_URL}?key=${GEMINI_API_KEY}`,
        formData,
        {
          headers: {
            ...formData.getHeaders(),
          },
        },
      );

      fileUri = uploadResponse.data.file.uri;
      mimeType = uploadResponse.data.file.mimeType;
      console.log("✅ Image uploaded to Gemini File API:", fileUri);
    }

    // Step 2: Build the content parts
    const parts = [];

    // Add the text message
    if (message) {
      const systemContext = `
You are a friendly AI study assistant. Help students learn by providing clear, concise explanations.

${pastMessages && pastMessages.length > 0 ? `[Past Messages]\n${JSON.stringify(pastMessages, null, 2)}\n--- End of Past Messages ---\n` : ""}
[User Question]
${message}
      `.trim();

      parts.push({ text: systemContext });
    }

    // Add the image if uploaded
    if (fileUri && mimeType) {
      parts.push({
        fileData: {
          mimeType: mimeType,
          fileUri: fileUri,
        },
      });
    }

    // Step 3: Send to Gemini generateContent API
    const response = await axios.post(
      `${GEMINI_GENERATE_URL}?key=${GEMINI_API_KEY}`,
      {
        contents: [{ parts }],
      },
      {
        headers: { "Content-Type": "application/json" },
      },
    );

    const reply =
      response.data.candidates?.[0]?.content?.parts?.[0]?.text ||
      "Sorry, I could not generate a response.";

    res.json({ reply, fileUri });
  } catch (error) {
    console.error(
      "🚨 Gemini API Error:",
      error.response?.data || error.message,
    );
    res.status(500).json({
      error: "Failed to communicate with Gemini API.",
      details: error.response?.data || error.message,
    });
  }
};

export default geminiController;
