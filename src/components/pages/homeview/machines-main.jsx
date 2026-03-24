import { useState } from "react";
import { BarChart2, X } from "lucide-react";
import MachineGroupedList from "./machines-list";
import MachineSidebar from "./machine-sidebar";

export default function MachinesMain() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <>
      {/* ─── Layout Desktop ─────────────────────────────────────── */}
      <div className="w-[90%] mx-auto my-8 h-[calc(100vh-8rem)] hidden lg:flex gap-6 overflow-hidden">
        <div className="w-3/4 h-full overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
          <MachineGroupedList />
        </div>
        <div className="w-1/4 h-full overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
          <MachineSidebar />
        </div>
      </div>

      {/* ─── Layout Mobile/Tablet ────────────────────────────────── */}
      <div className="lg:hidden w-full flex flex-col" style={{ height: "calc(100vh - 5rem)" }}>

        {/* Lista de máquinas — ocupa todo o espaço disponível */}
        <div className="flex-1 overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] px-4 pt-4">
          <MachineGroupedList />
        </div>

        {/* FAB — botão flutuante para abrir a sidebar */}
        <button
          onClick={() => setSidebarOpen(true)}
          className="fixed bottom-5 right-5 z-30 flex items-center gap-2
                     bg-green-500 hover:bg-green-600 active:scale-95
                     text-white text-sm font-semibold
                     px-4 py-3 rounded-full shadow-lg
                     transition-all duration-200"
          aria-label="Abrir análise"
        >
          <BarChart2 size={17} strokeWidth={2} />
          Análise
        </button>
      </div>

      {/* ─── Bottom Sheet (mobile) ───────────────────────────────── */}
      {/* Overlay */}
      <div
        className={`
          lg:hidden fixed inset-0 bg-black/50 z-40
          transition-opacity duration-300
          ${sidebarOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}
        `}
        onClick={() => setSidebarOpen(false)}
      />

      {/* Sheet */}
      <div
        className={`
          lg:hidden fixed bottom-0 left-0 right-0 z-50
          bg-white rounded-t-2xl shadow-2xl
          transition-transform duration-300 ease-in-out
          flex flex-col
          ${sidebarOpen ? "translate-y-0" : "translate-y-full"}
        `}
        style={{ height: "82vh" }}
      >
        {/* Handle + Header */}
        <div className="flex items-center justify-between px-4 pt-3 pb-2 shrink-0">
          {/* Drag handle */}
          <div className="absolute top-2.5 left-1/2 -translate-x-1/2 w-10 h-1 rounded-full bg-gray-200" />

          <span className="text-sm font-semibold text-gray-700 mt-2">Análise & Previsões</span>

          <button
            onClick={() => setSidebarOpen(false)}
            className="mt-2 p-1.5 rounded-full hover:bg-gray-100 transition-colors text-gray-400"
            aria-label="Fechar"
          >
            <X size={18} strokeWidth={2} />
          </button>
        </div>

        {/* Conteúdo da sidebar */}
        <div className="flex-1 overflow-hidden px-3 pb-4">
          <MachineSidebar />
        </div>
      </div>
    </>
  );
}