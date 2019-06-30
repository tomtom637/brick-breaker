class Ball {
  constructor(speed, r, g, b, diameter) {
    this.body = createVector(canvaWidth / 2, canvaHeight / 1.06);
    this.speed = speed;
    this.xdir = speed / 8;
    this.ydir = speed - this.xdir;
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

    this.ballLogic();
  }
  show() {
    fill(this.r, this.g, this.b);
    circle(this.body.x, this.body.y, this.diameter, this.diameter);
  }
}
