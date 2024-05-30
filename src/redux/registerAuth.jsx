// src/redux/registerUser.js
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

// Enum for different statuses
export const STATUSES = Object.freeze({
    IDLE: 'idle',
    ERROR: 'error',
    LOADING: 'loading'
});

// Define an async thunk for user registration
export const registerUser = createAsyncThunk('user/register', async (userData) => {
    try {
        const response = await fetch(`${server}/api/v1/user/new`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(userData),
        });
        if (!response.ok) {
            throw new Error('Failed to register user');
        }
        const data = await response.json();
        console.log(data);
        return data;
    } catch (error) {
        throw new Error('Failed to register user');
    }
});

// Slice for managing registration state
const registerSlice = createSlice({
    name: 'registerUser',
    initialState: {
        data: null, // User data
        message: null, // Message received after registration
        status: 'idle', // Status of the async operation
        error: null // Error message if any
    },
    reducers: {}, // Additional reducers can be added here if needed
    extraReducers: (builder) => {
        // Handling pending action for registerUser
        builder.addCase(registerUser.pending, (state) => {
            state.status = 'loading';
        });
        // Handling fulfilled action for registerUser
        builder.addCase(registerUser.fulfilled, (state, action) => {
            state.data = action.payload;
            state.message = action.payload.message;
            state.status = 'idle';
        });
        // Handling rejected action for registerUser
        builder.addCase(registerUser.rejected, (state, action) => {
            state.status = 'error';
            state.error = action.error.message;
        });
    }
});

export default registerSlice.reducer;

// Selector to get the message from the registration state
export const selectRegisterMessage = (state) => state.registerUser.message;
