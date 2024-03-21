import React, { useState } from 'react';
import './ImageCarousel.scss'; 

export default function ImageCarousel({ images }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const goToNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const goToPrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
  };

  return (
    <div className="image-carousel">
      <button className="carousel-button" onClick={goToPrev}>&lt;</button>
      <img className="carousel-image" src={images[currentIndex]} alt={`Image ${currentIndex + 1}`} />
      <button className="carousel-button" onClick={goToNext}>&gt;</button>
    </div>
  );
};
