import { configureStore } from "@reduxjs/toolkit";
import machinesReducer from "./slices/machinesSlice.js";

export const store = configureStore({
  reducer: {
    machines: machinesReducer,
  },
});