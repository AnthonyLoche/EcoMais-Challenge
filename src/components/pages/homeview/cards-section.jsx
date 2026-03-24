import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { MetricsCard } from "../../";
import { useMachines } from "../../../hooks";

export default function CardsSection() {
  const { machinesByStatus } = useMachines();
  const [current, setCurrent] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(true);

  const total = machinesByStatus?.length ?? 0;

  useEffect(() => {
    if (total === 0) return;

    if (current === total) {
      const t = setTimeout(() => {
        setIsTransitioning(false);
        setCurrent(0);
      }, 350);
      return () => clearTimeout(t);
    }

    if (current === -1) {
      const t = setTimeout(() => {
        setIsTransitioning(false);
        setCurrent(total - 1);
      }, 350);
      return () => clearTimeout(t);
    }
  }, [current, total]);

  useEffect(() => {
    if (!isTransitioning) {
      const t = setTimeout(() => setIsTransitioning(true), 20);
      return () => clearTimeout(t);
    }
  }, [isTransitioning]);

  if (total === 0) return null;

  const slides = [
    machinesByStatus[total - 1],
    ...machinesByStatus,
    machinesByStatus[0],
  ];

  const goTo = (index) => setCurrent(index);
  const next = () => goTo(current + 1);
  const prev = () => goTo(current - 1);

  return (
    <div className="w-[90%] mx-auto my-8">
      <div className="relative">
        <button
          onClick={prev}
          className="absolute -left-5 top-1/2 -translate-y-1/2 z-10
                     w-9 h-9 rounded-full bg-white shadow-md border border-gray-200
                     flex items-center justify-center text-gray-600
                     hover:bg-gray-50 hover:shadow-lg transition-all"
          aria-label="Anterior"
        >
          <ChevronLeft size={18} strokeWidth={2.5} />
        </button>

        <button
          onClick={next}
          className="absolute -right-5 top-1/2 -translate-y-1/2 z-10
                     w-9 h-9 rounded-full bg-white shadow-md border border-gray-200
                     flex items-center justify-center text-gray-600
                     hover:bg-gray-50 hover:shadow-lg transition-all"
          aria-label="Próximo"
        >
          <ChevronRight size={18} strokeWidth={2.5} />
        </button>

        <div className="overflow-hidden mx-4">
          <div
            className="flex"
            style={{
              transform: `translateX(-${(current + 1) * 25}%)`,
              transition: isTransitioning ? "transform 350ms ease-in-out" : "none",
            }}
          >
            {slides.map((item, i) => (
              <div key={i} className="w-1/4 flex-shrink-0 px-3">
                <MetricsCard
                  title={item?.status}
                  value={item?.count}
                  icon={item?.icon}
                  color={item?.color}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    
    </div>
  );
}