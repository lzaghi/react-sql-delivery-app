const axios = require('axios');

const api = axios.create({
  baseURL: `http://${process.env.REACT_APP_HOSTNAME || 'localhost'}:${process.env.REACT_APP_API_PORT || '3001'}`,
});

export const requestLogin = async (endpoint, body) => {
  const { data } = await api.post(endpoint, body);
  return data;
};

export default api;
