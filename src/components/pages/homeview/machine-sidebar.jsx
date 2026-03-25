/* eslint-disable no-unused-vars */
import { useState, useMemo, useCallback } from "react";
import {
  BarChart2,
  TrendingUp,
  ChevronRight,
  AlertTriangle,
  Waves,
  Zap,
  Wrench,
  Clock,
  Activity,
  Power,
  TrendingDown,
} from "lucide-react";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";
import { useMachines } from "../../../hooks";

const getStatusColor = (status) => {
  const colors = {
    Operando: "#22c55e",
    Parada: "#ef4444",
    Manutenção: "#f59e0b",
    "Temp. Alta": "#f97316",
    "Ferramenta Gasta": "#eab308",
    "Alerta de Potência": "#a855f7",
    "Baixa Produção": "#3b82f6",
    "Vibração Alta": "#ec4899",
  };
  return colors[status] || "#6b7280";
};

const getStatusIcon = (status) => {
  const icons = {
    Operando: Activity,
    Parada: Power,
    Manutenção: Wrench,
    "Temp. Alta": AlertTriangle,
    "Ferramenta Gasta": Wrench,
    "Alerta de Potência": Zap,
    "Baixa Produção": TrendingDown,
    "Vibração Alta": Waves,
  };
  return icons[status] || Activity;
};

const getAlertColor = (alert) => {
  if (alert.includes("Temp")) return "#ef4444";
  if (alert.includes("Vibração")) return "#ec4899";
  if (alert.includes("Potência")) return "#a855f7";
  if (alert.includes("Ferramenta")) return "#eab308";
  return "#94a3b8";
};

