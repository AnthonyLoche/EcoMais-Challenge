import { useEffect } from "react";
import { useMachines } from "../../hooks";
import { HeaderMain, TitleSection, CardsSection, MachinesMain, GraphsSection } from "../../components";
import { LayoutDashboard, Cog} from "lucide-react";

export default function Home() {
  // eslint-disable-next-line no-unused-vars
  const { state, getMachines } = useMachines();

  useEffect(() => {
    getMachines();
  }, []);

  return (
    <div>
      <HeaderMain />
      <TitleSection title="Visão Geral" icon={LayoutDashboard} />
      <CardsSection />
      <GraphsSection />
      <TitleSection title="Máquinas" icon={Cog} />
      <MachinesMain />

      {/* <pre>{JSON.stringify(state, null, 2)}</pre> */}
    </div>
  );
}
