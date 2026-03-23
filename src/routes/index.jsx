import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HomeView, LoginView, ForecastsView, MachinesCNCView, AnalysesView } from "../pages/index";

export function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomeView />} />
        <Route path="/login" element={<LoginView />} />
        <Route path="/forecasts" element={<ForecastsView />} />
        <Route path="/machinescnc" element={<MachinesCNCView />} />
        <Route path="/analyses" element={<AnalysesView />} />
      </Routes>
    </BrowserRouter>
  );
}
