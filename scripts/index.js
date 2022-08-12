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

let winOffset = 0;
let number = 1;
const astro = new Player();

const platforms = [
  new Platform({
    position: { x: -1, y: 470 },
    image: platformImage,
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
  if (keys.left.pressed && astro.position.x > 100) {
    astro.velocity.x = -astro.speed;
  } else if (keys.right.pressed && astro.position.x < 400) {
    astro.velocity.x = astro.speed;
  } else {
    astro.velocity.x = 0;
    if (keys.right.pressed) {
      platforms.forEach((platform) => {
        platform.position.x -= 5;
        winOffset += astro.speed;
      });

      genericObjects.forEach((genOb) => {
        genOb.position.x -= 3;
      });
    } else if (keys.left.pressed) {
      platforms.forEach((platform) => {
        platform.position.x += 5;
        winOffset -= astro.speed;
      });

      genericObjects.forEach((genOb) => {
        genOb.position.x += 3;
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

  if (winOffset >= 20000) {
    console.log("You've won");
  }
  //!Lose Condition
  if (astro.position.y >= 526) {
    astro.dead = true;
    document.querySelector("#verdict").style.opacity = 1;
    document.querySelector("#verdict").innerHTML =
      "Game Over!<br />Please reload the page to play again!";
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
        console.log("left");
        keys.left.pressed = true;
        break;

      case "KeyD":
        keys.right.pressed = true;
        break;

      case "KeyS":
        break;
    }
  }
});

addEventListener("keyup", (event) => {
  if (event.repeat) return;

  switch (event.code) {
    case "KeyW":
      if (!astro.dead) {
      }

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
