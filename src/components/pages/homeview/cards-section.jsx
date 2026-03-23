import { MetricsCard } from "../../";
import { useMachines } from "../../../hooks";

export default function CardsSection() {
  const { machinesByStatus } = useMachines();

  return (
    <div className="w-[80%] mx-auto my-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {machinesByStatus.map((item) => (
        <MetricsCard
          key={item.status}
          title={item.status}
          value={item.count}
          icon={item.icon}
          color={item.color}
        />
      ))}
    </div>
  );
}