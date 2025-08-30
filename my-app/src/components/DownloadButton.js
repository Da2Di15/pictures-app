import React from 'react';
import { Download } from 'lucide-react';
import { imageService } from '../services/ImageService';

const DownloadButton = ({ imageUrl, filename }) => {
  const handleDownload = async () => {
    try {
      await imageService.downloadImage(imageUrl, filename);
    } catch (error) {
      console.error('Ошибка скачивания:', error);
      alert('Ошибка при скачивании изображения');
    }
  };

  return (
    <button className="download-button" onClick={handleDownload}>
      <Download size={16} />
      Скачать
    </button>
  );
};

export default DownloadButton;