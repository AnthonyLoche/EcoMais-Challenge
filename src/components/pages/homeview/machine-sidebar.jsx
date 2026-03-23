import { useState } from "react";
import {
  BarChart2, TrendingUp, ChevronRight,
  AlertTriangle, Waves, Zap, Wrench, Clock,
  ThermometerSun, Cpu, Activity, Power,
} from "lucide-react";

// ── dados mock ───────────────────────────────────────────────────────────────
const criticos = [
  { id: 203, codigo: "Torno CNC 203",          status: "Temp. Alta",      color: "#ef4444", icon: ThermometerSun },
  { id: 310, codigo: "Centro de Usinagem 310",  status: "Vibração Alta",   color: "#ec4899", icon: Waves         },
  { id: 412, codigo: "Fresa CNC 412",           status: "Alerta Potência", color: "#a855f7", icon: Zap           },
];

const atencao = [
  { id: 208, codigo: "Mandriladora 208",  status: "Manutenção",      color: "#f59e0b", icon: Wrench   },
  { id: 115, codigo: "Torno CNC 115",     status: "Baixa Produção",  color: "#3b82f6", icon: Activity },
  { id: 330, codigo: "Retificadora 330",  status: "Parada",          color: "#ef4444", icon: Power    },
];

const previsoes = [
  { descricao: "Desgaste de ferramenta",   maquina: "Centro Usinagem 307", prazo: "2 dias"  },
  { descricao: "Troca de lubrificante",    maquina: "Torno CNC 208",       prazo: "5 dias"  },
  { descricao: "Calibração necessária",    maquina: "Fresa CNC 101",       prazo: "7 dias"  },
  { descricao: "Substituição de correia",  maquina: "Mandriladora 412",    prazo: "10 dias" },
];

const resumo = [
  { label: "Temp. Alta",       count: 4, color: "#ef4444" },
  { label: "Vibração Alta",    count: 3, color: "#ec4899" },
  { label: "Manutenção",       count: 5, color: "#f59e0b" },
  { label: "Baixa Produção",   count: 2, color: "#3b82f6" },
  { label: "Falta de Energia", count: 1, color: "#94a3b8" },
];

const metricas = [
  { label: "Operando",    value: 18, total: 28, color: "#22c55e" },
  { label: "Em alerta",  value:  6, total: 28, color: "#f97316" },
  { label: "Paradas",    value:  4, total: 28, color: "#ef4444" },
];
// ─────────────────────────────────────────────────────────────────────────────

function DonutChart({ data }) {
  const total = data.reduce((s, d) => s + d.count, 0);
  const size = 72;
  const r = 25;
  const circumference = 2 * Math.PI * r;
  let offset = 0;
  const slices = data.map((d) => {
    const dash = (d.count / total) * circumference;
    const slice = { ...d, dash, gap: circumference - dash, offset };
    offset += dash;
    return slice;
  });
  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="shrink-0">
      {slices.map((s, i) => (
        <circle key={i} cx={size/2} cy={size/2} r={r}
          fill="none" stroke={s.color} strokeWidth={9}
          strokeDasharray={`${s.dash} ${s.gap}`}
          strokeDashoffset={-s.offset}
          style={{ transform: "rotate(-90deg)", transformOrigin: "center" }}
        />
      ))}
    </svg>
  );
}

function MachineRow({ item }) {
  const Icon = item.icon;
  return (
    <button className="w-full flex items-center gap-2.5 px-2.5 py-2 rounded-lg hover:bg-gray-50 transition-colors group">
      <span className="w-6 h-6 rounded-full flex items-center justify-center shrink-0"
        style={{ backgroundColor: `${item.color}18` }}>
        <Icon size={12} strokeWidth={2.2} style={{ color: item.color }} />
      </span>
      <div className="flex-1 text-left min-w-0">
        <p className="text-xs font-medium text-gray-700 truncate leading-tight">{item.codigo}</p>
        <p className="text-[10px] font-medium" style={{ color: item.color }}>{item.status}</p>
      </div>
      <ChevronRight size={13} strokeWidth={2} className="text-gray-300 group-hover:text-gray-400 shrink-0" />
    </button>
  );
}

function SectionTitle({ label, count, color }) {
  return (
    <div className="flex items-center gap-1.5 px-1 mb-1">
      <span className="text-green-500 text-xs font-bold">+</span>
      <h3 className="text-[10px] font-semibold text-gray-500 uppercase tracking-wider flex-1">{label}</h3>
      {count !== undefined && (
        <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-full"
          style={{ color: color ?? "#6b7280", backgroundColor: `${color ?? "#6b7280"}15` }}>
          {count}
        </span>
      )}
    </div>
  );
}

