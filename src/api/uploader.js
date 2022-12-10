export class ImageUploader {
  async upload(file) {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', process.env.REACT_APP_CLOUDINARY_PRESET);
    const result = await fetch(process.env.REACT_APP_CLOUDINARY_URL, {
      method: 'POST',
      body: formData,
    });
    return result.json();
  }
}
