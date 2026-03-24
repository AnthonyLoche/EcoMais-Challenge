/* eslint-disable no-unused-vars */
import { useEffect, useRef, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  Monitor,
  Cpu,
  BarChart2,
  TrendingUp,
  Bell,
  ChevronDown,
  User,
  Settings,
  LogOut,
  Menu,
  X,
} from "lucide-react";
import logo from "../../assets/images/logo.png";
import { useAuth } from "../../hooks";

const navItems = [
  { label: "Visão Geral", icon: Monitor, path: "/" },
  { label: "Máquinas CNC", icon: Cpu, path: "/machinescnc" },
  { label: "Análise", icon: BarChart2, path: "/analyses" },
  { label: "Previsões", icon: TrendingUp, path: "/forecasts" },
];

export default function HeaderMain() {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const dropdownRef = useRef(null);

  const activeItem =
    navItems.find((item) => item.path === location.pathname)?.label || "Análise";

  useEffect(() => {
    function handleClickOutside(e) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);


  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  // Impede scroll quando o menu mobile está aberto
  useEffect(() => {
    document.body.style.overflow = mobileMenuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileMenuOpen]);

  const handleLogout = () => {
    logout();
    navigate("/login");
    setDropdownOpen(false);
    setMobileMenuOpen(false);
  };

  const dropdownItems = [
    { label: "Perfil", icon: User, path: "/perfil" },
    { label: "Configurações", icon: Settings, path: "/configuracoes" },
    { label: "Logout", icon: LogOut, action: handleLogout, danger: true },
  ];

  const getUserInitials = () => {
    if (user?.email) {
      const name = user.email.split("@")[0];
      return name.substring(0, 2).toUpperCase();
    }
    return "AP";
  };

  const getUserName = () => {
    if (user?.email) {
      const name = user.email.split("@")[0];
      return name
        .replace(/\./g, " ")
        .replace(/_/g, " ")
        .split(" ")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ");
    }
    return "Usuário";
  };

  const getUserEmail = () => user?.email || "usuario@eco.com";

  return (
    <>
      <header className="w-full bg-[#0d1117] border-b border-white/5 select-none relative z-40">
        <div className="w-[90%] mx-auto p-4">
          <div className="flex items-center h-12 gap-8">

            {/* Logo */}
            <Link to="/" className="flex items-center shrink-0">
              <img src={logo} alt="Logo" className="w-full h-14 mr-2" />
            </Link>

            {/* Nav desktop */}
            <nav className="hidden md:flex items-center gap-1 flex-1">
              {navItems.map(({ label, icon: Icon, path }) => {
                const isActive = activeItem === label;
                return (
                  <Link
                    key={label}
                    to={path}
                    className={`
                      flex items-center gap-2 px-4 py-2 rounded text-base font-medium
                      transition-colors duration-150
                      ${isActive ? "text-green-400" : "text-gray-400 hover:text-gray-200"}
                    `}
                  >
                    <Icon
                      size={18}
                      className={isActive ? "text-green-400" : "text-gray-500"}
                      strokeWidth={1.8}
                    />
                    {label}
                  </Link>
                );
              })}
            </nav>

            {/* Ações à direita */}
            <div className="flex items-center gap-2 ml-auto md:ml-0 shrink-0">

              {/* Avatar + dropdown — SOMENTE DESKTOP */}
              <div className="hidden md:block relative" ref={dropdownRef}>
                <button
                  onClick={() => setDropdownOpen((prev) => !prev)}
                  className="flex items-center gap-1.5 pl-1 pr-1 py-1 rounded hover:bg-white/5 transition-colors"
                  aria-label="Menu do usuário"
                >
                  <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white text-xs font-bold">
                    {getUserInitials()}
                  </div>
                  <ChevronDown
                    size={14}
                    strokeWidth={2}
                    className={`text-gray-400 transition-transform duration-200 ${dropdownOpen ? "rotate-180" : ""}`}
                  />
                </button>

                {dropdownOpen && (
                  <div className="absolute right-0 top-full mt-2 w-48 bg-[#161b22] border border-white/10 rounded-lg shadow-xl overflow-hidden z-50">
                    <div className="px-4 py-3 border-b border-white/10">
                      <p className="text-sm font-semibold text-white">{getUserName()}</p>
                      <p className="text-xs text-gray-500 truncate">{getUserEmail()}</p>
                    </div>
                    <div className="py-1">
                      {dropdownItems.map(({ label, icon: Icon, path, action, danger }) => (
                        <button
                          key={label}
                          onClick={() => {
                            if (action) {
                              action();
                            } else if (path) {
                              setDropdownOpen(false);
                              navigate(path);
                            }
                          }}
                          className={`
                            w-full flex items-center gap-3 px-4 py-2.5 text-sm
                            transition-colors duration-150
                            ${danger
                              ? "text-red-400 hover:bg-red-500/10"
                              : "text-gray-400 hover:text-gray-100 hover:bg-white/5"
                            }
                          `}
                        >
                          <Icon size={15} strokeWidth={1.8} />
                          {label}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Botão hamburger — somente mobile */}
              <button
                className="md:hidden flex items-center justify-center w-9 h-9 rounded hover:bg-white/5 transition-colors text-gray-400"
                onClick={() => setMobileMenuOpen((prev) => !prev)}
                aria-label={mobileMenuOpen ? "Fechar menu" : "Abrir menu"}
              >
                {mobileMenuOpen ? <X size={20} strokeWidth={1.8} /> : <Menu size={20} strokeWidth={1.8} />}
              </button>
            </div>
          </div>
        </div>
      </header>

      <div
        className={`
          fixed inset-0 bg-black/60 z-30 md:hidden
          transition-opacity duration-300
          ${mobileMenuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}
        `}
        onClick={() => setMobileMenuOpen(false)}
      />

      <div
        className={`
          fixed top-0 right-0 h-full w-72 max-w-[85vw]
          bg-[#0d1117] border-l border-white/5
          z-40 md:hidden
          flex flex-col
          transition-transform duration-300 ease-in-out
          ${mobileMenuOpen ? "translate-x-0" : "translate-x-full"}
        `}
      >
        <div className="flex items-center justify-between px-5 py-4 border-b border-white/5">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white text-xs font-bold">
              {getUserInitials()}
            </div>
            <div>
              <p className="text-sm font-semibold text-white leading-tight">{getUserName()}</p>
              <p className="text-xs text-gray-500 truncate max-w-[140px]">{getUserEmail()}</p>
            </div>
          </div>
          <button
            onClick={() => setMobileMenuOpen(false)}
            className="text-gray-500 hover:text-gray-300 transition-colors"
            aria-label="Fechar menu"
          >
            <X size={18} strokeWidth={1.8} />
          </button>
        </div>

        {/* Itens de navegação */}
        <nav className="flex-1 overflow-y-auto py-3">
          <p className="px-5 pb-2 text-xs font-medium text-gray-600 uppercase tracking-wider">
            Navegação
          </p>
          {navItems.map(({ label, icon: Icon, path }) => {
            const isActive = activeItem === label;
            return (
              <Link
                key={label}
                to={path}
                className={`
                  flex items-center gap-3 px-5 py-3 text-sm font-medium
                  transition-colors duration-150
                  ${isActive
                    ? "text-green-400 bg-green-400/5 border-r-2 border-green-400"
                    : "text-gray-400 hover:text-gray-200 hover:bg-white/5"
                  }
                `}
              >
                <Icon
                  size={18}
                  className={isActive ? "text-green-400" : "text-gray-500"}
                  strokeWidth={1.8}
                />
                {label}
              </Link>
            );
          })}

          {/* Divisor */}
          <div className="my-3 mx-5 border-t border-white/5" />

          <p className="px-5 pb-2 text-xs font-medium text-gray-600 uppercase tracking-wider">
            Conta
          </p>

          {dropdownItems
            .filter((item) => !item.danger)
            .map(({ label, icon: Icon, path }) => (
              <button
                key={label}
                onClick={() => {
                  setMobileMenuOpen(false);
                  navigate(path);
                }}
                className="w-full flex items-center gap-3 px-5 py-3 text-sm text-gray-400 hover:text-gray-200 hover:bg-white/5 transition-colors duration-150"
              >
                <Icon size={18} strokeWidth={1.8} className="text-gray-500" />
                {label}
              </button>
            ))}
        </nav>

        <div className="border-t border-white/5 p-3">
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm text-red-400 hover:bg-red-500/10 transition-colors duration-150"
          >
            <LogOut size={18} strokeWidth={1.8} />
            Logout
          </button>
        </div>
      </div>
    </>
  );
}