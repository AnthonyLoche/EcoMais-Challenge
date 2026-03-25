import { useState } from "react";
import { useMachines } from "../../../../hooks";
import MachineModalHeader from "./machine-modal-header";
import MachineModalLeftPanel from "./machine-modal-left-panel";
import MachineModalTabs from "./machine-modal-tabs";
import TabResumo from "./tab-resumo";
import TabHistorico from "./tab-historico";
import TabEstatisticas from "./tab-estatistica";
import MachineModalEdit from "./machine-modal-edit";

export default function MachineModal({ machine, onClose, onPrev, onNext }) {
  const [activeTab, setActiveTab] = useState("resumo");
  const [localMachine, setLocalMachine] = useState(machine);
  const { calcularMetricasMaquinaFormatada } = useMachines();

  if (!localMachine) return null;

  const handleSave = (updated) => {
    setLocalMachine((prev) => ({ ...prev, ...updated }));
  };

  const tabs = [
    { key: "resumo",       label: "Resumo"       },
    { key: "historico",    label: "Histórico"    },
    { key: "estatisticas", label: "Estatísticas" },
    { key: "editar",       label: "Editar"       },
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case "resumo":
        return (
          <TabResumo
            machine={localMachine}
            calcularMetricasMaquinaFormatada={calcularMetricasMaquinaFormatada}
          />
        );
      case "historico":    return <TabHistorico machine={localMachine} />;
      case "estatisticas": return <TabEstatisticas machine={localMachine} />;
      case "editar":
        return (
          <MachineModalEdit
            machine={localMachine}
            onSave={handleSave}
          />
        );
      default: return null;
    }
  };

  return (
    <div className="fixed inset-0 z-[60] flex items-end sm:items-center justify-center sm:p-4 bg-black/40 backdrop-blur-sm">
      <div
        className="
          bg-white shadow-2xl w-full flex flex-col overflow-hidden
          rounded-t-2xl sm:rounded-2xl
          h-[92vh] sm:h-[75vh]
          sm:max-w-5xl
        "
      >
        <MachineModalHeader
          machine={localMachine}
          onPrev={onPrev}
          onNext={onNext}
          onClose={onClose}
        />

        <div className="hidden sm:flex flex-1 min-h-0">
          <div className="w-[35%] shrink-0 border-r border-gray-100 overflow-hidden">
            <MachineModalLeftPanel machine={localMachine} />
          </div>

          <div className="w-[65%] flex flex-col min-w-0 overflow-hidden">
            <MachineModalTabs
              tabs={tabs}
              activeTab={activeTab}
              onTabChange={setActiveTab}
            />
            <div className="flex-1 min-h-0 overflow-hidden p-4">
              <div className="h-full">
                {renderTabContent()}
              </div>
            </div>
          </div>
        </div>

        <div className="flex sm:hidden flex-col flex-1 min-h-0 overflow-hidden">
          <div className="shrink-0 border-b border-gray-100 overflow-hidden" style={{ maxHeight: "38%" }}>
            <MachineModalLeftPanel machine={localMachine} />
          </div>

          <div className="flex flex-col flex-1 min-h-0 overflow-hidden">
            <MachineModalTabs
              tabs={tabs}
              activeTab={activeTab}
              onTabChange={setActiveTab}
            />
            <div className="flex-1 min-h-0 overflow-y-auto p-4
                            [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
              {renderTabContent()}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}