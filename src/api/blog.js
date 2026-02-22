import api from './axios';

export const getBlogs = (published = true) => {
  return api.get(`/blog?published=${published}`);
};

export const getBlog = (slug) => {
  return api.get(`/blog/${slug}`);
};

export const createBlog = (data) => {
  const formData = new FormData();
  Object.keys(data).forEach(key => {
    if (key === 'tags' && Array.isArray(data[key])) {
      formData.append(key, JSON.stringify(data[key]));
    } else if (data[key] !== null && data[key] !== undefined) {
      formData.append(key, data[key]);
    }
  });
  if (data.image) {
    formData.append('image', data.image);
  }
  return api.post('/blog', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
};

export const updateBlog = (id, data) => {
  const formData = new FormData();
  Object.keys(data).forEach(key => {
    if (key === 'tags' && Array.isArray(data[key])) {
      formData.append(key, JSON.stringify(data[key]));
    } else if (data[key] !== null && data[key] !== undefined) {
      formData.append(key, data[key]);
    }
  });
  if (data.image) {
    formData.append('image', data.image);
  }
  return api.put(`/blog/${id}`, formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
};

export const deleteBlog = (id) => {
  return api.delete(`/blog/${id}`);
};

