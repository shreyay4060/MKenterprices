export default async function getCroppedImg(imageSrc, pixelCrop) {
  const image = await createImage(imageSrc);
  const canvas = document.createElement("canvas");
  canvas.width = pixelCrop.width;
  canvas.height = pixelCrop.height;
  const ctx = canvas.getContext("2d");

  ctx.drawImage(
    image,
    pixelCrop.x,
    pixelCrop.y,
    pixelCrop.width,
    pixelCrop.height,
    0,
    0,
    pixelCrop.width,
    pixelCrop.height
  );

  return new Promise((resolve, reject) => {
    // First, get the Blob
    canvas.toBlob(
      (blob) => {
        if (!blob) {
          return reject(new Error("Canvas is empty"));
        }
        // Then convert to base64
        const reader = new FileReader();
        reader.onloadend = () => {
          resolve({
            blob,
            base64: reader.result, // Data URL string
          });
        };
        reader.onerror = (err) => reject(err);
        reader.readAsDataURL(blob);
      },
      "image/jpeg",
      0.9
    );
  });
}

function createImage(url) {
  return new Promise((resolve, reject) => {
    const image = new Image();
    image.setAttribute("crossOrigin", "anonymous");
    image.onload = () => resolve(image);
    image.onerror = (error) => reject(error);
    image.src = url;
  });
}
