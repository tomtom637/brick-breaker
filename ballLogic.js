Ball.prototype.ballLogic = function() {
  const ballLeft = this.body.x;
  const ballRight = this.body.x + this.diameter;
  const ballTop = this.body.y;
  const ballBottom = this.body.y + this.diameter;
  const ballCenterX = ballLeft + this.radius;
  const ballCenterY = ballTop + this.radius;

  // logic for bouncing off the vertical walls
  if (ballRight > canvaWidth && this.xdir < 0) {
    this.xdir = -this.xdir;
    ballSound.play();
  } else if (ballLeft < 0 && this.xdir > 0) {
    this.xdir = -this.xdir;
    ballSound.play();
  }

  // logic for bouncing off the top wall
  if (ballTop < 0 && this.ydir > 0) {
    this.ydir = -this.ydir;
    ballSound.play();
  }

  // logic for bouncing off the paddle
  let paddleLeft = paddle.body.x;
  let paddleRight = paddle.body.x + paddle.pWidth;
  let paddleTop = paddle.body.y;
  let paddleCenter = paddleLeft + paddle.pWidth / 2;
  let relativeBallPosition = paddleCenter - ballCenterX;
  let speedMultiplicator = (relativeBallPosition / paddle.pWidth) * 2 * 0.7;

  if (ballBottom > paddleTop) {
    if (ballRight >= paddleLeft && ballLeft <= paddleRight) {
      ballSound.play();
      this.ydir = -this.ydir;
      this.xdir = this.speed * speedMultiplicator;
      if (this.xdir < 0) {
        this.ydir = this.speed + this.xdir;
      } else if (this.xdir > 0) {
        this.ydir = this.speed - this.xdir;
      } else {
        this.ydir = 0;
      }
      if (ballCenterX === paddleCenter) {
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
      failSound.play();
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
      if (ballCenterX >= brickLeft) {
        this.xdir = -this.xdir;
      }
      if (ballCenterY >= brickTop) {
        this.ydir = -this.ydir;
      }
      brick.lives += 1;
      score--;
    }
    if (touchingTop && touchingRight) {
      if (ballCenterX <= brickRight) {
        this.xdir = -this.xdir;
      }
      if (ballCenterY >= brickTop) {
        this.ydir = -this.ydir;
      }
      brick.lives += 1;
      score--;
    }
    if (touchingRight && touchingBottom) {
      if (ballCenterX <= brickRight) {
        this.xdir = -this.xdir;
      }
      if (ballCenterY <= brickBottom) {
        this.ydir = -this.ydir;
      }
      brick.lives += 1;
      score--;
    }
    if (touchingBottom && touchingLeft) {
      if (ballCenterX >= brickLeft) {
        this.xdir = -this.xdir;
      }
      if (ballCenterY <= brickBottom) {
        this.ydir = -this.ydir;
      }
      brick.lives += 1;
      score--;
    }
    if (touchingLeft) {
      brickSound.play();
      this.xdir = -this.xdir;
      brick.lives -= 1;
      score++;
      if (score > highScore) {
        highScore = score;
        localStorage.setItem("highScore", JSON.stringify(highScore));
      }
    }
    if (touchingTop) {
      brickSound.play();
      this.ydir = -this.ydir;
      brick.lives -= 1;
      score++;
      if (score > highScore) {
        highScore = score;
        localStorage.setItem("highScore", JSON.stringify(highScore));
      }
    }
    if (touchingRight) {
      brickSound.play();
      this.xdir = -this.xdir;
      brick.lives -= 1;
      score++;
      if (score > highScore) {
        highScore = score;
        localStorage.setItem("highScore", JSON.stringify(highScore));
      }
    }
    if (touchingBottom) {
      brickSound.play();
      this.ydir = -this.ydir;
      brick.lives -= 1;
      score++;
      if (score > highScore) {
        highScore = score;
        localStorage.setItem("highScore", JSON.stringify(highScore));
      }
    }
  } // end of ball touching the brick logic ------------
};
