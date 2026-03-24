/* eslint-disable no-unused-vars */
import { useEffect, useRef, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  Monitor,
  Cpu,
  BarChart2,
  TrendingUp,
  Search,
  Bell,
  ChevronDown,
  User,
  Settings,
  LogOut,
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
  const dropdownRef = useRef(null);

  const activeItem = navItems.find((item) => item.path === location.pathname)?.label || "Análise";

  useEffect(() => {
    function handleClickOutside(e) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    logout();
    navigate("/login");
    setDropdownOpen(false);
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

  const getUserEmail = () => {
    return user?.email || "usuario@eco.com";
  };

  return (
    <header className="w-full bg-[#0d1117] border-b border-white/5 select-none">
      <div className="w-[90%] mx-auto p-4">
        <div className="flex items-center h-12 gap-8">
          <Link to="/" className="flex items-center shrink-0">
            <img src={logo} alt="Logo" className="w-full h-14 mr-2" />
          </Link>

          <nav className="flex items-center gap-1 flex-1">
            {navItems.map(({ label, icon: Icon, path }) => {
              const isActive = activeItem === label;
              return (
                <Link
                  key={label}
                  to={path}
                  className={`
                    flex items-center gap-2 px-4 py-2 rounded text-base font-medium
                    transition-colors duration-150
                    ${
                      isActive
                        ? "text-green-400"
                        : "text-gray-400 hover:text-gray-200"
                    }
                  `}
                >
                  {/* eslint-disable-next-line no-unused-vars */}
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

          <div className="flex items-center gap-1 shrink-0">
            <button
              onClick={() => navigate("/busca")}
              className="p-2 text-gray-400 hover:text-gray-200 hover:bg-white/5 rounded transition-colors"
              aria-label="Buscar"
            >
              <Search size={18} strokeWidth={1.8} />
            </button>

            <button
              onClick={() => navigate("/notificacoes")}
              className="p-2 text-gray-400 hover:text-gray-200 hover:bg-white/5 rounded transition-colors"
              aria-label="Notificações"
            >
              <Bell size={18} strokeWidth={1.8} />
            </button>

            <div className="relative ml-1" ref={dropdownRef}>
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
                  className={`text-gray-400 transition-transform duration-200 ${
                    dropdownOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              {dropdownOpen && (
                <div className="absolute right-0 top-full mt-2 w-48 bg-[#161b22] border border-white/10 rounded-lg shadow-xl overflow-hidden z-50">
                  <div className="px-4 py-3 border-b border-white/10">
                    <p className="text-sm font-semibold text-white">
                      {getUserName()}
                    </p>
                    <p className="text-xs text-gray-500 truncate">
                      {getUserEmail()}
                    </p>
                  </div>

                  <div className="py-1">
                    {dropdownItems.map(
                      ({ label, icon: Icon, path, action, danger }) => (
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
                            ${
                              danger
                                ? "text-red-400 hover:bg-red-500/10"
                                : "text-gray-400 hover:text-gray-100 hover:bg-white/5"
                            }
                          `}
                        >
                          {/* eslint-disable-next-line no-unused-vars */}
                          <Icon size={15} strokeWidth={1.8} />
                          {label}
                        </button>
                      ),
                    )}
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