import { useMemo } from "react";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from "recharts";

export default function MetricsBarChart({ machines, calcularMetricasMaquinaFormatada }) {
  const barData = useMemo(() => {
    if (!machines || machines.length === 0) {
      return [];
    }

    const operatingMachines = machines.filter(m => m.status === "Operando");
    
    // Calcular métricas para cada máquina operando
    return operatingMachines.map(machine => {
      const metricas = calcularMetricasMaquinaFormatada(machine);
      return {
        nome: machine.codigo,
        rpm: metricas.mediarpm || 0,
        potencia: metricas.mediapotencia || 0,
        temperatura: metricas.mediatemperatura || 0,
      };
    }).slice(0, 10); 
  }, [machines, calcularMetricasMaquinaFormatada]);

  if (barData.length === 0) {
    return (
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
        <h2 className="text-base font-semibold text-gray-700 mb-6">
          Métricas das Máquinas Operando
        </h2>
        <div className="flex items-center justify-center h-[280px]">
          <p className="text-gray-400">Nenhuma máquina operando no momento</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
      <h2 className="text-base font-semibold text-gray-700 mb-6">
        Métricas das Máquinas Operando
      </h2>
      <ResponsiveContainer width="100%" height={280}>
        <BarChart data={barData} barCategoryGap="20%" barGap={8}>
          <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" vertical={false} />
          <XAxis
            dataKey="nome"
            tick={{ fontSize: 11, fill: "#9ca3af" }}
            axisLine={false}
            tickLine={false}
            interval={0}
            angle={-45}
            textAnchor="end"
            height={80}
          />
          <YAxis
            tick={{ fontSize: 11, fill: "#9ca3af" }}
            axisLine={false}
            tickLine={false}
            yAxisId="left"
          />
          <YAxis
            tick={{ fontSize: 11, fill: "#9ca3af" }}
            axisLine={false}
            tickLine={false}
            yAxisId="right"
            orientation="right"
          />
          <Tooltip
            contentStyle={{ borderRadius: 8, fontSize: 12 }}
            cursor={{ fill: "#f9fafb" }}
          />
          <Legend
            iconType="circle"
            iconSize={10}
            formatter={(value) => (
              <span className="text-sm text-gray-600 capitalize">{value}</span>
            )}
          />
          <Bar 
            dataKey="rpm" 
            fill="#22c55e" 
            radius={[4, 4, 0, 0]} 
            yAxisId="left"
            name="RPM"
          />
          <Bar 
            dataKey="potencia" 
            fill="#3b82f6" 
            radius={[4, 4, 0, 0]} 
            yAxisId="left"
            name="Potência (W)"
          />
          <Bar 
            dataKey="temperatura" 
            fill="#ef4444" 
            radius={[4, 4, 0, 0]} 
            yAxisId="right"
            name="Temperatura (°C)"
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}