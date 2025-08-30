import React, { useState } from 'react';

import { Upload, Loader } from 'lucide-react';

import { imageService } from '../services/ImageService';



const ImageUpload = ({ onImageUploaded }) => {

  const [isUploading, setIsUploading] = useState(false);

  const [dragOver, setDragOver] = useState(false);



  const handleFileSelect = async (file) => {

    if (!file || !file.type.startsWith('image/')) {

      alert('Пожалуйста, выберите файл изображения');

      return;

    }



    setIsUploading(true);

    try {

      await imageService.uploadImage(file);

      onImageUploaded();

      alert('Изображение успешно загружено!');

    } catch (error) {

      console.error('Ошибка загрузки:', error);

      alert('Ошибка при загрузке изображения');

    } finally {

      setIsUploading(false);

    }

  };



  const handleDrop = (e) => {

    e.preventDefault();

    setDragOver(false);

    const files = e.dataTransfer.files;

    if (files.length > 0) {

      handleFileSelect(files[0]);

    }

  };



  const handleDragOver = (e) => {

    e.preventDefault();

    setDragOver(true);

  };



  const handleDragLeave = (e) => {

    e.preventDefault();

    setDragOver(false);

  };



  return (

    <div className="image-upload">

      <div

        className={`upload-area ${dragOver ? 'drag-over' : ''} ${isUploading ? 'uploading' : ''}`}

        onDrop={handleDrop}

        onDragOver={handleDragOver}

        onDragLeave={handleDragLeave}

      >

        {isUploading ? (

          <div className="upload-status">

            <Loader className="spin" size={48} />

            <p>Загрузка...</p>

          </div>

        ) : (

          <>

            <Upload size={48} />

            <p>Перетащите изображение сюда или</p>

            <input

              type="file"

              id="file-input"

              accept="image/*"

              onChange={(e) => handleFileSelect(e.target.files[0])}

              style={{ display: 'none' }}

            />

            <label htmlFor="file-input" className="browse-button">

              Выберите файл

            </label>

          </>

        )}

      </div>

    </div>

  );

};



export default ImageUpload;