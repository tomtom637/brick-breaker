class Ball {
  constructor(speed, r, g, b, diameter) {
    this.body = createVector(canvaWidth / 2, canvaHeight / 1.06);
    this.speed = speed;
    this.xdir = 0;
    this.ydir = speed;
    this.r = r;
    this.g = g;
    this.b = b;
    this.diameter = diameter;
    this.radius = diameter / 2;
  }
  update() {
    // starting the game with the ball going left
    this.body.x -= this.xdir;

    // starting the game with the ball going upwards
    this.body.y -= this.ydir;

    // logic for bouncing off the vertical walls
    if (this.body.x >= canvaWidth - this.diameter / 2 && this.xdir < 0) {
      this.xdir = this.xdir * -1;
    } else if (this.body.x <= this.diameter / 2 && this.xdir > 0) {
      this.xdir = this.xdir * -1;
    }

    // logic for bouncing off the top wall
    if (this.body.y <= this.diameter / 2) {
      this.ydir = -this.ydir;
    }

    // logic for bouncing off the paddle
    if (this.body.y >= paddle.body.y + 8 - this.diameter / 2) {
      if (
        this.body.x + this.diameter / 2 > paddle.body.x &&
        this.body.x - this.diameter / 2 < paddle.body.x + paddle.pWidth
      ) {
        this.ydir = -this.ydir;
        let paddleCenter = paddle.body.x + paddle.pWidth / 2;
        let relativeBallPosition = paddleCenter - this.body.x;
        let speedMultiplicator =
          (relativeBallPosition / paddle.pWidth) * 2 * 0.8;
        this.xdir = this.speed * speedMultiplicator;
        if (this.xdir < 0) {
          this.ydir = this.speed + this.xdir;
        } else if (this.xdir > 0) {
          this.ydir = this.speed - this.xdir;
        } else {
          this.ydir = 0;
        }
        if (this.body.x === paddleCenter) {
          this.xdir = 0;
          this.ydir = this.speed;
        }
      } else {
        // if no bouncing off the paddle ... game over
        text(
          `GAME OVER \nPRESS THE UP ARROW TO START OVER`,
          canvaWidth / 2 - 40,
          canvaHeight / 2
        );
        noLoop();
        score = 0;
      }
    }
    // logic for bouncing off the bricks
    for (let brick of bricks) {
      let brickLeft = brick.body.x;
      let brickRight = brick.body.x + brick.bWidth;
      let brickTop = brick.body.y;
      let brickBottom = brick.body.y + brick.bHeight;
      let { x, y } = this.body;

      if (
        x + this.radius > brickLeft &&
        x - this.radius < brickLeft &&
        y > brickTop &&
        y < brickBottom &&
        this.xdir < 0
      ) {
        this.xdir = -this.xdir;
        brick.lives -= 1;
        score++;
      } else if (
        x - this.radius < brickRight &&
        x + this.radius > brickRight &&
        y > brickTop &&
        y < brickBottom &&
        this.xdir > 0
      ) {
        this.xdir = -this.xdir;
        brick.lives -= 1;
        score++;
      } else if (
        y + this.radius > brickTop &&
        y - this.radius < brickTop &&
        x > brickLeft &&
        x < brickRight &&
        this.ydir < 0
      ) {
        this.ydir = -this.ydir;
        brick.lives -= 1;
        score++;
      } else if (
        y - this.radius < brickBottom &&
        y + this.radius > brickBottom &&
        x > brickLeft &&
        x < brickRight &&
        this.ydir > 0
      ) {
        this.ydir = -this.ydir;
        brick.lives -= 1;
        score++;
      }
    }
  }
  show() {
    fill(this.r, this.g, this.b);
    circle(this.body.x, this.body.y, this.diameter, this.diameter);
  }
}
