import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  machines: [],
  loading: false,
  error: null,
};

const machinesSlice = createSlice({
  name: "machines",
  initialState,
  reducers: {
    setMachines: (state, action) => {
      state.machines = action.payload;
    },

    updateMachine: (state, action) => {
      const updated = action.payload;

      const index = state.machines.findIndex(
        (m) => m.id === updated.id
      );

      if (index !== -1) {
        state.machines[index] = updated;
      }
    },

    setLoading: (state, action) => {
      state.loading = action.payload;
    },

    setError: (state, action) => {
      state.error = action.payload;
    },
  },
});

export const {
  setMachines,
  updateMachine,
  setLoading,
  setError,
} = machinesSlice.actions;

export default machinesSlice.reducer;