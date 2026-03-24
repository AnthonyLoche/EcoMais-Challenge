import { HeaderMain, TitleSection, ComingSoon } from "../../components";
import { TrendingUp } from "lucide-react";

export default function ForecastsView() {
  return (
    <div>
      <HeaderMain />
      <TitleSection title="Previsões" icon={TrendingUp} />
      <ComingSoon />
    </div>
  );
}
