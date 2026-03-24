import { useCallback, useMemo, useEffect } from "react";
import CardMachine, { statusConfig } from "./card-machine";
import { useMachines } from "../../../hooks";
import MachineModal from "./modal/machine-modal";

export default function MachineGroupedList() {
  const { state, selectMachine, selectedMachine, clearSelectedMachine } =
    useMachines();
  const machines = state.machines ?? [];

  const grouped = useMemo(() => {
    return Object.keys(statusConfig).reduce((acc, status) => {
      const items = machines.filter((m) => m.status === status);
      if (items.length > 0) acc[status] = items;
      return acc;
    }, {});
  }, [machines]);

  const allMachines = useMemo(() => {
    return Object.values(grouped).flatMap((group) => group.machines);
  }, [grouped]);

  const handleSelectMachine = useCallback(
    (machine) => {
      console.log(
        "MachineGroupedList: chamando selectMachine para:",
        machine.codigo,
      );
      selectMachine(machine);
    },
    [selectMachine],
  );

  const handleCloseModal = useCallback(() => {
    console.log("Fechando modal");
    clearSelectedMachine();
  }, [clearSelectedMachine]);

  const handlePrevMachine = useCallback(() => {
    if (selectedMachine && allMachines.length > 0) {
      const currentIndex = allMachines.findIndex(
        (m) => m.id === selectedMachine.id,
      );
      const prevIndex =
        currentIndex > 0 ? currentIndex - 1 : allMachines.length - 1;
      selectMachine(allMachines[prevIndex]);
    }
  }, [selectedMachine, allMachines, selectMachine]);

  const handleNextMachine = useCallback(() => {
    if (selectedMachine && allMachines.length > 0) {
      const currentIndex = allMachines.findIndex(
        (m) => m.id === selectedMachine.id,
      );
      const nextIndex =
        currentIndex < allMachines.length - 1 ? currentIndex + 1 : 0;
      selectMachine(allMachines[nextIndex]);
    }
  }, [selectedMachine, allMachines, selectMachine]);

  // Adicionar um efeito para log quando selectedMachine mudar
  useEffect(() => {
    if (selectedMachine) {
      console.log(
        "MachineGroupedList: selectedMachine atualizado:",
        selectedMachine.codigo,
      );
    } else {
      console.log("MachineGroupedList: selectedMachine é null");
    }
  }, [selectedMachine]);

  if (state.loading) {
    return (
      <div className="w-full h-full flex items-center justify-center">
        <p className="text-gray-400 text-sm">Carregando máquinas...</p>
      </div>
    );
  }

  if (state.error) {
    return (
      <div className="w-full h-full flex items-center justify-center">
        <p className="text-red-400 text-sm">Erro ao carregar máquinas.</p>
      </div>
    );
  }

  if (machines.length === 0) {
    return (
      <div className="w-full h-full flex items-center justify-center">
        <p className="text-gray-400 text-sm">Nenhuma máquina encontrada.</p>
      </div>
    );
  }

  return (
    <>
      <div className="w-full h-full flex flex-col">
        <div className="flex-1 overflow-y-auto py-4 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
          <div className="flex flex-col gap-8">
            {Object.entries(grouped).map(([status, items]) => {
              const config = statusConfig[status];
              const Icon = config.icon;

              return (
                <section key={status} className="w-full">
                  {/* Header do grupo */}
                  <div className="flex items-center gap-3 mb-4 px-1">
                    <div
                      className="flex items-center justify-center w-7 h-7 rounded-lg"
                      style={{ backgroundColor: `${config.color}18` }}
                    >
                      <Icon
                        size={14}
                        strokeWidth={2.2}
                        style={{ color: config.color }}
                      />
                    </div>

                    <h2 className="text-sm font-semibold text-gray-700">
                      {status}
                    </h2>

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

                    {/* Linha separadora */}
                    <div
                      className="flex-1 h-px"
                      style={{ backgroundColor: `${config.color}20` }}
                    />
                  </div>

                  {/* Cards */}
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
        </div>
      </div>

      {/* Modal - renderizado apenas quando selectedMachine existe */}
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
