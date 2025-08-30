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
    // Read file as base64 data URL
    const toBase64 = (file) =>
      new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result);
        reader.onerror = reject;
        reader.readAsDataURL(file);
      });

    const url = await toBase64(file);

    const payload = {
      name: file.name,
      size: file.size,
      url,
    };

    const response = await api.post('/images', payload, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return response.data;
  },

  // Удалить изображение
  deleteImage: async (id) => {
    await api.delete(`/images/${id}`);
  },

  // Скачать изображение
  downloadImage: async (base64Url, filename) => {
    // Extract base64 data and mime type
    const matches = base64Url.match(/^data:(.+);base64,(.+)$/);
    if (!matches) {
      alert('Некорректный формат изображения');
      return;
    }
    const mimeType = matches[1];
    const base64Data = matches[2];
    const byteCharacters = atob(base64Data);
    const byteNumbers = new Array(byteCharacters.length);
    for (let i = 0; i < byteCharacters.length; i++) {
      byteNumbers[i] = byteCharacters.charCodeAt(i);
    }
    const byteArray = new Uint8Array(byteNumbers);
    const blob = new Blob([byteArray], { type: mimeType });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', filename);
    document.body.appendChild(link);
    link.click();
    link.remove();
    window.URL.revokeObjectURL(url);
  },

  // Редактировать изображение
  editImage: async (id, newName) => {
    const response = await api.patch(`/images/${id}`, { name: newName });
    return response.data;
  },
};


