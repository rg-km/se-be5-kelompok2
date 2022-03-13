const CELL_SIZE = 20;
const CANVAS_SIZE = 400;
const REDRAW_INTERVAL = 50;
const WIDTH = CANVAS_SIZE / CELL_SIZE;
const HEIGHT = CANVAS_SIZE / CELL_SIZE;
const DIRECTION = {
  LEFT: 0,
  RIGHT: 1,
  UP: 2,
  DOWN: 3,
};
const MOVE_INTERVAL = 150;

function initPosition() {
  return {
    x: Math.floor(Math.random() * WIDTH),
    y: Math.floor(Math.random() * HEIGHT),
  };
}

function initHeadAndBody() {
  let head = initPosition();
  let body = [{ x: head.x, y: head.y }];
  return {
    head: head,
    body: body,
  };
}

function initDirection() {
  return Math.floor(Math.random() * 4);
}

function initSnake(color) {
  return {
    color: color,
    ...initHeadAndBody(),
    direction: initDirection(),
    score: 0,
    relife: [
      { x: 1, y: 1 },
      { x: 2, y: 1 },
      { x: 3, y: 1 },
    ],
    level: 1,
    speed: 150,
  };
}
let snake1 = initSnake("purple");
let lifes = [];

function initApple() {
  return {
    position: initPosition(),
  };
}
let apple1 = initApple();
let apple2 = initApple();

// level dinding
let barrierWalls = [
  { level: 1, walls: [] },
  {
    level: 2,
    walls: [
      {
        startX: 4,
        startY: 10,
        endX: 17,
        endY: 10,
        width: CELL_SIZE,
        height: CELL_SIZE,
      },
    ],
  },
  {
    level: 3,
    walls: [
      {
        startX: 1,
        startY: 10,
        endX: 1,
        endY: 20,
        width: CELL_SIZE,
        height: CELL_SIZE,
      },
      {
        startX: 7,
        startY: 5,
        endX: 22,
        endY: 5,
        width: CELL_SIZE,
        height: CELL_SIZE,
      },
    ],
  },
  {
    level: 4,
    walls: [
      {
        startX: 13,
        startY: 0,
        endX: 26,
        endY: 30,
        width: CELL_SIZE,
        height: CELL_SIZE,
      },
      {
        startX: 5,
        startY: 13,
        endX: 6,
        endY: 13,
        width: CELL_SIZE,
        height: CELL_SIZE,
      },
      {
        startX: 4,
        startY: 15,
        endX: 15,
        endY: 15,
        width: CELL_SIZE,
        height: CELL_SIZE,
      },
    ],
  },
  {
    level: 5,
    walls: [
      {
        startX: 5,
        startY: 13,
        endX: 6,
        endY: 13,
        width: CELL_SIZE,
        height: CELL_SIZE,
      },
      {
        startX: 7,
        startY: 22,
        endX: 19,
        endY: 22,
        width: CELL_SIZE,
        height: CELL_SIZE,
      },
      {
        startX: 12,
        startY: 22,
        endX: 26,
        endY: 22,
        width: CELL_SIZE,
        height: CELL_SIZE,
      },
      {
        startX: 13,
        startY: 0,
        endX: 26,
        endY: 30,
        width: CELL_SIZE,
        height: CELL_SIZE,
      },
      {
        startX: 0,
        startY: 0,
        endX: 39,
        endY: 0,
        width: CELL_SIZE,
        height: CELL_SIZE,
      },
      {
        startX: 0,
        startY: 39,
        endX: 39,
        endY: 39,
        width: CELL_SIZE,
        height: CELL_SIZE,
      },
      {
        startX: 0,
        startY: 0,
        endX: 0,
        endY: 39,
        width: CELL_SIZE,
        height: CELL_SIZE,
      },
      {
        startX: 39,
        startY: 0,
        endX: 39,
        endY: 39,
        width: CELL_SIZE,
        height: CELL_SIZE,
      },
    ],
  },
];

function drawCell(ctx, x, y, img) {
  let DRAW_SNAKE = document.getElementById(img);
  ctx.drawImage(DRAW_SNAKE, x * CELL_SIZE, y * CELL_SIZE, CELL_SIZE, CELL_SIZE);
}

function drawScore(snake) {
  let scoreCanvas = document.getElementById("score1Board");
  let scoreCtx = scoreCanvas.getContext("2d");

  scoreCtx.clearRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
  scoreCtx.font = "30px Arial";
  scoreCtx.fillStyle = snake.color;
  scoreCtx.fillText(snake.score, 10, scoreCanvas.scrollHeight / 2);
}

