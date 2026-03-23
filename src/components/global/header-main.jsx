import { useEffect, useRef, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  Monitor,
  Cpu,
  BarChart2,
  TrendingUp,
  Search,
  Bell,
  X,
  ChevronDown,
  User,
  Settings,
  LogOut,
} from "lucide-react";
import logo from "../../assets/images/logo.png";

const navItems = [
  { label: "Visão Geral", icon: Monitor, path: "/" },
  { label: "Máquinas CNC", icon: Cpu, path: "/machinescnc" },
  { label: "Análise", icon: BarChart2, path: "/analyses" },
  { label: "Previsões", icon: TrendingUp, path: "/forecasts" },
];

const dropdownItems = [
  { label: "Perfil", icon: User, path: "/perfil" },
  { label: "Configurações", icon: Settings, path: "/configuracoes" },
  { label: "Logout", icon: LogOut, path: "/login", danger: true },
];

export default function HeaderMain() {
  const location = useLocation();
  const navigate = useNavigate();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const getActiveItem = () => {
    const activeNav = navItems.find((item) => item.path === location.pathname);
    return activeNav ? activeNav.label : "Análise";
  };

  const [activeItem, setActiveItem] = useState(getActiveItem());

  useEffect(() => {
    setActiveItem(getActiveItem());
  }, [location.pathname]);

  useEffect(() => {
    function handleClickOutside(e) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header className="w-full bg-[#0d1117] border-b border-white/5 select-none">
      <div className="w-[90%] mx-auto p-4">
        <div className="flex items-center h-12 gap-8">

          {/* Logo */}
          <Link to="/" className="flex items-center shrink-0">
            <img src={logo} alt="Logo" className="w-full h-14 mr-2" />
          </Link>

          {/* Nav Links */}
          <nav className="flex items-center gap-1 flex-1">
            {navItems.map(({ label, icon: Icon, path }) => {
              const isActive = activeItem === label;
              return (
                <Link
                  key={label}
                  to={path}
                  onClick={() => setActiveItem(label)}
                  className={`
                    flex items-center gap-2 px-4 py-2 rounded text-base font-medium
                    transition-colors duration-150
                    ${isActive
                      ? "text-green-400"
                      : "text-gray-400 hover:text-gray-200"
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
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-1 shrink-0">
            {/* Search */}
            <button
              onClick={() => navigate("/busca")}
              className="p-2 text-gray-400 hover:text-gray-200 hover:bg-white/5 rounded transition-colors"
            >
              <Search size={18} strokeWidth={1.8} />
            </button>

            {/* Bell */}
            <button
              onClick={() => navigate("/notificacoes")}
              className="p-2 text-gray-400 hover:text-gray-200 hover:bg-white/5 rounded transition-colors"
            >
              <Bell size={18} strokeWidth={1.8} />
            </button>

             {/* Avatar + Dropdown */}
            <div className="relative ml-1" ref={dropdownRef}>
              <button
                onClick={() => setDropdownOpen((prev) => !prev)}
                className="flex items-center gap-1.5 pl-1 pr-1 py-1 rounded hover:bg-white/5 transition-colors"
              >
                <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white text-xs font-bold">
                  AP
                </div>
                <ChevronDown
                  size={14}
                  strokeWidth={2}
                  className={`text-gray-400 transition-transform duration-200 ${
                    dropdownOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              {/* Dropdown Menu */}
              {dropdownOpen && (
                <div className="absolute right-0 top-full mt-2 w-48 bg-[#161b22] border border-white/10 rounded-lg shadow-xl overflow-hidden z-50">
                  {/* Info do usuário */}
                  <div className="px-4 py-3 border-b border-white/10">
                    <p className="text-sm font-semibold text-white">Ana Paula</p>
                    <p className="text-xs text-gray-500 truncate">ana.paula@eco.com</p>
                  </div>

                  {/* Itens do menu */}
                  <div className="py-1">
                    {dropdownItems.map(({ label, icon: Icon, path, danger }) => (
                      <button
                        key={label}
                        onClick={() => {
                          setDropdownOpen(false);
                          navigate(path);
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
          </div>

        </div>
      </div>
    </header>
  );
}