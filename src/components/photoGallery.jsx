import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Carousel } from 'react-bootstrap';
import PhotoUpload from './PhotoUpload';
import { addImage } from '../store/store';

const PhotoGallery = () => {
  const dispatch = useDispatch();
  const images = useSelector((state) => state.gallery);
console.log(images);
  if (!images || images.length === 0) {
    return <div>No images found.</div>;
  }
 
  return (
    <div className='container'>
      <div className='row'>
        <div className='col-lg-6 col-md-6 col-6 w-50 mt-3 border-1'>
          <h1 className='text-center'>Gallery</h1> 
          <Carousel>
            {images.map((image, index) => (
              <Carousel.Item key={index}>
                <img className="d-block w-100" src={image.src} alt="" />
              </Carousel.Item>
            ))}
          </Carousel>
        </div>
        <div className='col-lg-6 col-md-6 col-6'> 
          <PhotoUpload />
        </div>
      </div>
    </div>
  );
};

export default PhotoGallery;
