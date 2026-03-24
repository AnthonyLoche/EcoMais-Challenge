import { useMemo } from "react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const COLORS = [
  "#22c55e",
  "#ef4444",
  "#f59e0b",
  "#3b82f6",
  "#a855f7",
  "#ec4899",
];

export default function StatusPieChart({ machines }) {
  const donutData = useMemo(() => {
    if (!machines || machines.length === 0) {
      return [];
    }

    const statusCount = {};
    machines.forEach((machine) => {
      const status = machine.status;
      statusCount[status] = (statusCount[status] || 0) + 1;
    });

    // Converter para o formato do gráfico
    return Object.entries(statusCount).map(([name, value]) => ({
      name,
      value,
    }));
  }, [machines]);

  if (donutData.length === 0) {
    return (
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
        <h2 className="text-base font-semibold text-gray-700 mb-6">
          Status das Máquinas
        </h2>
        <div className="flex items-center justify-center h-[280px]">
          <p className="text-gray-400">Nenhum dado disponível</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
      <h2 className="text-base font-semibold text-gray-700 mb-6">
        Status das Máquinas
      </h2>
      <ResponsiveContainer width="100%" height={280}>
        <PieChart>
          <Pie
            data={donutData}
            cx="50%"
            cy="50%"
            innerRadius={70}
            outerRadius={110}
            paddingAngle={3}
            dataKey="value"
            label={({ name, percent }) =>
              `${name}: ${(percent * 100).toFixed(0)}%`
            }
            labelLine={false}
          >
            {donutData.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>
          <Tooltip
            formatter={(value, name) => [`${value} máquinas`, name]}
            contentStyle={{ borderRadius: 8, fontSize: 13 }}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
