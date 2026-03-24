import { BrowserRouter, Routes, Route } from "react-router-dom";
import {
  HomeView,
  LoginView,
  ForecastsView,
  MachinesCNCView,
  AnalysesView,
  ProfileView,
  SettingsView,
  NotFoundView,
} from "../pages/index";

import { useAuth } from "../hooks";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { toast } from "sonner";

export function ProtectedRoute() {
  const { isAuthenticated } = useAuth();
  const location = useLocation();

  useEffect(() => {
    if (!isAuthenticated) {
      toast.error("Acesso restrito", {
        description: "Faça login para continuar.",
        duration: 4000,
      });
    }
  }, [isAuthenticated]);

  return isAuthenticated
    ? <Outlet />
    : <Navigate to="/login" state={{ from: location }} replace />;
}

export function PublicRoute() {
  const { isAuthenticated } = useAuth();
  return !isAuthenticated ? <Outlet /> : <Navigate to="/" replace />;
}

export function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<PublicRoute />}>
          <Route path="/login" element={<LoginView />} />
        </Route>

        <Route element={<ProtectedRoute />}>
          <Route path="/" element={<HomeView />} />
          <Route path="/forecasts" element={<ForecastsView />} />
          <Route path="/machinescnc" element={<MachinesCNCView />} />
          <Route path="/analyses" element={<AnalysesView />} />
          <Route path="/perfil" element={<ProfileView />} />
          <Route path="/configuracoes" element={<SettingsView />} />
          <Route path="/not-found" element={<NotFoundView />} />
          <Route path="*" element={<Navigate to="/not-found" replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}