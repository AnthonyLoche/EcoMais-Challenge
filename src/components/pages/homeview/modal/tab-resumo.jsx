/* eslint-disable no-unused-vars */
// tabs/TabResumo.jsx
import { useMemo } from "react";
import { Gauge, Zap, Thermometer, Clock } from "lucide-react";

export default function TabResumo({ machine, calcularMetricasMaquinaFormatada }) {
  const metricasCalculadas = useMemo(() => {
    if (calcularMetricasMaquinaFormatada && machine) {
      return calcularMetricasMaquinaFormatada(machine);
    }
    return null;
  }, [machine, calcularMetricasMaquinaFormatada]);

  const stats = [
    {
      label: "Média RPM",
      value: metricasCalculadas?.mediarpmFormatado || "—",
      color: "#22c55e",
      icon: Gauge,
      bgColor: "bg-green-50",
      borderColor: "border-green-100",
      iconBgColor: "bg-green-100"
    },
    {
      label: "Média Potência",
      value: metricasCalculadas?.mediapotenciaFormatado || "—",
      color: "#eab308",
      icon: Zap,
      bgColor: "bg-yellow-50",
      borderColor: "border-yellow-100",
      iconBgColor: "bg-yellow-100"
    },
    {
      label: "Média Temperatura",
      value: metricasCalculadas?.mediatemperaturaFormatado || "—",
      color: "#ef4444",
      icon: Thermometer,
      bgColor: "bg-red-50",
      borderColor: "border-red-100",
      iconBgColor: "bg-red-100"
    },
    {
      label: "Período",
      value: metricasCalculadas?.periodoFormatado?.totalHoras || "—",
      color: "#3b82f6",
      icon: Clock,
      bgColor: "bg-blue-50",
      borderColor: "border-blue-100",
      iconBgColor: "bg-blue-100"
    }
  ];

  return (
    <div className="flex flex-col gap-4 h-full">
      {/* Cards grid 2x2 */}
      <div className="grid grid-cols-2 gap-4">
        {stats.map((stat, index) => (
          <StatCard key={index} {...stat} />
        ))}
      </div>

      {/* Período dos dados */}
      {metricasCalculadas?.periodo && (
        <div className="mt-auto pt-4 text-[10px] text-gray-400 text-center border-t border-gray-100">
          <div className="flex items-center justify-center gap-2">
            <Clock size={10} className="text-gray-400" />
            <span>
              {metricasCalculadas.periodoFormatado?.inicio} até {metricasCalculadas.periodoFormatado?.fim}
            </span>
          </div>
        </div>
      )}
    </div>
  );
}

function StatCard({ label, value, color, icon: Icon, bgColor, borderColor, iconBgColor }) {
  return (
    <div className={`rounded-xl border ${borderColor} ${bgColor} p-4 transition-all duration-200 hover:shadow-md hover:scale-[1.02] cursor-default`}>
      <div className="flex items-start justify-between mb-3">
        <div className={`p-2 rounded-lg ${iconBgColor}`}>
          <Icon size={20} style={{ color }} strokeWidth={1.8} />
        </div>
        <span className="text-[10px] font-medium px-2 py-0.5 rounded-full bg-white/70 text-gray-500 shadow-sm">
          {label.split(" ")[0]}
        </span>
      </div>
      
      <div>
        <p className="text-xs text-gray-500 mb-1 font-medium">{label}</p>
        <p className="text-xl font-bold tracking-tight" style={{ color }}>
          {value}
        </p>
      </div>
    </div>
  );
}