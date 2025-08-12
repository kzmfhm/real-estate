import { useState } from "react";
import { Button } from "../ui/Button";
import { Card } from "../ui/Card";
import { Input } from "../ui/Input";


export const AgentForm = ({ agent, onSave, onCancel, allFields, agentsFields, onFieldChange, getNewId }) => {
  const [name, setName] = useState(agent?.name || '');
  const [email, setEmail] = useState(agent?.email || '');
  const [fieldValues, setFieldValues] = useState(() => {
    const initialValues = {};
    if (agent && agentsFields) {
      agentsFields.filter(f => f.agentId === agent.id).forEach(f => {
        initialValues[f.fieldId] = f.value;
      });
    }
    return initialValues;
  });

  const handleLocalFieldChange = (fieldId, value) => {
    setFieldValues(prev => ({ ...prev, [fieldId]: value }));
    if (agent) {
      onFieldChange('agents', agent.id, fieldId, value);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const payload = { ...agent, name, email };
    onSave(payload);

    if (!agent) {
      const newAgentId = getNewId('agents');
      Object.entries(fieldValues).forEach(([fieldId, value]) => {
        if (value !== '') {
          onFieldChange('agents', newAgentId, parseInt(fieldId), value);
        }
      });
    }
  };

  const relevantFields = allFields.filter(f => ['License Number', 'Years of Experience'].includes(f.name));

  return (
    <Card>
      <form onSubmit={handleSubmit} className="space-y-4">
        <h3 className="text-lg font-semibold">{agent ? 'Edit Agent' : 'Create New Agent'}</h3>
        <div>
          <label className="font-medium">Name</label>
          <Input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
        </div>
        <div>
          <label className="font-medium">Email</label>
          <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </div>
        <div className="pt-4 border-t">
          <h4 className="font-medium mb-2">Custom Fields</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {relevantFields.map(field => (
              <div key={field.id}>
                <label className="font-medium">{field.name}</label>
                <Input type={field.type} value={fieldValues[field.id] || ''}
                  onChange={e => handleLocalFieldChange(field.id, e.target.value)} />
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