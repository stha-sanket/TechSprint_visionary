import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

interface Message {
  role: "user" | "assistant";
  content: string;
  imageUrl?: string;
  timestamp: number;
}

interface GeminiState {
  messages: Message[];
  loading: boolean;
  error: string | null;
}

const initialState: GeminiState = {
  messages: [],
  loading: false,
  error: null,
};

// Thunk for sending messages with optional image
export const sendMessage = createAsyncThunk(
  "gemini/sendMessage",
  async ({ message, imageFile }: { message: string; imageFile?: File }) => {
    const formData = new FormData();
    formData.append("message", message);

    // Include past messages for context
    const pastMessages = JSON.parse(
      sessionStorage.getItem("geminiMessages") || "[]",
    );
    formData.append("pastMessages", JSON.stringify(pastMessages));

    if (imageFile) {
      formData.append("image", imageFile);
    }

    const response = await axios.post(
      `${import.meta.env.VITE_API_URL}/api/gemini`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      },
    );

    return {
      userMessage: message,
      assistantReply: response.data.reply,
      imageUrl: imageFile ? URL.createObjectURL(imageFile) : undefined,
    };
  },
);

const geminiSlice = createSlice({
  name: "gemini",
  initialState,
  reducers: {
    clearChat: (state) => {
      state.messages = [];
      state.error = null;
      sessionStorage.removeItem("geminiMessages");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(sendMessage.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        sendMessage.fulfilled,
        (
          state,
          action: PayloadAction<{
            userMessage: string;
            assistantReply: string;
            imageUrl?: string;
          }>,
        ) => {
          state.loading = false;

          const timestamp = Date.now();

          // Add user message
          state.messages.push({
            role: "user",
            content: action.payload.userMessage,
            imageUrl: action.payload.imageUrl,
            timestamp,
          });

          // Add assistant reply
          state.messages.push({
            role: "assistant",
            content: action.payload.assistantReply,
            timestamp: timestamp + 1,
          });

          // Persist to sessionStorage for context
          sessionStorage.setItem(
            "geminiMessages",
            JSON.stringify(state.messages),
          );
        },
      )
      .addCase(sendMessage.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to send message";
      });
  },
});

export const { clearChat } = geminiSlice.actions;
export default geminiSlice.reducer;
