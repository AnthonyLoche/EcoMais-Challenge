import { HeaderMain, TitleSection, MachinesMain } from "../../components";
import { Cog } from "lucide-react";

export default function MachinesCNCView() {

  return (
    <div>
      <HeaderMain />
      <TitleSection title="Máquinas CNC" icon={Cog} />
      <MachinesMain />
    </div>
  )
};