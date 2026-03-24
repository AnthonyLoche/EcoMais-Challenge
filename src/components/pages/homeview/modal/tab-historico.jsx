// tabs/TabHistorico.jsx
import { useMemo } from "react";
import { CheckCircle, Thermometer, AlertTriangle } from "lucide-react";

export default function TabHistorico({ machine }) {
  const eventos = useMemo(() => {
    if (machine.dados && machine.dados.length > 0) {
      return machine.dados.map((dado) => {
        let tipo = "Operando";
        let cor = "#22c55e";
        let icon = CheckCircle;
        
        if (dado.temperatura > 75) {
          tipo = "Alerta";
          cor = "#ef4444";
          icon = Thermometer;
        } else if (dado.temperatura > 65) {
          tipo = "Atenção";
          cor = "#f59e0b";
          icon = AlertTriangle;
        }
        
        return {
          data: new Date(dado.timestamp).toLocaleString("pt-BR"),
          tipo: tipo,
          descricao: `${tipo === "Alerta" ? "Temperatura alta" : tipo === "Atenção" ? "Temperatura elevada" : "Operação normal"} - RPM: ${dado.rpm}, Potência: ${dado.potencia}W`,
          color: cor,
          icon: icon,
        };
      }).reverse();
    }
    return [];
  }, [machine]);

  if (eventos.length === 0) {
    return (
      <div className="flex items-center justify-center h-full">
        <p className="text-xs text-gray-400">Nenhum histórico disponível</p>
      </div>
    );
  }

  return (
    <div className="h-full overflow-y-auto pr-1 [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-track]:bg-gray-100 [&::-webkit-scrollbar-thumb]:bg-gray-300 [&::-webkit-scrollbar-thumb]:rounded-full hover:[&::-webkit-scrollbar-thumb]:bg-gray-400">
      <div className="flex flex-col gap-2">
        {eventos.map((evento, index) => (
          <HistoricoItem key={index} evento={evento} />
        ))}
      </div>
    </div>
  );
}

function HistoricoItem({ evento }) {
  const Icon = evento.icon;
  
  return (
    <div className="flex gap-3 p-3 rounded-xl border border-gray-100 hover:bg-gray-50 transition-colors">
      <div className="w-7 h-7 rounded-full flex items-center justify-center shrink-0 mt-0.5"
        style={{ backgroundColor: `${evento.color}15` }}>
        <Icon size={13} strokeWidth={2} style={{ color: evento.color }} />
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between gap-2 mb-0.5">
          <span className="text-xs font-semibold" style={{ color: evento.color }}>
            {evento.tipo}
          </span>
          <span className="text-[10px] text-gray-400">{evento.data}</span>
        </div>
        <p className="text-xs text-gray-600">{evento.descricao}</p>
      </div>
    </div>
  );
}