class Paddle {
  constructor(r, g, b, pWidth, pHeight) {
    this.r = r;
    this.g = g;
    this.b = b;
    this.pWidth = pWidth;
    this.pHeight = pHeight;
    this.xdir = 12;
    this.body = createVector(canvaWidth / 2 - pWidth / 2, canvaHeight / 1.06);
  }
  update() {
    this.body.x >= canvaWidth - this.pWidth &&
      (this.body.x = canvaWidth - this.pWidth);
    this.body.x <= 0 && (this.body.x = 0);
  }
  show() {
    image(skateboardImg, this.body.x, this.body.y, this.pWidth, this.pHeight);
  }
}
