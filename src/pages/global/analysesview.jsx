import { HeaderMain, TitleSection, ComingSoon } from "../../components";
import { ChartBarIcon } from "lucide-react";

export default function AnalysesView() {
  return (
    <div>
      <HeaderMain />
      <TitleSection title="Análise" icon={ChartBarIcon} />
      <ComingSoon />
    </div>
  );
}
