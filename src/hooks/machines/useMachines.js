import { MachinesService } from "../../services";
import { useDispatch, useSelector } from "react-redux";
import { useMemo, useCallback } from "react";
import {
  setMachines,
  updateMachine as updateMachineAction,
  setSelectedMachine,
  clearSelectedMachine,
  setErrorUpdate,
  setErrorFetch
} from "../../store/slices/machinesSlice";
import { useLoading } from "../global/useLoading";
import { toast } from "sonner";

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
  Operando: { color: "#22c55e", icon: Activity },
  Parada: { color: "#ef4444", icon: Power },
  Manutenção: { color: "#f59e0b", icon: Wrench },
  "Temp. Alta": { color: "#f97316", icon: AlertTriangle },
  "Ferramenta Gasta": { color: "#eab308", icon: Wrench },
  "Alerta de Potência": { color: "#a855f7", icon: Power },
  "Baixa Produção": { color: "#3b82f6", icon: TrendingDown },
  "Vibração Alta": { color: "#ec4899", icon: Waves },
};

export function useMachines() {
  const dispatch = useDispatch();
  const { withLoading } = useLoading();
  const state = useSelector((state) => state.machines);

  const getErrorMessage = (error) => {
    if (!error?.response) {
      return "Sem conexão com o servidor ou bloqueio de CORS.";
    }
    return (
      error.response?.data?.message ||
      error.message ||
      "Erro inesperado."
    );
  };

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

        if (!machines || typeof machines !== "object") {
          throw new Error("Resposta inválida da API");
        }

        dispatch(setMachines(machines));
        return { status: true, data: machines };
      } catch (error) {
        const message = getErrorMessage(error);

        console.error("getMachines error:", error);

        dispatch(setErrorFetch(message));
        toast.error(message);

        return { status: false };
      }
    }, "Carregando máquinas...");
  }, [dispatch, withLoading]);

  const updateMachine = useCallback(
    async (id, payload) => {
      return withLoading(async () => {
        try {
          const updated = await MachinesService.updateMachine(id, payload);

          if (!updated || typeof updated !== "object") {
            throw new Error("Resposta inválida da API");
          }

          dispatch(updateMachineAction(updated));

          return { status: true, response: updated };
        } catch (error) {
          const message = getErrorMessage(error);

          console.error("updateMachine error:", error);

          dispatch(setErrorUpdate(message));

          toast.error(message);

          return { status: false };
        }
      }, "Atualizando máquina...");
    },
    [dispatch, withLoading],
  );

  const selectMachine = useCallback(
    (machine) => {
      dispatch(setSelectedMachine(machine));
    },
    [dispatch],
  );

  const clearSelectedMachineAction = useCallback(() => {
    dispatch(clearSelectedMachine());
  }, [dispatch]);

  function calcularMetricasMaquina(machine) {
    if (!machine?.dados?.length) {
      return {
        id: machine?.id || null,
        mediarpm: 0,
        mediapotencia: 0,
        mediatemperatura: 0,
        periodo: { inicio: null, fim: null, totalHoras: 0 },
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

    const totalHoras =
      (ultimoTimestamp - primeiroTimestamp) / (1000 * 60 * 60);

    return {
      id: machine.id,
      mediarpm: Number(mediarpm.toFixed(2)),
      mediapotencia: Number(mediapotencia.toFixed(2)),
      mediatemperatura: Number(mediatemperatura.toFixed(2)),
      periodo: {
        inicio: primeiroTimestamp.toISOString(),
        fim: ultimoTimestamp.toISOString(),
        totalHoras: Number(totalHoras.toFixed(2)),
      },
    };
  }

  function calcularMetricasMultiplasMaquinas(machines) {
    if (!Array.isArray(machines)) return [];
    return machines.map(calcularMetricasMaquina);
  }

  function calcularMetricasMaquinaFormatada(machine) {
    const metricas = calcularMetricasMaquina(machine);

    return {
      ...metricas,
      mediarpmFormatado: `${metricas.mediarpm.toLocaleString("pt-BR")} rpm`,
      mediapotenciaFormatado: `${metricas.mediapotencia.toLocaleString("pt-BR")} W`,
      mediatemperaturaFormatado: `${metricas.mediatemperatura.toLocaleString("pt-BR")} °C`,
      periodoFormatado: {
        inicio: metricas.periodo.inicio
          ? new Date(metricas.periodo.inicio).toLocaleString("pt-BR")
          : "-",
        fim: metricas.periodo.fim
          ? new Date(metricas.periodo.fim).toLocaleString("pt-BR")
          : "-",
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