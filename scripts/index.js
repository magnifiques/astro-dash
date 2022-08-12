const canvas = document.querySelector("canvas");

canvas.width = 1024;
canvas.height = 576;

const canvasContext = canvas.getContext("2d");
const gravity = 0.5;

const platformImage = createImageObject("../sprites/platform.png");
const smallPlatformImage = createImageObject(
  "../sprites/platformSmallTall.png"
);
const backgroundImage = createImageObject("../sprites/background.png");
const hillsImage = createImageObject("../sprites/hills.png");
const houseImage = createImageObject("../sprites/houses.png");

let winOffset = 0;
let number = 1;
const astro = new Player();

const platforms = [
  new Platform({
    position: { x: -1, y: 470 },
    image: platformImage,
  }),
  new Platform({
    position: { x: 10, y: 244 },
    image: smallPlatformImage,
  }),
  new Platform({
    position: { x: platformImage.width + 40, y: 244 },
    image: smallPlatformImage,
  }),
  new Platform({
    position: { x: platformImage.width - 3, y: 470 },
    image: platformImage,
  }),
  new Platform({
    position: { x: platformImage.width * (number + 1) + 300, y: 470 },
    image: platformImage,
  }),
  new Platform({
    position: { x: platformImage.width * (number + 2) + 600, y: 470 },
    image: platformImage,
  }),
  new Platform({
    position: {
      x: platformImage.width * (number + 2) + 600 + smallPlatformImage.width,
      y: 244,
    },
    image: smallPlatformImage,
  }),
  new Platform({
    position: { x: platformImage.width * (number + 3) + 1000, y: 470 },
    image: platformImage,
  }),
  new Platform({
    position: { x: platformImage.width * (number + 4) + 1320, y: 250 },
    image: smallPlatformImage,
  }),
  new Platform({
    position: { x: platformImage.width * (number + 4) + 2000, y: 470 },
    image: platformImage,
  }),
  new Platform({
    position: { x: platformImage.width * (number + 5) + 2400, y: 250 },
    image: smallPlatformImage,
  }),
  new Platform({
    position: { x: platformImage.width * (number + 5) + 3200, y: 200 },
    image: smallPlatformImage,
  }),
  new Platform({
    position: { x: platformImage.width * (number + 5) + 3900, y: 300 },
    image: smallPlatformImage,
  }),
  new Platform({
    position: { x: platformImage.width * (number + 5) + 4800, y: 210 },
    image: smallPlatformImage,
  }),
  new Platform({
    position: { x: platformImage.width * (number + 5) + 5400, y: 470 },
    image: smallPlatformImage,
  }),

  new Platform({
    position: { x: platformImage.width * (number + 5) + 6300, y: 470 },
    image: smallPlatformImage,
  }),

  new Platform({
    position: { x: platformImage.width * (number + 5) + 7000, y: 470 },
    image: platformImage,
  }),
  new Platform({
    position: { x: platformImage.width * (number + 5) + 7500, y: 470 },
    image: platformImage,
  }),

  new Platform({
    position: { x: platformImage.width * (number + 5) + 7200, y: 219 },
    image: houseImage,
  }),
];

const genericObjects = [
  new GenericObject({
    position: {
      x: -1,
      y: -1,
    },
    image: backgroundImage,
  }),
  new GenericObject({
    position: {
      x: -1,
      y: -1,
    },
    image: hillsImage,
  }),
];

const keys = {
  left: {
    pressed: false,
  },
  right: {
    pressed: false,
  },
};

let lastKey;

function animate() {
  requestAnimationFrame(animate);
  canvasContext.fillStyle = "white";
  canvasContext.fillRect(0, 0, canvas.width, canvas.height);

  genericObjects.forEach((genOb) => {
    genOb.draw();
  });

  platforms.forEach((platform) => {
    platform.draw();
  });

  astro.update();
  // if (astro.position.x === 100) {
  //   keys.left.pressed = false;
  // }
  if (
    (keys.left.pressed && astro.position.x > 100) ||
    (keys.left.pressed && winOffset === 0 && astro.position.x > 20)
  ) {
    astro.velocity.x = -astro.speed;
  } else if (keys.right.pressed && astro.position.x < 400) {
    astro.velocity.x = astro.speed;
  } else {
    astro.velocity.x = 0;
    if (keys.right.pressed) {
      platforms.forEach((platform) => {
        platform.position.x -= astro.speed;
        winOffset += astro.speed;
      });

      genericObjects.forEach((genOb) => {
        genOb.position.x -= astro.speed * 0.66;
      });
    } else if (keys.left.pressed && winOffset > 0) {
      platforms.forEach((platform) => {
        platform.position.x += astro.speed;
        winOffset -= astro.speed;
      });

      genericObjects.forEach((genOb) => {
        genOb.position.x += astro.speed * 0.66;
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

  //* Win Scenario
  if (winOffset >= 198000) {
    astro.dead = true;
    document.querySelector("#verdict").style.opacity = 1;
    document.querySelector("#verdict").innerHTML =
      "Congratulations! <br />You've Cleared the level!<br />Please reload the page to play again!";
  }

  //!Lose Condition
  if (astro.position.y >= 526) {
    astro.dead = true;
    document.querySelector("#verdict").style.opacity = 1;
    document.querySelector("#verdict").innerHTML =
      "Game Over!<br />Please reload the page to play again!";
  }

  if (
    keys.right.pressed &&
    lastKey === "right" &&
    astro.currentImage !== astro.sprites.runRight.image
  ) {
    astro.currentImage = astro.sprites.runRight.image;
    astro.cropWidth = astro.sprites.runRight.cropWidth;
    astro.width = astro.sprites.runRight.currentWidth;
  } else if (
    keys.left.pressed &&
    lastKey === "left" &&
    astro.currentImage !== astro.sprites.runLeft.image
  ) {
    astro.currentImage = astro.sprites.runLeft.image;
    astro.cropWidth = astro.sprites.runLeft.cropWidth;
    astro.width = astro.sprites.runLeft.currentWidth;
  } else if (
    !keys.right.pressed &&
    lastKey === "right" &&
    astro.currentImage !== astro.sprites.idleRight.image
  ) {
    astro.currentImage = astro.sprites.idleRight.image;
    astro.cropWidth = astro.sprites.idleRight.cropWidth;
    astro.width = astro.sprites.idleRight.currentWidth;
  } else if (
    !keys.left.pressed &&
    lastKey === "left" &&
    astro.currentImage !== astro.sprites.idleLeft.image
  ) {
    astro.currentImage = astro.sprites.idleLeft.image;
    astro.cropWidth = astro.sprites.idleLeft.cropWidth;
    astro.width = astro.sprites.idleLeft.currentWidth;
  }
}

animate();

addEventListener("keydown", (event) => {
  if (event.repeat) return;

  if (!astro.dead) {
    switch (event.code) {
      case "KeyW":
        astro.velocity.y = -15;
        break;

      case "KeyA":
        keys.left.pressed = true;
        lastKey = "left";
        break;

      case "KeyD":
        keys.right.pressed = true;
        lastKey = "right";
        break;
    }
  }
});

addEventListener("keyup", (event) => {
  if (event.repeat) return;

  switch (event.code) {
    case "KeyW":
      if (!astro.dead) {
        break;
      }

    case "KeyA":
      keys.left.pressed = false;
      break;

    case "KeyD":
      keys.right.pressed = false;
      break;
  }
});
