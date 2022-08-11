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
  constructor({ position }) {
    this.position = {
      x: position.x,
      y: position.y,
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
const platforms = [
  new Platform({ position: { x: 200, y: 400 } }),
  new Platform({ position: { x: 400, y: 600 } }),
];
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
  platforms.forEach((platform) => {
    platform.update();
  });
  //platform.update();

  if (keys.left.pressed && astro.position.x > 100) {
    astro.velocity.x = -5;
  } else if (keys.right.pressed && astro.position.x < 400) {
    astro.velocity.x = 5;
  } else {
    astro.velocity.x = 0;
    if (keys.right.pressed) {
      platforms.forEach((platform) => {
        platform.position.x -= 5;
      });
    } else if (keys.left.pressed) {
      platforms.forEach((platform) => {
        platform.position.x += 5;
      });
    }
  }
  platforms.forEach((platform) => {
    if (
      astro.position.y + astro.height <= platform.position.y &&
      astro.position.y + astro.height + astro.velocity.y >=
        platform.position.y &&
      astro.position.x + astro.width >= platform.position.x &&
      astro.position.x <= platform.position.x + platform.width
    ) {
      astro.velocity.y = 0;
    }
  });
}

animate();

addEventListener("keydown", (event) => {
  if (event.repeat) return;

  switch (event.code) {
    case "KeyW":
      astro.velocity.y = -10;
      break;

    case "KeyA":
      console.log("left");
      keys.left.pressed = true;
      break;

    case "KeyD":
      keys.right.pressed = true;
      break;

    case "KeyS":
      break;
  }
});

addEventListener("keyup", (event) => {
  if (event.repeat) return;
  switch (event.code) {
    case "KeyW":
      astro.velocity.y = -10;
      break;

    case "KeyA":
      keys.left.pressed = false;
      break;

    case "KeyD":
      keys.right.pressed = false;
      break;

    case "KeyS":
      break;
  }
});
