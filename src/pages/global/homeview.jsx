import { useEffect } from "react";
import { useMachines } from "../../hooks";
import { HeaderMain, TitleSection, CardsSection } from "../../components";

export default function Home() {
  // eslint-disable-next-line no-unused-vars
  const { state, getMachines, types_machines } = useMachines();

  useEffect(() => {
    getMachines();
  }, []);

  return (
    <div>
      <HeaderMain />
      <TitleSection title="Visão Geral" />
      <CardsSection />
      {/* <pre>{JSON.stringify(state, null, 2)}</pre> */}
      {/* <pre>{JSON.stringify(types_machines, null, 2)}</pre> */}
    </div>
  );
}
