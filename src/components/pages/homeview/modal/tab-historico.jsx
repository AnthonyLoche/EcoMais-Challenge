import { useMemo } from "react";
import {
  CheckCircle,
  Wrench,
  Thermometer,
  Zap,
  TrendingDown,
  Activity,
  OctagonX,
  ClipboardList,
} from "lucide-react";

const statusMap = {
  Operando: { color: "#22c55e", icon: CheckCircle },
  "Ferramenta Gasta": { color: "#a855f7", icon: Wrench },
  "Temp. Alta": { color: "#ef4444", icon: Thermometer },
  "Alerta de Potência": { color: "#f59e0b", icon: Zap },
  "Baixa Produção": { color: "#3b82f6", icon: TrendingDown },
  "Vibração Alta": { color: "#f97316", icon: Activity },
  Parada: { color: "#6b7280", icon: OctagonX },
  Manutenção: { color: "#0ea5e9", icon: ClipboardList },
};

const defaultStatus = { color: "#6b7280", icon: CheckCircle };

import { statusConfig } from "../card-machine";

export default function TabHistorico({ machine }) {
  const eventos = useMemo(() => {
    if (!machine?.dados?.length) return [];

    const cfg = statusMap[machine.status] ?? defaultStatus;

    return [...machine.dados].reverse().map((dado) => ({
      data: new Date(dado.timestamp).toLocaleString("pt-BR"),
      tipo: machine.status ?? "—",
      descricao: `RPM: ${dado.rpm} · Potência: ${dado.potencia}W · Temperatura: ${dado.temperatura}°C`,
      color: cfg.color,
      icon: cfg.icon,
    }));
  }, [machine]);

  if (eventos.length === 0) {
    return (
      <div className="flex items-center justify-center h-full">
        <p className="text-xs text-gray-400">Nenhum histórico disponível</p>
      </div>
    );
  }

  return (
    <div className="h-full overflow-y-auto pr-1 [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-track]:bg-gray-100 [&::-webkit-scrollbar-thumb]:bg-gray-300 [&::-webkit-scrollbar-thumb]:rounded-full hover:[&::-webkit-scrollbar-thumb]:bg-gray-400">
      <div className="flex flex-col gap-2">
        {eventos.map((evento, index) => (
          <HistoricoItem key={index} evento={evento} machine={machine} />
        ))}
      </div>
    </div>
  );
}

function HistoricoItem({ evento, machine }) {
  const Icon = evento.icon;
   const s = statusConfig[machine.status] ?? {
    color: "#6b7280",
    icon: () => null,
  };

  return (
    <div className="flex gap-3 p-3 rounded-xl border border-gray-100 hover:bg-gray-50 transition-colors">
      <div
        className="w-7 h-7 rounded-full flex items-center justify-center shrink-0 mt-0.5"
        style={{ backgroundColor: `${evento.color}15` }}
      >
        <Icon size={13} strokeWidth={2} style={{ color: s.color }} />
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between gap-2 mb-0.5">
          <span
            className="text-xs font-semibold"
            style={{ color: s.color }}
          >
            {evento.tipo}
          </span>
          <span className="text-[10px] text-gray-400">{evento.data}</span>
        </div>
        <p className="text-xs text-gray-600">{evento.descricao}</p>
      </div>
    </div>
  );
}
