const canvas = document.querySelector("canvas");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const canvasContext = canvas.getContext("2d");
const gravity = 0.5;

class Player {
  constructor() {
    this.position = {
      x: 100,
      y: 100,
    };
    this.velocity = {
      x: 0,
      y: 10,
    };
    this.width = 50;
    this.height = 50;
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
    this.position.y += this.velocity.y;

    if (this.position.y + this.height + this.velocity.y <= canvas.height) {
      this.velocity.y += gravity;
    } else {
      this.velocity.y = 0;
    }
  }
}

const astro = new Player();

function animate() {
  requestAnimationFrame(animate);
  canvasContext.clearRect(0, 0, canvas.width, canvas.height);
  astro.update();
}

animate();
