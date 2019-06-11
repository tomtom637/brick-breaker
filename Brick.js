class Brick {
  constructor(xLocation, r, g, b, bWidth, bHeight) {
    this.r = r;
    this.g = g;
    this.b = b;
    this.bWidth = bWidth;
    this.bHeight = bHeight;
    this.xdir = 10;
    this.lives = 1;
    this.body = createVector(xLocation, canvaHeight / 8);
  }
  update() {}
  show() {
    fill(this.r, this.g, this.b);
    rect(this.body.x, this.body.y, this.bWidth, this.bHeight);
  }
}
