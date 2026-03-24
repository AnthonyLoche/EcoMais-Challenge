import { useState, useEffect, useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { MetricsCard } from "../../";
import { useMachines } from "../../../hooks";

function useCardsPerView() {
  const getCards = () => (window.innerWidth >= 768 ? 4 : 1);
  const [cardsPerView, setCardsPerView] = useState(getCards);

  useEffect(() => {
    const handler = () => setCardsPerView(getCards());
    window.addEventListener("resize", handler);
    return () => window.removeEventListener("resize", handler);
  }, []);

  return cardsPerView;
}

/**
 * Monta o array de slides com `cardsPerView` clones em cada extremidade,
 * garantindo que nunca apareçam slots vazios independente do número de
 * cards visíveis.
 *
 * Layout:  [ ...clonesFim | ...original | ...clonesInicio ]
 * O índice "real 0" fica na posição `cloneCount` dentro do array.
 */
function buildSlides(items, cardsPerView) {
  const n = items.length;
  if (n === 0) return { slides: [], offset: 0 };

  const cloneCount = cardsPerView;

  const headClones = Array.from(
    { length: cloneCount },
    (_, i) => items[(n - cloneCount + i + n) % n]
  );

  const tailClones = Array.from(
    { length: cloneCount },
    (_, i) => items[i % n]
  );

  return {
    slides: [...headClones, ...items, ...tailClones],
    offset: cloneCount,
  };
}

export default function CardsSection() {
  const { machinesByStatus } = useMachines();
  const cardsPerView = useCardsPerView();

  const total = machinesByStatus?.length ?? 0;
  const { slides, offset } = buildSlides(machinesByStatus ?? [], cardsPerView);

  const [current, setCurrent] = useState(offset);
  const [transitioning, setTransitioning] = useState(true);
  const lockRef = useRef(false);

  useEffect(() => {
    setCurrent(offset);
    setTransitioning(false);
    const t = setTimeout(() => setTransitioning(true), 20);
    return () => clearTimeout(t);
  }, [cardsPerView, offset]);

  useEffect(() => {
    if (!transitioning || total === 0) return;

    const realEnd = offset + total;

    if (current >= realEnd) {
      const t = setTimeout(() => {
        setTransitioning(false);
        setCurrent((c) => c - total);
      }, 350);
      return () => clearTimeout(t);
    }

    if (current < offset) {
      const t = setTimeout(() => {
        setTransitioning(false);
        setCurrent((c) => c + total);
      }, 350);
      return () => clearTimeout(t);
    }
  }, [current, total, offset, transitioning]);

  useEffect(() => {
    if (!transitioning) {
      const t = setTimeout(() => setTransitioning(true), 20);
      return () => clearTimeout(t);
    }
  }, [transitioning]);

  const navigate = (dir) => {
    if (lockRef.current) return;
    lockRef.current = true;
    setCurrent((c) => c + dir);
    setTimeout(() => { lockRef.current = false; }, 380);
  };

  const next = () => navigate(1);
  const prev = () => navigate(-1);

  const realIndex = ((current - offset) % total + total) % total;

  if (total === 0) return null;

  const cardWidth = 100 / cardsPerView;

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
              transform: `translateX(-${current * cardWidth}%)`,
              transition: transitioning ? "transform 350ms ease-in-out" : "none",
            }}
          >
            {slides.map((item, i) => (
              <div
                key={i}
                className="flex-shrink-0 px-3"
                style={{ width: `${cardWidth}%` }}
              >
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

        <div className="flex justify-center gap-1.5 mt-4 md:hidden">
          {(machinesByStatus ?? []).map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(offset + i)}
              aria-label={`Ir para card ${i + 1}`}
              className={`
                rounded-full transition-all duration-300
                ${realIndex === i
                  ? "w-4 h-2 bg-gray-600"
                  : "w-2 h-2 bg-gray-300 hover:bg-gray-400"
                }
              `}
            />
          ))}
        </div>
      </div>
    </div>
  );
}