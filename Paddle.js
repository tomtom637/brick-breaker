class Paddle {
  constructor(r, g, b, pWidth, pHeight) {
    this.r = r;
    this.g = g;
    this.b = b;
    this.pWidth = pWidth;
    this.pHeight = pHeight;
    this.xdir = 13;
    this.body = createVector(canvaWidth / 2 - pWidth / 2, canvaHeight / 1.06);
  }
  update() {
    this.body.x >= canvaWidth - this.pWidth &&
      (this.body.x = canvaWidth - this.pWidth);
    this.body.x <= 0 && (this.body.x = 0);
  }
  show() {
    fill(this.r, this.g, this.b);
    rect(this.body.x, this.body.y, this.pWidth, this.pHeight);

    fill(60);
    noStroke();
    rect(
      this.body.x + this.pWidth * 0.45,
      this.body.y + 5,
      this.pWidth - this.pWidth * 0.9,
      this.pHeight - 10
    );
  }
}
