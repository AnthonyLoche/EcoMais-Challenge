// components/Loading.jsx
import { useLoading } from "../../hooks";

export default function Loading() {
  const { isLoading, currentMessage } = useLoading();

  if (!isLoading) return null;

  return (
    <div className="fixed inset-0 bg-white/95 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="flex flex-col items-center gap-4 p-8 bg-white rounded-2xl shadow-xl">
        <div className="w-12 h-12 rounded-full border-4 border-[#f0fdf4] border-t-[#16a34a] animate-spin" />
        <span className="text-sm text-[#16a34a] font-medium tracking-wide">
          {currentMessage}
        </span>
      </div>
    </div>
  );
}