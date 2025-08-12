import { useCallback, useState } from "react";
import { initialData } from "../data/mockData";


export const useRealEstateData = () => {
  const [data, setData] = useState(initialData);

  const handleCrud = useCallback((table, operation, payload) => {
    setData(prevData => {
      const newData = { ...prevData };
      let newTable = [...newData[table]];
      let newId;

      switch (operation) {
        case 'create':
          newId = Math.max(0, ...newTable.map(item => item.id)) + 1;
          newTable.push({ id: newId, ...payload });
          break;
        case 'update':
          newTable = newTable.map(item => item.id === payload.id ? payload : item);
          break;
        case 'delete':
          newTable = newTable.filter(item => item.id !== payload.id);
          if (table === 'listings') {
            newData.listingsFields = newData.listingsFields.filter(f => f.listingId !== payload.id);
          } else if (table === 'agents') {
            newData.agentsFields = newData.agentsFields.filter(f => f.agentId !== payload.id);
            newData.listings = newData.listings.map(l => ({
              ...l,
              agentIds: l.agentIds.filter(id => id !== payload.id)
            })).filter(l => l.agentIds.length > 0);
          } else if (table === 'fields') {
            newData.listingsFields = newData.listingsFields.filter(f => f.fieldId !== payload.id);
            newData.agentsFields = newData.agentsFields.filter(f => f.fieldId !== payload.id);
          }
          break;
        default:
          break;
      }
      newData[table] = newTable;
      return newData;
    });
  }, []);

  const handleFieldChange = useCallback((table, itemId, fieldId, value) => {
    setData(prevData => {
      const newData = { ...prevData };
      const fieldTableKey = table === 'listings' ? 'listingsFields' : 'agentsFields';
      const idKey = table === 'listings' ? 'listingId' : 'agentId';
      let fieldTable = [...newData[fieldTableKey]];
      const existingFieldIndex = fieldTable.findIndex(f => f[idKey] === itemId && f.fieldId === fieldId);

      if (existingFieldIndex > -1) {
        if (value === '' || value === false) {
          fieldTable.splice(existingFieldIndex, 1);
        } else {
          fieldTable[existingFieldIndex] = { ...fieldTable[existingFieldIndex], value: String(value)};
        }
      } else if (value !== '' && value !== false) {
        const newId = Math.max(0, ...fieldTable.map(item => item.id)) + 1;
        fieldTable.push({ id: newId, [idKey]: itemId, fieldId, value: String(value)});
      }
      newData[fieldTableKey] = fieldTable;
      return newData;
    });
  }, []);

  const getNewId = useCallback((table) => {
    return Math.max(0, ...data[table].map(item => item.id)) + 1;
  }, [data]);

  return { data, handleCrud, handleFieldChange, getNewId };
}


