function createImageObject(imgSrc) {
  const image = new Image();
  image.src = imgSrc;
  return image;
}

function spriteSwitcher(lastKey) {
  if (
    lastKey === "right" &&
    astro.currentImage !== astro.sprites.runRight.image
  ) {
    astro.currentImage !== astro.sprites.runRight.image;
    astro.cropWidth = astro.sprites.idleRight.cropWidth;
    astro.width = astro.sprites.idleRight.currentWidth;
  }
}
