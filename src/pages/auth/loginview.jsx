import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Mail,
  ArrowRight,
  Loader2,
  Eye,
  EyeOff,
} from "lucide-react";
import logo from "../../assets/images/logo.png";
import { useAuth } from "../../hooks";

export default function LoginView() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    remember: false,
  });
  const [showPassword, setShowPassword] = useState(false);
  const [localError, setLocalError] = useState("");
  
  const navigate = useNavigate();
  const { login, isLoading, error: authError } = useAuth();

  const handleInputChange = (e) => {
    const { id, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLocalError("");

    try {
      const success = await login({
        email: formData.email,
        password: formData.password,
      });

      if (success) {
        // Salva a opção "lembrar" no localStorage
        if (formData.remember) {
          localStorage.setItem("rememberEmail", formData.email);
        } else {
          localStorage.removeItem("rememberEmail");
        }
        
        navigate("/");
      }
    } catch (err) {
      console.error(err);
      setLocalError("Erro ao conectar com o servidor");
    }
  };

  // Recupera email salvo se existir
  const rememberedEmail = localStorage.getItem("rememberEmail");
  if (rememberedEmail && !formData.email) {
    setFormData(prev => ({ ...prev, email: rememberedEmail, remember: true }));
  }

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=DM+Sans:wght@300;400;500&display=swap');

        .login-root { font-family: 'DM Sans', sans-serif; }
        .login-headline { font-family: 'Syne', sans-serif; }

        .grid-bg {
          background-color: #f0fdf4;
          background-image:
            linear-gradient(rgba(22,163,74,0.07) 1px, transparent 1px),
            linear-gradient(90deg, rgba(22,163,74,0.07) 1px, transparent 1px);
          background-size: 48px 48px;
        }

        .eco-input {
          width: 100%;
          background: #fff;
          border: 1.5px solid #e2e8f0;
          border-radius: 10px;
          padding: 13px 44px 13px 16px;
          color: #0f172a;
          font-size: 14px;
          font-family: 'DM Sans', sans-serif;
          transition: border-color 0.2s, box-shadow 0.2s;
          outline: none;
        }
        .eco-input::placeholder { color: #94a3b8; }
        .eco-input:focus {
          border-color: #22c55e;
          box-shadow: 0 0 0 3px rgba(34,197,94,0.12);
        }

        .eco-submit {
          width: 100%;
          background: #16a34a;
          color: #fff;
          font-family: 'Syne', sans-serif;
          font-weight: 700;
          font-size: 15px;
          letter-spacing: 0.02em;
          border: none;
          border-radius: 10px;
          padding: 15px 24px;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          transition: background 0.2s, transform 0.15s, box-shadow 0.2s;
        }
        .eco-submit:hover:not(:disabled) {
          background: #15803d;
          box-shadow: 0 8px 24px rgba(22,163,74,0.28);
          transform: translateY(-1px);
        }
        .eco-submit:active:not(:disabled) { transform: scale(0.98); }
        .eco-submit:disabled { opacity: 0.5; cursor: not-allowed; }

        .eco-checkbox {
          appearance: none;
          width: 18px;
          height: 18px;
          border: 1.5px solid #cbd5e1;
          border-radius: 5px;
          background: #fff;
          cursor: pointer;
          flex-shrink: 0;
          transition: all 0.15s;
        }
        .eco-checkbox:checked {
          background: #16a34a;
          border-color: #16a34a;
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16'%3E%3Cpath fill='%23fff' d='M13.5 3.5L6 11 2.5 7.5l-1 1L6 13l8.5-8.5z'/%3E%3C/svg%3E");
          background-size: 12px;
          background-position: center;
          background-repeat: no-repeat;
        }

        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .spin { animation: spin 0.8s linear infinite; }

        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(14px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .fade-up { opacity: 0; animation: fadeUp 0.45s ease forwards; }
        .delay-1 { animation-delay: 0.05s; }
        .delay-2 { animation-delay: 0.1s; }
        .delay-3 { animation-delay: 0.15s; }
        .delay-4 { animation-delay: 0.2s; }
        .delay-5 { animation-delay: 0.25s; }
        .delay-6 { animation-delay: 0.3s; }

        .stat-badge {
          background: #fff;
          border: 1px solid rgba(22,163,74,0.15);
          border-radius: 10px;
          padding: 14px 18px;
          box-shadow: 0 1px 4px rgba(0,0,0,0.05);
        }

        .divider-line {
          height: 1px;
          background: linear-gradient(90deg, transparent, #e2e8f0, transparent);
        }

        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.4; }
        }
        .pulse { animation: pulse 2s infinite; }
      `}</style>

      <main className="login-root min-h-screen w-full flex bg-white overflow-hidden">

        {/* ── LEFT PANEL ── */}
        <div className="relative hidden md:flex md:w-[52%] flex-col justify-between p-14 overflow-hidden grid-bg">

          {/* Soft orb */}
          <div className="absolute -bottom-24 -left-24 w-[480px] h-[480px] rounded-full bg-green-200/40 blur-3xl pointer-events-none" />
          <div className="absolute top-0 right-0 w-[260px] h-[260px] rounded-full bg-emerald-100/60 blur-3xl pointer-events-none" />

          {/* Corner accents */}
          <div className="absolute top-0 left-0 w-28 h-28 border-l-2 border-t-2 border-green-400/30" />
          <div className="absolute bottom-0 right-0 w-28 h-28 border-r-2 border-b-2 border-green-400/20" />

          {/* Logo */}
          <div className="relative z-10">
            <img src={logo} alt="ECO+" className="h-12 w-auto" />
          </div>

          {/* Main copy */}
          <div className="relative z-10 space-y-8">
            <div>
              <p className="text-green-600 text-xs font-medium tracking-[0.25em] uppercase mb-5">
                Industrial Intelligence v4.0
              </p>
              <h1 className="login-headline text-gray-900 text-6xl xl:text-7xl font-extrabold leading-[1.05] tracking-tight">
                Precisão<br />
                <span className="text-green-500">em</span><br />
                Movimento.
              </h1>
            </div>

            <p className="text-slate-500 text-base leading-relaxed max-w-sm">
              Gerencie seu ecossistema produtivo global com dados em tempo real
              e automação de alto desempenho.
            </p>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-3 pt-2">
              {[
                { value: "99.9%", label: "Uptime" },
                { value: "12ms", label: "Latência" },
                { value: "256-bit", label: "Criptografia" },
              ].map(({ value, label }) => (
                <div key={label} className="stat-badge">
                  <p className="login-headline text-gray-800 text-lg font-bold leading-none mb-1">{value}</p>
                  <p className="text-slate-400 text-xs">{label}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Status */}
          <div className="relative z-10 flex items-center gap-3">
            <div className="w-2 h-2 rounded-full bg-green-500 pulse" />
            <span className="text-slate-400 text-xs tracking-widest uppercase">
              Sistema operacional
            </span>
          </div>
        </div>

        {/* ── RIGHT PANEL ── */}
        <div className="flex-1 flex flex-col justify-center items-center p-8 md:p-16 relative bg-white">

          {/* Faint top-right blob */}
          <div className="absolute top-0 right-0 w-72 h-72 bg-green-50 rounded-full blur-3xl pointer-events-none" />

          <div className="w-full max-w-[400px]">

            {/* Header */}
            <div className="fade-up delay-1 mb-10">
              <p className="text-slate-400 text-xs tracking-[0.2em] uppercase mb-3">
                Acesso corporativo
              </p>
              <h2 className="login-headline text-gray-900 text-4xl font-bold leading-tight">
                Bem-vindo<br />de volta.
              </h2>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-5">

              {/* Email */}
              <div className="fade-up delay-2 space-y-2">
                <label className="text-xs font-medium text-slate-500 uppercase tracking-wider" htmlFor="email">
                  E-mail
                </label>
                <div className="relative">
                  <input
                    className="eco-input"
                    id="email"
                    type="email"
                    placeholder="nome@empresa.com.br"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                  />
                  <Mail size={16} strokeWidth={1.8} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                </div>
              </div>

              {/* Password */}
              <div className="fade-up delay-3 space-y-2">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-medium text-slate-500 uppercase tracking-wider" htmlFor="password">
                    Senha
                  </label>
                  <a href="#" className="text-xs text-green-600 hover:text-green-700 transition-colors font-medium">
                    Esqueci minha senha
                  </a>
                </div>
                <div className="relative">
                  <input
                    className="eco-input"
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    value={formData.password}
                    onChange={handleInputChange}
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((p) => !p)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
                  >
                    {showPassword
                      ? <EyeOff size={16} strokeWidth={1.8} />
                      : <Eye size={16} strokeWidth={1.8} />
                    }
                  </button>
                </div>
              </div>

              {/* Error Message */}
              {(localError || authError) && (
                <div className="fade-up delay-3">
                  <p className="text-red-500 text-sm bg-red-50 px-3 py-2 rounded-lg border border-red-200">
                    {localError || authError}
                  </p>
                </div>
              )}

              {/* Remember */}
              <div className="fade-up delay-4 flex items-center gap-3">
                <input
                  className="eco-checkbox"
                  id="remember"
                  type="checkbox"
                  checked={formData.remember}
                  onChange={handleInputChange}
                />
                <label className="text-sm text-slate-500 select-none cursor-pointer" htmlFor="remember">
                  Manter sessão ativa
                </label>
              </div>

              {/* Submit */}
              <div className="fade-up delay-5 pt-2">
                <button className="eco-submit" type="submit" disabled={isLoading}>
                  {isLoading ? (
                    <>
                      <Loader2 size={18} className="spin" />
                      Autenticando...
                    </>
                  ) : (
                    <>
                      Acessar Sistema
                      <ArrowRight size={18} strokeWidth={2} />
                    </>
                  )}
                </button>
              </div>
            </form>

          </div>
        </div>
      </main>
    </>
  );
}