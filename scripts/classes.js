class Player {
  constructor() {
    this.position = {
      x: 100,
      y: 100,
    };
    this.velocity = {
      x: 0,
      y: 0,
    };
    this.width = 50;
    this.height = 50;
    this.dead = false;
  }

  draw() {
    canvasContext.fillStyle = "red";
    canvasContext.fillRect(
      this.position.x,
      this.position.y,
      this.width,
      this.height
    );
  }

  update() {
    this.draw();

    this.position.x += this.velocity.x;
    this.position.y += this.velocity.y;

    if (this.position.y + this.height + this.velocity.y <= canvas.height) {
      this.velocity.y += gravity;
    } else {
      this.velocity.y = 0;
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
