import api from './axios';

export const getServices = (active = true) => {
  return api.get(`/services?active=${active}`);
};

export const getService = (id) => {
  return api.get(`/services/${id}`);
};

export const createService = (data) => {
  const formData = new FormData();
  Object.keys(data).forEach(key => {
    if (key === 'benefits' && Array.isArray(data[key])) {
      formData.append(key, JSON.stringify(data[key]));
    } else if (data[key] !== null && data[key] !== undefined) {
      formData.append(key, data[key]);
    }
  });
  if (data.image) {
    formData.append('image', data.image);
  }
  return api.post('/services', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
};

export const updateService = (id, data) => {
  const formData = new FormData();
  Object.keys(data).forEach(key => {
    if (key === 'benefits' && Array.isArray(data[key])) {
      formData.append(key, JSON.stringify(data[key]));
    } else if (data[key] !== null && data[key] !== undefined) {
      formData.append(key, data[key]);
    }
  });
  if (data.image) {
    formData.append('image', data.image);
  }
  return api.put(`/services/${id}`, formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
};

export const deleteService = (id) => {
  return api.delete(`/services/${id}`);
};