function drawSpeed(snake) {
  let speedCanvas = document.getElementById("speedBoard");
  let speedCtx = speedCanvas.getContext("2d");

  speedCtx.clearRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
  speedCtx.font = "20px Arial";
  speedCtx.fillStyle = snake.color;
  speedCtx.fillText(snake.speed + " .ms", 10, speedCanvas.scrollHeight / 2);
}

function drawLevel(snake) {
  let levelElement = document.getElementById("Level");
  levelElement.innerText = "Level " + snake.level;
}

function drawApple(ctx, x, y) {
  let IMG_APPLE = document.getElementById("apple");
  ctx.drawImage(IMG_APPLE, x * CELL_SIZE, y * CELL_SIZE, CELL_SIZE, CELL_SIZE);
}
function drawSnakeHead(ctx, snake) {
  var img;
  // Check which direction snake headed
  switch (snake.direction) {
    case DIRECTION.LEFT:
      img = document.getElementById("head-snake-left");
      ctx.drawImage(
        img,
        snake.head.x * CELL_SIZE,
        snake.head.y * CELL_SIZE,
        CELL_SIZE,
        CELL_SIZE
      );
      break;
    case DIRECTION.RIGHT:
      img = document.getElementById("head-snake-right");
      ctx.drawImage(
        img,
        snake.head.x * CELL_SIZE,
        snake.head.y * CELL_SIZE,
        CELL_SIZE,
        CELL_SIZE
      );
      break;
    case DIRECTION.UP:
      img = document.getElementById("head-snake-up");
      ctx.drawImage(
        img,
        snake.head.x * CELL_SIZE,
        snake.head.y * CELL_SIZE,
        CELL_SIZE,
        CELL_SIZE
      );
      break;
    case DIRECTION.DOWN:
      img = document.getElementById("head-snake-down");
      ctx.drawImage(
        img,
        snake.head.x * CELL_SIZE,
        snake.head.y * CELL_SIZE,
        CELL_SIZE,
        CELL_SIZE
      );
      break;
  }
}

function draw() {
  setInterval(function () {
    let snakeCanvas = document.getElementById("snakeBoard");
    let ctx = snakeCanvas.getContext("2d");

    ctx.clearRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);

    drawbarrierWalls(ctx, snake, barrierWalls);

    drawSnakeHead(ctx, snake);
    var bodyImage = document.getElementById("body-snake");
    for (let i = 1; i < snake.body.length; i++) {
      ctx.drawImage(
        bodyImage,
        snake.body[i].x * CELL_SIZE,
        snake.body[i].y * CELL_SIZE,
        CELL_SIZE,
        CELL_SIZE
      );
    }

    for (let i = 0; i < apples.length; i++) {
      let apple = apples[i];

      var img = document.getElementById("apple");
      ctx.drawImage(
        img,
        apple.position.x * CELL_SIZE,
        apple.position.y * CELL_SIZE,
        CELL_SIZE,
        CELL_SIZE
      );
    }

    for (let i = 0; i < lifes.length; i++) {
      drawRemainingLife(ctx, lifes[i]);
    }

    for (let i = 0; i < snake.relife.length; i++) {
      var img = document.getElementById("life");
      ctx.drawImage(
        img,
        snake.relife[i].x * CELL_SIZE,
        snake.relife[i].y * CELL_SIZE,
        CELL_SIZE,
        CELL_SIZE
      );
    }

    drawScore(snake);
    drawSpeed(snake);
    drawLevel(snake);
  }, REDRAW_INTERVAL);
}

function teleport(snake) {
  if (snake.head.x < 0) {
    snake.head.x = CANVAS_SIZE / CELL_SIZE - 1;
  }
  if (snake.head.x >= WIDTH) {
    snake.head.x = 0;
  }
  if (snake.head.y < 0) {
    snake.head.y = CANVAS_SIZE / CELL_SIZE - 1;
  }
  if (snake.head.y >= HEIGHT) {
    snake.head.y = 0;
  }
}

function eat(snake, apple) {
  if (snake.head.x == apple.position.x && snake.head.y == apple.position.y) {
    apple.position = initPosition();
    snake.score++;
    snake.body.push({ x: snake.head.x, y: snake.head.y });
  }
}

function eatlife(snake, lifes) {
  for (let i = 0; i < lifes.length; i++) {
    if (snake.head.x === lifes[i].pos.x && snake.head.y === lifes[i].pos.y) {
      snake.relife.push({ x: snake.relife.length + 1, y: 1 });
      lifes.splice(i, 1);
      document.getElementById("eating-life").play();
    }
  }
}

