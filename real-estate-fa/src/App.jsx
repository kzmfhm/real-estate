import { useState, useEffect } from 'react';
import { Building, User, Layers } from 'lucide-react';
import api from './api';
import { ListingsView } from './views/ListingsView';
import { AgentsView } from './views/AgentsView';
import { FieldsView } from './views/FieldsView';
import NavItem from './component/layout/NavItem';


export default function App() {
  const [activeTab, setActiveTab] = useState('listings');
  const [data, setData] = useState({
    listings: [],
    agents: [],
    fields: [],
    listingsFields: [],
    agentsFields: [],
  });
  const [editingItem, setEditingItem] = useState(null);
  const [isLoading, setIsLoading] = useState(true);


  const fetchAllData = async () => {
    setIsLoading(true);
    try {
      const [listingsRes, agentsRes, fieldsRes] = await Promise.all([
        api.get('/listings'),
        api.get('/agents'),
        api.get('/fields'),
      ]);

      const formattedListings = listingsRes.data.map(listing => ({
        ...listing,
        agentIds: listing.agents.map(agent => agent.id),
      }));

      const listingsFields = listingsRes.data.flatMap(l =>
        l.customFields ? l.customFields.map(cf => ({
          id: cf.id,
          listingId: l.id,
          fieldId: cf.field.id,
          value: cf.value,
        })) : []
      );

      const agentsFields = agentsRes.data.flatMap(a =>
        a.customFields ? a.customFields.map(cf => ({
          id: cf.id,
          agentId: a.id,
          fieldId: cf.field.id,
          value: cf.value,
        })) : []
      );

      setData({
        listings: formattedListings,
        agents: agentsRes.data,
        fields: fieldsRes.data,
        listingsFields,
        agentsFields,
      });

    } catch (error) {
      console.error("Failed to fetch data:", error);
      alert("Could not connect to the backend. Please ensure it is running and try refreshing the page.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleCrud = async (entityType, operation, payload) => {
    try {
      setIsLoading(true);
      switch (operation) {
        case 'create':
          await api.post(`/${entityType}`, payload);
          break;
        case 'update':
          await api.put(`/${entityType}/${payload.id}`, payload);
          break;
        case 'delete':
          await api.delete(`/${entityType}/${payload.id}`);
          break;
        default:
          console.warn('Unknown CRUD operation:', operation);
      }

      await fetchAllData();
      setEditingItem(null);
    } catch (error) {
      console.error(`Failed to perform ${operation} on ${entityType}:`, error);
      alert(`Error performing ${operation} on ${entityType}. Check console for details.`);
    } finally {
      setIsLoading(false);
    }
  };


  const getNewId = () => Date.now();
  const onFieldChange = (itemId, fieldId, value) => {
    console.log(`Field changed for item ${itemId}, field ${fieldId}: ${value}`);
  };

  useEffect(() => {
    fetchAllData();
  }, []);

  const handleDataChange = () => {
    fetchAllData();
    setEditingItem(null);
  };

  const renderContent = () => {
    if (isLoading) {
      return <div className="text-center p-10 text-gray-500">Loading data from the server...</div>;
    }

    const viewProps = {
      data,
      onDataChange: handleDataChange,
      editingItem,
      setEditingItem,
      onCrud: handleCrud,
      onFieldChange: onFieldChange,
      getNewId: getNewId,
    };

    switch (activeTab) {
      case 'listings':
        return <ListingsView {...viewProps} />;
      case 'agents':
        return <AgentsView {...viewProps} />;
      case 'fields':
        return <FieldsView {...viewProps} />;
      default:
        return null;
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen font-sans text-gray-800">
      <div className="container mx-auto p-4 md:p-8">
        <header className="mb-8">
          <h1 className="text-4xl font-bold text-gray-800">Real Estate Manager</h1>
          <p className="text-gray-500 mt-1">A fully integrated application for managing property data.</p>
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
