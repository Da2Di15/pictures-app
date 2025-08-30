import React from 'react';
import { Trash2 } from 'lucide-react';
import { imageService } from '../services/ImageService';
import DownloadButton from './DownloadButton';

const ImageItem = ({ image, onDelete }) => {
  const handleDelete = async () => {
    if (window.confirm('Вы уверены, что хотите удалить это изображение?')) {
      try {
        await imageService.deleteImage(image.id);
        onDelete();
      } catch (error) {
        console.error('Ошибка удаления:', error);
        alert('Ошибка при удалении изображения');
      }
    }
  };

  return (
    <div className="image-item">
      <img
        src={image.url}
        alt={image.name}
        className="image-thumbnail"
        onError={(e) => {
          e.target.src = 'https://via.placeholder.com/150?text=Ошибка+загрузки';
        }}
        />
      <div className="image-actions">
        <div className="image-info">
          <span className="image-name">{image.name}</span>
          <span className="image-size">{Math.round(image.size / 1024)} KB</span>
        </div>
        <div className="action-buttons">
          <DownloadButton imageUrl={image.url} filename={image.name} />
          <button className="delete-button" onClick={handleDelete}>
            <Trash2 size={16} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ImageItem;