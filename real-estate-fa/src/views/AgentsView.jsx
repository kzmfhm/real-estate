import { Plus } from 'lucide-react';
import {AgentForm } from '../component/forms/AgentForm'
import { Button } from '../component/ui/Button';
import { useState } from 'react';
import { AgentItem } from '../component/items/AgentItem';


export const AgentsView = ({ data, onCrud, onFieldChange, getNewId }) => {
  const [editingId, setEditingId] = useState(null);
  const [isCreating, setIsCreating] = useState(false);

  const handleSave = (payload) => {
    const operation = payload.id ? 'update' : 'create';
    onCrud('agents', operation, payload);
    setEditingId(null);
    setIsCreating(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Agents</h2>
        <Button onClick={() => { setIsCreating(true); setEditingId(null); }}>
          <Plus size={16} className='text-white'/ > Add Agent
        </Button>
      </div>
      {isCreating && <AgentForm onSave={handleSave} onCancel={() => setIsCreating(false)} allFields={data.fields} onFieldChange={onFieldChange} getNewId={getNewId}/>}
      {data.agents.map(agent => (
        editingId === agent.id
        ? <AgentForm key={agent.id} agent={agent} onSave={handleSave} onCancel={() => setEditingId(null)} allFields={data.fields} agentsFields={data.agentsFields}
           onFieldChange={onFieldChange}/>
        : <AgentItem key={agent.id} agent={agent} data={data} onEdit={() => { setEditingId(agent.id); setIsCreating(false); }}
           onDelete={() => onCrud('agents', 'delete', { id: agent.id })}/>
      ))}
    </div>
  );
};