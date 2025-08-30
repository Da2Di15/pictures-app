import React from 'react';
import ImageItem from './ImageItem';

const ImageGallery = ({ images, onImageDeleted, onImageEdited }) => {
  if (images.length === 0) {
    return (
      <div className="empty-gallery">
        <p>Пока нет загруженных изображений</p>
      </div>
    );
  }

  return (
    <div className="image-gallery">
      {images.map((image) => (
        <ImageItem
          key={image.id}
          image={image}
          onDelete={onImageDeleted}
          onEdit={onImageEdited}
        />
      ))}
    </div>
  );
};

export default ImageGallery;