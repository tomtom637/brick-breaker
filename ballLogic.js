Ball.prototype.ballLogic = function() {
  // logic for bouncing off the vertical walls
  if (this.body.x >= canvaWidth - this.diameter / 2 && this.xdir < 0) {
    this.xdir = this.xdir * -1;
  } else if (this.body.x <= this.diameter / 2 && this.xdir > 0) {
    this.xdir = this.xdir * -1;
  }

  // logic for bouncing off the top wall
  if (this.body.y <= this.diameter / 2 && this.ydir > 0) {
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
      let speedMultiplicator = (relativeBallPosition / paddle.pWidth) * 2 * 0.8;
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
  // logic for bouncing off the bricks ------------------
  for (let brick of bricks) {
    const brickLeft = brick.body.x;
    const brickRight = brick.body.x + brick.bWidth;
    const brickTop = brick.body.y;
    const brickBottom = brick.body.y + brick.bHeight;
    const ballLeft = this.body.x - this.radius;
    const ballRight = this.body.x + this.radius;
    const ballTop = this.body.y - this.radius;
    const ballBottom = this.body.y + this.radius;

    let touchingLeft = false;
    let touchingRight = false;
    let touchingTop = false;
    let touchingBottom = false;

    // Determining which zone of the brick the ball touches
    if (
      ballRight > brickLeft &&
      ballLeft < brickLeft &&
      this.xdir <= 0 &&
      ballBottom > brickTop &&
      ballTop < brickBottom
    ) {
      touchingLeft = true;
    }
    if (
      ballLeft < brickRight &&
      ballRight > brickRight &&
      this.xdir >= 0 &&
      ballBottom > brickTop &&
      ballTop < brickBottom
    ) {
      touchingRight = true;
    }
    if (
      ballBottom > brickTop &&
      ballTop < brickTop &&
      this.ydir <= 0 &&
      ballRight > brickLeft &&
      ballLeft < brickRight
    ) {
      touchingTop = true;
    }
    if (
      ballTop < brickBottom &&
      ballBottom > brickBottom &&
      this.ydir >= 0 &&
      ballRight > brickLeft &&
      ballLeft < brickRight
    ) {
      touchingBottom = true;
    }
    // if the ball touches corners it should rebounce in a diagonal
    if (touchingLeft && touchingTop) {
      brick.lives += 1;
      score--;
    }
    if (touchingTop && touchingRight) {
      brick.lives += 1;
      score--;
    }
    if (touchingRight && touchingBottom) {
      brick.lives += 1;
      score--;
    }
    if (touchingBottom && touchingLeft) {
      brick.lives += 1;
      score--;
    }
    if (touchingLeft) {
      this.xdir = -this.xdir;
      brick.lives -= 1;
      score++;
    }
    if (touchingTop) {
      this.ydir = -this.ydir;
      brick.lives -= 1;
      score++;
    }
    if (touchingRight) {
      this.xdir = -this.xdir;
      brick.lives -= 1;
      score++;
    }
    if (touchingBottom) {
      this.ydir = -this.ydir;
      brick.lives -= 1;
      score++;
    }
  } // end of ball touching the brick logic ------------
};
