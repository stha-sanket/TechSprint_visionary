import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
const LIST_MODELS_URL =
  "https://generativelanguage.googleapis.com/v1beta/models";

const listModels = async () => {
  try {
    const response = await axios.get(
      `${LIST_MODELS_URL}?key=${GEMINI_API_KEY}`,
    );
    console.log("Available Models:");
    response.data.models.forEach((model) => {
      if (model.supportedGenerationMethods.includes("generateContent")) {
        console.log(`- ${model.name}`);
      }
    });
  } catch (error) {
    console.error(
      "Error listing models:",
      error.response?.data || error.message,
    );
  }
};

listModels();
