import { MapPin, Cpu, AlertTriangle, Tag, Clock } from "lucide-react";
import { statusConfig } from "../card-machine";
import fresadora from "../../../../assets/images/machines/fresadora.png";
import torno from "../../../../assets/images/machines/torno.png";
import router from "../../../../assets/images/machines/router.png";
import centro from "../../../../assets/images/machines/centro.png";
import retifica from "../../../../assets/images/machines/retifica.png";

const getImageByCode = (codigo = "") => {
  const lower = codigo.toLowerCase();
  if (lower.includes("centro"))                       return centro;
  if (lower.includes("fresadora"))                    return fresadora;
  if (lower.includes("router"))                       return router;
  if (lower.includes("torno"))                        return torno;
  if (lower.includes("retifica") || lower.includes("retífica")) return retifica;
  return null;
};

export default function MachineModalLeftPanel({ machine }) {
  const s = statusConfig[machine.status] ?? { color: "#6b7280", icon: () => null };
  const StatusIcon = s.icon;
  const image = machine.imagem ?? getImageByCode(machine.codigo);

  return (
    <div className="w-full h-full flex flex-col sm:flex-col overflow-y-auto
                    [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">

      <div className="flex sm:hidden flex-row h-full">

        <div className="relative w-2/5 shrink-0 bg-gray-50 flex items-center justify-center">
          {image ? (
            <img
              src={image}
              alt={machine.codigo}
              className="w-full h-full object-contain p-3"
            />
          ) : (
            <Cpu size={40} strokeWidth={1} className="text-gray-300" />
          )}

          <span
            className="absolute top-2 left-2 flex items-center gap-1 text-[9px] font-bold px-1.5 py-0.5 rounded-full border"
            style={{
              color: s.color,
              backgroundColor: `${s.color}15`,
              borderColor: `${s.color}30`,
            }}
          >
            <StatusIcon size={9} strokeWidth={2.5} />
            {machine.status}
          </span>
        </div>

        <div className="flex-1 p-3 flex flex-col justify-between overflow-y-auto
                        [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
          <div className="flex flex-col gap-1">
            <p className="text-[9px] text-gray-400 uppercase tracking-wider">
              ID #{machine.id}
            </p>
            <div className="flex items-center gap-1.5">
              <Tag size={11} strokeWidth={1.8} className="text-gray-400 shrink-0" />
              <span className="text-xs text-gray-700 font-medium truncate">{machine.codigo}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <MapPin size={11} strokeWidth={1.8} className="text-gray-400 shrink-0" />
              <span className="text-xs text-gray-600 truncate">{machine.local}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Clock size={11} strokeWidth={1.8} className="text-gray-400 shrink-0" />
              <span className="text-[10px] text-gray-500 truncate">{machine.ultimaAtualizacao}</span>
            </div>
          </div>

          {machine.alertas?.length > 0 && (
            <div className="flex flex-col gap-1 mt-2">
              {machine.alertas.map((alerta, i) => (
                <div
                  key={i}
                  className="rounded-md px-2 py-1 border flex items-center gap-1.5"
                  style={{ backgroundColor: "#ef444415", borderColor: "#ef444430" }}
                >
                  <AlertTriangle size={10} strokeWidth={2} className="text-red-500 shrink-0" />
                  <span className="text-[9px] font-semibold text-red-500 truncate">{alerta}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="hidden sm:flex flex-col h-full">

        <div className="relative bg-gray-50 flex flex-col items-center justify-center h-[50%] shrink-0">
          {image ? (
            <img
              src={image}
              alt={machine.codigo}
              className="w-full h-full object-contain p-2"
            />
          ) : (
            <Cpu size={56} strokeWidth={1} className="text-gray-300" />
          )}

          <span
            className="absolute top-2.5 right-2.5 flex items-center gap-1 text-[10px] font-bold px-2 py-1 rounded-full border"
            style={{
              color: s.color,
              backgroundColor: `${s.color}15`,
              borderColor: `${s.color}30`,
            }}
          >
            <StatusIcon size={10} strokeWidth={2.5} />
            {machine.status}
          </span>

          {image && (
            <span className="absolute bottom-1 text-[9px] text-gray-400 italic">
              imagem meramente ilustrativa
            </span>
          )}
        </div>

        <div className="p-4 flex flex-col gap-4">
          <div>
            <p className="text-[10px] text-gray-400 uppercase tracking-wider">
              ID #{machine.id}
            </p>
            <div className="flex items-center gap-1.5 mt-1">
              <Tag size={12} strokeWidth={1.8} className="text-gray-400 shrink-0" />
              <span className="text-xs text-gray-600">{machine.codigo}</span>
            </div>
            <div className="flex items-center gap-1.5 mt-1">
              <MapPin size={12} strokeWidth={1.8} className="text-gray-400 shrink-0" />
              <span className="text-xs text-gray-600">{machine.local}</span>
            </div>
            <div className="flex items-center gap-1.5 mt-1">
              <Clock size={12} strokeWidth={1.8} className="text-gray-400 shrink-0" />
              <span className="text-xs text-gray-600">{machine.ultimaAtualizacao}</span>
            </div>
          </div>

          {machine.alertas?.length > 0 && (
            <div className="flex flex-col gap-1.5">
              {machine.alertas.map((alerta, i) => (
                <div
                  key={i}
                  className="rounded-lg px-2.5 py-2 border flex items-center gap-2"
                  style={{ backgroundColor: "#ef444415", borderColor: "#ef444430" }}
                >
                  <AlertTriangle size={12} strokeWidth={2} className="text-red-500 shrink-0" />
                  <span className="text-[10px] font-semibold text-red-500 truncate">{alerta}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}