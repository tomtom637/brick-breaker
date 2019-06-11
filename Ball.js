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
  }
  update() {
    // starting the game with the ball going left
    this.body.x -= this.xdir;

    // starting the game with the ball going upwards
    this.body.y -= this.ydir;

    // logic for bouncing off the vertical walls
    if (
      this.body.x >= canvaWidth - this.diameter / 2 ||
      this.body.x <= this.diameter / 2
    ) {
      this.xdir = -this.xdir;
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
      if (
        this.body.y < brick.body.y + brick.bHeight &&
        this.body.y + this.diameter / 2 > brick.body.y &&
        this.body.x < brick.body.x + brick.bWidth &&
        this.body.x + this.diameter / 2 > brick.body.x
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
