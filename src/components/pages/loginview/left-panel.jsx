import logo from "../../../assets/images/logo.png";

export default function LeftPanel() {
  return (
    <div className="relative hidden md:flex md:w-[52%] flex-col justify-between p-14 overflow-hidden bg-[#f0fdf4] bg-[linear-gradient(rgba(22,163,74,0.07)_1px,transparent_1px),linear-gradient(90deg,rgba(22,163,74,0.07)_1px,transparent_1px)] bg-[size:48px_48px]">
      <div className="absolute -bottom-24 -left-24 w-[480px] h-[480px] rounded-full bg-green-200/40 blur-3xl pointer-events-none" />
      <div className="absolute top-0 right-0 w-[260px] h-[260px] rounded-full bg-emerald-100/60 blur-3xl pointer-events-none" />

      <div className="absolute top-0 left-0 w-28 h-28 border-l-2 border-t-2 border-green-400/30" />
      <div className="absolute bottom-0 right-0 w-28 h-28 border-r-2 border-b-2 border-green-400/20" />

      <div className="relative z-10">
        <img src={logo} alt="ECO+" className="h-12 w-auto" />
      </div>

      <div className="relative z-10 space-y-8">
        <div>
          <p className="text-green-600 text-xs font-medium tracking-[0.25em] uppercase mb-5 font-['DM_Sans']">
            Industrial Intelligence v4.0
          </p>
          <h1 className="font-['Syne'] text-gray-900 text-6xl xl:text-7xl font-extrabold leading-[1.05] tracking-tight">
            Precisão
            <br />
            <span className="text-green-500">em</span>
            <br />
            Movimento.
          </h1>
        </div>

        <p className="text-slate-500 text-base leading-relaxed max-w-sm font-['DM_Sans']">
          Gerencie seu ecossistema produtivo global com dados em tempo real
          e automação de alto desempenho.
        </p>

        <div className="grid grid-cols-3 gap-3 pt-2">
          {[
            { value: "99.9%", label: "Uptime" },
            { value: "12ms", label: "Latência" },
            { value: "256-bit", label: "Criptografia" },
          ].map(({ value, label }) => (
            <div key={label} className="bg-white border border-green-500/15 rounded-xl px-4 py-3.5 shadow-sm">
              <p className="font-['Syne'] text-gray-800 text-lg font-bold leading-none mb-1">
                {value}
              </p>
              <p className="text-slate-400 text-xs font-['DM_Sans']">{label}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="relative z-10 flex items-center gap-3">
        <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
        <span className="text-slate-400 text-xs tracking-widest uppercase font-['DM_Sans']">
          Sistema operacional
        </span>
      </div>
    </div>
  );
}