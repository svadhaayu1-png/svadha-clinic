import api from './axios';

export const getSettings = () => {
  return api.get('/settings');
};

export const updateSettings = (data) => {
  const formData = new FormData();
  Object.keys(data).forEach(key => {
    if (key === 'socialMedia' && typeof data[key] === 'object') {
      formData.append(key, JSON.stringify(data[key]));
    } else if (data[key] !== null && data[key] !== undefined) {
      formData.append(key, data[key]);
    }
  });
  if (data.heroImage) {
    formData.append('heroImage', data.heroImage);
  }
  return api.put('/settings', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
};

