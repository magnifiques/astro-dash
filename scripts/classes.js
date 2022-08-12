class Player {
  constructor() {
    this.speed = 10;
    this.position = {
      x: 100,
      y: 100,
    };
    this.velocity = {
      x: 0,
      y: 0,
    };
    this.height = 150;
    this.dead = false;
    this.sprites = {
      idleRight: {
        image: createImageObject("../sprites/spriteStandRight.png"),
        cropWidth: 177,
        currentWidth: 66,
      },

      idleLeft: {
        image: createImageObject("../sprites/spriteStandLeft.png"),
        cropWidth: 177,
        currentWidth: 66,
      },

      runRight: {
        image: createImageObject("../sprites/spriteRunRight.png"),
        cropWidth: 341,
        currentWidth: 127.875,
      },

      runLeft: {
        image: createImageObject("../sprites/spriteRunLeft.png"),
        cropWidth: 341,
        currentWidth: 127.875,
      },
    };

    this.currentFrame = 0;

    this.currentImage = this.sprites.idleRight.image;

    this.cropWidth = this.sprites.idleRight.cropWidth;

    this.width = this.sprites.idleRight.currentWidth;
  }

  draw() {
    canvasContext.drawImage(
      this.currentImage,
      this.cropWidth * this.currentFrame,
      0,
      this.cropWidth,
      400,
      this.position.x,
      this.position.y,
      this.width,
      this.height
    );
  }

  update() {
    this.draw();
    if (
      this.currentFrame > 58 &&
      (this.currentImage === this.sprites.idleRight.image ||
        this.currentImage === this.sprites.idleLeft.image)
    ) {
      this.currentFrame = 0;
    } else if (
      this.currentFrame > 28 &&
      (this.currentImage === this.sprites.runRight.image ||
        this.currentImage === this.sprites.runLeft.image)
    ) {
      this.currentFrame = 0;
    } else {
      this.currentFrame++;
    }
    this.position.x += this.velocity.x;
    this.position.y += this.velocity.y;

    if (this.position.y + this.height + this.velocity.y <= canvas.height) {
      this.velocity.y += gravity;
    }
  }
}

class Platform {
  constructor({ position, image }) {
    this.position = {
      x: position.x,
      y: position.y,
    };
    this.image = image;
    this.width = this.image.width;
    this.height = this.image.height;
  }

  draw() {
    canvasContext.drawImage(this.image, this.position.x, this.position.y);
    // canvasContext.fillStyle = "blue";
    // canvasContext.fillRect(
    //   this.position.x,
    //   this.position.y,
    //   this.width,
    //   this.height
    // );
  }

  update() {
    this.draw();
  }
}

class GenericObject {
  constructor({ position, image }) {
    this.position = {
      x: position.x,
      y: position.y,
    };
    this.image = image;
    this.width = this.image.width;
    this.height = this.image.height;
  }

  draw() {
    canvasContext.drawImage(this.image, this.position.x, this.position.y);
    // canvasContext.fillStyle = "blue";
    // canvasContext.fillRect(
    //   this.position.x,
    //   this.position.y,
    //   this.width,
    //   this.height
    // );
  }

  update() {
    this.draw();
  }
}
