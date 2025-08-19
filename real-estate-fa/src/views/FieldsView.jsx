import { Edit, Plus } from "lucide-react";
import { Button } from "../component/ui/Button";
import { Card } from "../component/ui/Card";
import { FieldForm } from "../component/forms/FieldForm";
import { useState } from "react";
import { Trash2 } from "lucide-react";
import api from "../api";


export const FieldsView = ({ data, onDataChange, editingItem, setEditingItem }) => {
  const [isCreating, setIsCreating] = useState(false);

  const handleSave = async (payload) => {
    try {
      if (payload.id) {
        await api.patch(`/fields/${payload.id}`, { name: payload.name, type: payload.type });
      } else {
        await api.post('/fields', payload);
      }
      onDataChange();
    } catch (error) {
      console.error('Failed to save field:', error);
      alert('Error: Could not save the field. Check the console for details.');
    } finally {
      setIsCreating(false);
      setEditingItem(null);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure? This will remove the field from all listings and agents.')) {
      try {
        await api.delete(`/fields/${id}`);
        onDataChange();
      } catch (error) {
        console.error('Failed to delete field:', error);
        alert('Error: Could not delete the field.');
      }
    }
  };

  const handleEdit = (field) => {
    setEditingItem({ type: 'field', data: field });
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
    <Card>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Fields Schema</h2>
        <Button onClick={handleAddNew}>
          <Plus size={16} /> Add Field
        </Button>
      </div>
      <p className="text-gray-500 mb-6">Define the data structure for listings and agents.</p>
      {isCreating && <FieldForm onSave={handleSave} onCancel={handleCancel} />}
      <div className="space-y-2">
        {data.fields.map(field => (
          editingItem && editingItem.type === 'field' && editingItem.data.id === field.id
            ? <FieldForm key={field.id} field={field} onSave={handleSave} onCancel={handleCancel} />
            : (
              <div key={field.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-md">
                <div>
                  <span className="font-semibold">{field.name}</span>
                  <span className="ml-2 text-sm text-gray-500 bg-gray-200 px-2 py-0.5 rounded-full">{field.type}</span>
                </div>
                <div className="flex gap-2">
                  <Button onClick={() => handleEdit(field)} variant="success" className="text-white"> <Edit
                    size={16}
                    strokeWidth={2}
                    className="text-white"
                  />
                  </Button>
                  <Button onClick={() => handleDelete(field.id)} variant="danger" className="text-white">
                    <Trash2
                      size={16}
                      strokeWidth={2}
                      className="text-white "
                    />
                  </Button>
                </div>
              </div>
            )
        ))}
      </div>
    </Card>
  );
};

