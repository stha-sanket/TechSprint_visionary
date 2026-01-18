import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import chapterReducer from "./slices/chapterSlice";
import assessmentReducer from "./slices/assessmentSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    chapter: chapterReducer,
    assessment: assessmentReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
