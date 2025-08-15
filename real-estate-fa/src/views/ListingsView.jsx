import { useState } from 'react';
import { Plus } from 'lucide-react';
import { Button } from "../component/ui/Button";
import ListingItem from '../component/items/ListingItem';
import {ListingForm} from "../component/forms/ListingForm"
import api from '../api';

export const ListingsView = ({ data, onDataChange, editingItem, setEditingItem }) => {
  const [isCreating, setIsCreating] = useState(false);

  const handleSave = async (payload) => {
    try {
      if (editingItem?.data?.id) {
        await api.patch(`/listings/${editingItem.data.id}`, payload);
      } else {
        await api.post('/listings', payload);
      }
      onDataChange();
    } catch (error) {
      console.error('Failed to save listing:', error);
      alert('Error: Could not save the listing.');
    } finally {
      setIsCreating(false);
      setEditingItem(null);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this listing?')) {
      try {
        await api.delete(`/listings/${id}`);
        onDataChange();
      } catch (error) {
        console.error('Failed to delete listing:', error);
        alert('Error: Could not delete the listing.');
      }
    }
  };
  
  const handleEdit = (listing) => {
    setEditingItem({ type: 'listing', data: listing });
    setIsCreating(false);
  };

  const handleAddNew = () => {
    setIsCreating(true);
    setEditingItem(null);
  };

  const handleCancel = () => {
    setIsCreating(false);
    setEditingItem(null);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Listings</h2>
        <Button onClick={handleAddNew}>
          <Plus size={16} /> Add Listing
        </Button>
      </div>
      {isCreating && <ListingForm agents={data.agents} allFields={data.fields} onSave={handleSave} onCancel={handleCancel} />}
      {data.listings.map(listing => (
        editingItem?.type === 'listing' && editingItem?.data?.id === listing.id
        ? <ListingForm key={listing.id} listing={listing} agents={data.agents} allFields={data.fields} 
         listingsFields={data.listingsFields} onSave={handleSave} onCancel={handleCancel} />
        : <ListingItem key={listing.id} listing={listing} data={data} onEdit={() => handleEdit(listing)} onDelete={() => handleDelete(listing.id)} />
      ))}
    </div>
  );
};
