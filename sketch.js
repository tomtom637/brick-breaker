let currentLevel = 0;
let canvaWidth = levels[currentLevel][0].length * 100;
let canvaHeight = levels[currentLevel].length * 100;
const red = [200, 0, 50];
const blue = [0, 150, 200];
const green = [0, 200, 80];
const grey = [200, 200, 200];
const darkGrey = [80, 80, 80];

let redBall;
let paddle;
let bricks;
let brickWidth = 35;
let brickHeight = 35;
let score = 0;

function setup() {
  createCanvas(canvaWidth, canvaHeight);
  redBall = new Ball(15, ...red, 20);
  paddle = new Paddle(...grey, 130, 15);
  bricks = [];
  for (let i = 0; i < levels[currentLevel].length; i++) {
    for (let j = 0; j < levels[currentLevel][i].length; j++) {
      if (levels[currentLevel][i][j] === 1) {
        let xLoc = j * 100 + brickWidth / 2;
        let yLoc = i * 100 + brickHeight / 2;
        bricks = [
          ...bricks,
          new Brick(xLoc, yLoc, ...grey, brickWidth, brickHeight)
        ];
      }
    }
  }
}

function draw() {
  background(40);

  redBall.update();
  redBall.show();

  paddle.update();
  paddle.show();

  for (let i = 0; i < bricks.length; i++) {
    bricks[i].update();
    bricks[i].show();
    if (bricks[i].lives === 0) {
      bricks.splice(i, 1);
    }
  }

  fill(...grey);
  text(`SCORE : ${score}`, canvaWidth / 10, canvaHeight / 10);

  if (bricks.length === 0) {
    noLoop();
    if (currentLevel === levels.length - 1) {
      text(
        `CONGRATILATIONS\nYOU'VE FINISHED THE GAME`,
        canvaWidth / 2 - 40,
        canvaHeight / 2
      );
      currentLevel = 0;
    } else {
      text(
        `CONGRATILATIONS\nPRESS THE UP ARROW TO CONTINUE`,
        canvaWidth / 2 - 40,
        canvaHeight / 2
      );
      currentLevel++;
    }
  }

  if (keyIsDown(LEFT_ARROW)) {
    paddle.body.x -= paddle.xdir;
  } else if (keyIsDown(RIGHT_ARROW)) {
    paddle.body.x += paddle.xdir;
  }
}

function keyPressed() {
  if (keyCode === UP_ARROW) {
    if (bricks.length !== 0) {
      score = 0;
    }
    setup();
    loop();
  }
}
