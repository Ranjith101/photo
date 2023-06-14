import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import PhotoUpload from './components/PhotoUpload';

describe('PhotoUpload', () => {
  test('should upload and display the image', () => {
    render(<PhotoUpload />);

    const fileInput = screen.getByLabelText('Upload Photo:');

    const imageBlob = new Blob(['image content'], { type: 'image/jpeg' });
    const imageFile = new File([imageBlob], '1.jpg', { type: 'image/jpeg' });

    const mockFileReader = {
      onload: jest.fn(),
      readAsDataURL: jest.fn().mockImplementation(function () {
        this.onload();
      }),
      result: 'mocked result',
    };
    global.FileReader = jest.fn(() => mockFileReader);

    fireEvent.change(fileInput, { target: { files: [imageFile] } });

    const uploadedImage = screen.getByAltText('Uploaded');
    expect(uploadedImage).toBeInTheDocument();
    expect(uploadedImage).toHaveAttribute('src', 'mocked result');

    const uploadButton = screen.getByRole('button', { name: 'Upload' });
    expect(uploadButton).toBeInTheDocument();

    fireEvent.click(uploadButton);

  });
});
