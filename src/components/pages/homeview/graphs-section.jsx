// components/GraphsSection.jsx
import { useMachines } from "../../../hooks";
import StatusPieChart from "./graphs/status-pie-chart";
import MetricsBarChart from "./graphs/metrics-bar-chart";

export default function GraphsSection() {
  const { state, calcularMetricasMaquinaFormatada } = useMachines();
  const machines = state.machines ?? [];

  if (state.loading) {
    return (
      <div className="w-[90%] mx-auto my-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 flex items-center justify-center h-[400px]">
            <p className="text-gray-400">Carregando gráficos...</p>
          </div>
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 flex items-center justify-center h-[400px]">
            <p className="text-gray-400">Carregando gráficos...</p>
          </div>
        </div>
      </div>
    );
  }

  if (state.error) {
    return (
      <div className="w-[90%] mx-auto my-8">
        <div className="bg-red-50 border border-red-200 rounded-xl p-4 text-center">
          <p className="text-red-500">Erro ao carregar dados: {state.error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-[90%] mx-auto my-8 grid grid-cols-1 lg:grid-cols-2 gap-6">
      <StatusPieChart machines={machines} />
      <MetricsBarChart 
        machines={machines} 
        calcularMetricasMaquinaFormatada={calcularMetricasMaquinaFormatada}
      />
    </div>
  );
}