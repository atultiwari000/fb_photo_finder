(() => {
  const images = Array.from(document.querySelectorAll("img"));
  const filteredPhotos = images
    .filter((img) => {
      const isLargeEnough = img.naturalWidth > 100 && img.naturalHeight > 100;
      const isFbImage = img.src.includes("fbcdn");
      return isLargeEnough && isFbImage;
    })
    .map((img) => ({
      src: img.src,
      width: img.naturalWidth,
      height: img.naturalHeight,
    }));

  return filteredPhotos;
})();
