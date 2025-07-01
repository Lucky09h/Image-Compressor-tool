const upload = document.getElementById('upload');
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const download = document.getElementById('download');

const originalSize = document.getElementById('original-size');
const compressedSize = document.getElementById('compressed-size');
const compressionRatio = document.getElementById('compression-ratio');

upload.addEventListener('change', (e) => {
  const file = e.target.files[0];
  if (!file) return;

  if (file.size > 5 * 1024 * 1024) {
    alert("Please upload image less than 5MB.");
    return;
  }

  const reader = new FileReader();
  reader.onload = (evt) => {
    const img = new Image();
    img.onload = () => {
      const MAX_WIDTH = 800;
      const scaleSize = MAX_WIDTH / img.width;
      canvas.width = MAX_WIDTH;
      canvas.height = img.height * scaleSize;
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

      // Original size
      const origKB = (file.size / 1024).toFixed(2);
      originalSize.innerText = `${origKB} KB`;

      // Compressed size
      setTimeout(() => {
        canvas.toBlob(blob => {
          const compKB = (blob.size / 1024).toFixed(2);
          compressedSize.innerText = `${compKB} KB`;
          const ratio = (100 - ((blob.size / file.size) * 100)).toFixed(2);
          compressionRatio.innerText = `${ratio}%`;

          // Enable download
          const url = URL.createObjectURL(blob);
          download.href = url;
          download.download = 'compressed-image.jpg';
          download.style.display = 'inline-block';
          canvas.style.display = 'block';
        }, 'image/jpeg', 0.7);
      }, 300);
    };
    img.src = evt.target.result;
  };
  reader.readAsDataURL(file);
});
