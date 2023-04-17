class Coin {
    constructor(location) {
        this.location = location;
        this.measure = { width: 50, height: 50 };
        this.img = image('coin', 'coin.png');
    }
    draw() {
        c.drawImage(this.img, this.location.x, this.location.y, this.measure.width, this.measure.height);
    }
}
let coins = [];
for (let x = 0; x < 30; x++) {
    coins.push(new Coin({ x: randomNumber(canvas.width * 3), y: canvas.height - 128 * randomNumber(3) }));
}