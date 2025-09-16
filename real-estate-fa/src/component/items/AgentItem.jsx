import { ChevronDown, Edit, Trash2 } from "lucide-react";
import { Button } from "../ui/Button";
import { Card } from "../ui/Card";
import { useState } from "react";


export const AgentItem = ({ agent, data, onEdit, onDelete }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const { fields, agentsFields } = data;
  const customFields = agentsFields
    .filter(af => af.agentId === agent.id)
    .map(af => {
      const field = fields.find(f => f.id === af.fieldId);
      return field ? { ...af, name: field.name, type: field.type } : null;
    })
    .filter(Boolean);

  return (
    <Card>
      <div className="flex justify-between items-start">
        <div>
          <h3 className="text-xl font-semibold">{agent.name}</h3>
          <p className="text-sm text-gray-600">{agent.email}</p>
        </div>
        <div className="flex gap-2 flex-shrink-0 ml-4">
          <Button className="text-white"
            onClick={() => setIsExpanded(!isExpanded)}
          >
            <ChevronDown
              size={16}
              strokeWidth={2}
              className={`text-white drop-shadow-sm transition-transform duration-200 ${isExpanded ? "rotate-180" : ""}`}
            />
          </Button>
          <Button className="text-white"
            onClick={onEdit}
            variant="success"
          >
            <Edit
              size={16}
              strokeWidth={2}
              className="text-white"
            />
          </Button>

          <Button
            onClick={onDelete}
            variant="danger"
          >
            <Trash2
              size={16}
              strokeWidth={2}
              className="text-white "
            />
          </Button>
        </div>
      </div>
      {isExpanded && (
        <div className="mt-4 pt-4 border-t border-gray-200">
          <h4 className="font-semibold mb-2">Details:</h4>
          {customFields.length > 0 ? (
            <ul className="grid grid-cols-2 md:grid-cols-3 gap-2 text-sm">
              {customFields.map(field => (
                <li key={field.id} className="bg-gray-50 p-2 rounded">
                  <span className="font-medium text-gray-600">{field.name}: </span>
                  {field.type === 'boolean' ? (field.value === 'true' ? 'Yes' : 'No') : field.value}
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-sm text-gray-500">No custom details available.</p>
          )}
        </div>
      )}
    </Card>
  );
};
