import { useEffect } from "react";
import { useMachines } from "../../hooks";
import { HeaderMain, TitleSection, CardsSection, MachinesMain } from "../../components";

export default function Home() {
  // eslint-disable-next-line no-unused-vars
  const { state, getMachines, types_machines, selectedMachine } = useMachines();

  useEffect(() => {
    getMachines();
  }, []);

  return (
    <div>
      <HeaderMain />
      <TitleSection title="Visão Geral" />
      <CardsSection />
      <TitleSection title="Máquinas" />
      <MachinesMain />

      {/* <pre>{JSON.stringify(state, null, 2)}</pre> */}
      {/* <pre>{JSON.stringify(types_machines, null, 2)}</pre> */}
      {/* <pre>{JSON.stringify(selectedMachine, null, 2)}</pre> */}
    </div>
  );
}
