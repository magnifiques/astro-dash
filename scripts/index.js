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
      y: 0,
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
  constructor() {
    this.position = {
      x: 200,
      y: 300,
    };
    this.width = 200;
    this.height = 20;
  }

  draw() {
    canvasContext.fillStyle = "blue";
    canvasContext.fillRect(
      this.position.x,
      this.position.y,
      this.width,
      this.height
    );
  }

  update() {
    this.draw();
  }
}

const astro = new Player();
const platform = new Platform();
const keys = {
  left: {
    pressed: false,
  },
  right: {
    pressed: false,
  },
};

function animate() {
  requestAnimationFrame(animate);
  canvasContext.clearRect(0, 0, canvas.width, canvas.height);

  astro.update();
  platform.update();

  if (keys.left.pressed) {
    astro.velocity.x = -5;
  } else if (keys.right.pressed) {
    astro.velocity.x = 5;
  } else {
    astro.velocity.x = 0;
  }

  if (
    astro.position.y + astro.height <= platform.position.y &&
    astro.position.y + astro.height + astro.velocity.y >= platform.position.y &&
    astro.position.x + astro.width >= platform.position.x &&
    astro.position.x <= platform.position.x + platform.width
  ) {
    astro.velocity.y = 0;
  }
}

animate();

addEventListener("keydown", (event) => {
  console.log(event);
  if (event.repeat) return;

  switch (event.code) {
    case "KeyW":
      console.log("up");
      astro.velocity.y = -10;
      break;

    case "KeyA":
      console.log("left");
      keys.left.pressed = true;
      break;

    case "KeyD":
      console.log("right");
      keys.right.pressed = true;
      break;

    case "KeyS":
      console.log("down");
      break;
  }
});

addEventListener("keyup", (event) => {
  console.log(event);

  if (event.repeat) return;
  switch (event.code) {
    case "KeyW":
      console.log("up");
      astro.velocity.y = -10;
      break;

    case "KeyA":
      console.log("left");
      keys.left.pressed = false;
      break;

    case "KeyD":
      console.log("right");
      keys.right.pressed = false;
      break;

    case "KeyS":
      console.log("down");
      break;
  }
});
