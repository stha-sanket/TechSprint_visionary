import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

interface ChapterDescription {
  reactants: string[];
  name: string;
  products: string;
  description: string;
  effect: string;
  color: string;
  productModelId: string;
}

interface Chapter {
  _id: string;
  name: string;
  description: ChapterDescription;
  chapterNumber: number;
  subject: string;
  topic: string;
  threeDModels: string[];
}

interface Chapters {
  id: string;
  identification: string;
  name: string;
}

interface ChapterState {
  chapter: Chapter[];
  chapters: Chapters[];
  loading: boolean;
  error: string | null;
}

const initialState: ChapterState = {
  chapter: [],
  chapters: [],
  loading: false,
  error: null,
};

const APIURL = import.meta.env.VITE_BACKEND_URL;

export const fetchChaptersBySubject = createAsyncThunk(
  "chapters/fetchChaptersBySubject",
  async (subject: string, { rejectWithValue }) => {
    try {
      console.log(APIURL);
      const response = await axios.get(
        `${APIURL}/api/learn/subjects/${subject}/chapters`,
      );
      if (!response.data) throw new Error("Network response was not ok");
      return response.data as Chapter[];
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  },
);

export const fetchChaptersBySubjectAndId = createAsyncThunk(
  "chapters/fetchChaptersBySubjectAndId",
  async (
    { subject, id }: { subject: string; id: string },
    { rejectWithValue },
  ) => {
    try {
      const response = await axios.get(
        `${APIURL}/api/learn/subject/${subject}/chapters/${id}`,
      );
      if (!response.data) throw new Error("Network response was not ok");
      return response.data as Chapter;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  },
);

const chapterSlice = createSlice({
  name: "chapters",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchChaptersBySubject.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchChaptersBySubject.fulfilled, (state, action) => {
        state.loading = false;
        state.chapters = action.payload.map((ch) => ({
          id: ch._id,
          identification: ch.topic,
          name: ch.name,
        }));
      })
      .addCase(fetchChaptersBySubject.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(fetchChaptersBySubjectAndId.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchChaptersBySubjectAndId.fulfilled, (state, action) => {
        state.loading = false;
        state.chapter = [action.payload];
      })
      .addCase(fetchChaptersBySubjectAndId.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default chapterSlice.reducer;
