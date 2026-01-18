import {
  createSlice,
  createAsyncThunk,
  type PayloadAction,
} from "@reduxjs/toolkit";
import axios from "axios";

interface Question {
  question: string;
  options: { option: string; isCorrect: boolean }[];
  answer: string;
  _id: string;
}

interface Assessment {
  _id: string;
  name: string;
  description: string;
  chapterNumber: number;
  subject: string;
  questions: Question[];
}

interface AssessmentState {
  assessment: Assessment | null;
  loading: boolean;
  error: string | null;
  currentQuestionIndex: number;
  userAnswers: { [questionId: string]: string }; // questionId -> selected option text
  score: number;
  showResults: boolean;
}

const initialState: AssessmentState = {
  assessment: null,
  loading: false,
  error: null,
  currentQuestionIndex: 0,
  userAnswers: {},
  score: 0,
  showResults: false,
};

export const fetchAssessment = createAsyncThunk(
  "assessment/fetchAssessment",
  async (
    { subjectId, chapterNumber }: { subjectId: string; chapterNumber: string },
    { rejectWithValue },
  ) => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/api/learn/subjects/${subjectId}/chapters/${chapterNumber}/assessment`,
      );
      return response.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch assessment",
      );
    }
  },
);

const assessmentSlice = createSlice({
  name: "assessment",
  initialState,
  reducers: {
    submitAnswer: (
      state,
      action: PayloadAction<{ questionId: string; answer: string }>,
    ) => {
      state.userAnswers[action.payload.questionId] = action.payload.answer;
    },
    nextQuestion: (state) => {
      if (
        state.assessment &&
        state.currentQuestionIndex < state.assessment.questions.length - 1
      ) {
        state.currentQuestionIndex += 1;
      } else {
        state.showResults = true;
        // Calculate score
        let correctCount = 0;
        state.assessment?.questions.forEach((q) => {
          const userAnswer = state.userAnswers[q._id];
          const correctOption = q.options.find((o) => o.isCorrect)?.option;
          if (userAnswer === correctOption) {
            correctCount++;
          }
        });
        state.score = correctCount;
      }
    },
    resetAssessment: (state) => {
      state.currentQuestionIndex = 0;
      state.userAnswers = {};
      state.score = 0;
      state.showResults = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAssessment.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchAssessment.fulfilled,
        (state, action: PayloadAction<Assessment>) => {
          state.loading = false;
          state.assessment = action.payload;
        },
      )
      .addCase(fetchAssessment.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { submitAnswer, nextQuestion, resetAssessment } =
  assessmentSlice.actions;
export default assessmentSlice.reducer;
