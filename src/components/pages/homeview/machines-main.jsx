import MachineGroupedList from "./machines-list";
import MachineSidebar from "./machine-sidebar";

export default function MachinesMain() {
  return (
    <div className="w-[90%] mx-auto my-8 h-[calc(100vh-8rem)] flex gap-6 overflow-hidden">
      <div className="w-3/4 h-full overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
        <MachineGroupedList />
      </div>

      <div className="w-1/4 h-full overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
        <MachineSidebar />
      </div>
    </div>
  );
}