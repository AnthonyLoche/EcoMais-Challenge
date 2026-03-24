import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  machines: [],
  loading: false,
  errorFetch: null,
  errorUpdate: null,
  selectedMachine: null,
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

      const index = state.machines.findIndex((m) => m.id === updated.id);

      if (index !== -1) {
        state.machines[index] = updated;
      }
    },

    setLoading: (state, action) => {
      state.loading = action.payload;
    },

    setErrorFetch: (state, action) => {
      state.errorFetch = action.payload;
    },

    setErrorUpdate: (state, action) => {
      state.errorUpdate = action.payload;
    },

    setSelectedMachine: (state, action) => {
      state.selectedMachine = action.payload;
    },

    clearSelectedMachine: (state) => {
      state.selectedMachine = null;
    },
  },
});

export const {
  setMachines,
  updateMachine,
  setLoading,
  setSelectedMachine,
  clearSelectedMachine,
  setErrorUpdate,
  setErrorFetch
} = machinesSlice.actions;

export default machinesSlice.reducer;
