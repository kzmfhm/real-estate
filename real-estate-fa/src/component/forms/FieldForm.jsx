import { useState } from "react";
import { Button } from "../ui/Button";
import { Card } from "../ui/Card";
import { Input } from "../ui/Input";
import { Select } from "../ui/Select";



export const FieldForm = ({ field, onSave, onCancel }) => {
  const [name, setName] = useState(field?.name || '');
  const [type, setType] = useState(field?.type || 'text');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim()) {
        alert("Field name cannot be empty.");
        return;
    }
    onSave({ ...field, name, type });
  };

  return (
    <Card className="mb-4 bg-blue-50">
      <form onSubmit={handleSubmit} className="space-y-4">
        <h3 className="text-lg font-semibold">{field ? 'Edit Field' : 'Create New Field'}</h3>
        <div>
          <label className="font-medium">Field Name</label>
          <Input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
        </div>
        <div>
          <label className="font-medium">Field Type</label>
          <Select value={type} onChange={(e) => setType(e.target.value)}>
            <option value="text">Text</option>
            <option value="number">Number</option>
            <option value="date">Date</option>
            <option value="boolean">Checkbox (Yes/No)</option>
          </Select>
        </div>
        <div className="flex gap-2 justify-end">
          <Button type="button" onClick={onCancel} variant="secondary">Cancel</Button>
          <Button type="submit" variant="primary">Save</Button>
        </div>
      </form>
    </Card>
  );
};