export default function MachineSidebar() {
  const [tab, setTab] = useState("analise");

  return (
    <div className="w-full h-full bg-white rounded-xl border border-gray-100 shadow-sm flex flex-col overflow-hidden">

      {/* Tabs */}
      <div className="flex items-center border-b border-gray-100 px-2 pt-2 shrink-0">
        {[
          { key: "analise",   label: "Análise",   icon: BarChart2  },
          { key: "previsoes", label: "Previsões",  icon: TrendingUp },
        ].map(({ key, label, icon: Icon }) => (
          <button key={key} onClick={() => setTab(key)}
            className={`flex items-center gap-1.5 px-3 py-2 text-sm font-medium rounded-t-lg transition-colors
              ${tab === key
                ? "text-green-600 border-b-2 border-green-500 -mb-px bg-white"
                : "text-gray-400 hover:text-gray-600"}`}>
            <Icon size={13} strokeWidth={2} />
            {label}
          </button>
        ))}
        <button className="ml-auto p-1.5 text-gray-400 hover:text-gray-600 transition-colors">
          <ChevronRight size={15} strokeWidth={2} />
        </button>
      </div>

      {/* Body — flex col ocupando tudo */}
      <div className="flex-1 flex flex-col overflow-hidden p-3 gap-3">

        {/* ── Métricas rápidas ── */}
        <div className="grid grid-cols-3 gap-2 shrink-0">
          {metricas.map(({ label, value, total, color }) => (
            <div key={label} className="rounded-lg p-2.5 border flex flex-col gap-1"
              style={{ borderColor: `${color}25`, backgroundColor: `${color}08` }}>
              <span className="text-[10px] text-gray-400 font-medium">{label}</span>
              <span className="text-lg font-bold leading-none" style={{ color }}>{value}</span>
              {/* mini barra */}
              <div className="h-1 rounded-full bg-gray-100 overflow-hidden">
                <div className="h-full rounded-full transition-all"
                  style={{ width: `${(value / total) * 100}%`, backgroundColor: color }} />
              </div>
            </div>
          ))}
        </div>

        {/* ── Críticos ── */}
        <div className="flex flex-col shrink-0">
          <SectionTitle label="Críticos" count={criticos.length} color="#ef4444" />
          <div className="flex flex-col gap-0.5">
            {criticos.map((m) => <MachineRow key={m.id} item={m} />)}
          </div>
        </div>

        <div className="h-px bg-gray-100 shrink-0" />

        {/* ── Atenção ── */}
        <div className="flex flex-col shrink-0">
          <SectionTitle label="Atenção" count={atencao.length} color="#f59e0b" />
          <div className="flex flex-col gap-0.5">
            {atencao.map((m) => <MachineRow key={m.id} item={m} />)}
          </div>
        </div>

        <div className="h-px bg-gray-100 shrink-0" />

        {/* ── Previsões ── flex-1 pra ocupar espaço do meio ── */}
        <div className="flex flex-col min-h-0 flex-1">
          <SectionTitle label="Previsões" count={previsoes.length} color="#3b82f6" />
          <div className="flex flex-col gap-0.5 overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
            {previsoes.map((p, i) => (
              <button key={i}
                className="w-full flex items-center gap-2.5 px-2.5 py-2 rounded-lg hover:bg-gray-50 transition-colors group">
                <span className="w-6 h-6 rounded-full bg-blue-50 flex items-center justify-center shrink-0">
                  <Clock size={11} strokeWidth={2} className="text-blue-400" />
                </span>
                <div className="flex-1 text-left min-w-0">
                  <p className="text-xs font-medium text-gray-700 truncate leading-tight">{p.descricao}</p>
                  <p className="text-[10px] text-gray-400 truncate">{p.maquina}</p>
                </div>
                <span className="text-[10px] font-semibold text-blue-400 shrink-0 bg-blue-50 px-1.5 py-0.5 rounded-full">
                  {p.prazo}
                </span>
              </button>
            ))}
          </div>
        </div>

        <div className="h-px bg-gray-100 shrink-0" />

        {/* ── Resumo dos Alertas ── */}
        <div className="shrink-0">
          <h3 className="text-[10px] font-semibold text-gray-500 uppercase tracking-wider px-1 mb-2">
            Resumo dos Alertas
          </h3>
          <div className="flex items-center gap-3 px-1">
            <DonutChart data={resumo} />
            <div className="flex flex-col gap-1.5 flex-1 min-w-0">
              {resumo.map(({ label, count, color }) => (
                <div key={label} className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-1.5 min-w-0">
                    <span className="w-1.5 h-1.5 rounded-full shrink-0" style={{ backgroundColor: color }} />
                    <span className="text-[10px] text-gray-500 truncate">{label}</span>
                  </div>
                  <span className="text-[10px] font-bold text-gray-700 shrink-0">{count}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}