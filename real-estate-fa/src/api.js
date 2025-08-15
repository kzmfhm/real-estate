import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3000',
});

export default api;



// import axios from 'axios'; 

// const API_BASE_URL = 'http://localhost:3000'; 

// const api = {
//   get: async (path) => {
//     const response = await axios.get(`${API_BASE_URL}${path}`);
//     return response; 
//   },
//   post: async (path, payload) => {
//     const response = await axios.post(`${API_BASE_URL}${path}`, payload);
//     return response;
//   },
//   put: async (path, payload) => {
//     const response = await axios.put(`${API_BASE_URL}${path}`, payload);
//     return response;
//   },
//   delete: async (path) => {
//     const response = await axios.delete(`${API_BASE_URL}${path}`);
//     return response;
//   },
// };

// export default api;
