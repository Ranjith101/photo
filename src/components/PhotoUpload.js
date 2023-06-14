import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { addImage } from '../store/store';

const PhotoUpload = () => {
  const dispatch = useDispatch();
  const [image, setImage] = useState(null);
  const [x1, setX1] = useState('');
  const [y1, setY1] = useState('');
  const [x2, setX2] = useState('');
  const [y2, setY2] = useState('');

  useEffect(() => {
    const storedImage = localStorage.getItem('uploadedImage');
    if (storedImage) {
      setImage(storedImage);
    }
  }, []);

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = (e) => {
      const base64Data = e.target.result;
      setImage(base64Data);
      localStorage.setItem('uploadedImage', base64Data);
    };

    reader.readAsDataURL(file);
  };

  const handleBoundingBoxSubmit = (event) => {
    event.preventDefault();

    const boundingBoxData = {
      id: 'image' + Date.now(),
      src: image,
      boundingBox: {
        x1: parseInt(x1, 10),
        y1: parseInt(y1, 10),
        x2: parseInt(x2, 10),
        y2: parseInt(y2, 10),
      },
    };

    dispatch(addImage(boundingBoxData));

    // Reset the form fields and image state
    setX1('');
    setY1('');
    setX2('');
    setY2('');
    setImage(null);
    localStorage.removeItem('uploadedImage');
  };

  return (
    <div className="container">
      <h2 className="mb-4">Photo Upload</h2>
      <form onSubmit={handleBoundingBoxSubmit}>
        <div className="mb-3">
          <label htmlFor="imageUpload" className="form-label">Upload Photo:</label>
          <input type="file" className="form-control" id="imageUpload" accept="image/*" onChange={handleImageUpload} />
        </div>
        <div className="mb-3">
          <label htmlFor="x1" className="form-label">X1:</label>
          <input type="number" className="form-control" id="x1" value={x1} onChange={(e) => setX1(e.target.value)} />
        </div>
        <div className="mb-3">
          <label htmlFor="y1" className="form-label">Y1:</label>
          <input type="number" className="form-control" id="y1" value={y1} onChange={(e) => setY1(e.target.value)} />
        </div>
        <div className="mb-3">
          <label htmlFor="x2" className="form-label">X2:</label>
          <input type="number" className="form-control" id="x2" value={x2} onChange={(e) => setX2(e.target.value)} />
        </div>
        <div className="mb-3">
          <label htmlFor="y2" className="form-label">Y2:</label>
          <input type="number" className="form-control" id="y2" value={y2} onChange={(e) => setY2(e.target.value)} />
        </div>
        <button type="submit" className="btn btn-primary">Upload</button>
      </form>
      {image && (
        <div id="imageContainer" className="mt-4" style={{ position: 'relative' }}>
          <h3>Uploaded Photo:</h3>
          <img src={image} alt="Uploaded" className="img-fluid" />
        </div>
      )}
    </div>
  );
};

export default PhotoUpload;
