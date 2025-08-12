
export const NavItem = ({ icon, label, tabName, activeTab, setActiveTab }) => (
  <li>
    <button
      onClick={() => setActiveTab(tabName)}
      className={`w-full flex items-center gap-3 p-3 rounded-md text-left transition-all duration-200 ${
        activeTab === tabName ? 'bg-blue-500 text-white shadow' : 'hover:bg-gray-100'
      }`}
    >
      {icon}
      <span className="font-medium">{label}</span>
    </button>
  </li>
);