let canvaWidth = 700;
let canvaHeight = 600;
let red = [200, 0, 50];
let blue = [0, 150, 200];
let green = [0, 200, 80];
let grey = [200, 200, 200];
let darkGrey = [80, 80, 80];

let redBall;
let paddle;
let bricks = [];
let translation = 100;
let score = 0;

function setup() {
  createCanvas(canvaWidth, canvaHeight);
  redBall = new Ball(15, ...red, 20);
  paddle = new Paddle(...grey, 130, 15);
  for (let i = 0; i < 10; i++) {
    bricks[i] = new Brick(translation, ...grey, 35, 35);
    translation += 50;
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
    function win() {
      text(
        `CONGRATILATIONS\nPRESS THE UP ARROW TO START OVER`,
        canvaWidth / 2 - 40,
        canvaHeight / 2
      );
      noLoop();
      translation = 100;
    }
    setTimeout(win, 0);
  }

  if (keyIsDown(LEFT_ARROW)) {
    paddle.body.x -= paddle.xdir;
  } else if (keyIsDown(RIGHT_ARROW)) {
    paddle.body.x += paddle.xdir;
  }
}

function keyPressed() {
  if (keyCode === UP_ARROW) {
    setup();
    loop();
    translation = 100;
    score = 0;
  }
}
