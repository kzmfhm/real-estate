import { Plus } from "lucide-react";
import {ListingForm} from "../component/forms/ListingForm"
import { Button } from "../component/ui/Button";
import { useState } from "react";
import { ListingItem } from "../component/items/ListingItem";


export const ListingsView = ({ data, onCrud, onFieldChange, getNewId }) => {
  const [editingId, setEditingId] = useState(null);
  const [isCreating, setIsCreating] = useState(false);

  const handleSave = (payload) => {
    const operation = payload.id ? 'update' : 'create';
    onCrud('listings', operation, payload);
    setEditingId(null);
    setIsCreating(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Listings</h2>
        <Button onClick={() => { setIsCreating(true); setEditingId(null); }}>
          <Plus size={16} /> Add Listing
        </Button>
      </div>
      {isCreating && <ListingForm agents={data.agents} onSave={handleSave} onCancel={() => setIsCreating(false)} allFields={data.fields} onFieldChange={onFieldChange} getNewId={getNewId} />}
      {data.listings.map(listing => (
        editingId === listing.id
        ? <ListingForm key={listing.id} listing={listing} agents={data.agents} onSave={handleSave} onCancel={() => setEditingId(null)} allFields={data.fields} listingsFields={data.listingsFields} onFieldChange={onFieldChange} />
        : <ListingItem key={listing.id} listing={listing} data={data} onEdit={() => { setEditingId(listing.id); setIsCreating(false); }} onDelete={() => onCrud('listings', 'delete', { id: listing.id })} />
      ))}
    </div>
  );
};