function moveLeft(snake) {
  snake.head.x--;
  teleport(snake);
  eat(snake, apple1);
  eat(snake, apple2);
}

function moveRight(snake) {
  snake.head.x++;
  teleport(snake);
  eat(snake, apple1);
  eat(snake, apple2);
}

function moveDown(snake) {
  snake.head.y++;
  teleport(snake);
  eat(snake, apple1);
  eat(snake, apple2);
}

function moveUp(snake) {
  snake.head.y--;
  teleport(snake);
  eat(snake, apple1);
  eat(snake, apple2);
}

function drawbarrierWalls(ctx, snake, barrierWalls) {
  let walls = barrierWalls.find(function (element) {
    return element.level === snake.level;
  }).walls;

  //   ctx.fillStyle = "grey";
  img = document.getElementById("barrier-wall");
  for (let i = 0; i < walls.length; i++) {
    for (let j = walls[i].startX; j <= walls[i].endX; j++) {
      for (let k = walls[i].startY; k <= walls[i].endY; k++) {
        ctx.drawImage(
          img,
          j * CELL_SIZE,
          k * CELL_SIZE,
          walls[i].width,
          walls[i].height
        );
      }
    }
  }
}

function showLifes(score) {
  if (score <= 1) {
    return false;
  }

  for (var i = 2; i < score; i++) {
    if (score % i === 0) {
      return false;
    }
  }

  return true;
}

function drawRemainingLife(ctx, life) {
  let lifeImg = document.getElementById("life");
  setTimeout(function () {
    ctx.drawImage(
      lifeImg,
      life.pos.x * CELL_SIZE,
      life.pos.y * CELL_SIZE,
      CELL_SIZE,
      CELL_SIZE
    );
  }, REDRAW_INTERVAL / 2);
}

function getLevel(score) {
  switch (score) {
    case 5:
      return 2;
    case 10:
      return 3;
    case 15:
      return 4;
    default:
      return 5;
  }
}

function checkIsCollide(snakes, barrierWalls) {
  let isCollide = false;
  // Check whether snake collide with its body
  for (let k = 1; k < snakes.body.length; k++) {
    if (
      snakes.head.x == snakes.body[k].x &&
      snakes.head.y == snakes.body[k].y
    ) {
      document.getElementById("crash").play();
      isCollide = true;
    }
  }

  // Check whether snake collide with barrierWalls
  if (checkbarrierWallsCollision(snakes, barrierWalls)) {
    isCollide = true;
  }

  if (isCollide) {
    snake.relife.pop();
    if (snake.relife.length === 0) {
      document.getElementById("gameover").play();
      alert("Game Over!");
      snake = initSnake("green");
      apples = [
        {
          color: "red",
          position: initPosition(),
        },
        {
          color: "green",
          position: initPosition(),
        },
      ];
      lifes = [];
    } else {
      snake = {
        ...snake,
        ...initHeadAndBody(),
      };
    }
  }
  return isCollide;
}

function move(snake) {
  switch (snake.direction) {
    case DIRECTION.LEFT:
      moveLeft(snake);
      break;
    case DIRECTION.RIGHT:
      moveRight(snake);
      break;
    case DIRECTION.DOWN:
      moveDown(snake);
      break;
    case DIRECTION.UP:
      moveUp(snake);
      break;
  }
  moveBody(snake);
  if (!checkIsCollide([snake1])) {
    setTimeout(function () {
      move(snake);
    }, MOVE_INTERVAL);
  } else {
    initGame();
  }
}

function moveBody(snake) {
  snake.body.unshift({ x: snake.head.x, y: snake.head.y });
  snake.body.pop();
}

function turn(snake, direction) {
  const oppositeDirections = {
    [DIRECTION.LEFT]: DIRECTION.RIGHT,
    [DIRECTION.RIGHT]: DIRECTION.LEFT,
    [DIRECTION.DOWN]: DIRECTION.UP,
    [DIRECTION.UP]: DIRECTION.DOWN,
  };

  if (direction !== oppositeDirections[snake.direction]) {
    snake.direction = direction;
  }
}

document.addEventListener("keydown", function (event) {
  if (event.key === "ArrowLeft") {
    turn(snake1, DIRECTION.LEFT);
  } else if (event.key === "ArrowRight") {
    turn(snake1, DIRECTION.RIGHT);
  } else if (event.key === "ArrowUp") {
    turn(snake1, DIRECTION.UP);
  } else if (event.key === "ArrowDown") {
    turn(snake1, DIRECTION.DOWN);
  }
});

function initGame() {
  move(snake1);
}

initGame();
