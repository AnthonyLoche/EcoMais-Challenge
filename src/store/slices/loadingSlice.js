// store/slices/loadingSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoading: false,
  loadingCount: 0, 
  loadingMessages: [], 
};

const loadingSlice = createSlice({
  name: "loading",
  initialState,
  reducers: {
    startLoading: (state, action) => {
      state.loadingCount += 1;
      state.isLoading = true;
      
      if (action.payload?.message) {
        state.loadingMessages.push(action.payload.message);
      }
    },
    stopLoading: (state, action) => {
      state.loadingCount = Math.max(0, state.loadingCount - 1);
      state.isLoading = state.loadingCount > 0;
      
      if (action.payload?.message) {
        const index = state.loadingMessages.indexOf(action.payload.message);
        if (index !== -1) {
          state.loadingMessages.splice(index, 1);
        }
      }
    },
    resetLoading: (state) => {
      state.isLoading = false;
      state.loadingCount = 0;
      state.loadingMessages = [];
    },
    setLoadingMessage: (state, action) => {
      if (action.payload) {
        state.loadingMessages = [action.payload];
      }
    },
  },
});

export const { startLoading, stopLoading, resetLoading, setLoadingMessage } = loadingSlice.actions;
export default loadingSlice.reducer;