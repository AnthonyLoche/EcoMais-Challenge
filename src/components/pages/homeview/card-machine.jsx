import { MapPin, Clock, Wifi } from "lucide-react";
import {
  Package,
  Wrench,
  AlertTriangle,
  Activity,
  Power,
  TrendingDown,
  Waves,
  ChevronRight,
} from "lucide-react";

// eslint-disable-next-line react-refresh/only-export-components
export const statusConfig = {
  Operando: { color: "#22c55e", icon: Activity },
  Parada: { color: "#ef4444", icon: Power },
  Manutenção: { color: "#f59e0b", icon: Wrench },
  "Temp. Alta": { color: "#f97316", icon: AlertTriangle },
  "Ferramenta Gasta": { color: "#eab308", icon: Wrench },
  "Alerta de Potência": { color: "#a855f7", icon: Power },
  "Baixa Produção": { color: "#3b82f6", icon: TrendingDown },
  "Vibração Alta": { color: "#ec4899", icon: Waves },
};

function formatDate(iso) {
  return new Date(iso).toLocaleString("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export default function CardMachine({ machine, onSelectMachine }) {
  const s = statusConfig[machine.status] ?? { color: "#6b7280", icon: Package };
  const StatusIcon = s.icon;

  const handleSelect = () => {
    if (onSelectMachine) {
      onSelectMachine(machine);
    }
  };

  return (
    <div className="bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow duration-200 p-5 flex flex-col h-full">
      {/* Header - altura fixa para o cabeçalho */}
      <div className="flex items-start justify-between gap-3 min-h-[50px]">
        <div className="flex-1 min-w-0">
          <p className="text-xs text-gray-400 font-medium uppercase tracking-wider mb-0.5">
            #{machine.id}
          </p>
          <h3
            className="text-base font-semibold text-gray-800 leading-tight truncate"
            title={machine.codigo}
          >
            {machine.codigo}
          </h3>
        </div>

        {/* Status badge */}
        <span
          className="flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold shrink-0 border whitespace-nowrap"
          style={{
            color: s.color,
            backgroundColor: `${s.color}14`,
            borderColor: `${s.color}30`,
          }}
        >
          <StatusIcon size={12} strokeWidth={2.2} />
          {machine.status}
        </span>
      </div>

      {/* Divider with status color accent */}
      <div
        className="h-px w-full rounded-full my-2"
        style={{ backgroundColor: `${s.color}25` }}
      />

      {/* Info rows */}
      <div className="flex flex-col gap-2 mb-3">
        <div className="flex items-center gap-2 text-sm text-gray-500">
          <MapPin
            size={14}
            strokeWidth={1.8}
            className="text-gray-400 shrink-0"
          />
          <span className="truncate" title={machine.local}>
            {machine.local}
          </span>
        </div>
        <div className="flex items-center gap-2 text-sm text-gray-500">
          <Clock
            size={14}
            strokeWidth={1.8}
            className="text-gray-400 shrink-0"
          />
          <div className="flex flex-col">
            <span className="text-xs text-gray-400 uppercase tracking-wider">
              Última atualização
            </span>
            <span className="text-sm">
              {formatDate(machine.ultimaAtualizacao)}
            </span>
          </div>
        </div>
      </div>

      {/* Alertas */}
      <div className="mt-auto">
        {machine.alertas.length > 0 ? (
          <div
            className="rounded-lg px-3 py-2 border"
            style={{ backgroundColor: "#f975161a", borderColor: "#f9751630" }}
          >
            <p
              className="text-xs font-semibold mb-1"
              style={{ color: "#f97316" }}
            >
              {machine.alertas.length} alerta
              {machine.alertas.length > 1 ? "s" : ""}
            </p>
            <ul className="space-y-0.5 max-h-[60px] overflow-y-auto [&::-webkit-scrollbar]:w-1 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-gray-300">
              {machine.alertas.map((alerta, i) => (
                <li
                  key={i}
                  className="text-xs flex items-start gap-1 truncate"
                  style={{ color: "#f97316cc" }}
                >
                  <span className="mt-0.5 shrink-0">•</span>
                  <span className="truncate" title={alerta}>
                    {alerta}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        ) : (
          <div
            className="flex items-center gap-2 text-xs rounded-lg px-3 py-2 border"
            style={{
              color: "#22c55e",
              backgroundColor: "#22c55e14",
              borderColor: "#22c55e30",
            }}
          >
            <Wifi size={13} strokeWidth={2} className="shrink-0" />
            <span className="truncate">Sem alertas ativos</span>
          </div>
        )}

        <button
          onClick={handleSelect}
          className="w-full flex items-center justify-center gap-1.5 py-2 rounded-lg
            border border-gray-100 text-xs font-medium text-gray-400
            hover:border-gray-200 hover:text-gray-600 hover:bg-gray-50
            transition-all duration-150 mt-4"
        >
          Ver detalhes
          <ChevronRight size={13} strokeWidth={2} />
        </button>
      </div>
    </div>
  );
}
