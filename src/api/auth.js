import api from './axios';

export const login = (email, password) => {
  return api.post('/auth/login', { email, password });
};

export const register = (data) => {
  return api.post('/auth/register', data);
};

export const getCurrentUser = () => {
  return api.get('/auth/me');
};

