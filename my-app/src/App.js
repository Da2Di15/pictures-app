import React, { useState, useEffect } from 'react';

import { ImagePlus, Images } from 'lucide-react';

import ImageUpload from './components/ImageUpload';

import ImageGallery from './components/ImageGallery';

import { imageService } from './services/ImageService';

import './App.css';



function App() {

  const [images, setImages] = useState([]);

  const [activeTab, setActiveTab] = useState('gallery');



  const loadImages = async () => {

    try {

      const loadedImages = await imageService.getAllImages();

      setImages(loadedImages);

    } catch (error) {

      console.error('Ошибка загрузки изображений:', error);

      alert('Ошибка при загрузке галереи');

    }

  };



  useEffect(() => {

    loadImages();

  }, []);



  return (

    <div className="app">

      <header className="app-header">

        <h1>

          <Images size={32} />

          Галерея изображений

        </h1>

        <nav className="tabs">

          <button

            className={activeTab === 'gallery' ? 'active' : ''}

            onClick={() => setActiveTab('gallery')}

          >

            Галерея

          </button>

          <button

            className={activeTab === 'upload' ? 'active' : ''}

            onClick={() => setActiveTab('upload')}

          >

            <ImagePlus size={16} />

            Загрузить

          </button>

        </nav>

      </header>



      <main className="app-main">

        {activeTab === 'upload' ? (

          <ImageUpload onImageUploaded={loadImages} />

        ) : (

          <ImageGallery

            images={images}

            onImageDeleted={loadImages}

            onImageEdited={loadImages}

          />

        )}

      </main>

    </div>

  );

}



export default App;