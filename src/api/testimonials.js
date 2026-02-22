import api from './axios';

export const getTestimonials = (active = true) => {
  return api.get(`/testimonials?active=${active}`);
};

export const getTestimonial = (id) => {
  return api.get(`/testimonials/${id}`);
};

export const createTestimonial = (data) => {
  const formData = new FormData();
  Object.keys(data).forEach(key => {
    if (data[key] !== null && data[key] !== undefined) {
      formData.append(key, data[key]);
    }
  });
  if (data.image) {
    formData.append('image', data.image);
  }
  return api.post('/testimonials', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
};

export const updateTestimonial = (id, data) => {
  const formData = new FormData();
  Object.keys(data).forEach(key => {
    if (data[key] !== null && data[key] !== undefined) {
      formData.append(key, data[key]);
    }
  });
  if (data.image) {
    formData.append('image', data.image);
  }
  return api.put(`/testimonials/${id}`, formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
};

export const deleteTestimonial = (id) => {
  return api.delete(`/testimonials/${id}`);
};

