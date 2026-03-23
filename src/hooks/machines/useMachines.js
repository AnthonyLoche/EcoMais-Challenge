import { MachinesService } from "../../services";
import { useDispatch, useSelector } from "react-redux";
import {
  setMachines,
  updateMachine as updateMachineAction,
  setLoading,
  setError,
} from "../../store/slices/machinesSlice";

export function useMachines() {
  const dispatch = useDispatch();
  const state = useSelector((state) => state.machines);

  const getMachines = async () => {
    dispatch(setLoading(true));
    try {
      const machines = await MachinesService.getMachines();
      dispatch(setMachines(machines));
    } catch (error) {
      dispatch(setError(error.message));
    } finally {
      dispatch(setLoading(false));
    }
  };

  const updateMachine = async (id, payload) => {
    dispatch(setLoading(true));
    try {
      const updated = await MachinesService.updateMachine(id, payload);
      dispatch(updateMachineAction(updated));
    } catch (error) {
      dispatch(setError(error.message));
    } finally {
      dispatch(setLoading(false));
    }
  };

  return {
    state,
    getMachines,
    updateMachine,
  };
}
