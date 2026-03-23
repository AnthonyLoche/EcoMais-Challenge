import { MachinesService } from "../../services";
import { useDispatch, useSelector } from "react-redux";
import { useMemo } from "react";
import {
  setMachines,
  updateMachine as updateMachineAction,
  setLoading,
  setError,
} from "../../store/slices/machinesSlice";

// 🎨 CONFIG CENTRAL (igual enums/config do backend)
import {
  Package,
  Wrench,
  AlertTriangle,
  Activity,
  Power,
  TrendingDown,
  Waves,
} from "lucide-react";

const statusConfig = {
  Operando: {
    color: "#22c55e",
    icon: Activity,
  },
  Parada: {
    color: "#ef4444",
    icon: Power,
  },
  Manutenção: {
    color: "#f59e0b",
    icon: Wrench,
  },
  "Temp. Alta": {
    color: "#f97316",
    icon: AlertTriangle,
  },
  "Ferramenta Gasta": {
    color: "#eab308",
    icon: Wrench,
  },
  "Alerta de Potência": {
    color: "#a855f7",
    icon: Power,
  },
  "Baixa Produção": {
    color: "#3b82f6",
    icon: TrendingDown,
  },
  "Vibração Alta": {
    color: "#ec4899",
    icon: Waves,
  },
};

export function useMachines() {
  const dispatch = useDispatch();
  const state = useSelector((state) => state.machines);

  const machinesByStatus = useMemo(() => {
    const machines = state.machines || {};
    const list = machines.machines || machines; // fallback se vier direto array

    const statusMap = {};

    list.forEach((machine) => {
      const status = machine.status;

      if (!statusMap[status]) {
        const config = statusConfig[status] || {
          color: "#64748b",
          icon: Package,
        };

        statusMap[status] = {
          status,
          count: 0,
          machines: [],
          color: config.color,
          icon: config.icon,
        };
      }

      statusMap[status].count++;
      statusMap[status].machines.push(machine);
    });

    return Object.values(statusMap);
  }, [state.machines]);

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
    machinesByStatus,
    getMachines,
    updateMachine,
  };
}