import { Edit, Plus } from "lucide-react";
import { Button } from "../component/ui/Button";
import { Card } from "../component/ui/Card";
import { FieldForm } from "../component/forms/FieldForm";
import { useState } from "react";
import { Trash2 } from "lucide-react";

export const FieldsView = ({ data, onCrud }) => {
  const [editingId, setEditingId] = useState(null);
  const [isCreating, setIsCreating] = useState(false);

  const handleSave = (payload) => {
    const operation = payload.id ? 'update' : 'create';
    onCrud('fields', operation, payload);
    setEditingId(null);
    setIsCreating(false);
  };

  return (
    <Card>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Fields Schema</h2>
        <Button onClick={() => { setIsCreating(true); setEditingId(null); }}>
          <Plus size={16} /> Add Field
        </Button>
      </div>
      <p className="text-gray-500 mb-6">Define the data structure for listings and agents.</p>
      {isCreating && <FieldForm onSave={handleSave} onCancel={() => setIsCreating(false)} />}
      <div className="space-y-2">
        {data.fields.map(field => (
          editingId === field.id
          ? <FieldForm key={field.id} field={field} onSave={handleSave} onCancel={() => setEditingId(null)} />
          : (
            <div key={field.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-md hover:bg-gray-100">
              <div>
                <span className="font-semibold">{field.name}</span>
                <span className="ml-2 text-sm text-gray-500 bg-gray-200 px-2 py-0.5 rounded-full">{field.type}</span>
              </div>
              <div className="flex gap-2">
                <Button onClick={() => { setEditingId(field.id); setIsCreating(false); }} variant="secondary" className="p-2 h-8 w-8"><Edit size={14} /></Button>
                <Button onClick={() => onCrud('fields', 'delete', { id: field.id })} variant="danger" className="p-2 h-8 w-8"><Trash2 size={14} /></Button>
              </div>
            </div>
          )
        ))}
      </div>
    </Card>
  );
};