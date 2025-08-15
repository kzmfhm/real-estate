import { useState } from "react";
import { Button } from "../ui/Button";
import { Card } from "../ui/Card";
import { Input } from "../ui/Input";
import { Select } from "../ui/Select";

export const ListingForm = ({ listing, agents, onSave, onCancel, allFields, listingsFields }) => {
  const [address, setAddress] = useState(listing?.address || '');
  const [agentIds, setAgentIds] = useState(listing?.agentIds || []);
  
  const [fieldValues, setFieldValues] = useState(() => {
    const initialValues = {};
    if (listing && listingsFields) {
      listingsFields
        .filter(f => f.listingId === listing.id)
        .forEach(f => {
          const fieldInfo = allFields.find(af => af.id === f.fieldId);
          if (fieldInfo?.type === 'boolean') {
            initialValues[f.fieldId] = String(f.value) === 'true';
          } else {
            initialValues[f.fieldId] = f.value;
          }
        });
    }
    return initialValues;
  });

  const handleAgentSelect = (e) => {
    const selectedOptions = Array.from(e.target.selectedOptions, option => parseInt(option.value));
    setAgentIds(selectedOptions);
  };

  const handleLocalFieldChange = (fieldId, value) => {
    setFieldValues(prev => ({ ...prev, [fieldId]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (agentIds.length === 0) {
      alert('A listing must have at least one agent.');
      return;
    }

    const customFieldsPayload = Object.entries(fieldValues)
      .filter(([, value]) => value !== '' && value !== false && value !== null)
      .map(([fieldId, value]) => ({
        fieldId: parseInt(fieldId, 10),
        value: String(value),
      }));

    const payload = {
      address,
      agentIds,
      customFields: customFieldsPayload,
    };

    onSave(payload);
  };

  const relevantFields = allFields.filter(f => !['License Number', 'Years of Experience'].includes(f.name));

  return (
    <Card>
      <form onSubmit={handleSubmit} className="space-y-4">
        <h3 className="text-lg font-semibold">{listing ? 'Edit Listing' : 'Create New Listing'}</h3>
        <div>
          <label className="font-medium">Address</label>
          <Input type="text" value={address} onChange={(e) => setAddress(e.target.value)} required />
        </div>
        <div>
          <label className="font-medium">Agents</label>
          <Select multiple value={agentIds} onChange={handleAgentSelect} required className="h-24">
            {agents.map(agent => (
              <option key={agent.id} value={agent.id}>{agent.name}</option>
            ))}
          </Select>
          <p className="text-xs text-gray-500 mt-1">Hold Ctrl/Cmd to select multiple.</p>
        </div>        
        <div className="pt-4 border-t">
          <h4 className="font-medium mb-2">Custom Fields</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {relevantFields.map(field => (
              <div key={field.id}>
                <label className="font-medium">{field.name}</label>
                {field.type === 'boolean' ? (
                  <input
                    type="checkbox"
                    checked={!!fieldValues[field.id]}
                    onChange={(e) => handleLocalFieldChange(field.id, e.target.checked)}
                    className="ml-2 h-5 w-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                ) : (
                  <Input
                    type={field.type}
                    value={fieldValues[field.id] || ''}
                    onChange={(e) => handleLocalFieldChange(field.id, e.target.value)}
                  />
                )}
              </div>
            ))}
          </div>
        </div>
        <div className="flex gap-2 justify-end">
          <Button type="button" onClick={onCancel} variant="secondary">Cancel</Button>
          <Button type="submit" variant="primary">Save</Button>
        </div>
      </form>
    </Card>
  );
};