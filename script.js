const upload = document.getElementById('upload');
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const download = document.getElementById('download');

upload.addEventListener('change', (e) => {
  const file = e.target.files[0];
  const reader = new FileReader();

  reader.onload = (evt) => {
    const img = new Image();
    img.onload = () => {
      const MAX_WIDTH = 800;
      const scaleSize = MAX_WIDTH / img.width;
      canvas.width = MAX_WIDTH;
      canvas.height = img.height * scaleSize;
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
    };
    img.src = evt.target.result;
  };
  reader.readAsDataURL(file);
});

download.addEventListener('click', () => {
  const link = document.createElement('a');
  link.download = 'compressed-image.jpg';
  link.href = canvas.toDataURL('image/jpeg', 0.7);
  link.click();
});
