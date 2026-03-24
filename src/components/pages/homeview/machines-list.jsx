/* eslint-disable no-unused-vars */
import { useCallback, useMemo, useState } from "react";
import { Search, X, ChevronDown } from "lucide-react";
import CardMachine, { statusConfig } from "./card-machine";
import { useMachines } from "../../../hooks";
import MachineModal from "./modal/machine-modal";

function FilterPill({ label, color, active, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`
        flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold
        border transition-all duration-150 whitespace-nowrap
        ${active
          ? "text-white border-transparent shadow-sm"
          : "bg-white text-gray-500 border-gray-200 hover:border-gray-300 hover:text-gray-700"
        }
      `}
      style={active ? { backgroundColor: color, borderColor: color } : {}}
    >
      {active && <X size={11} strokeWidth={2.5} className="opacity-80" />}
      {label}
    </button>
  );
}

function LocalDropdown({ locais, selected, onChange }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative">
      <button
        onClick={() => setOpen((p) => !p)}
        className={`
          flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold
          border transition-all duration-150 whitespace-nowrap
          ${selected
            ? "bg-gray-700 text-white border-gray-700 shadow-sm"
            : "bg-white text-gray-500 border-gray-200 hover:border-gray-300 hover:text-gray-700"
          }
        `}
      >
        {selected ? (
          <>
            <X
              size={11}
              strokeWidth={2.5}
              className="opacity-80"
              onClick={(e) => { e.stopPropagation(); onChange(null); setOpen(false); }}
            />
            {selected}
          </>
        ) : (
          <>
            Local
            <ChevronDown
              size={12}
              strokeWidth={2}
              className={`transition-transform duration-200 ${open ? "rotate-180" : ""}`}
            />
          </>
        )}
      </button>

      {open && (
        <>
          <div className="fixed inset-0 z-10" onClick={() => setOpen(false)} />
          <div className="absolute top-full left-0 mt-1.5 bg-white border border-gray-200 rounded-xl shadow-lg z-20 min-w-[160px] overflow-hidden">
            {locais.map((local) => (
              <button
                key={local}
                onClick={() => { onChange(local); setOpen(false); }}
                className={`
                  w-full text-left px-3 py-2 text-xs transition-colors
                  ${selected === local
                    ? "bg-gray-700 text-white font-semibold"
                    : "text-gray-600 hover:bg-gray-50"
                  }
                `}
              >
                {local}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export default function MachineGroupedList() {
  const { state, selectMachine, selectedMachine, clearSelectedMachine } =
    useMachines();
  const machines = state.machines ?? [];

  const [search, setSearch]             = useState("");
  const [activeStatus, setActiveStatus] = useState(null);
  const [activeLocal, setActiveLocal]   = useState(null);

  const locais = useMemo(() => {
    const set = new Set(machines.map((m) => m.local).filter(Boolean));
    return [...set].sort();
  }, [machines]);

  // Filtragem
  const filteredMachines = useMemo(() => {
    return machines.filter((m) => {
      const q = search.toLowerCase();
      const matchSearch =
        !search ||
        m.codigo?.toLowerCase().includes(q) ||
        m.local?.toLowerCase().includes(q)  ||
        m.status?.toLowerCase().includes(q);
      const matchStatus = !activeStatus || m.status === activeStatus;
      const matchLocal  = !activeLocal  || m.local  === activeLocal;
      return matchSearch && matchStatus && matchLocal;
    });
  }, [machines, search, activeStatus, activeLocal]);

  const grouped = useMemo(() => {
    return Object.keys(statusConfig).reduce((acc, status) => {
      const items = filteredMachines.filter((m) => m.status === status);
      if (items.length > 0) acc[status] = items;
      return acc;
    }, {});
  }, [filteredMachines]);

  const allMachines = useMemo(
    () => Object.values(grouped).flatMap((g) => (Array.isArray(g) ? g : g.machines ?? [])),
    [grouped]
  );

  const hasFilter = Boolean(search || activeStatus || activeLocal);

  const clearAll = () => {
    setSearch("");
    setActiveStatus(null);
    setActiveLocal(null);
  };

  const handleSelectMachine = useCallback((m) => selectMachine(m), [selectMachine]);
  const handleCloseModal    = useCallback(() => clearSelectedMachine(), [clearSelectedMachine]);

  const handlePrevMachine = useCallback(() => {
    if (!selectedMachine || !allMachines.length) return;
    const idx = allMachines.findIndex((m) => m.id === selectedMachine.id);
    selectMachine(allMachines[idx > 0 ? idx - 1 : allMachines.length - 1]);
  }, [selectedMachine, allMachines, selectMachine]);

  const handleNextMachine = useCallback(() => {
    if (!selectedMachine || !allMachines.length) return;
    const idx = allMachines.findIndex((m) => m.id === selectedMachine.id);
    selectMachine(allMachines[idx < allMachines.length - 1 ? idx + 1 : 0]);
  }, [selectedMachine, allMachines, selectMachine]);

  if (state.loading)
    return <div className="w-full h-full flex items-center justify-center"><p className="text-gray-400 text-sm">Carregando máquinas...</p></div>;
  if (state.errorFetch)
    return <div className="w-full h-full flex items-center justify-center"><p className="text-red-400 text-sm">Erro ao carregar máquinas.</p></div>;
  if (machines.length === 0)
    return <div className="w-full h-full flex items-center justify-center"><p className="text-gray-400 text-sm">Nenhuma máquina encontrada.</p></div>;

  return (
    <>
      <div className="w-full h-full flex flex-col">

        <div className="shrink-0 pb-5 flex flex-col gap-3">

          <div className="relative">
            <Search
              size={15}
              strokeWidth={2}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
            />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Buscar por código, local ou status…"
              className="w-full pl-9 pr-9 py-2.5 text-sm bg-white border border-gray-200 rounded-xl
                         text-gray-700 placeholder-gray-400
                         focus:outline-none focus:ring-2 focus:ring-gray-300 focus:border-transparent
                         transition-all"
            />
            {search && (
              <button
                onClick={() => setSearch("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                <X size={14} strokeWidth={2} />
              </button>
            )}
          </div>

          <div className="flex items-center gap-2 flex-wrap">
            {Object.entries(statusConfig).map(([status, config]) => {
              const count = machines.filter((m) => m.status === status).length;
              if (count === 0) return null;
              return (
                <FilterPill
                  key={status}
                  label={status}
                  color={config.color}
                  active={activeStatus === status}
                  onClick={() => setActiveStatus(activeStatus === status ? null : status)}
                />
              );
            })}

            {locais.length > 0 && <div className="w-px h-5 bg-gray-200 mx-0.5 shrink-0" />}

            {locais.length > 0 && (
              <LocalDropdown locais={locais} selected={activeLocal} onChange={setActiveLocal} />
            )}

            {hasFilter && (
              <button
                onClick={clearAll}
                className="ml-auto flex items-center gap-1 text-xs text-gray-400 hover:text-gray-600 transition-colors"
              >
                <X size={12} strokeWidth={2} />
                Limpar filtros
              </button>
            )}
          </div>

          {hasFilter && (
            <p className="text-xs text-gray-400">
              {filteredMachines.length === 0
                ? "Nenhuma máquina encontrada"
                : `${filteredMachines.length} máquina${filteredMachines.length !== 1 ? "s" : ""} encontrada${filteredMachines.length !== 1 ? "s" : ""}`
              }
            </p>
          )}
        </div>

        <div className="flex-1 overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
          {Object.keys(grouped).length === 0 ? (
            <div className="flex flex-col items-center justify-center h-48 gap-2">
              <p className="text-gray-400 text-sm">Nenhuma máquina corresponde aos filtros.</p>
              <button onClick={clearAll} className="text-xs text-blue-500 hover:underline">
                Limpar filtros
              </button>
            </div>
          ) : (
            <div className="flex flex-col gap-8 pb-4">
              {Object.entries(grouped).map(([status, items]) => {
                const config = statusConfig[status];
                const Icon   = config.icon;
                return (
                  <section key={status} className="w-full">
                    <div className="flex items-center gap-3 mb-4 px-1">
                      <div
                        className="flex items-center justify-center w-7 h-7 rounded-lg shrink-0"
                        style={{ backgroundColor: `${config.color}18` }}
                      >
                        <Icon size={14} strokeWidth={2.2} style={{ color: config.color }} />
                      </div>
                      <h2 className="text-sm font-semibold text-gray-700">{status}</h2>
                      <span
                        className="text-xs font-semibold px-2 py-0.5 rounded-full border"
                        style={{
                          color: config.color,
                          backgroundColor: `${config.color}12`,
                          borderColor: `${config.color}30`,
                        }}
                      >
                        {items.length}
                      </span>
                      <div className="flex-1 h-px" style={{ backgroundColor: `${config.color}20` }} />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                      {items.map((machine) => (
                        <CardMachine
                          key={machine.id}
                          machine={machine}
                          onSelectMachine={handleSelectMachine}
                        />
                      ))}
                    </div>
                  </section>
                );
              })}
            </div>
          )}
        </div>
      </div>

      {selectedMachine && (
        <MachineModal
          key={selectedMachine.id}
          machine={selectedMachine}
          onClose={handleCloseModal}
          onPrev={handlePrevMachine}
          onNext={handleNextMachine}
        />
      )}
    </>
  );
}