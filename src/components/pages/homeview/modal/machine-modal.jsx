// MachineModal.jsx - Componente principal
import { useState } from "react";
import { useMachines } from "../../../../hooks";
import MachineModalHeader from "./machine-modal-header";
import MachineModalLeftPanel from "./machine-modal-left-panel";
import MachineModalTabs from "./machine-modal-tabs";
import TabResumo from "./tab-resumo";
import TabHistorico from "./tab-historico";
import TabEstatisticas from "./tab-estatistica";

export default function MachineModal({ machine, onClose, onPrev, onNext }) {
  const [activeTab, setActiveTab] = useState("resumo");
  const { calcularMetricasMaquinaFormatada } = useMachines();

  if (!machine) return null;

  const tabs = [
    { key: "resumo", label: "Resumo" },
    { key: "historico", label: "Histórico" },
    { key: "estatisticas", label: "Estatísticas" },
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case "resumo":
        return (
          <TabResumo 
            machine={machine} 
            calcularMetricasMaquinaFormatada={calcularMetricasMaquinaFormatada}
          />
        );
      case "historico":
        return <TabHistorico machine={machine} />;
      case "estatisticas":
        return <TabEstatisticas machine={machine} />;
      default:
        return null;
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-5xl h-[65vh] flex flex-col overflow-hidden">
        <MachineModalHeader 
          machine={machine}
          onPrev={onPrev}
          onNext={onNext}
          onClose={onClose}
        />
        
        <div className="flex flex-1 min-h-0">
          <MachineModalLeftPanel machine={machine} />
          
          <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
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
      </div>
    </div>
  );
}