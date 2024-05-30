import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import server from "../config";
// Enum for different statuses
export const STATUSES = Object.freeze({
  IDLE: "idle",
  ERROR: "error",
  LOADING: "loading",
});


// Define an async thunk for user login
export const loginUser = createAsyncThunk(
  "user/login",
  async (userData, { rejectWithValue }) => {
    try {
      const response = await fetch(`${server}/api/v1/user/login`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });
      if (!response.ok) {
        throw new Error("Failed to log in user");
      }
      const data = await response.json();
      return data;
    } catch (error) {
      return rejectWithValue("Failed to log in user");
    }
  }
);

// Slice for managing user state
const userSlice = createSlice({
  name: "userLogin",
  initialState: {
    data: null, // User data
    message: null, // Message received after login
    status: "idle", // Status of the async operation
    error: null, // Error message if any
  },
  reducers: {}, // Additional reducers can be added here if needed
  extraReducers: (builder) => {
    // Handling pending action for loginUser
    builder.addCase(loginUser.pending, (state) => {
      state.status = "loading";
    });
    // Handling fulfilled action for loginUser
    builder.addCase(loginUser.fulfilled, (state, action) => {
      state.data = action.payload;
      state.message = action.payload.message;
      state.data.user = action.payload.user; // Correctly set user object
      state.status = "idle";
      console.log("User State:", state); // Log entire user state after login
    });
    // Handling rejected action for loginUser
    builder.addCase(loginUser.rejected, (state, action) => {
      state.status = "error";
      state.error = action.payload;
    });
  },
});

export default userSlice.reducer;

// Selector to get the message from the user state
export const selectMessage = (state) => state.userLogin.message;
