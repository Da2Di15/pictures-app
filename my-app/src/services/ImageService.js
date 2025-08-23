import axios from 'axios';

const API_URL = 'http://localhost:3001'; // Будем использовать json-server

const api = axios.create({
  baseURL: API_URL,
});

export const imageService = {
  // Получить все изображения
  getAllImages: async () => {
    const response = await api.get('/images');
    return response.data;
  },

  // Загрузить новое изображение
  uploadImage: async (file) => {
    const formData = new FormData();
    formData.append('image', file);
    
    const response = await api.post('/images', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },

  // Удалить изображение
  deleteImage: async (id) => {
    await api.delete(`/images/${id}`);
  },

  // Скачать изображение
  downloadImage: async (imageUrl, filename) => {
    const response = await api.get(imageUrl, {
      responseType: 'blob',
    });
   const url = window.URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', filename);
    document.body.appendChild(link);
    link.click();
    link.remove();
    window.URL.revokeObjectURL(url);
  },
}; 
    

