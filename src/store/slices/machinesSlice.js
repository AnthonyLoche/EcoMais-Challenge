import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  machines: [],
  loading: false,
  error: null,
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

    setError: (state, action) => {
      state.error = action.payload;
    },

    setSelectedMachine: (state, action) => {
      state.selectedMachine = action.payload;
    },

    clearSelectedMachine: (state) => {
      state.selectedMachine = null;
    },
  },
});

export const { setMachines, updateMachine, setLoading, setError, setSelectedMachine, clearSelectedMachine } =
  machinesSlice.actions;

export default machinesSlice.reducer;
