import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import server from "../config";
export const STATUSES = Object.freeze({
  IDLE: "idle",
  ERROR: "error",
  LOADING: "loading",
});

export const addAdvertisement = createAsyncThunk(
  "ads/addAdvertisement",
  async (adsData) => {
    try {
      const response = await fetch(`${server}/api/v1/user/ads`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(adsData),
      });
      if (!response.ok) {
        throw new Error("Failed to add advertisement");
      }
      const data = await response.json();
      return data;
    } catch (error) {
      throw new Error("Failed to add advertisement");
    }
  }
);

const adsAuthSlice = createSlice({
  name: "adsAuth",
  initialState: {
    data: null,
    message: null,
    status: STATUSES.IDLE,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addAdvertisement.pending, (state) => {
        state.status = STATUSES.LOADING;
      })
      .addCase(addAdvertisement.fulfilled, (state, action) => {
        state.data = action.payload;
        state.message = action.payload.message;
        state.status = STATUSES.IDLE;
      })
      .addCase(addAdvertisement.rejected, (state, action) => {
        state.status = STATUSES.ERROR;
        state.error = action.error.message;
      });
  },
});

export default adsAuthSlice.reducer;

export const selectRegisterMessage = (state) => state.adsAuth.message;
