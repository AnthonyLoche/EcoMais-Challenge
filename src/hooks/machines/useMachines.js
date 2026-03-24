import { MachinesService } from "../../services";
import { useDispatch, useSelector } from "react-redux";
import { useMemo, useCallback } from "react";
import {
  setMachines,
  updateMachine as updateMachineAction,
  setError,
  setSelectedMachine,
  clearSelectedMachine,
} from "../../store/slices/machinesSlice";
import { useLoading } from "../global/useLoading";

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
  const { withLoading } = useLoading();
  const state = useSelector((state) => state.machines);

  const machinesByStatus = useMemo(() => {
    const machines = state.machines || {};
    const list = machines.machines || machines;

    const statusMap = {};

    if (Array.isArray(list)) {
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
    }

    return Object.values(statusMap);
  }, [state.machines]);

  const getMachines = useCallback(async () => {
    return withLoading(async () => {
      try {
        const machines = await MachinesService.getMachines();
        dispatch(setMachines(machines));
        return machines;
      } catch (error) {
        dispatch(setError(error.message));
        throw error;
      }
    }, "Carregando máquinas...");
  }, [dispatch, withLoading]);

  const updateMachine = useCallback(async (id, payload) => {
    return withLoading(async () => {
      try {
        const updated = await MachinesService.updateMachine(id, payload);
        dispatch(updateMachineAction(updated));
        return updated;
      } catch (error) {
        dispatch(setError(error.message));
        throw error;
      }
    }, "Atualizando máquina...");
  }, [dispatch, withLoading]);

  const selectMachine = useCallback(
    (machine) => {
      console.log("Selecionando máquina:", machine?.codigo);
      dispatch(setSelectedMachine(machine));
    },
    [dispatch],
  );

  const clearSelectedMachineAction = useCallback(() => {
    console.log("Limpando máquina selecionada");
    dispatch(clearSelectedMachine());
  }, [dispatch]);

  function calcularMetricasMaquina(machine) {
    if (!machine || !machine.dados || machine.dados.length === 0) {
      return {
        id: machine?.id || null,
        mediarpm: 0,
        mediapotencia: 0,
        mediatemperatura: 0,
        periodo: {
          inicio: null,
          fim: null,
          totalHoras: 0,
        },
      };
    }

    const dados = machine.dados;

    const dadosOrdenados = [...dados].sort(
      (a, b) => new Date(a.timestamp) - new Date(b.timestamp),
    );

    const somaRpm = dados.reduce((acc, curr) => acc + curr.rpm, 0);
    const somaPotencia = dados.reduce((acc, curr) => acc + curr.potencia, 0);
    const somaTemperatura = dados.reduce(
      (acc, curr) => acc + curr.temperatura,
      0,
    );

    const mediarpm = somaRpm / dados.length;
    const mediapotencia = somaPotencia / dados.length;
    const mediatemperatura = somaTemperatura / dados.length;

    const primeiroTimestamp = new Date(dadosOrdenados[0].timestamp);
    const ultimoTimestamp = new Date(
      dadosOrdenados[dadosOrdenados.length - 1].timestamp,
    );

    const diferencaMs = ultimoTimestamp - primeiroTimestamp;
    const totalHoras = diferencaMs / (1000 * 60 * 60);

    return {
      id: machine.id,
      mediarpm: Math.round(mediarpm * 100) / 100,
      mediapotencia: Math.round(mediapotencia * 100) / 100,
      mediatemperatura: Math.round(mediatemperatura * 100) / 100,
      periodo: {
        inicio: primeiroTimestamp.toISOString(),
        fim: ultimoTimestamp.toISOString(),
        totalHoras: Math.round(totalHoras * 100) / 100,
      },
    };
  }

  function calcularMetricasMultiplasMaquinas(machines) {
    if (!machines || !Array.isArray(machines)) {
      return [];
    }

    return machines.map((machine) => calcularMetricasMaquina(machine));
  }

  function calcularMetricasMaquinaFormatada(machine) {
    const metricas = calcularMetricasMaquina(machine);

    return {
      ...metricas,
      mediarpmFormatado: `${metricas.mediarpm.toLocaleString("pt-BR")} rpm`,
      mediapotenciaFormatado: `${metricas.mediapotencia.toLocaleString("pt-BR")} W`,
      mediatemperaturaFormatado: `${metricas.mediatemperatura.toLocaleString("pt-BR")} °C`,
      periodoFormatado: {
        inicio: new Date(metricas.periodo.inicio).toLocaleString("pt-BR"),
        fim: new Date(metricas.periodo.fim).toLocaleString("pt-BR"),
        totalHoras: `${metricas.periodo.totalHoras.toLocaleString("pt-BR")} horas`,
      },
    };
  }

  return {
    state,
    machinesByStatus,
    selectedMachine: state.selectedMachine,
    selectMachine,
    clearSelectedMachine: clearSelectedMachineAction,
    getMachines,
    updateMachine,
    calcularMetricasMaquina,
    calcularMetricasMultiplasMaquinas,
    calcularMetricasMaquinaFormatada,
  };
}