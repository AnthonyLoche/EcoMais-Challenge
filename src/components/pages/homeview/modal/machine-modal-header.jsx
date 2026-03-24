import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { statusConfig } from "../card-machine";

export default function MachineModalHeader({ machine, onClose }) {
  const s = statusConfig[machine.status] ?? { color: "#6b7280", icon: () => null };
  const StatusIcon = s.icon;

  return (
    <div className="flex items-center gap-3 px-5 py-3.5 border-b border-gray-100 shrink-0">    
      <span 
        className="w-2.5 h-2.5 rounded-full shrink-0" 
        style={{ backgroundColor: s.color }} 
      />
      
      <h2 className="text-base font-semibold text-gray-800 flex-1">
        {machine.codigo}
      </h2>
      
      <button 
        onClick={onClose}
        className="p-1.5 text-gray-400 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
      >
        <X size={18} strokeWidth={2} />
      </button>
    </div>
  );
}