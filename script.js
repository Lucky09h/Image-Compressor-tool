const upload = document.getElementById('upload');
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const download = document.getElementById('download');

const originalSize = document.getElementById('original-size');
const compressedSize = document.getElementById('compressed-size');
const compressionRatio = document.getElementById('compression-ratio');

upload.addEventListener('change', e => {
  const file = e.target.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = evt => {
    const img = new Image();
    img.onload = () => {
      const maxWidth = 800;
      const scale = maxWidth / img.width;
      const width = maxWidth;
      const height = img.height * scale;

      canvas.width = width;
      canvas.height = height;
      ctx.drawImage(img, 0, 0, width, height);

      const origSizeKB = (file.size / 1024).toFixed(2);
      originalSize.innerText = `${origSizeKB} KB`;

      canvas.toBlob(blob => {
        const compSizeKB = (blob.size / 1024).toFixed(2);
        compressedSize.innerText = `${compSizeKB} KB`;

        const ratio = (100 - ((blob.size / file.size) * 100)).toFixed(2);
        compressionRatio.innerText = `${ratio}%`;

        const url = URL.createObjectURL(blob);
        download.href = url;
        download.download = 'compressed-image.jpg';
        download.style.display = 'inline-block';
        canvas.style.display = 'block';
      }, 'image/jpeg', 0.6);
    };
    img.src = evt.target.result;
  };
  reader.readAsDataURL(file);
});
