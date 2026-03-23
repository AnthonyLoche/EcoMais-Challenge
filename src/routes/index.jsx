import { BrowserRouter, Routes, Route } from "react-router-dom";
import {
  HomeView,
  LoginView,
  ForecastsView,
  MachinesCNCView,
  AnalysesView,
} from "../pages/index";

import { useAuth } from "../hooks";
import { Navigate, Outlet } from "react-router-dom";

export function ProtectedRoute() {
  const { isAuthenticated } = useAuth();

  return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />;
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
        </Route>
      </Routes>
    </BrowserRouter>
  );
}