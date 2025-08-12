export const initialData = {
  listings: [
    { id: 1, address: '123 Maple St, Springfield', agentIds: [1] },
    { id: 2, address: '456 Oak Ave, Shelbyville', agentIds: [2, 3] },
  ],
  agents: [
    { id: 1, name: 'Alice Johnson', email: 'alice@realestate.com' },
    { id: 2, name: 'Bob Williams', email: 'bob@realestate.com' },
    { id: 3, name: 'Charlie Brown', email: 'charlie@realestate.com' },
  ],
  fields: [
    { id: 1, name: 'Price', type: 'number' },
    { id: 2, name: 'Bedrooms', type: 'number' },
    { id: 3, name: 'Bathrooms', type: 'number' },
    { id: 4, name: 'Square Footage', type: 'number' },
    { id: 5, name: 'Year Built', type: 'number' },
    { id: 6, name: 'Has Pool', type: 'boolean' },
    { id: 7, name: 'License Number', type: 'text' },
    { id: 8, name: 'Years of Experience', type: 'number' },
  ],
  listingsFields: [
    { id: 1, listingId: 1, fieldId: 1, value: '500000' },
    { id: 2, listingId: 1, fieldId: 2, value: '4' },
    { id: 3, listingId: 1, fieldId: 3, value: '3' },
    { id: 4, listingId: 1, fieldId: 6, value: 'true' },
    { id: 5, listingId: 2, fieldId: 1, value: '750000' },
    { id: 6, listingId: 2, fieldId: 2, value: '5' },
  ],
  agentsFields: [
    { id: 1, agentId: 1, fieldId: 7, value: 'LIC-12345' },
    { id: 2, agentId: 1, fieldId: 8, value: '10' },
    { id: 3, agentId: 2, fieldId: 7, value: 'LIC-67890' },
  ],
}