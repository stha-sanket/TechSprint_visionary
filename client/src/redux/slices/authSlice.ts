import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

interface AuthState {
  user: any | null;
  token: string | null;
  loading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  user: null,
  token: localStorage.getItem("token"),
  loading: false,
  error: null,
};

export const APIURL = import.meta.env.VITE_BACKEND_URI;

export const loginUser = createAsyncThunk(
  "login/user",
  async (userData: any, ThunkAPI) => {
    try {
      const res = await axios.post(`${APIURL}/api/auth/login`, userData);
      return res.data;
    } catch (error: any) {
      return ThunkAPI.rejectWithValue(
        error.response?.data?.message || error.message || "Login failed",
      );
    }
  },
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        if (action.payload?.token) {
          state.token = action.payload.token;
          localStorage.setItem("token", action.payload.token);
        }
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const {} = authSlice.actions;
export default authSlice.reducer;
