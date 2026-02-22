import api from './axios';

export const submitContact = (data) => {
  return api.post('/contact', data);
};

export const getContacts = (params = {}) => {
  return api.get('/contact', { params });
};

export const getContact = (id) => {
  return api.get(`/contact/${id}`);
};

export const updateContact = (id, data) => {
  return api.put(`/contact/${id}`, data);
};

export const deleteContact = (id) => {
  return api.delete(`/contact/${id}`);
};

export const getStats = () => {
  return api.get('/contact/stats');
};

