import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import chapterReducer from "./slices/chapterSlice";
import assessmentReducer from "./slices/assessmentSlice";
import geminiReducer from "./slices/geminiSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    chapter: chapterReducer,
    assessment: assessmentReducer,
    gemini: geminiReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
