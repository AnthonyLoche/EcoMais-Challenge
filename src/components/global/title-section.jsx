export default function TitleSection({ title, icon: Icon }) {
  return (
    <div className="w-[90%] mx-auto my-8 border-b border-gray-300 pb-2 flex items-center gap-2">
      <div className="flex items-center">
        {Icon && (
          <Icon size={28} strokeWidth={1.5} style={{ color: "#374151" }} />
        )}
      </div>
      <h1 className="text-3xl text-gray-700">{title}</h1>
    </div>
  );
}
