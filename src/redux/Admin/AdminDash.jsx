import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import server from "../../config";
// import { useNavigate } from "react-router-dom";

// Enum for different statuses
export const STATUSES = Object.freeze({
  IDLE: "idle",
  ERROR: "error",
  LOADING: "loading",
});

export const fetchAdvertisement = createAsyncThunk("pro/fetch", async () => {
  try {
    const res = await fetch(`${server}/api/v1/admin/allads`, {
      method: "GET",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        ...(localStorage.getItem("token") && {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        }),
      },
    });
    const data = await res.json();
    // const navigate = useNavigate();
    // navigate("/admin");
    // console.log(data.status_code, "fetchAd");

    return data.Advertisements;
  } catch (error) {
    throw error;
  }
});

const proSlice = createSlice({
  name: "ads",
  initialState: {
    data: [], // Employee data
    status: "", // Status of the async operation
    status_code: null,
  },
  reducers: {
    // Reducer to set employee data
    setPro(state, action) {
      state.data = action.payload;
    },
    // Reducer to set status
    setStatus(state, action) {
      state.status = action.payload;
    },
  },
  extraReducers: (builder) => {
    // Handling pending action for fetchAdvertisement
    builder.addCase(fetchAdvertisement.pending, (state, action) => {
      state.status = STATUSES.LOADING;
    });
    // Handling fulfilled action for fetchAdvertisement
    builder.addCase(fetchAdvertisement.fulfilled, (state, action) => {
      state.data = action.payload;
      state.status = STATUSES.IDLE;
      state.status_code = action.payload.status_code;
      console.log("payload", action.payload);
    });
    // Handling rejected action for fetchAdvertisement
    builder.addCase(fetchAdvertisement.rejected, (state, action) => {
      state.status = STATUSES.ERROR;
    });
  },
});

// Export slice actions
export const { setPro, setStatus } = proSlice.actions;
export default proSlice.reducer;
