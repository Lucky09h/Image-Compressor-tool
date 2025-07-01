const imageInput = document.getElementById("imageInput");
const compressBtn = document.getElementById("compressBtn");
const imageInfo = document.getElementById("imageInfo");
const canvas = document.getElementById("canvas");

let originalFile;

imageInput.addEventListener("change", (e) => {
  originalFile = e.target.files[0];
  if (originalFile) {
    const kbSize = (originalFile.size / 1024).toFixed(2);
    imageInfo.innerHTML = `Original Size: <strong>${kbSize} KB</strong>`;
  }
});

compressBtn.addEventListener("click", () => {
  if (!originalFile) {
    alert("Please select an image first.");
    return;
  }

  const reader = new FileReader();
  reader.onload = (event) => {
    const img = new Image();
    img.onload = () => {
      const ctx = canvas.getContext("2d");
      const scale = 0.7; // compression factor
      canvas.width = img.width * scale;
      canvas.height = img.height * scale;
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

      canvas.toBlob(
        (blob) => {
          const kbSize = (blob.size / 1024).toFixed(2);
          imageInfo.innerHTML += `<br>Compressed Size: <strong>${kbSize} KB</strong>`;
          const link = document.createElement("a");
          link.download = "compressed-image.jpg";
          link.href = URL.createObjectURL(blob);
          link.click();
        },
        "image/jpeg",
        0.7
      );
    };
    img.src = event.target.result;
  };
  reader.readAsDataURL(originalFile);
});
