import { useLoading } from "../../hooks";
import loading_gif from "../../assets/images/loading.gif";

export default function Loading() {
  const { isLoading, currentMessage } = useLoading();

  if (!isLoading) return null;

  return (
    <div className="fixed inset-0 bg-white backdrop-blur-sm flex items-center justify-center z-50">
      <div className="flex flex-col items-center gap-4 p-8 bg-white rounded-2xl">
        <img
          src={loading_gif}
          alt="Carregando..."
          className="w-[50%]  object-contain"
        />
        <span className="text-sm text-[#16a34a] font-medium tracking-wide">
          {currentMessage}
        </span>
      </div>
    </div>
  );
}