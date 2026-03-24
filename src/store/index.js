import { configureStore } from "@reduxjs/toolkit";
import machinesReducer from "./slices/machinesSlice.js";
import authReducer from "./slices/authSlice.js";
import loadingReducer from "./slices/loadingSlice.js";

export const store = configureStore({
  reducer: {
    machines: machinesReducer,
    auth: authReducer,
    loading: loadingReducer,
  },
});