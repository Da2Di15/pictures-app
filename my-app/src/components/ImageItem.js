import React, { useState } from 'react';
import { Trash2, Download, Pencil } from 'lucide-react';
import { imageService } from '../services/ImageService';
import DownloadButton from './DownloadButton';

const ImageItem = ({ image, onDelete, onEdit }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [newName, setNewName] = useState(image.name);
  const [loading, setLoading] = useState(false);

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

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await imageService.editImage(image.id, newName);
      setIsEditing(false);
      onEdit();
    } catch (error) {
      alert('Ошибка при редактировании');
    } finally {
      setLoading(false);
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
          {isEditing ? (
            <form onSubmit={handleEditSubmit} style={{ display: 'flex', gap: 6 }}>
              <input
                type="text"
                value={newName}
                onChange={e => setNewName(e.target.value)}
                disabled={loading}
                style={{
                  fontSize: '1rem',
                  padding: '4px 8px',
                  borderRadius: '8px',
                  border: '1px solid #ccc',
                  minWidth: '80px'
                }}
              />
              <button
                type="submit"
                disabled={loading}
                style={{
                  background: '#43e97b',
                  color: '#fff',
                  border: 'none',
                  borderRadius: '8px',
                  padding: '4px 12px',
                  cursor: 'pointer'
                }}
              >
                Сохранить
              </button>
              <button
                type="button"
                onClick={() => setIsEditing(false)}
                disabled={loading}
                style={{
                  background: '#ff6a88',
                  color: '#fff',
                  border: 'none',
                  borderRadius: '8px',
                  padding: '4px 12px',
                  cursor: 'pointer'
                }}
              >
                Отмена
              </button>
            </form>
          ) : (
            <>
              <span className="image-name">{image.name}</span>
              <span className="image-size">{Math.round(image.size / 1024)} KB</span>
            </>
          )}
        </div>
        <div className="action-buttons">
          <DownloadButton imageUrl={image.url} filename={image.name} />
          <button className="download-button" onClick={handleEdit} title="Редактировать">
            <Pencil size={16} />
            Редактировать
          </button>
          <button className="delete-button" onClick={handleDelete}>
            <Trash2 size={16} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ImageItem;