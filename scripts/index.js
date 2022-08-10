const canvas = document.querySelector("canvas");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const canvasContext = canvas.getContext("2d");

class Player {
  constructor() {
    this.position = {
      x: 100,
      y: 100,
    };
    (this.width = 100), (this.height = 100);
  }

  draw() {
    canvasContext.fillRect(
      this.position.x,
      this.position.y,
      this.width,
      this.height
    );
  }
}

const astro = new Player();
astro.draw();

console.log(canvasContext);
