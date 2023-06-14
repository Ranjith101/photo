import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import PhotoUpload from './components/PhotoUpload';

describe('PhotoUpload', () => {
  test('should upload and display the image', () => {
    render(<PhotoUpload />);

    // Select the file input element
    const fileInput = screen.getByLabelText('Upload Photo:');

    // Create a sample image file
    const imageBlob = new Blob(['image content'], { type: 'image/jpeg' });
    const imageFile = new File([imageBlob], '1.jpg', { type: 'image/jpeg' });

    // Mock FileReader to handle readAsDataURL
    const mockFileReader = {
      onload: jest.fn(),
      readAsDataURL: jest.fn().mockImplementation(function () {
        this.onload();
      }),
      result: 'mocked result',
    };
    global.FileReader = jest.fn(() => mockFileReader);

    // Simulate the file upload event
    fireEvent.change(fileInput, { target: { files: [imageFile] } });

    // Verify that the image is displayed
    const uploadedImage = screen.getByAltText('Uploaded');
    expect(uploadedImage).toBeInTheDocument();
    expect(uploadedImage).toHaveAttribute('src', 'mocked result');

    // Verify that the upload button is present
    const uploadButton = screen.getByRole('button', { name: 'Upload' });
    expect(uploadButton).toBeInTheDocument();

    // Simulate the form submission event
    fireEvent.click(uploadButton);

    // Perform additional assertions or dispatch actions to check the behavior after form submission
    // For example, you can dispatch an action and verify that the image data is stored in Redux or sent to the server
  });
});
