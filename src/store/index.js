import { configureStore } from "@reduxjs/toolkit";
import machinesReducer from "./slices/machinesSlice.js";
import authReducer from "./slices/authSlice.js";

export const store = configureStore({
  reducer: {
    machines: machinesReducer,
    auth: authReducer,
  },
});