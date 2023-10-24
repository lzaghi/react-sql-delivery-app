const axios = require('axios');

const api = axios.create({
  // baseURL: `http://${process.env.REACT_APP_HOSTNAME || 'localhost'}:${process.env.REACT_APP_API_PORT || '3001'}`,
  baseURL: process.env.REACT_APP_PUBLIC_API ?? 'http://localhost:3001',
});
console.log(process.env.REACT_APP_PUBLIC_API);
export const requestPost = async (endpoint, body) => {
  const { data } = await api.post(endpoint, body);
  return data;
};

export const requestGetWithToken = async (endpoint, token) => {
  const { data } = await api.get(endpoint, {
    headers: {
      Authorization: token,
    },
  });
  return data;
};

export const requestPostWithToken = async (endpoint, body, token) => {
  const { data } = await api.post(endpoint, body, {
    headers: {
      Authorization: token,
    },
  });
  return data;
};

export const requestPatchWithToken = async (endpoint, body, token) => {
  const { data } = await api.patch(endpoint, body, {
    headers: {
      Authorization: token,
    },
  });
  return data;
};

export const requestDeleteWithToken = async (endpoint, token) => {
  const { data } = await api.delete(endpoint, {
    headers: {
      Authorization: token,
    },
  });
  return data;
};

export default api;
