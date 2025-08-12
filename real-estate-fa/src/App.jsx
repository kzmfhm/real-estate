import { NavItem } from "./component/layout/NavItem";
import { Building, Layers, User } from "lucide-react";
import { AgentsView } from "./views/AgentsView";
import { FieldsView } from "./views/FieldsView";
import { ListingsView } from "./views/ListingsView";
import { useState } from "react";
import { useRealEstateData } from "./hooks/useRealEstateData";


export default function App() {
  const [activeTab, setActiveTab] = useState('listings');
  const { data, handleCrud, handleFieldChange, getNewId } = useRealEstateData();

  const renderContent = () => {
    const props = { data, onCrud: handleCrud, onFieldChange: handleFieldChange, getNewId };
    switch (activeTab) {
      case 'listings': return <ListingsView {...props} />;
      case 'agents': return <AgentsView {...props} />;
      case 'fields': return <FieldsView data={data} onCrud={handleCrud} />;
      default: return null;
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen font-sans text-gray-800">
      <div className="container mx-auto p-4 md:p-8">
        <header className="mb-8">
          <h1 className="text-4xl font-bold text-gray-800">Real Estate Manager</h1>
          <p className="text-gray-500 mt-1">A client-side interface for managing property data.</p>
        </header>
        <div className="flex flex-col md:flex-row gap-8">
          <aside className="md:w-1/4">
            <nav className="bg-white rounded-lg shadow p-4">
              <ul>
                <NavItem icon={<Building size={20} />} label="Listings" tabName="listings" activeTab={activeTab} setActiveTab={setActiveTab} />
                <NavItem icon={<User size={20} />} label="Agents" tabName="agents" activeTab={activeTab} setActiveTab={setActiveTab} />
                <NavItem icon={<Layers size={20} />} label="Fields Schema" tabName="fields" activeTab={activeTab} setActiveTab={setActiveTab} />
              </ul>
            </nav>
          </aside>
          <main className="flex-1">
            {renderContent()}
          </main>
        </div>
      </div>
    </div>
  );
}
