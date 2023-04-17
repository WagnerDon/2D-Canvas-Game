class Platform {
    constructor(x) {
        this.location = { x: x, y: canvas.height - 50 };
        this.original = x;
        this.img = background.wall;
    }
    drawPlatform() {
        if (this.location.x > this.original + 99 || this.location.x < this.original - 99) {
            this.location.x = this.original;
        }
        c.drawImage(this.img, this.location.x, this.location.y, 100, 100);
    }
}
let platforms = [];