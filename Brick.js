class Brick {
  constructor(xLocation, yLocation, r, g, b, bWidth, bHeight) {
    this.r = r;
    this.g = g;
    this.b = b;
    this.bWidth = bWidth;
    this.bHeight = bHeight;
    this.lives = 1;
    this.body = createVector(xLocation, yLocation);
  }
  update() {}
  show() {
    fill("rgba(0, 0, 0, 0.2)");
    rect(this.body.x + 5, this.body.y + 5, this.bWidth, this.bHeight);
    image(spaceshipImg, this.body.x, this.body.y, this.bWidth, this.bHeight);
  }
}
