// MachineModalTabs.jsx
export default function MachineModalTabs({ tabs, activeTab, onTabChange }) {
  return (
    <div className="flex items-center gap-0.5 px-4 pt-3 border-b border-gray-100 shrink-0">
      {tabs.map(({ key, label }) => (
        <button
          key={key}
          onClick={() => onTabChange(key)}
          className={`px-3 py-2 text-xs font-medium rounded-t-lg transition-colors whitespace-nowrap
            ${activeTab === key
              ? "text-green-600 border-b-2 border-green-500 -mb-px"
              : "text-gray-400 hover:text-gray-600"
            }`}
        >
          {label}
        </button>
      ))}
    </div>
  );
}