function DonutChart({ data }) {
  const total = data.reduce((s, d) => s + d.count, 0);
  if (total === 0) return null;

  const COLORS = data.map((d) => d.color);

  return (
    <div className="w-[72px] h-[72px]">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={25}
            outerRadius={32}
            paddingAngle={3}
            dataKey="count"
            stroke="none"
          >
            {data.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>
          <Tooltip
            formatter={(value) => [`${value} alertas`, ""]}
            contentStyle={{
              borderRadius: 8,
              fontSize: 11,
              padding: "4px 8px",
            }}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}

function MachineRow({ item, onClick }) {
  const Icon = item.icon;
  return (
    <button
      onClick={() => onClick && onClick(item)}
      className="w-full flex items-center gap-2.5 px-2.5 py-2 rounded-lg hover:bg-gray-50 transition-colors group"
    >
      <span
        className="w-6 h-6 rounded-full flex items-center justify-center shrink-0"
        style={{ backgroundColor: `${item.color}18` }}
      >
        <Icon size={12} strokeWidth={2.2} style={{ color: item.color }} />
      </span>
      <div className="flex-1 text-left min-w-0">
        <p className="text-xs font-medium text-gray-700 truncate leading-tight">
          {item.codigo}
        </p>
        <p className="text-[10px] font-medium" style={{ color: item.color }}>
          {item.status}
        </p>
      </div>
      <ChevronRight
        size={13}
        strokeWidth={2}
        className="text-gray-300 group-hover:text-gray-400 shrink-0"
      />
    </button>
  );
}

function SectionTitle({ label, count, color }) {
  return (
    <div className="flex items-center gap-1.5 px-1 mb-1">
      <span className="text-green-500 text-xs font-bold">+</span>
      <h3 className="text-[10px] font-semibold text-gray-500 uppercase tracking-wider flex-1">
        {label}
      </h3>
      {count !== undefined && count > 0 && (
        <span
          className="text-[10px] font-bold px-1.5 py-0.5 rounded-full"
          style={{
            color: color ?? "#6b7280",
            backgroundColor: `${color ?? "#6b7280"}15`,
          }}
        >
          {count}
        </span>
      )}
    </div>
  );
}

export default function MachineSidebar() {
  const [tab, setTab] = useState("analise");
  const { state, selectMachine, calcularMetricasMaquinaFormatada } =
    useMachines();
  const machines = state.machines ?? [];

  const processMachineData = useCallback((machinesList) => {
    if (!machinesList.length) {
      return { criticos: [], atencao: [], resumo: [], metricas: [] };
    }

    const statusCriticos = [
      "Temp. Alta",
      "Vibração Alta",
      "Alerta de Potência",
      "Ferramenta Gasta",
    ];
    const statusAtencao = ["Manutenção", "Baixa Produção", "Parada"];

    const criticosList = machinesList
      .filter((m) => statusCriticos.includes(m.status))
      .map((m) => ({
        id: m.id,
        codigo: m.codigo,
        status: m.status,
        color: getStatusColor(m.status),
        icon: getStatusIcon(m.status),
      }));

    const atencaoList = machinesList
      .filter((m) => statusAtencao.includes(m.status))
      .map((m) => ({
        id: m.id,
        codigo: m.codigo,
        status: m.status,
        color: getStatusColor(m.status),
        icon: getStatusIcon(m.status),
      }));

    const alertasMap = {};
    machinesList.forEach((m) => {
      m.alertas?.forEach((alerta) => {
        alertasMap[alerta] = (alertasMap[alerta] || 0) + 1;
      });
    });

    const resumoList = Object.entries(alertasMap).map(([label, count]) => ({
      name: label,
      label,
      count,
      color: getAlertColor(label),
    }));

    const operando = machinesList.filter((m) => m.status === "Operando").length;
    const alerta = machinesList.filter((m) =>
      statusCriticos.includes(m.status),
    ).length;
    const paradas = machinesList.filter(
      (m) => m.status === "Parada" || m.status === "Manutenção",
    ).length;

    const metricasList = [
      {
        label: "Operando",
        value: operando,
        total: machinesList.length,
        color: "#22c55e",
      },
      {
        label: "Em alerta",
        value: alerta,
        total: machinesList.length,
        color: "#f97316",
      },
      {
        label: "Paradas",
        value: paradas,
        total: machinesList.length,
        color: "#ef4444",
      },
    ];

    return {
      criticos: criticosList,
      atencao: atencaoList,
      resumo: resumoList,
      metricas: metricasList,
    };
  }, []);

  const { criticos, atencao, resumo, metricas } = useMemo(() => {
    return processMachineData(machines);
  }, [machines, processMachineData]);

  const previsoes = useMemo(() => {
    const predictions = [];

    machines.forEach((machine) => {
      const metricas = calcularMetricasMaquinaFormatada(machine);

      if (metricas.mediatemperatura > 70) {
        predictions.push({
          descricao: "Risco de superaquecimento",
          maquina: machine.codigo,
          prazo: "Imediato",
          prioridade: "alta",
        });
      } else if (metricas.mediatemperatura > 60) {
        predictions.push({
          descricao: "Temperatura elevada - monitorar",
          maquina: machine.codigo,
          prazo: "2 dias",
          prioridade: "media",
        });
      }

      if (metricas.mediarpm < 1000 && machine.status === "Operando") {
        predictions.push({
          descricao: "Baixa rotação detectada",
          maquina: machine.codigo,
          prazo: "3 dias",
          prioridade: "media",
        });
      }

      if (metricas.mediapotencia > 1400) {
        predictions.push({
          descricao: "Consumo de energia elevado",
          maquina: machine.codigo,
          prazo: "5 dias",
          prioridade: "baixa",
        });
      }

      if (metricas.periodo.totalHoras > 100) {
        predictions.push({
          descricao: "Manutenção preventiva recomendada",
          maquina: machine.codigo,
          prazo: "7 dias",
          prioridade: "media",
        });
      }
    });

    const priorityOrder = { alta: 0, media: 1, baixa: 2 };
    return predictions
      .sort((a, b) => priorityOrder[a.prioridade] - priorityOrder[b.prioridade])
      .slice(0, 10);
  }, [machines, calcularMetricasMaquinaFormatada]);

  const handleMachineClick = useCallback(
    (machine) => {
      const fullMachine = machines.find((m) => m.id === machine.id);
      if (fullMachine) {
        selectMachine(fullMachine);
      }
    },
    [machines, selectMachine],
  );

  if (state.loading) {
    return (
      <div className="w-full h-full bg-white rounded-xl border border-gray-100 shadow-sm flex items-center justify-center">
        <p className="text-gray-400 text-sm">Carregando...</p>
      </div>
    );
  }

  return (
    <div className="w-full bg-white rounded-xl border border-gray-100 shadow-sm flex flex-col lg:h-full lg:overflow-hidden">
      <div className="flex items-center border-b border-gray-100 px-2 pt-2 shrink-0">
        {[
          { key: "analise", label: "Análise", icon: BarChart2 },
          { key: "previsoes", label: "Previsões", icon: TrendingUp },
        ].map(({ key, label, icon: Icon }) => (
          <button
            key={key}
            onClick={() => setTab(key)}
            className={`flex items-center gap-1.5 px-3 py-2 text-sm font-medium rounded-t-lg transition-colors
              ${
                tab === key
                  ? "text-green-600 border-b-2 border-green-500 -mb-px bg-white"
                  : "text-gray-400 hover:text-gray-600"
              }`}
          >
            <Icon size={13} strokeWidth={2} />
            {label}
          </button>
        ))}
        <button className="ml-auto p-1.5 text-gray-400 hover:text-gray-600 transition-colors">
          <ChevronRight size={15} strokeWidth={2} />
        </button>
      </div>

      <div className="flex-1 flex flex-col overflow-hidden p-3 gap-3">
        {tab === "analise" ? (
          <>
            <div className="grid grid-cols-3 gap-2 shrink-0">
              {metricas.map(({ label, value, total, color }) => (
                <div
                  key={label}
                  className="rounded-lg p-2.5 border flex flex-col gap-1"
                  style={{
                    borderColor: `${color}25`,
                    backgroundColor: `${color}08`,
                  }}
                >
                  <span className="text-[10px] text-gray-400 font-medium">
                    {label}
                  </span>
                  <span
                    className="text-lg font-bold leading-none"
                    style={{ color }}
                  >
                    {value}
                  </span>
                  <div className="h-1 rounded-full bg-gray-100 overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all"
                      style={{
                        width: `${(value / total) * 100}%`,
                        backgroundColor: color,
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>

            {criticos.length > 0 && (
              <>
                <div className="flex flex-col shrink-0">
                  <SectionTitle
                    label="Críticos"
                    count={criticos.length}
                    color="#ef4444"
                  />
                  <div className="flex flex-col gap-0.5">
                    {criticos.map((m) => (
                      <MachineRow
                        key={m.id}
                        item={m}
                        onClick={handleMachineClick}
                      />
                    ))}
                  </div>
                </div>
                <div className="h-px bg-gray-100 shrink-0" />
              </>
            )}

            {atencao.length > 0 && (
              <>
                <div className="flex flex-col shrink-0">
                  <SectionTitle
                    label="Atenção"
                    count={atencao.length}
                    color="#f59e0b"
                  />
                  <div className="flex flex-col gap-0.5">
                    {atencao.map((m) => (
                      <MachineRow
                        key={m.id}
                        item={m}
                        onClick={handleMachineClick}
                      />
                    ))}
                  </div>
                </div>
                <div className="h-px bg-gray-100 shrink-0" />
              </>
            )}

            {resumo.length > 0 && (
              <div className="shrink-0">
                <h3 className="text-[10px] font-semibold text-gray-500 uppercase tracking-wider px-1 mb-2">
                  Resumo dos Alertas
                </h3>
                <div className="flex items-center gap-3 px-1">
                  <DonutChart data={resumo} />
                  <div className="flex flex-col gap-1.5 flex-1 min-w-0">
                    {resumo.map(({ label, count, color }) => (
                      <div
                        key={label}
                        className="flex items-center justify-between gap-2"
                      >
                        <div className="flex items-center gap-1.5 min-w-0">
                          <span
                            className="w-1.5 h-1.5 rounded-full shrink-0"
                            style={{ backgroundColor: color }}
                          />
                          <span className="text-[10px] text-gray-500 truncate">
                            {label}
                          </span>
                        </div>
                        <span className="text-[10px] font-bold text-gray-700 shrink-0">
                          {count}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </>
        ) : (
          <div className="flex flex-col min-h-0 flex-1">
            <SectionTitle
              label="Previsões"
              count={previsoes.length}
              color="#3b82f6"
            />
            <div className="flex flex-col gap-0.5 overflow-y-auto [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-track]:bg-gray-100 [&::-webkit-scrollbar-thumb]:bg-gray-300 [&::-webkit-scrollbar-thumb]:rounded-full">
              {previsoes.length > 0 ? (
                previsoes.map((p, i) => (
                  <button
                    key={i}
                    className={`w-full flex items-center gap-2.5 px-2.5 py-2 rounded-lg hover:bg-gray-50 transition-colors group
                      ${p.prioridade === "alta" ? "border-l-2 border-red-400" : ""}`}
                  >
                    <span
                      className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0
                      ${p.prioridade === "alta" ? "bg-red-50" : "bg-blue-50"}`}
                    >
                      <Clock
                        size={11}
                        strokeWidth={2}
                        className={
                          p.prioridade === "alta"
                            ? "text-red-400"
                            : "text-blue-400"
                        }
                      />
                    </span>
                    <div className="flex-1 text-left min-w-0">
                      <p className="text-xs font-medium text-gray-700 truncate leading-tight">
                        {p.descricao}
                      </p>
                      <p className="text-[10px] text-gray-400 truncate">
                        {p.maquina}
                      </p>
                    </div>
                    <span
                      className={`text-[10px] font-semibold shrink-0 px-1.5 py-0.5 rounded-full
                      ${p.prioridade === "alta" ? "bg-red-50 text-red-500" : "bg-blue-50 text-blue-400"}`}
                    >
                      {p.prazo}
                    </span>
                  </button>
                ))
              ) : (
                <div className="flex flex-col items-center justify-center py-8 gap-2">
                  <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center">
                    <TrendingUp size={20} className="text-gray-400" />
                  </div>
                  <p className="text-xs text-gray-400">
                    Nenhuma previsão no momento
                  </p>
                  <p className="text-[10px] text-gray-300">
                    Todas as máquinas operando normalmente
                  </p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
