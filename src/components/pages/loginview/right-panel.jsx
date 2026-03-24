import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Mail, ArrowRight, Loader2, Eye, EyeOff } from "lucide-react";
import { useAuth } from "../../../hooks";

export default function RightPanel() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [localError, setLocalError] = useState("");

  const { login, isLoading, error: authError } = useAuth();

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]: value,
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
        navigate("/");
      }
    } catch (err) {
      console.error(err);
      setLocalError("Erro ao conectar com o servidor");
    }
  };

  return (
    <div className="flex-1 flex flex-col justify-center items-center p-8 md:p-16 relative bg-white font-['DM_Sans']">
      {/* Faint top-right blob */}
      <div className="absolute top-0 right-0 w-72 h-72 bg-green-50 rounded-full blur-3xl pointer-events-none" />

      <div className="w-full max-w-[400px]">
        <div className="opacity-0 animate-[fadeUp_0.45s_ease_forwards] [animation-delay:0.05s] mb-10">
          <p className="text-slate-400 text-xs tracking-[0.2em] uppercase mb-3">
            Acesso corporativo
          </p>
          <h2 className="font-['Syne'] text-gray-900 text-4xl font-bold leading-tight">
            Bem-vindo
            <br />
            de volta.
          </h2>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Email Field */}
          <div className="opacity-0 animate-[fadeUp_0.45s_ease_forwards] [animation-delay:0.1s] space-y-2">
            <label
              className="text-xs font-medium text-slate-500 uppercase tracking-wider"
              htmlFor="email"
            >
              E-mail
            </label>
            <div className="relative">
              <input
                className="w-full bg-white border border-gray-200 rounded-lg px-4 py-3 pr-12 text-gray-900 text-sm font-['DM_Sans'] outline-none transition-all duration-200 focus:border-green-500 focus:shadow-[0_0_0_3px_rgba(34,197,94,0.12)] placeholder:text-gray-400"
                id="email"
                type="email"
                placeholder="nome@empresa.com.br"
                value={formData.email}
                onChange={handleInputChange}
                required
              />
              <Mail
                size={16}
                strokeWidth={1.8}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
              />
            </div>
          </div>

          {/* Password Field */}
          <div className="opacity-0 animate-[fadeUp_0.45s_ease_forwards] [animation-delay:0.15s] space-y-2">
            <div className="flex items-center justify-between">
              <label
                className="text-xs font-medium text-slate-500 uppercase tracking-wider"
                htmlFor="password"
              >
                Senha
              </label>
            </div>
            <div className="relative">
              <input
                className="w-full bg-white border border-gray-200 rounded-lg px-4 py-3 pr-12 text-gray-900 text-sm font-['DM_Sans'] outline-none transition-all duration-200 focus:border-green-500 focus:shadow-[0_0_0_3px_rgba(34,197,94,0.12)] placeholder:text-gray-400"
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
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
              >
                {showPassword ? (
                  <EyeOff size={16} strokeWidth={1.8} />
                ) : (
                  <Eye size={16} strokeWidth={1.8} />
                )}
              </button>
            </div>
          </div>

          {/* Error Message */}
          {(localError || authError) && (
            <div className="opacity-0 animate-[fadeUp_0.45s_ease_forwards] [animation-delay:0.15s]">
              <p className="text-red-500 text-sm bg-red-50 px-3 py-2 rounded-lg border border-red-200">
                {localError || authError}
              </p>
            </div>
          )}

          {/* Submit Button */}
          <div className="opacity-0 animate-[fadeUp_0.45s_ease_forwards] [animation-delay:0.25s] pt-2">
            <button
              className="w-full bg-green-600 hover:bg-green-700 text-white font-['Syne'] font-bold text-sm tracking-wide rounded-lg py-4 px-6 flex items-center justify-center gap-2 transition-all duration-200 hover:shadow-lg hover:shadow-green-600/20 active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed"
              type="submit"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Loader2 size={18} className="animate-spin" />
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
  );
}