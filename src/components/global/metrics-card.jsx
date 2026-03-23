import { ChevronRight } from "lucide-react";

export default function MetricCard({ title, value, icon: Icon, color = "#3b82f6" }) {
  return (
    <div
      className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden flex flex-col"
      style={{ borderBottom: `3px solid ${color}` }}
    >
      {/* Conteúdo */}
      <div className="flex items-center gap-4 px-5 py-3 flex-1">
        <div
          className="w-12 h-12 rounded-xl flex items-center justify-center"
          style={{ backgroundColor: `${color}15` }}
        >
          <Icon size={24} style={{ color }} strokeWidth={1.8} />
        </div>
        <div>
          <p className="text-sm text-gray-400 font-medium">{title}</p>
          <p className="text-3xl font-semibold text-gray-800 leading-tight">{value}</p>
        </div>
      </div>

      {/* Botão Detalhes */}
      <button
        className="w-full flex items-center justify-between px-5 py-2.5 border-t border-gray-100
          text-sm font-medium text-gray-400 hover:text-gray-600 hover:bg-gray-50 transition-colors"
      >
        <span>Ver detalhes</span>
        <ChevronRight size={15} strokeWidth={2} />
      </button>
    </div>
  );
}