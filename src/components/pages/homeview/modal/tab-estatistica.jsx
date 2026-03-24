// tabs/TabEstatisticas.jsx
import { useMemo } from "react";
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  ReferenceLine
} from "recharts";
import { Gauge, Zap, Thermometer } from "lucide-react";

export default function TabEstatisticas({ machine }) {
  // Preparar dados para os gráficos
  const chartData = useMemo(() => {
    if (!machine.dados || machine.dados.length === 0) return [];

    // Ordenar dados por timestamp
    const dadosOrdenados = [...machine.dados].sort(
      (a, b) => new Date(a.timestamp) - new Date(b.timestamp)
    );

    // Formatar dados para o gráfico
    return dadosOrdenados.map((dado) => ({
      timestamp: new Date(dado.timestamp).toLocaleTimeString("pt-BR", {
        hour: "2-digit",
        minute: "2-digit",
      }),
      rpm: dado.rpm,
      potencia: dado.potencia,
      temperatura: dado.temperatura,
      dataCompleta: new Date(dado.timestamp).toLocaleString("pt-BR"),
    }));
  }, [machine]);

  // Calcular médias para as linhas de referência
  const medias = useMemo(() => {
    if (!machine.dados || machine.dados.length === 0) {
      return { rpm: 0, potencia: 0, temperatura: 0 };
    }

    const somaRpm = machine.dados.reduce((acc, d) => acc + d.rpm, 0);
    const somaPotencia = machine.dados.reduce((acc, d) => acc + d.potencia, 0);
    const somaTemperatura = machine.dados.reduce((acc, d) => acc + d.temperatura, 0);

    return {
      rpm: Math.round(somaRpm / machine.dados.length),
      potencia: Math.round(somaPotencia / machine.dados.length),
      temperatura: Math.round(somaTemperatura / machine.dados.length),
    };
  }, [machine]);

  if (chartData.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-full gap-4">
        <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center">
          <Gauge size={32} strokeWidth={1.5} className="text-gray-400" />
        </div>
        <div className="text-center">
          <p className="text-sm font-medium text-gray-600">Dados insuficientes</p>
          <p className="text-xs text-gray-400 mt-1">
            Não há dados suficientes para exibir os gráficos
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6 h-full overflow-y-auto pr-2 [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-track]:bg-gray-100 [&::-webkit-scrollbar-thumb]:bg-gray-300 [&::-webkit-scrollbar-thumb]:rounded-full">
      {/* Gráfico de RPM */}
      <div className="bg-white rounded-xl border border-gray-100 p-4 shadow-sm">
        <div className="flex items-center gap-2 mb-4">
          <div className="p-1.5 rounded-lg bg-green-50">
            <Gauge size={16} className="text-green-500" />
          </div>
          <h3 className="text-sm font-semibold text-gray-700">RPM - Rotação por Minuto</h3>
          <span className="text-xs text-gray-400 ml-auto">
            Média: {medias.rpm.toLocaleString()} rpm
          </span>
        </div>
        
        <ResponsiveContainer width="100%" height={200}>
          <LineChart data={chartData} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
            <XAxis 
              dataKey="timestamp" 
              tick={{ fontSize: 10, fill: "#9ca3af" }}
              interval="preserveStartEnd"
            />
            <YAxis 
              tick={{ fontSize: 10, fill: "#9ca3af" }}
              domain={['auto', 'auto']}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "white",
                border: "1px solid #e5e7eb",
                borderRadius: "8px",
                fontSize: "12px",
              }}
              labelFormatter={(label, payload) => {
                if (payload && payload[0]) {
                  return payload[0].payload.dataCompleta;
                }
                return label;
              }}
            />
            <Legend />
            <Line
              type="monotone"
              dataKey="rpm"
              stroke="#22c55e"
              strokeWidth={2}
              dot={{ r: 3, fill: "#22c55e" }}
              activeDot={{ r: 5 }}
              name="RPM"
            />
            <ReferenceLine 
              y={medias.rpm} 
              stroke="#22c55e" 
              strokeDasharray="3 3"
              label={{ value: "Média", position: "right", fill: "#22c55e", fontSize: 10 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Gráfico de Potência */}
      <div className="bg-white rounded-xl border border-gray-100 p-4 shadow-sm">
        <div className="flex items-center gap-2 mb-4">
          <div className="p-1.5 rounded-lg bg-yellow-50">
            <Zap size={16} className="text-yellow-500" />
          </div>
          <h3 className="text-sm font-semibold text-gray-700">Potência (W)</h3>
          <span className="text-xs text-gray-400 ml-auto">
            Média: {medias.potencia.toLocaleString()} W
          </span>
        </div>
        
        <ResponsiveContainer width="100%" height={200}>
          <AreaChart data={chartData} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
            <XAxis 
              dataKey="timestamp" 
              tick={{ fontSize: 10, fill: "#9ca3af" }}
              interval="preserveStartEnd"
            />
            <YAxis 
              tick={{ fontSize: 10, fill: "#9ca3af" }}
              domain={['auto', 'auto']}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "white",
                border: "1px solid #e5e7eb",
                borderRadius: "8px",
                fontSize: "12px",
              }}
              labelFormatter={(label, payload) => {
                if (payload && payload[0]) {
                  return payload[0].payload.dataCompleta;
                }
                return label;
              }}
            />
            <Legend />
            <Area
              type="monotone"
              dataKey="potencia"
              stroke="#eab308"
              strokeWidth={2}
              fill="#eab308"
              fillOpacity={0.1}
              name="Potência"
            />
            <ReferenceLine 
              y={medias.potencia} 
              stroke="#eab308" 
              strokeDasharray="3 3"
              label={{ value: "Média", position: "right", fill: "#eab308", fontSize: 10 }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* Gráfico de Temperatura */}
      <div className="bg-white rounded-xl border border-gray-100 p-4 shadow-sm">
        <div className="flex items-center gap-2 mb-4">
          <div className="p-1.5 rounded-lg bg-red-50">
            <Thermometer size={16} className="text-red-500" />
          </div>
          <h3 className="text-sm font-semibold text-gray-700">Temperatura (°C)</h3>
          <span className="text-xs text-gray-400 ml-auto">
            Média: {medias.temperatura} °C
          </span>
        </div>
        
        <ResponsiveContainer width="100%" height={200}>
          <LineChart data={chartData} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
            <XAxis 
              dataKey="timestamp" 
              tick={{ fontSize: 10, fill: "#9ca3af" }}
              interval="preserveStartEnd"
            />
            <YAxis 
              tick={{ fontSize: 10, fill: "#9ca3af" }}
              domain={['auto', 'auto']}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "white",
                border: "1px solid #e5e7eb",
                borderRadius: "8px",
                fontSize: "12px",
              }}
              labelFormatter={(label, payload) => {
                if (payload && payload[0]) {
                  return payload[0].payload.dataCompleta;
                }
                return label;
              }}
            />
            <Legend />
            <Line
              type="monotone"
              dataKey="temperatura"
              stroke="#ef4444"
              strokeWidth={2}
              dot={{ r: 3, fill: "#ef4444" }}
              activeDot={{ r: 5 }}
              name="Temperatura"
            />
            <ReferenceLine 
              y={medias.temperatura} 
              stroke="#ef4444" 
              strokeDasharray="3 3"
              label={{ value: "Média", position: "right", fill: "#ef4444", fontSize: 10 }}
            />
            <ReferenceLine 
              y={75} 
              stroke="#ef4444" 
              strokeDasharray="5 5"
              label={{ value: "Alerta (75°C)", position: "right", fill: "#ef4444", fontSize: 10 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}